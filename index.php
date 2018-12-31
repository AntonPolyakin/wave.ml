<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Wave</title>


  <link rel="icon"  href="src/img/favicon.png" type="image/png">
  <link rel="stylesheet" type="text/css" href="src/css/style.css?ver=<?php echo date(dmYHis);?>" >
  <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=no">
  <meta name="keywords" content="музыка, аудио, плеер, песни, онлайн сервис">
  <meta name="description" content="Wave - бесплатный музыкальный онлайн сервис основанный на YouTube API">

<meta property="og:locale" content="ru_RU"/>
  <meta property="og:url" content="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Wave - Музыкальный сервис" />
  <meta property="og:description" content="Да будет музыка" />
  <meta property="og:image" content="src/img/wave_colored.png" />
  <meta property="og:site_name" content="Wave"/>
  

  <meta name="twitter:card" content="summary"></meta> 
  <meta name="twitter:title" content="Wave - Музыкальный сервис"></meta> 
  <meta name="twitter:description" content="Да будет музыка"></meta> 
  <meta name="twitter:image" content="/src/img/wave_colored.png"></meta>

  <meta name="yandex-tableau-widget" content="logo=/src/img/wave_colored.png, color=#2d034e" />

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>


<script type="text/javascript" src="src/js/main.js?ver=<?php echo date(dmYHis);?>"></script>

</head>
<body>
<div class="bg" style="display:none">
  <span class="close-popup"></span>
</div>
<div class="primary-nav">
	<nav role="navigation" class="menu">

		<div class="overflow-container">

			<ul class="menu-dropdown">

				<li><a href="#">Home</a><span class="icon"><i class="fa fa-home" aria-hidden="true"></i></span></li>

				<li class="menu-hasdropdown">
					<a href="#">Settings</a><span class="icon"><i class="fa fa-gear"></i></span>

					<label title="toggle menu" for="settings">
        <span class="downarrow"><i class="fa fa-caret-down"></i></span>
      </label>
					<input type="checkbox" class="sub-menu-checkbox" id="settings" />

					<ul class="sub-menu-dropdown">
						<li><a href="">Profile</a></li>
						<li><a href="">Security</a></li>
						<li><a href="">Account</a></li>
					</ul>
				</li>

				<li><a href="#">Favourites</a><span class="icon"><i class="fa fa-heart"></i></span></li>
        <li><a href="#">History</a><span class="icon"><i class="fa fa-history" aria-hidden="true"></i></span></li>
				<li><a href="#">Messages</a><span class="icon"><i class="fa fa-envelope"></i></span></li>
<li><a href="#">Subscriptions</a><span class="icon"><i class="fa fa-headphones" aria-hidden="true"></i></span></li>
			</ul>

		</div>

	</nav>

<div id="header">
<button href="#" class="hamburger open-panel nav-toggle">
<span class="screen-reader-text">Menu</span>
</button>
<a href="#" class="logotype"></a>
</div>

</div>

<div class="new-wrapper">

	<div id="main">

<!--Custom Youtube playlist-->
<section class="playlist">
  <div id="player">
  </div>
<div class="player-controls">



<!--YOUTUBE PLAYER-->
  <section>
   
      <div id="YouTube-player" class="player-popup"></div>

      <div>
          



      </div>

 <div class="YouTube-player-controls">
<div class="YouTube-player-details"><span class="YouTube-player-title"></span><span id="YouTube-player-errors"></span></div>
        <div class="wrap">    
        <input id="YouTube-player-progress"  class="range" type="range" value="0" min="0" max="100" oninput="youTubePlayerCurrentTimeChange(this.value);" oninput="youTubePlayerCurrentTimeSlide();"></input>
        </div>

