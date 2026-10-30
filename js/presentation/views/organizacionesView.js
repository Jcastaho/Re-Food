/**
 * Presentation Layer - Organizaciones Receptoras View
 */

import { repository } from '../../data/repository.js';

export function renderOrganizaciones() {
  const orgs = repository.getOrganizaciones();

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Red de Apoyo</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Organizaciones Receptoras</h1>
        <p class="text-sm text-[#414845] mt-1">Entidades verificadas y comedores comunitarios autorizados para recepción de alimentos en el Valle de Aburrá.</p>
      </div>

      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#e8e9e2] text-xs font-semibold text-[#123d32] shadow-sm">
        <span class="material-symbols-outlined text-[18px]">verified</span>
        <span>100% Auditadas por Re-Food</span>
      </div>
    </div>

    <!-- Grid de Organizaciones -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${orgs.map(org => `
      <div class="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(18,61,50,0.03)] border border-[#e8e9e2] flex flex-col justify-between gap-5 hover:shadow-md transition-all group">
        <div class="flex flex-col gap-3">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-[#d5ee76]/40 text-[#123d32] flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-[26px]">corporate_fare</span>
              </div>
              <div>
                <h3 class="font-bold text-base text-[#00261e] group-hover:text-[#123d32] transition-colors">${org.nombre}</h3>
                <span class="text-xs text-[#546500] font-semibold">${org.tipo}</span>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#bfecdc]/50 text-[#002019]">
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

        <div class="flex items-center justify-between pt-3 border-t border-[#f4f4ed]">
          <span class="text-xs text-[#717975] flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px]">location_on</span>
            ${org.direccion}
          </span>
          <button onclick="window.navigate('banco-alimentos')" class="px-3.5 py-1.5 rounded-lg bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-semibold flex items-center gap-1 transition-all">
            <span>Ver Ficha Técnica</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
      `).join('')}
    </div>
  </div>
  `;
}
