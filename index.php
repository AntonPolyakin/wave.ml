<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Wave</title>

  <link rel="icon"  href="src/img/favicon.png" type="image/png">
  <link rel="stylesheet" type="text/css" href="src/css/style.css?ver=<?php echo date(dmYHis);?>" >
  <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
  <link rel="stylesheet" href="src/css/font-awesome-5-6-3.css">
  
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=no">
  <meta name="keywords" content="music, youtube">
  <meta name="description" content="Wave is an open source project that gives you instant access to millions of songs from YouTube – from old favorites to the latest hits. Just hit play to stream anything you like. Listen everywhere. Wave works on your computer, mobile, tablet and TV. Unlimited, ad-free music. No ads.">

  <meta property="og:locale" content="ru_RU"/>
  <meta property="og:url" content="<?php echo 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']; ?>" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Wave" />
  <meta property="og:description" content="Wave is an open source project that gives you instant access to millions of songs from YouTube – from old favorites to the latest hits. Just hit play to stream anything you like. Listen everywhere. Wave works on your computer, mobile, tablet and TV. Unlimited, ad-free music. No ads." />
  <meta property="og:image" content="src/img/wave_colored.png" />
  <meta property="og:site_name" content="Wave"/>
  

  <meta name="twitter:card" content="summary"/> 
  <meta name="twitter:title" content="Wave"/> 
  <meta name="twitter:description" content="Wave is an open source project that gives you instant access to millions of songs from YouTube – from old favorites to the latest hits. Just hit play to stream anything you like. Listen everywhere. Wave works on your computer, mobile, tablet and TV. Unlimited, ad-free music. No ads."/> 
  <meta name="twitter:image" content="/src/img/wave_colored.png"/>

  <meta name="yandex-tableau-widget" content="logo=/src/img/wave_colored.png, color=#2d034e" />

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
  <script src="src/js/jquery.cookie.min.js"></script>
  <script src="src/js/xlsx.full.min.js"></script>


  <script type="text/javascript" src="src/js/main.js?ver=<?php echo date(dmYHis);?>"></script>

</head>
<body>





  <div class="primary-nav">
   <nav class="menu">

    <div class="overflow-container">

     <ul class="menu-dropdown">

      <li class="menu-tab current-tab" data-tabcontent="search">
        <span class="hide"></span>
        <span class="text">Search</span>
        <span class="icon"><i class="fas fa-search"></i></span>
      </li>

      <li style="display:none" class="menu-hasdropdown">
       <label title="toggle menu" for="settings">
        <span class="hide"></span>
        <span class="text">Settings<span class="downarrow"><i class="fa fa-caret-down"></i></span></span>
        <span class="icon"><i class="fas fa-cog"></i></span>
      </label>
      <input type="checkbox" class="sub-menu-checkbox" id="settings" />
      <ul class="sub-menu-dropdown">
        <li>Profile</li>
        <li>Security</li>
        <li>Account</li>
      </ul>
    </li>

    <li class="menu-hasdropdown">
     <label title="toggle menu" for="playlists">
      <span class="hide"></span>
      <span class="text">Playlists<span class="downarrow"><i class="fa fa-caret-down"></i></span></span>
      <span class="icon"><i class="fas fa-music"></i></span>
    </label>
  </li> 

