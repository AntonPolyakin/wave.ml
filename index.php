<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Wave</title>

	<link rel="icon"  href="src/img/favicon.png" type="image/png">
	<link rel="stylesheet" type="text/css" href="src/css/style.css?ver=<?php echo date(dmYHis);?>" >
	<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="src/css/font-awesome-5-6-3.css">
	<link rel="stylesheet" href="src/css/jquery.scrollbar.css">

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
	<script src="src/js/jquery.scrollbar.js"></script>


	<script type="text/javascript" src="src/js/main.js?ver=<?php echo date(dmYHis);?>"></script>

</head>
<body>


	<div class="primary-nav">
		<nav class="menu">

			<div class="overflow-container">

				<ul class="menu-dropdown">

					<li class="menu-tab" data-tabcontent="search">
						<span class="hide"></span>
						<span class="text">Search</span>
						<span class="icon"><i class="fas fa-search"></i></span>
					</li>

					<li class="menu-hasdropdown">
							<span class="hide"></span>
							<span class="text"><span>Playlists</span><span class="downarrow"><i class="fa fa-caret-down"></i></span></span>
							<span class="icon"><i class="fas fa-music"></i></span>
					</li> 

				</ul>
			
				<ul class="sub-menu-dropdown menu-playlists menu-dropdown">  
					<li>
						<span class="hide"></span>
						<span class="text">Add Playlist</span>
						<span class="icon" style="background:rgba(0, 0, 0, 0);border: 2px solid;">
							<i class="fas fa-plus"></i>
						</span>
					</li>  
					<li class="menu-tab" data-tabcontent="favorites">
						<span class="hide"><i class="fal fa-times-circle del-playlist"></i></span>
						<span class="text">Favourites</span>
						<span class="icon" style="background:var(--color-light)">
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
					<li class="menu-tab" data-tabcontent="import">
						<span class="hide"><i class="fal fa-times-circle del-playlist"></i></span>
						<span class="text">Imported Playlist</span>
						<span class="icon" style="background:#2ecc71">
							<i class="fa fa-cloud-upload"></i>
							<i class="icon-counter"></i>
						</span>
					</li>
					<li class="menu-tab" data-tabcontent="share">
						<span class="hide"><i class="fal fa-times-circle del-playlist"></i></span>
						<span class="text">Shared Playlist</span>
						<span class="icon" style="background:rgba(103, 0, 31, 1)">
							<i class="fas fa-share"></i>
							<i class="icon-counter"></i>
						</span>
					</li>
					
				
			
				</ul>

				<ul class="sub-menu-dropdown menu-artists menu-dropdown hided">  
					<li>
						<span class="hide"></span>
						<span class="text">Add Artist</span>
						<span class="icon" style="background:rgba(0, 0, 0, 0);border: 2px solid;">
							<i class="fas fa-plus"></i>
						</span>
					</li>  

					</ul>
					<ul class="menu-library menu-dropdown hided">  
					<li class="menu-tab open-library" data-tabcontent="library">
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
							<div class='YouTube-player-hint'><span></span></div>
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
				<div class="tab-content" data-tabcontent="search">

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
						<div id="btn-cnt__top"></div>
						<ul class="container-fluid acc-container" id="results">
							<li class="search-greeting">
								<h1>Search Wave</h1>
								<div>Find your favorite songs, artists, albums and playlists.</div>
							</li>
						</ul>
						<div id="btn-cnt__bottom"></div>
						
					</div>

				</div>

				<div class="tab-content" data-tabcontent="import">

					<div class="tab-content__header">     
					<div class="cover-container">
						<div class="cover-image" style="background: #2ecc71;">
							<i class="fa fa-cloud-upload"></i>
							<span class="play-button"></span>
						</div>  
					</div>	   

						<div class="album-info">
							<h1 class="album-info__title">Imported Playlist</h1>
							<p class="album-info__artist"></p>
							<p class="album-info__year"></p>
							<p class="album-info__songs"><span class="count"></span><span class="time"></span></p>
							<p class="album-info__tags"></p>
						</div>
						<!--PURE CSS SIDEBAR TOGGLE MENU-->
						<input type="checkbox" class="openSidebarMenu" id="SidebarMenu__import">
						<label for="SidebarMenu__import" class="sidebarIconToggle">
							<div class="spinner diagonal part-1"></div>
							<div class="spinner horizontal"></div>
							<div class="spinner diagonal part-2"></div>
						</label>
						<div class="sidebarMenu">
							<ul class="sidebarMenuInner">
								<li><button class="export btn" type="submit"><span>Export to Excel <i class="fa fa-cloud-download" aria-hidden="true"></i></span></button></li>
								<li><button class="btn" type="submit"><span>Add to Library <i class="fas fa-indent"></i></span></button></li>
								<li><button class="export btn" type="submit"><span>Share <i class="fas fa-share"></i></span></button></li>
							</ul>
						</div>
						<!--end of PURE CSS SIDEBAR TOGGLE MENU-->
					</div>

					<nav class="navbar">
						<div class="input-style search-container">
							<div class="search-inputs">
								<input type="text" class="search-result" data-search="import">
								<input type="text" class="search-bar" data-search="import" placeholder="Playlist search...">
							</div>  
							<button type="submit" id="search-btn" name="search-btn" ><i class="fa fa-search" aria-hidden="true"></i></button>
							<div class="style"></div>
						</div>
					</nav>

					<input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />

					<ul class="acc-container filter-block" data-playlist="import"></ul>
				</div>
				<div class="tab-content" data-tabcontent="favorites">
					<div class="tab-content__header">

						<div class="cover-container">
						<div class="cover-image" style="background: #6707b0;">
							<i class="fas fa-heart"></i>
							<span class="play-button"></span>
						</div>
						</div>

						<div class="album-info">
							<h1 class="album-info__title">Favourites</h1>
							<p class="album-info__artist"></p>
							<p class="album-info__year"></p>
							<p class="album-info__songs"><span class="count"></span><span class="time"></span></p>
							<p class="album-info__tags"></p>
						</div>

						<!--PURE CSS SIDEBAR TOGGLE MENU-->
						<input type="checkbox" class="openSidebarMenu" id="SidebarMenu__favorites">
						<label for="SidebarMenu__favorites" class="sidebarIconToggle">
							<div class="spinner diagonal part-1"></div>
							<div class="spinner horizontal"></div>
							<div class="spinner diagonal part-2"></div>
						</label>
						<div class="sidebarMenu">
							<ul class="sidebarMenuInner">
								<li><button class="export btn" type="submit"><span>Export to Excel <i class="fa fa-cloud-download" aria-hidden="true"></i></span></button></li>
								<li><button class="btn" type="submit"><span>Add to Library <i class="fas fa-indent"></i></span></button></li>
								<li><button class="export btn" type="submit"><span>Share <i class="fas fa-share"></i></span></button></li>
							</ul>
						</div>
						<!--end of PURE CSS SIDEBAR TOGGLE MENU-->
					</div>

					<nav class="navbar">
						<div class="input-style search-container">
							<div class="search-inputs">
								<input type="text" class="search-result" data-search="favorites">
								<input type="text" class="search-bar" data-search="favorites" placeholder="Playlist search...">
							</div>  
							<button type="submit" id="search-btn" name="search-btn" ><i class="fa fa-search" aria-hidden="true"></i></button>
							<div class="style"></div>
						</div>
					</nav>

					<!-- Bookmark -->
					<ul class="acc-container filter-block" data-playlist="favorites" ></ul>
					<!-- /Bookmark -->
				</div>

				<div class="tab-content" data-tabcontent="share">

					<div class="tab-content__header"> 
					<div class="cover-container">
						<div class="cover-image" style="background:rgba(103, 0, 31, 1)">
							<i class="fas fa-share"></i>
							<span class="play-button"></span>
						</div>
					</div>

						<div class="album-info">
							<h1 class="album-info__title">Shared Playlist</h1>
							<p class="album-info__artist"></p>
							<p class="album-info__year"></p>
							<p class="album-info__songs"><span class="count"></span><span class="time"></span></p>
							<p class="album-info__tags"></p>
						</div>

						<!--PURE CSS SIDEBAR TOGGLE MENU-->
						<input type="checkbox" class="openSidebarMenu" id="SidebarMenu__share">
						<label for="SidebarMenu__share" class="sidebarIconToggle">
							<div class="spinner diagonal part-1"></div>
							<div class="spinner horizontal"></div>
							<div class="spinner diagonal part-2"></div>
						</label>
						<div class="sidebarMenu">
							<ul class="sidebarMenuInner">
								<li><button class="export btn" type="submit"><span>Export to Excel <i class="fa fa-cloud-download" aria-hidden="true"></i></span></button></li>
								<li><button class="btn" type="submit"><span>Add to Library <i class="fas fa-indent"></i></span></button></li>
								<li><button class="export btn" type="submit"><span>Share <i class="fas fa-share"></i></span></button></li>
							</ul>
						</div>
						<!--end of PURE CSS SIDEBAR TOGGLE MENU-->
					</div>        

					<nav class="navbar">
						<div class="input-style search-container">
							<div class="search-inputs">
								<input type="text" class="search-result" data-search="share">
								<input type="text" class="search-bar" data-search="share" placeholder="Playlist search...">
							</div>  
							<button type="submit" id="search-btn" name="search-btn" ><i class="fa fa-search" aria-hidden="true"></i></button>
							<div class="style"></div>
						</div>
					</nav>

				</div> 
				<!--footer links-->
				<div class="tab-content" data-tabcontent="legal"></div> 
				<div class="tab-content" data-tabcontent="copyright">
					<div class="tab-content__wrapper">
						<h1>Copyright owners and artists</h1>
						<span>Audio recordings broadcast on Wave are automatically selected from video clips using the official API provided by youtube.com.
							The site Wave does not moderate the data received in the responses of the official API site youtube.com.
							Website Wave does not provide the ability to download audio recordings, does not provide their storage and does not have the ability to moderate them.
							All clips and audio recordings broadcast on the website Wave are stored and moderated on the website youtube.com.
							Thus, the site Wave is not responsible for the broadcast audio and video materials.
							If video clips violate copyrights, you must file a corresponding claim with the youtube.com service. If these requirements are met, the broadcast will automatically stop on all third-party sites, including Wave.
						If you are the owner of the video and do not want it to be broadcast on the website Wave, indicate this in the settings of this video clip on the website youtube.com. Broadcasting video on third-party sites will automatically stop.</span>
					</div>
				</div> 
				<div class="tab-content" data-tabcontent="ads"></div> 
				<div class="tab-content" data-tabcontent="cookies">
					<div class="tab-content__wrapper">
						<h1>Cookies</h1>
						<span>We use cookies to best represent our site. If you continue to use the site, we will assume that it suits you.Cookies are used to customize the site. By using this website, you accept the use of cookies.</span>
					</div> 
				</div> 
				<div class="tab-content" data-tabcontent="about">						
					<div class="meeting-block">
						<div class="meeting-logo"></div>
						<h1>
							Wave is a service for finding and listening to music, which gives you instant access to millions of songs from YouTube – from old favorites to the latest hits. Just hit play to stream anything you like. Listen everywhere. Wave is an open source project that works on your computer, mobile, tablet and TV. Unlimited, ad-free music. No ads.
						</h1>
					</div>	
				</div> 
				<div class="tab-content" data-tabcontent="help"></div>
				<!--end of footer links-->
				<!--library-->
				<div class="tab-content" data-tabcontent="library">
					<nav class="navbar">
						<div class="input-style search-container">
							<div class="search-inputs">
								<input type="text" class="search-result" data-search="library">
								<input type="text" class="search-bar" data-search="library" placeholder="Search...">
							</div>  
							<button type="submit" id="search-btn" name="search-btn" ><i class="fa fa-search" aria-hidden="true"></i></button>
							<div class="style"></div>
						</div>
					</nav>
					<!--slider-->
					<div class="slider-main">
						<button class="slider-leftBtn slider-arrow"><i class="fal fa-chevron-left"></i></button>
						<button class="slider-rightBtn slider-arrow"><i class="fal fa-chevron-right"></i></button>
						<ul class="slider-container">
							<li class="slider-container__first">start</li>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>6</li>
							<li>7</li>
							<li>8</li>
							<li>9</li>
							<li>10</li>
							<li>11</li>
							<li>12</li>
							<li>13</li>
							<li>14</li>
							<li class="slider-container__last">end</li>
						</ul>
					</div>
					<!--end slider-->

					<ul class="filter-block library" data-playlist="library">
						<li><div class="cover-image" style="background-image:url(https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg/220px-Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg)">
							<span class="play-button"></span>
						</div>
						<a class="filter-title">The Beatles - Sgt. Pepper's Lonely Hearts Club Band (1967)</a>
					</li>
					<li><div class="cover-image" style="background-image:url(https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Revolver.jpg/220px-Revolver.jpg)">
						<span class="play-button"></span>
					</div>
					<a class="filter-title">The Beatles - Revolver (1968)</a>
				</li>
				<li><div class="cover-image" style="background-image:url(https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Rubber_Soul.jpg/220px-Rubber_Soul.jpg)">
					<span class="play-button"></span>
				</div>
				<a class="filter-title">The Beatles - Rubber Soul (1966)</a>
			</li>
			<li><div class="cover-image" style="background-image:url(https://upload.wikimedia.org/wikipedia/ru/thumb/9/9d/Led_Zeppelin_I.jpg/270px-Led_Zeppelin_I.jpg)">
				<span class="play-button"></span>
			</div>
			<a class="filter-title">Led Zeppelin</a>
		</li>
		<li><div class="cover-image" style="background-image:url(https://upload.wikimedia.org/wikipedia/ru/c/c7/Led_zeppelin_IV_front.jpg)">
			<span class="play-button"></span>
		</div>
		<a class="filter-title">Led Zeppelin IV</a>
	</li>
