$(window).on("load",function(){
    loaded();
});
var visionEn= [['Have no fear of perfection—you’ll never reach it','Salvador Dali'], ['Digital design is like painting, except the paint never dries','Neville Brody'],['Creativity is a highfalutin word for the work I have to do between now and Tuesday','Ray Kroc'],['Creativity is nothing but the way to solve new problems.','Anonimo'],['People ignore designs that ignore people','Frank Chimero'],['For every complex problem, there is an answer that is clear, simple, and wrong','H. L. Mencken'], ['Design is not just what it looks like and feels like. Design is how it works','Steve Jobs'],['Those who don’t build must burn.','Ray Bradbury'],['If you think good design is expensive, you should look at the cost of bad design','Ralf Speth']];
var vision= [['No tengas miedo a la perfección... — nunca la alcanzarás','Salvador Dali'], ['El diseño digital es como pintar, excepto que la pintura nunca se seca','Neville Brody'],['La creatividad es una palabra arrogante para el trabajo que tengo que hacer entre hoy y el martes','Ray Kroc'],['La creatividad no es más que la forma de resolver nuevos problemas','Anonimo'],['La gente ignora los diseños que ignoran a las personas','Frank Chimero'],['Para cada problema complejo, hay una respuesta que es clara, simple e incorrecta','H. L. Mencken'], ['El diseño no es solo lo que parece y se siente. El diseño es como funciona','Steve Jobs'],['Aquellos que no construyen deberian arder','Ray Bradbury'],['Si crees que un buen diseño es costoso, debes considerar el costo de un mal diseño','Ralf Speth']];
var slider;
var h = window.innerWidth * 4;



//cover size adjustment
$('#coverPage').css('height', h);

if($(window).scrollTop() != 0){
   scrollEvents($(window).scrollTop());
}

//contact behivior
$('#contact-close').on('click',function(){
    $('footer').toggleClass('active');
});

//phrases
var p = Math.floor(Math.random() * vision.length) + 0 ;
$('#vision blockquote').html(vision[p][0]);
$('#vision').append('<p>'+vision[p][1]+'</p>');

//scroll transition
$("#nav a").click( function(event) {
    if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 2000, function(){
            window.location.hash = hash;
        });
    }
});

$(".scroll-next").click(function() {
    event.preventDefault();
    var cls = $(this).closest("section").next();

    $("html, body").animate({
        scrollTop: cls.offset().top
    }, 2000, function(){
        window.location.hash = cls.attr('id');
    });
});

$('.item:eq(0)').addClass('active');
$('.dot:eq(0)').addClass('active');
portaNavButton(0);

$('section').on('scrollSpy:enter', function() {
    $('a[href = "#'+$(this).attr('id')+'" ]').addClass('active');
});
$('section').on('scrollSpy:exit', function() {
    $('a[href = "#'+$(this).attr('id')+'" ]').removeClass('active');
});
var firsTimeModalScreen = 0;
$('section').on('scrollSpy:enter', function() {

   $(this).find('.scroll-next').addClass('active');
   // /console.log($(this).find('.scroll-next'));
});
$('section').on('scrollSpy:exit', function() {

   $(this).find('.scroll-next').removeClass('active');
});
$('section#myExperience').on('scrollSpy:enter', function() {
   if(window.innerWidth >= 1025){
      if(firsTimeModalScreen === 0){
         modalFirstTime();
      }{
         $('#show-portfolio').addClass('active');

      }
    }else {
      $('#show-portfolio').addClass('active');
    }
    //console.log('myExperience enter');
});
$('section#myExperience').on('scrollSpy:exit', function() {
    if($('#portfolio-modal').hasClass('active')){
       closeModal();
    }
    $('#show-portfolio').removeClass('active');
   if($('#portfolio-modal').hasClass('sectionEnter')){
      $('#portfolio-modal').removeClass('sectionEnter');
   }
    //console.log('myExperience exit');
});
$('section').scrollSpy();

$( window ).resize(function(){
    console.log('window resize');
});
function scrollEvents(cs){
    if(cs <= ($('#coverPage').height())/2){
        $('header').addClass('active');
    }else{
        $('header').removeClass('active');
    }
    if( cs > ($('#coverPage').height()/3) && cs <= $('#coverPage').height() && !$('body').hasClass('footerShowed')){
        $('footer').addClass('active');
    }else{
        $('footer').removeClass('active');
    }
    if(cs >= ($('#coverPage').height()*1.2)){
        $('body').addClass('footerShowed');
    }
    if(cs <= $('#coverPage').height()*0.5){
        //console.log('cover');
        $('nav').removeClass('active');
        $('#fish').removeClass('active');
    }else{
        $('nav').addClass('active');
        $('#fish').addClass('active');
    }
    if($('#portfolio-modal').hasClass('active')){
        //closeModal();
    }
   //  if(firsTimeModalScreen > 0 && $('#portfolio-modal').hasClass('sectionEnter')){
   //    $('#portfolio-modal.sectionEnter').removeClass('active');
   //    $('#portfolio-modal').removeClass('sectionEnter');
   //    $('#show-portfolio').addClass('active');
   //    console.log('portfolio closed for scroll');
   // }
}

function modalFirstTime(){
   $('#portfolio-modal').addClass('active');
   $('#portfolio-modal').addClass('sectionEnter');

   firsTimeModalScreen += 1;
}

$('#show-portfolio').click(function(){
    if(window.innerWidth <= 1024){
       $('body').css("overflow-y", "hidden");
    }
    if($('#portfolio-modal').hasClass('active')){
        closeModal();
    }else{
        $('#portfolio-modal').addClass('active');
    }
    $(this).removeClass('active');
});


$('.dot').click(function(){
    var a = $(this).index();
    portaNavButton(a);
    slideSelector(a);
});

$('.prev').click(function(){
    var a = $('.dot.active').index();
    if(a-1 >= 0){
        portaNavButton(a-1);
        slideSelector(a-1);
    }
});

$('.next').click(function(){
    var l = $('.dot').length-1;
    var a = $('.dot.active').index();
    if(a+1 <= l){
        portaNavButton(a+1, l);
        slideSelector(a+1);
    }
});

$('#modal-close').click(function(){
    closeModal();
    $('#show-portfolio').addClass('active');
});

function slideSelector(a){
    stopVideos();
    $('.dot').removeClass('active');
    $('.item').removeClass('active');
    $('.item:eq('+a+')').addClass('active');
    $('.dot:eq('+a+')').addClass('active');
}

function portaNavButton(a , l){
    l = l || $('.dot').length-1;
    if(a <= 0){
        $('.prev').addClass('disabled');
    }else{
        if($('.prev').hasClass('disabled')){
            $('.prev').removeClass('disabled');
        }
    }
    if(a >= l){
        $('.next').addClass('disabled');
    }else{
        if($('.next').hasClass('disabled')){
            $('.next').removeClass('disabled');
        }
    }
}
function closeModal(){
   $('body').css("overflow-y", "auto");
   if($('#portfolio-modal').hasClass('sectionEnter')){
      $('#portfolio-modal').removeClass('sectionEnter');
   }
   stopVideos();
   $('#portfolio-modal').removeClass('active');
}

function stopVideos(){
    if (webPV){
        webPV.stopVideo();
    }
    if(mmedPV){
        mmedPV.stopVideo();
    }
}
function loaded(){
    $('body').addClass('loaded');
    setTimeout(function(){
        $( ".loading" ).remove();
    }, 1500);
}
