/**
 * Presentation Layer - Mis Excedentes View
 * Gestión y listado completo de excedentes del donante con CRUD interactivo
 * Soporta vista del donante activo (Provenza Bistro & Café) y vista de la red metropolitana
 */

import { repository } from '../../data/repository.js';
import { getDefaultImageForCategory } from '../../core/imageCompressor.js';

let activeScope = 'mis-lotes'; // 'mis-lotes' | 'red'
let activeFilter = 'todos';
let searchQuery = '';

export function renderMisExcedentes() {
  const all = repository.getExcedentes();
  const baseItems = activeScope === 'mis-lotes' 
    ? all.filter(e => e.establecimiento === 'Provenza Bistro & Café')
    : all;

  const enRuta = baseItems.filter(e => e.estado === 'En Ruta').length;
  const asignados = baseItems.filter(e => e.estado === 'Asignado').length;
  const entregados = baseItems.filter(e => e.estado === 'Entregado').length;
  const publicados = baseItems.filter(e => e.estado === 'Publicado').length;

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Control de Inventario y Alimentos</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Mis Excedentes</h1>
        <p class="text-sm text-[#414845] mt-1">
          Operando como <strong class="text-[#123d32]">Provenza Bistro & Café</strong> (El Poblado, Medellín).
        </p>
      </div>

      <button onclick="window.navigate('publicar')" class="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#00261e] hover:bg-[#123d32] text-white text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        <span>Publicar Nuevo Excedente</span>
      </button>
    </div>

    <!-- Selector de Ámbito: Mis Lotes vs Red Metropolitana -->
    <div class="flex items-center gap-2 bg-[#eeeee7] p-1.5 rounded-2xl self-start border border-[#e3e3dc] shadow-xs">
      <button onclick="window.setExcedentesScope('mis-lotes')" id="scope-tab-mis-lotes" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeScope === 'mis-lotes' ? 'bg-[#00261e] text-white shadow-sm' : 'text-[#414845] hover:text-[#1a1c18]'}">
        <span class="flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">store</span>
          <span>Mis Lotes (Provenza Bistro)</span>
        </span>
      </button>
      <button onclick="window.setExcedentesScope('red')" id="scope-tab-red" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeScope === 'red' ? 'bg-[#00261e] text-white shadow-sm' : 'text-[#414845] hover:text-[#1a1c18]'}">
        <span class="flex items-center gap-1.5">
          <span class="material-symbols-outlined text-[16px]">hub</span>
          <span>Red Metropolitana (Todos los Restaurantes)</span>
        </span>
      </button>
    </div>

    <!-- Mini stats bar reactivo -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3" id="stats-summary-bar">
      <div class="bg-white p-4 rounded-xl border border-[#e8e9e2] shadow-sm">
        <span class="text-xs text-[#717975] uppercase font-bold">Total Lotes</span>
        <p class="text-2xl font-extrabold text-[#00261e] mt-1" id="stat-total">${baseItems.length}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-[#e8e9e2] shadow-sm">
        <span class="text-xs text-amber-700 uppercase font-bold">En Ruta</span>
        <p class="text-2xl font-extrabold text-amber-600 mt-1" id="stat-en-ruta">${enRuta}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-[#e8e9e2] shadow-sm">
        <span class="text-xs text-emerald-700 uppercase font-bold">Asignados</span>
        <p class="text-2xl font-extrabold text-emerald-600 mt-1" id="stat-asignados">${asignados}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-[#e8e9e2] shadow-sm">
        <span class="text-xs text-[#546500] uppercase font-bold">Entregados</span>
        <p class="text-2xl font-extrabold text-[#546500] mt-1" id="stat-entregados">${entregados}</p>
      </div>
    </div>

    <!-- Filtros y Tabla -->
    <div class="bg-white rounded-2xl shadow-[0_2px_16px_rgba(18,61,50,0.03)] border border-[#e8e9e2] overflow-hidden flex flex-col">
      <!-- Toolbar de Filtros -->
      <div class="p-4 bg-white border-b border-[#eeeee7] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-1.5 flex-wrap w-full sm:w-auto" id="filter-tabs-container">
          <button onclick="window.filterExcedentes('todos')" class="filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold ${activeFilter === 'todos' ? 'bg-[#00261e] text-white' : 'text-[#414845] hover:bg-[#eeeee7]'}" id="filter-todos">Todos (${baseItems.length})</button>
          <button onclick="window.filterExcedentes('Publicado')" class="filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold ${activeFilter === 'Publicado' ? 'bg-[#00261e] text-white' : 'text-[#414845] hover:bg-[#eeeee7]'}" id="filter-publicado">Publicados (${publicados})</button>
          <button onclick="window.filterExcedentes('En Ruta')" class="filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold ${activeFilter === 'En Ruta' ? 'bg-[#00261e] text-white' : 'text-[#414845] hover:bg-[#eeeee7]'}" id="filter-en-ruta">En Ruta (${enRuta})</button>
          <button onclick="window.filterExcedentes('Asignado')" class="filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold ${activeFilter === 'Asignado' ? 'bg-[#00261e] text-white' : 'text-[#414845] hover:bg-[#eeeee7]'}" id="filter-asignado">Asignados (${asignados})</button>
          <button onclick="window.filterExcedentes('Entregado')" class="filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold ${activeFilter === 'Entregado' ? 'bg-[#00261e] text-white' : 'text-[#414845] hover:bg-[#eeeee7]'}" id="filter-entregado">Entregados (${entregados})</button>
        </div>

        <div class="relative w-full sm:w-64">
          <span class="material-symbols-outlined absolute left-3 top-2 text-[#717975] text-[18px]">search</span>
          <input type="text" id="search-excedentes" oninput="window.searchExcedentesHandler(this.value)" placeholder="Buscar por alimento o código..." class="w-full pl-9 pr-3 py-1.5 text-xs bg-[#f4f4ed] rounded-lg border border-[#e3e3dc] focus:outline-none focus:border-[#123d32]" />
        </div>
      </div>

      <!-- Listado de Tarjetas / Filas -->
      <div class="divide-y divide-[#eeeee7]" id="excedentes-list-container">
        ${renderExcedentesRows(baseItems)}
      </div>
    </div>
  </div>

  <!-- Modal de Confirmación para Eliminar -->
  <div id="delete-modal-overlay" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e8e9e2] flex flex-col gap-4 transform transition-all">
      <div class="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
        <span class="material-symbols-outlined text-[28px]">delete_forever</span>
      </div>
      <div>
        <h3 class="text-lg font-extrabold text-[#00261e]" id="delete-modal-title">¿Eliminar este excedente?</h3>
        <p class="text-xs text-[#717975] mt-1" id="delete-modal-desc">
          Esta acción retirará permanentemente el lote del inventario de rescate y de la red logística.
        </p>
      </div>
      <div class="flex items-center justify-end gap-3 pt-2">
        <button type="button" onclick="window.closeDeleteModal()" class="px-4 py-2 rounded-xl text-xs font-semibold text-[#414845] hover:bg-[#eeeee7] transition-colors">
          Cancelar
        </button>
        <button type="button" id="confirm-delete-btn" class="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow">
          Sí, eliminar lote
        </button>
      </div>
    </div>
  </div>
  `;
}

function renderExcedentesRows(items) {
  if (items.length === 0) {
    return `
    <div class="p-10 text-center text-[#717975] flex flex-col items-center justify-center gap-3">
      <div class="w-14 h-14 rounded-full bg-[#eeeee7] flex items-center justify-center text-[#717975]">
        <span class="material-symbols-outlined text-[30px]">inventory_2</span>
      </div>
      <p class="text-sm font-semibold text-[#00261e]">No se encontraron lotes para este criterio.</p>
      <p class="text-xs max-w-sm text-[#717975]">Publica un nuevo excedente o selecciona otro filtro para visualizar los registros.</p>
      <button onclick="window.navigate('publicar')" class="mt-2 px-4 py-2 bg-[#00261e] text-white rounded-xl text-xs font-semibold">
        Publicar primer alimento
      </button>
    </div>
    `;
  }

  return items.map(item => {
    let badge = 'bg-gray-100 text-gray-700';
    if (item.estado === 'Publicado') badge = 'bg-blue-50 text-blue-800 border border-blue-200';
    else if (item.estado === 'En Ruta') badge = 'bg-amber-50 text-amber-800 border border-amber-200';
    else if (item.estado === 'Asignado') badge = 'bg-emerald-50 text-emerald-800 border border-emerald-200';
    else if (item.estado === 'Entregado') badge = 'bg-[#d5ee76]/50 text-[#171e00] border border-[#b9d15d]';

    const imageSrc = item.imagenUrl || getDefaultImageForCategory(item.categoria);
    const esPropio = item.establecimiento === 'Provenza Bistro & Café';

    return `
    <div class="p-4 sm:p-5 hover:bg-[#fafaf3] transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4" id="row-excedente-${item.id}">
      <!-- Columna Izquierda: Imagen y Datos del Lote -->
      <div class="flex items-start gap-4 min-w-0 w-full lg:w-auto">
        <!-- Imagen Optimizada -->
        <div class="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-[#e8e9e2] shadow-sm">
          <img src="${imageSrc}" alt="${item.nombre}" class="w-full h-full object-cover" loading="lazy" />
          <span class="absolute bottom-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">
            ${item.cantidadKg} kg
          </span>
        </div>

        <!-- Información -->
        <div class="flex flex-col min-w-0 flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-bold text-sm sm:text-base text-[#00261e] leading-snug">${item.nombre}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#eeeee7] text-[#414845] font-bold">${item.id}</span>
            ${!esPropio ? `
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 font-semibold">
              ${item.establecimiento}
            </span>
            ` : `
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              Mi Establecimiento
            </span>
            `}
          </div>

          <div class="flex items-center gap-2 text-xs text-[#717975] mt-1 flex-wrap">
            <span class="font-semibold text-[#1a1c18]">${item.categoria}</span>
            <span>·</span>
            <span>${item.temperatura}</span>
            <span>·</span>
            <span>Recogida: <strong>${item.horaLimite || 'Hoy'}</strong></span>
          </div>

          <div class="flex items-center gap-2 text-[11px] text-[#717975] mt-1 flex-wrap">
            <span class="material-symbols-outlined text-[13px] text-[#546500]">location_on</span>
            <span>${item.establecimiento} (${item.ubicacion})</span>
            <span>·</span>
            <span>Destino: <strong class="text-[#1a1c18]">${item.organizacionDestino || 'Banco de Alimentos'}</strong></span>
          </div>

          ${item.notas ? `
          <p class="text-[11px] text-[#717975] bg-[#fafaf3] border border-[#f0f0ea] p-1.5 rounded-lg mt-1.5 line-clamp-1 italic">
            "${item.notas}"
          </p>
          ` : ''}
        </div>
      </div>

      <!-- Columna Derecha: Estado y Botones de Acción -->
      <div class="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#eeeee7]">
        <!-- Selector Rápido de Estado -->
        <div class="flex flex-col items-start lg:items-end">
          <div class="relative">
            <select ${!esPropio ? 'disabled' : ''} onchange="window.cambiarEstadoRapido('${item.id}', this.value)" class="text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer appearance-none pr-6 focus:outline-none focus:ring-1 focus:ring-[#123d32] ${badge} ${!esPropio ? 'opacity-85 cursor-default' : ''}">
              <option value="Publicado" ${item.estado === 'Publicado' ? 'selected' : ''}>Publicado</option>
              <option value="Asignado" ${item.estado === 'Asignado' ? 'selected' : ''}>Asignado</option>
              <option value="En Ruta" ${item.estado === 'En Ruta' ? 'selected' : ''}>En Ruta</option>
              <option value="Entregado" ${item.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
            </select>
            <span class="material-symbols-outlined absolute right-1.5 top-1.5 text-[14px] pointer-events-none text-current">expand_more</span>
          </div>
          <span class="text-[10px] text-[#717975] mt-0.5">${item.fechaPublicacion || 'Publicado recientemente'}</span>
        </div>

        <!-- Grupo de Botones de Acción -->
        <div class="flex items-center gap-1">
          ${esPropio ? `
          <!-- Botón Editar (Solo para lotes de Provenza Bistro) -->
          <button onclick="window.navigate('publicar?edit=${item.id}')" class="p-2 rounded-xl hover:bg-[#eeeee7] text-[#123d32] transition-colors" title="Editar lote">
            <span class="material-symbols-outlined text-[20px]">edit</span>
          </button>

          <!-- Botón Eliminar (Solo para lotes de Provenza Bistro) -->
          <button onclick="window.openDeleteModal('${item.id}', '${item.nombre.replace(/'/g, "\\'")}')" class="p-2 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors" title="Eliminar lote">
            <span class="material-symbols-outlined text-[20px]">delete</span>
          </button>
          ` : ''}

          <!-- Botón Ver Trazabilidad -->
          <button onclick="window.navigate('detalle-donacion?id=${item.id}')" class="p-2 rounded-xl hover:bg-[#eeeee7] text-[#717975] transition-colors" title="Ver guía de entrega y trazabilidad">
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
    `;
  }).join('');
}

// Controladores Globales
window.setExcedentesScope = function(scope) {
  activeScope = scope;

  const btnMis = document.getElementById('scope-tab-mis-lotes');
  const btnRed = document.getElementById('scope-tab-red');

  if (btnMis && btnRed) {
    if (scope === 'mis-lotes') {
      btnMis.className = "px-4 py-2 rounded-xl text-xs font-bold transition-all bg-[#00261e] text-white shadow-sm";
      btnRed.className = "px-4 py-2 rounded-xl text-xs font-bold transition-all text-[#414845] hover:text-[#1a1c18]";
    } else {
      btnMis.className = "px-4 py-2 rounded-xl text-xs font-bold transition-all text-[#414845] hover:text-[#1a1c18]";
      btnRed.className = "px-4 py-2 rounded-xl text-xs font-bold transition-all bg-[#00261e] text-white shadow-sm";
    }
  }

  window.actualizarListaExcedentes();
  window.actualizarContadores();
};

window.filterExcedentes = function(status) {
  activeFilter = status;
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(t => t.className = "filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold text-[#414845] hover:bg-[#eeeee7]");

  const targetId = status === 'todos' ? 'filter-todos' :
                   status === 'Publicado' ? 'filter-publicado' :
                   status === 'En Ruta' ? 'filter-en-ruta' :
                   status === 'Asignado' ? 'filter-asignado' : 'filter-entregado';
  const target = document.getElementById(targetId);
  if (target) target.className = "filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00261e] text-white";

  window.actualizarListaExcedentes();
};

window.searchExcedentesHandler = function(query) {
  searchQuery = query || '';
  window.actualizarListaExcedentes();
};

function getFilteredList() {
  const all = repository.getExcedentes();
  let list = activeScope === 'mis-lotes' 
    ? all.filter(e => e.establecimiento === 'Provenza Bistro & Café')
    : all;

  if (activeFilter !== 'todos') {
    list = list.filter(e => e.estado === activeFilter);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    list = list.filter(e => 
      e.nombre.toLowerCase().includes(q) || 
      e.categoria.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      (e.establecimiento && e.establecimiento.toLowerCase().includes(q))
    );
  }

  return list;
}

window.actualizarListaExcedentes = function() {
  const list = getFilteredList();
  const container = document.getElementById('excedentes-list-container');
  if (container) container.innerHTML = renderExcedentesRows(list);
};

window.cambiarEstadoRapido = function(id, nuevoEstado) {
  try {
    repository.updateEstadoExcedente(id, nuevoEstado);
    window.actualizarListaExcedentes();
    window.actualizarContadores();
  } catch (err) {
    alert('Error al actualizar estado: ' + err.message);
  }
};

let itemToDeleteId = null;

window.openDeleteModal = function(id, nombre) {
  itemToDeleteId = id;
  const modal = document.getElementById('delete-modal-overlay');
  const title = document.getElementById('delete-modal-title');
  const desc = document.getElementById('delete-modal-desc');
  const confirmBtn = document.getElementById('confirm-delete-btn');

  if (title) title.textContent = `¿Eliminar lote ${id}?`;
  if (desc) desc.textContent = `Se retirará "${nombre}" permanentemente del inventario de rescate.`;
  
  if (confirmBtn) {
    confirmBtn.onclick = function() {
      if (itemToDeleteId) {
        repository.deleteExcedente(itemToDeleteId);
        window.closeDeleteModal();
        window.actualizarListaExcedentes();
        window.actualizarContadores();
      }
    };
  }

  if (modal) modal.classList.remove('hidden');
};

window.closeDeleteModal = function() {
  itemToDeleteId = null;
  const modal = document.getElementById('delete-modal-overlay');
  if (modal) modal.classList.add('hidden');
};

window.actualizarContadores = function() {
  const all = repository.getExcedentes();
  const baseItems = activeScope === 'mis-lotes' 
    ? all.filter(e => e.establecimiento === 'Provenza Bistro & Café')
    : all;

  const enRuta = baseItems.filter(e => e.estado === 'En Ruta').length;
  const asignados = baseItems.filter(e => e.estado === 'Asignado').length;
  const entregados = baseItems.filter(e => e.estado === 'Entregado').length;
  const publicados = baseItems.filter(e => e.estado === 'Publicado').length;

  const statTotal = document.getElementById('stat-total');
  const statEnRuta = document.getElementById('stat-en-ruta');
  const statAsignados = document.getElementById('stat-asignados');
  const statEntregados = document.getElementById('stat-entregados');

  if (statTotal) statTotal.textContent = baseItems.length;
  if (statEnRuta) statEnRuta.textContent = enRuta;
  if (statAsignados) statAsignados.textContent = asignados;
  if (statEntregados) statEntregados.textContent = entregados;

  const fTodos = document.getElementById('filter-todos');
  const fPub = document.getElementById('filter-publicado');
  const fRuta = document.getElementById('filter-en-ruta');
  const fAsig = document.getElementById('filter-asignado');
  const fEntr = document.getElementById('filter-entregado');

  if (fTodos) fTodos.textContent = `Todos (${baseItems.length})`;
  if (fPub) fPub.textContent = `Publicados (${publicados})`;
  if (fRuta) fRuta.textContent = `En Ruta (${enRuta})`;
  if (fAsig) fAsig.textContent = `Asignados (${asignados})`;
  if (fEntr) fEntr.textContent = `Entregados (${entregados})`;
};
