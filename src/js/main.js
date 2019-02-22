
/*slider*/
document.addEventListener("DOMContentLoaded", function() {

	var prev = document.querySelector('.slider-leftBtn'),
	next = document.querySelector('.slider-rightBtn'),
	sliderMain = document.querySelector('.slider-main'),
	mainCoords = sliderMain.getBoundingClientRect(),
	sliderContainer = document.querySelector('.slider-container'),
	image = document.querySelector('.slider-container').children,
	display = parseInt(main.offsetWidth / parseInt(getComputedStyle(image[1]).width)); // main!

// for(let i = 0; i < image.length; i++ ){
// 	image[i].style.margin = '0px '+(sliderMain.offsetWidth / display) +'px';
// }

var sliderItemWidth = parseInt(getComputedStyle(image[1]).width) + parseInt(getComputedStyle(image[1]).marginLeft),
sliderItemOuterWidth = (main.offsetWidth-20)/display,
currentShift = 0, 
hidedDisplay,
leftMargin = parseInt(getComputedStyle(sliderContainer).marginLeft), 
rightMargin = ((image.length * sliderItemOuterWidth) - (display * sliderItemOuterWidth)); 

window.addEventListener('resize', function(){
  display = parseInt(main.offsetWidth / parseInt(getComputedStyle(image[1]).width)); // main!
  sliderItemOuterWidth = (main.offsetWidth-20)/display;
  rightMargin = ((image.length * sliderItemOuterWidth) - (display * sliderItemOuterWidth));
  if (currentShift != 0){
  	currentShift = hidedDisplay * sliderItemOuterWidth;
  }
  setSliderStyles();
  hideSliderButtons();
});

function setSliderStyles(){
	sliderContainer.style.marginLeft = currentShift + 'px';
	sliderContainer.style.gridTemplateColumns = `repeat( auto-fit, minmax(${sliderItemOuterWidth}px, 1fr) )`;
	sliderContainer.style.width = (image.length * sliderItemOuterWidth)  + 'px';
}
setSliderStyles();

function detectDisplayItems(){
	if (display <= 1){
		return display;
	}else{
		return (display - 1);
	}
}

function hideSliderButtons(){
	
	if(currentShift == 0){
		prev.style.display = "none";
	}else{
		prev.style.display = "block";
	}
	if (parseInt(currentShift) == parseInt(-(image.length * sliderItemOuterWidth - sliderItemOuterWidth * detectDisplayItems() - sliderItemOuterWidth))){
		next.style.display = "none";
	}else{
		next.style.display = "block";
	}
}
hideSliderButtons();

prev.addEventListener('click', function() { 
	currentShift += sliderItemOuterWidth * detectDisplayItems();
	if (currentShift > 0) {
		currentShift = 0;
	}
	sliderContainer.style.marginLeft = currentShift + 'px';
	hideSliderButtons();
	hidedDisplay = parseInt(currentShift / sliderItemOuterWidth);
});

next.addEventListener('click', function() {
	if (currentShift < rightMargin) {
		currentShift -= sliderItemOuterWidth * detectDisplayItems();
	}
	if (rightMargin + currentShift < 0) {
		currentShift -= rightMargin + currentShift;
	}
	sliderContainer.style.marginLeft = currentShift + 'px';
	hideSliderButtons();
	hidedDisplay = parseInt(currentShift / sliderItemOuterWidth);
});

});
/*end of slider*/


/*Custom ScrollBar JS*/
jQuery(document).ready(function(){
	jQuery('.menu-playlists').scrollbar();
});
/*end of Custom ScrollBar JS*/


