//console.log('Client-side code running');

const songinfo    = document.getElementById('songinfo')
const playButton  = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton')
const nextbutton  = document.getElementById('prevButton');
const prevbutton  = document.getElementById('nextButton');
const playlistbutton  = document.getElementById('playlistButton');
const playlistdropdown= document.getElementById("playlistDropdown");

function addListeners(oReq) {
  oReq.addEventListener('load', function () {
    var resp = oReq.responseText;
    var obj = JSON.parse(resp);
    songinfo.innerHTML = "iTunes is " + obj.state + ": <br>" + obj.artist + "<br>" + obj.song;
    updatePlaypauseButton(obj.playpausetext);
  });
  oReq.addEventListener('timeout', function () {});
  oReq.addEventListener('error', function () {});
  oReq.addEventListener('abort', function () {});
}

function updatePlaypauseButton (nextPlayState) {
  if ( nextPlayState == 'Pause') {
    // Hide the Play Button, show the Pause button
    playButton.classList.add('d-none')
    pauseButton.classList.remove('d-none')
  } else if ( nextPlayState == 'Play') {
    // show the Play Button, Hide the Pause button
    playButton.classList.remove('d-none')
    pauseButton.classList.add('d-none')
  } else {
    console.log("unexpected nextPlayState: " + nextPlayState)
  }
}

function processRequest(button, e) {
    // console.log('processing request: ' + button);
    var pulldownText = playlistdropdown.options[playlistdropdown.selectedIndex].text;
    var oReq = new XMLHttpRequest();
    addListeners(oReq);
    if ( button.match('SelectPlaylist')) {
      oReq.open("POST", "/" + button);
      oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      console.log('client.js: pulldown is: ', encodeURIComponent(pulldownText));
      oReq.send('playlist=' + encodeURIComponent(pulldownText) );
    } else {
      oReq.open("GET", "/" + button);
      oReq.send();
    }
}

var intervalID = setInterval( function() {processRequest('status');}, 5000);

nextbutton.addEventListener('click', function() {
    processRequest ('prev');
});


prevbutton.addEventListener('click', function(e) {
    processRequest ('next');
});


playButton.addEventListener('click', function(e) {
    processRequest ('playpause');
});

pauseButton.addEventListener('click', function(e) {
  processRequest ('playpause');
});

playlistbutton.addEventListener('click', function(e) {
  processRequest ('SelectPlaylist');
});

// immediately update the play/pause button on start
processRequest('status');