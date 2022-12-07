let precio = document.querySelectorAll('#precio');
let cantidad = document.querySelectorAll('#cantidad');
let precioTotal = document.querySelectorAll('#precioTotal');
let precios = [];
let cantidades = [];

for (o of precio) {
    precios.push(parseFloat(o.innerText.slice(2, o.length)));
}

for (const o of cantidad) {
    cantidades.push(parseInt(o.innerText.slice(0, -8)))
}

for (let i=0; i<precioTotal.length; i++) {
    precioTotal[i].innerText = '$ ' + (precios[i] * cantidades[i])
}