/**
 * contador.js - Contador de visitas global dinámico por página
 * Universidad de Caldas
 */

document.addEventListener('DOMContentLoaded', async () => {
    const contadorEl = document.getElementById('contador-visitas');
    if (!contadorEl) return;

    // Obtener el nombre de la página actual para usarlo como clave única
    let pageName = window.location.pathname.split('/').pop().replace('.html', '');
    if (!pageName || pageName === '') {
        pageName = 'index';
    }

    // Nombre de espacio único para tu sitio web (namespace)
    const namespace = "ucaldas_prof_lelopezm";

    try {
        // Petición a la API para incrementar y consultar el contador de la página actual
        const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${pageName}/up`);
        
        if (!response.ok) {
            throw new Error(`Error en respuesta API: ${response.status}`);
        }

        const data = await response.json();
        
        if (data && typeof data.count !== 'undefined') {
            contadorEl.innerText = Number(data.count).toLocaleString();
        } else {
            contadorEl.innerText = '1';
        }
    } catch (error) {
        console.warn('No se pudo conectar con el servicio de contador:', error);
        contadorEl.innerText = 'Disponible';
    }
});