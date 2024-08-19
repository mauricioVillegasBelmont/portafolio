G73002.prototype.gallery_slider = function(){
  var conf = this.conf.gslider
  $('#fotos_slider').flexslider({
    animation: "fade",
    pauseOnHover:conf.pauseOnHover,
    mousewheel:conf.mousewheel,
    randomize:conf.randomize,
    directionNav:conf.directionNav,
    controlNav:conf.controlNav,
    slideshowSpeed:conf.slideshowSpeed,
    animationSpeed:conf.animationSpeed,
  });
}