/* header animation */
$(document).ready(function() {
	var isAnimateInitialized = false;
	var playerTop = $(".YouTube-player-controls").offset().top;

	function animateHeader(){
		$('#header').addClass('scrolled');
		setTimeout(function(){
			$('.menu').addClass('scrolled');
			$('.YouTube-player-controls').addClass('scrolled');
		},450);
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

	$("#query").on('keydown' , function ( e ) {
		if(e.key == "Enter"){
			$(this).autocomplete("close");
		}
	});

});
/*end of checked buttons*/




/* modal */
$(document).ready(function () {
    //get the height and width of the page
    // var window_width = $(window).width();
    // var window_height = $(window).height();
    //vertical and horizontal centering of modal window(s)
    /*we will use each function so if we have more then 1
    modal window we center them all*/
    $('.modal_window').each(function() {
        // //get the height and width of the modal
        // var modal_height = $(this).outerHeight();
        // var modal_width = $(this).outerWidth();
        // //calculate top and left offset needed for centering
        // var top = (window_height-modal_height)/2;
        // var left = (window_width-modal_width)/2;
        // //apply new top and left css values
        // $(this).css({'top' : top , 'left' : left});
    });

    //THE FUNCTIONS
    function closeModal() {
    	$('#mask').fadeOut(500);
    	$('body').css({
    		'overflow': 'auto'
    	});
    	$('.modal').fadeOut(500);
    	$('.modal_close').remove().fadeOut(500);

    }

    function showModal(modal_id) {
    	$('body').css({
    		'overflow': 'hidden'
    	});
    	$('.modal').prepend('<i class="fal fa-times modal_close" aria-hidden="true"></i>');
        //fade in the mask to opacity 0.8
        $('#mask').css({
        	'display': 'grid'
        }); 
        //show the modal window
        $('#' + modal_id).fadeIn(500);
        $('.modal_close').click(function() {
        //use the function to close it
        closeModal();
    });
    }

    $('.activate-modal').click(function() {
        //get the id of the modal window stored in the name of the activating element
        var modal_id = $(this).attr('name');
        //use the function to show it
        showModal(modal_id);
    });

    $('.modal_close').click(function() {
        //use the function to close it
        closeModal();
    });
    $(".YouTube-player-link__youtube").click(function() {
    	showModal('YouTube-player');
    });
    $("#mask").click(function() {
    	closeModal();
    });
    $(".modal").click(function(e) {
    	e.stopPropagation();
    });
});
/* end of modal */


/*input style*/
$(document).ready(function () {

	$(".input-style input").focus(function () {
		$(this).offsetParent().offsetParent().find(".style").animate({width: "100%"}, 500);
		$(this).offsetParent().offsetParent().find("button").toggleClass("active");  
	});
	$(".input-style input").blur(function () {
		$(this).offsetParent().offsetParent().find(".style").css({width: "0%"});
		$(this).offsetParent().offsetParent().find("button").toggleClass("active");    
	});

});
/*end of input style*/

/*youtube search*/
$(function() {
	$('#search-form').submit(function(e) {
		e.preventDefault();
		createRecentItem({key : "Enter"});
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
			maxResults: 30,
			type: 'video',
			key: 'AIzaSyBpNZaCp_3krSiIFImpeNQrBxVLPIbgGy0'}, 
			function(data) {
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				var pageInfo = data.pageInfo;
				
				$.each(data.items, function(i, item) {
					console.log(item.id.videoId);
		if (allPlaylists.search == null){
    allPlaylists.search = [item.id.videoId];
  }else{
    allPlaylists.search = [...allPlaylists.search, item.id.videoId];
  }	
					});
				getPlaylist('search', document.querySelector("#results"));
				var buttons = getButtons(prevPageToken,nextPageToken, pageInfo);
				
				//Display buttons
				$('#results').prepend(buttons);
				$('#btn-cnt').append(buttons);
			}
			);	
}


//Build the Buttons
function getButtons(prevPageToken,nextPageToken,pageInfo) {

	$('#btn-cnt').html('');	
	var btnoutput;
	var q = $('#query').val();
	if(!prevPageToken) {
		btnoutput = '<div class="button-container">' + 
		'<span class="total-results"><label>Total Results :</label>' + pageInfo.totalResults + '</span>' +
		'<button id="next-button" class="animated-button thar-three" data-token="' + 	nextPageToken + '" data-query="' + q +'"' +
		'onclick="nextPage();">Next Page</button><div class="clearfix"></div></div>';
		console.log(nextPageToken);
	} else {
		console.log(nextPageToken);
		btnoutput = '<div class="button-container">' +
		'<span class="total-results"><label>Total Results :</label>' + pageInfo.totalResults + '</span>' +
		'<button id="next-button" class="animated-button thar-three" data-token="' + 	nextPageToken + '" data-query="' + q +'"' +
		'onclick="nextPage();">Next Page</button>' +
		'<button id="prev-button" class="animated-button thar-four" data-token="' + 	prevPageToken + '" data-query="' + q +'"' +
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
			maxResults: 30,
			type: 'video',
			key: 'AIzaSyBpNZaCp_3krSiIFImpeNQrBxVLPIbgGy0'}, 
			function(data) {

				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				var pageInfo = data.pageInfo;
				
				$.each(data.items, function(i, item) {
						
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
		"https://www.googleapis.com/youtube/v3/search?videoCategoryId=10",{
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


/*Cookie*/
//body
$(window).on("load", function() {

	if($.cookie('body_class') !== null || $.cookie('body_class') != undefined){
		$('body').attr('class', $.cookie('body_class'));
	}

	$('.nav-toggle').on('click', function(e) {
		e.preventDefault();
		$("body").toggleClass("openNav");
		$(".nav-toggle").toggleClass("active");
		$.cookie('body_class', $('body').attr('class'));  
	});
});

$(document).ready(function() {
//sub-menu
$("input[type='checkbox']#playlists").prop("checked", JSON.parse($.cookie('sub-menu_bool')));
$('.sub-menu-checkbox').on('click', function(){
	$.cookie('sub-menu_bool', $("input[type='checkbox']#playlists").is(":checked"));
});
//current tab

//current index

//current playlist
});

/*end of Cookie*/