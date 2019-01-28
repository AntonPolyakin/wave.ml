
/* header animation */
$(document).ready(function() {
var isAnimateInitialized = false;
var playerTop = $(".YouTube-player-controls").offset().top;

function animateHeader(){
    $('#header').addClass('scrolled');
    $('.menu').addClass('scrolled');
    $('.YouTube-player-controls').addClass('scrolled');
    isAnimateInitialized = true;
}

$(window).scroll(function() {
    if ( $(this).scrollTop() > playerTop){
        if (!isAnimateInitialized) {
            animateHeader();
        }
    }else{
    	$('#header').removeClass('scrolled');
    	$('.menu').removeClass('scrolled');
    	$('.YouTube-player-controls').removeClass('scrolled');
    	isAnimateInitialized = false;
    }
});
});
/* end of header animation */

/* HTML5 drag and drop file uploader */

var globalFunctions = {};

globalFunctions.ddInput = function(elem) {
	if ($(elem).length == 0 || typeof FileReader === "undefined") return;
	var $fileupload = $('input[type="file"]');
	var noitems = '<li class="no-items"><span class="link-text underline">Browse</span> Excel (.xlsx) file or drop here to import a playlist</li>';
	var hasitems = '<div class="browse hasitems">Other file to upload? <span class="link-text underline">Browse</span> or drop here</div>';
	var file_list = '<ul class="file-list"></ul>';
	var rmv = '<div class="remove"><i class="fal fa-times"></i></div>'

	$fileupload.each(function() {
		var self = this;
		var $dropfield = $('<div class="drop-field"><div class="drop-area"></div></div>');
		$(self).after($dropfield).appendTo($dropfield.find('.drop-area'));
		var $file_list = $(file_list).appendTo($dropfield);
		$dropfield.append(hasitems);
		$dropfield.append(rmv);
		$(noitems).appendTo($file_list);
		var isDropped = false;
		$(self).on("change", function(evt) {
			if ($(self).val() == "") {
				$file_list.find('li').remove();
				$file_list.append(noitems);
			} else {
				if (!isDropped) {
					$dropfield.removeClass('hover');
					$dropfield.addClass('loaded');
					var files = $(self).prop("files");
					traverseFiles(files);
				}
			}
		});

		$dropfield.on("dragleave", function(evt) {
			$dropfield.removeClass('hover');
			evt.stopPropagation();
		});

		$dropfield.on('click', function(evt) {
			$(self).val('');
			$file_list.find('li').remove();
			$file_list.append(noitems);
			$dropfield.removeClass('hover').removeClass('loaded');
		});

		$dropfield.on("dragenter", function(evt) {
			$dropfield.addClass('hover');
			evt.stopPropagation();
		});

		$dropfield.on("drop", function(evt) {
			isDropped = true;
			$dropfield.removeClass('hover');
			$dropfield.addClass('loaded');
			var files = evt.originalEvent.dataTransfer.files;
			traverseFiles(files);
			isDropped = false;
		});


		function appendFile(file) {
			console.log(file);
			$file_list.append('<li>' + file.name + '</li>');
		}

		function traverseFiles(files) {
			if ($dropfield.hasClass('loaded')) {
				$file_list.find('li').remove();
			}
			if (typeof files !== "undefined") {
				for (var i = 0, l = files.length; i < l; i++) {
					appendFile(files[i]);
				}
			} else {
				alert("No support for the File API in this web browser");
			}
		}

	});
};

$(document).ready(function() {
	globalFunctions.ddInput('input[type="file"]');
});


/* end of HTML5 drag and drop file uploader */


/*tabs*/
window.addEventListener("load", function() {
	var tabs = document.querySelectorAll('.menu-tab');
	var tabcontents = document.getElementById('tab-container').children;

	function setSomeStyles(attr){
		for(let int=0;int<tabcontents.length;int++){
			if (tabcontents[int].getAttribute('data-tabcontent') == attr){
				tabcontents[int].style.width = 'auto';
				tabcontents[int].style.height = 'auto';
				tabcontents[int].style.visibility = 'visible';
				tabcontents[int].classList.add('tab-active');
			}
		}
	}

	function changeTab() {
		var tabchange = this.getAttribute('data-tabcontent');
		for(var int=0;int<tabcontents.length;int++){
			

			tabs[int].classList.remove('current-tab');
			tabcontents[int].classList.remove('tab-active');
			tabcontents[int].style.height = '0';
			tabcontents[int].style.width = '0';
			tabcontents[int].style.padding = '0';
			tabcontents[int].style.visibility = 'hidden';

		}
		
		
		this.classList.add('current-tab');
		window.scrollTo(0, 0);
		setSomeStyles(tabchange);
	}	

	for(var index=0;index<tabs.length;index++){
		tabs[index].mynum=index;
		tabs[index].addEventListener('click', changeTab, false);
	}
	setSomeStyles('home');
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
            $('.in_top div').html('<span class="fa fa-angle-up up-down" aria-hidden="true"></span>');
        }else{
            // если кнопка "вверх"
            $("body,html").animate({"scrollTop":0}, 300, function(){ 
            	flag_animate = false;
            });     
            // запомним на сколько была прокручена страница
            bottom_position = $(window).scrollTop();
            // и зададим флаг, что нужно показать кнопку "назад"
            flag_bottom = true;
            $('.in_top div').html('<span class="fa fa-angle-down up-down" aria-hidden="true"></span>');
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
        		$('.in_top div').html('<span class="fa fa-angle-up up-down" aria-hidden="true"></span>');
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

/*checked buttons*/
$(document).ready(function () {
	
	$(".repeatButton").click(function() {
		$(this).toggleClass("checked");
	});

	$(".randomButton").click(function() {
		$(this).toggleClass("checked");
	});

});

/*end of checked buttons*/

/*popup player*/
$(document).ready(function () {
	$(".YouTube-player-link__youtube").click(function(e) {
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