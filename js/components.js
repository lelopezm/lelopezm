/**
 * components.js - Gestión unificada e inyección de componentes HTML (nav y footer)
 * Universidad de Caldas — Prof. Luis Eduardo López M.
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Carga asíncrona del menú de navegación
    await loadComponent('nav-container', 'nav.html', highlightActiveLink);
    
    // 2. Carga asíncrona del pie de página
    await loadComponent('footer-container', 'footer.html', updateFooterYear);
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

        // Advertencia si se abre la web directamente desde el explorador de archivos (file://)
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