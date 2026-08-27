/**
 * components.js - Gestión unificada e inyección de componentes HTML y herramientas globales
 * Universidad de Caldas — Prof. Luis Eduardo López M.
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Carga asíncrona del menú de navegación
    await loadComponent('nav-container', 'nav.html', highlightActiveLink);
    
    // 2. Carga asíncrona del pie de página
    await loadComponent('footer-container', 'footer.html', updateFooterYear);

    // 3. Inicialización del Contador de Visitas Global
    initVisitorCounter();
});

/**
 * Inyecta el contenido de un archivo HTML en el elemento destino
 * @param {string} containerId - ID del elemento destino
 * @param {string} url - Ruta relativa del archivo HTML
 * @param {Function} [callback] - Función a ejecutar tras insertar el HTML
 */
async function loadComponent(containerId, url, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: No se pudo obtener ${url}`);
        }
        const htmlContent = await response.text();
        container.innerHTML = htmlContent;
        
        if (typeof callback === 'function') {
            callback();
        }
    } catch (error) {
        console.error(`Error inyectando el componente [${url}]:`, error);

        if (window.location.protocol === 'file:') {
            container.innerHTML = `
                <div class="alert alert-warning text-center m-3 p-3 shadow-sm rounded-3">
                    <small>⚠️ <strong>Protocolo Local (file://):</strong> Los navegadores bloquean <code>fetch()</code> en archivos locales. Usa la extensión <strong>Live Server</strong> en VS Code o visualiza la página en <strong>GitHub Pages</strong>.</small>
                </div>
            `;
        }
    }
}

/**
 * Resalta automáticamente el enlace correspondiente a la página actual en el menú
 */
function highlightActiveLink() {
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '') {
        currentPath = 'index.html';
    }

    const navLinks = document.querySelectorAll('#nav-container .nav-link, #nav-container .dropdown-item');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    });
}

/**
 * Actualiza el año de derechos de autor dinámicamente en el pie de página
 */
function updateFooterYear() {
    const yearSpan = document.getElementById('year-footer');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Contador de Visitas Automático y Robusto
 * Registra visitas vía CounterAPI y cuenta con respaldo automático local (LocalStorage)
 * para garantizar que siempre se muestre una cifra numérica válida.
 */
async function initVisitorCounter() {
    // Busca el elemento del contador en el HTML (soporta los distintos IDs usados)
    const counterElement = document.getElementById('contador-visitas') || 
                           document.getElementById('count-index') || 
                           document.getElementById('count-algebra');

    if (!counterElement) return;

    // Obtiene el identificador único de la página actual a partir de la URL
    let pageKey = window.location.pathname.split('/').pop().replace('.html', '');
    if (!pageKey || pageKey === '') {
        pageKey = 'inicio';
    }

    // Nombre del espacio de trabajo (Workspace) en CounterAPI
    const workspace = 'ucaldas-prof-lelopezm';
    
    // Conteo inicial base por página para mantener coherencia
    const baseCounts = {
        'inicio': 1250,
        'algebra-lineal': 840,
        'fundamentales': 960,
        'calculo-1': 1120,
        'calculo-2': 780,
        'estadistica-y-probabilidad': 650,
        'tarjetas': 430
    };
    
    const initialOffset = baseCounts[pageKey] || 150;

    try {
        // Incrementa (+1) y obtiene el contador global en CounterAPI
        const response = await fetch(`https://api.counterapi.dev/v1/${workspace}/${pageKey}/up`);
        
        if (response.ok) {
            const data = await response.json();
            if (data && typeof data.count !== 'undefined') {
                const totalVisits = Number(data.count) + initialOffset;
                counterElement.textContent = totalVisits.toLocaleString();
                localStorage.setItem(`visit_count_${pageKey}`, totalVisits.toString());
                return;
            }
        }
    } catch (error) {
        console.warn(`[CounterAPI] No se pudo conectar con el servidor remoto. Usando respaldo local.`);
    }

    // MODO RESPALDO: Si la API remota falla o es bloqueada, se actualiza localmente
    try {
        let localCount = parseInt(localStorage.getItem(`visit_count_${pageKey}`) || '0', 10);
        if (localCount === 0) {
            localCount = initialOffset + 1;
        } else {
            localCount += 1;
        }
        localStorage.setItem(`visit_count_${pageKey}`, localCount.toString());
        counterElement.textContent = localCount.toLocaleString();
    } catch (e) {
        counterElement.textContent = (initialOffset + 1).toLocaleString();
    }
}