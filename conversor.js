// Programa consiste en cambiar pesos Argentinos a dolares(usd), euros(eur) y chilenos(clp)
// Se solicita al usuario la cantidad de pesos que desea convertir, se hace el cambio y luego se agradece 
// la visita. 
// Tiene contemplado el uso de mayusculas o minusculas y decimales.

function convertirMoneda(monedaDestino, cantidad) {
    let resultado;
    switch (monedaDestino.toLowerCase()) {
        case 'usd':
            resultado = cantidad * 0.00072; // Cambio aproximado
            break;
        case 'eur':
            resultado = cantidad * 0.001; // Cambio aproximado
            break;
        case 'clp':
            resultado = cantidad * 0.9667; // Cambio aproximado
            break;
        default:
            resultado = 'No podemos efectuar el calculo de esta moneda';
    }
    return resultado;
}

function resultado() {
    let pesosArgentinos = prompt('Ingrese la cantidad de pesos argentinos que desea convertir:');
    pesosArgentinos = parseFloat(pesosArgentinos);

    let monedaDestino = prompt('Ingrese la moneda a la que desea convertir (USD, EUR, CLP):');

    let resultado = convertirMoneda(monedaDestino, pesosArgentinos);

    if (typeof resultado === 'number') {
        alert(`${pesosArgentinos} pesos argentinos son aproximadamente ${resultado.toFixed(2)} ${monedaDestino.toUpperCase()}.`);
        alert('¡Gracias por usar nuestros servicios de conversión de monedas!');
    } else {
        alert(resultado); // Moneda no valida
    }
}

resultado();
