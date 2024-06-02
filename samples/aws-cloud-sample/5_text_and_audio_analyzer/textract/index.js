const AWS = require('aws-sdk');
const fs = require('fs').promises;

// Configurare AWS SDK
AWS.config.loadFromPath('../../config.json');

// Inițializează clientul AWS Textract
const textract = new AWS.Textract();

// Funcție pentru detectarea textului
const detectText = async (imageBytes) => {
    try {
        const params = {
            Document: {
                Bytes: imageBytes
            }
        };
        const data = await textract.detectDocumentText(params).promise();
        console.log('Detected Text:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error detecting text:', error);
    }
};

// Funcție pentru detectarea tabelelor și formatele
const detectTables = async (imageBytes) => {
    try {
        const params = {
            Document: {
                Bytes: imageBytes
            }
        };
        const data = await textract.analyzeDocument(params).promise();
        console.log('Detected Tables and Forms:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error detecting tables and forms:', error);
    }
};

// Funcție pentru analiza formularului
const analyzeForm = async (imageBytes) => {
    try {
        const params = {
            Document: {
                Bytes: imageBytes
            }
        };
        const data = await textract.analyzeExpense(params).promise();
        console.log('Analyzed Form:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error analyzing form:', error);
    }
};

// Funcție asincronă principală
const main = async () => {
    try {
        // Citește imaginea din fișierul image.jpg
        const imageBytes = await fs.readFile('../../mock_data/expense.png');
        // Apelarea funcțiilor pentru a analiza imaginea
        await detectText(imageBytes);
        await detectTables(imageBytes);
        await analyzeForm(imageBytes);
    } catch (error) {
        console.error('Error reading image file:', error);
    }
};

// Apelarea funcției principale
main();