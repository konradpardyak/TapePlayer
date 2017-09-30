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
      this.progressBar = $('#player-progress');
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
    }, {
      key: 'playAndPause',
      value: function playAndPause() {
        if (this.video.paused || this.video.ended) {
          this.playButton.attr("title", "pause");
          this.playButton.text("Pause");
          this.showInfo("Playing");
          this.video.play();
        } else {
          this.playButton.attr("title", "play");
          this.playButton.text("Play");
          this.showInfo("Paused");
          this.video.pause();
        }
      }
    }, {
      key: 'stop',
      value: function stop() {}
    }, {
      key: 'showProgress',
      value: function showProgress() {
        var progress = 0;
        if (this.video.currentTime > 0) {
          progress = 100 / this.video.duration * this.video.currentTime;
        }
        console.log(progress.toFixed());
      }
    }, {
      key: 'changeVolume',
      value: function changeVolume() {
        this.video.volume = this.volumeButton.val();
        this.showInfo("Volume set to: " + (this.video.volume * 100).toFixed(0) + "%");
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
    }]);

    return Player;
  }();

  var player = new Player();

  player.preventControls();

  player.playButton.on("click", function () {
    player.playAndPause();
  });

  player.video.addEventListener("timeupdate", function (e) {
    player.showProgress();
  }, false);

  player.volumeButton.on("input", function () {
    player.changeVolume();
  });
});

/***/ })
/******/ ]);