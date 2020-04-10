console.log('Client-side code running');

function processRequest(button, e) {
    //console.log('processing request: ' + button);
    var oReq = new XMLHttpRequest();
    //oReq.addEventListener("load", reqListener);
    //oReq.responseType = "document";
    oReq.open("GET", "/" + button);
    oReq.onreadystatechange = function () {
      // In local files, status is 0 upon success in Mozilla Firefox
      if(oReq.readyState === XMLHttpRequest.DONE) {
        var status = oReq.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          var resp = oReq.responseText
          //console.log('response text: ' + resp);
          var obj = JSON.parse(resp);
          document.getElementById('songinfo').innerHTML = "iTunes is " + obj.state + ": <p>" + obj.artist + "<br>" + obj.song;
          //console.log('button text:' + obj.playpausetext)
          document.getElementById('playpauseButton').innerHTML = obj.playpausetext;
        } else {
          //console.log('errors in response')
        }
      }
    };
    oReq.send();
}

var intervalID = setInterval( function() {processRequest('status');}, 5000);

const nextbutton = document.getElementById('prevButton');
nextbutton.addEventListener('click', function() {
    processRequest ('prev');
});

const prevbutton = document.getElementById('nextButton');
prevbutton.addEventListener('click', function(e) {
    processRequest ('next');
});

const playpausebutton = document.getElementById('playpauseButton');
playpausebutton.addEventListener('click', function(e) {
    processRequest ('playpause');
});

