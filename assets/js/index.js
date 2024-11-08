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

function cargarLinkContent(ruta, elementoID){
    fetch(ruta)  // Hacemos la solicitud al archivo HTML.
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo HTML');
        }
        return response.text();  // Extraemos el texto (contenido HTML).
    })
    .then(data => {
        // Insertamos el contenido en el elemento con el ID especificado.
        document.getElementById(elementoID).addEventListener( "click", ()=>{
            cargarContenidoHTML(ruta, 'index-content');
        })
    })
    .catch(error => console.error('Error:', error));  // Manejamos errores.
}

// Cargar el contenido HTML en el div con id="contenido"
cargarContenidoHTML('assets/html/header.html', 'index-header');
cargarContenidoHTML('assets/html/index-content.html', 'index-content');
cargarContenidoHTML('assets/html/footer.html', 'index-footer');

// Si desea cargar un documento html en el content del index, solo es que agregue la ruta del html y luego
// poner el id del link( el id va en <a id= " ">), recordar quitarle al link ( target="_blanck" ) a la etiqueta "a"
cargarLinkContent('assets/html/asignaturas/fundamentales.html','link_fundamentales')
cargarLinkContent('assets/html/asignaturas/calculo1.html','link_calculo1')
