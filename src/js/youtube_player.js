
/**
 * JavaScript code for the "YouTube API example"
 * http://www.opimedia.be/DS/webdev/YouTube/
 *
 * (c) Olivier Pirson --- 2016 January, 26
 */

/**
 * YT.Player initialized by onYouTubeIframeAPIReady().
 */
 var youTubePlayer;



/**
 * Function called by https://www.youtube.com/iframe_api
 * when it is loaded.
 *
 * Initialized YouTube iframe with the value of #YouTube-video-id as videoId
 * and the value of #YouTube-player-volume as volume.
 *
 * Adapted from:
 * https://developers.google.com/youtube/iframe_api_reference
 * https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
 */
 function onYouTubeIframeAPIReady() {
    'use strict';

    var videos = [ 'Wljrq_Uv_DY', 'XWJloWmAqnE', 'tZuUNMwWhOU', 'L5eNAWbn6mQ', 'Uo2SNtFofWI' ];
    var playlistThumbs = document.querySelector('.playlist-thumbs');
    var prevBtn = document.querySelector('.playlist__prev');
    var nextBtn = document.querySelector('.playlist__next');
    var videoThumbs;
    var currentIndex = 0;

    var inputVideoId = document.getElementById('YouTube-video-id');
    //var videoId = inputVideoId.value;
    var suggestedQuality = 'tiny';
    var height = 300;
    var width = 400;
    var youTubePlayerVolumeItemId = 'YouTube-player-volume';

    
    videos.forEach(function(id, i){
        var activeClass = '';
        if ( i === currentIndex ) {
          activeClass = 'is-active';
      }
      playlistThumbs.innerHTML += '<li class="video-thumb '+activeClass+'"><img src="https://img.youtube.com/vi/'+id+'/default.jpg"/></li>';
  });

    videoThumbs = document.querySelectorAll('.video-thumb');

    initPlayer(videos[currentIndex]);

// select playlist item
var playlistItems = document.querySelectorAll('.playlist-thumbs > li');
function selectThisPlaylistItem(event) {
    if (currentIndex !== [...playlistItems].findIndex(n => n.contains(this))){
   currentIndex = [...playlistItems].findIndex(n => n.contains(this));
   setActiveClass();
}else{
    detectButtonState();
}

   event.preventDefault();
}

for (var index = 0; index < playlistItems.length; index++) {
    playlistItems[index].addEventListener('click', selectThisPlaylistItem);
}  
// end of select playlist item

function initPlayer(id) {
        // This function creates an <iframe> (and YouTube player) after the API code downloads
        youTubePlayer = new YT.Player('YouTube-player',
            {videoId: id,
               height: height,
               width: width,
               playerVars: {'autohide': 0,
               'cc_load_policy': 0,
               'controls': 2,
               'disablekb': 1,
               'iv_load_policy': 3,
               'modestbranding': 1,
               'rel': 0,
               'showinfo': 0,
               'start': 3
           },
           events: {'onError': onError,
           'onReady': onReady,
           'onStateChange': onStateChange
       }
   });
    }
    // Add private data to the YouTube object
    youTubePlayer.personalPlayer = {'currentTimeSliding': false,
    'errors': []};


    function onError(event) {
        youTubePlayer.personalPlayer.errors.push(event.data);
    }

// The API will call this function when the video player is ready
function onReady(event) {
    //event.target.playVideo();
    var player = event.target;

  //   player.loadVideoById({suggestedQuality: suggestedQuality,
  //     videoId: videoId
  // });
  player.pauseVideo();
  youTubePlayerDisplayFixedInfos();
}


function onStateChange(event) {
    var volume = Math.round(event.target.getVolume());
    var volumeItem = document.getElementById(youTubePlayerVolumeItemId);

    if (volumeItem && (Math.round(volumeItem.value) != volume)) {
        volumeItem.value = volume;
    }


    switch (currentIndex) {
      case 0:
      prevBtn.disabled = true;
      nextBtn.disabled = false;;
      break;

      case playlistItems.length-1:
      prevBtn.disabled = false;
      nextBtn.disabled = true;
      break;

      default:
      prevBtn.disabled = false;
      nextBtn.disabled = false;
  }

    if ( event.data === 0 ) { // video ended
        if (+currentIndex === playlistItems.length-1){
            //playlist ended 
        }else{
            playNextVideo();
        }
    }

}




function setActiveClass(){
    youTubePlayer.loadVideoById(videos[currentIndex], 0, "large");
    for ( var i=0; videoThumbs.length > i; i++ ) {
      videoThumbs[i].classList.remove('is-active');
  }
  videoThumbs[currentIndex].classList.toggle('is-active');
}


prevBtn.addEventListener('click', playPrevVideo);
nextBtn.addEventListener('click', playNextVideo);

function playNextVideo() {
    if(currentIndex !== playlistItems.length-1){
        currentIndex += 1;
        setActiveClass();
    }
}

function playPrevVideo() {
    if(currentIndex !== 0){
        currentIndex -= 1;
        setActiveClass();
    }
}


}


