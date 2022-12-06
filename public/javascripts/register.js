window.addEventListener('load', () => {
    let form = document.querySelector('.registro');
    let erroresUl = document.querySelector('.errores');
    let email = document.querySelector('#email');
    let password = document.querySelector('.password');
    let nombre = document.querySelector('.nombre');
    let usuario = document.querySelector('.usuario');
    let direccion = document.querySelector('.direccion');
    let ciudad = document.querySelector('.ciudad');
    let provincia = document.querySelector('.provincia');
    let pais = document.querySelector('.pais');
    let imagen = document.querySelector('.imagen');

    let errores = [];
    form.addEventListener('submit', (e) => {
        erroresUl.innerHTML = '';
        if (email.value.length == 0) {
            errores.push('Debe ingresar un E-Mail');
        }
        if (password.value == "") {
            errores.push('Debe ingresar un password');
        }
        if (nombre.value == "") {
            errores.push('Debe ingresar un nombre');
        }
        if (usuario.value == "") {
            errores.push('Debe ingresar un nombre de usuario');
        }
        if (direccion.value == "") {
            errores.push('Debe ingresar una dirección');
        }
        if (ciudad.value == "") {
            errores.push('Debe ingresar una ciudad');
        }
        if (provincia.value == "") {
            errores.push('Debe ingresar una provincia');
        }
        if (pais.value == "" || pais.value == "Elige...") {
            errores.push('Debe elegir un país');
        }

        if (errores.length != 0) {
            e.preventDefault();
            errores.forEach(error => {
                erroresUl.innerHTML += '<li>' + error + '</li>'
            })
        }

    })
})