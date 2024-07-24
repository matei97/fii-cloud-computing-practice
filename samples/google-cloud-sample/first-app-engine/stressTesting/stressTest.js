const axios = require('axios');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

// Define command-line arguments
const argv = yargs(hideBin(process.argv))
    .option('url', {
        alias: 'u',
        description: 'URL to send requests to',
        type: 'string',
        demandOption: true
    })
    .option('requests', {
        alias: 'r',
        description: 'Number of requests to send',
        type: 'number',
        default: 100
    })
    .option('concurrency', {
        alias: 'c',
        description: 'Number of concurrent requests',
        type: 'number',
        default: 10
    })
    .help()
    .alias('help', 'h')
    .argv;

const url = argv.url;
const totalRequests = argv.requests;
const concurrency = argv.concurrency;

let completedRequests = 0;
let failedRequests = 0;

// Function to send a single request
const sendRequest = async () => {
    try {
        await axios.get(url);
        completedRequests++;
    } catch (error) {
        failedRequests++;
    }
};

// Function to send multiple requests concurrently
const sendRequestsConcurrently = async () => {
    const promises = [];
    for (let i = 0; i < concurrency; i++) {
        promises.push(
            new Promise(async (resolve) => {
                for (let j = 0; j < Math.ceil(totalRequests / concurrency); j++) {
                    await sendRequest();
                }
                resolve();
            })
        );
    }

    await Promise.all(promises);

    console.log(`Completed Requests: ${completedRequests}`);
    console.log(`Failed Requests: ${failedRequests}`);
};

// Run the load test
sendRequestsConcurrently();


//node stressTest.js --url https://hello-world-dot-aplicatie-management.ew.r.appspot.com/ --requests 500 --concurrency 50