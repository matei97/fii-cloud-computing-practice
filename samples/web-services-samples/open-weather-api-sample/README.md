## Ghid: Ghid pentru Crearea unei Aplicații Node.js pentru Accesarea API-ului OpenWeatherMap

În acest ghid, vei învăța cum să creezi o aplicație simplă folosind Node.js care va accesa API-ul OpenWeatherMap pentru a obține date meteo.

### Pasul 1: Configurare a Mediului de Lucru

1. **Instalează Node.js:** Descarcă și instalează Node.js de pe site-ul oficial: [Node.js Download](https://nodejs.org/).

2. **Creare Director de Lucru:** Creează un director nou pentru proiectul tău și navighează în el folosind terminalul sau linia de comandă.

## Pasul 2: Obținerea Cheii API de la OpenWeatherMap

1. Accesează site-ul oficial [OpenWeatherMap](https://openweathermap.org/api) într-un browser web. 
2. În partea de sus a paginii, vei găsi un buton "Sign Up" sau "Înregistrare". Dă clic pe acesta pentru a crea un cont nou.
3. Completează detaliile necesare pentru înregistrare, cum ar fi adresa de email, nume de utilizator și parolă.
4. După ce ai creat contul și te-ai autentificat, accesează pagina de administrare a contului.
5. În panoul de control, caută secțiunea care se numește "API keys" sau "Chei API".
6. Dă clic pe butonul "Generate Key" sau "Generare Cheie" pentru a crea o nouă cheie API.
7. Copiază cheia API generată și păstrează-o într-un loc sigur. Această cheie va fi utilizată în aplicația ta Node.js pentru a accesa API-ul OpenWeatherMap.

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
// Import the axios module
const axios = require('axios');

const extractWeatherInfo = (data) => {
    const location = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const weatherDescription = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;
    const visibility = data.visibility;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('ro-RO');
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('ro-RO');
  
    console.log(`Informații meteo pentru ${location}, ${country}:`);
    console.log(`Temperatura: ${temperature}°C (se simte ca ${feelsLike}°C)`);
    console.log(`Temperatura minimă: ${tempMin}°C`);
    console.log(`Temperatura maximă: ${tempMax}°C`);
    console.log(`Umiditate: ${humidity}%`);
    console.log(`Presiune: ${pressure} hPa`);
    console.log(`Vremea: ${weatherDescription}`);
    console.log(`Vânt: ${windSpeed} m/s din direcția ${windDirection}°`);
    console.log(`Vizibilitate: ${visibility} metri`);
    console.log(`Răsărit: ${sunrise}`);
    console.log(`Apus: ${sunset}`);
  };

  
// Define the main function to access the OpenWeatherMap API
async function getWeather(city) {
    try {
        // Define your OpenWeatherMap API key
        const apiKey = 'API_KEY_HERE'; // Replace 'API_KEY_HERE' with your actual API key

        // Build the URL for the API request
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ro`;

        // Send the HTTP request to the API and wait for the response
        const response = await axios.get(apiUrl);

        // Extract the weather data from the API response
        const weatherData = response.data;

        // Return the weather data
        return weatherData;
    } catch (error) {
        // In case of an error, log an appropriate message
        console.error('An error occurred:', error);
    }
}

// Check if a city name is provided as a command-line argument
if (process.argv.length !== 3) {
    console.error('Please provide a city name as a command-line argument.');
    process.exit(1);
}

// Get the city name from the command-line arguments
const city = process.argv[2];

// Call the function to get the weather data for the specified city
getWeather(city)
    .then(data => {
        extractWeatherInfo(data);
        // console.log(`Weather data for ${city}:`, data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
```

## Pasul 6: Rularea Aplicației

1. **Salvăm fișierul `index.js`.**
2. **Deschide terminalul în directorul proiectului și rulează aplicația folosind următoarea comandă:**
```bash
   node index.js Iasi
```



## EN - Guide: Guide to Creating a Node.js Application to Access the OpenWeatherMap API

In this guide, you'll learn how to create a simple application using Node.js that will access the OpenWeatherMap API to get weather data.

### Step 1: Configuring the Work Environment

1. **Install Node.js:** Download and install Node.js from the official site: [Node.js Download](https://nodejs.org/).

2. **Create Working Directory:** Create a new directory for your project and navigate to it using the terminal or command line.

## Step 2: Obtain API Key from OpenWeatherMap

1. Access the official website [OpenWeatherMap](https://openweathermap.org/api) in a web browser. 
2. At the top of the page, you will find a "Sign Up" or "Registration" button. Click it to create a new account.
3. Fill in the details required for registration, such as email address, username and password.
4. Once you've created your account and logged in, go to the account management page.
5. In the control panel, look for the section called "API keys".
6. Click the "Generate Key" button to create a new API key.
7. Copy the generated API key and keep it in a safe place. This key will be used in your Node.js application to access the OpenWeatherMap API.

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

const extractWeatherInfo = (data) => {
    const location = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const weatherDescription = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;
    const visibility = data.visibility;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('ro-RO');
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('ro-RO');
  
    console.log(`Informații meteo pentru ${location}, ${country}:`);
    console.log(`Temperatura: ${temperature}°C (se simte ca ${feelsLike}°C)`);
    console.log(`Temperatura minimă: ${tempMin}°C`);
    console.log(`Temperatura maximă: ${tempMax}°C`);
    console.log(`Umiditate: ${humidity}%`);
    console.log(`Presiune: ${pressure} hPa`);
    console.log(`Vremea: ${weatherDescription}`);
    console.log(`Vânt: ${windSpeed} m/s din direcția ${windDirection}°`);
    console.log(`Vizibilitate: ${visibility} metri`);
    console.log(`Răsărit: ${sunrise}`);
    console.log(`Apus: ${sunset}`);
  };

  
// Define the main function to access the OpenWeatherMap API
async function getWeather(city) {
    try {
        // Define your OpenWeatherMap API key
        const apiKey = 'API_KEY_HERE'; // Replace 'API_KEY_HERE' with your actual API key

        // Build the URL for the API request
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ro`;

        // Send the HTTP request to the API and wait for the response
        const response = await axios.get(apiUrl);

        // Extract the weather data from the API response
        const weatherData = response.data;

        // Return the weather data
        return weatherData;
    } catch (error) {
        // In case of an error, log an appropriate message
        console.error('An error occurred:', error);
    }
}

// Check if a city name is provided as a command-line argument
if (process.argv.length !== 3) {
    console.error('Please provide a city name as a command-line argument.');
    process.exit(1);
}

// Get the city name from the command-line arguments
const city = process.argv[2];

// Call the function to get the weather data for the specified city
getWeather(city)
    .then(data => {
        extractWeatherInfo(data);
        // console.log(`Weather data for ${city}:`, data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
```

## Step 6: Running the Application

1. **Save the `index.js` file.**
2. **Open the terminal in the project directory and run the application using the following command:**
```bash
   node index.js Iasi
```