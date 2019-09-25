var express = require("express");
var router = express.Router();
var createError = require("http-errors");

var { OSMSearchProvider } = require("./../providers/osm-search.provider");
var { TomtomSearchProvider } = require("./../providers/tomtom-search.provider");

var locationSearch = OSMSearchProvider({
  email: "neha2ingle@gmail.com"
});
// var locationSearch = TomtomSearchProvider({
//   key: "jXAjxGA6OoA3F8Re6QJPs8zT4e1u4Q4N"
// });

/* GET users listing. */
router.get("/", function(req, res, next) {
  var query = req.query.q;
  if (!query) {
    res.status(500).json({ message: "provide query parameter." });
  } else {
    locationSearch(query)
      .then(function(data) {
        res.send(JSON.parse(data));
      })
      .catch(next);
  }
});

module.exports = router;
