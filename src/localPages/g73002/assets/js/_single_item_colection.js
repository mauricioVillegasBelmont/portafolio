window.addEventListener('load', function(){
  window[func]();
});

function single_val_conditional_active(){
  $.each( model, function( key, value ) {
    if (value == '') {
      enable_inputs(false);
    }
    $("input[name="+key+"]").on('change',function(){
      var enable = false;
      if (this.type == 'file' && this.files.length) {
        enable = true;
      }else if(this.type == 'text' && this.value != ''){
        enable = true;
      }
      enable_inputs(enable);
    });
  });
}
function schedule_conditional_active(){
  var actividad = ($("input[name=ACTIVIDAD]").val() != '')? true:false;
  var fecha = ($("input[name=FECHA]").val() != '')? true:false;
  var enable = (fecha && actividad)? true:false;
  enable_inputs(enable);

  $("input[name=FECHA]").on('change',function(){
    var fecha = ($(this).val() != '')? true:false;
    var actividad = ($("input[name=ACTIVIDAD]").val() != '')? true:false;
    var enable = (fecha && actividad)? true:false;
    enable_inputs(enable);
  });
  $("input[name=ACTIVIDAD]").on('change',function(){
    var fecha = ($("input[name=FECHA]").val() != '')? true:false;
    var actividad = ($(this).val() != '')? true:false;
    var enable = (fecha && actividad)? true:false;
    enable_inputs(enable);
  });
}

function dowloables_conditional_active(){
  var thumbnail = (model.THUMBNAIL != '')? true:false;
  var other = false;
  $.each( model.or, function( key, value ){
    var _other = (value != '')? true:false;
    if(_other) other = true;

    $("input[name="+key+"]").on('change',function(){
      var th = ($("input[name=THUMBNAIL]").val()  != '' || model.THUMBNAIL != '')? true:false;
      var d = ($("input[name=DESKTOP]").val()  != '' || model.or.DESKTOP  != '')? true:false;
      var t = ($("input[name=TABLET]").val()  != '' || model.or.TABLET  != '')? true:false;
      var c = ($("input[name=CELPHONE]").val()  != '' || model.or.CELPHONE  != '')? true:false;
      var en = false;
      if (th && (d || t || c)) en = true;
      enable_inputs(en);
    });
  });
  var enable = (thumbnail && other)? true:false;
  enable_inputs(enable);

  $("input[name=THUMBNAIL]").on('change',function(){
    var thumbnail = ($(this).val() != '')? true:false;
    var other = false;
    $.each( model.or, function( key, value ){
      var _other = ($("input[name="+key+"]").val()  != '')? true:false;
      if(_other) other = true;
    })
    var enable = (thumbnail && other)? true:false;
    enable_inputs(enable);
  });


}

function enable_inputs(enable){
  if (enable){
    $("#active_slide").prop( "disabled", false );
    $("#active_slide").parents('.form-group').removeClass('disabled');
    $("#slide_order").prop( "disabled", false );
    $("#slide_order").parents('.form-group').removeClass('disabled');
  }else {
    $("#active_slide").prop( "disabled", true );
    $("#active_slide").parents('.form-group').addClass('disabled');
    $("#slide_order").prop( "disabled", true );
    $("#slide_order").parents('.form-group').addClass('disabled');
  }
}
