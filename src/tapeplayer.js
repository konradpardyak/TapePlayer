/**
 * @author Konrad Pardyak <konradpardyak@gmail.com>
 */

import {Player} from "./player_controls.js";
import {Playlist} from "./playlist";

document.addEventListener('DOMContentLoaded', () => {

  const playlist = new Playlist();
  const player = new Player();

  playlist.loadFiles();
  playlist.setIsActive(0);
  player.preventControls();

  player.playButton.addEventListener("click", ()=>{
    player.playAndPause();
  });

  player.stopButton.on("click", ()=>{
    player.stop();
    playlist.setIsActive(0);
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
