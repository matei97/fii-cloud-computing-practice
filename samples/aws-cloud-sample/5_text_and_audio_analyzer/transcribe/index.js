const AWS = require('aws-sdk');
const fs = require('fs').promises;

// Configurare AWS SDK
AWS.config.loadFromPath('../../config.json');

// Inițializează clientul AWS Transcribe
const transcribe = new AWS.TranscribeService();

// Funcție pentru începerea transcrierii fișierului audio
const startTranscriptionJob = async (audioFileUri, languageCode) => {
    try {
        const params = {
            TranscriptionJobName: 'MyTranscriptionJob', // Numele job-ului de transcriere
            LanguageCode: languageCode, // Codul limbii din fișierul audio
            Media: {
                MediaFileUri: audioFileUri // URI-ul fișierului audio în S3
            },
            OutputBucketName: 'fii-cloud-bucket' // Numele bucket-ului S3 pentru rezultatele transcrierii
        };
        const data = await transcribe.startTranscriptionJob(params).promise();
        console.log('Transcription Job Started:', data.TranscriptionJob.TranscriptionJobName);
    } catch (error) {
        console.error('Error starting transcription job:', error);
    }
};

// Funcție asincronă principală
const main = async () => {
    try {
        // Încarcă fișierul audio într-un bucket S3 (am presupus că este deja încărcat)
        const audioFileUri = 's3://fii-cloud-bucket/demo_voice.mp3';
        // Limba din fișierul audio (opțional, va fi detectată automat dacă nu este specificată)
        const languageCode = 'en-US';
        // Începe transcrierea fișierului audio
        await startTranscriptionJob(audioFileUri, languageCode);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Apelarea funcției principale
main();