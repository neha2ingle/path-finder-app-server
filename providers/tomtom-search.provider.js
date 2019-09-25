var { getDataAsync } = require("./../utils");
var { Feature } = require("geojson");

function TomtomSearchProvider(config) {
  var key = config.key;
  var baseUrl = `https://api.tomtom.com/search/2/search`;

  return function(query) {
    var fullUrl = `${baseUrl}/${encodeURIComponent(query)}.json`;
    return getDataAsync(fullUrl, { key }).then(response => {
      var features = JSON.parse(response).results.map(function(location) {
        var feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [location.position.lon, location.position.lat]
          }
        };

        var properties = {
          type: location.type,
          id: location.id,
          score: location.score,
          entityType: location.entityType,
          address: location.address,
          dataSources: location.dataSources
        };

        var bbox_info = location.boundingBox || location.viewport;
        var bbox = [
          bbox_info.topLeftPoint.lon,
          bbox_info.btmRightPoint.lat,
          bbox_info.btmRightPoint.lon,
          bbox_info.topLeftPoint.lat
        ];

        return { ...feature, properties, bbox };
      });

      return JSON.stringify({
        type: "FeatureCollection",
        features
      });
    });
  };
}

module.exports = { TomtomSearchProvider };
