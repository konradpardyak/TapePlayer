/**
 * @author Konrad Pardyak <konradpardyak@gmail.com>
 */

import {Controls} from "./controls.js";
import {Playlist} from "./playlist";

class Tapeplayer {
  init() {
    const playlist = new Playlist();
    const player = new Controls();

    playlist.loadFiles();
    playlist.setIsActive(0);
    player.preventControls();

    player.playButton.addEventListener("click", ()=>{
      player.playAndPause();
    });

    player.stopButton.addEventListener("click", ()=>{
      player.stop();
      playlist.setIsActive(0);
    });

    player.video.addEventListener("timeupdate", ()=>{
      player.showProgress();
      player.showBuffered();
    }, false);

    player.video.addEventListener("progress", ()=> {
      player.showBuffered();
    });

    player.playerProgress.addEventListener("mouseup", (event)=>{
      player.changeTime(event);
    })

    player.fullscreenButton.addEventListener("click", ()=>{
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

    player.volumeButton.addEventListener("input", ()=>{
      player.changeVolume();
    });

    playlist.links.on("click", function(event){
      event.preventDefault();
      player.play(this.getAttribute("href"));
      playlist.currentVideo = this.dataset["number"];
      playlist.setNextVideo();
      playlist.setIsActive(this.dataset["number"]);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const tapeplayer = new Tapeplayer();
  tapeplayer.init();
});
