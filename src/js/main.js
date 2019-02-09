
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


/*tabs*/
window.addEventListener("load", function() {

	var tabs,
	tabcontents;

	function updateTabsItems(){
		tabs = document.querySelectorAll('.menu-tab');
		tabcontents = document.getElementById('tab-container').children;
	}
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
		for(let int=0;int<tabcontents.length;int++){
			
			tabcontents[int].classList.remove('tab-active');
			tabcontents[int].style.height = '0';
			tabcontents[int].style.width = '0';
			tabcontents[int].style.padding = '0';
			tabcontents[int].style.visibility = 'hidden';

		}
		
		for(let int=0;int<tabs.length;int++){
			if(tabs[int].classList.contains("current-tab")){
				tabs[int].classList.remove('current-tab');
			}
		}	

		this.classList.add('current-tab');
		window.scrollTo(0, 0);
		setSomeStyles(tabchange);
	}	

	updateTabsItems();
	for(var index=0;index<tabs.length;index++){
		tabs[index].mynum=index;
		tabs[index].addEventListener('click', changeTab, false);
	}
	setSomeStyles('search');
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
		console.log($(this));
		$(this).offsetParent().offsetParent().find(".style").animate({width: "100%"}, 500);
		$(this).offsetParent().offsetParent().find("button").toggleClass("active");  
	});
	$(".input-style input").blur(function () {
		$(this).offsetParent().offsetParent().find(".style").css({width: "0%"});
		$(this).offsetParent().offsetParent().find("button").toggleClass("active");    
	});

});
/*end of input style*/

/*recent search items*/
window.addEventListener("load", function() {
	var globalSearch = document.querySelector(".search-field");
	var recentSearch = document.querySelector(".recent-search");
	var recentSearchList = document.querySelector(".recent-search__list");
	var recentSearchTitle = document.querySelector(".recent-search__title");
	var recentSearchCount = recentSearchList.childNodes.length;
	var clearBtn = document.querySelector(".clear-btn");

	var userSearches = [];

	globalSearch.addEventListener("keydown", event => {
		var keyName = event.key;
		if (event.key == "Enter") {
			let inputText = globalSearch.value.toLowerCase();
			if(userSearches.indexOf( `${inputText}` ) == -1 ){
				recentSearchList.insertAdjacentHTML(
					"beforeend",
					`<span class="search-item">${inputText}<span class="fal fa-times search-item__close"></span></span>`
					);

				searchLableHandler(recentSearchList.lastElementChild);
				searchCloseHandler(recentSearchList.lastElementChild.firstElementChild);

				userSearches = [...userSearches, inputText];
				localStorage.setItem("userRecentSearches", userSearches);
				detectSearchesLength();
			}
		} else {
		}
	});

	function detectSearchesLength(){
		recentSearchList = document.querySelector(".recent-search__list");
		if (recentSearchList.childNodes.length > 0) {
			clearBtn.innerHTML = "Clear Recent Searches";
			clearBtn.removeAttribute("disabled");
		}else{
			clearBtn.innerHTML = "No Recent Searches";
			clearBtn.setAttribute("disabled", true);
		}
	}

	function getRecentSearches(){ 
		if (localStorage.getItem("userRecentSearches") !== null){ 
			userSearches = localStorage.getItem("userRecentSearches").split(','); 
			for (let text of userSearches) { 
				recentSearchList.insertAdjacentHTML( 
					"beforeend", 
					`<span class="search-item">${text}<span class="fal fa-times search-item__close"></span></span>` 
					); 
			} 

			var btnClose = document.querySelectorAll(".search-item__close");
			var btnLable = document.querySelectorAll(".search-item");
			for (var i = 0; i < btnClose.length; i++) {
				searchCloseHandler(btnClose[i]);
				searchLableHandler(btnLable[i]);
			}

			clearBtn.addEventListener("click", function (){clearRecent()});

		}
	}

	function searchCloseHandler(element){
		element.addEventListener("click",function(e) {
			let index = userSearches.indexOf(e.currentTarget.parentElement.outerText);
			if (index > -1) {
				userSearches.splice(index, 1);
			}
			localStorage.setItem("userRecentSearches", userSearches);
			
			if(userSearches.length == 0){
				clearRecent();
			}
			
			e.currentTarget.parentNode.remove();
			detectSearchesLength();
		});			
	}

	function searchLableHandler(element){
		element.addEventListener("click", function (e){
			globalSearch.value = e.currentTarget.textContent;
		});
	}

	function clearRecent(){
		delete userSearches;
		localStorage.removeItem("userRecentSearches");
		recentSearchList.innerHTML = "";
		clearBtn.setAttribute("disabled", true);
		clearBtn.innerHTML = "No Recent Searches";
		globalSearch.value = '';
	};

	getRecentSearches();
	detectSearchesLength();
});
/*end of recent search items*/

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