function secondsToHms(seconds) {
  const time = {
    hours: String(Math.floor(Number(seconds) / 3600)),
    minutes: String(Math.floor(Number(seconds) % 3600 / 60)),
    seconds: String(Math.floor(Number(seconds) % 3600 % 60)),
  };

  if (time.hours && time.hours < 10) {
    time.hours = `0${time.hours}`;
  }
  if (time.minutes && time.minutes < 10) {
    time.minutes = `0${time.minutes}`;
  }
  if (time.seconds && time.seconds < 10) {
    time.seconds = `0${time.seconds}`;
  }

  if (time.hours !== '00') {
    return `${time.hours}:${time.minutes}:${time.seconds}`;
  } else {
    return `${time.minutes}:${time.seconds}`;
  }
}


function detectButtonState(){
if (playPauseBtn.classList == "play-pause"){
        playPauseBtn.classList.add("paused"); 
        youTubePlayerPause();
    }else{
        playPauseBtn.classList.remove("paused"); 
        youTubePlayerPlay();
    }
}
var playPauseBtn = document.querySelector(".play-pause");
playPauseBtn.addEventListener('click', detectButtonState);
/**
 * :return: true if the player is active, else false
 */
 function youTubePlayerActive() {
    'use strict';

    return youTubePlayer && youTubePlayer.hasOwnProperty('getPlayerState');
}


/**
 * Get videoId from the #YouTube-video-id HTML item value,
 * load this video, pause it
 * and show new infos.
 */
 function youTubePlayerChangeVideoId() {
    'use strict';

    var inputVideoId = document.getElementById('YouTube-video-id');
    var videoId = inputVideoId.value;

    youTubePlayer.cueVideoById({suggestedQuality: 'tiny',
        videoId: videoId
    });
    youTubePlayer.pauseVideo();
    youTubePlayerDisplayFixedInfos();
}


/**
 * Seek the video to the currentTime.
 * (And mark that the HTML slider *don't* move.)
 *
 * :param currentTime: 0 <= number <= 100
 */
 function youTubePlayerCurrentTimeChange(currentTime) {
    'use strict';

    youTubePlayer.personalPlayer.currentTimeSliding = false;
    if (youTubePlayerActive()) {
        youTubePlayer.seekTo(currentTime*youTubePlayer.getDuration()/100, true);
    }
}


/**
 * Mark that the HTML slider move.
 */
 function youTubePlayerCurrentTimeSlide() {
    'use strict';

    youTubePlayer.personalPlayer.currentTimeSliding = true;
}


/**
 * Display embed code to #YouTube-player-fixed-infos.
 */
 function youTubePlayerDisplayFixedInfos() {
    'use strict';

    if (youTubePlayerActive()) {
        document.getElementById('YouTube-player-fixed-infos').innerHTML = (
            'Embed code: <textarea readonly>' + youTubePlayer.getVideoEmbedCode() + '</textarea>'
            );
    }
}


