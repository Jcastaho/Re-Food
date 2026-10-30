/**
 * Presentation Layer - Router SPA
 * Maneja la navegación sin recargas para las pantallas de Re-Food
 * 100% compatible con GitHub Pages mediante HashRouting
 */

import { renderDashboard } from './views/dashboardView.js';
import { renderPublicar } from './views/publicarView.js';
import { renderMisExcedentes } from './views/misExcedentesView.js';
import { renderOrganizaciones } from './views/organizacionesView.js';
import { renderCalculadora } from './views/calculadoraView.js';
import { renderLogin } from './views/loginView.js';
import {
  renderImpacto,
  renderRutaLogistica,
  renderDetalleDonacion,
  renderDetalleBanco,
  renderGuiaConservacion,
  renderNotificaciones,
  renderConfiguracion,
  renderLanding
} from './views/extraViews.js';

export const routes = {
  'resumen': { title: 'Panel de Donante', render: renderDashboard },
  'mis-excedentes': { title: 'Mis Excedentes', render: renderMisExcedentes },
  'publicar': { title: 'Publicar Excedente', render: renderPublicar },
  'organizaciones': { title: 'Organizaciones Receptoras', render: renderOrganizaciones },
  'banco-alimentos': { title: 'Detalle Organización', render: renderDetalleBanco },
  'impacto': { title: 'Impacto Ambiental', render: renderImpacto },
  'ruta-logistica': { title: 'Ruta Logística', render: renderRutaLogistica },
  'guia-conservacion': { title: 'Guía de Conservación', render: renderGuiaConservacion },
  'calculadora': { title: 'Calculadora de Inocuidad', render: renderCalculadora },
  'detalle-donacion': { title: 'Detalle de Donación', render: renderDetalleDonacion },
  'notificaciones': { title: 'Notificaciones y Perfil', render: renderNotificaciones },
  'configuracion': { title: 'Configuración', render: renderConfiguracion },
  'login': { title: 'Acceso Donantes', render: renderLogin, isFullPage: true },
  'institucional': { title: 'Portal Re-Food', render: renderLanding }
};

export function navigate(routeName = 'resumen') {
  const route = routes[routeName] || routes['resumen'];
  const mainContent = document.getElementById('main-content');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');
  const sidebar = document.getElementById('app-sidebar');
  const header = document.getElementById('app-header');
  const footer = document.getElementById('app-footer');
  const contentWrapper = document.getElementById('content-wrapper');

  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = route.title;
  }

  // Si es pantalla completa (ej: Login), ocultamos sidebar y header
  if (route.isFullPage) {
    if (sidebar) sidebar.classList.add('hidden');
    if (header) header.classList.add('hidden');
    if (footer) footer.classList.add('hidden');
    if (contentWrapper) {
      contentWrapper.classList.remove('pl-[240px]');
      contentWrapper.classList.add('pl-0');
    }
  } else {
    if (sidebar) sidebar.classList.remove('hidden');
    if (header) header.classList.remove('hidden');
    if (footer) footer.classList.remove('hidden');
    if (contentWrapper) {
      contentWrapper.classList.remove('pl-0');
      contentWrapper.classList.add('pl-[240px]');
    }
  }

  // Actualizar estado activo en la barra lateral
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    const path = link.getAttribute('data-path');
    if (path === routeName) {
      link.className = "nav-item flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#1b4e41] text-white font-semibold border-l-2 border-[#d5ee76] text-xs transition-all";
    } else {
      link.className = "nav-item flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#a4d0c0] hover:bg-[#1b4e41] hover:text-white text-xs font-medium transition-all";
    }
  });

  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(4px)';

    setTimeout(() => {
      mainContent.innerHTML = route.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      mainContent.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    }, 50);
  }

  // Actualizar URL hash sin recargar la página
  if (window.location.hash.replace('#', '') !== routeName) {
    window.location.hash = routeName;
  }
}

export function initRouter() {
  window.navigate = navigate;

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'resumen';
    navigate(hash);
  });

  const currentHash = window.location.hash.replace('#', '');
  
  // Si no hay hash y no ha iniciado sesión, mostrar login; si ya hay sesión o hash, navegar allí
  if (!currentHash) {
    const isLogged = localStorage.getItem('refood_logged_in');
    navigate(isLogged ? 'resumen' : 'login');
  } else {
    navigate(currentHash);
  }
}
