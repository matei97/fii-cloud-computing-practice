Ghid: Crearea unei Aplicații Node.js pentru Accesarea unui API
În acest ghid, vom învăța cum să creăm o aplicație simplă Node.js care accesează un API extern pentru a genera numere aleatorii. Vom utiliza API-ul Random.org pentru acest exemplu.

Pasul 1: Configurare a Mediului de Lucru
Instalează Node.js: Descarcă și instalează Node.js de pe site-ul oficial: Node.js Download.

Creare Director de Lucru: Creează un director nou pentru proiectul tău și navighează în el folosind terminalul sau linia de comandă.

Pasul 2: Inițializare a Proiectului Node.js
Deschide terminalul și navighează în directorul proiectului.

Rulează următoarea comandă pentru a inițializa un proiect Node.js:

csharp
Copy code
npm init -y
Pasul 3: Instalare a Dependințelor

Instalare a Pachetului axios: Vom utiliza pachetul axios pentru a efectua cereri HTTP către API-ul Random.org. Instalează axios folosind următoarea comandă:
Copy code
npm install axios
Pasul 4: Scrierea Codului
Deschide fișierul index.js sau creează un fișier nou cu numele index.js.

În fișierul index.js, scrie următorul cod:

javascript
Copy code
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
Asigură-te că înlocuiești 'API_KEY' cu cheia ta API de la Random.org.

Pasul 5: Rularea Aplicației
Salvăm fișierul index.js.

Deschide terminalul în directorul proiectului și rulează aplicația folosind următoarea comandă:

Copy code
node index.js
Dacă totul a fost configurat corect, ar trebui să vezi în consolă un număr aleatoriu generat de API-ul Random.org.

Pasul 6: Finalizare
Felicitări! Ai creat cu succes o aplicație Node.js care accesează API-ul Random.org pentru a genera numere aleatorii. Poți continua să explorezi și să îmbunătățești această aplicație adăugând mai multă funcționalitate sau folosind alte API-uri pentru a obține date aleatorii sau diferite tipuri de conținut.