</ul>
<input type="checkbox" class="sub-menu-checkbox" id="playlists" />
   <ul class="sub-menu-dropdown menu-playlists menu-dropdown">  
      <li class="menu-tab" data-tabcontent="favorites">
        <span class="hide"><i class="fal fa-times-circle del-playlist"></i></span>
        <span class="text">Favourites</span>
        <span class="icon" style="background:rgba(103, 0, 31, 1)">
          <i class="fa fa-heart"></i>
          <i class="icon-counter"></i>
        </span>
      </li>
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
        <li>
        <span class="hide"></span>
        <span class="text">Sgt. Pepper’s Lonely Hearts Club Band</span>
        <span class="icon" style="background-image:url(http://novasloboda.ba/wp-content/uploads/2018/10/The-Beatles-Sgt-Pepper-920x584-240x240.jpg)">
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li>
        <span class="hide"></span>
        <span class="text">Recommendations</span>
        <span class="icon" style="background:rgba(34, 101, 163, 1)">
          <i class="fas fa-magic"></i>
          <i class="icon-counter"></i>
        </span>
      </li>  
      <li class="menu-tab" data-tabcontent="import">
        <span class="hide"><i class="fal fa-times-circle del-playlist"></i></span>
        <span class="text">Imported playlist</span>
        <span class="icon" style="background:#2ecc71">
          <i class="fa fa-cloud-upload"></i>
          <i class="icon-counter"></i>
        </span>
      </li>
    <li class="open-library">
        <span class="hide"><i class="fal fa-plus-circle add-playlist"></i></span>
        <span class="text">Library</span>
        <span class="icon">
          <i class="fas fa-th"></i>
        </span>
      </li>

    </ul>

</div>

</nav>

<div class="menu-header">
  <button class="hamburger open-panel nav-toggle">
    <span class="screen-reader-text">Menu</span>
  </button>
  <a href="#" class="logotype"></a>
</div>

</div>

<div class="new-wrapper">

  <div id="header"></div>

  <div id="banner"><span>This is not an ad unit, trust me</span></div> 

  <div id="sidebar-left">
    <!--go to-->
    <div class="in_top">
      <div><span class="fa fa-angle-up up-down" aria-hidden="true"></span></div>
    </div>
    <!--end of go to-->
  </div>

  <div id="main">

    <!--Custom Youtube playlist-->
    <div id="player">
    </div>
    <div class="player-controls">



      <!--YOUTUBE PLAYER-->
      <section>
        <div class="YouTube-player-controls">
          <div class="YouTube-player-details"><span class="YouTube-player-title"></span><span id="YouTube-player-errors"></span></div>
          <div class="wrap">    
            <input id="YouTube-player-progress" class="range" type="range" value="0" min="0" max="100" oninput="youTubePlayerCurrentTimeChange(this.value); youTubePlayerCurrentTimeSlide();"/>
            <div class='YouTube-player-hint'></div>
          </div>

          <div class="YouTube-player-buttons">
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
             <span class="likeButton" aria-hidden="true"></span>
             <span class="repeatButton fa-repeat" aria-hidden="true"></span>
             <span class="randomButton fa-random" aria-hidden="true"></span>
           </div>
           <span id="YouTube-player-rate"></span>
           <div class="YouTube-player-speed-wrap"> 
            <input id="YouTube-player-speed" type="range" class="dark"  value="4" min="1" max="8" oninput="youTubePlayerSpeedChange(this.value);"/>
          </div>
          <div class="YouTube-player-link__youtube"></div>
          <div class="YouTube-player-link__lastfm">
            <a href="#"><i class="fab fa-lastfm"></i></a>
          </div>
        </div>

      </div>



      <div class="framed">
        <label for="YouTube-video-id">videoId</label>:
        <input id="YouTube-video-id" type="text" value="yG0oBPtyNb0" size="12" pattern="[_\-0-9A-Za-z]{11}" onchange="youTubePlayerChangeVideoId();">

        <span class="nowrap">
          <button onclick="youTubePlayerPlay();">Play</button>
          <button onclick="youTubePlayerPause();">Pause</button>
          <button onclick="youTubePlayerStop();">Stop</button>
        </span>

        <input id="YouTube-player-volume" type="range" value="50" min="0" max="100" oninput="youTubePlayerVolumeChange(this.value);"/>

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
  <!--TABS-->
  <div id="tab-container">

    <!--end of custom Youtube playlist-->
    <div class="tab-content tab-active" data-tabcontent="search">

      <!--search content-->
      <nav class="navbar">
        <form class="form-inline " id="search-form" name="search-form" onSubmit="return search()">
          <div class="input-style">
            <input class="form-control search-field" type="search" id="query" placeholder="Search music...">
            <button type="submit" id="search-btn" name="search-btn" ><i class="fa fa-search" aria-hidden="true"></i></button>
            <div class="style"></div>
          </div>
        </form>
      <div class="recent-search">
        <button class="clear-btn"></button>
        <div class="recent-search__list"></div>
      </div>

      </nav>

      <div class="content">
        <div class="container-fluid" id="results">

          <div class="meeting-block">
            <div class="meeting-logo"></div>
            <h1>
              Wave is an open source project that gives you instant access to millions of songs from YouTube – from old favorites to the latest hits. Just hit play to stream anything you like. Listen everywhere. Wave works on your computer, mobile, tablet and TV. Unlimited, ad-free music. No ads.
            </h1>
          </div>

        </div> <!-- ENd of container fluid -->
        <div class="container-fluid">
         <div class="row">
           <div class="col-sm-12">    <div id="btn-cnt"></div> </div>
         </div>
       </div>
     </div> <!-- End of content -->

   </div>
   <div class="tab-content" data-tabcontent="import">

    <nav class="navbar">
      <div class="input-style" class="search-container">
        <div class="search-inputs">
          <input type="text" class="search-result" data-search="import">
          <input type="text" class="search-bar" data-search="import" placeholder="Playlist search...">
        </div>  
        <button type="submit" id="search-btn" name="search-btn" ><i class="fa fa-search" aria-hidden="true"></i></button>
        <div class="style"></div>
      </div>
    </nav>

    <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />

    <ul class="acc-container" data-playlist="import"></ul>
  </div>
  <div class="tab-content" data-tabcontent="favorites">
    <div class="tab-content__header">
      <div class="image" style="background-image: url(https://images.rapgenius.com/8696066d49c86f50639519e6914d83cd.1000x1000x1.jpg)"><span class="play-button"></span></div>
      <div class="content">
        <h1 class="content__title">My Song</h1>
        <p class="content__artist">Labi Siffre</p>
        <p class="content__album">Crying, Laughing, Loving, Lying</p>
      </div>

