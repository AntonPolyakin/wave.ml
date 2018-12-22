
/* Youtube Volume Control*/ 
(function() {
  // helper function
  var VolumeControl, control, getElementPercentage;

  getElementPercentage = function(click, elm) {
    var rect;
    rect = elm.getBoundingClientRect();
    return (click.pageX - rect.left) / rect.width * 100;
  };

  VolumeControl = class VolumeControl {
    constructor() {
      this.volumeHoverIn = this.volumeHoverIn.bind(this);
      this.volumeHoverOut = this.volumeHoverOut.bind(this);
      this.volumeClick = this.volumeClick.bind(this);
      this.volumeDrag = this.volumeDrag.bind(this);
      this.volumeMoveHandler = this.volumeMoveHandler.bind(this);
      this.volumeStopHandler = this.volumeStopHandler.bind(this);
      this.volumeMute = this.volumeMute.bind(this);
      this.video = new Audio('');
      this.video.volume = 0;
      this.video.play();
      this.elm = {
        volumeWrap: document.getElementsByClassName('bsp-volume-wrap')[0],
        volumeSlider: document.getElementsByClassName('bsp-volume-slider')[0],
        volumeProgress: document.getElementsByClassName('bsp-volume-slider-progress')[0]
      };
      this.elm.volumeWrap.addEventListener('mouseenter', this.volumeHoverIn);
      this.elm.volumeWrap.addEventListener('mouseleave', this.volumeHoverOut);
      this.elm.volumeSlider.addEventListener('click', this.volumeClick);
      this.elm.volumeSlider.addEventListener('mousedown', this.volumeDrag);
      document.getElementById('bsp-volume').addEventListener('click', this.volumeMute);
    }



    volumeHoverIn(e) {
      if (this.volumeHoverTimout) {
        clearTimeout(this.volumeHoverTimout);
      }
      return this.elm.volumeWrap.classList.add('bsp-volume-show');
    }

    volumeHoverOut(e) {
      return this.volumeHoverTimout = setTimeout(() => {
        return this.elm.volumeWrap.classList.remove('bsp-volume-show');
      }, 300);
    }

    volumeClick(e) {
      var percent;
      percent = getElementPercentage(e, this.elm.volumeSlider);
      return this.volumeSet(percent);
    }

    volumeSet(percent) {
      this.elm.volumeProgress.style.width = percent + '%';
      return this.lastVolume = this.video.volume = percent / 100, youTubePlayerVolumeChange(percent);
    }

    volumeDrag(e) {
      e.preventDefault();
      document.addEventListener('mousemove', this.volumeMoveHandler);
      return document.addEventListener('mouseup', this.volumeStopHandler);
    }

    volumeMoveHandler(e) {
      var percent;
      percent = getElementPercentage(e, this.elm.volumeSlider);
      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }
      return this.volumeSet(percent);
    }

    volumeStopHandler(e) {
      document.removeEventListener('mousemove', this.volumeMoveHandler);
      return document.removeEventListener('mouseup', this.volumeStopHandler);
    }

    volumeMute() {
      var vol;
      vol = this.video.volume > 0 ? 0 : this.lastVolume || 1;
      this.video.volume = vol;

      return this.elm.volumeProgress.style.width = vol * 100 + '%', youTubePlayerVolumeChange(vol * 100);
    }

  };

  control = new VolumeControl();

}).call(this);

/* end of Youtube Volume Control*/