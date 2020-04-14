//console.log('Client-side code running');

const songinfo        = document.getElementById('songinfo')
const playpauseButton = document.getElementById('playpauseButton');
const nextbutton      = document.getElementById('prevButton');
const prevbutton      = document.getElementById('nextButton');

function addListeners(oReq) {
  oReq.addEventListener('load', function () {
    var resp = oReq.responseText;
    var obj = JSON.parse(resp);
    songinfo.innerHTML = "iTunes is " + obj.state + ": <br>" + obj.artist + "<br>" + obj.song;
    //console.log('button text:' + obj.playpausetext)
    playpauseButton.innerHTML = obj.playpausetext;
    //updatePlaypauseButton(obj.playpausetext);
  });
  oReq.addEventListener('timeout', function () {});
  oReq.addEventListener('error', function () {});
  oReq.addEventListener('abort', function () {});
}


function processRequest(button, e) {
    //console.log('processing request: ' + button);
    var oReq = new XMLHttpRequest();
    addListeners(oReq);
    oReq.open("GET", "/" + button);
    oReq.send();
}

var intervalID = setInterval( function() {processRequest('status');}, 5000);

nextbutton.addEventListener('click', function() {
    processRequest ('prev');
});


prevbutton.addEventListener('click', function(e) {
    processRequest ('next');
});


playpauseButton.addEventListener('click', function(e) {
    processRequest ('playpause');
});

