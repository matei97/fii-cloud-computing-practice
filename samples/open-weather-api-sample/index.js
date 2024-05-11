// Import the axios module
const axios = require('axios');

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
        console.log(`Weather data for ${city}:`, data);
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
