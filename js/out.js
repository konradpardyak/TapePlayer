/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
  var Player = function () {
    function Player() {
      _classCallCheck(this, Player);

      this.video = document.getElementById('player-video');
      this.playButton = $('#play-button');
      this.stopButton = $('#stop-button');
      this.progressBar = $('.progress-bar');
      this.volumeButton = $('#player-volume');
      this.playerInfo = $('#player-info');
      this.infoTimeout = false; //useful in showInfo method
    }
    //turn off default browser controls interface


    _createClass(Player, [{
      key: 'preventControls',
      value: function preventControls() {
        this.video.controls = false;
      }
      //change play and pause icon

    }, {
      key: 'playAndPause',
      value: function playAndPause() {
        if (this.video.paused || this.video.ended) {
          this.playButton.attr("title", "pause");
          this.playButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>');
          this.showInfo("Playing");
          this.video.play();
        } else {
          this.playButton.attr("title", "play");
          this.playButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>');
          this.showInfo("Paused");
          this.video.pause();
        }
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.playButton.attr("title", "play");
        this.playButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>');
        this.showInfo("Paused");
        this.video.pause();
        this.video.removeAttribute("autoplay");
        this.video.removeAttribute("src");
        this.video.load();
      }
    }, {
      key: 'showProgress',
      value: function showProgress() {
        var progress = 0;
        if (this.video.currentTime > 0) {
          progress = 100 / this.video.duration * this.video.currentTime;
        }
        this.progressBar.css("width", progress + "%");
      }
    }, {
      key: 'changeVolume',
      value: function changeVolume() {
        this.video.volume = this.volumeButton.val();
        this.showInfo("Volume: " + (this.video.volume * 100).toFixed(0) + "%");
      }
    }, {
      key: 'showInfo',
      value: function showInfo(text) {
        var _this = this;

        //this condition prevent invoking setTimeout multiple times
        if (this.infoTimeout != false) {
          clearTimeout(this.infoTimeout);
          this.infoTimeout = false;
        }

        this.playerInfo.text(text);
        this.playerInfo.fadeIn();

        this.infoTimeout = setTimeout(function () {
          _this.playerInfo.fadeOut();
        }, 1500);
      }
    }, {
      key: 'play',
      value: function play(file) {
        this.video.setAttribute("autoplay", "");
        this.video.src = file;
        this.playAndPause();
      }
    }]);

    return Player;
  }();

  var Playlist = function () {
    function Playlist() {
      _classCallCheck(this, Playlist);

      this.list = [{ href: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
        img: 'http://camendesign.com/code/video_for_everybody/poster.jpg',
        alt: 'big-buck-bunny' }, { href: 'http://thenewcode.com/assets/videos/atlantic-light.mp4',
        img: 'http://thenewcode.com/assets/images/trotternish-ridge-isle-of-skye.jpg',
        alt: 'atlantic-light' }, { href: 'http://thenewcode.com/assets/videos/mountain.mp4',
        img: 'http://thenewcode.com/assets/images/vid-mountain.jpg',
        alt: 'mountain' }, { href: 'http://thenewcode.com/assets/videos/ocean-diver.mp4',
        img: 'http://thenewcode.com/assets/images/ocean-diver.jpg',
        alt: 'ocean-diver' }];
      this.links = null;
      this.currentVideo = 0;
      this.nextVideo = this.list[1].href;
    }

    _createClass(Playlist, [{
      key: 'loadFiles',
      value: function loadFiles() {
        var $video = $('#player-video');
        var $source = $('<source>').attr("id", "source").attr("src", this.list[0].href).attr("type", "video/mp4");
        $video.append($source);

        var $playlistUl = $('#playlist');
        this.list.forEach(function (element, index) {
          var $li = $('<li>');
          var $a = $('<a>').attr("href", element.href).attr("data-number", index);
          var $img = $('<img>').attr("src", element.img).attr("alt", element.alt);

          $a.append($img);
          $li.append($a);
          $playlistUl.append($li);
        });

        this.links = $('#playlist a');
      }
    }, {
      key: 'setNextVideo',
      value: function setNextVideo() {
        if (this.currentVideo < this.list.length - 1) {
          this.nextVideo = this.list[parseInt(this.currentVideo) + 1].href;
        } else {
          this.nextVideo = this.list[1].href;
        }
      }
    }]);

    return Playlist;
  }();

  var playlist = new Playlist();
  var player = new Player();

  playlist.loadFiles();
  player.preventControls();

  player.playButton.on("click", function () {
    player.playAndPause();
  });

  player.stopButton.on("click", function () {
    player.stop();
  });

  player.video.addEventListener("timeupdate", function (e) {
    player.showProgress();
  }, false);

  player.video.addEventListener("ended", function () {
    if (playlist.currentVideo < playlist.list.length - 1) {
      player.play(playlist.nextVideo);
      playlist.currentVideo++;
    } else {
      player.stop();
      playlist.currentVideo = 0;
    }
    playlist.setNextVideo();
  });

  player.volumeButton.on("input", function () {
    player.changeVolume();
  });

  playlist.links.on("click", function (event) {
    event.preventDefault();
    player.play(this.getAttribute("href"));
    playlist.currentVideo = this.dataset["number"];
    playlist.setNextVideo();
  });
});

/***/ })
/******/ ]);