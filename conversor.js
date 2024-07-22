// Programa consiste en cambiar pesos Argentinos a otra amplia variedad de monedas
// Se solicita al usuario la cantidad de pesos que desea convertir, se hace el cambio y luego se agradece 
// la visita. 
// Tiene contemplado el uso de mayusculas o minusculas y decimales.


// Objeto para almacenar las tasas de cambio
const tasasDeCambio = {
    usd: 0.00072,   // Dólar americano
    eur: 0.001,     // euro
    clp: 0.9667,    // Peso chileno
    gbp: 0.00052,   // Libra esterlina
    aud: 0.00098,   // Dólar australiano
    cad: 0.00091,   // Dólar canadiense
    jpy: 0.079,     // Yen japonés
    cny: 0.0046     // Yuan chino
};

// Array de monedas válidas
const monedasValidas = ['usd', 'eur', 'clp', 'gbp', 'aud', 'cad', 'jpy', 'cny'];

// Función para convertir moneda
function convertirMoneda(monedaDestino, cantidad) {
    // Convertir la moneda destino a minúsculas para ser case-insensitive
    monedaDestino = monedaDestino.toLowerCase();

    if (tasasDeCambio.hasOwnProperty(monedaDestino)) {
        return cantidad * tasasDeCambio[monedaDestino];
    } else {
        return 'No podemos efectuar el cálculo para esta moneda';
    }
}

// Función para buscar una moneda en el array de monedas válidas
function buscarMoneda(moneda) {
    // Convertir la moneda a minúsculas para ser case-insensitive
    moneda = moneda.toLowerCase();
    
    // Buscar la moneda en el array
    let monedaEncontrada = monedasValidas.find(m => m === moneda);
    
    if (monedaEncontrada) {
        return `${moneda.toUpperCase()} encontrada en la lista de monedas válidas.`;
    } else {
        return `${moneda.toUpperCase()} no encontrada en la lista de monedas válidas.`;
    }
}

// Función para filtrar monedas por longitud del nombre
function filtrarMonedasPorLongitud(minLongitud) {
    // Filtrar monedas cuyos nombres tengan una longitud mayor o igual a minLongitud
    let monedasFiltradas = monedasValidas.filter(m => m.length >= minLongitud);
    
    return monedasFiltradas;
}

// Función principal para ejecutar la conversión
function resultado() {
    let continuar = true;

    while (continuar) {
        let pesosArgentinos = prompt('Ingrese la cantidad de pesos argentinos que desea convertir:');
        pesosArgentinos = parseFloat(pesosArgentinos);

        let monedaDestino = prompt('Ingrese la moneda a la que desea convertir (USD, EUR, CLP, GBP, AUD, CAD, JPY, CNY):').toLowerCase();

        if (monedasValidas.includes(monedaDestino)) {
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
        } else {
            alert('Moneda ingresada no válida. Por favor ingrese una de las siguientes opciones: USD, EUR, CLP, GBP, AUD, CAD, JPY, CNY.');
            continuar = false; // Terminar el bucle si la moneda no es válida
        }
    }

    alert('¡Gracias por usar nuestros servicios de conversión de monedas!');
}

// Ejecutar la función principal para iniciar el programa
resultado();
