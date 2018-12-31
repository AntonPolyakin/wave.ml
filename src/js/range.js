/* Example structure to pass */

function videoParams(id, startTime, duration, width, height, controls) {
  this.id = id;
  this.startTime = startTime; //in sec
  this.duration = duration * 1000; //parameter is in sec
  this.width = width;
  this.height = height;
  this.controls = controls; //If 0 no user controls
  this.player = 0;
}
var exampleOptions = new videoParams('DriqX014zMQ', 10, 5, 500, 500, 1);

aVideo = (function(videoOptions) {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var videoParams = videoOptions;
  var paused = false;
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
      height: videoParams.width.toString(),
      width: videoParams.width.toString(),
      videoId: videoParams.id,
      playerVars: {
        controls: videoParams.controls,
        fs: 0, //This takes away the full screen control button
        start: videoParams.startTime,
        //end: videoParams.endTime,
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange //Optional for different loop code
      }
    });
  }
  window.setVariableInterval = function(callbackFunc, timing) {
    var variableInterval = {
      interval: timing,
      callback: callbackFunc,
      stopped: false,
      runLoop: function() {
        if (variableInterval.stopped) return;
        var result = variableInterval.callback.call(variableInterval);
        if (typeof result == 'number') {
          if (result === 0) return;
          variableInterval.interval = result;
        }
        variableInterval.loop();
      },
      stop: function() {
        this.stopped = true;
        window.clearTimeout(this.timeout);
      },
      start: function() {
        this.stopped = false;
        return this.loop();
      },
      loop: function() {
        this.timeout = window.setTimeout(this.runLoop, this.interval);
        return this;
      }
    };
    return variableInterval.start();
  };

  function onPlayerReady(event) {
    videoParams.player = player;
    player.setPlaybackRate(1);
    event.target.playVideo();
    setVi();
  }

  function setVi() {
    vi = setVariableInterval(function() {
      var interval = this.interval;
      // print it for the hell of it
      console.log(interval);
      player.seekTo(videoParams.startTime);
      return interval;
    }, videoParams.duration); //starting interval was whatever was passed into params
  }

  function viStop() {
    setTimeout(function() {
      vi.stop();
    }, 0);
  }

  function viStart() {
    setTimeout(function() {
      vi.start();
    }, 0);
  }

  function faster() {
    setTimeout(function() {
      if (vi.interval - 200 > 0)
        vi.interval -= 200;
      videoParams.duration = vi.interval;
    }, 0); //By changing this value I can speed up after a delayed time
  }

  function slower() {
    vi.interval += 200;
    videoParams.duration = vi.interval;
  }

  function newInterval(startTime, newI) {
    vi.stop();
    vi.interval = (newI * 1000); //because it wants in ms
    videoParams.duration = vi.interval;
    videoParams.startTime = startTime;
    player.seekTo(videoParams.startTime);
    vi.start();
  }

  function onPlayerStateChange(event) {
    if (event.data === 2) { //video paused so pause loop
      console.log("Paused");
      paused = true;
      viStop();
    }
    if (paused == true && event.data == 1) {
      console.log("Resumed");
      paused = false;
      viStart();
    }

  }
  //Keeping these seperate to isolate problematic behavior
  var loopStop = function() { //private method
    viStop();
  };
  var loopStart = function() { //private method
    viStart();
  };
  var loopFaster = function() { //private method
    faster();
  };
  var loopSlower = function() { //private method
    slower();
  };
  var changeLoop = function(startTime, newI) {
    newInterval(startTime, newI);
  };
  return { //returning this object
    paramControls: videoParams,
    sayHello: function() {
      sayHello();
    },
    loopStop: function() {
      loopStop();
    },
    loopStart: function() {
      loopStart();
    },
    loopFaster: function() {
      loopFaster();
    },
    loopSlower: function() {
      loopSlower();
    },
    changeLoop: function(startTime, newDuration) {
      changeLoop(startTime, newDuration);
    }
  }
})(exampleOptions);


function doUpdate() {
  console.log("Doing update...");
  aVideo.changeLoop(Number($("#startForm").val()), Number($("#durationForm").val()));
}

