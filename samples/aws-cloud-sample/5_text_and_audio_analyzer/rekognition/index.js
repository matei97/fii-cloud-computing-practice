const AWS = require('aws-sdk');
const fs = require('fs').promises;

// Configurare AWS SDK
AWS.config.loadFromPath('../../config.json');

// Inițializează clientul AWS Rekognition
const rekognition = new AWS.Rekognition();

// Funcție pentru detectarea etichetelor (label detection)
const detectLabels = async (imageBytes) => {
    try {
        const params = {
            Image: {
                Bytes: imageBytes
            },
            MaxLabels: 10,
            MinConfidence: 75
        };
        const data = await rekognition.detectLabels(params).promise();
        console.log('Labels:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error detecting labels:', error);
    }
};

// Funcție pentru moderarea imaginii (image moderation)
const detectModerationLabels = async (imageBytes) => {
    try {
        const params = {
            Image: {
                Bytes: imageBytes
            }
        };
        const data = await rekognition.detectModerationLabels(params).promise();
        console.log('Moderation Labels:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error detecting moderation labels:', error);
    }
};

// Funcție pentru analiza feței (facial analysis)
const detectFaces = async (imageBytes) => {
    try {
        const params = {
            Image: {
                Bytes: imageBytes
            },
            Attributes: ['ALL']
        };
        const data = await rekognition.detectFaces(params).promise();
        console.log('Faces:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error detecting faces:', error);
    }
};

// Funcție pentru comparația feței (face comparison)
const compareFaces = async (sourceImageBytes, targetImageBytes) => {
    try {
        const params = {
            SourceImage: {
                Bytes: sourceImageBytes
            },
            TargetImage: {
                Bytes: targetImageBytes
            },
            SimilarityThreshold: 70
        };
        const data = await rekognition.compareFaces(params).promise();
        console.log('Face Comparison:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error comparing faces:', error);
    }
};

// Funcție pentru detecția de celebrități (celebrity detection)
const detectCelebrities = async (imageBytes) => {
    try {
        const params = {
            Image: {
                Bytes: imageBytes
            }
        };
        const data = await rekognition.recognizeCelebrities(params).promise();
        console.log('Celebrities:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error detecting celebrities:', error);
    }
};

// Funcție pentru detecția de text în imagine (text in image)
const detectText = async (imageBytes) => {
    try {
        const params = {
            Image: {
                Bytes: imageBytes
            }
        };
        const data = await rekognition.detectText(params).promise();
        console.log('Text:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error detecting text:', error);
    }
};

// Funcție asincronă principală
const main = async () => {
    try {
        // Citește imaginea din fișierul informatica.jpg
        const informatica = await fs.readFile('../../mock_data/informatica.jpg');
        // Apelarea funcțiilor pentru a analiza imaginea
        await detectLabels(informatica);
        await detectModerationLabels(informatica);
        await detectText(informatica);
        await detectFaces(informatica);

        const djoko = await fs.readFile('../../mock_data/informatica.jpg');
        const federer = await fs.readFile('../../mock_data/federer.jpg');
        await detectCelebrities(djoko);
        await compareFaces(djoko, federer);
    } catch (error) {
        console.error('Error reading image file:', error);
    }
};

// Apelarea funcției principale
main();