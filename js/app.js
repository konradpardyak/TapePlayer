$(()=>{

  class Player {
    constructor(){
      this.video = document.getElementById('player-video');
      this.playButton = $('#play-button');
      this.stopButton = $('#stop-button');
      this.progressBar = $('#player-progress');
      this.volumeButton = $('#player-volume');
      this.playerInfo = $('#player-info');
      this.infoTimeout = false; //useful in showInfo method
    }
    //turn off default browser controls interface
    preventControls(){
      this.video.controls = false;
    }

    playAndPause(){
      if (this.video.paused || this.video.ended) {
        this.playButton.attr("title", "pause");
        this.playButton.text("Pause");
        this.showInfo("Playing");
        this.video.play();
      }
      else {
        this.playButton.attr("title", "play");
        this.playButton.text("Play");
        this.showInfo("Paused");
        this.video.pause();
      }
    }

    stop(){

    }

    showProgress(){
      let progress = 0;
      if (this.video.currentTime > 0){
        progress = (100/this.video.duration)*this.video.currentTime;
      }
      console.log(progress.toFixed());
    }

    changeVolume(){
      this.video.volume = this.volumeButton.val();
      this.showInfo("Volume set to: " + (this.video.volume*100).toFixed(0) + "%");
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
  }

  const player = new Player;

  player.preventControls();

  player.playButton.on("click", ()=>{
    player.playAndPause();
  });

  player.video.addEventListener("timeupdate", (e)=>{
    player.showProgress();
  }, false);

  player.volumeButton.on("input", ()=>{
    player.changeVolume();
  });

});
