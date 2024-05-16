const functions = require('@google-cloud/functions-framework');
const { Datastore } = require('@google-cloud/datastore');
const {
  VertexAI
} = require('@google-cloud/vertexai');

const location = 'europe-west1';
const visionModel = 'gemini-1.0-pro-vision';
const textModel = 'gemini-1.0-pro-001';
const vertexAI = getGenericVertexAIClient();
const generativeModel = getGenerativeModelTranslateModel();
const generativeVisionModel = getVisionModel();
const datastore = getDatastoreClient();

// Register a CloudEvent callback with the Functions Framework that will
// be triggered by Cloud Storage.
functions.cloudEvent('helloGCS', async (cloudEvent) => {
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);

  const file = cloudEvent.data;
  console.log(`Bucket: ${file.bucket}`);
  console.log(`File: ${file.name}`);
  console.log(`Metageneration: ${file.metageneration}`);
  console.log(`Created: ${file.timeCreated}`);
  console.log(`Updated: ${file.updated}`);

  var englishContent = await detectImageContent(file)
  var roContent = await translateContent(englishContent);
  let data = { englishContent: englishContent, roContent: roContent }

  await SaveInDatabase(data, file.name)
});

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function getGenerativeModelTranslateModel() {
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

function getVisionModel() {
  return vertexAI.getGenerativeModel({
    model: visionModel,
  });
}

function getGenericVertexAIClient() {
  return new VertexAI({ project: process.env.PROJECT, location: location });
}


async function detectImageContent(file) {
  // Replace this with your own base64 image string
  const filePart = { fileData: { fileUri: `gs://${file.bucket}/${file.name}`, mimeType: "image/jpeg" } };
  const textPart = { text: 'What is this picture about?' };
  const request = {
    contents: [{ role: 'user', parts: [textPart, filePart] }],
  };
  const streamingResult = await generativeVisionModel.generateContentStream(request); //todo this shoul
  const contentResponse = await streamingResult.response;

  var enContent = contentResponse.candidates[0].content.parts[0].text;
  console.log('Response: ', enContent);

  return enContent;
}

async function translateContent(content, source = "en", target = "ro") {
  const req = {
    contents: [
      { role: 'user', parts: [{ text: `translate from ${source} to ${target}: ${content}}` }] }
    ]
  };

  const result = await generativeModel.generateContent(req);
  const jsonResponse = JSON.stringify(result.response.candidates[0].content.parts[0].text);
  console.log('Response: ', jsonResponse);

  return jsonResponse;
}

async function SaveInDatabase(data, originalname) {

  const query = datastore.createQuery('users').filter('fileName', '=', originalname);

  const [entities] = await datastore.runQuery(query);

  if (entities.length === 0) {
    console.log('No matching entity found.');
    return;
  }

  const entity = entities[0];
  const key = entity[datastore.KEY];

  entity.enFileContent = data.englishContent;
  entity.roFileContent = data.roContent

  await datastore.save({
    key: key,
    data: entity,
  });
}

function getDatastoreClient() {
  return new Datastore({
    projectId: process.env.PROJECT,
    databaseId: process.env.DATASTORE_DATABASE_ID,
  });
}