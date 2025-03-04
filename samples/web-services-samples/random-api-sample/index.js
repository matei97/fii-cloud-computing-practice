// Importăm modulul axios
const axios = require('axios');

// URL-ul către API-ul Random.org
const apiUrl = 'https://api.random.org/json-rpc/2/invoke';

// Funcția pentru a genera un număr aleatoriu
async function generateRandomNumber() {
    try {
        // Realizăm o cerere HTTP POST către API
        const response = await axios.post(apiUrl, {
            jsonrpc: '2.0',
            method: 'generateIntegers',
            params: {
                apiKey: 'fe4393c5-54d1-4606-9508-a64532f46b31', // Înlocuiește cu cheia ta API de la Random.org
                n: 1,
                min: 1,
                max: 100
            },
            id: 1
        });

        // Extragem numărul aleatoriu din răspuns
        const randomNumber = response.data.result.random.data[0];
        console.log('Random number:', randomNumber);
    } catch (error) {
        console.error('Error during random number generation', error);
    }
}

// Apelăm funcția pentru a genera un număr aleatoriu
generateRandomNumber();