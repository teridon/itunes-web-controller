var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var track = global.iTunes.getCurrentTrack();
  var iTunesState = global.iTunes.getPlayerState();
    res.render('index', { title: 'iTunes Control', song: track.name, artist: track.artist, state: iTunesState });
});

module.exports = router;
