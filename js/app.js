/**
 * Main Application Bootstrap - Clean Architecture
 */

import { initRouter } from './presentation/router.js';
import { repository } from './data/repository.js';

export function actualizarBadgeNotificaciones() {
  const badge = document.getElementById('notif-badge');
  const count = repository.getNotificacionesNoLeidasCount();
  if (badge) {
    if (count > 0) {
      badge.classList.remove('hidden');
      badge.textContent = count > 9 ? '9+' : count;
    } else {
      badge.classList.add('hidden');
    }
  }
}

window.actualizarBadgeNotificaciones = actualizarBadgeNotificaciones;

document.addEventListener('DOMContentLoaded', () => {
  console.log('🌱 Inicializando Re-Food Valle de Aburrá Dashboard...');
  initRouter();
  actualizarBadgeNotificaciones();
});
