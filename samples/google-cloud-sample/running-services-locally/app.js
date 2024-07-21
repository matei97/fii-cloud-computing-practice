// Copyright 2016 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const process = require('process'); // Required to mock environment variables
const creds = require("./aplicatie-studenti-v1-26e5c73d09e7.json");
//we should use management-studenti-svc account
//please provide a service acount key from https://cloud.google.com/iam/docs/keys-create-delete


require('dotenv').config()


// [START gae_storage_app]
const { format } = require('util');
const express = require('express');
const Multer = require('multer');
const { Datastore } = require('@google-cloud/datastore');
const {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI
} = require('@google-cloud/vertexai');

const location = 'us-central1';
const visionModel = 'gemini-1.0-pro-vision';
const textModel = 'gemini-1.0-pro-001';


const { Storage } = require('@google-cloud/storage');


// Instantiate a storage client
const storage = getStorageClient();
const datastore = getDatastoreClient();
const vertexAI = getGenericVertexAIClient();


const generativeModel = getGenerativeModelTranslateModel();


const generativeVisionModel = getVisionModel();
const path = require('path');
const app = express();
const fs = require('fs');
app.set('view engine', 'pug');
// This middleware is available in Express v4.16.0 onwards
app.use(express.json());
// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Display a form for uploading files.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Process the file upload and upload to Google Cloud Storage.
app.post('/submit', multer.single('file'), async (req, res, next) => {

  console.log(req.body);
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  var englishContent = await detectImageContent(req.file);
  var roContent = await translateContent(englishContent);

  SaveInDatabase(req.body, englishContent, roContent);
  SaveInStorage(req.file, res);
});

function getStorageClient() {
  return new Storage({
    credentials: creds
  });
}

function getDatastoreClient() {
  return new Datastore({
    projectId: creds.project_id,
    databaseId: process.env.DATASTORE_DATABASE_ID,
    credentials: creds
  });
}

async function detectImageContent(file) {

  const base64Image = file.buffer.toString('base64');

  // Replace this with your own base64 image string
  const filePart = { inline_data: { data: base64Image, mimeType: 'image/jpeg' } };
  const textPart = { text: 'What is this picture about?' };
  const request = {
    contents: [{ role: 'user', parts: [textPart, filePart] }],
  };
  const streamingResult = await generativeVisionModel.generateContentStream(request);
  const contentResponse = await streamingResult.response;

  return contentResponse.candidates[0].content.parts[0].text;
}

function getGenericVertexAIClient() {
  const authOptions = {
    credentials: {
      client_email: creds.client_email,
      private_key: creds.private_key
    },
  };

  return new VertexAI({ project: creds.project_id, location: location, googleAuthOptions: authOptions });
}

function getVisionModel() {
  return vertexAI.getGenerativeModel({
    model: visionModel,
  });
}
function SaveInDatabase(body, enContent, roContent) {
  body.enContent = enContent;
  body.roContent = roContent;

  datastore.save({
    key: datastore.key('users'),
    data: body,
  });
}

function SaveInStorage(file, res) {
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).send('This is your file ' + publicUrl + ' , please check your email');
  });

  blobStream.end(file.buffer);
}

function initServer() {
  const PORT = parseInt(process.env.PORT) || 8080;


  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
  // [END gae_storage_app]

}

async function translateContent(content, source = "en", target = "ro") {
  const req = {
    contents: [
      { role: 'user', parts: [{ text: `translate from ${source} to ${target}: ${content}}` }] }
    ]
  };

  const result = await generativeModel.generateContent(req);
  const jsonResponse =  JSON.stringify(result.response.candidates[0].content.parts[0].text);
  console.log('Response: ', jsonResponse);

  // const response = jsonResponse.candidates[0].content.parts[0].text;

  // console.log('Response: ', response);

  return jsonResponse;
}

function getGenerativeModelTranslateModel(){
  return vertexAI.preview.getGenerativeModel({
    model: textModel,
    generationConfig: {
      'candidateCount': 1,
      'maxOutputTokens': 4096,
      'topP': 1,
    },
    safetySettings: [
      {
        'category': 'HARM_CATEGORY_HATE_SPEECH',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        'category': 'HARM_CATEGORY_HARASSMENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      }
    ],
  });
}


const requiredEnvVars = ['PORT', 'GCLOUD_STORAGE_BUCKET', 'DATASTORE_DATABASE_ID'];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is not set. Please set ${envVar} to continue.`);
  }
});

initServer();

module.exports = app;
