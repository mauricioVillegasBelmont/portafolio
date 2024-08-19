var _logic = null;
var _totalTime = null;
var _game = null;

var _emp = null;
var _temp = null;
var _finalTime = null;

//temp
configL = {};
configL.init_logic = { "modelo": 11 };
//end temp

function LOGIC(config){
	var that = this;
	Object.keys(config).forEach(function(key){
		that[key]( config[key] );
	});
};

LOGIC.prototype.init_logic = function( args ){
	var that = this;
	that.MAXTIME = 60;
	that.correct = 0;
	that.intentos = 0;
	that.emp = '';
	that.trans = '';
	that.score = 0;
	that.modelo = args.modelo;
	that.nombre = args.nombre;
	that.clave = args.clave;
	
	//DETECTAR SI SALE DE LA PAGINA
	$(window).bind( "beforeunload", function(){
		if( !that.gameover ){
			return "¿Seguro que quieres irte?";
		}
	});
};

LOGIC.prototype.prepare_start = function(){
	//console.log("prepare_start");
	var that = this;
	that.gameover = false;
	$.get(window.location.origin+"/site/page/check/validateGame", {}, function(data){
		if( data.status == "ok" ){
			that.token = data.token;
			that.playing = false;
		}
	}, "json");
};

LOGIC.prototype.start_game = function(){
	//console.log('start_game');
	if( this.playing ){
		return false;
	}
	$.get(window.location.origin+"/site/page/check/startGame", {}, function(data){}, "json");
	this.playing = true;
	this.emp = _emp = moment();
	this.crono = setInterval( this.crono_timer, 10); 
	var that = this;
	setTimeout( function(){
		that.end_game();
	}, (this.MAXTIME*60*1000) );//End game in MAXTIME
	_temp = null;
	_finalTime = null;
};

LOGIC.prototype.end_game = function(){
	//console.log('end_game');
	$.get(window.location.origin+"/site/page/check/endGame", {}, function(data){}, "json");
	clearInterval( this.crono );
	this.fin = _fin = moment();
	this.playing = false;
	this.trans = _temp;
	this.gameover = true;
	_game.scene.scenes[2].player.set("endGame", true);
	var data = {};
	data.action = "regGame";
	data.token = this.token;
	data.idGame = this.idGame;
	data.correct = this.correct;
	data.intentos = this.intentos;
	data.tiempo = this.tiempo;
	data.emp = this.emp;
	data.fin = this.fin;
	data.trans = this.trans;
	data.score = this.score;
	data.game_score = _game.scene.scenes[2].player.get('score');
	data = PECrypto.encrypt(data, this.token);
	$.ajax({
		url: window.location.origin+"/site/page/save",
		type: "POST",
		data: {s: data},
		cache: false,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			//console.log("End Ajax redirect?");
			window.location.href = window.location.origin+"/puzzle-gracias";
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("ERROR: " + textStatus);
		},
		complete: function(jqXHR, textStatus){
			console.log("complete");
		}
	});
	//END AJAX
}

LOGIC.prototype.add_movimiento = function(){
	//console.log('add_movimiento');
	this.intentos++;
	$.post(window.location.origin+"/site/page/check/update/intentos", {token: this.token}, function(data){ }, "json");
}

LOGIC.prototype.add_score = function(){
	//console.log('add_score');
	this.score++;
	$.get(window.location.origin+"/site/page/check/update/score", {token: this.token}, function(data){ }, "json");
}

LOGIC.prototype.add_correct = function(){
	//console.log('add_correct');
	this.correct++;
	$.get(window.location.origin+"/site/page/check/update/correct", {token: this.token}, function(data){ }, "json");
}

LOGIC.prototype.add_fallo = function(){
	//console.log('add_fallo');
	this.fallo++;
	$.get(window.location.origin+"/site/page/check/update/fallo", {token: this.token}, function(data){ }, "json");
}

LOGIC.prototype.stop_crono = function(){
	clearInterval( this.crono );
	this.fin = _fin = moment();
}

LOGIC.prototype.crono_timer = function(){
	actual = moment();
	cro = actual.diff( _emp, "ms" );
	function addZ(n) {
		return (n<10? '0':'') + n;
	}
	var ms = cro % 1000;
	var s = (cro - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;
	time = addZ(hrs) + ':' + addZ( mins ) + ':' + addZ( secs )+ '.' + addZ( parseInt(ms/10) );
	_temp = time+" - "+cro;
	_finalTime = time;
	_totalTime = time;
	//$("span#tiempo").html( time );
}

LOGIC.prototype.time_format = function( cro ){
	function addZ(n) {
		return (n<10? '0':'') + n;
	}
	var ms = cro % 1000;
	var s = (cro - ms) / 1000;
	var secs = s % 60;
	s = (s - secs) / 60;
	var mins = s % 60;
	var hrs = (s - mins) / 60;
	//time = addZ(hrs) + ':' + addZ( mins ) + ':' + addZ( secs )+ ':' + addZ( parseInt(ms/10) );
	time = addZ(hrs) + ':' +addZ( mins ) + ':' + addZ( secs )+ '.' + addZ( parseInt(ms) );
	this.tiempo = time;
	return time;
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
var _wait = false;
/*
 * Variables Globales
 */
var console = window.console;

$( document ).ready(function() {
	_logic = new LOGIC(configL);
});