<!--PURE CSS SIDEBAR TOGGLE MENU-->
<input type="checkbox" class="openSidebarMenu" id="openSidebarMenu">
  <label for="openSidebarMenu" class="sidebarIconToggle">
    <div class="spinner diagonal part-1"></div>
    <div class="spinner horizontal"></div>
    <div class="spinner diagonal part-2"></div>
  </label>
  <div id="sidebarMenu">
    <ul class="sidebarMenuInner">
      <li><button class="export btn" type="submit"><span>Export to Excel <i class="fa fa-cloud-download" aria-hidden="true"></i></span></button></li>
      <li><button class="btn" type="submit"><span>Add to Library <i class="fas fa-indent"></i></span></button></li>
      <li><button class="export btn" type="submit"><span>Share <i class="fas fa-share"></i></span></button></li>
    </ul>
  </div>
<!--end of PURE CSS SIDEBAR TOGGLE MENU-->

    </div>
    <nav class="navbar">
      <div class="input-style" class="search-container">
        <div class="search-inputs">
          <input type="text" class="search-result" data-search="favorites">
          <input type="text" class="search-bar" data-search="favorites" placeholder="Playlist search...">
        </div>  
        <button type="submit" id="search-btn" name="search-btn" ><i class="fa fa-search" aria-hidden="true"></i></button>
        <div class="style"></div>
      </div>
    </nav>

    <!-- Bookmark -->
    <ul class="acc-container" data-playlist="favorites" ></ul>
    <!-- /Bookmark -->

  </div>
<!--footer links-->
<div class="tab-content" data-tabcontent="legal"></div> 
<div class="tab-content" data-tabcontent="copyright"><span>говно</span></div> 
<div class="tab-content" data-tabcontent="ads"></div> 
<div class="tab-content" data-tabcontent="cookies"></div> 
<div class="tab-content" data-tabcontent="about"></div> 
<div class="tab-content" data-tabcontent="help"></div>
<!--end of footer links-->


