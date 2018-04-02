export class Playlist{
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
