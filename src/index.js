
import "./sass/sass-master.scss";
import WebGL from 'three/addons/capabilities/WebGL.js';
import {ThreeEnvironment} from './app_modules/three_canvas.js'

if (WebGL.isWebGLAvailable()) {
  new ThreeEnvironment("three", STATIC_DIR || "/site_media");
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
document.addEventListener('DOMContentLoaded', function() {
  // Obtener todos los elementos de entrada de texto y correo electrónico
  const textInputs = document.querySelectorAll('input[type="text"]');
  const emailInputs = document.querySelectorAll('input[type="email"]');

  // Agregar controladores de eventos focus y blur a los elementos de entrada de texto y correo electrónico
  textInputs.forEach(function(input) {
    input.addEventListener('focus', function() {
      document.body.classList.add('input-mode');
    });

    input.addEventListener('blur', function() {
      document.body.classList.remove('input-mode');
    });
  });

  emailInputs.forEach(function(input) {
    input.addEventListener('focus', function() {
      document.body.classList.add('input-mode');
    });

    input.addEventListener('blur', function() {
      document.body.classList.remove('input-mode');
    });
  });

  const requiredInputs = document.querySelectorAll('input:required, select:required, textarea:required');
  requiredInputs.forEach(function(element) {
    element.addEventListener('invalid', function(e) {
      switch (this.type) {
        case "text":
          switch (this.name) {
            case "nombre":
              this.setCustomValidity("Por favor ingresa tu nombre.");
              break;
            case "telefono":
              this.setCustomValidity(
                "Por favor ingresa un numero de telefono valido eg.:(52)55 1234 5678"
              );
              break;
            default:
              this.setCustomValidity("Por favor ingresa este dato.");
          }
          break;
        case "email":
          this.setCustomValidity(
            "Por favor ingresa una cuenta de correo válida eg.: nombre@dominio.com"
          );
          break;
        case "password":
          if (this.name === "psw") {
            this.setCustomValidity(
              "Tu contraseña deve tener almenos una mayuscula, una minuscula, un numero y un caracter especia."
            );
          }
          break;
        case "file":
          this.setCustomValidity(
            'Por favor sube un archivo ".jpg" o ".png".'
          );
          break;
        case "checkbox":
          switch (this.name) {
            case "terminos":
              this.setCustomValidity(
                "Por favor acepta los términos y condiciones."
              );
              break;
            default:
              this.setCustomValidity("Por favor selecciona una casilla.");
          }
          break;
        case "radio":
          var name = this.name;
          if (!window["ric_" + name]) {
            this.setCustomValidity("Por favor selecciona una opción.");
          }
          break;
        case "mensaje":
          this.setCustomValidity("Por favor ingresa un mensaje.");
          break;
      }
    });
    element.addEventListener('input', function(e) {
      e.target.setCustomValidity('');
    });
  });

  const formSumbit = function(event) {
    event.preventDefault();
    const form = document.getElementById('contact-form');
    const key = form.dataset.sitekey;
    // const key = window.reCaptchaKey;
    grecaptcha.ready(function(){
      grecaptcha.execute(key, {action: 'submit'}).then(function(token) {
        form.querySelector('input[type="hidden"]').value = token;
      }).then(function(args ='') {
        form.setAttribute('disabled', '');
        const data = new FormData(form)
        fetch( form.action, {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data),
        })
        .then(function(response) {
          return response.json();
        })
        .then( function(data){
          form.reset();
          if (data.status == 'ok') {
            document.getElementById('msg_success').style.display = 'block';
            form.style.display = 'none';
          }else{
            const errMsg = form.querySelector('.error-msg')
            errMsg.querySelector('p').innerHTML = data.message;
            errMsg.style.display = 'block';
          }
        })
        .catch(function(error){
            // TODO handle error
            console.error(error);
        });
      })
    })
  }
  document.getElementById('contact-form').addEventListener('submit', formSumbit);

})
