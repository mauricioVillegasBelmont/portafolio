
import isMobile from 'ismobilejs';



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('overlay').addEventListener('click',function(){
    document.getElementById('details').open=false;
  })
  setTimeout(function(){
    layoutSizeHelpers()
  },250)
  setDevice();
  dialogAlert();
});
window.addEventListener("resize", function (e) {
  this.setTimeout(function(){
    layoutSizeHelpers();
    setDevice();
  },250)
});

function setDevice() {
  const is_mobil = isMobile(window.navigator).any;
  const add = is_mobil?'mobil':'desktop';
  const remove = is_mobil?'desktop':'mobil';
  const htmlElement = document.querySelector('html')
  htmlElement.classList.add(add);
  htmlElement.classList.remove(remove);
}
function layoutSizeHelpers() {
  const htmlElement = document.querySelector('html');
  const mainHeader = document.getElementById('main_header');
  const mainFooter = document.getElementById('main_footer');

  if (mainHeader) {
    var headerHeight = (mainHeader.offsetHeight??0) + 'px';
    htmlElement.style.setProperty('--header-h', headerHeight);
  }
  if ( mainFooter ) {
    var footerHeight = (mainFooter.offsetHeight??0) + 'px';
    htmlElement.style.setProperty('--footer-h', footerHeight);
  }
}
function dialogAlert() {
  const dialogElement = document.getElementById('deviceAdvice');
  if( ! dialogElement || dialogElement.dataset.device === undefined ) return;
  const is_mobil = isMobile(window.navigator).any;
  const userDevice = is_mobil?'mobil':'desktop';
  if(userDevice !== dialogElement.dataset.device) dialogElement.showModal();
}