var _logic;
$( document ).ready(function() {
  _logic = new Logic();
  _logic.start();
  $("button[name='nextQ']").off("click");
  $("button[name='nextQ']").on("click", function(e){
    if( $("span.error").length > 0 ){
      $("span.error").remove();
    }
    var button = $("button[name='nextQ']");
    if( !$('input:radio[name="question"]').is(':checked') ){
      $("<span class='error'>Error, por favor selecciona una opcion.</span>").insertAfter(button);
      return false;
    }else{
      var p = $("input[name='id']").val();
      var r = $('input:radio[name="question"]:checked').val();
      $.get(window.location.origin+"/next/"+p+"/"+r, {}, function(data){
        if(data.status == "ok"){
          $("input[name='id']").val(data.id);
          $("p#pregunta").html(data.pregunta);
          $("input#radio_0").val(data.opc_0_val);
          $("label[for='radio_0'].text-large").html(data.opc_0);
          $("input#radio_1").val(data.opc_1_val);
          $("label[for='radio_1'].text-large").html(data.opc_1);
          $("input#radio_2").val(data.opc_2_val);
          $("label[for='radio_2'].text-large").html(data.opc_2);
          $("input[name='question']").prop("checked", false);
        }else if(data.status == "redirect"){
          _logic.end();
          window.location.href = window.location.origin+data.url
        }        
      });
    }//END if
    e.preventDefault();
  });
  //DETECTAR SI SALE DE LA PAGINA
  $(window).bind( "beforeunload", function(){
    if( !_logic.gameover ){
      return "¿Seguro que quieres irte?";
    }
  });
});

var console = window.console;
var _emp = null;
var _fin = null;
var _temp = null;
var _finalTime = null;
var _tiempo = null;
var Logic = function(){
  this.MAXTIME = 60;
  this.correct = 0;
  this.emp = null;
  this.fin = null;
  this.crono = null;

  this.start = function start(){
    this.emp = _emp = moment();
    this.crono = setInterval( this.cronoTimer, 10);
  }

  this.end = function end(){
    this.gameover = true;
    window.clearInterval( this.crono );
  }

  this.cronoTimer = function cronoTimer(){
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
    time = addZ(hrs) + ':' + addZ( mins ) + ':' + addZ( secs ) + '.' + addZ( parseInt(ms/10) );
    _tiempo = time;
    _temp = time+" - "+cro;
    _finalTime = addZ(hrs) + 'h' + addZ( mins ) + 'm' + addZ( secs )+ 's' + addZ( parseInt(ms/10) )+"ms"+cro+"cro";
    time = addZ(hrs) + ':' + addZ( mins ) + ':' + addZ( secs );
    $("#time").html( time );
    $("input[name='tiempo']").val(_finalTime);
    //console.log("t:",time, "t2:",_finalTime);
  }
}