## Ghid: Crearea unei Aplicații Node.js pentru Accesarea unui API

În acest ghid, vom învăța cum să creăm o aplicație simplă Node.js care accesează un API extern pentru a genera numere aleatorii. Vom utiliza API-ul Random.org pentru acest exemplu.

### Pasul 1: Configurare a Mediului de Lucru

1. **Instalează Node.js:** Descarcă și instalează Node.js de pe site-ul oficial: [Node.js Download](https://nodejs.org/).

2. **Creare Director de Lucru:** Creează un director nou pentru proiectul tău și navighează în el folosind terminalul sau linia de comandă.

## Pasul 2: Obținerea unei Chei API de la Random.org

1. Accesează site-ul [Random.org](https://www.random.org/) în browserul tău.
2. Dacă nu ai deja un cont, apasă pe butonul "Sign Up" sau "Înregistrare" pentru a-ți crea un cont nou.
3. Completează formularul de înregistrare cu informațiile tale personale și creează un cont.
4. După ce te-ai logat în contul tău Random.org, caută și apasă pe opțiunea "Account Settings" sau "Setările Contului".
5. În pagina de setări a contului, ar trebui să găsești o opțiune numită "API Key" sau "Cheie API". Caută această opțiune și apasă pe ea.
6. Dacă nu ai deja o cheie API generată, ar trebui să existe o opțiune pentru a genera una nouă. Apasă pe butonul sau linkul corespunzător pentru a genera o cheie API nouă.
7. După ce ai generat o cheie API nouă, aceasta ar trebui să fie afișată pe ecran.


### Pasul 3: Inițializare a Proiectului Node.js

1. Deschide terminalul și navighează în directorul proiectului.

2. Rulează următoarea comandă pentru a inițializa un proiect Node.js:

```bash
npm init -y
```
### Pasul 4: Instalare a Dependințelor

1. **Instalare a Pachetului `axios`:** Vom utiliza pachetul `axios` pentru a efectua cereri HTTP către API-ul Random.org. Instalează `axios` folosind următoarea comandă:
```bash
npm install axios
```

### Pasul 5: Scrierea Codului

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
```

## Pasul 6: Rularea Aplicației

1. **Salvăm fișierul `index.js`.**
2. **Deschide terminalul în directorul proiectului și rulează aplicația folosind următoarea comandă:**
```bash
   node index.js
```




## EN - Guide: Creating a Node.js Application to Access an API

In this guide, we'll learn how to create a simple Node.js application that accesses an external API to generate random numbers. We will use the Random.org API for this example.

### Step 1: Configuring the Work Environment

1. **Install Node.js:** Download and install Node.js from the official site: [Node.js Download](https://nodejs.org/).

2. **Create Working Directory:** Create a new directory for your project and navigate to it using the terminal or command line.

## Step 2: Obtain an API Key from Random.org

1. Go to [Random.org](https://www.random.org/) in your browser.
2. If you don't already have an account, click on the "Sign Up" or "Registration" button to create a new account.
3. Complete the registration form with your personal information and create an account.
4. After logging into your Random.org account, find and click on the "Account Settings" option.
5. In your account settings page, you should find an option called "API Key". Look for this option and tap on it.
6. If you don't already have an API key generated, there should be an option to generate a new one. Click the appropriate button or link to generate a new API key.
7. Once you have generated a new API key, it should be displayed on the screen.

### Step 3: Initialize the Node.js Project

1. Open the terminal and navigate to the project directory.

2. Run the following command to initialize a Node.js project:

```bash
npm init -y
```
### Step 4: Install Dependencies

1. **Installing the `axios' Package:** We will use the `axios' package to make HTTP requests to the Random.org API. Install `axios` using the following command:
```bash
npm install axios
```

### Step 5: Writing the Code

1. Open the file `index.js` or create a new file named `index.js`.

2. In the `index.js` file, write the following code:

```javascript
// Import the axios module
const axios = require('axios');

// URL to the Random.org API
const apiUrl = 'https://api.random.org/json-rpc/2/invoke';

// Function to generate a random number
async function generateRandomNumber() {
    try {
        // Make an HTTP POST request to the API
        const response = await axios.post(apiUrl, {
            jsonrpc: '2.0',
            method: 'generateIntegers',
            params: {
                apiKey: 'API_KEY', // Replace with your API key from Random.org
                n: 1,
                min: 1,
                max: 100
            },
            ID: 1
        });

        // Extract the random number from the response
        const randomNumber = response.data.result.random.data[0];
        console.log('Random number generated:', randomNumber);
    } catch (error) {
        console.error('Error generating random number:', error);
    }
}

// We call the function to generate a random number
generateRandomNumber();
```