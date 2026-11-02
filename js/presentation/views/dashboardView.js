/**
 * Presentation Layer - Dashboard View
 * Vista del Panel de Establecimiento Donante
 */

import { repository } from '../../data/repository.js';
import { ImpactoUseCase } from '../../core/useCases.js';

export function renderDashboard() {
  const metricas = repository.getMetricasResumen();
  const excedentes = repository.getExcedentes();
  const impacto = ImpactoUseCase.calcularMetricas(metricas.kgRecuperados);

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-space-lg">
    <!-- ENCABEZADO PRINCIPAL -->
    <header class="flex flex-col md:flex-row md:items-start justify-between gap-space-md pt-2">
      <div class="flex flex-col max-w-3xl">
        <div class="flex items-center gap-2 mb-2">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#d5ee76]"></span>
          <span class="font-semibold text-xs uppercase tracking-[0.14em] text-[#717975]">
            Red de Rescate Alimentario
          </span>
          <span class="text-[#c0c8c4] text-xs">·</span>
          <span class="font-semibold text-xs uppercase tracking-wider text-[#546500]">
            Valle de Aburrá
          </span>
        </div>
        <h1 class="font-extrabold text-3xl sm:text-4xl text-[#00261e] tracking-tight">
          Lo que sobra aquí, <span class="text-[#123d32] inline-block underline decoration-[#d5ee76] decoration-4">alimenta allá.</span>
        </h1>
        <p class="text-[#414845] mt-2 text-base leading-relaxed">
          Convierte tus excedentes de hoy en oportunidades para alguien más. Tu próxima donación puede marcar una gran diferencia en las comunidades de Medellín.
        </p>
      </div>

      <!-- Chip de Fecha y Selector Rápido -->
      <div class="flex items-center gap-2 self-start shrink-0 bg-white px-4 py-2.5 rounded-xl shadow-[0_2px_10px_rgba(18,61,50,0.06)] border border-[#e3e3dc]">
        <span class="material-symbols-outlined text-[19px] text-[#123d32]">calendar_today</span>
        <span class="text-xs font-semibold text-[#1a1c18]">18 de octubre de 2026</span>
        <span class="w-2 h-2 rounded-full bg-[#a7d649] ml-1"></span>
      </div>
    </header>

    <!-- TRES INDICADORES / MÉTRICAS HORIZONTALES -->
    <section aria-label="Indicadores de impacto rápido" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Métrica 1 -->
      <div class="bg-white rounded-2xl p-5 flex items-center justify-between shadow-[0_2px_12px_rgba(18,61,50,0.03)] border border-[#e8e9e2] hover:shadow-md transition-all group">
        <div class="flex flex-col gap-1 min-w-0">
          <span class="text-xs font-bold uppercase tracking-wider text-[#717975]">
            Excedentes Publicados
          </span>
          <div class="flex items-baseline gap-2 mt-0.5">
            <span class="text-4xl font-extrabold text-[#00261e] leading-none group-hover:text-[#123d32] transition-colors">${metricas.totalPublicados}</span>
            <span class="text-xs font-semibold text-[#546500] bg-[#d5ee76]/40 px-2.5 py-0.5 rounded-full">+1 hoy</span>
          </div>
          <span class="text-xs text-[#717975] truncate mt-0.5">
            Registros en la plataforma
          </span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#d5ee76]/30 flex items-center justify-center shrink-0 text-[#123d32]">
          <span class="material-symbols-outlined text-[24px]">inventory_2</span>
        </div>
      </div>

      <!-- Métrica 2 -->
      <div class="bg-white rounded-2xl p-5 flex items-center justify-between shadow-[0_2px_12px_rgba(18,61,50,0.03)] border border-[#e8e9e2] hover:shadow-md transition-all group">
        <div class="flex flex-col gap-1 min-w-0">
          <span class="text-xs font-bold uppercase tracking-wider text-[#717975]">
            Alimentos Recuperados
          </span>
          <div class="flex items-baseline gap-1.5 mt-0.5">
            <span class="text-4xl font-extrabold text-[#00261e] leading-none group-hover:text-[#123d32] transition-colors">${metricas.kgRecuperados}</span>
            <span class="text-lg text-[#414845] font-bold">kg</span>
          </div>
          <span class="text-xs text-[#717975] truncate mt-0.5">
            Kilogramos registrados como entregados
          </span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#d5ee76]/30 flex items-center justify-center shrink-0 text-[#123d32]">
          <span class="material-symbols-outlined text-[24px]">scale</span>
        </div>
      </div>

      <!-- Métrica 3 -->
      <div class="bg-white rounded-2xl p-5 flex items-center justify-between shadow-[0_2px_12px_rgba(18,61,50,0.03)] border border-[#e8e9e2] hover:shadow-md transition-all group">
        <div class="flex flex-col gap-1 min-w-0">
          <span class="text-xs font-bold uppercase tracking-wider text-[#717975]">
            Donaciones Entregadas
          </span>
          <div class="flex items-baseline gap-2 mt-0.5">
            <span class="text-4xl font-extrabold text-[#00261e] leading-none group-hover:text-[#123d32] transition-colors">${metricas.entregadas}</span>
            <span class="text-xs font-semibold text-[#123d32] bg-[#bfecdc]/60 px-2 py-0.5 rounded-full">100% efectividad</span>
          </div>
          <span class="text-xs text-[#717975] truncate mt-0.5">
            Excedentes que llegaron a su destino
          </span>
        </div>
        <div class="w-12 h-12 rounded-xl bg-[#d5ee76]/30 flex items-center justify-center shrink-0 text-[#123d32]">
          <span class="material-symbols-outlined text-[24px]">local_shipping</span>
        </div>
      </div>
    </section>

    <!-- DISPOSICIÓN PRINCIPAL A DOS COLUMNAS -->
    <section class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Columna Izquierda: TABLA DE ACTIVIDAD RECIENTE -->
      <div class="lg:col-span-8 flex flex-col bg-white rounded-2xl shadow-[0_2px_16px_rgba(18,61,50,0.03)] border border-[#e8e9e2] overflow-hidden">
        <!-- Header de la tarjeta -->
        <div class="px-6 py-4 bg-white flex items-center justify-between border-b border-[#eeeee7]">
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#123d32]"></span>
              <span class="text-xs uppercase tracking-widest text-[#717975] font-bold">
                Actividad Reciente
              </span>
            </div>
            <h2 class="text-lg font-bold text-[#00261e] mt-0.5">
              Sigue el recorrido de tus excedentes
            </h2>
          </div>
          <button onclick="window.navigate('mis-excedentes')" class="group flex items-center gap-1 text-sm text-[#123d32] hover:text-[#546500] font-semibold transition-colors py-1 px-3 rounded-lg hover:bg-[#eeeee7]" type="button">
            <span>Ver todos</span>
            <span class="transition-transform group-hover:translate-x-1 font-bold">→</span>
          </button>
        </div>

        <!-- Tabla Responsive -->
        <div class="w-full overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-[#f4f4ed] text-[#717975] text-xs uppercase tracking-wider">
              <tr>
                <th class="py-3 px-6 font-semibold" scope="col">Alimento / Donante</th>
                <th class="py-3 px-4 font-semibold hidden sm:table-cell" scope="col">Categoría</th>
                <th class="py-3 px-4 font-semibold hidden md:table-cell" scope="col">Ubicación</th>
                <th class="py-3 px-4 font-semibold text-center sm:text-left" scope="col">Estado</th>
                <th class="py-3 px-6 font-semibold text-right" scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#eeeee7]">
              ${excedentes.slice(0, 5).map((item, idx) => {
                let badgeClass = "bg-gray-100 text-gray-700";
                let dotClass = "bg-gray-400";
                if (item.estado === 'En Ruta') {
                  badgeClass = "bg-amber-50 text-amber-800 border border-amber-200";
                  dotClass = "bg-amber-500 animate-pulse";
                } else if (item.estado === 'Asignado') {
                  badgeClass = "bg-emerald-50 text-emerald-800 border border-emerald-200";
                  dotClass = "bg-emerald-600";
                } else if (item.estado === 'Entregado') {
                  badgeClass = "bg-[#d5ee76]/50 text-[#171e00] border border-[#b9d15d]";
                  dotClass = "bg-[#546500]";
                } else {
                  badgeClass = "bg-blue-50 text-blue-800 border border-blue-200";
                  dotClass = "bg-blue-500";
                }

                let icon = 'restaurant';
                if (item.categoria.includes('Pan')) icon = 'bakery_dining';
                else if (item.categoria.includes('Fruta') || item.categoria.includes('Verdura')) icon = 'nutrition';
                else if (item.categoria.includes('Cereal')) icon = 'rice_bowl';
                else if (item.categoria.includes('Prote')) icon = 'dinner_dining';

                return `
                <tr class="hover:bg-[#fafaf3] transition-colors group cursor-pointer" onclick="window.navigate('detalle-donacion?id=${item.id}')">
                  <td class="py-3.5 px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl overflow-hidden bg-[#eeeee7] flex items-center justify-center text-[#00261e] shrink-0 border border-[#e8e9e2] shadow-xs">
                        ${item.imagenUrl 
                          ? `<img src="${item.imagenUrl}" alt="${item.nombre}" class="w-full h-full object-cover" />` 
                          : `<span class="material-symbols-outlined text-[19px]">${icon}</span>`
                        }
                      </div>
                      <div class="flex flex-col min-w-0">
                        <span class="font-semibold text-sm text-[#1a1c18] truncate group-hover:text-[#123d32] transition-colors">
                          ${item.nombre}
                        </span>
                        <span class="text-xs text-[#717975] truncate">
                          ${item.establecimiento} · <span class="font-mono">${item.id}</span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="py-3.5 px-4 hidden sm:table-cell">
                    <span class="text-xs text-[#414845] bg-[#eeeee7] px-2.5 py-1 rounded-md font-medium">
                      ${item.categoria}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 hidden md:table-cell">
                    <div class="flex items-center gap-1 text-[#414845] text-xs">
                      <span class="material-symbols-outlined text-[15px] text-[#717975]">location_on</span>
                      <span>${item.ubicacion}</span>
                    </div>
                  </td>
                  <td class="py-3.5 px-4 text-center sm:text-left">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeClass}">
                      <span class="w-1.5 h-1.5 rounded-full ${dotClass}"></span>
                      ${item.estado}
                    </span>
                  </td>
                  <td class="py-3.5 px-6 text-right">
                    <span class="text-sm text-[#00261e] font-bold tracking-tight">${item.cantidadKg} kg</span>
                  </td>
                </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Barra inferior de estado -->
        <div class="px-6 py-3 bg-[#f4f4ed] flex flex-col sm:flex-row items-center justify-between text-xs text-[#717975] gap-2 border-t border-[#eeeee7]">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
            <span>Canal logístico Aburrá Sur y Medellín activo</span>
          </div>
          <span>Mostrando ${Math.min(5, excedentes.length)} de ${excedentes.length} registros</span>
        </div>
      </div>

      <!-- Columna Derecha: DOS MÓDULOS VERTICALES -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <!-- Módulo 1: Banner de Publicación Rápida -->
        <div class="relative overflow-hidden bg-[#d5ee76] text-[#171e00] rounded-2xl p-6 shadow-[0_4px_20px_rgba(213,238,118,0.3)] flex flex-col justify-between">
          <div class="flex flex-col gap-2 relative z-10">
            <div class="flex items-center gap-1.5 text-[#123d32]">
              <span class="material-symbols-outlined text-[18px]">eco</span>
              <span class="text-xs font-bold uppercase tracking-[0.14em]">
                Una segunda oportunidad
              </span>
            </div>
            <h3 class="text-xl font-bold text-[#00261e] leading-tight mt-1">
              Tu generosidad alimenta el cambio.
            </h3>
            <p class="text-sm text-[#123d32]/90 mt-1 leading-snug">
              Publica alimentos que aún pueden aprovecharse y conecta tus excedentes con organizaciones cercanas en minutos.
            </p>
          </div>
          <div class="mt-6 relative z-10">
            <button onclick="window.navigate('publicar')" class="w-full h-12 bg-[#123d32] hover:bg-[#0c2821] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] transition-all" type="button">
              <span>Publicar excedente ahora</span>
              <span class="font-bold text-base">↗</span>
            </button>
          </div>
        </div>

        <!-- Módulo 2: Tu Impacto -->
        <div class="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(18,61,50,0.03)] border border-[#e8e9e2] flex flex-col items-center text-center">
          <div class="w-full flex items-center justify-between pb-2 border-b border-[#f4f4ed]">
            <span class="text-xs uppercase tracking-widest text-[#717975] font-bold">
              Tu Impacto Ambiental
            </span>
            <span class="material-symbols-outlined text-[#546500] text-[20px]">verified</span>
          </div>

          <!-- Composición central de Anillo de Progreso SVG -->
          <div class="relative w-40 h-40 my-4 flex items-center justify-center">
            <svg class="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
              <circle class="text-[#eeeee7]" cx="60" cy="60" fill="transparent" r="48" stroke="currentColor" stroke-width="9"></circle>
              <circle class="text-[#123d32]" cx="60" cy="60" fill="transparent" r="48" stroke="currentColor" stroke-dasharray="301.59" stroke-dashoffset="${301.59 - (301.59 * (impacto.porcentajeMeta / 100))}" stroke-linecap="round" stroke-width="9"></circle>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div class="w-7 h-7 rounded-full bg-[#d5ee76]/60 flex items-center justify-center text-[#123d32] mb-0.5">
                <span class="material-symbols-outlined text-[16px]">energy_savings_leaf</span>
              </div>
              <span class="text-3xl text-[#00261e] font-extrabold leading-none">${impacto.totalKg}</span>
              <span class="text-[10px] uppercase tracking-widest text-[#717975] font-bold">kg donados</span>
            </div>
          </div>

          <p class="text-sm text-[#1a1c18] font-medium max-w-[210px] leading-snug">
            de alimentos entregados a fundaciones en el Valle de Aburrá
          </p>

          <!-- Badges de equivalencia -->
          <div class="w-full grid grid-cols-2 gap-2 mt-4 pt-3 bg-[#f4f4ed] p-2 rounded-xl">
            <div class="flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-[#eeeee7]">
              <span class="text-base text-[#00261e] font-bold">~${impacto.raciones}</span>
              <span class="text-[11px] text-[#717975]">Raciones servidas</span>
            </div>
            <div class="flex flex-col items-center justify-center p-2 rounded-lg bg-white border border-[#eeeee7]">
              <span class="text-base text-[#546500] font-bold">${impacto.co2EvitadoKg} kg</span>
              <span class="text-[11px] text-[#717975]">CO₂ evitado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  `;
}
