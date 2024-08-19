var g73002;
function G73002(conf=''){
  this.conf = conf;
  this.init_pushbar();

}

G73002.prototype.is_mobil = function () {
  if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
    return true;
  }
  return false;
};


G73002.prototype.init_pushbar = function () {
  this.pushbar = new Pushbar({
    blur:true,
    overlay:true,
  });
};
G73002.prototype.init_libs = function () {
  if ($("#header_slider").length) this.init_header_slider();
  if ($("#fotos_slider").length) this.gallery_slider();
  if ($("#yt-player").length) this.init_yt();
  if ($("#parallax").length) this.parallax();
}

function InvalidMsg(textbox,f) {
	var msg = {};
	switch (f) {
		case 0:
			msg['empty'] = 'Porfavor ingresa tu correo';
			msg['mismatch'] = 'Porfavor ingresa una cuenta de correo valida';
			break;
		default:
		msg['empty'] = 'Por favor completa este campo';
		msg['mismatch'] = 'Por favor ingresa una tipo de respuesta valida';
	}
	if (textbox.value === '') {
		textbox.setCustomValidity(msg['empty']);
	} else if (textbox.validity.typemismatch) {
		textbox.setCustomValidity(msg['mismatch']);
	}else if(textbox.validity.patternMismatch){
    textbox.setCustomValidity(msg['mismatch']);
	}else {
    textbox.setCustomValidity('');
  }
	return true;
}

$( document ).ready(function() {
  g73002 = new G73002(conf);
});
window.addEventListener("load", function () {
  g73002.init_libs();
});