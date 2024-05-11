## Ghid: Crearea unei Aplicații Node.js pentru Accesarea unui API

În acest ghid, vom învăța cum să creăm o aplicație simplă Node.js care accesează un API extern pentru a genera numere aleatorii. Vom utiliza API-ul Random.org pentru acest exemplu.

### Pasul 1: Configurare a Mediului de Lucru

1. **Instalează Node.js:** Descarcă și instalează Node.js de pe site-ul oficial: [Node.js Download](https://nodejs.org/).

2. **Creare Director de Lucru:** Creează un director nou pentru proiectul tău și navighează în el folosind terminalul sau linia de comandă.

### Pasul 2: Inițializare a Proiectului Node.js

1. Deschide terminalul și navighează în directorul proiectului.

2. Rulează următoarea comandă pentru a inițializa un proiect Node.js:

npm init -y


### Pasul 3: Instalare a Dependințelor

1. **Instalare a Pachetului `axios`:** Vom utiliza pachetul `axios` pentru a efectua cereri HTTP către API-ul Random.org. Instalează `axios` folosind următoarea comandă:

npm install axios


### Pasul 4: Scrierea Codului

1. Deschide fișierul `index.js` sau creează un fișier nou cu numele `index.js`.

2. În fișierul `index.js`, scrie următorul cod:

```javascript
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
                apiKey: 'API_KEY', // Înlocuiește cu cheia ta API de la Random.org
                n: 1,
                min: 1,
                max: 100
            },
            id: 1
        });

        // Extragem numărul aleatoriu din răspuns
        const randomNumber = response.data.result.random.data[0];
        console.log('Numărul aleatoriu generat:', randomNumber);
    } catch (error) {
        console.error('Eroare la generarea numărului aleatoriu:', error);
    }
}

// Apelăm funcția pentru a genera un număr aleatoriu
generateRandomNumber();

## Pasul 5: Rularea Aplicației

1. **Salvăm fișierul `index.js`.**
2. **Deschide terminalul în directorul proiectului și rulează aplicația folosind următoarea comandă:**
   ```bash
   node index.js


