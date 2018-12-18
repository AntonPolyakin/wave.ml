<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Wave</title>


  <link rel="icon"  href="src/img/favicon.png" type="image/png">
  <link rel="stylesheet" type="text/css" href="src/css/style.css?ver=<?php echo date(dmYHis);?>" >
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
 
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
</head>
<body>

<div class="primary-nav">
	<nav role="navigation" class="menu">

		<div class="overflow-container">

			<ul class="menu-dropdown">

				<li><a href="#">Dashboard</a><span class="icon"><i class="fa fa-dashboard"></i></span></li>

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

				<li><a href="#">Messages</a><span class="icon"><i class="fa fa-envelope"></i></span></li>

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

		<!--search content-->
<nav class="navbar">
   	
        	 <form class="form-inline " id="search-form" name="search-form" onSubmit="return search()">
                      	
                                  <input class="form-control search-field" type="search" id="query" style="width:100%;"  placeholder="Search Youtube">
                                  <span class="focus-border">
                                            <i></i>
                                        </span>

                            	  <button class="btn btn-outline-danger my-2 my-sm-0 " type="submit" id="search-btn"  name="search-btn" value="">Search</button>
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
текст
</div>
<!--end of footer-->
	</div>

</div>


<script type="text/javascript" src="src/js/main.js?ver=<?php echo date(dmYHis);?>"></script>
</body>
</html>