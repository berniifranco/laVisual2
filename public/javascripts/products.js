let precio = document.querySelectorAll('#precio');
let cantidad = document.querySelectorAll('#cantidad');
let precioTotal = document.querySelectorAll('#precioTotal');
let precioFinal = document.querySelector('#precioFinal');
let precios = [];
let cantidades = [];
let finales = 0;

for (o of precio) {
    precios.push(parseFloat(o.innerText.slice(2, o.length))).toFixed(2);
}

for (const o of cantidad) {
    cantidades.push(parseInt(o.innerText.slice(0, -8)))
}

for (let i=0; i<precioTotal.length; i++) {
    precioTotal[i].innerText = '$ ' + (precios[i] * cantidades[i])
    finales += (precios[i] * cantidades[i])
}

precioFinal.innerText = '$ ' + finales.toFixed(2);