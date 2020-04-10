var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var track = global.iTunes.getCurrentTrack();
  var iTunesState = global.iTunes.getPlayerState();
  var playpausetext = "NULL"
  if ( iTunesState.includes("playing") == true ) {
    playpausetext = "Pause"
  } else {
    playpausetext = "Play"
  }
  //console.log("playpausetext: " + playpausetext)
  res.render(
    'index', { 
      title: 'iTunes Control', 
      song: track.name, 
      artist: track.artist, 
      state: iTunesState, 
      playpausetext: playpausetext 
    });
});

module.exports = router;
