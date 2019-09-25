var url = require('url');
var { getDataAsync } = require('./../utils');

// var sample_full_url = `q=${query}&format=geojson&addressdetails=1&limit=5&polygon_geojson=1&email=neha2ingle@gmail.com`;

module.exports.OSMSearchProvider = function (config) {

    var baseUrl = 'https://nominatim.openstreetmap.org/search';
    
    return function (query) {

        var params = {
            q: query,
            format: 'geojson',
            addressdetails: 1,
            limit: 5,
            polygon_geojson: 1,
            email: config.email
        };

        return getDataAsync(baseUrl, params);
    }
}