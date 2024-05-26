const Forecast = require('../models/forecastModel')
const {
    pushData,
    getCachedData
} = require('../cache/cacheService');

// @desc    Gets All Products
// @route   GET /api/products
async function getForecastData(req, res) {
    var city = extractCityQueryParam(req);

    var cachedData = getCachedData(city);

    if (cachedData) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=no-cache'
        })
        res.end(JSON.stringify(cachedData.data))

        return;
    }

    try {
        const forcastData = await Forecast.getbyCity(city)
        forcastData['type'] = 'new';

        pushData(city, forcastData, 10);
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'max-age=60'
        })


        res.end(JSON.stringify(forcastData))
    } catch (error) {
        console.log(error)
    }
}


function extractCityQueryParam(req) {
    var data = req.url.split("/");

    return data[data.length - 1];
}
module.exports = {
    getForecastData
}