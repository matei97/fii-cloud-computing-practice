const AWS = require('aws-sdk');
const fs = require('fs').promises;

// Configurare AWS SDK
AWS.config.loadFromPath('../../config.json');

// Inițializează clientul AWS Comprehend
const comprehend = new AWS.Comprehend();

// Funcție pentru analiza textului
const analyzeText = async (text) => {
    try {
        // Detectare entități
        const entitiesParams = {
            Text: text,
            LanguageCode: 'en'
        };
        const entitiesData = await comprehend.detectEntities(entitiesParams).promise();
        console.log('Entities:', JSON.stringify(entitiesData, null, 2));

        // Detectare sentimente
        const sentimentParams = {
            Text: text,
            LanguageCode: 'en'
        };
        const sentimentData = await comprehend.detectSentiment(sentimentParams).promise();
        console.log('Sentiment:', JSON.stringify(sentimentData, null, 2));

        // Detectare sintaxă
        const syntaxParams = {
            Text: text,
            LanguageCode: 'en'
        };
        const syntaxData = await comprehend.detectSyntax(syntaxParams).promise();
        console.log('Syntax:', JSON.stringify(syntaxData, null, 2));
    } catch (error) {
        console.error('Error analyzing text:', error);
    }
};

// Funcție asincronă principală
const main = async () => {
    try {
        // Citește textul din fișierul email.txt
        const emailText = await fs.readFile('../../mock_data/email.txt', 'utf8');

        // Apelarea funcției pentru a analiza textul e-mailului
        await analyzeText(emailText);
    } catch (error) {
        console.error('Error reading input file:', error);
    }
};

// Apelarea funcției principale
main();