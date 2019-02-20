
/**
 * JavaScript code for the "YouTube API example"
 * http://www.opimedia.be/DS/webdev/YouTube/
 *
 * (c) Olivier Pirson --- 2016 January, 26
 * (c) Anton Polyakin --- 2018 January, 30
 */

/**
 * YT.Player initialized by onYouTubeIframeAPIReady().
 */
 var youTubePlayer;
var allPlaylists = {
    import : ['53Dh-I0_m5Y','6NSB-wKYL4w','L2JLHwSQlEY','op07UzSCu4c','TLV4_xaYynY','to-RVV_3anw','xkznrpBIFf8','Fku7hi5kI-c','iYYRH4apXDo','aOD5e-32wS8','NFwP2huyNzg','cVBCE3gaNxc','dfdfdfg4w','qJFZfibRf7k','oU7rqB9E_0M','YuxvXi-aEDs','jREUrbGGrgM','sXjeXEI7KHk','npERkyInJss','66ChMPV0LTg','A_MjCqQoLLA','bgNCWZR31KQ','z-GUjA67mdc', 'yYvkICbTZIQ', 'I6J_h8p5ogY','2ZBtPf7FOoM','HaZpZQG2z10','XWJloWmAqnE', 'tZuUNMwWhOU', 'L5eNAWbn6mQ', 'Uo2SNtFofWI' ],
    favorites: []
  };
var allPlaylistTags = {};
var playlistItems;
var currentIndex = 0;
var prevPlaylist;
 var playlistId = function (){  
    for (var key in allPlaylists){
      if (allPlaylists[key] == currentPlaylist){
        return key;
      }
    }
  };
var currentPlaylist = allPlaylists.import;
var errorBlock = document.getElementById('YouTube-player-errors');
 var playlistFavorites = document.querySelector(".acc-container[data-playlist='favorites']");


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
 function onYouTubeIframeAPIReady(){
  'use strict';

  var currentDataPlaylist;
 
  var playlistContainer = document.querySelector(".acc-container[data-playlist="+playlistId()+"]");
  var prevBtn = document.querySelector('.playlist__prev');
  var nextBtn = document.querySelector('.playlist__next');

  var repeatBtn = document.querySelector('.repeatButton');
  var randomBtn = document.querySelector('.randomButton');

  
  

  
  var inputVideoId = document.getElementById('YouTube-video-id');
    //var videoId = inputVideoId.value;
    var suggestedQuality = 'tiny';
    var height = 300;
    var width = 400;
    var youTubePlayerVolumeItemId = 'YouTube-player-volume';



initPlayer(currentPlaylist[currentIndex]);
getPlaylist('import', playlistContainer);
$(".add-to .likeButton").click(likeStateHandler);


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

        document.querySelector('.YouTube-player-link__youtube').innerHTML = `<a><i class="fab fa-youtube"></i></a>`;

      }


    // Add private data to the YouTube object
    youTubePlayer.personalPlayer = {'currentTimeSliding': false,
    'errors': []};


    function onError(event) {
      youTubePlayer.personalPlayer.errors.push(event.data);
      errorBlock.innerHTML = youTubePlayer.personalPlayer.errors;
      errorBlock.style.display = 'inline';
      youTubePlayer.personalPlayer.errors=[];
      setTimeout(playNextVideo, 5000);
    }

// The API will call this function when the video player is ready
function onReady(event) {
    //event.target.playVideo();
    var player = event.target;

    detectLikedItem();

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
            if(repeatBtn.classList.contains('checked')){
              youTubePlayer.loadVideoById(currentPlaylist[currentIndex], 0, "large");            
            }else{
              playNextVideo();
            }
          }

        }

      }

      



  function playNextVideo() {
    if(currentIndex !== playlistItems.length-1){
      currentIndex += 1;
      setActiveClass();
    }
  }


  function playPrevVideo() {
    if(currentIndex !== 0){
      if(youTubePlayer.getCurrentTime() < 5){
        currentIndex -= 1;
        setActiveClass();
      }else{
        youTubePlayer.seekTo(0);
        youTubePlayer.playVideo();
      }
    }
  }


  function detectLikeState(){
    var thisLikeButton = playlistItems[currentIndex].children('.likeButton');
    var controlLikeButton = document.querySelector('.add-to .likeButton');

    if (thisLikeButton.classList.contains('checked')){
      controlLikeButton.classList.removeClass('checked');
      controlLikeButton.classList.addClass('checked');
    }
  }


