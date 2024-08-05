// Programa consiste en cambiar pesos Argentinos a otra amplia variedad de monedas
// Se solicita al usuario la cantidad de pesos que desea convertir, se hace el cambio y luego se agradece 
// la visita. 
// Tiene contemplado el uso de mayusculas o minusculas y decimales.


document.addEventListener('DOMContentLoaded', () => {
    let tasasDeCambio = {};

    async function cargarTasasDeCambio() {
        const tasasDeCambioEnLocalStorage = localStorage.getItem('tasasDeCambio');
        if (tasasDeCambioEnLocalStorage) {
            tasasDeCambio = JSON.parse(tasasDeCambioEnLocalStorage);
        } else {
            try {
                const response = await fetch('tasasDeCambio.json');
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo JSON');
                }
                tasasDeCambio = await response.json();
                guardarDatos();  // Guarda el JSON en localStorage para futuras sesiones
            } catch (error) {
                console.error('Error cargando tasas de cambio:', error);
            }
        }
    }

    function guardarDatos() {
        const tasasDeCambioJSON = JSON.stringify(tasasDeCambio);
        localStorage.setItem('tasasDeCambio', tasasDeCambioJSON);
    }

    function convertirMoneda(monedaDestino, cantidad) {
        monedaDestino = monedaDestino.toLowerCase();
        const tasa = tasasDeCambio[monedaDestino];
        return tasa ? cantidad * tasa : 'No podemos efectuar el cálculo para esta moneda';
    }

    function manejarFormulario(event) {
        event.preventDefault();

        const pesosArgentinos = parseFloat(document.getElementById('pesosArgentinos').value);
        const monedaDestino = document.getElementById('monedaDestino').value;
        const resultElement = document.getElementById('result');

        if (isNaN(pesosArgentinos) || pesosArgentinos <= 0) {
            resultElement.textContent = 'Por favor, ingrese una cantidad válida de pesos argentinos.';
            return;
        }

        if (Object.keys(tasasDeCambio).includes(monedaDestino)) {
            const resultadoConversion = convertirMoneda(monedaDestino, pesosArgentinos);
            resultElement.textContent = `${pesosArgentinos} pesos argentinos son aproximadamente ${resultadoConversion.toFixed(2)} ${monedaDestino.toUpperCase()}.`;
        } else {
            resultElement.textContent = 'Moneda ingresada no válida.';
        }
    }

    document.getElementById('conversionForm').addEventListener('submit', manejarFormulario);

    cargarTasasDeCambio();
});
