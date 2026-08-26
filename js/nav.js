/**
 * Inyecta componentes HTML reutilizables (nav y footer) de forma asíncrona
 * y resalta automáticamente la opción activa en el menú de navegación.
 */
document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('nav-container', 'nav.html', highlightActiveLink);
    
    await loadComponent('footer-container', 'footer.html', updateFooterYear);
});

/**
 * Carga un archivo HTML en el contenedor especificado
 * @param {string} containerId - ID del elemento destino
 * @param {string} url - Ruta relativa del archivo HTML a inyectar
 * @param {Function} [callback] - Función a ejecutar tras completar la inyección
 */
async function loadComponent(containerId, url, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status} al cargar ${url}`);
        }
        const htmlContent = await response.text();
        container.innerHTML = htmlContent;
        
        if (typeof callback === 'function') {
            callback();
        }
    } catch (error) {
        console.error(`Error inyectando el componente [${url}]:`, error);
        container.innerHTML = `<div class="alert alert-warning text-center m-0">No se pudo cargar el componente.</div>`;
    }
}

function highlightActiveLink() {
    // Obtiene la ruta actual de la ventana
    let currentPath = window.location.pathname.split('/').pop();
    
    // Si estamos en la raíz o en cadena vacía, por defecto es index.html
    if (!currentPath || currentPath === '') {
        currentPath = 'index.html';
    }

    const navLinks = document.querySelectorAll('#nav-container .nav-link, #nav-container .dropdown-item');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            
            // Si el enlace está dentro de un menú desplegable, marcar también el botón padre
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        } else if (link.getAttribute('aria-current') === 'page' && href !== currentPath) {
            // Remover etiqueta de activo si no coincide con la URL actual
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

function updateFooterYear() {
    const yearSpan = document.getElementById('year-footer');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}