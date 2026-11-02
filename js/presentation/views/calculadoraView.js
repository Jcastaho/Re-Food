/**
 * Presentation Layer - Calculadora de Inocuidad y Vida Útil
 */

import { InocuidadUseCase } from '../../core/useCases.js';

export function renderCalculadora() {
  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Herramienta Técnica</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Calculadora de Inocuidad y Vida Útil</h1>
        <p class="text-sm text-[#414845] mt-1">Evalúa en tiempo real si un excedente de comida es seguro para ser donado conforme a la Resolución 2674 de 2013 y lineamientos del INVIMA.</p>
      </div>

      <button onclick="window.navigate('guia-conservacion')" class="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-[#e8e9e2] text-xs font-semibold text-[#123d32] hover:bg-[#f4f4ed] transition-colors flex items-center gap-2 shadow-sm">
        <span class="material-symbols-outlined text-[18px]">menu_book</span>
        <span>Ver Guía de Conservación</span>
      </button>
    </div>

    <!-- Calculadora Interfaz a 2 Columnas -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Controles de Entrada -->
      <div class="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(18,61,50,0.03)] border border-[#e8e9e2] flex flex-col gap-6">
        <h2 class="text-base font-bold text-[#00261e] border-b border-[#f4f4ed] pb-3 flex items-center gap-2">
          <span class="material-symbols-outlined text-[#546500]">tune</span>
          <span>Parámetros del Alimento</span>
        </h2>

        <!-- 1. Tipo de Alimento -->
        <div class="flex flex-col gap-2">
          <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Tipo de Alimento</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2" id="calc-tipo-container">
            <button type="button" onclick="window.selectCalcTipo('Proteínas cocidas')" class="calc-tipo-btn p-3 rounded-xl border border-[#00261e] bg-[#00261e] text-white text-xs font-semibold text-center flex flex-col items-center gap-1.5 transition-all">
              <span class="material-symbols-outlined text-[20px]">dinner_dining</span>
              <span>Proteínas cocidas</span>
            </button>
            <button type="button" onclick="window.selectCalcTipo('Cereales y preparados')" class="calc-tipo-btn p-3 rounded-xl border border-[#c0c8c4] bg-white text-[#1a1c18] text-xs font-semibold text-center flex flex-col items-center gap-1.5 hover:bg-[#f4f4ed] transition-all">
              <span class="material-symbols-outlined text-[20px]">rice_bowl</span>
              <span>Cereales y arroces</span>
            </button>
            <button type="button" onclick="window.selectCalcTipo('Panadería y secos')" class="calc-tipo-btn p-3 rounded-xl border border-[#c0c8c4] bg-white text-[#1a1c18] text-xs font-semibold text-center flex flex-col items-center gap-1.5 hover:bg-[#f4f4ed] transition-all">
              <span class="material-symbols-outlined text-[20px]">bakery_dining</span>
              <span>Panadería / Secos</span>
            </button>
            <button type="button" onclick="window.selectCalcTipo('Frutas y verduras')" class="calc-tipo-btn p-3 rounded-xl border border-[#c0c8c4] bg-white text-[#1a1c18] text-xs font-semibold text-center flex flex-col items-center gap-1.5 hover:bg-[#f4f4ed] transition-all">
              <span class="material-symbols-outlined text-[20px]">nutrition</span>
              <span>Frutas y verduras</span>
            </button>
            <button type="button" onclick="window.selectCalcTipo('Lácteos')" class="calc-tipo-btn p-3 rounded-xl border border-[#c0c8c4] bg-white text-[#1a1c18] text-xs font-semibold text-center flex flex-col items-center gap-1.5 hover:bg-[#f4f4ed] transition-all">
              <span class="material-symbols-outlined text-[20px]">egg_alt</span>
              <span>Lácteos y salsas</span>
            </button>
          </div>
        </div>

        <!-- 2. Temperatura Actual -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Temperatura de Mantenimiento (°C)</label>
            <span class="text-sm font-extrabold text-[#00261e]" id="calc-temp-val">22 °C</span>
          </div>
          <input type="range" id="calc-temp-slider" min="-20" max="80" value="22" oninput="window.calcTempChanged(this.value)" class="w-full h-2 bg-[#eeeee7] rounded-lg appearance-none cursor-pointer accent-[#123d32]" />
          <div class="flex justify-between text-[11px] text-[#717975]">
            <span>-20°C (Congelación)</span>
            <span>4°C (Refrig.)</span>
            <span>22°C (Ambiente)</span>
            <span>60°C (Seguro caliente)</span>
          </div>
        </div>

        <!-- 3. Horas desde preparación -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Tiempo transcurrido desde preparación</label>
            <span class="text-sm font-extrabold text-[#00261e]" id="calc-horas-val">2 horas</span>
          </div>
          <input type="range" id="calc-horas-slider" min="0" max="48" value="2" oninput="window.calcHorasChanged(this.value)" class="w-full h-2 bg-[#eeeee7] rounded-lg appearance-none cursor-pointer accent-[#123d32]" />
          <div class="flex justify-between text-[11px] text-[#717975]">
            <span>0h (Recién preparado)</span>
            <span>4h (Límite ambiente)</span>
            <span>24h</span>
            <span>48h</span>
          </div>
        </div>
      </div>

      <!-- Resultados / Semáforo de Inocuidad -->
      <div class="lg:col-span-5 flex flex-col gap-5">
        <div id="calc-result-card" class="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_16px_rgba(18,61,50,0.03)] border-2 border-emerald-500 flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Resultado Técnico</span>
            <span id="calc-badge" class="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              SEGURO Y APTO
            </span>
          </div>

          <div class="flex items-center gap-4 my-2">
            <div id="calc-icon-bg" class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <span id="calc-icon" class="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <div>
              <span class="text-xs text-[#717975] uppercase font-bold">Vida Útil Restante</span>
              <p class="text-3xl font-extrabold text-[#00261e]" id="calc-vida-util">10 horas</p>
              <span class="text-xs text-[#546500] font-semibold" id="calc-ventana">Ventana óptima para rescate</span>
            </div>
          </div>

          <p class="text-xs text-[#414845] leading-relaxed p-3.5 bg-[#f4f4ed] rounded-xl border border-[#e8e9e2]" id="calc-dictamen">
            El alimento se encuentra dentro de parámetros térmicos estables. Proceder con empaque hermético y despacho inmediato hacia la fundación asignada.
          </p>

          <button type="button" onclick="window.donarDesdeCalculadora()" class="w-full py-3 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md">
            <span>Donar este excedente con estos parámetros</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div class="bg-[#123d32] text-white p-5 rounded-2xl flex flex-col gap-2">
          <div class="flex items-center gap-2 text-[#d5ee76]">
            <span class="material-symbols-outlined text-[18px]">gavel</span>
            <span class="text-xs font-bold uppercase tracking-wider">Marco Normativo</span>
          </div>
          <p class="text-xs text-[#bfecdc] leading-relaxed">
            Ley 1990 de 2019 de Política contra el Desperdicio de Alimentos en Colombia. Los alimentos donados deben garantizar trazabilidad higiénico-sanitaria.
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
}

