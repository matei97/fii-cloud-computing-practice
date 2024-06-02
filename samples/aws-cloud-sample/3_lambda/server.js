let countries = {
    "France": "Paris",
    "Germany": "Berlin",
    "Italy": "Rome",
    "Spain": "Madrid",
    "Romania": "Bucharest",
    "Moldova": "Chișinău"
};

exports.handler = async (event) => {
    let queryParam = null;
    let queryStringParameters = event.queryStringParameters;
    if (queryStringParameters !== undefined && queryStringParameters.country !== undefined) {
        queryParam = queryStringParameters.country;
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            capitala: countries[queryParam]
        }),
    };
};


