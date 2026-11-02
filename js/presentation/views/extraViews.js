/**
 * Presentation Layer - Extra Views
 * Pantallas completas adaptadas fielmente desde los diseños de Stitch
 */

import { repository } from '../../data/repository.js';
import { ImpactoUseCase } from '../../core/useCases.js';

// 1. IMPACTO COMPLETO DE STITCH
export function renderImpacto() {
  const metricas = repository.getMetricasResumen();
  const imp = ImpactoUseCase.calcularMetricas(metricas.kgRecuperados);

  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <!-- Sub-header Breadcrumb & Canvas Controls -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
      <div class="flex flex-col gap-1 max-w-2xl">
        <div class="inline-flex items-center gap-2 self-start">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-wider text-[#546500]">
            Impacto Colectivo · Valle de Aburrá · Datos de Demostración
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
          <span>Bimestre actual (Sep - Oct 2026)</span>
          <span class="material-symbols-outlined text-[16px] text-[#717975]">expand_more</span>
        </div>
        <button onclick="alert('Generando Reporte Oficial de Impacto Re-Food en PDF...')" class="flex items-center gap-2 bg-[#123d32] text-white px-4 py-2.5 rounded-xl hover:bg-[#0c2821] transition-all shadow-sm text-xs font-semibold">
          <span class="material-symbols-outlined text-[18px] text-[#d5ee76]">file_download</span>
          <span>Reporte de Impacto (PDF)</span>
        </button>
      </div>
    </div>

    <!-- Section 1: 4 Main KPI Cards de Stitch -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <span class="text-xs text-[#717975] uppercase tracking-wider font-bold">Kilogramos entregados</span>
          <div class="w-10 h-10 rounded-xl bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[22px]">scale</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-baseline gap-1.5">
            <span class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">284,5</span>
            <span class="text-base text-[#00261e] font-semibold">kg</span>
          </div>
          <div class="flex items-center gap-1 mt-1 text-[#546500] text-xs font-semibold">
            <span class="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+48,2 kg este mes · Pesaje certificado en muelle</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <span class="text-xs text-[#717975] uppercase tracking-wider font-bold">Donaciones completadas</span>
          <div class="w-10 h-10 rounded-xl bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[22px]">verified</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-baseline gap-1.5">
            <span class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">18</span>
            <span class="text-base text-[#414845] font-semibold">despachos</span>
          </div>
          <div class="flex items-center gap-1 mt-1 text-[#414845] text-xs">
            <span class="material-symbols-outlined text-[16px] text-[#546500]">task_alt</span>
            <span>100% trazabilidad confirmada con actas DIAN</span>
          </div>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <span class="text-xs text-[#717975] uppercase tracking-wider font-bold">Organizaciones receptoras</span>
          <div class="w-10 h-10 rounded-xl bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[22px]">hub</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="flex items-baseline gap-1.5">
            <span class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">6</span>
            <span class="text-base text-[#414845] font-semibold">sedes activas</span>
          </div>
          <div class="flex items-center gap-1 mt-1 text-[#414845] text-xs">
            <span class="material-symbols-outlined text-[16px] text-[#717975]">location_on</span>
            <span>En Medellín, Envigado e Itagüí</span>
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
            <span class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">94,8%</span>
            <span class="text-base text-[#546500] font-bold">eficiencia</span>
          </div>
          <div class="flex items-center gap-1 mt-1 text-[#414845] text-xs">
            <span class="material-symbols-outlined text-[16px] text-[#717975]">info</span>
            <span>Solo 5,2% cancelado por límite biológico</span>
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
                <p class="text-sm font-bold text-[#00261e]">711 Raciones Servidas</p>
                <p class="text-xs text-[#717975]">Platos balanceados entregados en comedores comunitarios</p>
              </div>
            </div>
            <span class="text-xs font-bold text-[#546500] bg-white px-2.5 py-1 rounded-lg border border-[#e8e9e2]">2.5 raciones / kg</span>
          </div>

          <div class="flex items-center justify-between p-3.5 bg-[#f4f4ed] rounded-xl">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-[#123d32] text-[24px]">diversity_1</span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">~240 Familias Beneficiadas</p>
                <p class="text-xs text-[#717975]">Cobertura en Comuna 10 (La Candelaria), Manrique y Santo Domingo</p>
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
                <p class="text-sm font-bold text-[#00261e]">625,9 kg CO₂e Evitados</p>
                <p class="text-xs text-[#717975]">Menor emisión de gas metano en el Relleno La Pradera</p>
              </div>
            </div>
            <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">2.2 kg CO₂ / kg</span>
          </div>

          <div class="flex items-center justify-between p-3.5 bg-[#f4f4ed] rounded-xl">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-blue-700 text-[24px]">water_drop</span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">128.025 Litros de Agua Protegidos</p>
                <p class="text-xs text-[#717975]">Huella hídrica de producción agrícola conservada</p>
              </div>
            </div>
            <span class="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">450 L / kg</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// 2. DETALLE BANCO DE ALIMENTOS COMPLETO DE STITCH
export function renderDetalleBanco() {
  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div class="flex items-center gap-2 text-[#414845] text-xs">
        <a class="inline-flex items-center gap-1.5 text-[#00261e] hover:text-[#123d32] font-semibold transition-colors group" href="#organizaciones">
          <span class="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
          <span>Volver a organizaciones</span>
        </a>
        <span class="text-[#c0c8c4]">/</span>
        <span class="text-[#717975] uppercase tracking-wider">Directorio AMVA</span>
        <span class="text-[#c0c8c4]">/</span>
        <span class="text-[#546500] font-semibold">Banco de Alimentos de Medellín</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e8e9e2] text-[#00261e] text-xs font-semibold shadow-xs">
          <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
          ENTIDAD VERIFICADA INVIMA • DIAN ART. 125
        </span>
      </div>
    </div>

    <section class="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e8e9e2] flex flex-col lg:flex-row lg:items-start justify-between gap-6 relative overflow-hidden">
      <div class="flex flex-col sm:flex-row gap-5 items-start min-w-0 z-10">
        <div class="relative shrink-0">
          <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#123d32] text-white flex flex-col items-center justify-center shadow-md relative overflow-hidden">
            <span class="text-3xl font-extrabold tracking-tight text-[#d5ee76]">BA</span>
            <span class="text-[9px] uppercase tracking-widest text-[#a4d0c0] font-semibold">Medellín</span>
            <div class="absolute bottom-0 inset-x-0 h-1 bg-[#d5ee76]"></div>
          </div>
          <span class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#d5ee76] text-[#171e00] flex items-center justify-center shadow">
            <span class="material-symbols-outlined text-[16px] font-bold">verified</span>
          </span>
        </div>

        <div class="flex flex-col gap-2 min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-full bg-[#eeeee7] text-[#414845] text-xs font-semibold">
              Banco de alimentos (ESAL sin ánimo de lucro)
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eeeee7] text-[#414845] text-xs">
              <span class="material-symbols-outlined text-[14px] text-[#123d32]">location_on</span>
              Medellín · Comuna 10 (La Candelaria) / Barrio Colombia
            </span>
          </div>
          <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">
            Banco de Alimentos de Medellín
          </h1>
          <p class="text-sm text-[#414845] max-w-3xl leading-relaxed">
            Centro metropolitano de acopio, verificación bromatológica y redistribución a gran escala para comedores comunitarios, hogares infantiles y población vulnerable del Valle de Aburrá.
          </p>

          <div class="flex flex-wrap items-center gap-2 pt-1">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f4ed] text-[#00261e] text-xs font-semibold">
              <span class="w-2.5 h-2.5 rounded-full bg-[#546500] animate-pulse"></span>
              Recepción activa hoy (07:00 – 18:00)
            </span>
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f4f4ed] text-[#414845] text-xs">
              <span class="material-symbols-outlined text-[15px] text-[#546500]">pace</span>
              ~25 min de aceptación promedio
            </span>
            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f4f4ed] text-[#414845] text-xs">
              <span class="material-symbols-outlined text-[15px] text-[#123d32]">local_shipping</span>
              3 Flotas refrigeradas RE-FOOD
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2.5 shrink-0 z-10 w-full lg:w-auto">
        <button onclick="window.navigate('publicar')" class="h-11 px-5 rounded-xl bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
          <span class="material-symbols-outlined text-[18px]">rule</span>
          <span>Programar Entrega a este Banco</span>
        </button>
        <button onclick="alert('Certificado DIAN Art. 125: Entidad autorizada para emitir certificados de donación deducibles del impuesto sobre la renta.')" class="h-11 px-5 rounded-xl bg-[#eeeee7] text-[#00261e] hover:bg-[#e8e9e2] text-xs font-bold flex items-center justify-center gap-2 transition-all">
          <span class="material-symbols-outlined text-[18px] text-[#546500]">workspace_premium</span>
          <span>Certificado DIAN Art. 125</span>
        </button>
      </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-2xl p-5 border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between text-[#717975]">
          <span class="text-xs uppercase tracking-wider font-bold">Capacidad frigorífica</span>
          <div class="w-8 h-8 rounded-lg bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[18px]">ac_unit</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">1.200</span>
            <span class="text-sm font-semibold text-[#414845]">kg</span>
          </div>
          <p class="text-xs text-[#414845] mt-1">Cámaras 0°C a 4°C y congelador -18°C</p>
        </div>
        <div class="w-full bg-[#eeeee7] rounded-full h-1.5 overflow-hidden">
          <div class="bg-[#546500] h-full rounded-full" style="width: 62%;"></div>
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
            <span class="text-3xl font-extrabold text-[#00261e]">~3.500</span>
            <span class="text-sm font-semibold text-[#414845]">pers/día</span>
          </div>
          <p class="text-xs text-[#414845] mt-1">82 comedores aliados en el AMVA</p>
        </div>
        <div class="flex items-center gap-1.5 text-[#546500] text-xs font-semibold">
          <span class="material-symbols-outlined text-[15px]">nest_multi_room</span>
          <span>Cobertura en 7 municipios</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between text-[#717975]">
          <span class="text-xs uppercase tracking-wider font-bold">Tiempo de Recepción</span>
          <div class="w-8 h-8 rounded-lg bg-[#eeeee7] flex items-center justify-center text-[#123d32]">
            <span class="material-symbols-outlined text-[18px]">schedule</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">~25</span>
            <span class="text-sm font-semibold text-[#414845]">minutos</span>
          </div>
          <p class="text-xs text-[#414845] mt-1">Descarga ágil con muelles independientes</p>
        </div>
        <div class="flex items-center gap-1.5 text-[#123d32] text-xs font-semibold">
          <span class="material-symbols-outlined text-[15px]">speed</span>
          <span>Proceso prioritario Re-Food</span>
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
          <span class="text-xl font-extrabold text-[#00261e] block">HACCP Nivel 4</span>
          <p class="text-xs text-[#414845] mt-1">Laboratorio de microbiología propio</p>
        </div>
        <div class="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
          <span class="material-symbols-outlined text-[15px]">verified</span>
          <span>Concepto Favorable INVIMA</span>
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
            Lo que las organizaciones sociales necesitan saber para recibir tu comida con total certeza, trazabilidad y dignidad bromatológica.
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

// 4. RUTA LOGÍSTICA COMPLETA DE STITCH
export function renderRutaLogistica() {
  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Cadena de Custodia</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">Ruta Logística: Provenza a Banco de Alimentos</h1>
        <p class="text-sm text-[#414845] mt-1">Seguimiento en tiempo real de la furgoneta isotérmica Re-Food #4 en el corredor Medellín Sur.</p>
      </div>

      <div class="px-4 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold flex items-center gap-2 shadow-xs">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
        <span>Vehículo en Tránsito (ETA: 18 min)</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div class="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 border border-[#e8e9e2] shadow-sm flex flex-col gap-6">
        <div class="relative w-full h-72 bg-[#eeeee7] rounded-2xl overflow-hidden flex items-center justify-center border border-[#e3e3dc]">
          <div class="absolute inset-0 opacity-40 bg-[radial-gradient(#123d32_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div class="relative z-10 flex flex-col items-center gap-3 text-center p-4">
            <div class="w-14 h-14 rounded-2xl bg-[#123d32] text-[#d5ee76] flex items-center justify-center shadow-lg animate-bounce">
              <span class="material-symbols-outlined text-[32px]">local_shipping</span>
            </div>
            <div class="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-[#e8e9e2] flex flex-col gap-1">
              <span class="text-xs font-bold text-[#00261e] uppercase tracking-wider">
                Av. El Poblado → Calle 29 (Barrio Colombia)
              </span>
              <span class="text-xs text-[#546500] font-semibold">Temperatura en cabina: 4.2°C (Cadena de frío estable)</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="text-xs font-bold text-[#717975] uppercase tracking-wider">Hitos y Trazabilidad de la Ruta</h3>
          <div class="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#eeeee7]">
            <div class="flex items-start gap-4 relative">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">14:15 - Recogida en Provenza Bistro & Café</p>
                <p class="text-xs text-[#717975]">Lote RF-8492 entregado y verificado en temperatura (62°C en baño maría).</p>
              </div>
            </div>
            <div class="flex items-start gap-4 relative">
              <span class="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0 animate-pulse">2</span>
              <div>
                <p class="text-sm font-bold text-[#00261e]">14:40 - En tránsito por Calle 10 con Av. Las Vegas</p>
                <p class="text-xs text-[#717975]">Tráfico moderado. Tiempo estimado de arribo: 18 minutos.</p>
              </div>
            </div>
            <div class="flex items-start gap-4 relative">
              <span class="w-6 h-6 rounded-full bg-[#c0c8c4] text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
              <div>
                <p class="text-sm font-bold text-[#717975]">15:00 - Entrega programada en Banco de Alimentos</p>
                <p class="text-xs text-[#717975]">Recepción en muelle #2, verificación bromatológica y firma de acta digital.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 flex flex-col gap-5">
        <div class="bg-white rounded-2xl p-6 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
          <h3 class="text-xs font-bold uppercase tracking-widest text-[#717975]">Unidad de Transporte</h3>
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-[#d5ee76]/40 text-[#123d32] flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-[28px]">electric_moped</span>
            </div>
            <div>
              <p class="font-bold text-sm text-[#00261e]">Furgón Isotérmico Eco-04</p>
              <p class="text-xs text-[#546500] font-semibold">Placas: KLO-892</p>
            </div>
          </div>
          <div class="text-xs text-[#414845] space-y-2 pt-2 border-t border-[#f4f4ed]">
            <div class="flex justify-between">
              <span>Conductor certificado:</span>
              <span class="font-bold text-[#1a1c18]">Carlos Mario Restrepo</span>
            </div>
            <div class="flex justify-between">
              <span>Carné Manipulación:</span>
              <span class="font-bold text-emerald-700">Vigente 2026</span>
            </div>
            <div class="flex justify-between">
              <span>Contacto operativo:</span>
              <span class="font-bold text-[#123d32]">+57 312 450 9912</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// 5. DETALLE DE DONACIÓN RF-8492
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
          <p class="text-sm text-[#414845] mt-1">Donado por ${item.establecimiento} para ${item.organizacionDestino || 'Banco de Alimentos'}.</p>
        </div>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <button onclick="window.navigate('publicar?edit=${item.id}')" class="px-4 py-2.5 bg-white border border-[#c0c8c4] hover:bg-[#fafaf3] text-[#1a1c18] rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs">
          <span class="material-symbols-outlined text-[16px]">edit</span>
          <span>Editar Lote</span>
        </button>
        <button onclick="window.navigate('ruta-logistica')" class="px-5 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md">
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
        <span class="text-xs text-[#717975]">Hash SHA-256 de trazabilidad</span>
      </div>
    </div>
  </div>
  `;
}

// 6. NOTIFICACIONES & PERFIL COMPLETO DE STITCH
export function renderNotificaciones() {
  const notifs = repository.getNotificaciones();

  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <div>
      <span class="text-xs font-bold uppercase tracking-widest text-[#546500]">Cuenta de Donante</span>
      <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Centro de Notificaciones y Perfil</h1>
      <p class="text-sm text-[#414845] mt-1">Provenza Bistro & Café · NIT: 901.442.819-2 · Sede El Poblado</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-3">
          <h3 class="text-base font-bold text-[#00261e]">Notificaciones del Sistema</h3>
          <span class="text-xs text-[#546500] font-semibold">${notifs.length} registradas</span>
        </div>
        <div class="divide-y divide-[#eeeee7]">
          ${notifs.map(n => `
          <div class="py-3.5 flex items-start gap-3">
            <span class="material-symbols-outlined text-[#123d32] text-[22px] p-2 rounded-xl bg-[#d5ee76]/30">notifications_active</span>
            <div class="flex-1">
              <h4 class="text-sm font-bold text-[#00261e]">${n.titulo}</h4>
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
          <h3 class="font-bold text-lg text-[#00261e]">Provenza Bistro & Café</h3>
          <p class="text-xs text-[#546500] font-semibold">Establecimiento Donante Certificado Oro</p>
        </div>
        <div class="text-xs text-[#414845] space-y-2 pt-2 border-t border-[#f4f4ed]">
          <div class="flex justify-between">
            <span>Ubicación:</span>
            <span class="font-semibold text-[#1a1c18]">Cra 35 # 8A-42, El Poblado</span>
          </div>
          <div class="flex justify-between">
            <span>Responsable:</span>
            <span class="font-semibold text-[#1a1c18]">Chef Andrés Gómez</span>
          </div>
          <div class="flex justify-between">
            <span>Lotes donados:</span>
            <span class="font-bold text-[#123d32]">${repository.getExcedentes().length} lotes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// 7. CONFIGURACIÓN COMPLETA DE STITCH CON TABS INTERACTIVOS
export function renderConfiguracion() {
  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-md flex flex-col gap-6">
    <!-- Feedback Toast Flotante -->
    <div id="save-toast" class="hidden fixed top-20 right-8 z-50 flex items-center gap-3 bg-[#00261e] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#d5ee76]/40">
      <span class="material-symbols-outlined text-[22px] text-[#d5ee76]">check_circle</span>
      <div class="flex flex-col">
        <span class="text-xs font-bold text-white">Cambios actualizados</span>
        <span class="text-[11px] text-[#a4d0c0]">Sincronizado con el nodo central Aburrá Sur</span>
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
          Administra el perfil de tu restaurante, puntos de recogida logística en el Valle de Aburrá, alertas operativas y credenciales de acceso.
        </p>
      </div>

      <!-- Quick Status Metric Pill -->
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

    <!-- Navigation Tabs de Stitch -->
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
    <div id="config-tab-perfil" class="config-tab-pane flex flex-col gap-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div class="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#e8e9e2] shadow-sm flex flex-col gap-4 text-center items-center">
          <div class="w-24 h-24 rounded-2xl bg-[#123d32] text-[#d5ee76] font-extrabold text-3xl flex items-center justify-center shadow-md">
            PB
          </div>
          <div>
            <h3 class="font-extrabold text-lg text-[#00261e]">Provenza Bistro & Café</h3>
            <span class="text-xs text-[#546500] font-semibold">El Poblado · Medellín</span>
          </div>
          <button onclick="alert('Opción para actualizar imagen corporativa.');" class="w-full py-2 bg-[#f4f4ed] hover:bg-[#eeeee7] text-[#00261e] rounded-xl text-xs font-semibold border border-[#e3e3dc] transition-colors">
            Cambiar Imagen Corporativa
          </button>
        </div>

        <div class="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
          <h3 class="text-base font-bold text-[#00261e] border-b border-[#f4f4ed] pb-3">Información Legal y Comercial</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">Razón Social</label>
              <input type="text" value="Provenza Gastronomía S.A.S." class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18]" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">NIT</label>
              <input type="text" value="901.442.819-2" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18]" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">Dirección Principal</label>
              <input type="text" value="Carrera 35 # 8A-42, El Poblado" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18]" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold uppercase text-[#717975]">Municipio</label>
              <input type="text" value="Medellín (Antioquia)" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18]" />
            </div>
          </div>
          <button onclick="window.triggerSaveConfig()" class="self-end px-6 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-semibold rounded-xl transition-all shadow-sm mt-2">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido Tab 2: Notificaciones -->
    <div id="config-tab-notificaciones" class="config-tab-pane hidden flex flex-col gap-6">
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e9e2] shadow-sm max-w-3xl flex flex-col gap-5">
        <h3 class="text-base font-bold text-[#00261e] border-b border-[#f4f4ed] pb-3">Canales de Alerta Operativa</h3>
        <div class="flex items-center justify-between pb-3 border-b border-[#f4f4ed]">
          <div>
            <h4 class="text-sm font-bold text-[#00261e]">Alertas de WhatsApp en Tiempo Real</h4>
            <p class="text-xs text-[#717975]">Notificar al jefe de cocina cuando la furgoneta isotérmica esté a 10 minutos.</p>
          </div>
          <input type="checkbox" checked class="w-5 h-5 accent-[#123d32] cursor-pointer" />
        </div>
        <div class="flex items-center justify-between pb-3 border-b border-[#f4f4ed]">
          <div>
            <h4 class="text-sm font-bold text-[#00261e]">Emisión Automática de Certificados DIAN</h4>
            <p class="text-xs text-[#717975]">Enviar PDF deducible del impuesto de renta al correo contable.</p>
          </div>
          <input type="checkbox" checked class="w-5 h-5 accent-[#123d32] cursor-pointer" />
        </div>
        <button onclick="window.triggerSaveConfig()" class="self-end px-6 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-semibold rounded-xl transition-all shadow-sm">
          Actualizar Notificaciones
        </button>
      </div>
    </div>

    <!-- Contenido Tab 3: Horarios y Logística -->
    <div id="config-tab-logistica" class="config-tab-pane hidden flex flex-col gap-6">
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e9e2] shadow-sm max-w-3xl flex flex-col gap-5">
        <h3 class="text-base font-bold text-[#00261e] border-b border-[#f4f4ed] pb-3">Ventanas de Recogida y Cierre</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold uppercase text-[#717975]">Hora habitual de recogida nocturna</label>
            <input type="time" value="22:30" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold uppercase text-[#717975]">Punto de entrega en el local</label>
            <input type="text" value="Muelle de descargue calle 8A" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18]" />
          </div>
        </div>
        <button onclick="window.triggerSaveConfig()" class="self-end px-6 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-semibold rounded-xl transition-all shadow-sm">
          Guardar Ventana Logística
        </button>
      </div>
    </div>
  </div>
  `;
}

window.switchConfigTab = function(tabName, btnElement) {
  const tabs = document.querySelectorAll('.config-tab-btn');
  tabs.forEach(t => t.className = "config-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-[#414845] hover:bg-[#eeeee7] transition-all");
  btnElement.className = "config-tab-btn active px-4 py-2 rounded-xl text-xs font-bold bg-[#123d32] text-white transition-all shadow-xs";

  const panes = document.querySelectorAll('.config-tab-pane');
  panes.forEach(p => p.classList.add('hidden'));

  const target = document.getElementById(`config-tab-${tabName}`);
  if (target) target.classList.remove('hidden');
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

// 8. LANDING INSTITUCIONAL
export function renderLanding() {
  return `
  <div class="max-w-[1440px] w-full mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-10">
    <div class="text-center max-w-3xl mx-auto flex flex-col items-center gap-4 pt-4">
      <span class="px-3.5 py-1.5 rounded-full bg-[#d5ee76]/50 text-[#171e00] text-xs font-bold uppercase tracking-widest border border-[#b9d15d]">
        Red Metropolitana de Economía Circular Alimentaria
      </span>
      <h1 class="text-4xl sm:text-5xl font-extrabold text-[#00261e] tracking-tight">
        Re-Food Valle de Aburrá
      </h1>
      <p class="text-base text-[#414845] leading-relaxed">
        Conectamos a hoteles, restaurantes y panaderías con comedores comunitarios para erradicar el desperdicio de comida y garantizar seguridad alimentaria en Medellín.
      </p>
      <div class="flex gap-3">
        <button onclick="window.navigate('resumen')" class="px-6 py-3 rounded-xl bg-[#00261e] text-white font-semibold text-sm hover:bg-[#123d32] shadow-md transition-all">
          Ir al Panel de Donante
        </button>
        <button onclick="window.navigate('publicar')" class="px-6 py-3 rounded-xl bg-[#d5ee76] text-[#171e00] font-semibold text-sm hover:bg-[#c2f362] transition-all">
          Publicar Donación
        </button>
      </div>
    </div>
  </div>
  `;
}
