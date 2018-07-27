var canvas = document.getElementById("video");
var ctx = canvas.getContext('2d');
var fish = document.getElementById("fish");
//var totalImages = 72;
fish.load();
var lastScrollTop = 0;
var fwo = 0;
var fho = 0;
var fw;
var fh;
var ft = 0;

function fishSetup(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    fw = (canvas.height*fish.videoWidth)/fish.videoHeight;
}


$( window ).resize(fishSetup);

fish.addEventListener('loadeddata', function() {
    fishSetup();
    render(fish);
    $( document ).keydown( function(event) {
        if (event.keyCode == 37) {
            //console.log('prev');
            ft -= 1;
            fish.currentTime = ft;
        }else if (event.keyCode == 39) {
            //console.log('next');
            ft += 1;
            fish.currentTime = ft;
        }
        
        if(ft >= fish.duration){
            ft = 0;  
        }else if(ft <= 0){
           ft = fish.duration;
        }
    });
    
    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            //console.log("down")
            ft += 1;
            fish.currentTime = ft;
        } else {
            //console.log("up")
            ft -= 1;
            fish.currentTime = ft;
        }
       lastScrollTop = st;

        if(ft >= fish.duration){
            ft = 0;  
        }else if(ft <= 0){
            ft = fish.duration;
        }
        
        scrollEvents(st);
    });
    
}, false);

fish.onseeked = function() {
    render(fish);
};

function render(video){
    ctx.drawImage(video, fwo, fho, fw, canvas.height);
}
