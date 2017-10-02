$(()=>{

  class Player {
    constructor(){
      this.video = document.getElementById('player-video');
      this.playButton = $('#play-button');
      this.stopButton = $('#stop-button');
      this.progressBar = $('.progress-bar');
      this.volumeButton = $('#player-volume');
      this.fullscreenButton = $('#fullscreen-button');
      this.playerInfo = $('#player-info');
      this.infoTimeout = false; //useful in showInfo method
    }
    //turn off default browser controls interface
    preventControls(){
      this.video.controls = false;
    }
    //change play and pause icon
    playAndPause(){
      if (this.video.paused || this.video.ended) {
        this.playButton.attr("title", "pause");
        this.playButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>');
        this.showInfo("Playing");
        this.video.play();
      }
      else {
        this.playButton.attr("title", "play");
        this.playButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>');
        this.showInfo("Paused");
        this.video.pause();
      }
    }

    stop(){
      this.playButton.attr("title", "play");
      this.playButton.html('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>');
      this.showInfo("Stopped");
      this.video.pause();
      this.video.removeAttribute("autoplay");
      this.video.removeAttribute("src");
      this.video.load();
      playlist.setIsActive(0);
    }

    showProgress(){
      let progress = 0;
      if (this.video.currentTime > 0){
        progress = (100/this.video.duration)*this.video.currentTime;
      }
      this.progressBar.css("width", progress + "%");
    }

    changeVolume(){
      this.video.volume = this.volumeButton.val();
      this.showInfo("Volume: " + (this.video.volume*100).toFixed(0) + "%");
    }

    fullscreen(){
      if (this.video.requestFullscreen){
        this.video.requestFullscreen();
      } else if (this.video.mozRequestFullScreen){
        this.video.mozRequestFullScreen();
      } else if (this.video.webkitRequestFullscreen){
        this.video.webkitRequestFullscreen();
      }
    }

    showInfo(text){
      //this condition prevent invoking setTimeout multiple times
      if(this.infoTimeout != false){
        clearTimeout(this.infoTimeout);
        this.infoTimeout = false;
      }

      this.playerInfo.text(text);
      this.playerInfo.fadeIn();

      this.infoTimeout = setTimeout(()=>{
        this.playerInfo.fadeOut();
      }, 1500);

    }

    play(file){
      this.video.setAttribute("autoplay", "");
      this.video.src = file;
      this.playAndPause();
    }
  }

  class Playlist{
    constructor(){
      this.list = [
                    {href: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
                    img: 'http://camendesign.com/code/video_for_everybody/poster.jpg',
                    alt: 'big-buck-bunny'},
                    {href: 'http://thenewcode.com/assets/videos/atlantic-light.mp4',
                    img: 'http://thenewcode.com/assets/images/trotternish-ridge-isle-of-skye.jpg',
                    alt: 'atlantic-light'},
                    {href: 'http://thenewcode.com/assets/videos/mountain.mp4',
                    img: 'http://thenewcode.com/assets/images/vid-mountain.jpg',
                    alt: 'mountain'},
                    {href: 'http://thenewcode.com/assets/videos/ocean-diver.mp4',
                    img: 'http://thenewcode.com/assets/images/ocean-diver.jpg',
                    alt: 'ocean-diver'}
                  ]
      this.links = null;
      this.currentVideo = 0;
      this.nextVideo = this.list[1].href;
    }

    loadFiles(){
      const $video = $('#player-video');
      let $source = $('<source>').attr("id", "source").attr("src", this.list[0].href).attr("type", "video/mp4");
      $video.append($source);

      const $playlistUl = $('#playlist');
      this.list.forEach((element, index)=>{
        const $li = $('<li>');
        const $a = $('<a>').attr("href", element.href).attr("data-number", index);
        const $img = $('<img>').attr("src", element.img).attr("alt", element.alt).attr("class", "thumbnail");

        $a.append($img);
        $li.append($a);
        $playlistUl.append($li);
      });

      this.links = $('#playlist a');
    }

    setNextVideo(){
      if(this.currentVideo < this.list.length - 1){
        this.nextVideo = this.list[parseInt(this.currentVideo) + 1].href;
      } else{
        this.nextVideo = this.list[1].href;
      }
    }

    setIsActive(index){
      let images = document.getElementsByTagName('img');
      for(let i =0; i<images.length; i++){
        images[i].classList.remove('isActive');
      }
      images[index].classList.add('isActive');
    }

  }

  const playlist = new Playlist();
  const player = new Player();

  playlist.loadFiles();
  playlist.setIsActive(0);
  player.preventControls();

  player.playButton.on("click", ()=>{
    player.playAndPause();
  });

  player.stopButton.on("click", ()=>{
    player.stop();
  });

  player.video.addEventListener("timeupdate", (e)=>{
    player.showProgress();
  }, false);

  player.fullscreenButton.on("click", ()=>{
    player.fullscreen();
  });

  player.video.addEventListener("ended", ()=>{
    if(playlist.currentVideo < playlist.list.length - 1){
      player.play(playlist.nextVideo);
      playlist.currentVideo ++;
      playlist.setIsActive(playlist.currentVideo);
    } else{
      player.stop();
      playlist.currentVideo = 0;
    }
    playlist.setNextVideo();
  });

  player.volumeButton.on("input", ()=>{
    player.changeVolume();
  });

  playlist.links.on("click", function(event){
    event.preventDefault();
    player.play(this.getAttribute("href"));
    playlist.currentVideo = this.dataset["number"];
    playlist.setNextVideo();
    playlist.setIsActive(this.dataset["number"]);
  });

});
