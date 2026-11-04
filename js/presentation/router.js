/**
 * Presentation Layer - Router SPA
 * Maneja la navegación sin recargas para las pantallas de Re-Food
 * 100% compatible con GitHub Pages mediante HashRouting y soporte multi-rol
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
import {
  renderReceptorDashboard,
  renderReceptorDisponibles,
  renderReceptorMuelle,
  renderReceptorActas,
  renderReceptorImpacto,
  renderReceptorPerfil
} from './views/receptorViews.js';

export const routes = {
  // Rutas Donante (Restaurante)
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

  // Rutas Receptor (Fundación / Comedor)
  'receptor-dashboard': { title: 'Centro de Acopio · Fundación Saciar', render: renderReceptorDashboard },
  'receptor-disponibles': { title: 'Muro de Rescate · Alimentos Disponibles', render: renderReceptorDisponibles },
  'receptor-muelle': { title: 'Recepción en Muelle y Bodega', render: renderReceptorMuelle },
  'receptor-actas': { title: 'Actas y Certificados Emitidos', render: renderReceptorActas },
  'receptor-impacto': { title: 'Distribución y Beneficiarios', render: renderReceptorImpacto },
  'receptor-perfil': { title: 'Ficha Institucional Receptora', render: renderReceptorPerfil },

  // Rutas Globales
  'login': { title: 'Acceso a la Plataforma', render: renderLogin, isFullPage: true },
  'institucional': { title: 'Portal Re-Food', render: renderLanding }
};

export function applyRoleShell(role = 'donante') {
  const isReceptor = role === 'receptor';

  // Sidebar menus
  const sbDonante = document.getElementById('sidebar-donante');
  const sbReceptor = document.getElementById('sidebar-receptor');
  if (sbDonante && sbReceptor) {
    if (isReceptor) {
      sbDonante.classList.add('hidden');
      sbReceptor.classList.remove('hidden');
    } else {
      sbDonante.classList.remove('hidden');
      sbReceptor.classList.add('hidden');
    }
  }

  // Sidebar profiles
  const spDonante = document.getElementById('sidebar-profile-donante');
  const spReceptor = document.getElementById('sidebar-profile-receptor');
  if (spDonante && spReceptor) {
    if (isReceptor) {
      spDonante.classList.add('hidden');
      spReceptor.classList.remove('hidden');
    } else {
      spDonante.classList.remove('hidden');
      spReceptor.classList.add('hidden');
    }
  }

  // Header profiles
  const hpDonante = document.getElementById('header-profile-donante');
  const hpReceptor = document.getElementById('header-profile-receptor');
  if (hpDonante && hpReceptor) {
    if (isReceptor) {
      hpDonante.classList.add('hidden');
      hpReceptor.classList.remove('hidden');
    } else {
      hpDonante.classList.remove('hidden');
      hpReceptor.classList.add('hidden');
    }
  }

  // Breadcrumb prefix
  const bcPrefix = document.getElementById('header-breadcrumb-prefix');
  if (bcPrefix) {
    bcPrefix.textContent = isReceptor ? 'Sede Receptora' : 'Panel Donante';
  }
}

window.applyRoleShell = applyRoleShell;

export function navigate(routeInput = 'resumen') {
  const [routeName, queryString] = routeInput.split('?');
  const params = new URLSearchParams(queryString || '');
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

  // Aplicar rol activo al shell
  const currentRole = localStorage.getItem('refood_role') || 'donante';
  applyRoleShell(currentRole);

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
      mainContent.innerHTML = route.render(params);
      if (typeof window.actualizarBadgeNotificaciones === 'function') {
        window.actualizarBadgeNotificaciones();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      mainContent.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    }, 50);
  }

  // Actualizar URL hash sin recargar la página
  if (window.location.hash.replace('#', '') !== routeInput) {
    window.location.hash = routeInput;
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
    const role = localStorage.getItem('refood_role') || 'donante';
    navigate(isLogged ? (role === 'receptor' ? 'receptor-dashboard' : 'resumen') : 'login');
  } else {
    navigate(currentHash);
  }
}
