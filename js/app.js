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

export function showToast(titulo, detalle = '', tipo = 'success') {
  if (typeof document === 'undefined') return;

  let container = document.getElementById('refood-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'refood-toast-container';
    container.className = 'fixed top-20 right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none';
    document.body.appendChild(container);
  }

  const iconMap = {
    success: { icon: 'check_circle', bg: 'bg-[#00261e]', accent: 'text-[#d5ee76]', border: 'border-[#d5ee76]/40' },
    info: { icon: 'info', bg: 'bg-[#123d32]', accent: 'text-[#a4d0c0]', border: 'border-[#a4d0c0]/40' },
    warning: { icon: 'warning', bg: 'bg-amber-900', accent: 'text-amber-300', border: 'border-amber-400/40' },
    error: { icon: 'error', bg: 'bg-rose-900', accent: 'text-rose-200', border: 'border-rose-400/40' }
  };

  const cfg = iconMap[tipo] || iconMap.success;

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-start gap-3 ${cfg.bg} text-white px-4 py-3.5 rounded-2xl shadow-2xl border ${cfg.border} transform transition-all duration-300 translate-y-2 opacity-0`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[22px] ${cfg.accent} shrink-0 mt-0.5">${cfg.icon}</span>
    <div class="flex flex-col flex-1 min-w-0">
      <span class="text-xs font-bold text-white leading-snug">${titulo}</span>
      ${detalle ? `<span class="text-[11px] text-white/80 mt-0.5 leading-relaxed">${detalle}</span>` : ''}
    </div>
    <button type="button" class="text-white/60 hover:text-white p-0.5" onclick="this.parentElement.remove()">
      <span class="material-symbols-outlined text-[16px]">close</span>
    </button>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-1');
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

window.actualizarBadgeNotificaciones = actualizarBadgeNotificaciones;
window.showToast = showToast;

document.addEventListener('DOMContentLoaded', () => {
  console.log('🌱 Inicializando Re-Food Valle de Aburrá Dashboard...');
  initRouter();
  actualizarBadgeNotificaciones();
});
