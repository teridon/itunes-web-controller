var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var track = global.iTunes.getCurrentTrack();
  var iTunesState = global.iTunes.getPlayerState();
  //console.log("state is: " + iTunesState)
  var playpausetext = "NULL"
  if ( iTunesState.includes("playing") == true ) {
    playpausetext = "Pause"
  } else {
    playpausetext = "Play"
  }
  //console.log("playpausetext: " + playpausetext)
  res.json({
    "artist": track.artist, 
    "song": track.name, 
    "state": iTunesState, 
    "playpausetext": playpausetext
  } )
});

module.exports = router;
