let cachedData = {}

function getCachedData(key) {
    var data = cachedData[key];

    if (data === undefined) {
        return
    }

    if (data.cacheTime * 1000 + data.RegisteredTime <= Date.now()) {
        return;
    }

    return cachedData[key];
}

function pushData(key, value, cacheTimeSec) {

    var valueCopy = JSON.parse(JSON.stringify(value));

    cachedData[key] = {};

    cachedData[key]['data'] = valueCopy;
    cachedData[key]['cacheTime'] = cacheTimeSec;
    cachedData[key]['RegisteredTime'] = Date.now();
    cachedData[key]['data']['type'] = 'cached';
}

module.exports = {
    pushData,
    getCachedData
}