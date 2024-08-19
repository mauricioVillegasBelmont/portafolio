var root = document.documentElement;
$( document ).ready(function() {
  init_color_picker();
});
function init_color_picker(){
  $('.color_picker').on('input', function() {
    var val = $(this).val();
    var na = '--'+$(this).attr('name');
    console.log(na,val);
    $(this).next('.hex_input').val(val);
    root.style.setProperty(na,val);
  });
  $('.hex_input').on('input', function() {
    var val = $(this).val();
    var na = '--'+$(this).prev('.color_picker').attr('name');;
    console.log(na,val);
    $(this).prev('.color_picker').val(val);
    root.style.setProperty(na,val);
  });
}
