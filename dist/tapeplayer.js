!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Playlist=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.list=[{href:"http://thenewcode.com/assets/videos/atlantic-light.mp4",img:"http://thenewcode.com/assets/images/trotternish-ridge-isle-of-skye.jpg",alt:"atlantic-light",des:"Atlantic light"},{href:"http://thenewcode.com/assets/videos/mountain.mp4",img:"http://thenewcode.com/assets/images/vid-mountain.jpg",alt:"mountain",des:"Mountains"},{href:"http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",img:"http://camendesign.com/code/video_for_everybody/poster.jpg",alt:"big-buck-bunny",des:"Big Buck Buny"},{href:"http://thenewcode.com/assets/videos/ocean-diver.mp4",img:"http://thenewcode.com/assets/images/ocean-diver.jpg",alt:"ocean-diver",des:"Diving under ocean"}],this.links=null,this.currentVideo=0,this.nextVideo=this.list[1].href}return i(e,[{key:"loadFiles",value:function(){var e=$("#player-video"),t=$("<source>").attr("id","source").attr("src",this.list[0].href).attr("type","video/mp4");e.append(t);var n=$("#playlist");this.list.forEach(function(e,t){var i=$("<li>").attr("class","playlist-element"),o=$("<a>").attr("href",e.href).attr("data-number",t),s=$("<div>").attr("class","tile").attr("style","background-image: url("+e.img+");"),r=$("<p>").attr("class","description").text(e.des);s.append(r),o.append(s),i.append(o),n.append(i)}),this.links=$("#playlist a")}},{key:"setNextVideo",value:function(){this.currentVideo<this.list.length-1?this.nextVideo=this.list[parseInt(this.currentVideo)+1].href:this.nextVideo=this.list[1].href}},{key:"setIsActive",value:function(e){for(var t=document.getElementsByTagName("li"),n=0;n<t.length;n++)t[n].classList.remove("current-play");t[e].classList.add("current-play")}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Controls=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.video=document.getElementById("player-video"),this.playButton=document.getElementById("play-button"),this.stopButton=document.getElementById("stop-button"),this.progressBar=document.getElementById("progress-bar"),this.volumeButton=document.getElementById("player-volume"),this.fullscreenButton=document.getElementById("fullscreen-button"),this.playerInfo=document.getElementById("player-info"),this.infoTimeout=!1}return i(e,[{key:"preventControls",value:function(){this.video.controls=!1}},{key:"playAndPause",value:function(){this.video.paused||this.video.ended?(this.playButton.innerHTML='<i class="medium material-icons">pause</i>',this.showInfo("Playing"),this.video.play()):(this.playButton.innerHTML='<i class="medium material-icons">play_arrow</i>',this.showInfo("Paused"),this.video.pause())}},{key:"stop",value:function(){this.playButton.innerHTML='<i class="medium material-icons">play_arrow</i>',this.showInfo("Stopped"),this.video.pause(),this.video.removeAttribute("autoplay"),this.video.removeAttribute("src"),this.video.load()}},{key:"showProgress",value:function(){var e=0;this.video.currentTime>0&&(e=100/this.video.duration*this.video.currentTime),this.progressBar.style.width=e+"%"}},{key:"changeVolume",value:function(){this.video.volume=this.volumeButton.value,this.showInfo("Volume: "+(100*this.video.volume).toFixed(0)+"%")}},{key:"fullscreen",value:function(){this.video.requestFullscreen?this.video.requestFullscreen():this.video.mozRequestFullScreen?this.video.mozRequestFullScreen():this.video.webkitRequestFullscreen&&this.video.webkitRequestFullscreen()}},{key:"showInfo",value:function(e){var t=this;0!=this.infoTimeout&&(clearTimeout(this.infoTimeout),this.infoTimeout=!1),this.playerInfo.innerText=e,this.playerInfo.style.display="block",this.infoTimeout=setTimeout(function(){t.playerInfo.style.display="none"},1500)}},{key:"play",value:function(e){this.video.setAttribute("autoplay",""),this.video.src=e,this.playAndPause()}}]),e}()},function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(1),s=n(0);var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return i(e,[{key:"init",value:function(){var e=new s.Playlist,t=new o.Controls;e.loadFiles(),e.setIsActive(0),t.preventControls(),t.playButton.addEventListener("click",function(){t.playAndPause()}),t.stopButton.addEventListener("click",function(){t.stop(),e.setIsActive(0)}),t.video.addEventListener("timeupdate",function(){t.showProgress()},!1),t.fullscreenButton.addEventListener("click",function(){t.fullscreen()}),t.video.addEventListener("ended",function(){e.currentVideo<e.list.length-1?(t.play(e.nextVideo),e.currentVideo++,e.setIsActive(e.currentVideo)):(t.stop(),e.currentVideo=0),e.setNextVideo()}),t.volumeButton.addEventListener("input",function(){t.changeVolume()}),e.links.on("click",function(n){n.preventDefault(),t.play(this.getAttribute("href")),e.currentVideo=this.dataset.number,e.setNextVideo(),e.setIsActive(this.dataset.number)})}}]),e}();document.addEventListener("DOMContentLoaded",function(){(new r).init()})}]);