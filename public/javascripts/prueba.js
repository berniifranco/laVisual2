window.addEventListener('load', () => {
    divPrueba = document.querySelector('.prueba');
    fetch('/products/api')
    .then(res => {
        return res.json()
    })
    .then(productos => {
        productos.map(producto => {
            divPrueba.innerHTML += "<div class='d-flex'><h1>" + producto.nombre + "</h1> <br>"
            divPrueba.innerHTML += "<p>" + producto.precio + "</p></div>"
        })
    })
})