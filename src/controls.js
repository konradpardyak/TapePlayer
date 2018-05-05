/**
 * @author Konrad Pardyak <konradpardyak@gmail.com>
 */

export class Controls {
  constructor(){
    this.video = document.getElementById('player-video');
    this.playButton = document.getElementById('play-button');
    this.stopButton = document.getElementById('stop-button');
    this.progressBar = document.getElementById('progress-bar');
    this.bufferedBar = document.getElementById('buffer-bar');
    this.volumeButton = document.getElementById('player-volume');
    this.fullscreenButton = document.getElementById('fullscreen-button');
    this.playerInfo = document.getElementById('player-info');
    this.infoTimeout = false; //useful in showInfo method
  }
  //turn off default browser controls interface
  preventControls(){
    this.video.controls = false;
  }
  //change play and pause icon
  playAndPause(){
    if (this.video.paused || this.video.ended) {
      //this.playButton.attr("title", "paused");
      this.playButton.innerHTML = '<i class="medium material-icons">pause</i>';
      this.showInfo("Playing");
      this.video.play();
    }
    else {
      //this.playButton.attr("title", "play");
      this.playButton.innerHTML = '<i class="medium material-icons">play_arrow</i>';
      this.showInfo("Paused");
      this.video.pause();
    }
  }

  stop(){
    //this.playButton.attr("title", "play");
    this.playButton.innerHTML = '<i class="medium material-icons">play_arrow</i>';
    this.showInfo("Stopped");
    this.video.pause();
    this.video.removeAttribute("autoplay");
    this.video.removeAttribute("src");
    this.video.load();
  }

  showProgress(){
    let progress = 0;
    if (this.video.currentTime > 0){
      progress = (100/this.video.duration)*this.video.currentTime;
    }
    this.progressBar.style.width = progress + "%";
  }

  showBuffered(){
    let buffer = 0;
    if (this.video.currentTime > 0){
      buffer = (100/this.video.duration)*this.video.buffered.end(0);
    }
    this.bufferedBar.style.width = buffer + "%";
  }

  changeVolume(){
    this.video.volume = this.volumeButton.value;
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

    this.playerInfo.innerText = text;
    this.playerInfo.style.display = "block";

    this.infoTimeout = setTimeout(()=>{
      this.playerInfo.style.display = "none";
    }, 1500);

  }

  play(file){
    this.video.setAttribute("autoplay", "");
    this.video.src = file;
    this.playAndPause();
  }
}
