// Selecciona el contenedor donde se va a insertar el footer
const footerContainer = document.querySelector('#footer-container');

// Realiza una petición HTTP para cargar el archivo "footer.html"
fetch('modules_html/footer.html')
  .then(response => response.text()) // Obtén el texto de la respuesta
  .then(html => {
    // Inserta el HTML de "footer.html" en el contenedor
    footerContainer.innerHTML = html;
  })
  .catch(error => console.error(error)); // Maneja errores de la petición
