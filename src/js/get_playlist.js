    /*GET PLAYLIST FUNCTION*/
    function getPlaylist(dataPlaylist, playlistContainer) {

      allPlaylistTags[`${dataPlaylist}`] = [];
      var currentPlaylist = allPlaylists[`${dataPlaylist}`];
      currentPlaylist.forEach(function (id, i) {
        var activeClass = '';
        // if ( i === currentIndex ) {
        //   activeClass = 'is-active';
        // }

        playlistContainer.setAttribute('data-playlist', dataPlaylist);

        playlistContainer.innerHTML += `
        <li class="acc-item ${activeClass}" data-videoid="${id}">
        <div class="acc-hide"></div>
        <div class="acc-btn">
        <span class="acc-cover" style="background-image:url(https://img.youtube.com/vi/${id}/default.jpg);"></span>
        <span class="acc-title filter-title"></span>

        <span class="acc-controls">
        <span class="controls-menu">
        <span class="controls-hide">
        <i class="fas fa-arrow-alt-to-bottom controls-download"></i>
        <i class="fas fa-share controls-share"></i>
        <i class="fas fa-tasks controls-add"></i>
        <i class="fas fa-times controls-del"></i>
        </span>
        <span class="fas fa-ellipsis-v controls-toggler"></span>
        </span>
        <span class="controls-time"></span>
        </span>

        </div>
        <span class="likeButton" aria-hidden="true"></span>
        <div class="acc-content">
        <div class="acc-content-inner"></div>
        </div>
        </li>`;

      });

      /*forEach */
      currentPlaylist.forEach(function (id, i) {
        // Do not work because of https, need a proxy or yahoo query
        /*
          $.getJSON('//www.youtube.com/oembed', {
            format: 'json',
            url: url
            dataType: "jsonp",
            jsonpCallback: "localJsonpCallback"
          }, function(data) {
            */
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=AIzaSyBpNZaCp_3krSiIFImpeNQrBxVLPIbgGy0`).then(function (data) {
          return data.json();
        }).then(function (data) {

          try {
            // add tags to obj
            if (data.items[0].snippet.tags && data.items[0].snippet.tags.length > 0) {
              allPlaylistTags[`${dataPlaylist}`] = [...allPlaylistTags[`${dataPlaylist}`], ...data.items[0].snippet.tags];
            }

            document.querySelectorAll('.acc-container[data-playlist=' + dataPlaylist + '] .acc-title')[i].innerHTML = data.items[0].snippet.localized.title;
            let durationString = data.items[0].contentDetails.duration;
            durationString = durationString.replace(/S|PT/g, '').replace(/H|M/g, ':').split(':');
            durationString.forEach(function (t, i) {
              function addAfterNull(n) {
                if (n > 0 && n < 10) {
                  n = '0' + n;
                  return n;
                } else if (n == 0) {
                  return '00';
                } else {
                  return n;
                }
              }
              durationString[i] = addAfterNull(t);
            });
            durationString = durationString.join(':');
            document.querySelectorAll('.acc-container[data-playlist=' + dataPlaylist + '] .acc-controls .controls-time')[i].innerHTML = durationString;


          } catch (err) {}

        }).then(function () {
          document.querySelector(`[data-tabcontent="${dataPlaylist}"] .album-info__songs .time`).textContent = '(' + secondsToHms(getPlaylistDuration(`${dataPlaylist}`)) + ')';

          /*second fetch*/ ///ERROR !!!!!!!!!!!!!!!!!!!!!
          new Promise(function (resolve, reject) {
            $.get(`http://cors-anywhere.herokuapp.com/http://web.archive.org/web/www.youtube.com/watch?v=${id}`, function (data) {
              resolve(data);
            });
          }).then(function (data) {

            var data_hr = jQuery.extend(true, {}, $(data));
            var linkToTitle = $(data_hr).find('.watch-extras-section').children('.watch-meta-item.yt-uix-expander-body').children('.title');
            var musicInfo = {
              song: linkToTitle.filter(function (i) {
                return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Song`;
              }).siblings(".content.watch-info-tag-list").children().text(),
              artist: linkToTitle.filter(function (i) {
                return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Artist`;
              }).siblings(".content.watch-info-tag-list").children().text(),
              album: linkToTitle.filter(function (i) {
                return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Album`;
              }).siblings(".content.watch-info-tag-list").children().text(),
              writers: linkToTitle.filter(function (i) {
                return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Writers`;
              }).siblings(".content.watch-info-tag-list").children().text(),
              licensed: linkToTitle.filter(function (i) {
                return linkToTitle[i].innerText.replace(/\s+/g, " ").trim() == `Licensed to YouTube by`;
              }).siblings(".content.watch-info-tag-list").children().text()
            }

            var musicInfoText = {
              song: 'Song',
              artist: 'Artist',
              album: 'Album',
              writers: 'Writers',
              licensed: 'Licensed by'
            }

            $.each(musicInfo, function (title) {
              var elemDesc = [];
              if (musicInfo[`${title}`] !== '') {

                if (title == 'licensed') {
                  elemDesc = musicInfo[`${title}`];

                } else if (title == 'writers' && musicInfo[`${title}`].includes(',')) {
                  var arrDesc = musicInfo[`${title}`].split(',');
                  for (let n of arrDesc) {
                    elemDesc.push('<a href="#">' + n + '</a>');
                  }
                  elemDesc = elemDesc.join(', ');
                } else {
                  elemDesc = '<a class="description-link__${title}" href="#">' + musicInfo[`${title}`] + '</a>';
                }
                $(`.acc-container[data-playlist="${dataPlaylist}"] .acc-content-inner:eq(${i})`).append(`
        <p><span class="music-info-title">${musicInfoText[`${title}`]}:</span><span class="music-info-description">${elemDesc}</span></p>
        `);
              }
            });

            return musicInfo;

          }).then(function (dataInfoBase) {
            if (dataInfoBase.artist) {
              getTopTags(dataInfoBase.artist, dataInfoBase.album);
            }

            function getTopTags(artist, album) {
              if (arguments.length != 0) {
                let detectMethod = (arg) => (arguments.length == 2) ? 'album' : 'artist';
                let url = `https://ws.audioscrobbler.com/2.0/?method=${detectMethod(arguments)}.getTopTags&autocorrect=1&artist=${escape(artist)}&album=${escape(album)}&user=RJ&api_key=10841853e5ac190a3e4ec2beae95a6f0&format=json`;

                fetch(url).then(response => {
                  return response.json();
                }).then(function (data) {

                  if (data.toptags) {

                    if (detectMethod.call(this) == 'album' && data.toptags.tag.length == 0) {
                      getTopTags(artist);
                    } else {

                      for (let topTags of data.toptags.tag) {
                        allPlaylistTags[`${dataPlaylist}`] = [...allPlaylistTags[`${dataPlaylist}`], topTags.name];
                      }
                      insertPlaylistTags(`${dataPlaylist}`);
                    }
                  }
                });
              }
            }

          });
          /*end of second fetch*/

        });
        // if(currentPlaylist.length == ++i){}
      });
      /*end of forEach */









      //add event to like buttons

      setHandlers(dataPlaylist);

      playlistItems = document.querySelectorAll('.acc-container[data-playlist=' + dataPlaylist + '] .acc-item');

    }
    /*END OF GET PLAYLIST FUNCTION*/


    /* set handlers to elements */
    function setHandlers(dataPlaylist) {
      let allPlaylistItems,
        string;
      dataPlaylist ? string = `[data-playlist='${dataPlaylist}']` : string = '';

      allPlaylistItems = document.querySelectorAll(`.acc-container${string} .acc-item`);

      for (let i = 0; i < allPlaylistItems.length; i++) {
        allPlaylistItems[i].children[1].addEventListener('click', selectThisPlaylistItem);
        document.querySelectorAll(`.acc-container${string} .likeButton`)[i].addEventListener("click", likeStateHandler);
        document.querySelectorAll(`.acc-container${string} .acc-hide`)[i].addEventListener("click", hideBtnStateHandler);
        /* acc controls menu */
        document.querySelectorAll(`.acc-container${string} .controls-toggler`)[i].addEventListener("click", function (e) {
          e.stopPropagation();
          document.querySelectorAll(`.acc-container${string} .controls-hide`)[i].classList.toggle('show');
        });
        document.querySelectorAll(`.acc-container${string} .acc-btn`)[i].addEventListener('mouseleave', function () {
          document.querySelectorAll(`.acc-container${string} .controls-hide`)[i].classList.remove('show');
        });
        /* end of acc controls menu */

      }

    }
    /* end of set handlers to elements */


    function insertPlaylistCounter(dataPlaylist, selector) {
      document.querySelector(`[data-tabcontent="${dataPlaylist}"] ${selector}`).innerHTML = `<i>${getPlaylistLength(dataPlaylist)}</i> <i class="numerals__song">Songs</i>`;
    }


    // select playlist item
    function selectThisPlaylistItem(event) {
      currentDataPlaylist = $(event.currentTarget).parents('.acc-container').eq(0).attr("data-playlist");

      currentPlaylist = allPlaylists[currentDataPlaylist];

      playlistItems = document.querySelectorAll('.acc-container[data-playlist="' + currentDataPlaylist + '"] .acc-item');
      if (currentIndex != [...playlistItems].findIndex(n => n.contains(this))) {
        currentIndex = [...playlistItems].findIndex(n => n.contains(this));
        setActiveClass(currentDataPlaylist);
      } else {
        if (currentDataPlaylist != prevPlaylist) {
          currentIndex = [...playlistItems].findIndex(n => n.contains(this));
          setActiveClass(currentDataPlaylist);
        } else {
          detectButtonState();
        }
      }
    }
    // end of select playlist item


    function insertPlaylistTags(dataPlaylist) {

      document.querySelector(`.tab-content[data-tabcontent="${dataPlaylist}"] .album-info__tags`).innerHTML = '';

      for (let i = 0; i < 6; i++) {
        for (let prop in getPlaylistTags(`${dataPlaylist}`)[i]) {
          if (getPlaylistTags(`${dataPlaylist}`)[i][prop] > 2) {
            document.querySelector(`.tab-content[data-tabcontent="${dataPlaylist}"] .album-info__tags`).insertAdjacentHTML('beforeend', getSearchesTemplate(prop));
          }
        }
      }

      var btnPlaylistLable = document.querySelectorAll(`.tab-content[data-tabcontent="${dataPlaylist}"] .search-item`);

      for (let i = 0; i < btnPlaylistLable.length; i++) {
        setRecentSearchesHandlers(btnPlaylistLable[i]);
      }
    }


    function getPlaylistTags(dataPlaylist) {
      allPlaylistTags[`${dataPlaylist}`] = allPlaylistTags[`${dataPlaylist}`].join().toLowerCase().split(',');
      var resultReduce = allPlaylistTags[`${dataPlaylist}`].reduce(function (acc, cur) {
        if (!acc.hash[cur]) {
          acc.hash[cur] = {
            [cur]: 1
          };
          acc.map.set(acc.hash[cur], 1);
          acc.result.push(acc.hash[cur]);
        } else {
          acc.hash[cur][cur] += 1;
          acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
        }
        return acc;
      }, {
        hash: {},
        map: new Map(),
        result: []
      });

      var result = resultReduce.result.sort(function (a, b) {
        return resultReduce.map.get(b) - resultReduce.map.get(a);
      });

      return result;
    }


    /*bookmarks playlist*/
    var favoriteList = document.querySelector('.acc-container[data-playlist="favorites"]');

    function addFavorite(playlistElement) {
      let $copyPlaylistElement = playlistElement.clone();
      $copyPlaylistElement.children('.acc-content').css("height", "0");
      $copyPlaylistElement.find('.acc-cover').removeClass('paused');
      $copyPlaylistElement.find('.acc-hide').removeClass('checked');
      $copyPlaylistElement = $copyPlaylistElement.removeClass('is-active').removeClass('is-hide').get(0);

      if (allPlaylists.favorites == null) {
        allPlaylists.favorites = [playlistElement.attr('data-videoid')];
      } else {
        allPlaylists.favorites = [playlistElement.attr('data-videoid'), ...allPlaylists.favorites];
      }

      if (favoriteList.innerHTML == '') {
        favoriteList.innerHTML += $copyPlaylistElement.outerHTML;
      } else {
        favoriteList.insertBefore($copyPlaylistElement, favoriteList.children[0]);
      }

      setHandlers('favorites');

      //localStorage.setItem("FavoriteList", favoriteList.innerHTML);
      localStorage.setItem("FavoriteArray", allPlaylists.favorites);

      insertPlaylistCounter('favorites', '.icon-counter');
      insertPlaylistCounter('favorites', '.album-info__songs .count');
    }


    function removeFavorite(playlistElement) {

      let $playlistElement = playlistElement;
      let index = allPlaylists.favorites.indexOf($playlistElement.attr('data-videoid'));

      if (index > -1) {
        allPlaylists.favorites.splice(index, 1);
      }
      //this.parentNode.parentNode.removeChild(this.parentNode);
      $(".acc-container[data-playlist='favorites'] li").eq(index).fadeOut("slow", function () {
        $(this).remove();
        localStorage.setItem("FavoriteArray", allPlaylists.favorites);
      });

      insertPlaylistCounter('favorites', '.icon-counter');
      insertPlaylistCounter('favorites', '.album-info__songs .count');
    }


    function getFavorite() {
      if (localStorage.getItem("FavoriteArray") !== null) {
        allPlaylists.favorites = localStorage.getItem("FavoriteArray").split(',');
      }


      getPlaylist('favorites', playlistFavorites);
      insertPlaylistCounter('favorites', '.icon-counter');
      insertPlaylistCounter('favorites', '.album-info__songs .count');
    }
    /*end of bookmarks playlist*/


    function likeStateHandler(e) {
      let $eventDataPlaylist = $(e.currentTarget).parents('.acc-container').eq(0).attr("data-playlist");
      let $eventDataVideoid = $(e.target).parent().attr("data-videoid");
      setLikeButtonsState($eventDataPlaylist, $eventDataVideoid);
      $(e.target).toggleClass("checked");

      if (!$(e.target).parent().hasClass("add-to")) {

        if ($(e.target).hasClass("checked")) {
          detectLikedItem();
          addFavorite($(e.target).parent());

        } else {
          removeFavorite($(e.target).parent());
          setLikeButtonsState();
        }
      } else {
        if ($(e.target).hasClass("checked")) {
          detectLikedItem(true);
          addFavorite($(`.acc-container[data-playlist=${playlistId()}] .likeButton:eq(${currentIndex})`).parent());
        } else {
          removeFavorite($(`.acc-container[data-playlist=${playlistId()}] .likeButton:eq(${currentIndex})`).parent());
          setLikeButtonsState();
        }
      }
      $(".likeButton").on('click', searchHintHandler());
    }


    function hideBtnStateHandler(e) {
      $(e.target).parent().toggleClass("is-hide");
      $(e.target).toggleClass("checked");
    }


    function getPlaylistDuration(dataPlaylist) {
      let playlistDuration = 0;
      let allPlaylistTimeCount = document.querySelectorAll(`.acc-container[data-playlist="${dataPlaylist}"] .controls-time`);
      for (let i = 0; i < allPlaylistTimeCount.length; i++) {
        var hms = allPlaylistTimeCount[i].textContent; // input string
        if (hms != '') {
          var a = hms.split(':'); // split it at the colons
          if (a.length < 3) {
            a = ['00', ...a];
          }
        } else {
          a = ['00', '00', '00']
        }
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        playlistDuration += seconds;
      }
      return playlistDuration;
    }


    function getPlaylistLength(dataPlaylist) {
      return allPlaylists[`${dataPlaylist}`].length;
    }


    function setActiveClass(prevPlaylistId) {
      let allPlaylistItems = document.querySelectorAll(`.acc-container .acc-item`);
      youTubePlayer.loadVideoById(currentPlaylist[currentIndex], 0, "large");
      prevPlaylist = prevPlaylistId;

      errorBlock.style.display = 'none';

      for (var i = 0; allPlaylistItems.length > i; i++) {
        allPlaylistItems[i].classList.remove('is-active');
        document.querySelectorAll(".acc-cover")[i].classList.remove("paused");
        document.querySelectorAll(".acc-content")[i].style.height = "0px";
      }

      playlistItems[currentIndex].classList.toggle('is-active');

      detectShuffled();
      detectLikedItem();
      accordionAnimation();
    }


    /* Playlist Shuffle */
    var PLAYLIST = {}, // with origin positions
      _playlist = {}; // with fact position


    function detectShuffled() {


      if ($('.acc-container[data-playlist=' + currentDataPlaylist + ']').hasClass('shuffled')) {
        if (!$('.randomButton').hasClass('checked')) {
          $('.randomButton').addClass('checked');
        }
      } else {
        PLAYLIST[`${currentDataPlaylist}`] = Array.prototype.slice.call(document.querySelectorAll('.acc-container[data-playlist=' + currentDataPlaylist + '] li'));
        $('.randomButton').removeClass('checked');
      }
    }

    function RenderList(playlist) {
      $('.acc-container[data-playlist=' + currentDataPlaylist + ']').html(playlist);
    }

    function Shuffle() {
      _playlist[`${currentDataPlaylist}`] = PLAYLIST[`${currentDataPlaylist}`].slice();
      var shuffled = $(this).hasClass('checked'),
        shuffledPlaylist = [],
        _currentItem = _playlist[`${currentDataPlaylist}`][currentIndex],
        i, position;

      if (!shuffled) {
        for (i = _playlist[`${currentDataPlaylist}`].length; i >= 0; i--) {
          position = Math.floor(Math.random() * i);

          if (_playlist[`${currentDataPlaylist}`][position] == _currentItem) {
            shuffledPlaylist.unshift(_currentItem);
          } else {
            shuffledPlaylist.push(_playlist[`${currentDataPlaylist}`][position]);
          }

          _playlist[`${currentDataPlaylist}`].splice(position, 1);

        }
      } else {
        shuffledPlaylist = PLAYLIST[`${currentDataPlaylist}`];
      }

      RenderList(shuffledPlaylist);
      $(this).toggleClass('checked');
      $('.acc-container[data-playlist=' + currentDataPlaylist + ']').toggleClass('shuffled');

    }

    $('.YouTube-player-controls').on('click', '.randomButton', Shuffle);
    /* end of Playlist Shuffle */


    function detectLikedItem(control) {
      if (control !== true) {
        if (document.querySelectorAll('.acc-container[data-playlist=' + playlistId() + '] .likeButton')[currentIndex].classList.contains('checked')) {
          document.querySelector('.add-to .likeButton').classList.add('checked');
        } else {
          document.querySelector('.add-to .likeButton').classList.remove('checked');
        }
      } else {
        if (document.querySelector('.add-to .likeButton').classList.contains('checked')) {
          document.querySelectorAll('.acc-container[data-playlist=' + playlistId() + '] .likeButton')[currentIndex].classList.add('checked');
        } else {
          document.querySelectorAll('.acc-container[data-playlist=' + playlistId() + '] .likeButton')[currentIndex].classList.remove('checked');
        }
      }
    }


    function setLikeButtonsState(dataPlaylist, dataVideoid) {
      let string, string2;
      dataPlaylist ? string = `[data-playlist='${dataPlaylist}']` : string = '';
      dataVideoid ? string2 = `[data-videoid='${dataVideoid}']` : string2 = '';
      var allLikeButtons = document.querySelectorAll(`.acc-container${string} .acc-item${string2} .likeButton`);

      for (let i = 0; i < allLikeButtons.length; i++) {
        if (allPlaylists.favorites.indexOf(allLikeButtons[i].parentElement.getAttribute('data-videoid')) < 0) {
          if (allLikeButtons[i].classList.contains('checked')) {
            allLikeButtons[i].classList.remove('checked');
          }
        } else {
          if (!allLikeButtons[i].classList.contains('checked')) {
            allLikeButtons[i].classList.add('checked');

          }
        }
      }
    }


    /*jquery Accordion playlist*/
    var animTime = 300,
      clickPolice = false;

    function accordionAnimation() {
      if (!clickPolice) {
        clickPolice = true;

        var targetHeight = $('.acc-container[data-playlist=' + playlistId() + '] .acc-content-inner').eq(currentIndex).outerHeight();

        $('.acc-container[data-playlist=' + playlistId() + '] .acc-content').stop().animate({
          height: 0
        }, animTime);

        if ($('.acc-container[data-playlist=' + playlistId() + '] .acc-content').eq(currentIndex).children().text() != '') {
          $('.acc-container[data-playlist=' + playlistId() + '] .acc-content').eq(currentIndex).stop().animate({
            height: targetHeight
          }, animTime);

        } else {
          $('.acc-container[data-playlist=' + playlistId() + '] .acc-content').eq(currentIndex).stop().animate({
            height: 0
          }, animTime);
        }
        setTimeout(function () {
          clickPolice = false;
        }, animTime);
      }
    }
    /*end of jquery Accordion playlist*/


    /*recent search items*/
    var globalSearch = document.querySelector(".search-field");
    var recentSearch = document.querySelector(".recent-search");
    var recentSearchList = document.querySelector(".recent-search__list");
    var recentSearchTitle = document.querySelector(".recent-search__title");
    var recentSearchCount = recentSearchList.childNodes.length;
    var clearBtn = document.querySelector(".clear-btn");
    var showMoreBtn = document.querySelector('.recent-search__show-more');
    var userSearches = [];
    var recentSearchCounts = 14;

    globalSearch.addEventListener("keydown", createRecentItem);

    function createRecentItem(event) {
      if (event.key == "Enter") {
        let inputText = globalSearch.value.toLowerCase();
        if (userSearches.indexOf(inputText) == -1) {
          setRecentSearches(inputText);
        }
      } else {}
    }

    function detectSearchesLength() {
      recentSearchList = document.querySelector(".recent-search__list");
      if (recentSearchList.childNodes.length > 0) {
        clearBtn.innerHTML = "Clear Recent Searches";
        clearBtn.removeAttribute("disabled");
      } else {
        clearBtn.innerHTML = "No Recent Searches";
        clearBtn.setAttribute("disabled", true);
      }

      if (userSearches.length < recentSearchCounts) {
        showMoreBtn.style.display = 'none';
      } else {
        showMoreBtn.style.display = 'block';
      }
    }

    function getSearchesLength() {
      return document.querySelector(".recent-search__list").childNodes.length;
    }

    function getSearchesTemplate(text, className = '') {
      return `<span class="search-item ${className}">
  <button class="search-item__label">${text}</button>
  <div class="search-item__content">
  <a href="#">Wave search</a>
  <a href="#">Open page</a>
  </div>
  <span class="fal fa-times search-item__close"></span>
  </span>`
    }


    function setRecentSearches(text, method = "afterBegin") {

      if (recentSearch.classList.contains('open')) {
        recentSearchList.insertAdjacentHTML(method, getSearchesTemplate(text));
      } else {
        if (recentSearchList.childNodes.length + 1 <= recentSearchCounts) {
          recentSearchList.insertAdjacentHTML(method, getSearchesTemplate(text));
        } else {
          recentSearchList.insertAdjacentHTML(method, getSearchesTemplate(text));
          recentSearchList.lastElementChild.remove();
        }
      }
      setRecentSearchesHandlers(recentSearchList.firstElementChild);

      if (userSearches.indexOf(text) == -1) {
        userSearches = [text, ...userSearches];
        localStorage.setItem("userRecentSearches", userSearches);
      }
      detectSearchesLength();
    }

    function setRecentSearchesHandlers(thisSearchItem) {
      searchLableHandler(thisSearchItem.children[1].children[0]);
      searchCloseHandler(thisSearchItem.children[2]);

      document.addEventListener("click", function (e) {
        if (e.target == thisSearchItem.children[0]) {
          e.target.parentElement.classList.toggle('show');
          e.stopPropagation();
        } else {
          thisSearchItem.classList.remove('show');
        }
      });
    }

    function getRecentSearches() {
      if (localStorage.getItem("userRecentSearches") !== null) {
        userSearches = localStorage.getItem("userRecentSearches").split(',');

        if (userSearches.length >= recentSearchCounts) {
          for (let i = recentSearchCounts - 1; i >= 0; i--) {
            setRecentSearches(userSearches[i]);
          }
        } else {
          for (let i = userSearches.length - 1; i >= 0; i--) {
            setRecentSearches(userSearches[i]);
          }
        }
      }
    }

    function searchCloseHandler(element) {
      element.addEventListener("click", function (e) {
        let index = userSearches.indexOf(e.currentTarget.parentElement.children[0].outerText);
        if (index > -1) {
          userSearches.splice(index, 1);
        }
        localStorage.setItem("userRecentSearches", userSearches);

        if (userSearches.length == 0) {
          clearRecent();
        }

        e.currentTarget.parentNode.remove();
        detectSearchesLength();

      });
    }

    function searchLableHandler(element) {

      element.addEventListener("click", function (e) {

        globalSearch.value = e.currentTarget.parentElement.parentElement.children[0].textContent;
        changeTab.call(document.querySelector('[data-tabcontent="search"]'));
        search();
        e.currentTarget.parentElement.parentElement.classList.remove('show');
        e.stopPropagation();
      });
    }

    function clearRecent() {
      delete userSearches;
      localStorage.removeItem("userRecentSearches");
      recentSearchList.innerHTML = "";
      clearBtn.setAttribute("disabled", true);
      clearBtn.innerHTML = "No Recent Searches";
      globalSearch.value = '';
      detectSearchesLength();
    };

    getRecentSearches();
    detectSearchesLength();
    clearBtn.addEventListener("click", function () {
      clearRecent()
    });

    showMoreBtn.addEventListener("click", function () {

      if (recentSearch.classList.contains("open")) {
        recentSearch.classList.remove("open");
        showMoreBtn.innerHTML = "Show full list of recent searches";
        for (let i = userSearches.length - 1; recentSearchList.childNodes.length > recentSearchCounts; i--) {
          recentSearchList.childNodes[i].remove();
        }
      } else {
        recentSearch.classList.add("open");
        showMoreBtn.innerHTML = "Hide full list of recent searches";

        for (let i = +getSearchesLength(); i < userSearches.length; i++) {
          setRecentSearches(userSearches[i], "beforeEnd");
        }
      }

    });
    /*end of recent search items*/


    /*Google style search autocomplete*/
    function searchHintHandler() {

      var _rEscapeChars = /\/|\\|\.|\||\*|\&|\+|\(|\)|\[|\]|\?|\$|\^/g,
        _rMatch = /[A-Z]?[a-z]+|[0-9]+/g,
        _keys = [
          13,
          9
        ],
        $_search = $('.search-bar'),
        $_searchContainer = $('.search-container');

      $_search.on("keydown", function (e) {

        var barAttr = $(this).attr('data-search'),
          $_result = $(`.search-result[data-search='${barAttr}'] `),
          _resultPlaceholder = $_result.val();

        if (_keys.indexOf(e.keyCode) !== -1) {
          $(this).val($_result.val());
          return false;
        }

        if ($(this).val() == '') {
          $_result.val('');
        }

      }).on("keyup", function () {

        var array = [],
          value = $(this).val().toLowerCase(), // .replace( _rEscapeChars, "" )
          regex = new RegExp("^" + value, "i"),
          matches = [],
          barAttr = $(this).attr('data-search'),
          $_arrayItems = $(`.filter-block[data-playlist='${barAttr}'] .filter-title`),
          $_playlistItems = $(`.filter-block[data-playlist='${barAttr}'] li`),
          $_result = $(`.search-result[data-search='${barAttr}'] `),
          _resultPlaceholder = $_result.val();

        for (let s = 0; s < $_arrayItems.length; s++) {
          if ($_arrayItems.eq(s).attr("title")) {
            array.push([$_arrayItems.eq(s).text(), $_arrayItems.eq(s).attr("title")]);
          } else {
            array.push([$_arrayItems.eq(s).text()]);
          }
        }

        var _results = array,
          _length = _results.length;

        //Go through each list item and hide if not match search
        $_playlistItems.each(function () {
          if ($(this).find('.filter-title').text().toLowerCase().indexOf(value) != -1) {
            $(this).show();
          } else {
            if ($(this).find('.filter-title').attr("title")) {
              if ($(this).find('.filter-title').attr("title").toLowerCase().indexOf(value) != -1) {
                $(this).show();
              } else {
                $(this).hide();
              }
            } else {
              $(this).hide();
            }

          }

        });
        if ($(this).val() == '') {
          $_playlistItems.show();
        }

        if (value) {
          for (var i = _length; i--;) {
            if (regex.test(_results[i][0])) {
              matches.push(_results[i][0]);
            } else {
              $_result.val("");
            }

            if (regex.test(_results[i][1])) {
              matches.push(_results[i][1]);
            } else {
              $_result.val("");
            }

          }

          if (matches.length) {
            for (var i = matches.length; i--;) {
              $_result.val(matches[i].replaceAt(0, $(this).val()));
            }
          }
        } else {
          $_result.val(_resultPlaceholder.replaceAt(0, $(this).val()));
        }

        if ($(this).val() == '') {
          $_result.val('');
        }

      });

    }

    /*end of Google style search autocomplete*/