/*export to excel*/
function getPlaylistData(dataPlaylist){
  let string;
  dataPlaylist ? string = `[data-playlist='${dataPlaylist}']` : string ='';
  let allPlaylistsItems = document.querySelectorAll(`.acc-container${string} .acc-item`);
  let data = [];

  for (var i = 0; i < allPlaylistsItems.length; i++) {
    data.unshift([allPlaylistsItems[i].getAttribute('data-videoid'), allPlaylistsItems[i].children[1].children[1].textContent]);
  }
  data.unshift(['videoId','title']);
  return data;
}


function createTable(tableData) {
  var table = document.createElement('table');
  var row = {};
  var cell = {};

  tableData.forEach(function(rowData) {
    row = table.insertRow(-1);
    rowData.forEach(function(cellData) {
      cell = row.insertCell();
      cell.textContent = cellData;
    });
  });
  return table;
}


function download(dataPlaylist, type){
  const el = createTable(getPlaylistData(dataPlaylist));
  const file = XLSX.utils.table_to_book(el);
  // Configuring width of the columns:
  file.Sheets.Sheet1["!cols"] = [{ wpx: 210 }, { wpx: 120 }, { wpx: 80 }];
  return XLSX.writeFile(file, dataPlaylist + "." + type);
}


function exportHandler(){
  download('favorites','xlsx');
}
/*end of export to excel*/


/* replaceAt */
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
/* end of replaceAt */


/*jQueryUI Sortable*/
function uiSortable(){

 var startTime, 
 endTime,
 fullTime,
 timerUiItem;

 $('.acc-container .acc-btn').on("mousedown", function(e) {
  if (e.which === 1) {
    $('.acc-container .acc-btn').css({'box-shadow': 'none','z-index': '0'});
    startTime = +new Date();
    endTime = +new Date();
    timerUiItem = setInterval(function() {
      endTime++;
      fullTime = (endTime - startTime) * 10;
      if (fullTime > 400){
       $(e.currentTarget).parent().children('.acc-content').css({'position': 'absolute','display': 'none', 'overflow': 'inherit'});
       $(e.currentTarget).css({'z-index': '1','box-shadow': '0 5px 26px 0 rgba(0,0,0,.32)'});
     }
   }, 0);
  }
});

 $('.acc-container .acc-btn').on("mouseup", function(e) {
  if (e.which === 1) {
    clearInterval(timerUiItem);
    if($(e.currentTarget).parent().hasClass('is-active') && $(e.currentTarget).parent().children('.acc-content').children('.acc-content-inner').text() !== ''){
      $(e.currentTarget).parent().children('.acc-content').css({'position': 'relative','display': 'block', 'overflow': 'auto'});
      $(e.currentTarget).css({'box-shadow': 'none','z-index': '0'});
    }
  }
});

 $('.acc-container .acc-btn').on("mouseout", function(e) { 
  if (fullTime > 400){
    clearInterval(timerUiItem);
    $('.acc-container .acc-btn').css({'box-shadow': 'none','z-index': '0'});
  }

});

 $('ul.acc-container').sortable({
  axis: 'y',
  tolerance: 'intersect',
  delay:500,
  handle:'.acc-btn',
  containment:"parent",
  sort: function(e, ui) {
    clearInterval(timerUiItem);
    ui.item.children('.acc-btn').css('box-shadow', '0 5px 26px 0 rgba(0,0,0,.32)');
    ui.item.children('.acc-content').css({ 'height': '0', 'position': 'absolute', 'display': 'none', 'overflow': 'inherit'});
    ui.item.css({ 'height': ui.item.children('.acc-btn').outerHeight()});
    ui.placeholder.css( {'height': ui.item.children('.acc-btn').outerHeight() + 4});
  },
  stop: function(e, ui) {
    clearInterval(timerUiItem);
    ui.item.children('.acc-btn').css('box-shadow', 'none');
    ui.item.children('.acc-content').css({ 'position': 'relative' });
    if(ui.item.hasClass('is-active') && ui.item.children('.acc-content').children('.acc-content-inner').text() !== ''){
      ui.item.children('.acc-content').css({ 
        'height': ui.item.children('.acc-content').children('.acc-content-inner').outerHeight(),
        'display': 'block', 
        'position': 'relative', 
        'overflow': 'auto'
      });
     
    }
  }
});

}
/* end of jQueryUI Sortable*/



    prevBtn.addEventListener('click', playPrevVideo);
    nextBtn.addEventListener('click', playNextVideo);
    getFavorite();
