let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let imagenOriginal = null;
let reconocimientoVoz = null;

// ARCHIVO
function abrirArchivo() {
    document.getElementById('fileInput').click();
}

document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        imagenOriginal = img;
    };
    img.src = URL.createObjectURL(file);
});

function guardarSVG() {
    alert('Exportando SVG...');
}

function exportarPNG() {
    const link = document.createElement('a');
    link.download = 'grafico-nise.png';
    link.href = canvas.toDataURL();
    link.click();
}

// PROCESAR
function separarColores() {
    if (!imagenOriginal) return alert('Primero abre una imagen');
    alert('Separando colores...');
}

function agregarOutlines() {
    alert('Agregando outlines...');
}

function aplicarGhostLight() {
    alert('Aplicando Ghost Light...');
}

// EDITAR
function deshacer() {
    alert('Deshacer');
}

function rehacer() {
    alert('Rehacer');
}

// VOZ
function iniciarVoz() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Usa Chrome para comandos de voz');
        return;
    }

    reconocimientoVoz = new webkitSpeechRecognition();
    reconocimientoVoz.lang = 'es-MX';
    reconocimientoVoz.continuous = true;

    reconocimientoVoz.onresult = (event) => {
        const comando = event.results[event.results.length-1][0].transcript.toLowerCase().trim();
