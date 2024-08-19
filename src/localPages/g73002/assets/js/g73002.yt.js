
G73002.prototype.init_yt = function () {
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
G73002.prototype.load_yt_video = function(){
  var self = this;
  var conf = this.conf.yt;
  var w = $(`#${conf.container}`).parent().width(), h = ((w * 9)/16);
  h = (h > w)?w:h;
  this.yt_player = new YT.Player( conf.container, {
    height: h,
    width: w,
    videoId: conf.video_id,
    playerVars:{
      autoplay:0,
      loop: 0,
      modestbranding: 1,
      iv_load_policy: 3,
      autohide: 1,
      rel:0,
      showinfo: 0,
      controls:1,
    },
    events: {
      onReady: function(e) {
        if (conf.autoplay) {
          $(window).on('scroll',function(){
            self.video_visible();
          });
        }
        $(window).on('resize',function(){
          self.video_responsive();
        });
      },
      onStateChange:function(e){
      }
    }
  });

}
G73002.prototype.video_visible = function(){
  var state = this.yt_player.getPlayerState();
  var is_visible = $(`#${this.conf.yt.container}`).visible(true);
  if( is_visible && (state == 5 || state == -1) ){
    this.yt_player.playVideo();
  }else if(!is_visible && state ==  1 ){
    this.yt_player.pauseVideo();
  }
}
G73002.prototype.video_responsive = function(){
  var w = $(`#${this.conf.yt.container}`).parent().width();
  var h = ((w * 9)/16);
  h = (h > w)?w:h;
  $(this.yt_player.h).attr('width', w).attr('height', h);
}
function onYouTubeIframeAPIReady() {
  g73002.load_yt_video();
}