<button class="playlist__prev"><i class="fa fa-step-backward" aria-hidden="true"></i></button>
<div class="play-pause-wrap paused">
<div class="play-pause"><span></span></div>
</div>
<button class="playlist__next"><i class="fa fa-step-forward" aria-hidden="true"></i></button>
<!--Youtube Volume Control-->
<div class='bsp-volume-wrap'>
  <button id='bsp-volume'>
    <span class='fa fa-volume-up'></span>
  </button>
  <div class='bsp-volume-panel'>
    <div class='bsp-volume-slider'>
      <div class='bsp-volume-slider-track'>
        <div class='bsp-volume-slider-progress'>
          <div class='bsp-volume-slider-handle'></div>
        </div>
      </div>
    </div>
  </div>
</div>
<!--end of Youtube Volume Control-->
<div class="duration-time"></div>
<div class="add-to">
 <span class="likeButton fa fa-heart-o fa-6" aria-hidden="true"></span>
 <span class="repeatButton fa fa-repeat" aria-hidden="true"></span>
</div>
  <span id="YouTube-player-rate"></span>
  <div class="YouTube-player-speed-wrap"> 
  <input id="YouTube-player-speed" type="range" class="dark"  value="4" min="1" max="8" oninput="youTubePlayerSpeedChange(this.value);"></input>
  </div>
  <div id="YouTube-player-link"></div>
  </div>



    <div class="framed">
<label for="YouTube-video-id">videoId</label>:
          <input id="YouTube-video-id" type="text" value="yG0oBPtyNb0" size="12" pattern="[_\-0-9A-Za-z]{11}" onchange="youTubePlayerChangeVideoId();">
        
        <span class="nowrap">
          <button onclick="youTubePlayerPlay();">Play</button>
          <button onclick="youTubePlayerPause();">Pause</button>
          <button onclick="youTubePlayerStop();">Stop</button>
        </span>

<input id="YouTube-player-volume" type="range" value="50" min="0" max="100" oninput="youTubePlayerVolumeChange(this.value);"></input>

      <div id="YouTube-player-infos"></div>
      
      <div id="YouTube-player-fixed-infos"></div>
<!--loop-->

  <div>Start Time
    <input id="startForm" type="text" value="0">
  </div>
  <div>Duration
    <input id="durationForm" type="text" value="10">
  </div>
  <div>
    <input id="update" type="button" value="update" onclick="doUpdate()">
  </div>

<!--end of loop-->
    </div>
    
  </section>
<!--END OF YOUTUBE PLAYER-->



</div> 

  <ul class="playlist-thumbs">
  </ul>
  
</section>
<!--end of custom Youtube playlist-->

		<!--search content-->
<nav class="navbar">
   	
        	 <form class="form-inline " id="search-form" name="search-form" onSubmit="return search()">
                      	
<div class="input-style">
<input class="form-control search-field" type="search" id="query" placeholder="Search music...">
<button type="submit" id="search-btn" name="search-btn" ><i class="fa fa-search" aria-hidden="true"></i></button>
<div class="style"></div>
</div>
                </form>
        
</nav>
<div class="content">
<div class="container-fluid" id="results">

</div> <!-- ENd of container fluid -->
<div class="container-fluid">
	<div class="row">
    	<div class="col-sm-12">    <div id="btn-cnt"></div> </div>
  </div>
</div>
</div> <!-- End of content -->
	
<!--end of search content-->
<!--footer-->
<div id="footer">
<ul class="footer-menu footer-menu__left">
<li><a href="#">Legal</a></li>
<li><a href="#">Copyright owners and artists</a></li>
<li><a href="#">Privacy</a></li>
<li><a href="#">Cookies</a></li>
</ul>


<ul class="footer-menu footer-menu__right">
<a href="#" class="logotype__unsonet"></a>
<li><a href="#">About</a></li>
<li><a href="#">Help</a></li>
<li><a href="#">Language: English (US)</a></li>
<ul>



</div>
<!--end of footer-->
	</div>

</div>


<script type="text/javascript" src="src/js/youtube_player.js"></script>
<script type="text/javascript" src="src/js/youtube_volume_control.js"></script>
<script type="text/javascript" src="src/js/auto_complete.js"></script>
</body>
</html>