/**
 * Display
 *   some video informations to #YouTube-player-infos,
 *   errors to #YouTube-player-errors
 *   and set progress bar #YouTube-player-progress.
 */
 function youTubePlayerDisplayInfos() {

    if ((this.nbCalls === undefined) || (this.nbCalls >= 3)) {
        this.nbCalls = 0;
    }
    else {
        ++this.nbCalls;
    }

    var indicatorDisplay = '<span id="indicator-display" title="timing of informations refreshing">' + ['|', '/', String.fromCharCode(8212), '\\'][this.nbCalls] + '</span>';

    if (youTubePlayerActive()) {
        var state = youTubePlayer.getPlayerState();

        var current = youTubePlayer.getCurrentTime();
        var duration = youTubePlayer.getDuration();
        var currentPercent = (current && duration
          ? current*100/duration
          : 0);

        var fraction = (youTubePlayer.hasOwnProperty('getVideoLoadedFraction')
            ? youTubePlayer.getVideoLoadedFraction()
            : 0);

        var url = youTubePlayer.getVideoUrl();
        var speedRate = document.querySelector('#YouTube-player-rate');
        speedRate.textContent = 'x' + youTubePlayer.getPlaybackRate();





        if (youTubePlayerStateValueToDescription(state) == "playing"){
            playPauseBtn.classList.remove("paused");   
        }else if (youTubePlayerStateValueToDescription(state) ==  "buffering"){
            playPauseBtn.classList.remove("paused");
        }else {
            playPauseBtn.classList.add("paused");
        }


        if (!current) {
            current = 0;
        }
        if (!duration) {
            duration = 0;
        }

        var volume = youTubePlayer.getVolume();
        document.querySelector('.bsp-volume-slider-progress').style.width = volume + '%';
 document.querySelector('.duration-time').textContent = secondsToHms(current.toFixed(2)) + ' / ' + secondsToHms(duration.toFixed(2));

if (volume == 0){
document.querySelector('#bsp-volume span').classList = "fa fa-volume-off";
}else if (volume <= 50){
   document.querySelector('#bsp-volume span').classList = "fa fa-volume-down";
}else if (volume > 50){
    document.querySelector('#bsp-volume span').classList = "fa fa-volume-up";
}

        if (!youTubePlayer.personalPlayer.currentTimeSliding) {
            document.getElementById('YouTube-player-progress').value = currentPercent;
        }

        document.getElementById('YouTube-player-infos').innerHTML = (
            indicatorDisplay
            + 'URL: <a class="url" href="' + url + '">' + url + '</a><br>'
            + 'Quality: <strong>' + youTubePlayer.getPlaybackQuality() + '</strong>'
            + ' &mdash; Available quality: <strong>' + youTubePlayer.getAvailableQualityLevels() + '</strong><br>'
            + 'State <strong>' + state + '</strong>: <strong>' + youTubePlayerStateValueToDescription(state) + '</strong><br>'
            + 'Loaded: <strong>' + (fraction*100).toFixed(1) + '</strong>%<br>'
            + 'Duration: <strong>' + current.toFixed(2) + '</strong>/<strong>' + duration.toFixed(2) + '</strong>s = <strong>' + currentPercent.toFixed(2) + '</strong>%<br>'
            + 'Volume: <strong>' + volume + '</strong>%'
            );

        document.getElementById('YouTube-player-errors').innerHTML = '<div>Errors: <strong>' + youTubePlayer.personalPlayer.errors + '</strong></div>';



    /////////////////////////////////////////// 
    $(function() { 
        $('.wrap').addClass('loaded'); 

        var val = $('.range').val(); 
        var buf = (fraction*100).toFixed(1); 

        function changeProgressColor() { 
            var val = $('.range').val(); 
            var buf = (fraction*100).toFixed(1); 
            $('.range').css( 
                'background', 
                'linear-gradient(to right, #8309e0 0%, #8309e0 ' + val + '%, #777 ' + val + '%, #777 ' + buf + '%, #444 ' + buf + '%, #444 100%)' 
                ); 
        } 
        changeProgressColor(); 
        $('.range').on('mousemove', changeProgressColor); 

        var timeout; 
        $('.wrap').bind('focusin mouseover mousedown hover', function() { 
            window.clearTimeout(timeout); 
            $(this).addClass('hover'); 
        }); 
        $('.wrap').bind('focusout mouseout mouseup', function() { 
            window.clearTimeout(timeout); 
            timeout = setTimeout(function(){removeHoverClass();}, 500); 
        }); 
        function removeHoverClass() { 
            if (!$('.wrap').is(":hover")) { 
                $('.wrap').removeClass('hover'); 
            } 
        } 

    }); 
/////////////////////////////////////////////




}
else {
    document.getElementById('YouTube-player-infos').innerHTML = indicatorDisplay;
}




}

/**
 * Speed.
 */
 function youTubePlayerSpeedChange(value){
  'use strict';
  youTubePlayer.setPlaybackRate(value*0.25);
}

/**
 * Pause.
 */
 function youTubePlayerPause() {
    'use strict';

    if (youTubePlayerActive()) {
        youTubePlayer.pauseVideo();
    }
}


/**
 * Play.
 */
 function youTubePlayerPlay() {
    'use strict';

    if (youTubePlayerActive()) {
        youTubePlayer.playVideo();
    }
}


/**
 * Return the state decription corresponding of the state value.
 * If this value is incorrect, then return unknow.
 *
 * See values:
 * https://developers.google.com/youtube/iframe_api_reference#Playback_status
 *
 * :param number: any
 * :param unknow: any
 *
 * :return: 'unstarted', 'ended', 'playing', 'paused', 'buffering', 'video cued' or unknow
 */
 function youTubePlayerStateValueToDescription(state, unknow) {
    'use strict';

    var STATES = {'-1': 'unstarted',   // YT.PlayerState.
                  '0': 'ended',        // YT.PlayerState.ENDED
                  '1': 'playing',      // YT.PlayerState.PLAYING
                  '2': 'paused',       // YT.PlayerState.PAUSED
                  '3': 'buffering',    // YT.PlayerState.BUFFERING
                  '5': 'video cued'};  // YT.PlayerState.CUED

                  return (state in STATES
                    ? STATES[state]
                    : unknow);
              }


/**
 * Stop.
 */
 function youTubePlayerStop() {
    'use strict';

    if (youTubePlayerActive()) {
        youTubePlayer.stopVideo();
        youTubePlayer.clearVideo();
    }
}


/**
 * Change the volume.
 *
 * :param volume: 0 <= number <= 100
 */
 function youTubePlayerVolumeChange(volume) {
    'use strict';

    if (youTubePlayerActive()) {
        youTubePlayer.setVolume(volume);
    }
}



/**
 * Main
 */
 (function () {
    'use strict';

    function init() {
        // Load YouTube library
        var tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';

        var first_script_tag = document.getElementsByTagName('script')[0];

        first_script_tag.parentNode.insertBefore(tag, first_script_tag);

        // Set timer to display infos
        setInterval(youTubePlayerDisplayInfos, 500);
    }


    if (window.addEventListener) {
        window.addEventListener('load', init);
    } else if (window.attachEvent) {
        window.attachEvent('onload', init);
    }
}());