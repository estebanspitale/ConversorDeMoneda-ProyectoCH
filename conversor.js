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
            resultado = 'No podemos efectuar el cálculo de esta moneda';
    }
    return resultado;
}

function resultado() {
    let continuar = true;

    while (continuar) {
        let pesosArgentinos = prompt('Ingrese la cantidad de pesos argentinos que desea convertir:');
        pesosArgentinos = parseFloat(pesosArgentinos);

        let monedaDestino = prompt('Ingrese la moneda a la que desea convertir (USD, EUR, CLP):');

        let resultadoConversion = convertirMoneda(monedaDestino, pesosArgentinos);

        if (typeof resultadoConversion === 'number') {
            alert(`${pesosArgentinos} pesos argentinos son aproximadamente ${resultadoConversion.toFixed(2)} ${monedaDestino.toUpperCase()}.`);
            let continuarInput = prompt('¿Desea realizar otra conversión? (Sí/No)').toLowerCase();
            if (continuarInput !== 'sí' && continuarInput !== 'si') {
                continuar = false;
            }
        } else {
            alert(resultadoConversion); // Moneda no válida
            continuar = false; // Terminar el bucle si hay un error
        }
    }

    alert('¡Gracias por usar nuestros servicios de conversión de monedas!');
}

resultado();