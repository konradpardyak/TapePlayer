/**
 * @author Konrad Pardyak <konradpardyak@gmail.com>
 */

import {Controls} from "./controls.js";
import {Playlist} from "./playlist";

class Tapeplayer {
  init() {
    const playlist = new Playlist();
    const controls = new Controls();

    playlist.loadFiles();
    playlist.setIsActive(0);
    controls.preventControls();

    controls.playButton.addEventListener("click", () => {
      controls.playAndPause();
    });

    controls.stopButton.addEventListener("click", () => {
      controls.stop();
      playlist.setIsActive(0);
    });

    controls.video.addEventListener("timeupdate", () => {
      controls.showProgress();
      controls.showBuffered();
    }, false);

    controls.video.addEventListener("progress", () => {
      controls.showBuffered();
    });

    controls.playerProgress.addEventListener("mouseup", (event) => {
      controls.changeTime(event);
    })

    controls.fullscreenButton.addEventListener("click", () => {
      controls.fullscreen();
    });

    controls.video.addEventListener("ended", () => {
      if(playlist.currentVideo < playlist.list.length - 1) {
        controls.play(playlist.nextVideo);
        playlist.currentVideo ++;
        playlist.setIsActive(playlist.currentVideo);
      } else {
        controls.stop();
        playlist.currentVideo = 0;
      }
      playlist.setNextVideo();
    });

    controls.volumeButton.addEventListener("input", () => {
      controls.changeVolume();
    });

    playlist.links.on("click", function(event) {
      event.preventDefault();
      controls.play(this.getAttribute("href"));
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