let currentTipo = 'Proteínas cocidas';
let currentTemp = 22;
let currentHoras = 2;

window.selectCalcTipo = function(tipo) {
  currentTipo = tipo;
  const btns = document.querySelectorAll('.calc-tipo-btn');
  btns.forEach(b => {
    b.className = "calc-tipo-btn p-3 rounded-xl border border-[#c0c8c4] bg-white text-[#1a1c18] text-xs font-semibold text-center flex flex-col items-center gap-1.5 hover:bg-[#f4f4ed] transition-all";
  });
  event.currentTarget.className = "calc-tipo-btn p-3 rounded-xl border border-[#00261e] bg-[#00261e] text-white text-xs font-semibold text-center flex flex-col items-center gap-1.5 transition-all";
  recalcular();
};

window.calcTempChanged = function(val) {
  currentTemp = parseFloat(val);
  const label = document.getElementById('calc-temp-val');
  if (label) label.textContent = `${val} °C`;
  recalcular();
};

window.calcHorasChanged = function(val) {
  currentHoras = parseFloat(val);
  const label = document.getElementById('calc-horas-val');
  if (label) label.textContent = `${val} horas`;
  recalcular();
};

function recalcular() {
  const res = InocuidadUseCase.evaluarRiesgo(currentTipo, currentTemp, currentHoras);
  const card = document.getElementById('calc-result-card');
  const badge = document.getElementById('calc-badge');
  const iconBg = document.getElementById('calc-icon-bg');
  const icon = document.getElementById('calc-icon');
  const vidaUtil = document.getElementById('calc-vida-util');
  const dictamen = document.getElementById('calc-dictamen');
  const ventana = document.getElementById('calc-ventana');

  if (!card) return;

  if (res.nivel === 'RiesgoCritico') {
    card.className = "bg-white rounded-2xl p-6 sm:p-7 shadow-md border-2 border-rose-500 flex flex-col gap-4";
    badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800";
    badge.textContent = "RIESGO CRÍTICO - NO APTO";
    iconBg.className = "w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0";
    icon.textContent = "dangerous";
    vidaUtil.textContent = "0 horas";
    ventana.textContent = "Cadena de inocuidad comprometida";
    dictamen.textContent = res.mensaje;
  } else if (res.nivel === 'Precaucion') {
    card.className = "bg-white rounded-2xl p-6 sm:p-7 shadow-md border-2 border-amber-500 flex flex-col gap-4";
    badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800";
    badge.textContent = "PRECAUCIÓN - REFRIGERAR YA";
    iconBg.className = "w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0";
    icon.textContent = "warning";
    vidaUtil.textContent = `${res.vidaUtilRestanteHoras} horas`;
    ventana.textContent = "Requiere entrega urgente";
    dictamen.textContent = res.mensaje;
  } else {
    card.className = "bg-white rounded-2xl p-6 sm:p-7 shadow-md border-2 border-emerald-500 flex flex-col gap-4";
    badge.className = "px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800";
    badge.textContent = "SEGURO Y APTO";
    iconBg.className = "w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0";
    icon.textContent = "check_circle";
    vidaUtil.textContent = `${res.vidaUtilRestanteHoras} horas`;
    ventana.textContent = "Ventana óptima para rescate";
    dictamen.textContent = res.mensaje;
  }
}

window.donarDesdeCalculadora = function() {
  let tempLabel = 'Ambiente (20°C)';
  if (currentTemp > 50) tempLabel = 'En caliente (>60°C)';
  else if (currentTemp <= 5 && currentTemp > -10) tempLabel = 'Refrigerado (4°C)';
  else if (currentTemp <= -10) tempLabel = 'Congelado (-18°C)';

  const params = new URLSearchParams({
    categoria: currentTipo,
    temp: tempLabel
  });

  window.navigate(`publicar?${params.toString()}`);
};