</div>
<!--END OF TABS-->
<!--end of search content-->
<!--footer-->
<div id="footer">
  <ul class="footer-menu footer-menu__left">
    <li><a href="#" class="activate-modal" name="modal__lyrics">Legal</a></li>
    <li><a href="#" class="menu-tab" data-tabcontent="copyright">Copyright owners and artists</a></li>
    <li><a href="#" class="menu-tab" data-tabcontent="ads">Advertisment</a></li>
    <li><a href="#" class="menu-tab" data-tabcontent="cookies">Cookies</a></li>
  </ul>

  <ul class="footer-menu footer-menu__right">
    <li class="follow-block">
      <a href="https://github.com/AntonPolyakin/wave.ml" target="_blank" title="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
      <a href="https://vk.com/wave_player" target="_blank" title="VK"><i class="fab fa-vk" aria-hidden="true"></i></a>
      <a href="#" class="logotype__unsonet"></a>
    </li>
    <li><a href="#" class="menu-tab" data-tabcontent="about">About</a></li>
    <li><a href="#" class="menu-tab" data-tabcontent="help">Help</a></li>
    <li><a href="#">Language: English (US)</a></li>
  </ul>
</div>
<!--end of footer-->
</div>


<div id="sidebar-right">
</div>


</div>
<!--modal windows-->
<div id="mask">

  <div id='modal__lyrics' class='modal'>
    <div class='modal_wrapper'>
      <div class='modal_header'>
        <h1 class="lyrics-title"><span class="lyrics-artist">The Kinks</span><span class="lyrics-song">Lola (Mono Single Version "Cherry Cola") [2014 Remastered Version]</h1>
        </div>
        <div class='modal_content'>
          <p class="lyrics-block">I met her in a club down in old Soho<br>
            Where you drink champagne and it tastes just like Coca-Cola<br>
            C-O-L-A, Cola<br>
            She walked up to me and she asked me to dance<br>
            I asked her her name and in a dark brown voice she said Lola<br>
            L-O-L-A, Lola<br>
            La-la-la-la Lola<br>
            <br>
            Well, I'm not the world's most physical guy<br>
            But when she squeezed me tight she nearly broke my spine, oh my Lola<br>
            La-la-la-la Lola<br>
            Well, I'm not dumb but I can't understand<br>
            Why she walked like a woman but talked like a man, oh my Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
            <br>
            Well, we drank champagne and danced all night<br>
            Under electric candlelight<br>
            She picked me up and sat me on her knee<br>
            And said "Dear boy, won't you come home with me?"<br>
            Well, I'm not the world's most passionate guy<br>
            But when I looked in her eyes, well I almost fell for my Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
            Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
            <br>
            I pushed her away<br>
            I walked to the door<br>
            I fell to the floor<br>
            I got down on my knees<br>
            Then I looked at her and she at me<br>
            <br>
            Well, that's the way that I want it to stay<br>
            And I always want it to be that way for my Lola<br>
            La-la-la-la Lola<br>
            Girls will be boys and boys will be girls<br>
            It's a mixed up, muddled up, shook up world, except for Lola<br>
            La-la-la-la Lola<br>
            <br>
            Well, I left home just a week before<br>
            And I'd never ever kissed a woman before<br>
            But Lola smiled and took me by the hand<br>
            And said "Dear boy, I'm gonna make you a man"<br>
            <br>
            Well, I'm not the world's most masculine man<br>
            But I know what I am and I'm glad I'm a man<br>
            And so is Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
            <br>
            Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
            <br>
            Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
            <br>
            Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
            <br>
            Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
            <br>
            Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
            <br>
            Lola<br>
            La-la-la-la Lola<br>
            La-la-la-la Lola<br>
          </p>
        </div>
      </div>
    </div>

    <div id="YouTube-player" class="modal"></div>

  </div>
  <!--end of modal windows-->



  <script src="src/js/youtube_player.js?ver=<?php echo date(dmYHis);?>"></script>
  <script src="src/js/youtube_volume_control.js"></script>
  <script src="src/js/auto_complete.js"></script>
</body>
</html>