setLikeButtonsState();//add state to like buttons
document.querySelector(".export.btn").addEventListener('click', exportHandler);
searchHintHandler();
window.addEventListener("load", searchHintHandler);
//$(".likeButton").on('click', searchHintHandler());
uiSortable();




}
//end of onYouTubeIframeAPIReady

var getVarName = function tmp(){
  let n = /getVarName\(([^)]+?)\)/.exec(tmp.caller !== null ? tmp.caller.toString() : '');
  return n !== null ? n[1] : false;
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function secondsToHms(seconds) {
  const time = {
    hours: String(Math.floor(Number(Math.ceil(seconds)) / 3600)),
    minutes: String(Math.floor(Number(Math.ceil(seconds)) % 3600 / 60)),
    seconds: String(Math.ceil(Number(Math.ceil(seconds)) % 3600 % 60)),
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
// if (time.seconds == '60') {
//   time.minutes = Number(time.minutes) + 1;
//   time.minutes = '00';
// }

if (time.hours !== '00') {
  return `${time.hours}:${time.minutes}:${time.seconds}`;
} else {
  return `${time.minutes}:${time.seconds}`;
}


}


function detectButtonState(){
  if (playPauseBtn.classList == "play-pause"){
    playPauseBtn.classList.add("paused"); 
    document.querySelector(".acc-item.is-active .acc-cover").classList.remove("paused");
    youTubePlayerPause();
  }else{
    playPauseBtn.classList.remove("paused");
    document.querySelector(".acc-item.is-active .acc-cover").classList.add("paused");
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




    try {
      if (youTubePlayerStateValueToDescription(state) == "playing"){
        playPauseBtn.classList.remove("paused");
        document.querySelector(".acc-item.is-active .acc-cover").classList.add("paused");
      }else if (youTubePlayerStateValueToDescription(state) ==  "buffering"){
        playPauseBtn.classList.remove("paused");
        document.querySelector(".acc-item.is-active .acc-cover").classList.add("paused");
      }else {
        playPauseBtn.classList.add("paused");
        document.querySelector(".acc-item.is-active .acc-cover").classList.remove("paused");
      }
    } catch (err) {}


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


  
  document.querySelector('.YouTube-player-title').innerHTML = youTubePlayer.j.videoData.title || document.querySelector(".acc-item.is-active").children[1].children[1].textContent;

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



  /*jquery player progress*/
  $(function() {
    $('.wrap').addClass('loaded'); 


    function changeProgressColor() { 
      //$('.range').val(currentPercent.toFixed(2));

      var val = $('.range').val(); 
      var buf = (fraction*100).toFixed(1); 
      $('.range').css( 
        'background', 
        'linear-gradient(to right, #8309e0 0%, #8309e0 ' + val + '%, #777 ' + val + '%, #777 ' + buf + '%, #444 ' + buf + '%, #444 100%)' 
        ); 
    } 
    if (youTubePlayer.personalPlayer.currentTimeSliding == false){
      changeProgressColor();
    }
$('.range').on('mousemove', changeProgressColor); 

// player hint

var offset = $('.range').offset();
var rangeWidth = $('.range').innerWidth();
var hintWidth = $('.YouTube-player-hint').outerWidth(true);

$('.range').bind('mousemove',
  function(e){
    changeProgressColor(); 
    $('.YouTube-player-hint')
    .css('left', (e.pageX - offset.left))
    .text(secondsToHms((duration)*(e.pageX - offset.left)/rangeWidth));
  });

// end of player hint


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
  /*end of jquery player progress*/




}
else {
  document.getElementById('YouTube-player-infos').innerHTML = indicatorDisplay;
}




}

/*play and pause handlers*/
var prevState;
$('.range').bind('mousedown', function() { 
  prevState = youTubePlayer.getPlayerState();
  youTubePlayer.personalPlayer.currentTimeSliding = true;
  youTubePlayerPause();
}); 

$('.range').bind('mouseup', function() { 
  youTubePlayer.personalPlayer.currentTimeSliding = false;
if(prevState == 1){
 youTubePlayerPlay();
}
});
/*end of play and pause handlers*/

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