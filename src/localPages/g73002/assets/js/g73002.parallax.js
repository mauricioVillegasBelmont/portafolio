G73002.prototype.parallax = function(){
  $(window).on('scroll',function(e){
    if($('#parallax').visible(true)){
      var wh = $(window).height();
      var st = $(window).scrollTop();
      var pt = $('#parallax').offset().top;
      var pw = $('#parallax  .picture-container').width();
      var ph = $('#parallax').height();
      var pb = pt + ph;
      var offset = 0;
      var x = st + (wh/2);
      offset = Math.round( ((x - pt)/(pb - pt))*100 );
      if (offset <= 0) {
        offset = 0;
      }else if (offset >= 100) {
        offset = 100;
      }
      var bh = (pw * 1048)/ 800;
      $('#parallax .picture-container').css({
        'background-position': 'center calc('+ offset + '% + 85px)',
        'background-size': pw +'px '+bh+'px'
      });
    }
  });

}
