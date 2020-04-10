var createError = require('http-errors');
global.iTunes = require('itunes-bridge');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var statusRouter = require('./routes/status');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/status', statusRouter);

function updateTrackInfo(res) {
  var track = global.iTunes.getCurrentTrack();
  var iTunesState = global.iTunes.getPlayerState();
  var playpausetext = "NULL"
  if ( iTunesState.includes("playing") == true ) {
    playpausetext = "Pause"
  } else {
    playpausetext = "Play"
  }
  res.json({
    "artist": track.artist, 
    "song": track.name, 
    "state": iTunesState, 
    "playpausetext": playpausetext
  } )
}

app.get('/pause', function (req, res) {
  var iTunes_result = global.iTunes.pause();
  updateTrackInfo(res);
})

app.get('/next', function (req, res) {
  var iTunes_result = global.iTunes.next();
  updateTrackInfo(res);
})

app.get('/prev', function (req, res) {
  var iTunes_result = global.iTunes.prev();
  updateTrackInfo(res);
})

app.get('/playpause', function (req, res) {
  var iTunes_result = global.iTunes.playpause()
  updateTrackInfo(res);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
