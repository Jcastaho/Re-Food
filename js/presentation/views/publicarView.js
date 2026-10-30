/**
 * Presentation Layer - Publicar Excedente View
 * Formulario interactivo con Clean Architecture para registrar alimentos
 */

import { repository } from '../../data/repository.js';
import { InocuidadUseCase } from '../../core/useCases.js';

export function renderPublicar() {
  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <!-- Breadcrumb e Indicador de Estado -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5ee76]/40 text-[#171e00] text-xs font-bold uppercase tracking-wider border border-[#b9d15d]/50">
          <span class="w-2 h-2 rounded-full bg-[#546500] animate-pulse"></span>
          Nueva Publicación · Red de Rescate Alimentario
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#e8e9e2] text-[#414845] text-xs font-medium">
          Valle de Aburrá
        </span>
      </div>

      <!-- Simulador de Estado (de Stitch) -->
      <div class="inline-flex items-center p-1 rounded-xl bg-[#eeeee7] gap-1 shadow-sm self-start md:self-auto border border-[#e3e3dc]">
        <button class="state-tab-btn px-3 py-1.5 rounded-lg text-white bg-[#00261e] text-xs font-semibold transition-all shadow-sm" id="btn-state-active" onclick="window.setFormState('active')" type="button">
          Formulario Activo
        </button>
        <button class="state-tab-btn px-3 py-1.5 rounded-lg text-[#414845] hover:text-[#1a1c18] text-xs font-semibold transition-all" id="btn-state-submitting" onclick="window.setFormState('submitting')" type="button">
          Validando
        </button>
        <button class="state-tab-btn px-3 py-1.5 rounded-lg text-[#414845] hover:text-[#1a1c18] text-xs font-semibold transition-all" id="btn-state-success" onclick="window.setFormState('success')" type="button">
          Éxito: Publicado
        </button>
      </div>
    </div>

    <!-- Editorial Headline -->
    <div class="max-w-4xl">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight leading-tight">
        Dale una segunda oportunidad a tus alimentos
      </h1>
      <p class="text-[#414845] mt-2 text-base max-w-2xl leading-relaxed">
        Cuéntanos qué tienes disponible en tu establecimiento y te ayudaremos a conectarlo con comedores comunitarios y fundaciones aliadas en el Valle de Aburrá antes de que pierda su valor nutricional.
      </p>
    </div>

    <!-- Banner de Notificación de Validación (oculto por defecto) -->
    <div class="hidden p-4 rounded-xl bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/20 flex items-start justify-between gap-3 shadow-sm" id="validation-error-banner">
      <div class="flex items-start gap-2">
        <span class="material-symbols-outlined text-[22px] shrink-0 text-[#ba1a1a]">report</span>
        <div>
          <p class="text-sm font-bold">Por favor verifica los campos obligatorios</p>
          <p class="text-xs mt-0.5" id="error-message-text">El peso debe ser mayor a 0,5 kg y se debe indicar el tipo de alimento.</p>
        </div>
      </div>
      <button class="p-1 rounded-lg hover:bg-black/5" onclick="document.getElementById('validation-error-banner').classList.add('hidden')">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>

    <!-- Estado Éxito (Oculto por defecto) -->
    <div class="hidden p-6 rounded-2xl bg-[#d5ee76]/40 border-2 border-[#546500] text-[#171e00] flex flex-col items-center text-center gap-3" id="success-banner">
      <div class="w-14 h-14 rounded-full bg-[#546500] text-white flex items-center justify-center">
        <span class="material-symbols-outlined text-[32px]">check_circle</span>
      </div>
      <h3 class="text-2xl font-bold text-[#00261e]">¡Excedente publicado exitosamente!</h3>
      <p class="text-sm max-w-md text-[#414845]">El lote ha sido registrado en la red logística del Valle de Aburrá. Las organizaciones receptoras más cercanas ya han sido notificadas.</p>
      <div class="flex gap-3 mt-2">
        <button onclick="window.navigate('mis-excedentes')" class="px-5 py-2.5 bg-[#00261e] text-white rounded-xl text-sm font-semibold hover:bg-[#123d32] transition-colors">
          Ver en Mis Excedentes
        </button>
        <button onclick="window.resetFormPublicar()" class="px-5 py-2.5 bg-white border border-[#c0c8c4] text-[#1a1c18] rounded-xl text-sm font-semibold hover:bg-[#fafaf3] transition-colors">
          Publicar otro lote
        </button>
      </div>
    </div>

    <!-- Formulario Principal -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="form-container">
      <!-- Columna Principal: Campos -->
      <div class="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_16px_rgba(18,61,50,0.04)] border border-[#e8e9e2] flex flex-col gap-6">
        <form id="form-publicar-excedente" onsubmit="window.handleFormSubmit(event)" class="flex flex-col gap-6">
          <!-- 1. Información del Alimento -->
          <div class="flex flex-col gap-4">
            <h2 class="text-base font-bold text-[#00261e] flex items-center gap-2 border-b border-[#f4f4ed] pb-2">
              <span class="w-6 h-6 rounded-full bg-[#123d32] text-white flex items-center justify-center text-xs font-bold">1</span>
              Descripción del lote
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5 sm:col-span-2">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Nombre o descripción del alimento *</label>
                <input required type="text" id="input-nombre" placeholder="Ej. Arroz chaufa con verduras salteadas, o Pan artesanal" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] focus:ring-2 focus:ring-[#123d32]/20 text-sm bg-white" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Categoría de alimento *</label>
                <select id="input-categoria" onchange="window.updateInocuidadPreview()" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white">
                  <option value="Cereales y preparados">Cereales y preparados</option>
                  <option value="Proteínas cocidas">Proteínas cocidas (carnes, pollo, pescado)</option>
                  <option value="Panadería y secos">Panadería y repostería</option>
                  <option value="Frutas y verduras">Frutas y verduras frescas</option>
                  <option value="Lácteos">Lácteos y derivados</option>
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Cantidad aproximada (kg) *</label>
                <div class="relative">
                  <input required type="number" step="0.5" min="0.5" id="input-peso" placeholder="10.5" oninput="window.updateInocuidadPreview()" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white pr-10" />
                  <span class="absolute right-3 top-2.5 text-xs text-[#717975] font-semibold">kg</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Condiciones Térmicas y Recogida -->
          <div class="flex flex-col gap-4">
            <h2 class="text-base font-bold text-[#00261e] flex items-center gap-2 border-b border-[#f4f4ed] pb-2">
              <span class="w-6 h-6 rounded-full bg-[#123d32] text-white flex items-center justify-center text-xs font-bold">2</span>
              Inocuidad y ventana de recogida
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Temperatura de conservación actual</label>
                <select id="input-temperatura" onchange="window.updateInocuidadPreview()" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white">
                  <option value="Ambiente (20°C)">Temperatura ambiente (aprox 20°C)</option>
                  <option value="Caliente (>60°C)">En caliente continuo (&gt;60°C en baño maría)</option>
                  <option value="Refrigerado (4°C)">Refrigerado (&lt;4°C)</option>
                  <option value="Congelado (-18°C)">Congelado (&lt;-18°C)</option>
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Hora límite recomendada de entrega</label>
                <input type="time" id="input-hora-limite" value="18:30" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white" />
              </div>

              <div class="flex flex-col gap-1.5 sm:col-span-2">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Notas de empaque o alérgenos (opcional)</label>
                <textarea id="input-notas" rows="2" placeholder="Ej. Empacado en bandejas de aluminio termoselladas. Contiene trazas de gluten." class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white resize-none"></textarea>
              </div>
            </div>
          </div>

          <!-- Botón Enviar -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#f4f4ed]">
            <button type="button" onclick="window.navigate('resumen')" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#414845] hover:bg-[#eeeee7] transition-colors">
              Cancelar
            </button>
            <button type="submit" id="btn-submit-form" class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#00261e] hover:bg-[#123d32] shadow-md hover:shadow-lg transition-all flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">publish</span>
              <span id="btn-submit-text">Publicar Excedente Inmediato</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Columna Lateral: Tarjeta Informativa de Inocuidad y Donante -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <!-- Tarjeta de Semáforo de Inocuidad -->
        <div class="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(18,61,50,0.03)] border border-[#e8e9e2] flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Diagnóstico de Inocuidad</span>
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          <div id="preview-inocuidad-box" class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col gap-2">
            <div class="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <span class="material-symbols-outlined text-[20px] text-emerald-600">verified_user</span>
              <span>Apto para distribución directa</span>
            </div>
            <p class="text-xs text-emerald-800 leading-relaxed" id="preview-inocuidad-desc">
              Cumple con los rangos térmicos seguros del Valle de Aburrá. Vida útil estimada: 6 a 12 horas.
            </p>
          </div>

          <div class="flex flex-col gap-2 text-xs text-[#717975] pt-2 border-t border-[#f4f4ed]">
            <div class="flex justify-between">
              <span>Establecimiento Donante:</span>
              <span class="font-bold text-[#1a1c18]">Provenza Bistro & Café</span>
            </div>
            <div class="flex justify-between">
              <span>Municipio de origen:</span>
              <span class="font-bold text-[#1a1c18]">Medellín (El Poblado)</span>
            </div>
            <div class="flex justify-between">
              <span>Red de transporte:</span>
              <span class="font-bold text-[#546500]">Ruta Logística Re-Food #2</span>
            </div>
          </div>
        </div>

        <!-- Protocolo Re-Food -->
        <div class="bg-[#00261e] text-white rounded-2xl p-6 shadow-md flex flex-col gap-3">
          <div class="flex items-center gap-2 text-[#d5ee76]">
            <span class="material-symbols-outlined text-[20px]">shield</span>
            <span class="text-xs uppercase font-bold tracking-wider">Protocolo de Rescate</span>
          </div>
          <p class="text-xs text-[#bfecdc] leading-relaxed">
            Cada lote publicado genera automáticamente un código de trazabilidad único vinculado a las guías de entrega del Banco de Alimentos de Medellín.
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
}

