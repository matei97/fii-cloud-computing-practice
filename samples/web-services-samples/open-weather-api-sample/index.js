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
