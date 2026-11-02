/**
 * Presentation Layer - Organizaciones Receptoras View
 * Catálogo de fundaciones verificadas con filtro por municipio y asignación interactiva
 */

import { repository } from '../../data/repository.js';

let activeMunicipio = 'todos';
let selectedOrgForDonation = null;

export function renderOrganizaciones() {
  const orgs = repository.getOrganizaciones();
  const municipios = ['todos', ...new Set(orgs.map(o => o.municipio))];

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Red de Apoyo Social</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Organizaciones Receptoras</h1>
        <p class="text-sm text-[#414845] mt-1">Conecta los excedentes de <strong>Provenza Bistro & Café</strong> con comedores y bancos auditados del Valle de Aburrá.</p>
      </div>

      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#e8e9e2] text-xs font-semibold text-[#123d32] shadow-sm">
        <span class="material-symbols-outlined text-[18px]">verified</span>
        <span>100% Auditadas por Re-Food</span>
      </div>
    </div>

    <!-- Barra de Filtros por Municipio -->
    <div class="flex items-center gap-2 flex-wrap">
      <span class="text-xs font-bold text-[#717975] uppercase tracking-wider mr-1">Filtrar por municipio:</span>
      ${municipios.map(m => `
        <button onclick="window.filterOrgMunicipio('${m}')" class="org-filter-btn px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${m === activeMunicipio ? 'bg-[#00261e] text-white shadow-sm' : 'bg-white text-[#414845] hover:bg-[#eeeee7] border border-[#e8e9e2]'}" id="org-tab-${m}">
          ${m === 'todos' ? 'Todos los municipios' : m}
        </button>
      `).join('')}
    </div>

    <!-- Grid de Organizaciones -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" id="orgs-grid-container">
      ${renderOrgsGrid(orgs)}
    </div>
  </div>

  <!-- Modal de Asignación Directa de Lotes -->
  <div id="donar-org-modal" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e8e9e2] flex flex-col gap-4 transform transition-all">
      <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-3">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-[#123d32] flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">volunteer_activism</span>
          </div>
          <div>
            <h3 class="text-base font-bold text-[#00261e]" id="modal-org-name">Destinar Alimento</h3>
            <span class="text-xs text-[#546500] font-semibold" id="modal-org-sub">Sede Receptora</span>
          </div>
        </div>
        <button onclick="window.closeDonarOrgModal()" class="p-1 rounded-lg hover:bg-black/5 text-[#717975]">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-xs text-[#414845]">
          Selecciona cuál de tus lotes disponibles en <strong>Provenza Bistro & Café</strong> deseas vincular a esta fundación:
        </p>

        <!-- Listado de lotes asignables -->
        <div id="modal-lotes-disponibles" class="max-h-60 overflow-y-auto divide-y divide-[#eeeee7] border border-[#e8e9e2] rounded-xl my-2">
          <!-- Renderizado dinámicamente -->
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-[#f4f4ed]">
        <button type="button" onclick="window.crearNuevaParaOrg()" class="text-xs font-semibold text-[#123d32] hover:underline flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">add_circle</span>
          <span>Registrar nueva comida para esta sede</span>
        </button>
        <button type="button" onclick="window.closeDonarOrgModal()" class="px-4 py-2 rounded-xl text-xs font-semibold text-[#414845] hover:bg-[#eeeee7]">
          Cerrar
        </button>
      </div>
    </div>
  </div>
  `;
}

function renderOrgsGrid(items) {
  const filtered = activeMunicipio === 'todos' ? items : items.filter(o => o.municipio === activeMunicipio);

  if (filtered.length === 0) {
    return `
    <div class="col-span-full p-8 text-center bg-white rounded-2xl border border-[#e8e9e2] text-[#717975]">
      <p class="text-sm font-semibold">No se encontraron fundaciones en este municipio.</p>
    </div>
    `;
  }

  return filtered.map(org => `
  <div class="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(18,61,50,0.03)] border border-[#e8e9e2] flex flex-col justify-between gap-5 hover:shadow-md transition-all group">
    <div class="flex flex-col gap-3">
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-[#d5ee76]/40 text-[#123d32] flex items-center justify-center font-bold shrink-0">
            <span class="material-symbols-outlined text-[26px]">corporate_fare</span>
          </div>
          <div>
            <h3 class="font-bold text-base text-[#00261e] group-hover:text-[#123d32] transition-colors">${org.nombre}</h3>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="text-xs text-[#546500] font-semibold">${org.tipo}</span>
              <span class="text-xs text-[#717975]">· ${org.municipio}</span>
            </div>
          </div>
        </div>
        <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#bfecdc]/50 text-[#002019] shrink-0">
          ${org.estadoVerificacion}
        </span>
      </div>

      <p class="text-xs text-[#414845] leading-relaxed">${org.descripcion}</p>

      <div class="grid grid-cols-2 gap-2 text-xs bg-[#f4f4ed] p-3 rounded-xl">
        <div>
          <span class="text-[#717975] block text-[10px] uppercase font-bold">Capacidad Diaria</span>
          <span class="font-bold text-[#1a1c18]">${org.capacidadKgDia} kg/día</span>
        </div>
        <div>
          <span class="text-[#717975] block text-[10px] uppercase font-bold">Beneficiarios</span>
          <span class="font-bold text-[#1a1c18]">${org.beneficiarios} personas</span>
        </div>
        <div>
          <span class="text-[#717975] block text-[10px] uppercase font-bold">Distancia</span>
          <span class="font-bold text-[#546500]">${org.distanciaKm} km (aprox 15 min)</span>
        </div>
        <div>
          <span class="text-[#717975] block text-[10px] uppercase font-bold">Certificación</span>
          <span class="font-bold text-[#1a1c18]">${org.certificacion}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#f4f4ed]">
      <span class="text-xs text-[#717975] flex items-center gap-1 truncate max-w-xs">
        <span class="material-symbols-outlined text-[15px] shrink-0 text-[#546500]">location_on</span>
        <span class="truncate">${org.direccion}</span>
      </span>

      <div class="flex items-center gap-2 shrink-0">
        <button onclick="window.navigate('banco-alimentos')" class="px-3 py-1.5 rounded-lg border border-[#c0c8c4] hover:bg-[#eeeee7] text-[#1a1c18] text-xs font-semibold transition-all">
          Ficha
        </button>
        <button onclick="window.openDonarOrgModal('${org.id}', '${org.nombre.replace(/'/g, "\\'")}', '${org.municipio}')" class="px-3.5 py-1.5 rounded-lg bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all">
          <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">volunteer_activism</span>
          <span>Donar aquí</span>
        </button>
      </div>
    </div>
  </div>
  `).join('');
}

window.filterOrgMunicipio = function(m) {
  activeMunicipio = m;
  const orgs = repository.getOrganizaciones();
  const municipios = ['todos', ...new Set(orgs.map(o => o.municipio))];

  municipios.forEach(mun => {
    const tab = document.getElementById(`org-tab-${mun}`);
    if (tab) {
      if (mun === m) {
        tab.className = "org-filter-btn px-3 py-1.5 rounded-xl text-xs font-semibold transition-all bg-[#00261e] text-white shadow-sm";
      } else {
        tab.className = "org-filter-btn px-3 py-1.5 rounded-xl text-xs font-semibold transition-all bg-white text-[#414845] hover:bg-[#eeeee7] border border-[#e8e9e2]";
      }
    }
  });

  const grid = document.getElementById('orgs-grid-container');
  if (grid) grid.innerHTML = renderOrgsGrid(orgs);
};

window.openDonarOrgModal = function(orgId, orgNombre, orgMunicipio) {
  selectedOrgForDonation = { id: orgId, nombre: orgNombre, municipio: orgMunicipio };
  
  const modal = document.getElementById('donar-org-modal');
  const orgNameEl = document.getElementById('modal-org-name');
  const orgSubEl = document.getElementById('modal-org-sub');
  const lotesContainer = document.getElementById('modal-lotes-disponibles');

  if (orgNameEl) orgNameEl.textContent = orgNombre;
  if (orgSubEl) orgSubEl.textContent = `Sede receptora verificada en ${orgMunicipio}`;

  // Buscar lotes de Provenza Bistro & Café que estén publicados o disponibles
  const misLotes = repository.getExcedentes().filter(e => 
    e.establecimiento === 'Provenza Bistro & Café' && (e.estado === 'Publicado' || e.estado === 'Asignado')
  );

  if (lotesContainer) {
    if (misLotes.length === 0) {
      lotesContainer.innerHTML = `
      <div class="p-4 text-center text-xs text-[#717975] flex flex-col items-center gap-2">
        <span class="material-symbols-outlined text-[24px]">info</span>
        <span>No tienes lotes en espera en este momento en Provenza Bistro.</span>
        <button type="button" onclick="window.crearNuevaParaOrg()" class="mt-1 px-3 py-1.5 bg-[#00261e] text-white rounded-lg text-xs font-semibold">
          Publicar comida para esta sede
        </button>
      </div>
      `;
    } else {
      lotesContainer.innerHTML = misLotes.map(lote => `
      <div class="p-3 hover:bg-[#fafaf3] flex items-center justify-between gap-3">
        <div class="flex items-center gap-2.5 min-w-0">
          <img src="${lote.imagenUrl}" class="w-10 h-10 rounded-lg object-cover border border-[#e8e9e2] shrink-0" />
          <div class="flex flex-col min-w-0">
            <span class="text-xs font-bold text-[#00261e] truncate">${lote.nombre}</span>
            <span class="text-[11px] text-[#717975]">${lote.cantidadKg} kg · ${lote.categoria}</span>
          </div>
        </div>
        <button type="button" onclick="window.asignarLoteAOrg('${lote.id}')" class="px-3 py-1 rounded-lg bg-[#546500] hover:bg-[#687d00] text-white text-xs font-semibold shrink-0 transition-all shadow-xs">
          Asignar
        </button>
      </div>
      `).join('');
    }
  }

  if (modal) modal.classList.remove('hidden');
};

window.closeDonarOrgModal = function() {
  selectedOrgForDonation = null;
  const modal = document.getElementById('donar-org-modal');
  if (modal) modal.classList.add('hidden');
};

window.asignarLoteAOrg = function(loteId) {
  if (!selectedOrgForDonation) return;

  try {
    repository.updateExcedente(loteId, {
      organizacionDestino: selectedOrgForDonation.nombre,
      estado: 'Asignado'
    });

    window.closeDonarOrgModal();
    alert(`¡Excelente! El lote ${loteId} ha sido asignado a ${selectedOrgForDonation.nombre}. Se ha notificado a la red logística.`);
  } catch (err) {
    alert('Error al asignar lote: ' + err.message);
  }
};

window.crearNuevaParaOrg = function() {
  const orgName = selectedOrgForDonation ? selectedOrgForDonation.nombre : '';
  window.closeDonarOrgModal();
  window.navigate(`publicar?org=${encodeURIComponent(orgName)}`);
};
