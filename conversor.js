// Programa consiste en cambiar pesos Argentinos a otra amplia variedad de monedas
// Se solicita al usuario la cantidad de pesos que desea convertir, se hace el cambio y luego se agradece 
// la visita. 


document.addEventListener('DOMContentLoaded', () => {
    let tasasDeCambio = {};
    let monedasDisponibles = [];

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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error cargando tasas de cambio: ' + error.message
                });
            }
        }
    
        // Llamar a la función para mostrar las monedas disponibles
        mostrarMonedasDisponibles();
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
    
        if (isNaN(pesosArgentinos) || pesosArgentinos <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Entrada inválida',
                text: 'Por favor, ingrese una cantidad válida de pesos argentinos.'
            });
            return;
        }
    
        if (Object.keys(tasasDeCambio).includes(monedaDestino)) {
            const resultadoConversion = convertirMoneda(monedaDestino, pesosArgentinos);
            Swal.fire({
                icon: 'success',
                title: 'Resultado de la conversión',
                text: `${pesosArgentinos} pesos argentinos son aproximadamente ${resultadoConversion.toFixed(2)} ${monedaDestino.toUpperCase()}.`
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Moneda no válida',
                text: 'Moneda ingresada no válida.'
            });
        }
    }    

    function mostrarMonedasDisponibles() {
        const monedasElement = document.getElementById('monedasDisponibles');
        if (monedasElement) {
            monedasDisponibles = Object.keys(tasasDeCambio).filter(moneda => tasasDeCambio[moneda] > 1);
            monedasElement.innerHTML = `<ul>${monedasDisponibles.map(moneda => `<li>${moneda.toUpperCase()}</li>`).join('')}</ul>`;
        }
    }

    document.getElementById('conversionForm').addEventListener('submit', manejarFormulario);

    cargarTasasDeCambio();
});
