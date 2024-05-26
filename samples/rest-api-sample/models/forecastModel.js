let products = require('../data/products')
const https = require('https');


function getbyCity(city) {

    return new Promise(async function (resolve, reject) {

        await new Promise(r => setTimeout(r, 2000));

        var req = https.get('https://api.open-meteo.com/v1/forecast?latitude=47.15&longitude=27.60&current_weather=true', function (res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // // reject on request error
        // req.on('error', function (err) {
        //     // This is not a "Second reject", just a different sort of failure
        //     reject(err);
        // });
        // if (postData) {
        //     req.write(postData);
        // }
        // // IMPORTANT
        // req.end();
    });
}

module.exports = {
    getbyCity
}