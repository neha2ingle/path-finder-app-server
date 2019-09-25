# Path Finder

"Path Finder Server" helps provide API support to Path Finder client. Project has search provider api and storage rest api. 

## Providers

Project is configured to be compatible with different providers. It supports one provider at a time. 

Database is JSON document and can be used to store destination information from different providers. Project showcases OSM (Open Street Map) API and TomTom API providers. 

### Client configuation

- Add your client provider creation at `routes\search.js` in following format
```js
var locationSearch = MySearchProvider({
  key: "value"
});
```

### Adding new provider

- Create new provider function with following signature

```js
var g = require('geojson');
module.exports.MySearchProvider = function(config: any) {
    return function(query: string): Promise<g.FeatureCollection> {
        returns responsePromise;
    }
}
```
- Provider function takes config as parameter, this can be used to pass provider specific parameters like email id for OSM and api key for TomTom provider.
- Note, provider needs to return geojson FeatureCollection format only. Check example of TomTomProivder where response is converted to suiteable format for use.
- Use any suitable library to fetch results from third party api, in given providers axios is used.
- configure as per client configuration section
- Your new client provider is ready for use.

## Libraries

### Express

This project created using Express Server.

### lowdb and lowdb-api

data storage and api is handled using lowdb and lowdb api libraries

### other

Centralized error handling mechanism added. All erros are passed as json errors for client application to easily parsed. api-error-handler library is used for same.

### Axios

Used for requesting data from third party api.

## Development

- HTTPS support: Project supports HTTPS protocol.

- Debugging, with VS Code extenstions

- nodemon: for continuous developement