// Controladores para la vista de Publicar
window.updateInocuidadPreview = function() {
  const cat = document.getElementById('input-categoria')?.value || 'Cereales y preparados';
  const tempStr = document.getElementById('input-temperatura')?.value || '';
  const peso = parseFloat(document.getElementById('input-peso')?.value) || 0;

  let tempC = 20;
  if (tempStr.includes('60')) tempC = 62;
  else if (tempStr.includes('4°C')) tempC = 4;
  else if (tempStr.includes('-18')) tempC = -18;

  const resultado = InocuidadUseCase.evaluarRiesgo(cat, tempC, 1);
  const box = document.getElementById('preview-inocuidad-box');
  const desc = document.getElementById('preview-inocuidad-desc');

  if (box && desc) {
    if (resultado.nivel === 'RiesgoCritico') {
      box.className = "p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex flex-col gap-2";
      desc.textContent = resultado.mensaje;
    } else {
      box.className = "p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col gap-2";
      desc.textContent = `${resultado.mensaje} Vida útil estimada restante: ${resultado.vidaUtilRestanteHoras} horas.`;
    }
  }
};

window.handleFormSubmit = function(e) {
  e.preventDefault();
  const nombre = document.getElementById('input-nombre').value.trim();
  const categoria = document.getElementById('input-categoria').value;
  const cantidadKg = parseFloat(document.getElementById('input-peso').value);
  const temperatura = document.getElementById('input-temperatura').value;

  if (!nombre || !cantidadKg || cantidadKg < 0.5) {
    document.getElementById('validation-error-banner').classList.remove('hidden');
    return;
  }

  // Simular estado Validando
  window.setFormState('submitting');

  setTimeout(() => {
    // Clean Architecture: Usar repository
    repository.addExcedente({
      nombre,
      categoria,
      cantidadKg,
      temperatura,
      estado: 'Publicado'
    });

    // Cambiar a estado éxito
    window.setFormState('success');
  }, 700);
};

