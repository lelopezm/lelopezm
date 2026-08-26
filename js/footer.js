/**
 * footer.js - Carga asíncrona y segura del pie de página (footer.html)
 * Universidad de Caldas — Prof. Luis Eduardo López M.
 */

document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.querySelector('#footer-container');

    // Verificar si el contenedor existe en la página HTML actual
    if (!footerContainer) {
        console.warn('Advertencia [footer.js]: No se encontró la etiqueta <footer id="footer-container"></footer> en el HTML.');
        return;
    }

    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}: No se pudo obtener footer.html`);
            }
            return response.text();
        })
        .then(html => {
            footerContainer.innerHTML = html;

            const yearSpan = document.getElementById('year-footer');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        })
        .catch(error => {
            console.error('Error cargando footer.html:', error);

            // Mensaje de ayuda si estás abriendo el HTML haciendo doble clic en la carpeta (file://)
            if (window.location.protocol === 'file:') {
                footerContainer.innerHTML = `
                    <div class="alert alert-warning text-center m-4 p-3 shadow-sm rounded-3">
                        <h6 class="fw-bold mb-1">⚠️ Restricción del Navegador (Protocolo Local file://)</h6>
                        <p class="small mb-0">
                            Los navegadores bloquean las peticiones <code>fetch()</code> por seguridad al abrir archivos HTML directamente desde las carpetas de tu equipo.<br>
                            <strong>Solución:</strong> Utiliza la extensión <strong>Live Server</strong> en VS Code o abre la página a través de <strong>GitHub Pages</strong>.
                        </p>
                    </div>
                `;
            }
        });
});