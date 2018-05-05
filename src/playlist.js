/**
 * @author Konrad Pardyak <konradpardyak@gmail.com>
 */

export class Playlist{
  constructor(){
    this.list = [
                  {href: 'http://thenewcode.com/assets/videos/atlantic-light.mp4',
                  img: 'http://thenewcode.com/assets/images/trotternish-ridge-isle-of-skye.jpg',
                  alt: 'atlantic-light',
                  des: 'Atlantic light sample video',
                  dur: '0:26'},
                  {href: 'http://thenewcode.com/assets/videos/mountain.mp4',
                  img: 'http://thenewcode.com/assets/images/vid-mountain.jpg',
                  alt: 'mountain',
                  des: 'Mountains and snow sample video',
                  dur: '0:06'},
                  {href: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
                  img: 'http://camendesign.com/code/video_for_everybody/poster.jpg',
                  alt: 'big-buck-bunny',
                  des: 'Big Buck Buny sample animation video',
                  dur: '1:00'},
                  {href: 'http://thenewcode.com/assets/videos/ocean-diver.mp4',
                  img: 'http://thenewcode.com/assets/images/ocean-diver.jpg',
                  alt: 'ocean-diver',
                  des: 'Diving under ocean sample',
                  dur: '0:04'}
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
      const $li = $('<li>').attr("class", "playlist-element");
      const $a = $('<a>').attr("href", element.href).attr("data-number", index);
      const $tile = $('<div>').attr("class", "tile").attr("style", "background-image: url(" + element.img + ");");
      const $description = $('<div>').attr("class", "description");
      const $descriptionTitle = $('<p>').attr("class", "description-title").text(element.des);
      const $descriptionDuration = $('<p>').attr("class", "description-duration").text(element.dur);
      const $descriptionLogo = $('<p>').attr("class", "description-logo").text("TapePlayer");
      const $nowPlaing = $('<div>').attr("class", "now-playing").text("Now Playing");

      $description.append($descriptionTitle);
      $description.append($descriptionDuration);
      $description.append($descriptionLogo);
      $tile.append($description);
      $a.append($tile);
      $li.append($a);
      $li.append($nowPlaing);
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
    let elements = document.getElementsByTagName('li');
    for(let i =0; i<elements.length; i++){
      elements[i].classList.remove('now-playing-visible');
    }
    elements[index].classList.add('now-playing-visible');
  }

}
