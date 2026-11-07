/**
 * Presentation Layer - Extra Views
 * Pantallas completas adaptadas fielmente desde los diseños de Stitch
 */

import { repository } from '../../data/repository.js';
import { ImpactoUseCase } from '../../core/useCases.js';

// 1. IMPACTO COMPLETO CONECTADO A MÉTRICAS REALES
export function renderImpacto() {
  const metricas = repository.getMetricasResumen();
  const orgs = repository.getOrganizaciones();
  const excedentes = repository.getExcedentes();
  const imp = ImpactoUseCase.calcularMetricas(metricas.kgRecuperados);

  const familiasEstimadas = Math.max(12, Math.round(imp.raciones / 3));
  const aguaFormateada = imp.aguaAhorradaLitros.toLocaleString('es-CO');

  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <!-- Sub-header Breadcrumb & Canvas Controls -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
      <div class="flex flex-col gap-1 max-w-2xl">
        <div class="inline-flex items-center gap-2 self-start">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-wider text-[#546500]">
            Impacto Colectivo · Valle de Aburrá · Datos en Tiempo Real
          </span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">
          Cada kilo cuenta
        </h1>
        <p class="text-base text-[#414845] leading-relaxed">
          Tu aporte ayuda a aprovechar mejor los alimentos y a fortalecer la red de apoyo de nuestra comunidad gastronómica en Medellín.
        </p>
      </div>

      <!-- Temporal Controls & Export Action -->
      <div class="flex flex-wrap items-center gap-2 shrink-0">
        <div class="flex items-center gap-2 bg-white border border-[#e8e9e2] px-3.5 py-2 rounded-xl text-[#1a1c18] text-xs font-semibold shadow-xs">
          <span class="material-symbols-outlined text-[18px] text-[#717975]">calendar_today</span>
          <span>Acumulado Red Activa 2026</span>
        </div>
        <button onclick="window.abrirModalCertificado()" class="flex items-center gap-2 bg-[#123d32] text-white px-4 py-2.5 rounded-xl hover:bg-[#0c2821] transition-all shadow-sm text-xs font-semibold cursor-pointer">
          <span class="material-symbols-outlined text-[18px] text-[#d5ee76]">file_download</span>
          <span>Reporte de Impacto (PDF)</span>
        </button>
      </div>
    </div>

    <!-- Section 1: 4 Main KPI Cards Conectadas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <span class="text-xs text-[#717975] uppercase tracking-wider font-bold">Kilogramos recuperados</span>
          <div class="w-10 h-10 rounded-xl bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[22px]">scale</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-baseline gap-1.5">
            <span class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">${metricas.kgRecuperados}</span>
            <span class="text-base text-[#00261e] font-semibold">kg</span>
          </div>
          <div class="flex items-center gap-1 mt-1 text-[#546500] text-xs font-semibold">
            <span class="material-symbols-outlined text-[16px]">trending_up</span>
            <span>En ruta y entregados · Pesaje certificado</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <span class="text-xs text-[#717975] uppercase tracking-wider font-bold">Donaciones entregadas</span>
          <div class="w-10 h-10 rounded-xl bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[22px]">verified</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-baseline gap-1.5">
            <span class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">${metricas.entregadas}</span>
            <span class="text-base text-[#414845] font-semibold">de ${metricas.totalPublicados} lotes</span>
          </div>
          <div class="flex items-center gap-1 mt-1 text-[#414845] text-xs">
            <span class="material-symbols-outlined text-[16px] text-[#546500]">task_alt</span>
            <span>100% trazabilidad confirmada con actas DIAN</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow cursor-pointer" onclick="window.navigate('organizaciones')">
        <div class="flex items-start justify-between">
          <span class="text-xs text-[#717975] uppercase tracking-wider font-bold">Organizaciones receptoras</span>
          <div class="w-10 h-10 rounded-xl bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[22px]">hub</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-baseline gap-1.5">
            <span class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">${orgs.length}</span>
            <span class="text-base text-[#414845] font-semibold">sedes activas</span>
          </div>
          <div class="flex items-center gap-1 mt-1 text-[#414845] text-xs">
            <span class="material-symbols-outlined text-[16px] text-[#717975]">location_on</span>
            <span>En Medellín, Envigado y Bello</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <span class="text-xs text-[#717975] uppercase tracking-wider font-bold">Tasa de aprovechamiento</span>
          <div class="w-10 h-10 rounded-xl bg-[#d5ee76]/40 flex items-center justify-center text-[#546500]">
            <span class="material-symbols-outlined text-[22px]">recycling</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-baseline gap-1.5">
            <span class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">${metricas.porcentajeEfectividad}%</span>
            <span class="text-base text-[#546500] font-bold">entregados</span>
          </div>
          <div class="flex items-center gap-1 mt-1 text-[#414845] text-xs">
            <span class="material-symbols-outlined text-[16px] text-[#717975]">info</span>
            <span>Cero desperdicio en lotes despachados</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Desglose de Equivalencias Ambientales y Nutricionales -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-3">
          <h2 class="text-base font-bold text-[#00261e]">Equivalencias Sociales y Comunitarias</h2>
          <span class="text-xs text-[#546500] font-bold uppercase">Medellín Solidaria</span>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3.5 bg-[#f4f4ed] rounded-xl">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#123d32] text-[24px]">soup_kitchen</span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">${imp.raciones} Raciones Servidas</p>
                <p class="text-xs text-[#717975]">Platos balanceados entregados en comedores comunitarios</p>
              </div>
            </div>
            <span class="text-xs font-bold text-[#546500] bg-white px-2.5 py-1 rounded-lg border border-[#e8e9e2]">2.5 raciones / kg</span>
          </div>

          <div class="flex items-center justify-between p-3.5 bg-[#f4f4ed] rounded-xl">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#123d32] text-[24px]">diversity_1</span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">~${familiasEstimadas} Familias Beneficiadas</p>
                <p class="text-xs text-[#717975]">Cobertura en Belén, La Candelaria, Laureles y Santo Domingo</p>
              </div>
            </div>
            <span class="text-xs font-bold text-[#546500] bg-white px-2.5 py-1 rounded-lg border border-[#e8e9e2]">Impacto Directo</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-3">
          <h2 class="text-base font-bold text-[#00261e]">Huella de Carbono y Recursos Evitados</h2>
          <span class="text-xs text-emerald-700 font-bold uppercase">Mitigación Climática</span>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3.5 bg-[#f4f4ed] rounded-xl">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-emerald-700 text-[24px]">co2</span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">${imp.co2EvitadoKg} kg CO₂e Evitados</p>
                <p class="text-xs text-[#717975]">Menor emisión de gas metano en el Relleno La Pradera</p>
              </div>
            </div>
            <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">2.2 kg CO₂ / kg</span>
          </div>

          <div class="flex items-center justify-between p-3.5 bg-[#f4f4ed] rounded-xl">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-blue-700 text-[24px]">water_drop</span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">${aguaFormateada} Litros de Agua Protegidos</p>
                <p class="text-xs text-[#717975]">Huella hídrica de producción agrícola conservada</p>
              </div>
            </div>
            <span class="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">450 L / kg</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Desglose de Lotes que aportan al Impacto -->
    <div class="bg-white rounded-2xl p-6 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
      <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-3">
        <h3 class="text-base font-bold text-[#00261e]">Trazabilidad de Aportes por Lote</h3>
        <span class="text-xs text-[#717975]">${excedentes.length} lotes registrados en el sistema</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-[#f4f4ed] text-[#717975] uppercase">
            <tr>
              <th class="p-3">Lote / Alimento</th>
              <th class="p-3">Restaurante Donante</th>
              <th class="p-3">Fundación Destino</th>
              <th class="p-3 text-center">Peso</th>
              <th class="p-3 text-center">Raciones</th>
              <th class="p-3 text-right">CO₂e Evitado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eeeee7]">
            ${excedentes.map(e => {
              const kg = parseFloat(e.cantidadKg) || 0;
              return `
              <tr class="hover:bg-[#fafaf3] cursor-pointer" onclick="window.navigate('detalle-donacion?id=${e.id}')">
                <td class="p-3 font-bold text-[#00261e]">${e.id} · ${e.nombre}</td>
                <td class="p-3 text-[#414845]">${e.establecimiento}</td>
                <td class="p-3 font-semibold text-[#123d32]">${e.organizacionDestino || 'En asignación'}</td>
                <td class="p-3 text-center font-bold">${kg} kg</td>
                <td class="p-3 text-center text-[#546500] font-semibold">${Math.round(kg * 2.5)}</td>
                <td class="p-3 text-right text-emerald-700 font-bold">${Math.round(kg * 2.2 * 10) / 10} kg</td>
              </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  `;
}

// 2. FICHA DINÁMICA DE ORGANIZACIÓN RECEPTORA
export function renderDetalleBanco(params) {
  const allOrgs = repository.getOrganizaciones();
  const targetOrgId = (params && typeof params.get === 'function') ? params.get('id') : null;
  const org = targetOrgId ? repository.getOrganizacionById(targetOrgId) : allOrgs[0];

  const palabras = org.nombre.split(' ').filter(p => p.length > 2);
  const iniciales = palabras.length >= 2
    ? (palabras[0][0] + palabras[1][0]).toUpperCase()
    : org.nombre.substring(0, 2).toUpperCase();

  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div class="flex items-center gap-2 text-[#414845] text-xs flex-wrap">
        <a class="inline-flex items-center gap-1.5 text-[#00261e] hover:text-[#123d32] font-semibold transition-colors group" href="#organizaciones">
          <span class="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
          <span>Volver a organizaciones</span>
        </a>
        <span class="text-[#c0c8c4]">/</span>
        <span class="text-[#717975] uppercase tracking-wider">Directorio Valle de Aburrá</span>
        <span class="text-[#c0c8c4]">/</span>
        <span class="text-[#546500] font-semibold">${org.nombre}</span>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <select onchange="window.navigate('banco-alimentos?id=' + this.value)" class="bg-white border border-[#c0c8c4] text-xs font-semibold px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#123d32] cursor-pointer shadow-2xs">
          ${allOrgs.map(o => `<option value="${o.id}" ${o.id === org.id ? 'selected' : ''}>Ver sede: ${o.nombre}</option>`).join('')}
        </select>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e8e9e2] text-[#00261e] text-xs font-semibold shadow-xs">
          <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
          ENTIDAD VERIFICADA • DIAN ART. 125
        </span>
      </div>
    </div>

    <section class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e8e9e2] flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative overflow-hidden">
      <div class="flex flex-col sm:flex-row gap-5 items-start min-w-0 z-10">
        <div class="relative shrink-0">
          <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#123d32] text-white flex flex-col items-center justify-center shadow-md relative overflow-hidden">
            <span class="text-3xl font-extrabold tracking-tight text-[#d5ee76]">${iniciales}</span>
            <span class="text-[9px] uppercase tracking-widest text-[#a4d0c0] font-semibold">${org.municipio}</span>
            <div class="absolute bottom-0 inset-x-0 h-1 bg-[#d5ee76]"></div>
          </div>
          <span class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#d5ee76] text-[#171e00] flex items-center justify-center shadow">
            <span class="material-symbols-outlined text-[16px] font-bold">verified</span>
          </span>
        </div>

        <div class="flex flex-col gap-2 min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-[#eeeee7] text-[#414845] text-xs font-semibold">
              ${org.tipo} (ESAL sin ánimo de lucro)
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eeeee7] text-[#414845] text-xs">
              <span class="material-symbols-outlined text-[14px] text-[#123d32]">location_on</span>
              ${org.municipio} · ${org.direccion}
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[#00261e] tracking-tight">
            ${org.nombre}
          </h1>
          <p class="text-sm text-[#414845] max-w-3xl leading-relaxed">
            ${org.descripcion} Cuenta con protocolos activos de revisión de calidad e higiene y almacenamiento seguro para redistribución social en ${org.municipio}.
          </p>

          <div class="flex flex-wrap items-center gap-2 pt-1">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f4ed] text-[#00261e] text-xs font-semibold">
              <span class="w-2.5 h-2.5 rounded-full bg-[#546500] animate-pulse"></span>
              Recepción activa hoy (07:00 – 18:30)
            </span>
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f4f4ed] text-[#414845] text-xs">
              <span class="material-symbols-outlined text-[15px] text-[#546500]">call</span>
              ${org.telefono}
            </span>
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f4f4ed] text-[#414845] text-xs">
              <span class="material-symbols-outlined text-[15px] text-[#123d32]">local_shipping</span>
              Distancia desde Provenza: ${org.distanciaKm} km
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2.5 shrink-0 z-10 w-full lg:w-auto">
        <button onclick="window.navigate('publicar?org=${encodeURIComponent(org.nombre)}')" class="h-11 px-5 rounded-xl bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer">
          <span class="material-symbols-outlined text-[18px] text-[#d5ee76]">volunteer_activism</span>
          <span>Programar Entrega a esta Sede</span>
        </button>
        <button onclick="window.showToast && window.showToast('Certificado DIAN Art. 125 E.T.', '${org.nombre} está autorizada para emitir certificados de donación deducibles de renta.', 'info')" class="h-11 px-5 rounded-xl bg-[#eeeee7] text-[#00261e] hover:bg-[#e8e9e2] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer">
          <span class="material-symbols-outlined text-[18px] text-[#546500]">workspace_premium</span>
          <span>Certificado DIAN Art. 125</span>
        </button>
      </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-2xl p-5 border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between text-[#717975]">
          <span class="text-xs uppercase tracking-wider font-bold">Capacidad de recibo</span>
          <div class="w-8 h-8 rounded-lg bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[18px]">ac_unit</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">${org.capacidadKgDia}</span>
            <span class="text-sm font-semibold text-[#414845]">kg/día</span>
          </div>
          <p class="text-xs text-[#414845] mt-1">Cuarto frío 2°C a 4°C y bodega seca</p>
        </div>
        <div class="w-full bg-[#eeeee7] rounded-full h-1.5 overflow-hidden">
          <div class="bg-[#546500] h-full rounded-full" style="width: 68%;"></div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between text-[#717975]">
          <span class="text-xs uppercase tracking-wider font-bold">Población atendida</span>
          <div class="w-8 h-8 rounded-lg bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[18px]">group</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">${org.beneficiarios}</span>
            <span class="text-sm font-semibold text-[#414845]">personas/día</span>
          </div>
          <p class="text-xs text-[#414845] mt-1">Atención directa en ${org.municipio}</p>
        </div>
        <div class="flex items-center gap-1.5 text-[#546500] text-xs font-semibold">
          <span class="material-symbols-outlined text-[15px]">soup_kitchen</span>
          <span>Aprox. ${Math.round(org.capacidadKgDia * 2.5)} raciones diarias</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between text-[#717975]">
          <span class="text-xs uppercase tracking-wider font-bold">Distancia y Recorrido</span>
          <div class="w-8 h-8 rounded-lg bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[18px]">schedule</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">${org.distanciaKm}</span>
            <span class="text-sm font-semibold text-[#414845]">km</span>
          </div>
          <p class="text-xs text-[#414845] mt-1">Entrega ágil con zona de recepción directa</p>
        </div>
        <div class="flex items-center gap-1.5 text-[#123d32] text-xs font-semibold">
          <span class="material-symbols-outlined text-[15px]">speed</span>
          <span>Ruta prioritaria Re-Food</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between text-[#717975]">
          <span class="text-xs uppercase tracking-wider font-bold">Certificación Sanitaria</span>
          <div class="w-8 h-8 rounded-lg bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[18px]">health_and_safety</span>
          </div>
        </div>
        <div>
          <span class="text-lg font-extrabold text-[#00261e] block">${org.certificacion}</span>
          <p class="text-xs text-[#414845] mt-1">Inspección de calidad al recibir</p>
        </div>
        <div class="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
          <span class="material-symbols-outlined text-[15px]">verified</span>
          <span>Estado: ${org.estadoVerificacion}</span>
        </div>
      </div>
    </section>
  </div>
  `;
}

// 3. GUÍA DE CONSERVACIÓN COMPLETA DE STITCH
export function renderGuiaConservacion() {
  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <div class="relative overflow-hidden rounded-2xl bg-white p-6 sm:p-8 border border-[#e8e9e2] shadow-sm">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div class="flex flex-col gap-2 max-w-3xl">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00261e] text-white text-xs font-bold uppercase tracking-wider">
              <span class="material-symbols-outlined text-[14px] text-[#d5ee76]">verified_user</span>
              Buenas Prácticas e Inocuidad
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full bg-[#eeeee7] text-[#414845] text-xs font-semibold uppercase">
              Protocolo Operativo · Medellín & Valle de Aburrá
            </span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">
            Guía de conservación
          </h1>
          <p class="text-sm sm:text-base text-[#414845] leading-relaxed">
            Lo que las organizaciones sociales necesitan saber para recibir tu comida con total certeza, frescura y calidad higiénica.
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0 flex-wrap">
          <button onclick="window.navigate('calculadora')" class="flex items-center gap-2 h-11 px-4 rounded-xl bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-bold transition-all shadow-sm">
            <span class="material-symbols-outlined text-[18px] text-[#d5ee76]">calculate</span>
            <span>Abrir Calculadora Térmica</span>
          </button>
        </div>
      </div>

      <div class="mt-6 pt-6 border-t border-[#f4f4ed] grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="flex flex-col">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Marco Técnico</span>
          <span class="text-base text-[#00261e] mt-1 font-extrabold">Res. 2674 / 2013</span>
          <span class="text-xs text-[#717975]">Inocuidad alimentaria Col</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Límite Térmico Ambiente</span>
          <span class="text-base text-[#00261e] mt-1 font-extrabold">Máx. 120 minutos</span>
          <span class="text-xs text-[#717975]">Regla biológica estricta</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Cadena de Frío Activa</span>
          <span class="text-base text-[#00261e] mt-1 font-extrabold">≤ 5 °C control</span>
          <span class="text-xs text-[#717975]">Refrigeración constante</span>
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Validación en Punto</span>
          <span class="text-base text-[#00261e] mt-1 font-extrabold">Inspección Dual</span>
          <span class="text-xs text-[#717975]">Donante + Receptor</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="rounded-2xl bg-white p-6 sm:p-7 border border-[#e8e9e2] shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div class="absolute top-0 left-0 right-0 h-1.5 bg-[#546500]"></div>
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between pb-2 border-b border-[#f4f4ed]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#d5ee76]/40 flex items-center justify-center text-[#546500]">
                <span class="material-symbols-outlined text-[24px]">check_circle</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-[#00261e]">Qué SÍ puedes donar</h3>
                <span class="text-xs text-[#717975]">Aceptación prioritaria</span>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full bg-[#d5ee76] text-[#171e00] text-xs font-bold">
              Apto para entrega
            </span>
          </div>

          <ul class="flex flex-col gap-3">
            <li class="flex items-start gap-3 p-3 rounded-xl bg-[#f4f4ed]">
              <span class="material-symbols-outlined text-[#546500] shrink-0 text-[20px] mt-0.5">task_alt</span>
              <div>
                <span class="text-sm font-bold text-[#00261e] block">Alimentos que no llegaron a mesas ni servicio</span>
                <span class="text-xs text-[#414845]">Lotes retenidos en línea de cocina bajo control y con fecha de expiración vigente.</span>
              </div>
            </li>
            <li class="flex items-start gap-3 p-3 rounded-xl bg-[#f4f4ed]">
              <span class="material-symbols-outlined text-[#546500] shrink-0 text-[20px] mt-0.5">bakery_dining</span>
              <div>
                <span class="text-sm font-bold text-[#00261e] block">Panadería del día y repostería seca</span>
                <span class="text-xs text-[#414845]">Panes y masas horneadas sin rellenos cremosos que dependan de refrigeración.</span>
              </div>
            </li>
            <li class="flex items-start gap-3 p-3 rounded-xl bg-[#f4f4ed]">
              <span class="material-symbols-outlined text-[#546500] shrink-0 text-[20px] mt-0.5">nutrition</span>
              <div>
                <span class="text-sm font-bold text-[#00261e] block">Frutas y verduras en buen estado</span>
                <span class="text-xs text-[#414845]">Maduras o estéticamente imperfectas, siempre que mantengan pulpa firme e íntegra.</span>
              </div>
            </li>
            <li class="flex items-start gap-3 p-3 rounded-xl bg-[#f4f4ed]">
              <span class="material-symbols-outlined text-[#546500] shrink-0 text-[20px] mt-0.5">soup_kitchen</span>
              <div>
                <span class="text-sm font-bold text-[#00261e] block">Preparaciones calientes (&gt;60°C) o abatidas (&lt;5°C)</span>
                <span class="text-xs text-[#414845]">Mantenidas sostenidamente por encima de 60 °C o refrigeradas rápidamente.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="rounded-2xl bg-white p-6 sm:p-7 border border-[#e8e9e2] shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div class="absolute top-0 left-0 right-0 h-1.5 bg-[#ba1a1a]"></div>
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between pb-2 border-b border-[#f4f4ed]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                <span class="material-symbols-outlined text-[24px]">block</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-[#00261e]">Qué NO se puede donar</h3>
                <span class="text-xs text-[#717975]">Exclusión total</span>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold">
              Restringido
            </span>
          </div>

          <ul class="flex flex-col gap-3">
            <li class="flex items-start gap-3 p-3 rounded-xl bg-[#f4f4ed]">
              <span class="material-symbols-outlined text-[#ba1a1a] shrink-0 text-[20px] mt-0.5">cancel</span>
              <div>
                <span class="text-sm font-bold text-[#00261e] block">Sobras de platos de comensales</span>
                <span class="text-xs text-[#414845]">Alimentos que ya fueron servidos en vajilla al cliente final por riesgo de contaminación cruzada.</span>
              </div>
            </li>
            <li class="flex items-start gap-3 p-3 rounded-xl bg-[#f4f4ed]">
              <span class="material-symbols-outlined text-[#ba1a1a] shrink-0 text-[20px] mt-0.5">warning</span>
              <div>
                <span class="text-sm font-bold text-[#00261e] block">Pescados y mariscos crudos sin ultracongelación</span>
                <span class="text-xs text-[#414845]">Alto riesgo biológico por degradación bacteriana rápida.</span>
              </div>
            </li>
            <li class="flex items-start gap-3 p-3 rounded-xl bg-[#f4f4ed]">
              <span class="material-symbols-outlined text-[#ba1a1a] shrink-0 text-[20px] mt-0.5">error</span>
              <div>
                <span class="text-sm font-bold text-[#00261e] block">Alimentos con más de 2 horas a temperatura ambiente</span>
                <span class="text-xs text-[#414845]">Preparaciones que estuvieron en la zona de peligro biológico (entre 5°C y 60°C).</span>
              </div>
            </li>
            <li class="flex items-start gap-3 p-3 rounded-xl bg-[#f4f4ed]">
              <span class="material-symbols-outlined text-[#ba1a1a] shrink-0 text-[20px] mt-0.5">do_not_disturb</span>
              <div>
                <span class="text-sm font-bold text-[#00261e] block">Envases rotos, hinchados o latas abolladas</span>
                <span class="text-xs text-[#414845]">Pérdida de hermeticidad y posible proliferación de botulismo.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  `;
}

// 4. RUTA LOGÍSTICA COMPLETA DE STITCH (DINÁMICA POR LOTE)
export function renderRutaLogistica(params) {
  const allLotes = repository.getExcedentes();
  const targetId = (params && typeof params.get === 'function') ? params.get('id') : null;

  // Priorizar el lote seleccionado, o el primer lote 'En Ruta' / 'Asignado', o el primero disponible
  let item = targetId ? repository.getExcedenteById(targetId) : null;
  if (!item) {
    item = allLotes.find(l => l.estado === 'En Ruta') ||
           allLotes.find(l => l.estado === 'Asignado') ||
           allLotes[0];
  }

  const isEnRuta = item.estado === 'En Ruta';
  const isEntregado = item.estado === 'Entregado';
  const isAsignado = item.estado === 'Asignado';
  const isPublicado = item.estado === 'Publicado';

  let etaText = 'ETA: 18 min';
  let badgeRutaClass = 'bg-amber-50 text-amber-900 border-amber-200';
  let estadoRutaText = 'Vehículo en Tránsito';

  if (isEntregado) {
    etaText = 'Completado';
    badgeRutaClass = 'bg-[#d5ee76]/60 text-[#171e00] border-[#b9d15d]';
    estadoRutaText = 'Entrega Completada y Certificada';
  } else if (isPublicado || isAsignado) {
    etaText = 'En espera de recogida';
    badgeRutaClass = 'bg-blue-50 text-blue-900 border-blue-200';
    estadoRutaText = isAsignado ? 'Ruta Asignada · Esperando Recogida' : 'Lote Publicado · Esperando Asignación';
  }

  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Cadena de Custodia y Trazabilidad</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">
          Ruta Logística: ${item.establecimiento} → ${item.organizacionDestino || 'Banco de Alimentos'}
        </h1>
        <p class="text-sm text-[#414845] mt-1">
          Monitoreo en tiempo real del vehículo refrigerado Re-Food #4 para el lote <strong class="text-[#00261e] font-mono">${item.id}</strong>.
        </p>
      </div>

      <div class="flex items-center gap-3 flex-wrap">
        <!-- Selector Rápido de Lote para seguimiento -->
        <div class="relative">
          <select onchange="window.navigate('ruta-logistica?id=' + this.value)" class="bg-white border border-[#c0c8c4] text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-[#123d32] pr-8 shadow-xs cursor-pointer">
            ${allLotes.map(l => `
              <option value="${l.id}" ${l.id === item.id ? 'selected' : ''}>
                ${l.id} - ${l.nombre} (${l.estado})
              </option>
            `).join('')}
          </select>
          <span class="material-symbols-outlined absolute right-2 top-2 text-[16px] pointer-events-none text-[#717975]">expand_more</span>
        </div>

        <div class="px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 shadow-xs ${badgeRutaClass}">
          <span class="w-2.5 h-2.5 rounded-full ${isEnRuta ? 'bg-amber-500 animate-ping' : isEntregado ? 'bg-[#546500]' : 'bg-blue-500'}"></span>
          <span>${estadoRutaText} (${etaText})</span>
        </div>
      </div>
    </div>

    <!-- Contenedor Principal: Mapa y Detalle -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div class="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 border border-[#e8e9e2] shadow-sm flex flex-col gap-6">
        
        <!-- Ficha Resumen del Lote Monitoreado -->
        <div class="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#fafaf3] border border-[#e8e9e2] flex-wrap">
          <div class="flex items-center gap-3.5 min-w-0">
            <img src="${item.imagenUrl}" alt="${item.nombre}" class="w-14 h-14 rounded-xl object-cover border border-[#e8e9e2] shadow-sm shrink-0" />
            <div class="flex flex-col min-w-0">
              <span class="text-sm font-extrabold text-[#00261e] truncate">${item.nombre}</span>
              <span class="text-xs text-[#717975]">${item.cantidadKg} kg · ${item.categoria} · ${item.temperatura}</span>
              <span class="text-[11px] text-[#546500] font-semibold">Destino: ${item.organizacionDestino || 'Banco de Alimentos de Medellín'}</span>
            </div>
          </div>

          <!-- Botón de Acción Operativa para avanzar el ciclo -->
          <div class="flex items-center gap-2">
            ${isPublicado || isAsignado ? `
            <button onclick="window.cambiarEstadoDesdeRuta('${item.id}', 'En Ruta')" class="px-4 py-2 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all">
              <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">local_shipping</span>
              <span>Despachar a Transporte</span>
            </button>
            ` : isEnRuta ? `
            <button onclick="window.cambiarEstadoDesdeRuta('${item.id}', 'Entregado')" class="px-4 py-2 bg-[#546500] hover:bg-[#687d00] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all">
              <span class="material-symbols-outlined text-[16px]">task_alt</span>
              <span>Confirmar Entrega en Destino</span>
            </button>
            ` : `
            <button onclick="window.abrirModalCertificado('${item.id}')" class="px-4 py-2 bg-[#123d32] hover:bg-[#0c2821] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all">
              <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">description</span>
              <span>Ver Certificado Oficial</span>
            </button>
            `}
          </div>
        </div>

        <!-- Simulación Visual del Recorrido Metropolitano -->
        <div class="relative w-full h-72 bg-[#eeeee7] rounded-2xl overflow-hidden flex items-center justify-center border border-[#e3e3dc]">
          <div class="absolute inset-0 opacity-40 bg-[radial-gradient(#123d32_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <!-- Ruta gráfica vectorial ilustrativa del Valle de Aburrá -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none stroke-[#123d32]/30" fill="none" stroke-width="3" stroke-dasharray="6,6">
            <path d="M 120 220 Q 350 140 680 90" />
          </svg>

          <div class="relative z-10 flex flex-col items-center gap-3 text-center p-4">
            <div class="w-16 h-16 rounded-2xl bg-[#123d32] text-[#d5ee76] flex items-center justify-center shadow-xl ${isEnRuta ? 'animate-bounce' : ''}">
              <span class="material-symbols-outlined text-[34px]">${isEntregado ? 'check_circle' : 'local_shipping'}</span>
            </div>
            <div class="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-xl shadow-md border border-[#e8e9e2] flex flex-col gap-1 max-w-md">
              <span class="text-xs font-bold text-[#00261e] uppercase tracking-wider">
                ${isEntregado ? 'Llegada y entrega en la fundación completada' : 'Corredor vial Av. El Poblado → Av. Las Vegas'}
              </span>
              <span class="text-xs text-[#546500] font-semibold">
                ${isEntregado ? 'Acta de pesaje certificada firmada digitalmente' : 'Monitoreo en vivo: Temperatura en vehículo 4.2°C · Cadena de frío asegurada'}
              </span>
            </div>
          </div>
        </div>

        <!-- Hitos y Trazabilidad de la Ruta -->
        <div class="flex flex-col gap-4">
          <h3 class="text-xs font-bold text-[#717975] uppercase tracking-wider">Hitos de Custodia del Lote</h3>
          <div class="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#eeeee7]">
            
            <!-- Hito 1: Registro en Cocina -->
            <div class="flex items-start gap-4 relative">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">1. Preparación y Registro en Cocina (${item.establecimiento})</p>
                <p class="text-xs text-[#717975]">Lote ${item.id} registrado con ${item.cantidadKg} kg. Parámetros de inocuidad confirmados (${item.temperatura}).</p>
              </div>
            </div>

            <!-- Hito 2: Despacho y Recogida -->
            <div class="flex items-start gap-4 relative">
              <span class="w-6 h-6 rounded-full ${isAsignado || isEnRuta || isEntregado ? 'bg-emerald-600 text-white' : 'bg-[#c0c8c4] text-white'} flex items-center justify-center text-xs font-bold shrink-0">
                ${isAsignado || isEnRuta || isEntregado ? '✓' : '2'}
              </span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">2. Asignación Logística y Recogida en el Restaurante</p>
                <p class="text-xs text-[#717975]">
                  ${isAsignado || isEnRuta || isEntregado 
                    ? `Vehículo refrigerado Eco-04 asignado. Destino programado: ${item.organizacionDestino || 'Banco de Alimentos'}.` 
                    : 'Esperando asignación de ruta de transporte.'}
                </p>
              </div>
            </div>

            <!-- Hito 3: En Tránsito -->
            <div class="flex items-start gap-4 relative">
              <span class="w-6 h-6 rounded-full ${isEnRuta ? 'bg-amber-500 text-white animate-pulse' : isEntregado ? 'bg-emerald-600 text-white' : 'bg-[#c0c8c4] text-white'} flex items-center justify-center text-xs font-bold shrink-0">
                ${isEntregado ? '✓' : '3'}
              </span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">3. Tránsito con Control Térmico en Vivo</p>
                <p class="text-xs text-[#717975]">
                  ${isEnRuta 
                    ? 'En camino hacia la fundación. Temperatura del vehículo monitoreada en tiempo real (4°C).' 
                    : isEntregado ? 'Tránsito completado con éxito sin ruptura de la cadena de frío.' : 'Pendiente de inicio de trayecto.'}
                </p>
              </div>
            </div>

            <!-- Hito 4: Entrega en Fundación -->
            <div class="flex items-start gap-4 relative">
              <span class="w-6 h-6 rounded-full ${isEntregado ? 'bg-[#546500] text-white' : 'bg-[#c0c8c4] text-white'} flex items-center justify-center text-xs font-bold shrink-0">
                ${isEntregado ? '✓' : '4'}
              </span>
              <div>
                <p class="text-sm font-bold ${isEntregado ? 'text-[#00261e]' : 'text-[#717975]'}">4. Entrega y Pesaje en ${item.organizacionDestino || 'Fundación Receptora'}</p>
                <p class="text-xs text-[#717975]">
                  ${isEntregado 
                    ? `Recibido conforme en la sede. Acta digital expedida y código de custodia generado.` 
                    : 'Revisión de calidad e higiene y firma digital al momento de la llegada.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Lateral: Conductor y Vehículo -->
      <div class="lg:col-span-4 flex flex-col gap-5">
        <div class="bg-white rounded-2xl p-6 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
          <h3 class="text-xs font-bold uppercase tracking-widest text-[#717975]">Unidad de Transporte</h3>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-[#d5ee76]/40 text-[#123d32] flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-[28px]">electric_moped</span>
            </div>
            <div>
              <p class="font-bold text-sm text-[#00261e]">Vehículo Refrigerado Eco-04</p>
              <p class="text-xs text-[#546500] font-semibold">Placas: KLO-892 (100% Eléctrico)</p>
            </div>
          </div>
          <div class="text-xs text-[#414845] space-y-2 pt-2 border-t border-[#f4f4ed]">
            <div class="flex justify-between">
              <span>Conductor asignado:</span>
              <span class="font-bold text-[#1a1c18]">Carlos Mario Restrepo</span>
            </div>
            <div class="flex justify-between">
              <span>Carné Manipulación:</span>
              <span class="font-bold text-emerald-700">Vigente INVIMA 2026</span>
            </div>
            <div class="flex justify-between">
              <span>Contacto de cabina:</span>
              <span class="font-bold text-[#123d32]">+57 312 450 9912</span>
            </div>
          </div>
        </div>

        <!-- Protocolo de Inocuidad Térmica -->
        <div class="bg-[#00261e] text-white rounded-2xl p-6 shadow-md flex flex-col gap-3">
          <div class="flex items-center gap-2 text-[#d5ee76]">
            <span class="material-symbols-outlined text-[20px]">thermostat</span>
            <span class="text-xs uppercase font-bold tracking-wider">Control de Temperatura en Tiempo Real</span>
          </div>
          <p class="text-xs text-[#bfecdc] leading-relaxed">
            El vehículo refrigerado reporta datos de temperatura cada 30 segundos para garantizar que los alimentos se mantengan frescos y seguros durante todo el recorrido (Res. 2674 / 2013).
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
}

// 5. DETALLE DE DONACIÓN CON CERTIFICADO OFICIAL
export function renderDetalleDonacion(params) {
  const targetId = (params && typeof params.get === 'function') ? params.get('id') : null;
  const item = (targetId && repository.getExcedenteById(targetId)) || repository.getExcedentes()[0];
  const raciones = Math.round((parseFloat(item.cantidadKg) || 0) * 2.5);

  let badge = 'bg-gray-100 text-gray-700';
  if (item.estado === 'Publicado') badge = 'bg-blue-50 text-blue-800 border border-blue-200';
  else if (item.estado === 'En Ruta') badge = 'bg-amber-50 text-amber-800 border border-amber-200';
  else if (item.estado === 'Asignado') badge = 'bg-emerald-50 text-emerald-800 border border-emerald-200';
  else if (item.estado === 'Entregado') badge = 'bg-[#d5ee76]/50 text-[#171e00] border border-[#b9d15d]';

  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <div class="flex items-center gap-2">
      <a href="#mis-excedentes" class="p-1 rounded-lg hover:bg-[#eeeee7] text-[#123d32] flex items-center">
        <span class="material-symbols-outlined text-[20px]">arrow_back</span>
      </a>
      <span class="text-xs text-[#717975]">Volver a Mis Excedentes</span>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-start gap-4">
        ${item.imagenUrl ? `
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-[#e8e9e2] shadow-sm">
          <img src="${item.imagenUrl}" alt="${item.nombre}" class="w-full h-full object-cover" />
        </div>
        ` : ''}
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs font-mono font-bold bg-[#eeeee7] text-[#123d32] px-2.5 py-0.5 rounded">${item.id}</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge}">${item.estado}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-[#00261e] tracking-tight">${item.nombre}</h1>
          <p class="text-sm text-[#414845] mt-1">Donado por ${item.establecimiento} para <strong>${item.organizacionDestino || 'Banco de Alimentos'}</strong>.</p>
        </div>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button onclick="window.abrirModalCertificado('${item.id}')" class="px-4 py-2.5 bg-[#d5ee76] text-[#171e00] hover:bg-[#c3e05a] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all">
          <span class="material-symbols-outlined text-[16px]">print</span>
          <span>Certificado DIAN (PDF)</span>
        </button>
        <button onclick="window.navigate('publicar?edit=${item.id}')" class="px-4 py-2.5 bg-white border border-[#c0c8c4] hover:bg-[#fafaf3] text-[#1a1c18] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs">
          <span class="material-symbols-outlined text-[16px]">edit</span>
          <span>Editar Lote</span>
        </button>
        <button onclick="window.navigate('ruta-logistica?id=${item.id}')" class="px-5 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md">
          <span class="material-symbols-outlined text-[18px]">navigation</span>
          <span>Rastrear Ruta en Vivo</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-2">
        <span class="text-xs font-bold uppercase text-[#717975]">Cantidad</span>
        <span class="text-3xl font-extrabold text-[#00261e]">${item.cantidadKg} kg</span>
        <span class="text-xs text-[#546500]">Aproximadamente ${raciones} raciones nutricionales</span>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-2">
        <span class="text-xs font-bold uppercase text-[#717975]">Temperatura Despacho</span>
        <span class="text-2xl font-extrabold text-[#123d32]">${item.temperatura}</span>
        <span class="text-xs text-emerald-700">Dentro de zona segura INVIMA</span>
      </div>
      <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-2">
        <span class="text-xs font-bold uppercase text-[#717975]">Certificado Digital</span>
        <span class="text-xl font-bold text-[#00261e] flex items-center gap-1">
          <span class="material-symbols-outlined text-emerald-600">verified</span>
          <span>Autenticado</span>
        </span>
        <span class="text-xs text-[#717975] font-mono">SHA-256: 7f8a...c92b</span>
      </div>
    </div>
  </div>

  <!-- Modal Certificado Oficial DIAN -->
  <div id="modal-certificado-container"></div>
  `;
}

// 6. NOTIFICACIONES & PERFIL
export function renderNotificaciones() {
  const notifs = repository.getNotificaciones();
  const perfil = repository.getPerfilDonante();
  const noLeidas = repository.getNotificacionesNoLeidasCount();

  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span class="text-xs font-bold uppercase tracking-widest text-[#546500]">Cuenta de Donante</span>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Centro de Notificaciones y Perfil</h1>
        <p class="text-sm text-[#414845] mt-1">${perfil.nombre} · NIT: ${perfil.nit} · ${perfil.municipio}</p>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="window.marcarTodasLeidas()" class="px-3.5 py-2 bg-white border border-[#c0c8c4] hover:bg-[#eeeee7] text-xs font-semibold rounded-xl text-[#1a1c18] transition-colors">
          Marcar leídas (${noLeidas})
        </button>
        <button onclick="window.limpiarHistorialNotificaciones()" class="px-3.5 py-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-xs font-semibold rounded-xl text-rose-700 transition-colors">
          Limpiar historial
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-3">
          <h3 class="text-base font-bold text-[#00261e]">Alertas Operativas y Logísticas</h3>
          <span class="text-xs text-[#546500] font-semibold">${notifs.length} registros</span>
        </div>
        <div class="divide-y divide-[#eeeee7]">
          ${notifs.length === 0 ? `
            <div class="p-8 text-center text-[#717975] text-xs">No hay notificaciones pendientes.</div>
          ` : notifs.map(n => `
          <div class="py-3.5 flex items-start gap-3 ${!n.leida ? 'bg-[#fafaf3] p-2.5 rounded-xl' : ''}">
            <span class="material-symbols-outlined text-[#123d32] text-[22px] p-2 rounded-xl bg-[#d5ee76]/30 shrink-0">notifications_active</span>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h4 class="text-sm font-bold text-[#00261e]">${n.titulo}</h4>
                ${!n.leida ? '<span class="w-2 h-2 rounded-full bg-rose-500"></span>' : ''}
              </div>
              <p class="text-xs text-[#414845] mt-0.5">${n.detalle}</p>
              <span class="text-[11px] text-[#717975] mt-1 block">${n.hora}</span>
            </div>
          </div>
          `).join('')}
        </div>
      </div>

      <div class="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
        <div class="w-16 h-16 rounded-full bg-[#d5ee76] text-[#171e00] font-extrabold text-2xl flex items-center justify-center">
          PB
        </div>
        <div>
          <h3 class="font-bold text-lg text-[#00261e]">${perfil.nombre}</h3>
          <p class="text-xs text-[#546500] font-semibold">Establecimiento Donante Certificado Oro</p>
        </div>
        <div class="text-xs text-[#414845] space-y-2 pt-2 border-t border-[#f4f4ed]">
          <div class="flex justify-between">
            <span>Ubicación:</span>
            <span class="font-semibold text-[#1a1c18]">${perfil.direccion}</span>
          </div>
          <div class="flex justify-between">
            <span>Responsable:</span>
            <span class="font-semibold text-[#1a1c18]">${perfil.responsable}</span>
          </div>
          <div class="flex justify-between">
            <span>Contacto cocina:</span>
            <span class="font-semibold text-[#1a1c18]">${perfil.telefono}</span>
          </div>
          <div class="flex justify-between">
            <span>Ventana de recogida:</span>
            <span class="font-bold text-[#123d32]">${perfil.horarioRecogida}</span>
          </div>
        </div>
        <button onclick="window.navigate('configuracion')" class="w-full mt-2 py-2 bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-semibold rounded-xl transition-all">
          Editar Datos del Restaurante
        </button>
      </div>
    </div>
  </div>
  `;
}

// 7. CONFIGURACIÓN COMPLETA CON PERSISTENCIA REAL
export function renderConfiguracion() {
  const perfil = repository.getPerfilDonante();

  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <!-- Feedback Toast Flotante -->
    <div id="save-toast" class="hidden fixed top-20 right-8 z-50 flex items-center gap-3 bg-[#00261e] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#d5ee76]/40">
      <span class="material-symbols-outlined text-[22px] text-[#d5ee76]">check_circle</span>
      <div class="flex flex-col">
        <span class="text-xs font-bold text-white">Configuración guardada exitosamente</span>
        <span class="text-[11px] text-[#a4d0c0]">Datos sincronizados con la red de rescate</span>
      </div>
    </div>

    <!-- Header Container -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
      <div class="flex flex-col gap-1 max-w-2xl">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e8e9e2] text-xs font-bold text-[#414845] uppercase tracking-wider">
            <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
            Ajustes de Cuenta · Establecimiento Donante
          </span>
          <span class="text-xs text-[#717975] px-2.5 py-0.5 rounded-full bg-[#eeeee7]">ID: RF-DON-0492</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">Configuración</h1>
        <p class="text-sm text-[#414845]">
          Administra el perfil de <strong>${perfil.nombre}</strong>, puntos de recogida en el Valle de Aburrá y alertas operativas.
        </p>
      </div>

      <div class="flex items-center gap-3 bg-white border border-[#e8e9e2] px-4 py-2.5 rounded-2xl shadow-xs self-start md:self-auto">
        <div class="w-9 h-9 rounded-xl bg-[#d5ee76]/60 text-[#123d32] flex items-center justify-center font-bold">
          <span class="material-symbols-outlined text-[20px]">verified</span>
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] uppercase tracking-wider text-[#717975] font-bold">Nodo Verificado</span>
          <span class="text-xs text-[#00261e] font-extrabold">DIAN Art. 125 E.T.</span>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="border-b border-[#e8e9e2] pb-1">
      <nav class="flex items-center gap-2 overflow-x-auto py-1">
        <button class="config-tab-btn active px-4 py-2 rounded-xl text-xs font-bold bg-[#123d32] text-white transition-all shadow-xs" onclick="window.switchConfigTab('perfil', this)">
          Perfil del establecimiento
        </button>
        <button class="config-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-[#414845] hover:bg-[#eeeee7] transition-all" onclick="window.switchConfigTab('notificaciones', this)">
          Notificaciones y WhatsApp
        </button>
        <button class="config-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-[#414845] hover:bg-[#eeeee7] transition-all" onclick="window.switchConfigTab('logistica', this)">
          Horarios y Logística
        </button>
      </nav>
    </div>

    <!-- Contenido Tab 1: Perfil -->
    <form id="form-config-perfil" onsubmit="window.handleGuardarPerfil(event)" class="config-tab-pane flex flex-col gap-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div class="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#e8e9e2] shadow-sm flex flex-col gap-4 text-center items-center">
          <div class="w-24 h-24 rounded-2xl bg-[#123d32] text-[#d5ee76] font-extrabold text-3xl flex items-center justify-center shadow-md">
            PB
          </div>
          <div>
            <h3 class="font-extrabold text-lg text-[#00261e]">${perfil.nombre}</h3>
            <span class="text-xs text-[#546500] font-semibold">${perfil.municipio}</span>
          </div>
          <span class="text-[11px] text-[#717975]">Establecimiento verificado de la red Re-Food</span>
        </div>

        <div class="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
          <h3 class="text-base font-bold text-[#00261e] border-b border-[#f4f4ed] pb-3">Información Legal y Comercial</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">Nombre Comercial</label>
              <input type="text" id="cfg-nombre" value="${perfil.nombre}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">Razón Social</label>
              <input type="text" id="cfg-razon" value="${perfil.razonSocial}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">NIT</label>
              <input type="text" id="cfg-nit" value="${perfil.nit}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">Responsable de Cocina</label>
              <input type="text" id="cfg-responsable" value="${perfil.responsable}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">Dirección Principal</label>
              <input type="text" id="cfg-direccion" value="${perfil.direccion}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">Teléfono / WhatsApp</label>
              <input type="text" id="cfg-telefono" value="${perfil.telefono}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
          </div>
          <button type="submit" class="self-end px-6 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-semibold rounded-xl transition-all shadow-sm mt-2">
            Guardar Cambios de Perfil
          </button>
        </div>
      </div>
    </form>

    <!-- Contenido Tab 2: Notificaciones -->
    <div id="config-tab-notificaciones" class="config-tab-pane hidden flex flex-col gap-6">
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e9e2] shadow-sm max-w-3xl flex flex-col gap-5">
        <h3 class="text-base font-bold text-[#00261e] border-b border-[#f4f4ed] pb-3">Canales de Alerta Operativa</h3>
        <div class="flex items-center justify-between pb-3 border-b border-[#f4f4ed]">
          <div>
            <h4 class="text-sm font-bold text-[#00261e]">Alertas de WhatsApp en Tiempo Real</h4>
            <p class="text-xs text-[#717975]">Notificar al chef cuando el vehículo refrigerado esté a 10 minutos de Provenza.</p>
          </div>
          <input type="checkbox" id="cfg-chk-whatsapp" ${perfil.alertaWhatsapp ? 'checked' : ''} class="w-5 h-5 accent-[#123d32] cursor-pointer" />
        </div>
        <div class="flex items-center justify-between pb-3 border-b border-[#f4f4ed]">
          <div>
            <h4 class="text-sm font-bold text-[#00261e]">Emisión Automática de Certificados DIAN</h4>
            <p class="text-xs text-[#717975]">Generar acta tributaria deducible de renta por cada lote entregado.</p>
          </div>
          <input type="checkbox" id="cfg-chk-email" ${perfil.alertaEmail ? 'checked' : ''} class="w-5 h-5 accent-[#123d32] cursor-pointer" />
        </div>
        <button onclick="window.triggerSaveConfig()" class="self-end px-6 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-semibold rounded-xl transition-all shadow-sm">
          Guardar Preferencias de Alertas
        </button>
      </div>
    </div>

    <!-- Contenido Tab 3: Horarios y Logística -->
    <div id="config-tab-logistica" class="config-tab-pane hidden flex flex-col gap-6">
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e9e2] shadow-sm max-w-3xl flex flex-col gap-5">
        <h3 class="text-base font-bold text-[#00261e] border-b border-[#f4f4ed] pb-3">Horarios y Punto de Recogida</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold uppercase text-[#717975]">Horario preferencial de recogida</label>
            <input type="text" id="cfg-horario" value="${perfil.horarioRecogida}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold uppercase text-[#717975]">Punto de entrega en el local</label>
            <input type="text" value="Entrada de cocina / Zona de entrega Calle 8A con Cra 35" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
          </div>
        </div>
        <button onclick="window.handleGuardarLogistica()" class="self-end px-6 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-semibold rounded-xl transition-all shadow-sm">
          Guardar Ventana Logística
        </button>
      </div>
    </div>
  </div>
  `;
}

// Controladores Globales
window.cambiarEstadoDesdeRuta = function(id, nuevoEstado) {
  try {
    repository.updateEstadoExcedente(id, nuevoEstado);
    if (typeof window.showToast === 'function') {
      window.showToast(
        `Estado actualizado: ${nuevoEstado}`,
        nuevoEstado === 'Entregado' ? 'Entrega completada y acta oficial habilitada.' : 'El vehículo refrigerado ha iniciado el recorrido.',
        'success'
      );
    }
    // Recargar vista de ruta para reflejar el estado actualizado
    window.navigate(`ruta-logistica?id=${id}`);
  } catch (err) {
    if (typeof window.showToast === 'function') {
      window.showToast('Error al actualizar ruta', err.message, 'error');
    }
  }
};

window.switchConfigTab = function(tabName, btnElement) {
  const tabs = document.querySelectorAll('.config-tab-btn');
  tabs.forEach(t => t.className = "config-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-[#414845] hover:bg-[#eeeee7] transition-all");
  btnElement.className = "config-tab-btn active px-4 py-2 rounded-xl text-xs font-bold bg-[#123d32] text-white transition-all shadow-xs";

  const panes = document.querySelectorAll('.config-tab-pane');
  panes.forEach(p => p.classList.add('hidden'));

  const target = document.getElementById(`config-tab-${tabName}`);
  if (target) target.classList.remove('hidden');
};

window.handleGuardarPerfil = function(e) {
  e.preventDefault();
  const nombre = document.getElementById('cfg-nombre')?.value;
  const razonSocial = document.getElementById('cfg-razon')?.value;
  const nit = document.getElementById('cfg-nit')?.value;
  const responsable = document.getElementById('cfg-responsable')?.value;
  const direccion = document.getElementById('cfg-direccion')?.value;
  const telefono = document.getElementById('cfg-telefono')?.value;

  repository.updatePerfilDonante({
    nombre,
    razonSocial,
    nit,
    responsable,
    direccion,
    telefono
  });

  window.triggerSaveConfig();
};

window.handleGuardarLogistica = function() {
  const horario = document.getElementById('cfg-horario')?.value;
  if (horario) {
    repository.updatePerfilDonante({ horarioRecogida: horario });
  }
  window.triggerSaveConfig();
};

window.triggerSaveConfig = function() {
  const toast = document.getElementById('save-toast');
  if (toast) {
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  }
};

window.marcarTodasLeidas = function() {
  repository.marcarNotificacionesLeidas();
  window.navigate('notificaciones');
};

window.limpiarHistorialNotificaciones = function() {
  if (confirm('¿Deseas vaciar el historial de notificaciones?')) {
    repository.limpiarNotificaciones();
    window.navigate('notificaciones');
  }
};

// Modal Certificado Oficial DIAN
window.abrirModalCertificado = function(loteId) {
  const item = repository.getExcedenteById(loteId) || repository.getExcedentes()[0];
  const perfil = repository.getPerfilDonante();
  const raciones = Math.round((parseFloat(item.cantidadKg) || 0) * 2.5);
  const co2Evitado = Math.round((parseFloat(item.cantidadKg) || 0) * 2.1 * 10) / 10;
  const hash = `0x${Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('')}`;

  const modalHtml = `
  <div id="modal-dian-overlay" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-[#e8e9e2] flex flex-col gap-6 my-8">
      
      <!-- Encabezado Oficial -->
      <div class="flex items-start justify-between border-b-2 border-[#123d32] pb-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-[#00261e] text-[#d5ee76] flex items-center justify-center font-extrabold text-xl">
            RF
          </div>
          <div>
            <h2 class="text-base font-extrabold text-[#00261e] uppercase tracking-wide">Re-Food Valle de Aburrá</h2>
            <p class="text-xs text-[#546500] font-semibold">Red Metropolitana de Rescate Alimentario · NIT: 901.884.220-1</p>
          </div>
        </div>
        <div class="text-right">
          <span class="text-[10px] font-bold text-[#717975] uppercase block">Certificado N°</span>
          <span class="text-sm font-mono font-bold text-[#00261e]">ACTA-${item.id}-2026</span>
        </div>
      </div>

      <!-- Título Legal -->
      <div class="text-center py-2 bg-[#f4f4ed] rounded-xl border border-[#e3e3dc]">
        <h3 class="text-xs font-bold text-[#00261e] uppercase tracking-wider">
          Certificado Oficial de Donación de Alimentos para Efectos Tributarios
        </h3>
        <p class="text-[10px] text-[#717975] mt-0.5">
          Conforme al Artículo 125 del Estatuto Tributario y Ley 1990 de 2019 de la República de Colombia
        </p>
      </div>

      <!-- Datos Donante y Receptor -->
      <div class="grid grid-cols-2 gap-4 text-xs">
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
          <span class="text-[10px] uppercase font-bold text-[#717975] block mb-1">Establecimiento Donante</span>
          <p class="font-bold text-[#00261e] text-sm">${perfil.nombre}</p>
          <p class="text-gray-600">Razón Social: ${perfil.razonSocial}</p>
          <p class="text-gray-600">NIT: ${perfil.nit}</p>
          <p class="text-gray-600">${perfil.direccion} - Medellín</p>
        </div>

        <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
          <span class="text-[10px] uppercase font-bold text-[#717975] block mb-1">Entidad Receptora Social</span>
          <p class="font-bold text-[#00261e] text-sm">${item.organizacionDestino || 'Banco de Alimentos de Medellín'}</p>
          <p class="text-gray-600">Entidad sin ánimo de lucro (ESAL)</p>
          <p class="text-gray-600">Régimen Tributario Especial</p>
          <p class="text-gray-600">Certificación Invima & HACCP Nivel 4</p>
        </div>
      </div>

      <!-- Detalle del Lote Donado -->
      <div class="border border-[#e8e9e2] rounded-xl overflow-hidden text-xs">
        <table class="w-full text-left">
          <thead class="bg-[#123d32] text-white">
            <tr>
              <th class="p-2.5">Código Lote</th>
              <th class="p-2.5">Descripción Alimento</th>
              <th class="p-2.5 text-center">Peso Verificado</th>
              <th class="p-2.5 text-center">Raciones</th>
              <th class="p-2.5 text-right">CO₂e Evitado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr>
              <td class="p-2.5 font-mono font-bold">${item.id}</td>
              <td class="p-2.5 font-medium">${item.nombre} (${item.categoria})</td>
              <td class="p-2.5 text-center font-bold text-[#00261e]">${item.pesoRecibidoKg || item.cantidadKg} kg</td>
              <td class="p-2.5 text-center font-bold text-[#546500]">${raciones} raciones</td>
              <td class="p-2.5 text-right font-bold text-emerald-700">${co2Evitado} kg</td>
            </tr>
          </tbody>
        </table>
      </div>

      ${item.tempLlegada || item.notasRecepcion ? `
      <div class="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs flex flex-col gap-1">
        <span class="font-bold text-[#00261e]">✓ Verificación en Punto de Recepción (${item.organizacionDestino || 'Fundación Receptora'}):</span>
        <span class="text-[#414845]">Temperatura de llegada: <strong>${item.tempLlegada || item.temperatura}</strong> · Calidad: <strong>${item.estadoCalidad || 'Óptimo'}</strong></span>
        ${item.notasRecepcion ? `<span class="text-[#546500] italic">Observación: "${item.notasRecepcion}"</span>` : ''}
      </div>
      ` : ''}

      <!-- Hash Criptográfico y Firmas -->
      <div class="flex flex-col gap-2 pt-2 border-t border-[#eeeee7]">
        <div class="flex justify-between items-center text-[10px] text-[#717975] font-mono bg-[#f4f4ed] p-2 rounded-lg">
          <span>Hash SHA-256 de Custodia:</span>
          <span class="font-bold text-[#00261e] truncate ml-2">${hash}</span>
        </div>
        <div class="grid grid-cols-2 gap-8 pt-6 text-center text-xs text-[#414845]">
          <div class="border-t border-gray-300 pt-2">
            <p class="font-bold text-[#00261e]">${perfil.responsable}</p>
            <p class="text-[11px] text-[#717975]">Por Establecimiento Donante</p>
          </div>
          <div class="border-t border-gray-300 pt-2">
            <p class="font-bold text-[#00261e]">Dirección de Inocuidad Re-Food</p>
            <p class="text-[11px] text-[#717975]">Coordinación Logística Aburrá Sur</p>
          </div>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#f4f4ed]">
        <button type="button" onclick="window.cerrarModalCertificado()" class="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#414845] hover:bg-[#eeeee7] transition-colors">
          Cerrar
        </button>
        <button type="button" onclick="window.print()" class="px-6 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md">
          <span class="material-symbols-outlined text-[16px]">print</span>
          <span>Imprimir / Guardar en PDF</span>
        </button>
      </div>
    </div>
  </div>
  `;

  const container = document.getElementById('modal-certificado-container') || document.body;
  const tempDiv = document.createElement('div');
  tempDiv.id = 'modal-cert-wrapper';
  tempDiv.innerHTML = modalHtml;
  document.body.appendChild(tempDiv);
};

window.cerrarModalCertificado = function() {
  const el = document.getElementById('modal-cert-wrapper');
  if (el) el.remove();
};

// 8. LANDING INSTITUCIONAL COMPLETA (#institucional)
export function renderLanding() {
  const metricas = repository.getMetricasResumen();
  const imp = ImpactoUseCase.calcularMetricas(metricas.kgRecuperados);
  const orgs = repository.getOrganizaciones();
  const currentRole = (typeof localStorage !== 'undefined' && localStorage.getItem('refood_role')) || 'donante';

  return `
  <div class="max-w-[1360px] w-full mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-10">
    <!-- Hero Institucional -->
    <div class="bg-[#00261e] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col items-center text-center gap-5">
      <span class="px-3.5 py-1.5 rounded-full bg-[#d5ee76] text-[#171e00] text-xs font-bold uppercase tracking-widest">
        Red Metropolitana de Rescate Alimentario · Valle de Aburrá
      </span>
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
        Lo que sobra aquí, <span class="text-[#d5ee76] underline decoration-[#d5ee76]/50">alimenta allá.</span>
      </h1>
      <p class="text-sm sm:text-base text-[#bfecdc] max-w-2xl leading-relaxed">
        Re-Food conecta los excedentes frescos de restaurantes, hoteles y panaderías de Medellín con comedores comunitarios y fundaciones sociales verificadas, garantizando transporte refrigerado y certificado tributario DIAN.
      </p>
      <div class="flex flex-wrap justify-center gap-3 pt-2">
        <button onclick="window.navigate('${currentRole === 'receptor' ? 'receptor-dashboard' : 'resumen'}')" class="px-6 py-3 rounded-xl bg-[#d5ee76] text-[#171e00] font-extrabold text-xs sm:text-sm hover:bg-[#c2f362] shadow-md transition-all cursor-pointer">
          Volver a mi Panel Principal
        </button>
        <button onclick="window.navigate('organizaciones')" class="px-6 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-semibold text-xs sm:text-sm hover:bg-white/20 transition-all cursor-pointer">
          Ver Fundaciones Aliadas (${orgs.length})
        </button>
      </div>
    </div>

    <!-- Indicadores en Vivo de la Red -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm text-center">
        <span class="text-3xl font-extrabold text-[#00261e] block">${metricas.kgRecuperados} kg</span>
        <span class="text-xs font-bold uppercase text-[#717975] mt-1 block">Alimentos Rescatados</span>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm text-center">
        <span class="text-3xl font-extrabold text-[#546500] block">${imp.raciones}</span>
        <span class="text-xs font-bold uppercase text-[#717975] mt-1 block">Platos Servidos</span>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm text-center">
        <span class="text-3xl font-extrabold text-emerald-700 block">${imp.co2EvitadoKg} kg</span>
        <span class="text-xs font-bold uppercase text-[#717975] mt-1 block">CO₂e Evitado</span>
      </div>
      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm text-center">
        <span class="text-3xl font-extrabold text-[#123d32] block">${orgs.length} sedes</span>
        <span class="text-xs font-bold uppercase text-[#717975] mt-1 block">Comedores Verificados</span>
      </div>
    </div>

    <!-- Cómo Funciona en 3 Pasos -->
    <div class="flex flex-col gap-5">
      <div class="text-center">
        <span class="text-xs uppercase font-bold tracking-widest text-[#546500]">Operación Simple y Transparente</span>
        <h2 class="text-2xl font-extrabold text-[#00261e] mt-1">¿Cómo funciona el rescate en Re-Food?</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-3">
          <div class="w-11 h-11 rounded-xl bg-[#d5ee76]/50 text-[#123d32] flex items-center justify-center font-extrabold text-base">
            1
          </div>
          <h3 class="font-bold text-base text-[#00261e]">El restaurante publica el lote</h3>
          <p class="text-xs text-[#414845] leading-relaxed">
            La cocina registra el alimento disponible, sube una foto que se optimiza automáticamente y valida la temperatura según la norma INVIMA (Res. 2674 de 2013).
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-3">
          <div class="w-11 h-11 rounded-xl bg-[#d5ee76]/50 text-[#123d32] flex items-center justify-center font-extrabold text-base">
            2
          </div>
          <h3 class="font-bold text-base text-[#00261e]">Recogida en vehículo refrigerado</h3>
          <p class="text-xs text-[#414845] leading-relaxed">
            Una fundación cercana solicita el alimento (o el restaurante se lo asigna) y el vehículo refrigerado lo recoge cuidando la cadena de frío en todo el Valle de Aburrá.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-3">
          <div class="w-11 h-11 rounded-xl bg-[#d5ee76]/50 text-[#123d32] flex items-center justify-center font-extrabold text-base">
            3
          </div>
          <h3 class="font-bold text-base text-[#00261e]">Entrega en comedor y Acta DIAN</h3>
          <p class="text-xs text-[#414845] leading-relaxed">
            El comedor social verifica el peso en báscula y la temperatura al recibir, distribuye las raciones a las familias y emite el Certificado de Donación (Art. 125 E.T.).
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
}
