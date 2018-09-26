var canvas = document.getElementById("video");
var ctx = canvas.getContext('2d');
var fish = document.getElementById("fish");
//var totalImages = 72;


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











var stored = [];
fish.load();
fish.oncanplay  = function() {
    var i = this.currentTime;
    if(i < this.duration){
        console.log('currentTime: '+i);
        console.log('duration: '+this.duration);
        //this.currentTime = i;
        var canvasb = document.createElement('canvas');
        canvasb.height = window.innerHeight; // or 'height' if you want a special/scaled size
        canvasb.width = (canvas.height*this.videoWidth)/this.videoHeight; // or 'width' if you want a special/scaled size
        //this.currentTime = i;
        canvasb.getContext('2d').drawImage(this, 0, 0);
        var raw = canvasb.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
        canvasb.getContext('2d').clearRect(0, 0, canvasb.width, canvasb.height);
        stored.push(raw);
        /*this.onseeked = function(){
        }*/
        store(this);
            this.currentTime += 1;
        /*if(this.currentTime + 1 > this.duration){
           return
        }else{
            
            this.currentTime += 1;
        }*/
    }
    console.log('canplay');
};

function store(vid){
}
            //console.log('seeked');
            /*canvasb.getContext('2d').drawImage(this, 0, 0);
            var raw = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');
            //console.log('onseked '+i);
            
        console.log(stored.length);
    }
}

/*fish.addEventListener('loadeddata', function() {
});*/






/*function getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        callback(canvas.toDataURL('image/png'));
    };

    image.src = url;
}*/





/*fish.onseeked = function() {
    render(fish);
    //console.log(fish.currentTime)
};*/

/*function render(frame){
    ctx.drawImage(frame, fwo, fho, fw, canvas.height);
    if(ft <= fish.duration && check == true){
        var data = canvas.toDataURL('image/png');
        stored.push(data);
    }
    if(ft == fish.duration){
       check = false;
    }
}*/
