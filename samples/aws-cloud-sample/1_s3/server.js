const AWS = require('aws-sdk');
const fs = require('fs');
const path = require("path");

// Configurați AWS SDK
AWS.config.loadFromPath('../config.json');

// Creați un client S3
const s3 = new AWS.S3();

// Funcție pentru crearea unui bucket
const createBucket = async (bucketName) => {
    const params = {
        Bucket: bucketName
    };
    try {
        const data = await s3.createBucket(params).promise();
        console.log(`Bucket created successfully: ${data.Location}`);
    } catch (err) {
        console.error('Error creating bucket:', err);
    }
};

// Funcție pentru listarea bucket-urilor
const listBuckets = async () => {
    try {
        const data = await s3.listBuckets().promise();
        console.log('Buckets:', data.Buckets);
    } catch (err) {
        console.error('Error listing buckets:', err);
    }
};

// Funcție pentru încărcarea unui fișier în bucket
const uploadFile = async (bucketName, filePath) => {
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
    };

    try {
        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully: ${data.Location}`);
    } catch (err) {
        console.error('Error uploading file:', err);
    }
};

// Funcție pentru descărcarea unui fișier din bucket
const downloadFile = async (bucketName, key, downloadPath) => {
    const params = {
        Bucket: bucketName,
        Key: key
    };

    try {
        const data = await s3.getObject(params).promise();
        fs.writeFileSync(downloadPath, data.Body);
        console.log(`File downloaded successfully: ${downloadPath}`);
    } catch (err) {
        console.error('Error downloading file:', err);
    }
};

const listObjects = async (bucketName) => {
    const params = {
        Bucket: bucketName
    };

    try {
        const data = await s3.listObjectsV2(params).promise();
        data.Contents.forEach((item) => {
            console.log(`Name: ${item.Key}, Size: ${item.Size} bytes`);
        });
    } catch (err) {
        console.error('Error listing objects:', err);
    }
};

// Funcție pentru ștergerea unui fișier din bucket
const deleteFile = async (bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key
    };

    try {
        await s3.deleteObject(params).promise();
        console.log(`File deleted successfully: ${key}`);
    } catch (err) {
        console.error('Error deleting file:', err);
    }
};

// Exemple de utilizare
// createBucket('fii-cloud-sdk-bucket-test');
// listBuckets();
// uploadFile('fii-cloud-sdk-bucket-test', '../mock_data/f1.jpeg');
// listObjects()
// downloadFile('fii-cloud-sdk-bucket-test', 'f1.jpeg', './downloaded-f1.jpeg');
// deleteFile('fii-cloud-sdk-bucket-test', 'f1.jpeg');