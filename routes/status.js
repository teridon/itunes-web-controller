var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var track = global.iTunes.getCurrentTrack();
  var iTunesState = global.iTunes.getPlayerState();
  res.json({"artist": track.artist, "song": track.name, "state": iTunesState} )
});

module.exports = router;
