G73002.prototype.init_header_slider = function () {
  var self = this;
  var conf = this.conf.hslider;
  if (!conf.directionNav) {
    $(".custom-navigation").hide();
  }
  $('#header_slider').flexslider({
    animation: "slide",
    start:function(slider){
      self.setEqualHeight('#header_slider .slides li');
      self.headerSliderBg(slider);
    },
    after:function(slider){
      self.headerSliderBg(slider);
    },
    pauseOnHover:conf.pauseOnHover,
    mousewheel:conf.mousewheel,
    randomize:conf.randomize,
    directionNav:conf.directionNav,
    controlNav:conf.controlNav,
    slideshowSpeed:conf.slideshowSpeed,
    animationSpeed:conf.animationSpeed,
    customDirectionNav: $(".custom-navigation button"),
  });
  $(window).resize(function() {
    setTimeout(function functionName() {
      self.setEqualHeight('#header_slider .slides li');
    }, 200);
  });
};
G73002.prototype.headerSliderBg = function(slider){
  var self = this;
  var bg = $(slider.slides).eq(slider.currentSlide).data('bg');
  if(bg != '' ){
    $(slider).closest('.header_slider').css({'background-image': 'url("/site_media/uploads/header_slide/'+bg+'")' });
  }else {
    $(slider).closest('.header_slider').css({'background-image': '' });
  }
}
G73002.prototype.setEqualHeight = function(selector) {
  var heights = new Array();
  $(selector).each(function() {
    $(this).css('min-height', '0');
    $(this).css('max-height', 'none');
    $(this).css('height', 'auto');
    heights.push($(this).height());
  });

  var max = Math.max.apply( Math, heights );
  $(selector).each(function() {
    $(this).css('height', max + 'px');
  });
}
