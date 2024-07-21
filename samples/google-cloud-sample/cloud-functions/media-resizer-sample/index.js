const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetBucketName = process.env.TARGET_BUCKET_NAME;

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

  const storage = new Storage();
  const bucket = storage.bucket(file.bucket);
  const targetBucket = storage.bucket(targetBucketName);

  if (!fs.existsSync("/tmp/original")) {
    fs.mkdirSync("/tmp/original");
  }

  if (!fs.existsSync("/tmp/converted")) {
    fs.mkdirSync("/tmp/converted");
  }

  const originalFile = `/tmp/original/${file.name}`;
  const fileNameWithoutExtension = path.parse(file.name).name; // Remove file extension
  const destinationFile = `/tmp/converted/${fileNameWithoutExtension}-resized.jpg`; // Append "-resized" to the filename


  await bucket.file(file.name).download({
    destination: originalFile
  });

  // Resize the image to 100x100 using sharp
  await sharp(originalFile).resize(100, 100).toFile(destinationFile);

  await delay(2000);

  const convertedFile = await targetBucket.upload(destinationFile);

  console.log(`Converted file: ${convertedFile}`);
});

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
