const AWS = require('aws-sdk');
const fs = require('fs').promises;

// Configurare AWS SDK
AWS.config.loadFromPath('../../config.json');

// Inițializează clientul AWS Translate
const translate = new AWS.Translate();

// Funcție pentru traducerea textului
const translateText = async (text, sourceLanguage, targetLanguage) => {
    try {
        const params = {
            Text: text,
            SourceLanguageCode: sourceLanguage, // Limba sursă a textului
            TargetLanguageCode: targetLanguage // Limba țintă pentru traducere
        };
        const data = await translate.translateText(params).promise();
        console.log('Translated Text:', data.TranslatedText);
    } catch (error) {
        console.error('Error translating text:', error);
    }
};

// Funcție asincronă principală
const main = async () => {
    try {
        // Textul pe care dorești să-l traduci
        const textToTranslate = 'Hello, how are you?';
        // Limba sursă a textului
        const sourceLanguage = 'auto'; // 'auto' pentru detectare automată a limbii
        // Limba țintă pentru traducere
        const targetLanguage = 'fr'; // Limba țintă, de exemplu, 'fr' pentru franceză

        // Traduce textul
        await translateText(textToTranslate, sourceLanguage, targetLanguage);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Apelarea funcției principale
main();