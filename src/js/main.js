/* search favorites */
$(document).ready(function() {
    $(".search-bar").on('keyup', function() {
        var search = $(this).val().toLowerCase();
        //Go through each list item and hide if not match search

        $(".acc-container[data-playlist='favorites'] li").each(function() {
            if ($(this).find('.acc-title').text().toLowerCase().indexOf(search) != -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
/* end search language */

/* replaceAt */
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
/* end of replaceAt */

/*Google style search autocomplete*/
window.addEventListener("load", function() {
function findSearchResults(){
let array = [];
$(".acc-container[data-playlist='favorites'] .acc-title").each(function() {
array.push($(this).text());
});
return array;
}
var _results = findSearchResults(),

      _rEscapeChars = /\/|\\|\.|\||\*|\&|\+|\(|\)|\[|\]|\?|\$|\^/g,
      _rMatch = /[A-Z]?[a-z]+|[0-9]+/g,
      _keys = [
      13,
      9
    ],
      _length = _results.length,
      $_result = $('.search-result'),
      $_search = $('.search-bar'),
      $_searchContainer = $('.search-container'),
      _resultPlaceholder = $_result.val();

$_search.on( "keydown", function ( e ) {
  if ( _keys.indexOf( e.keyCode ) !== -1 ) {
    $_search.val( $_result.val() );
    return false;
  }
}).on( "keyup", function () {
  var value = $_search.val().replace( _rEscapeChars, "" ),
      regex = new RegExp( "^"+value, "i" ),
      matches = [];

  if ( value ) {
    for ( var i = _length; i--; ) {
      if ( regex.test( _results[ i ] ) ) {
        matches.push( _results[ i ] );
      } else {
        $_result.val( "" );
      }
    }

    if ( matches.length ) {
      for ( var i = matches.length; i--; ) {
        $_result.val( matches[ i ].replaceAt(0, $_search.val()) );
      }
    }
  } else {

    $_result.val( _resultPlaceholder.replaceAt(0, $_search.val()) );
  }

})
});
/*end of Google style search autocomplete*/


/*tabs*/
window.addEventListener("load", function() {
	var tabs = document.querySelectorAll('.menu-tab');
	var tabcontents = document.getElementById('tab-container').children;

	function setSomeStyles(int){
		tabcontents[int].style.width = 'auto';
		tabcontents[int].style.height = 'auto';
		
		tabcontents[int].style.visibility = 'visible';
	}

	function changeTab() {
		var tabchange = this.mynum;
		for(var int=0;int<tabcontents.length;int++){
			
			tabs[int].classList.remove('current-tab');
			
			tabcontents[int].classList.remove('tab-active');
			tabcontents[int].style.height = '0';
			tabcontents[int].style.width = '0';
			tabcontents[int].style.padding = '0';
			tabcontents[int].style.visibility = 'hidden';
		}
		
		tabcontents[tabchange].classList.add('tab-active');
		this.classList.add('current-tab');
		
		setSomeStyles(tabchange);
	}	

	for(var index=0;index<tabs.length;index++){
		tabs[index].mynum=index;
		tabs[index].addEventListener('click', changeTab, false);
	}
	setSomeStyles(0);
});
/*end of tabs*/
/*go to up*/
// объявим переменные
var bottom_position = 0; // положение страницы
var flag_bottom = false; // флаг, для отображения кнопки "назад"
var flag_animate = false;// Флаг, определяющий, выполнение анимации

$(document).ready(function(){
    // клик по кнопке вверх/назад
    $('.in_top').click(function(){
        // поднимаем флаг, началась выполнениние анимации
        flag_animate = true;
        // если на данный момент кнопка "назад"
        if(flag_bottom){
            // то скролим страницу в нужное место
            $("body,html").animate({"scrollTop":bottom_position}, 300, function(){ 
                // опускаем влаг анимации, она закончилась
                flag_animate = false;
            });
            // меняем кнопку
            flag_bottom = false;
            $('.in_top div').html('<span style="font-size: 30px" class="fa fa-angle-up" aria-hidden="true"></span>');
        }else{
            // если кнопка "вверх"
            $("body,html").animate({"scrollTop":0}, 300, function(){ 
            	flag_animate = false;
            });     
            // запомним на сколько была прокручена страница
            bottom_position = $(window).scrollTop();
            // и зададим флаг, что нужно показать кнопку "назад"
            flag_bottom = true;
            $('.in_top div').html('<span style="font-size: 30px" class="fa fa-angle-down" aria-hidden="true"></span>');
        }
    });
    
    // делаем проверку при скролле
    $(window).scroll(function(event){
    	var countScroll = $(window).scrollTop();
        // если прокрутили больше 100 пикселей и анимация не выполняется, то показываем кнопку
        if (countScroll > 100 && !flag_animate){
        	$('.in_top').show();
        	if(flag_bottom){
        		flag_bottom = false;
        		$('.in_top div').html('<span style="font-size: 30px" class="fa fa-angle-up" aria-hidden="true"></span>');
        	}
        // иначе прячем кнопку, если это не кнопка "назад"
    }else{
    	if(!flag_bottom){
    		$('.in_top').hide();
    	}
    }
});
});
/*end of go to up*/

/*cheked buttons*/
$(document).ready(function () {
	
	$(".repeatButton").click(function() {
		$(this).toggleClass("cheked");
	});

	$(".randomButton").click(function() {
		$(this).toggleClass("cheked");
	});
});

/*end of cheked buttons*/

/*popup player*/
$(document).ready(function () {
	$("#YouTube-player-link").click(function(e) {
		e.stopPropagation();
		$(".bg").toggle();
		$("#YouTube-player").toggle();
		$("html").css('overflow','hidden'); 

	});

	$(".bg").click(function() {
		$("html").css('overflow','auto'); 
		$(".bg").toggle();
		$("#YouTube-player").toggle();
	});

});
/*popup player*/


/*input style*/
$(document).ready(function () {

	$(".input-style input").focus(function () {
		$(".style").animate({width: "100%"}, 500);
		$(".input-style button").toggleClass("active");  
	});
	$(".input-style input").blur(function () {
		$(".style").css({width: "0%"});
		$(".input-style button").toggleClass("active");    
	});

});
/*end of input style*/



/* template srcript*/
$(window).on("load", function() {
	$('.nav-toggle').click(function(e) {
		e.preventDefault();
		$("body").toggleClass("openNav");
		$(".nav-toggle").toggleClass("active");

	});
});
/* end of template srcript*/

/*youtube search*/
$(function() {
	$('#search-form').submit(function(e) {
		e.preventDefault();
	})
});

function search() {
	//Clear any previous results 
	$('#results').html('');
	$('#btn-cnt').html('');	
	
	//Get form input
	var q = $('#query').val();
	
	//Run GET Request 	on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search?videoCategoryId=10",{
			part: 'snippet, id',
			q: q,
			maxResults: 24,
			type: 'video',
			key: 'AIzaSyBpNZaCp_3krSiIFImpeNQrBxVLPIbgGy0'}, 
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				var pageInfo = data.pageInfo;
				
				//Log data
				console.log(data);	
				
				$.each(data.items, function(i, item) {
						//Get output
						var output = getOutput(item);
						
						//Display results
						$('#results').append(output);	
					});
				
				var buttons = getButtons(prevPageToken,nextPageToken, pageInfo);
				
				//Display buttons
				$('#results').prepend(buttons);
				$('#btn-cnt').append(buttons);
			}
			);	
}

//Build Output
function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	console.log(videoId);
		//Build Output String
		var output = '<div class="row">' + 
		'<div class="col-sm-2">' +	
		'<a data-fancybox href="https://www.youtube.com/watch?v=' + videoId + '"><img class="img-fluid" src="' + thumb + '"></a>' +
		'</div>' +
		'<div class="col-sm-10">' + 
		'<h4><a data-fancybox href="https://www.youtube.com/watch?v=' + videoId + '">' + title + '</a></h4>' +
		'<small>By <span class="cTitle">' + channelTitle + '</span> on '+ videoDate + '</small>' +
		'<p>' + description + '</p>' +
		'</div>' +
		'</div>';
		return output;

	}

//Build the Buttons
function getButtons(prevPageToken,nextPageToken,pageInfo) {

	$('#btn-cnt').html('');	
	var btnoutput;
	var q = $('#query').val();
	if(!prevPageToken) {
		btnoutput = '<div class="button-container">' + 
		'<span class="total-results"><label>Total Results :</label>' + pageInfo.totalResults + '</span>' +
		'<button id="next-button" class="btn animated-button thar-three" data-token="' + 	nextPageToken + '" data-query="' + q +'"' +
		'onclick="nextPage();">Next Page</button><div class="clearfix"></div></div>';
		console.log(nextPageToken);
	} else {
		console.log(nextPageToken);
		btnoutput = '<div class="button-container">' +
		'<span class="total-results"><label>Total Results :</label>' + pageInfo.totalResults + '</span>' +
		'<button id="next-button" class="btn  animated-button thar-three" data-token="' + 	nextPageToken + '" data-query="' + q +'"' +
		'onclick="nextPage();">Next Page</button>' +
		'<button id="prev-button" class="btn  animated-button thar-four" data-token="' + 	prevPageToken + '" data-query="' + q +'"' +
		'onclick="prevPage();">Previous Page</button>' +
		'<div class="clearfix"></div></div>';
	}
	return btnoutput;
}

function nextPage() {

	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');
		//Clear any previous results 
		$('#results').html('');
		$('#btn-cnt').html('');	

	//Get form input
	q = $('#query').val();
	
	//Run GET Request 	on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search?videoCategoryId=10",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			maxResults: 24,
			type: 'video',
			key: 'AIzaSyBpNZaCp_3krSiIFImpeNQrBxVLPIbgGy0'}, 
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				var pageInfo = data.pageInfo;
				//Log data
				console.log(data);	
				
				$.each(data.items, function(i, item) {
						//Get output
						var output = getOutput(item);
						
						//Display results
						$('#results').append(output);	
					});
				
				var buttons = getButtons(prevPageToken,nextPageToken,pageInfo);
				
				//Display buttons
				$('#results').prepend(buttons);
				$('#btn-cnt').append(buttons);
			}
			);

}

function prevPage() {

	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');
		//Clear any previous results 
		$('#results').html('');
		$('#btn-cnt').html('');	

	//Get form input
	q = $('#query').val();
	
	//Run GET Request 	on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: 'AIzaSyAShx8QLS_bc-cvTWKPfKdNLq6P79mDifc'}, 
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				var pageInfo = data.pageInfo;
				//Log data
				console.log(data);	
				
				$.each(data.items, function(i, item) {
						//Get output
						var output = getOutput(item);
						
						//Display results
						$('#results').append(output);	
					});
				
				var buttons = getButtons(prevPageToken,nextPageToken,pageInfo);
				
				//Display buttons
				$('#results').prepend(buttons);
				$('#btn-cnt').append(buttons);
			}
			);

}
/*end of youtube search*/