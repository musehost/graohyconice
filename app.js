const imgInput = document.getElementById('imgInput');
const procesarBtn = document.getElementById('procesarBtn');
const outlineBtn = document.getElementById('outlineBtn');
const exportBtn = document.getElementById('exportBtn');
const canvasOriginal = document.getElementById('canvasOriginal');
const layersContainer = document.getElementById('layersContainer');
const ctx = canvasOriginal.getContext('2d');

let imagenOriginal = null;
let coloresSeparados = [];

imgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            imagenOriginal = img;
            canvasOriginal.width = img.width;
            canvasOriginal.height = img.height;
            ctx.drawImage(img, 0, 0);
            procesarBtn.disabled = false;
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

procesarBtn.addEventListener('click', () => {
    if (!imagenOriginal) return;
    
    const imageData = ctx.getImageData(0, 0, canvasOriginal.width, canvasOriginal.height);
    const data = imageData.data;
    const coloresUnicos = new Set();
    
    // Detectar colores únicos, tolerancia de 10
    for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) continue; // ignora transparente
        const r = Math.round(data[i] / 10) * 10;
        const g = Math.round(data[i + 1] / 10) * 10;
        const b = Math.round(data[i + 2] / 10) * 10;
        coloresUnicos.add(`${r},${g},${b}`);
    }
    
    // Crear un canvas por cada color
    layersContainer.innerHTML = '';
    coloresSeparados = [];
    
    coloresUnicos.forEach((colorStr) => {
        const [r, g, b] = colorStr.split(',').map(Number);
        const layerCanvas = document.createElement('canvas');
        layerCanvas.width = canvasOriginal.width;
        layerCanvas.height = canvasOriginal.height;
        layerCanvas.className = 'layer-item';
        layerCanvas.style.backgroundColor = `rgb(${r},${g},${b})`;
        
        const layerCtx = layerCanvas.getContext('2d');
        const layerData = layerCtx.createImageData(canvasOriginal.width, canvasOriginal.height);
        
        // Copiar solo píxeles de ese color
        for (let i = 0; i < data.length; i += 4) {
            const pr = Math.round(data[i] / 10) * 10;
            const pg = Math.round(data[i + 1] / 10) * 10;
            const pb = Math.round(data[i + 2] / 10) * 10;
            
            if (pr === r && pg === g && pb === b) {
                layerData.data[i] = r;
                layerData.data[i + 1] = g;
                layerData.data[i + 2] = b;
                layerData.data[i + 3] = 255;
            }
        }
        
        layerCtx.putImageData(layerData, 0, 0);
        layersContainer.appendChild(layerCanvas);
        coloresSeparados.push({color: colorStr, canvas: layerCanvas});
    });
    
    outlineBtn.disabled = false;
    exportBtn.disabled = false;
});

outlineBtn.addEventListener('click', () => {
    // Próximo paso: agregar outlines a cada layer
    alert('Outline: Lo programamos en el siguiente paso');
});

exportBtn.addEventListener('click', () => {
    // Próximo paso: exportar SVG
    alert('Export SVG: Lo programamos en el siguiente paso');
});
