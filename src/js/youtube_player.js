
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

  var allPlaylists = {
    videos : ['xkznrpBIFf8','Fku7hi5kI-c','iYYRH4apXDo','aOD5e-32wS8','NFwP2huyNzg','cVBCE3gaNxc','dfdfdfg4w','qJFZfibRf7k','oU7rqB9E_0M','YuxvXi-aEDs','jREUrbGGrgM','sXjeXEI7KHk','npERkyInJss','66ChMPV0LTg','A_MjCqQoLLA','bgNCWZR31KQ','z-GUjA67mdc', 'yYvkICbTZIQ', 'I6J_h8p5ogY','2ZBtPf7FOoM','HaZpZQG2z10','XWJloWmAqnE', 'tZuUNMwWhOU', 'L5eNAWbn6mQ', 'Uo2SNtFofWI' ],
    favorites: []
  };
  var currentPlaylist = allPlaylists.videos;
  var currentIndex = 0;
  var playlistId = function (){  
    for (var key in allPlaylists){
      if (allPlaylists[key] == currentPlaylist){
        return key;
      }
    }
  };
  
  var prevPlaylist;

  var playlistContainer = document.querySelector(".acc-container[data-playlist="+playlistId()+"]");
  var playlistFavorites = document.querySelector(".acc-container[data-playlist='favorites']");
  var prevBtn = document.querySelector('.playlist__prev');
  var nextBtn = document.querySelector('.playlist__next');

  var repeatBtn = document.querySelector('.repeatButton');
  var randomBtn = document.querySelector('.randomButton');

  var errorBlock = document.getElementById('YouTube-player-errors');
  
  var playlistItems;
  
  var inputVideoId = document.getElementById('YouTube-video-id');
    //var videoId = inputVideoId.value;
    var suggestedQuality = 'tiny';
    var height = 300;
    var width = 400;
    var youTubePlayerVolumeItemId = 'YouTube-player-volume';

    /*GET PLAYLIST FUNCTION*/
    function getPlaylist(currentPlaylist, playlistContainer){

      currentPlaylist.forEach(function(id, i){
        var activeClass = '';
        if ( i === currentIndex ) {
          activeClass = 'is-active';
        }

        playlistContainer.setAttribute('data-playlist',playlistId());

        playlistContainer.innerHTML += `
        <li class="acc-item ${activeClass}" data-videoid="${id}">
        <div class="acc-hide"></div>
        <div class="acc-btn">
        <span class="acc-cover" style="background-image:url(https://img.youtube.com/vi/${id}/default.jpg);"></span>
        <span class="acc-title"></span>
        <span class="acc-controls"></span>
        </div>
        <span class="likeButton" aria-hidden="true"></span>
        <div class="acc-content">
        <div class="acc-content-inner"></div>
        </div>
        </li>`;

      });


      currentPlaylist.forEach(function(id, i){
  // Do not work because of https, need a proxy or yahoo query
  /*
    $.getJSON('//www.youtube.com/oembed', {
      format: 'json',
      url: url
      dataType: "jsonp",
      jsonpCallback: "localJsonpCallback"
    }, function(data) {
      */
      $.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=AIzaSyBpNZaCp_3krSiIFImpeNQrBxVLPIbgGy0`, function(data) {

       document.querySelectorAll('.acc-container[data-playlist='+playlistId()+'] .acc-title')[i].innerHTML = data.items[0].snippet.localized.title;
       let durationString = data.items[0].contentDetails.duration;
       durationString = durationString.replace(/S|PT/g,'').replace(/H|M/g,':').split(':');
       durationString.forEach(function(t, i){
        function addAfterNull(n){
          if(n<10){
            n='0'+n;
            return n;
          }else{return n;}
        }
        durationString[i] = addAfterNull(t);
      });
       durationString = durationString.join(':');
       document.querySelectorAll('.acc-container[data-playlist='+playlistId()+'] .acc-controls')[i].innerHTML = durationString;
     });
    });


      currentPlaylist.forEach(function(id, i){
       $.ajax({
        url:`https://cors.io/?http://web.archive.org/web/https://www.youtube.com/watch?v=${id}`,
        context: document.body,
        type:'GET',
        success: function(data){ 

          var data_hr = jQuery.extend(true, {}, $(data));
          var linkToTitle = $(data_hr).find('.watch-extras-section').children('.watch-meta-item.yt-uix-expander-body').children('.title');
          var musicInfo = {
            song : linkToTitle.filter(function(i) {
              return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Song`;
            }).siblings(".content.watch-info-tag-list").children().text(),
            artist : linkToTitle.filter(function(i) {
              return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Artist`;
            }).siblings(".content.watch-info-tag-list").children().text(),
            album : linkToTitle.filter(function(i) {
              return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Album`;
            }).siblings(".content.watch-info-tag-list").children().text(),
            writers : linkToTitle.filter(function(i) {
              return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Writers`;
            }).siblings(".content.watch-info-tag-list").children().text(),
            licensed : linkToTitle.filter(function(i) {
              return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Licensed to YouTube by`;
            }).siblings(".content.watch-info-tag-list").children().text()
          }

          var musicInfoText = {
            song : 'Song',
            artist : 'Artist',
            album : 'Album',
            writers : 'Writers',
            licensed : 'Licensed by'
          }

          $.each(musicInfo, function(title){      
            if(musicInfo[`${title}`] !== ''){
              $(`.acc-container[data-playlist="${playlistId()}"] .acc-content-inner:eq(${i})`).append(`
                <p><span class="music-info-title">${musicInfoText[`${title}`]}:</span><span class="music-info-description">${musicInfo[`${title}`]}</span></p>
                `);
            }         
          });

        }
      });
     });



//add event to like buttons

setHandlers(playlistId());

playlistItems = document.querySelectorAll('.acc-container[data-playlist='+playlistId()+'] .acc-item');



}
/*END OF GET PLAYLIST FUNCTION*/

initPlayer(currentPlaylist[currentIndex]);
getPlaylist(currentPlaylist, playlistContainer);
$(".add-to .likeButton").click(likeStateHandler);
// select playlist item

function selectThisPlaylistItem(event) {
 let $eventDataPlaylist = $(event.currentTarget).parents('.acc-container').eq(0).attr("data-playlist");

 currentPlaylist = allPlaylists[$eventDataPlaylist];

 playlistItems = document.querySelectorAll('.acc-container[data-playlist="'+$eventDataPlaylist+'"] .acc-item');
 if (currentIndex != [...playlistItems].findIndex(n => n.contains(this))){
   currentIndex = [...playlistItems].findIndex(n => n.contains(this));
   setActiveClass($eventDataPlaylist);
 }else{
  if($eventDataPlaylist != prevPlaylist){
    currentIndex = [...playlistItems].findIndex(n => n.contains(this));
    setActiveClass($eventDataPlaylist);
  }else{
    detectButtonState();
  }
}
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
      if (randomBtn.classList.contains('checked')){
        if(repeatBtn.classList.contains('checked')){
         youTubePlayer.loadVideoById(currentPlaylist[currentIndex], 0, "large"); 
       }else{
        currentIndex = randomInteger(0, playlistItems.length);
        setActiveClass(); 
      }
    }else{
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

    }

    /*jquery Accordion playlist*/
    var animTime = 300,
    clickPolice = false;
    function accordionAnimation(){
      if(!clickPolice){
       clickPolice = true;

       var targetHeight = $('.acc-container[data-playlist='+playlistId()+'] .acc-content-inner').eq(currentIndex).outerHeight();

       $('.acc-container[data-playlist='+playlistId()+'] .acc-content').stop().animate({ height: 0 }, animTime);

       if ($('.acc-container[data-playlist='+playlistId()+'] .acc-content').eq(currentIndex).children().text() != ''){
        $('.acc-container[data-playlist='+playlistId()+'] .acc-content').eq(currentIndex).stop().animate({ height: targetHeight }, animTime);

      }else{
       $('.acc-container[data-playlist='+playlistId()+'] .acc-content').eq(currentIndex).stop().animate({ height: 0 }, animTime);
     }
     setTimeout(function(){ clickPolice = false; }, animTime);
   } 
 }

 /*end of jquery Accordion playlist*/


 /* set handlers to elements */


 function setHandlers(dataPlaylist){
  let allPlaylistItems,
  likeBtns,
  hideBtns,
  string;
  dataPlaylist ? string = `[data-playlist='${dataPlaylist}']`:string = '';


  likeBtns = document.querySelectorAll(`.acc-container${string} .likeButton`);
  hideBtns = document.querySelectorAll(`.acc-container${string} .acc-hide`);
  allPlaylistItems = document.querySelectorAll(`.acc-container${string} .acc-item`);

  for(let i=0; i < allPlaylistItems.length; i++){
    likeBtns[i].addEventListener("click", likeStateHandler);
    hideBtns[i].addEventListener("click",hideBtnStateHandler);
    allPlaylistItems[i].children[1].addEventListener('click', selectThisPlaylistItem);
  }

}
/* set handlers to elements */

function setActiveClass(prevPlaylistId){

  let allPlaylistItems = document.querySelectorAll(`.acc-container .acc-item`);
  youTubePlayer.loadVideoById(currentPlaylist[currentIndex], 0, "large");
  prevPlaylist = prevPlaylistId;

  errorBlock.style.display = 'none';

  for ( var i=0; allPlaylistItems.length > i; i++ ) {
    allPlaylistItems[i].classList.remove('is-active');
    document.querySelectorAll(".acc-cover")[i].classList.remove("paused");
    document.querySelectorAll(".acc-content")[i].style.height = "0px";
  }

  playlistItems[currentIndex].classList.toggle('is-active');

  detectLikedItem();
  accordionAnimation();
}


prevBtn.addEventListener('click', playPrevVideo);
nextBtn.addEventListener('click', playNextVideo);

function playNextVideo() {
  if(currentIndex !== playlistItems.length-1){
    if(randomBtn.classList.contains('checked')){
      currentIndex = randomInteger(0, playlistItems.length);
      setActiveClass();
    }else{
      currentIndex += 1;
      setActiveClass();
    }
  }else{
    if(randomBtn.classList.contains('checked')){
      currentIndex = randomInteger(0, playlistItems.length);
      setActiveClass();
    }
  }
}

function playPrevVideo() {
  alert(youTubePlayer.getCurrentTime());
  if(currentIndex !== 0){
   if(randomBtn.classList.contains('checked')){
    currentIndex = randomInteger(0, playlistItems.length);
    setActiveClass();
  }else{
if(youTubePlayer.getCurrentTime() < 5){
    currentIndex -= 1;
    setActiveClass();
}else{
  youTubePlayer.seekTo(0);
  youTubePlayer.playVideo();
}


  }
}else{
  if(randomBtn.classList.contains('checked')){
    currentIndex = randomInteger(0, playlistItems.length);
    setActiveClass();
  }

}
}

// if (dataPlaylist){ 
//   string = '[data-playlist="'dataPlaylist'"]';
// }else'';

function setLikeButtonsState(dataPlaylist){ 
  let string;
  dataPlaylist ? string = `[data-playlist='${dataPlaylist}']` : string ='';
 
  var allLikeButtons = document.querySelectorAll(`.acc-container${string} .likeButton`);
  
  for(let i=0; i < allLikeButtons.length; i++){
    if (allPlaylists.favorites.indexOf(allLikeButtons[i].parentElement.getAttribute('data-videoid')) < 0){
      if (allLikeButtons[i].classList.contains('checked')){
        allLikeButtons[i].classList.remove('checked');     
      }
    }else{
      if (!allLikeButtons[i].classList.contains('checked')){
        allLikeButtons[i].classList.add('checked');
      }
    }
  }
}

function hideBtnStateHandler(e){
  $(e.target).parent().toggleClass("is-hide");
  $(e.target).toggleClass("checked");
}

function likeStateHandler(e){
  let $eventDataPlaylist = $(e.currentTarget).parents('.acc-container').eq(0).attr("data-playlist");
  $(e.target).toggleClass("checked");

  if (!$(e.target).parent().hasClass("add-to")){
    if ($(e.target).hasClass("checked")){
      detectLikedItem();
      addFavorite($(e.target).parent());

    }else{
      removeFavorite($(e.target).parent());
      setLikeButtonsState();
    }
  }else{
    if ($(e.target).hasClass("checked")){
      detectLikedItem(true);
      addFavorite($(`.acc-container[data-playlist=${$eventDataPlaylist}] .likeButton:eq(${currentIndex})`).parent());
    }else{
      removeFavorite($(`.acc-container[data-playlist=${playlistId()}] .likeButton:eq(${currentIndex})`).parent());
      setLikeButtonsState();
    }
  }
  $(".likeButton").on('click', searchHintHandler());
}

function detectLikeState(){
  var thisLikeButton = playlistItems[currentIndex].children('.likeButton');
  var controlLikeButton = document.querySelector('.add-to .likeButton');

  if (thisLikeButton.classList.contains('checked')){
    controlLikeButton.classList.removeClass('checked');
    controlLikeButton.classList.addClass('checked');
  }
}

function detectLikedItem(control){

  if(control !== true){  
    if(document.querySelectorAll('.acc-container[data-playlist='+playlistId()+'] .likeButton')[currentIndex].classList.contains('checked')){
      document.querySelector('.add-to .likeButton').classList.add('checked');
    }else{
      document.querySelector('.add-to .likeButton').classList.remove('checked');
    }
  }else{
    if(document.querySelector('.add-to .likeButton').classList.contains('checked')){
      document.querySelectorAll('.acc-container[data-playlist='+playlistId()+'] .likeButton')[currentIndex].classList.add('checked');
    }else{
      document.querySelectorAll('.acc-container[data-playlist='+playlistId()+'] .likeButton')[currentIndex].classList.remove('checked');
    }
  }
}
/*bookmarks playlist*/

var favoriteList = document.querySelector('.acc-container[data-playlist="favorites"]');

function addFavorite(playlistElement){
  let $copyPlaylistElement = playlistElement.clone();
  $copyPlaylistElement.children('.acc-content').css("height", "0");
  $copyPlaylistElement.find('.acc-cover').removeClass('paused');
  $copyPlaylistElement.find('.acc-hide').removeClass('checked');
  $copyPlaylistElement = $copyPlaylistElement.removeClass('is-active, is-hide').get(0);

  if (allPlaylists.favorites == null){
    allPlaylists.favorites = [playlistElement.attr('data-videoid')];
  }else{
    allPlaylists.favorites = [playlistElement.attr('data-videoid'), ...allPlaylists.favorites];
  }

  if (favoriteList.innerHTML == ''){
    favoriteList.innerHTML += $copyPlaylistElement.outerHTML;
  }else{
    favoriteList.insertBefore($copyPlaylistElement, favoriteList.children[0]);
  }

  setHandlers('favorites');

  localStorage.setItem("FavoriteList", favoriteList.innerHTML);
  localStorage.setItem("FavoriteArray", allPlaylists.favorites);
}

function removeFavorite(playlistElement){
  let $playlistElement = playlistElement;
  let index = allPlaylists.favorites.indexOf($playlistElement.attr('data-videoid'));

  if (index > -1) {
    allPlaylists.favorites.splice(index, 1);
  }
//this.parentNode.parentNode.removeChild(this.parentNode);



 $(".acc-container[data-playlist='favorites'] li").eq(index).fadeOut("slow", function() { 

  $(this).remove(); 
localStorage.setItem("FavoriteList", favoriteList.innerHTML);
localStorage.setItem("FavoriteArray", allPlaylists.favorites);

});


}


function getFavorite(){
  if (localStorage.getItem("FavoriteArray") !== null){
    allPlaylists.favorites = localStorage.getItem("FavoriteArray").split(',');
  }

  favoriteList.innerHTML = localStorage.getItem("FavoriteList");
  setHandlers('favorites');
}
/*end of bookmarks playlist*/
getFavorite();
setHandlers();
//add state to like buttons
setLikeButtonsState();


/*export to excel*/
function getPlaylistData(playlistUl){
  var data;

  for (var n = 0; n < playlistUl.length; n++) {
    playlistUl[n].style.left = n * 50 + 'px';
  }

}

function download(type){
  const el = document.getElementById("data-table");
  const file = XLSX.utils.table_to_book(el);
  // Configuring width of the columns:
  file.Sheets.Sheet1["!cols"] = [{ wpx: 210 }, { wpx: 120 }, { wpx: 80 }];
  return XLSX.writeFile(file, "test." + type);
}
/*end of export to excel*/


}
//end of onYouTubeIframeAPIReady


function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
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

function secondsToHms(seconds) {
  const time = {
    hours: String(Math.floor(Number(seconds) / 3600)),
    minutes: String(Math.floor(Number(seconds) % 3600 / 60)),
    seconds: String(Math.ceil(Number(seconds) % 3600 % 60)),
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
      document.querySelector(".acc-item.is-active .acc-cover").classList.add("paused");
    }else if (youTubePlayerStateValueToDescription(state) ==  "buffering"){
      playPauseBtn.classList.remove("paused");
      document.querySelector(".acc-item.is-active .acc-cover").classList.add("paused");
    }else {
      playPauseBtn.classList.add("paused");
      document.querySelector(".acc-item.is-active .acc-cover").classList.remove("paused");
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


  document.getElementById('YouTube-player-link').innerHTML = '<a id="show-popup"><i class="fab fa-youtube"></i></a>';
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

    var val = $('.range').val(); 
    var buf = (fraction*100).toFixed(1); 

    function changeProgressColor() { 

      $('.range').val(currentPercent.toFixed(2));

      var val = $('.range').val(); 
      var buf = (fraction*100).toFixed(1); 
      $('.range').css( 
        'background', 
        'linear-gradient(to right, #8309e0 0%, #8309e0 ' + val + '%, #777 ' + val + '%, #777 ' + buf + '%, #444 ' + buf + '%, #444 100%)' 
        ); 
    } 
    changeProgressColor(); 
    $('.range').on('mousemove', changeProgressColor); 

// player hint

var offset = $('.range').offset();
var rangeWidth = $('.range').innerWidth();
var hintWidth = $('.YouTube-player-hint').innerWidth();
$('.range').bind('mousemove',
  function(e){

    $('.YouTube-player-hint')
    .addClass('hover')
    .css('left', (e.pageX - offset.left-(hintWidth/2)+10))
    .text(secondsToHms((duration)*(e.pageX - offset.left)/rangeWidth));

    if ($('.YouTube-player-hint').text() == '0-1:0-1:00'){$('.YouTube-player-hint').text('00:00')}

  });

$('.range').bind('focusout mouseout mouseup',
  function(){

    $('.YouTube-player-hint').removeClass('hover');

  });
// player hint


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