window.setFormState = function(state) {
  const tabs = document.querySelectorAll('.state-tab-btn');
  tabs.forEach(btn => {
    btn.className = "state-tab-btn px-3 py-1.5 rounded-lg text-[#414845] hover:text-[#1a1c18] text-xs font-semibold transition-all";
  });

  const activeBtn = document.getElementById(`btn-state-${state}`);
  if (activeBtn) {
    activeBtn.className = "state-tab-btn px-3 py-1.5 rounded-lg text-white bg-[#00261e] text-xs font-semibold transition-all shadow-sm";
  }

  const formContainer = document.getElementById('form-container');
  const successBanner = document.getElementById('success-banner');
  const errorBanner = document.getElementById('validation-error-banner');
  const submitBtn = document.getElementById('btn-submit-text');

  if (state === 'active') {
    if (formContainer) formContainer.classList.remove('hidden');
    if (successBanner) successBanner.classList.add('hidden');
    if (errorBanner) errorBanner.classList.add('hidden');
    if (submitBtn) submitBtn.textContent = 'Publicar Excedente Inmediato';
  } else if (state === 'submitting') {
    if (formContainer) formContainer.classList.remove('hidden');
    if (successBanner) successBanner.classList.add('hidden');
    if (errorBanner) errorBanner.classList.add('hidden');
    if (submitBtn) submitBtn.textContent = 'Validando inocuidad y ruta...';
  } else if (state === 'success') {
    if (formContainer) formContainer.classList.add('hidden');
    if (successBanner) successBanner.classList.remove('hidden');
    if (errorBanner) errorBanner.classList.add('hidden');
  } else if (state === 'error') {
    if (errorBanner) errorBanner.classList.remove('hidden');
  }
};

window.resetFormPublicar = function() {
  window.setFormState('active');
  const form = document.getElementById('form-publicar-excedente');
  if (form) form.reset();
};
