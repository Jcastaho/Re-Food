/**
 * Presentation Layer - Mis Excedentes View
 * Gestión y listado completo de excedentes del donante
 */

import { repository } from '../../data/repository.js';

export function renderMisExcedentes() {
  const excedentes = repository.getExcedentes();
  const enRuta = excedentes.filter(e => e.estado === 'En Ruta').length;
  const asignados = excedentes.filter(e => e.estado === 'Asignado').length;
  const entregados = excedentes.filter(e => e.estado === 'Entregado').length;

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Control de Inventario</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Mis Excedentes</h1>
        <p class="text-sm text-[#414845] mt-1">Monitorea el estado de cada lote desde su registro hasta la entrega en fundaciones aliadas.</p>
      </div>

      <button onclick="window.navigate('publicar')" class="self-start sm:self-auto px-5 py-2.5 rounded-xl bg-[#00261e] hover:bg-[#123d32] text-white text-sm font-semibold flex items-center gap-2 shadow-md transition-all">
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        <span>Publicar Nuevo Excedente</span>
      </button>
    </div>

    <!-- Mini stats bar -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div class="bg-white p-4 rounded-xl border border-[#e8e9e2] shadow-sm">
        <span class="text-xs text-[#717975] uppercase font-bold">Total Lotes</span>
        <p class="text-2xl font-extrabold text-[#00261e] mt-1">${excedentes.length}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-[#e8e9e2] shadow-sm">
        <span class="text-xs text-amber-700 uppercase font-bold">En Ruta</span>
        <p class="text-2xl font-extrabold text-amber-600 mt-1">${enRuta}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-[#e8e9e2] shadow-sm">
        <span class="text-xs text-emerald-700 uppercase font-bold">Asignados</span>
        <p class="text-2xl font-extrabold text-emerald-600 mt-1">${asignados}</p>
      </div>
      <div class="bg-white p-4 rounded-xl border border-[#e8e9e2] shadow-sm">
        <span class="text-xs text-[#546500] uppercase font-bold">Entregados</span>
        <p class="text-2xl font-extrabold text-[#546500] mt-1">${entregados}</p>
      </div>
    </div>

    <!-- Filtros y Tabla -->
    <div class="bg-white rounded-2xl shadow-[0_2px_16px_rgba(18,61,50,0.03)] border border-[#e8e9e2] overflow-hidden flex flex-col">
      <!-- Toolbar de Filtros -->
      <div class="p-4 bg-white border-b border-[#eeeee7] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
          <button onclick="window.filterExcedentes('todos')" class="filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00261e] text-white" id="filter-todos">Todos (${excedentes.length})</button>
          <button onclick="window.filterExcedentes('En Ruta')" class="filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold text-[#414845] hover:bg-[#eeeee7]" id="filter-en-ruta">En Ruta (${enRuta})</button>
          <button onclick="window.filterExcedentes('Asignado')" class="filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold text-[#414845] hover:bg-[#eeeee7]" id="filter-asignado">Asignados (${asignados})</button>
          <button onclick="window.filterExcedentes('Entregado')" class="filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold text-[#414845] hover:bg-[#eeeee7]" id="filter-entregado">Entregados (${entregados})</button>
        </div>

        <div class="relative w-full sm:w-64">
          <span class="material-symbols-outlined absolute left-3 top-2 text-[#717975] text-[18px]">search</span>
          <input type="text" id="search-excedentes" oninput="window.searchExcedentesHandler(this.value)" placeholder="Buscar alimento..." class="w-full pl-9 pr-3 py-1.5 text-xs bg-[#f4f4ed] rounded-lg border border-[#e3e3dc] focus:outline-none focus:border-[#123d32]" />
        </div>
      </div>

      <!-- Listado de Tarjetas / Filas -->
      <div class="divide-y divide-[#eeeee7]" id="excedentes-list-container">
        ${renderExcedentesRows(excedentes)}
      </div>
    </div>
  </div>
  `;
}

function renderExcedentesRows(items) {
  if (items.length === 0) {
    return `
    <div class="p-8 text-center text-[#717975] flex flex-col items-center gap-2">
      <span class="material-symbols-outlined text-[36px]">inventory_2</span>
      <p class="text-sm font-semibold">No se encontraron lotes para este filtro.</p>
    </div>
    `;
  }

  return items.map(item => {
    let badge = 'bg-gray-100 text-gray-700';
    if (item.estado === 'En Ruta') badge = 'bg-amber-50 text-amber-800 border border-amber-200';
    else if (item.estado === 'Asignado') badge = 'bg-emerald-50 text-emerald-800 border border-emerald-200';
    else if (item.estado === 'Entregado') badge = 'bg-[#d5ee76]/50 text-[#171e00] border border-[#b9d15d]';

    return `
    <div class="p-4 sm:p-5 hover:bg-[#fafaf3] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-start gap-3.5 min-w-0">
        <div class="w-10 h-10 rounded-xl bg-[#eeeee7] flex items-center justify-center text-[#123d32] shrink-0 font-bold">
          <span class="material-symbols-outlined text-[20px]">nutrition</span>
        </div>
        <div class="flex flex-col min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-bold text-sm text-[#00261e]">${item.nombre}</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#eeeee7] text-[#414845] font-semibold">${item.id}</span>
          </div>
          <div class="flex items-center gap-3 text-xs text-[#717975] mt-1 flex-wrap">
            <span>${item.categoria}</span>
            <span>·</span>
            <span>${item.temperatura}</span>
            <span>·</span>
            <span>Destino: <strong class="text-[#1a1c18]">${item.organizacionDestino || 'Banco de Alimentos'}</strong></span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0">
        <div class="text-left sm:text-right">
          <span class="text-base font-extrabold text-[#00261e] block">${item.cantidadKg} kg</span>
          <span class="text-[11px] text-[#717975]">${item.fechaPublicacion || 'Hoy'}</span>
        </div>

        <span class="px-3 py-1 rounded-full text-xs font-semibold ${badge}">
          ${item.estado}
        </span>

        <button onclick="window.navigate('detalle-donacion')" class="p-2 rounded-lg hover:bg-[#eeeee7] text-[#123d32] transition-colors" title="Ver detalles y trazabilidad">
          <span class="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
    `;
  }).join('');
}

window.filterExcedentes = function(status) {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(t => t.className = "filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold text-[#414845] hover:bg-[#eeeee7]");

  const targetId = status === 'todos' ? 'filter-todos' :
                   status === 'En Ruta' ? 'filter-en-ruta' :
                   status === 'Asignado' ? 'filter-asignado' : 'filter-entregado';
  const target = document.getElementById(targetId);
  if (target) target.className = "filter-tab px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#00261e] text-white";

  const all = repository.getExcedentes();
  const filtered = status === 'todos' ? all : all.filter(e => e.estado === status);
  const container = document.getElementById('excedentes-list-container');
  if (container) container.innerHTML = renderExcedentesRows(filtered);
};

window.searchExcedentesHandler = function(query) {
  const all = repository.getExcedentes();
  const filtered = all.filter(e => 
    e.nombre.toLowerCase().includes(query.toLowerCase()) || 
    e.categoria.toLowerCase().includes(query.toLowerCase()) ||
    e.id.toLowerCase().includes(query.toLowerCase())
  );
  const container = document.getElementById('excedentes-list-container');
  if (container) container.innerHTML = renderExcedentesRows(filtered);
};
