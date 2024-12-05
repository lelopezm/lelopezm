// Selecciona el contenedor donde se va a insertar el nav
const navContainer = document.querySelector('#nav-container');

// Realiza una petición HTTP para cargar el archivo "nav.html"
fetch('nav.html')
  .then(response => response.text()) // Obtén el texto de la respuesta
  .then(html => {
    // Inserta el HTML de "nav.html" en el contenedor
    navContainer.innerHTML = html;
  })
  .catch(error => console.error(error)); // Maneja errores de la petición
