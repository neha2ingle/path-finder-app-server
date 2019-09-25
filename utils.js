var https = require('https');

function getQueryString(params) {
    return Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).join('&');
}

function getDataAsync(url, params) {

    return new Promise(function(resolve, reject) {
        getData(url, params, resolve, reject);
    });
}

function getData(url, params, onDone, onError) {

    var data = '';
    var finalUrl = `${url}?${getQueryString(params)}`;
    
    var _req = https.get(finalUrl, function(_res) {
        
        _res.on('data', function(chunk) {
            data += chunk;
        });

        _res.on('end', function() {
            onDone(data);
        })
    });

    _req.end();

    _req.on('error', function(err) {
        onError(err);
    });
}

module.exports = { getData, getDataAsync };
