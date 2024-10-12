//ESTE NO ES EL QUE HAY QUE REVISAR, ESTO LO HICE EXTRA PARA "PERSONALIZAR" EL LAB. SADJSALKDJASLKD


// Referencias a elementos del DOM
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const backgroundsDiv = document.getElementById('backgrounds');
const closeSettingsBtn = document.getElementById('close-settings');

// Función para mostrar el panel de configuraciones
settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.add('animate__animated', 'animate__fadeInUp'); // Añadir clases de animación sí señor.
    settingsPanel.style.display = 'block'; // Mostrar el panel
    cargarFondos(); // Cargar los fondos de pantalla como miniatura
});

// Función para cerrar el panel de configuraciones
closeSettingsBtn.addEventListener('click', () => {
    settingsPanel.style.display = 'none'; 
});

// Función para cargar los fondos de pantalla
function cargarFondos() {
    backgroundsDiv.innerHTML = ''; // Limpiar posible fondo y hacer un ciclo
    for (let i = 0; i <= 16; i++) { 
        const img = document.createElement('img');
        img.src = `fondos/${i}.jpg`; // Ruta de la imagen prederteminado
        img.style.width = '100px'; // tamaño de muestra
        img.style.cursor = 'pointer';
        img.alt = `Fondo ${i}`; 
        img.addEventListener('click', () => {
            document.body.style.backgroundImage = `url(fondos/${i}.jpg)`; // Cambiar fondo
            settingsPanel.style.display = 'none'; // Ocultar el panel después de seleccionar
        });
        backgroundsDiv.appendChild(img); // Añadir imagen al div del html
    }
}


// Referencias a elementos del DOM
const hoverColorPicker = document.getElementById('hover-color-picker');
const applyHoverColorBtn = document.getElementById('apply-hover-color');

// Función para calcular el contraste y cambiar el color del texto (esto fue con ayuda de IA)
function getContrastingColor(hex) {
    // Convertir hex a RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Calcular el brillo relativo
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
    return brightness > 186 ? '#000000' : '#ffffff'; // Blanco si el fondo es oscuro, negro si es claro
}

// Función para aplicar el color de hover a todos los botones
applyHoverColorBtn.addEventListener('click', () => {
    const selectedColor = hoverColorPicker.value;
    
    // Actualiza el estilo de hover de los botones
    const style = document.createElement('style');
    style.textContent = `
        button:hover {
            background-color: ${selectedColor};
            color: ${getContrastingColor(selectedColor)}; /* Cambiar el color del texto según el contraste */
        }
    `;
    document.head.appendChild(style);
});
