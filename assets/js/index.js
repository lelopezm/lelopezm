// Función para cargar contenido HTML desde un archivo externo
function cargarContenidoHTML(ruta, elementoID) {
    fetch(ruta)  // Hacemos la solicitud al archivo HTML.
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo HTML');
            }
            return response.text();  // Extraemos el texto (contenido HTML).
        })
        .then(data => {
            // Insertamos el contenido en el elemento con el ID especificado.
            document.getElementById(elementoID).innerHTML = data;
        })
        .catch(error => console.error('Error:', error));  // Manejamos errores.
}

// Cargar el contenido HTML en el div con id="contenido"
cargarContenidoHTML('assets/html/header.html', 'index-header');
cargarContenidoHTML('assets/html/index-content.html', 'index-content');
cargarContenidoHTML('assets/html/footer.html', 'index-footer');