</ul>
</div> 
<!--end of library-->
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
			<a href="#" target="_blank" title="Play Market"><i class="fab fa-google-play"></i></a>
			<a href="#" target="_blank" title="App Store"><i class="fab fa-app-store"></i></a>
			<a href="https://github.com/AntonPolyakin/wave.ml" target="_blank" title="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a>
			<a href="https://vk.com/wave_player" target="_blank" title="VK"><i class="fab fa-vk" aria-hidden="true"></i></a>
			<a href="#" class="logotype__unsonet"></a>
		</li>
		<li><a href="#" class="menu-tab" data-tabcontent="about">About</a></li>
		<li><a href="#" class="menu-tab" data-tabcontent="help">Help</a></li>
		<li><a href="#" class="activate-modal" name="modal__language">Language: English (US)</a></li>
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
				<span class="lyrics-artist">The Kinks</span> - <span class="lyrics-song">Lola (Mono Single Version "Cherry Cola") [2014 Remastered Version]</span>
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

	<!--Language-->
	<div id='modal__language' class='modal'>
		<div class='modal_wrapper'>
			<div class='modal_header'>Choose your language</div>

			<nav class="navbar">
				<div class="input-style search-container">
					<div class="search-inputs">
						<input type="text" class="search-result" data-search="languages">
						<input type="text" class="search-bar" data-search="languages" placeholder="language search...">
					</div>  
					<button type="submit" id="search-btn" name="search-btn" ><i class="fa fa-search" aria-hidden="true"></i></button>
					<div class="style"></div>
				</div>
			</nav>

			<ul class="languages filter-block" data-playlist="languages">
				<li><a class='filter-title' href='#' title='Afrikaans'>Afrikaans</a></li>
				<li><a class='filter-title' href='#' title='Albanian'>Shqip</a></li>
				<li><a class='filter-title' href='#' title='Amharic'>አማርኛ</a></li>
				<li><a class='filter-title' href='#' title='Arabic'> العربية</a></li>
				<li><a class='filter-title' href='#' title='Armenian'>Հայերեն</a></li>
				<li><a class='filter-title' href='#' title='Azerbaijani'>Azərbaycan</a></li>
				<li><a class='filter-title' href='#' title='Bangla'>বাংলা</a></li>
				<li><a class='filter-title' href='#' title='Basque'>Euskara</a></li>
				<li><a class='filter-title' href='#' title='Belarusian'>Беларуская</a></li>
				<li><a class='filter-title' href='#' title='Bosnian'>Bosanski</a></li>
				<li><a class='filter-title' href='#' title='Bulgarian'>Български</a></li>
				<li><a class='filter-title' href='#' title='Catalan'>Català</a></li>
				<li><a class='filter-title' href='#' title='Chinese'>中文</a></li>
				<li><a class='filter-title' href='#' title='Croatian'>Hrvatski</a></li>
				<li><a class='filter-title' href='#' title='Czech'>Čeština</a></li>
				<li><a class='filter-title' href='#' title='Danish'>Dansk</a></li>
				<li><a class='filter-title' href='#' title='Dutch'>Nederlands</a></li>
				<li><a class='filter-title' href='#' title='English'>English</a></li>
				<li><a class='filter-title' href='#' title='Estonian'>Eesti</a></li>
				<li><a class='filter-title' href='#' title='Filipino'>Filipino</a></li>
				<li><a class='filter-title' href='#' title='Finnish'>Suomi</a></li>
				<li><a class='filter-title' href='#' title='French'>Français</a></li>
				<li><a class='filter-title' href='#' title='Galician'>Galego</a></li>
				<li><a class='filter-title' href='#' title='Georgian'>ქართული</a></li>
				<li><a class='filter-title' href='#' title='German'>Deutsch</a></li>
				<li><a class='filter-title' href='#' title='Greek'>Ελληνικά</a></li>
				<li><a class='filter-title' href='#' title='Gujarati'>ગુજરાતી</a></li>
				<li><a class='filter-title' href='#' title='Hebrew'>עברית</a></li>
				<li><a class='filter-title' href='#' title='Hindi'>हिन्दी</a></li>
				<li><a class='filter-title' href='#' title='Hungarian'>Magyar</a></li>
				<li><a class='filter-title' href='#' title='Icelandic'>Íslenska</a></li>
				<li><a class='filter-title' href='#' title='Indonesian'>Bahasa Indonesia</a></li>
				<li><a class='filter-title' href='#' title='Italian'>Italiano</a></li>
				<li><a class='filter-title' href='#' title='Japanese'>日本語</a></li>
				<li><a class='filter-title' href='#' title='Kannada'>ಕನ್ನಡ</a></li>
				<li><a class='filter-title' href='#' title='Kazakh'>Қазақ Тілі</a></li>
				<li><a class='filter-title' href='#' title='Khmer'>ខ្មែរ</a></li>
				<li><a class='filter-title' href='#' title='Korean'>한국어</a></li>
				<li><a class='filter-title' href='#' title='Kyrgyz'>Кыргызча</a></li>
				<li><a class='filter-title' href='#' title='Lao'>ລາວ</a></li>
				<li><a class='filter-title' href='#' title='Latvian'>Latviešu valoda</a></li>
				<li><a class='filter-title' href='#' title='Lithuanian'>Lietuvių</a></li>
				<li><a class='filter-title' href='#' title='Macedonian'>Македонски</a></li>
				<li><a class='filter-title' href='#' title='Malay'>Bahasa Malaysia</a></li>
				<li><a class='filter-title' href='#' title='Malayalam'>മലയാളം</a></li>
				<li><a class='filter-title' href='#' title='Marathi'>मराठी</a></li>
				<li><a class='filter-title' href='#' title='Mongolian'>Монгол</a></li>
				<li><a class='filter-title' href='#' title='Myanmar (Burmese)'>ဗမာ</a></li>
				<li><a class='filter-title' href='#' title='Nepali'>नेपाली</a></li>
				<li><a class='filter-title' href='#' title='Norwegian'>Norsk</a></li>
				<li><a class='filter-title' href='#' title='Persian'>فارسی</a></li>
				<li><a class='filter-title' href='#' title='Polish'>Polski</a></li>
				<li><a class='filter-title' href='#' title='Portuguese'>Português</a></li>
				<li><a class='filter-title' href='#' title='Punjabi'>ਪੰਜਾਬੀ</a></li>
				<li><a class='filter-title' href='#' title='Romanian'>Română</a></li>
				<li><a class='filter-title' href='#' title='Russian'>Русский</a></li>
				<li><a class='filter-title' href='#' title='Serbian'>Српски</a></li>
				<li><a class='filter-title' href='#' title='Serbian (Latin)'>Srpski</a></li>
				<li><a class='filter-title' href='#' title='Sinhala'>සිංහල</a></li>
				<li><a class='filter-title' href='#' title='Slovak'>Slovenčina</a></li>
				<li><a class='filter-title' href='#' title='Slovenian'>Slovenščina</a></li>
				<li><a class='filter-title' href='#' title='Spanish'>Español</a></li>
				<li><a class='filter-title' href='#' title='Swahili'>Kiswahili</a></li>
				<li><a class='filter-title' href='#' title='Swedish'>Svenska</a></li>
				<li><a class='filter-title' href='#' title='Tamil'>தமிழ்</a></li>
				<li><a class='filter-title' href='#' title='Telugu'>తెలుగు</a></li>
				<li><a class='filter-title' href='#' title='Thai'>ภาษาไทย</a></li>
				<li><a class='filter-title' href='#' title='Turkish'>Türkçe</a></li>
				<li><a class='filter-title' href='#' title='Ukrainian'>Українська</a></li>
				<li><a class='filter-title' href='#' title='Urdu'>اردو</a></li>
				<li><a class='filter-title' href='#' title='Uzbek'>O‘zbek</a></li>
				<li><a class='filter-title' href='#' title='Vietnamese'>Tiếng Việt</a></li>
				<li><a class='filter-title' href='#' title='Zulu'>IsiZulu</a></li>
			</ul>
		</div>
	</div>
	<!--end of Language-->
</div>
<!--end of modal windows-->


<script src="src/js/get_playlist.js?ver=<?php echo date(dmYHis);?>"></script>
<script src="src/js/youtube_player.js?ver=<?php echo date(dmYHis);?>"></script>
<script src="src/js/youtube_volume_control.js"></script>
<script src="src/js/auto_complete.js"></script>
<script src="src/js/tabs.js?ver=<?php echo date(dmYHis);?>"></script>
</body>
</html>