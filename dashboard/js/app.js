// app.js - Router y gestión de datos para el dashboard Re-Food (Clean Architecture ligera)

/*
  Organización (Clean Architecture simplificada):
  - core/   : lógica de negocio (aún vacía, placeholder)
  - data/   : acceso a datos (JSON estático por ahora)
  - ui/     : interacción con la UI (router, renderizado)
  En este proyecto monolítico mantenemos la separación mediante carpetas lógicas.
*/

// ---------- UI (router) ----------

const routes = {
  // Cada clave corresponde a "data-screen" en el menú y al archivo HTML en /screens
  // Ejemplo inicial (welcome screen ya incluida en index.html):
  welcome: 'screens/welcome.html',
  // Más adelante añadiremos: login: 'screens/login.html', configuracion: 'screens/configuracion.html', ...
};

/**
 * Carga asíncrona de una página HTML dentro del contenedor principal.
 * @param {string} screenName - Nombre de la pantalla (clave en routes).
 */
async function navigate(screenName) {
  const main = document.getElementById('main-content');
  const menuLinks = document.querySelectorAll('.sidebar a');

  // Desactivar enlace activo
  menuLinks.forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`.sidebar a[data-screen="${screenName}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Si la pantalla no está en el mapa, mostrar error simple
  if (!routes[screenName]) {
    main.innerHTML = `<section class="screen"><h2>Página no encontrada</h2><p>No existe la pantalla "${screenName}".</p></section>`;
    return;
  }

  try {
    const response = await fetch(routes[screenName]);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const html = await response.text();
    // Reemplazamos el contenido del contenedor principal
    main.innerHTML = html;
    // Opcional: iniciar scripts específicos de la pantalla
    if (window.afterLoadScreen) window.afterLoadScreen(screenName);
  } catch (err) {
    console.error('Error loading screen', screenName, err);
    main.innerHTML = `<section class="screen"><h2>Error</h2><p>No se pudo cargar la pantalla.</p></section>`;
  }
}

/**
 * Inicializa el menú lateral.
 * Busca los enlaces con atributo data-screen y les asocia el listener.
 */
function initMenu() {
  const menu = document.getElementById('menu');
  // Si el HTML del index tiene items estáticos, simplemente los enlazamos.
  const links = menu.querySelectorAll('a[data-screen]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const screen = link.getAttribute('data-screen');
      navigate(screen);
    });
  });
}

// ---------- Bootstrap ----------

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  // Mostrar pantalla por defecto (welcome)
  navigate('welcome');
});

// Exportar (para pruebas unitarias si se desea)
export { routes, navigate, initMenu };
