/**
 * Presentation Layer - Publicar / Editar Excedente View
 * Formulario interactivo con Clean Architecture, compresión de imágenes y persistencia completa
 */

import { repository } from '../../data/repository.js';
import { InocuidadUseCase } from '../../core/useCases.js';
import { compressImage, getDefaultImageForCategory } from '../../core/imageCompressor.js';

let currentEditingId = null;
let currentImageData = null;
let presetOrg = null;

export function renderPublicar(params) {
  // Verificar parámetros recibidos
  const editId = (params && typeof params.get === 'function') ? params.get('edit') : null;
  const paramCategoria = (params && typeof params.get === 'function') ? params.get('categoria') : null;
  const paramTemp = (params && typeof params.get === 'function') ? params.get('temp') : null;
  const paramOrg = (params && typeof params.get === 'function') ? params.get('org') : null;

  currentEditingId = editId;
  presetOrg = paramOrg;

  let editItem = null;
  if (editId) {
    editItem = repository.getExcedenteById(editId);
  }

  const isEditing = Boolean(editItem);
  currentImageData = editItem ? editItem.imagenUrl : null;

  const defaultCategory = editItem?.categoria || paramCategoria || 'Cereales y preparados';
  const defaultTemp = editItem?.temperatura || paramTemp || 'Ambiente (20°C)';
  const defaultImage = currentImageData || getDefaultImageForCategory(defaultCategory);

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <!-- Breadcrumb e Indicador de Estado -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5ee76]/40 text-[#171e00] text-xs font-bold uppercase tracking-wider border border-[#b9d15d]/50">
          <span class="w-2 h-2 rounded-full bg-[#546500] animate-pulse"></span>
          ${isEditing ? `Modo Edición · Lote ${editItem.id}` : 'Nueva Publicación · Red de Rescate Alimentario'}
        </span>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#e8e9e2] text-[#414845] text-xs font-medium">
          Valle de Aburrá
        </span>
        ${paramCategoria ? `
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <span class="material-symbols-outlined text-[14px]">calculate</span>
          Inocuidad calculada
        </span>
        ` : ''}
        ${paramOrg ? `
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
          <span class="material-symbols-outlined text-[14px]">hub</span>
          Destino: ${paramOrg}
        </span>
        ` : ''}
      </div>

      <!-- Simulador de Estado -->
      <div class="inline-flex items-center p-1 rounded-xl bg-[#eeeee7] gap-1 shadow-sm self-start md:self-auto border border-[#e3e3dc]">
        <button class="state-tab-btn px-3 py-1.5 rounded-lg text-white bg-[#00261e] text-xs font-semibold transition-all shadow-sm" id="btn-state-active" onclick="window.setFormState('active')" type="button">
          ${isEditing ? 'Editando Lote' : 'Formulario Activo'}
        </button>
        <button class="state-tab-btn px-3 py-1.5 rounded-lg text-[#414845] hover:text-[#1a1c18] text-xs font-semibold transition-all" id="btn-state-submitting" onclick="window.setFormState('submitting')" type="button">
          Validando
        </button>
        <button class="state-tab-btn px-3 py-1.5 rounded-lg text-[#414845] hover:text-[#1a1c18] text-xs font-semibold transition-all" id="btn-state-success" onclick="window.setFormState('success')" type="button">
          Guardado
        </button>
      </div>
    </div>

    <!-- Editorial Headline -->
    <div class="max-w-4xl">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight leading-tight">
        ${isEditing ? `Actualizar Lote ${editItem.id}` : 'Dale una segunda oportunidad a tus alimentos'}
      </h1>
      <p class="text-[#414845] mt-2 text-base max-w-2xl leading-relaxed">
        ${isEditing 
          ? 'Modifica los datos del lote, peso disponible o condiciones de entrega para mantener sincronizada la red de rescate.' 
          : 'Cuéntanos qué tienes disponible en tu establecimiento y te ayudaremos a conectarlo con comedores comunitarios y fundaciones aliadas en el Valle de Aburrá.'}
      </p>
    </div>

    <!-- Banner de Notificación de Validación (oculto por defecto) -->
    <div class="hidden p-4 rounded-xl bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/20 flex items-start justify-between gap-3 shadow-sm" id="validation-error-banner">
      <div class="flex items-start gap-2">
        <span class="material-symbols-outlined text-[22px] shrink-0 text-[#ba1a1a]">report</span>
        <div>
          <p class="text-sm font-bold">Por favor verifica los campos obligatorios</p>
          <p class="text-xs mt-0.5" id="error-message-text">El peso debe ser mayor a 0,5 kg y se debe indicar el nombre del alimento.</p>
        </div>
      </div>
      <button class="p-1 rounded-lg hover:bg-black/5" onclick="document.getElementById('validation-error-banner').classList.add('hidden')">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>

    <!-- Estado Éxito (Oculto por defecto) -->
    <div class="hidden p-6 rounded-2xl bg-[#d5ee76]/40 border-2 border-[#546500] text-[#171e00] flex flex-col items-center text-center gap-3" id="success-banner">
      <div class="w-14 h-14 rounded-full bg-[#546500] text-white flex items-center justify-center shadow-md">
        <span class="material-symbols-outlined text-[32px]">check_circle</span>
      </div>
      <h3 class="text-2xl font-bold text-[#00261e]">
        ${isEditing ? '¡Lote actualizado con éxito!' : '¡Excedente publicado exitosamente!'}
      </h3>
      <p class="text-sm max-w-md text-[#414845]">
        ${isEditing 
          ? 'Los cambios han sido guardados y sincronizados en la red logística del Valle de Aburrá.' 
          : 'El lote ha sido registrado en la red logística del Valle de Aburrá. Las organizaciones receptoras más cercanas ya han sido notificadas.'}
      </p>
      <div class="flex gap-3 mt-2 flex-wrap justify-center">
        <button onclick="window.navigate('mis-excedentes')" class="px-5 py-2.5 bg-[#00261e] text-white rounded-xl text-sm font-semibold hover:bg-[#123d32] transition-colors shadow-sm">
          Ir a Mis Excedentes
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
          <input type="hidden" id="input-edit-id" value="${isEditing ? editItem.id : ''}" />

          <!-- 1. Información del Alimento -->
          <div class="flex flex-col gap-4">
            <h2 class="text-base font-bold text-[#00261e] flex items-center gap-2 border-b border-[#f4f4ed] pb-2">
              <span class="w-6 h-6 rounded-full bg-[#123d32] text-white flex items-center justify-center text-xs font-bold">1</span>
              Descripción del lote
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5 sm:col-span-2">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Nombre o descripción del alimento *</label>
                <input required type="text" id="input-nombre" value="${isEditing ? editItem.nombre : ''}" placeholder="Ej. Arroz chaufa con verduras salteadas, o Pan artesanal" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] focus:ring-2 focus:ring-[#123d32]/20 text-sm bg-white" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Categoría de alimento *</label>
                <select id="input-categoria" onchange="window.handleCategoriaChange(this.value)" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white">
                  <option value="Cereales y preparados" ${defaultCategory === 'Cereales y preparados' ? 'selected' : ''}>Cereales y preparados</option>
                  <option value="Proteínas cocidas" ${defaultCategory.includes('Proteínas') ? 'selected' : ''}>Proteínas cocidas (carnes, pollo, pescado)</option>
                  <option value="Panadería y secos" ${defaultCategory.includes('Panadería') ? 'selected' : ''}>Panadería y repostería</option>
                  <option value="Frutas y verduras" ${defaultCategory.includes('Frutas') ? 'selected' : ''}>Frutas y verduras frescas</option>
                  <option value="Lácteos" ${defaultCategory === 'Lácteos' ? 'selected' : ''}>Lácteos y derivados</option>
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Cantidad aproximada (kg) *</label>
                <div class="relative">
                  <input required type="number" step="0.5" min="0.5" id="input-peso" value="${isEditing ? editItem.cantidadKg : ''}" placeholder="10.5" oninput="window.updateInocuidadPreview()" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white pr-10" />
                  <span class="absolute right-3 top-2.5 text-xs text-[#717975] font-semibold">kg</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Fotografía del Alimento (Optimización en Vivo) -->
          <div class="flex flex-col gap-3">
            <h2 class="text-base font-bold text-[#00261e] flex items-center gap-2 border-b border-[#f4f4ed] pb-2">
              <span class="w-6 h-6 rounded-full bg-[#123d32] text-white flex items-center justify-center text-xs font-bold">2</span>
              Fotografía del lote (Optimización automática)
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <!-- Zona Drag & Drop / Input File -->
              <div class="md:col-span-7">
                <label for="input-foto" class="relative flex flex-col items-center justify-center border-2 border-dashed border-[#c0c8c4] hover:border-[#123d32] rounded-2xl p-5 cursor-pointer bg-[#fafaf3] hover:bg-[#f4f4ed] transition-all text-center group">
                  <input type="file" id="input-foto" accept="image/*" capture="environment" onchange="window.handleImageUpload(event)" class="sr-only" />
                  
                  <div class="w-12 h-12 rounded-full bg-emerald-100/60 text-[#123d32] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <span class="material-symbols-outlined text-[24px]">add_a_photo</span>
                  </div>
                  <p class="text-xs font-bold text-[#00261e]">Haz clic para subir o arrastra una foto</p>
                  <p class="text-[11px] text-[#717975] mt-1">Cámara o archivo · Se comprime a WebP automáticamente</p>
                </label>
              </div>

              <!-- Previsualización de la Imagen -->
              <div class="md:col-span-5 flex flex-col items-center justify-center bg-[#f4f4ed] rounded-2xl p-3 border border-[#e8e9e2] text-center min-h-[140px]">
                <div class="relative w-full h-28 rounded-xl overflow-hidden bg-gray-200 shadow-inner group">
                  <img id="img-preview" src="${defaultImage}" alt="Previsualización" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button type="button" onclick="document.getElementById('input-foto').click()" class="p-1.5 bg-white/90 rounded-lg text-xs font-semibold text-[#00261e] shadow">Cambiar</button>
                    <button type="button" onclick="window.removeUploadedImage()" class="p-1.5 bg-rose-600 rounded-lg text-xs font-semibold text-white shadow">Quitar</button>
                  </div>
                </div>
                <div class="mt-2 flex items-center justify-center gap-1.5" id="image-size-badge">
                  <span class="material-symbols-outlined text-[14px] text-[#546500]">check_circle</span>
                  <span class="text-[11px] font-semibold text-[#546500]" id="image-size-text">
                    ${currentImageData && currentImageData.startsWith('data:') ? 'Imagen personalizada optimizada' : 'Foto ilustrativa por defecto'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Condiciones Térmicas y Recogida -->
          <div class="flex flex-col gap-4">
            <h2 class="text-base font-bold text-[#00261e] flex items-center gap-2 border-b border-[#f4f4ed] pb-2">
              <span class="w-6 h-6 rounded-full bg-[#123d32] text-white flex items-center justify-center text-xs font-bold">3</span>
              Inocuidad y ventana de recogida
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Temperatura de conservación actual</label>
                <select id="input-temperatura" onchange="window.updateInocuidadPreview()" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white">
                  <option value="Ambiente (20°C)" ${defaultTemp.includes('Ambiente') ? 'selected' : ''}>Temperatura ambiente (aprox 20°C)</option>
                  <option value="En caliente (>60°C)" ${defaultTemp.includes('caliente') || defaultTemp.includes('60') ? 'selected' : ''}>En caliente continuo (&gt;60°C en baño maría)</option>
                  <option value="Refrigerado (4°C)" ${defaultTemp.includes('4°C') || defaultTemp.includes('Refrigerado') ? 'selected' : ''}>Refrigerado (&lt;4°C)</option>
                  <option value="Congelado (-18°C)" ${defaultTemp.includes('-18') || defaultTemp.includes('Congelado') ? 'selected' : ''}>Congelado (&lt;-18°C)</option>
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Hora límite recomendada de entrega</label>
                <input type="time" id="input-hora-limite" value="${editItem?.horaLimite || '18:30'}" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white" />
              </div>

              ${isEditing ? `
              <div class="flex flex-col gap-1.5 sm:col-span-2">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Estado del lote</label>
                <select id="input-estado" class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white font-semibold">
                  <option value="Publicado" ${editItem.estado === 'Publicado' ? 'selected' : ''}>Publicado (Esperando asignación)</option>
                  <option value="Asignado" ${editItem.estado === 'Asignado' ? 'selected' : ''}>Asignado (Organización receptora asignada)</option>
                  <option value="En Ruta" ${editItem.estado === 'En Ruta' ? 'selected' : ''}>En Ruta (Vehículo en camino)</option>
                  <option value="Entregado" ${editItem.estado === 'Entregado' ? 'selected' : ''}>Entregado (Completado con éxito)</option>
                </select>
              </div>
              ` : ''}

              <div class="flex flex-col gap-1.5 sm:col-span-2">
                <label class="text-xs font-bold uppercase tracking-wider text-[#717975]">Notas de empaque o alérgenos (opcional)</label>
                <textarea id="input-notas" rows="2" placeholder="Ej. Empacado en recipientes aptos para alimentos. Contiene trazas de nueces." class="w-full px-4 py-2.5 rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32] text-sm bg-white resize-none">${editItem?.notas || ''}</textarea>
              </div>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#f4f4ed]">
            <button type="button" onclick="window.navigate('mis-excedentes')" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#414845] hover:bg-[#eeeee7] transition-colors">
              Cancelar
            </button>
            <button type="submit" id="btn-submit-form" class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#00261e] hover:bg-[#123d32] shadow-md hover:shadow-lg transition-all flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">${isEditing ? 'save' : 'publish'}</span>
              <span id="btn-submit-text">${isEditing ? 'Guardar Cambios del Lote' : 'Publicar Excedente Inmediato'}</span>
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
              <span class="font-bold text-[#1a1c18]">${editItem?.establecimiento || 'Provenza Bistro & Café'}</span>
            </div>
            <div class="flex justify-between">
              <span>Municipio de origen:</span>
              <span class="font-bold text-[#1a1c18]">${editItem?.ubicacion || 'Medellín (El Poblado)'}</span>
            </div>
            <div class="flex justify-between">
              <span>Red de transporte:</span>
              <span class="font-bold text-[#546500]">Ruta Logística Re-Food</span>
            </div>
          </div>
        </div>

        <!-- Protocolo Re-Food -->
        <div class="bg-[#00261e] text-white rounded-2xl p-6 shadow-md flex flex-col gap-3">
          <div class="flex items-center gap-2 text-[#d5ee76]">
            <span class="material-symbols-outlined text-[20px]">verified</span>
            <span class="text-xs uppercase font-bold tracking-wider">Persistencia y Trazabilidad</span>
          </div>
          <p class="text-xs text-[#bfecdc] leading-relaxed">
            Cada lote registrado se guarda de forma persistente. Podrás consultar el lote en tu inventario, editar sus cantidades o eliminarlo en cualquier momento.
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
}

// Handlers globales para la vista de Publicar / Editar
window.handleCategoriaChange = function(categoria) {
  window.updateInocuidadPreview();
  // Si no hay imagen personalizada subida por el usuario, actualizamos con el preset de categoría
  if (!currentImageData || !currentImageData.startsWith('data:')) {
    const preset = getDefaultImageForCategory(categoria);
    const imgPreview = document.getElementById('img-preview');
    if (imgPreview) imgPreview.src = preset;
    const badgeText = document.getElementById('image-size-text');
    if (badgeText) badgeText.textContent = 'Foto ilustrativa por categoría';
  }
};

window.handleImageUpload = async function(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const badgeText = document.getElementById('image-size-text');
  if (badgeText) badgeText.textContent = 'Comprimiendo y optimizando...';

  try {
    const result = await compressImage(file, { maxWidth: 800, maxHeight: 800, quality: 0.78 });
    currentImageData = result.dataUrl;

    const imgPreview = document.getElementById('img-preview');
    if (imgPreview) {
      imgPreview.src = result.dataUrl;
    }

    if (badgeText) {
      badgeText.innerHTML = `✓ Optimizada: <strong>${result.sizeKb} KB</strong> (Original: ${result.originalSizeKb} KB)`;
    }
  } catch (error) {
    console.error('Error al procesar imagen:', error);
    if (typeof window.showToast === 'function') {
      window.showToast('No se pudo optimizar la imagen', error.message, 'error');
    }
    if (badgeText) badgeText.textContent = 'Error al optimizar imagen';
  }
};

window.removeUploadedImage = function() {
  currentImageData = null;
  const categoria = document.getElementById('input-categoria')?.value || 'Cereales y preparados';
  const defaultImg = getDefaultImageForCategory(categoria);
  const imgPreview = document.getElementById('img-preview');
  if (imgPreview) imgPreview.src = defaultImg;

  const fileInput = document.getElementById('input-foto');
  if (fileInput) fileInput.value = '';

  const badgeText = document.getElementById('image-size-text');
  if (badgeText) badgeText.textContent = 'Foto ilustrativa por categoría';
};

window.updateInocuidadPreview = function() {
  const cat = document.getElementById('input-categoria')?.value || 'Cereales y preparados';
  const tempStr = document.getElementById('input-temperatura')?.value || '';

  let tempC = 20;
  if (tempStr.includes('60') || tempStr.includes('caliente')) tempC = 62;
  else if (tempStr.includes('4°C') || tempStr.includes('Refrigerado')) tempC = 4;
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
  const editId = document.getElementById('input-edit-id')?.value || null;
  const nombre = document.getElementById('input-nombre').value.trim();
  const categoria = document.getElementById('input-categoria').value;
  const cantidadKg = parseFloat(document.getElementById('input-peso').value);
  const temperatura = document.getElementById('input-temperatura').value;
  const horaLimite = document.getElementById('input-hora-limite')?.value || '18:30';
  const notas = document.getElementById('input-notas')?.value || '';
  const estado = document.getElementById('input-estado')?.value || 'Publicado';

  if (!nombre || !cantidadKg || cantidadKg < 0.5) {
    document.getElementById('validation-error-banner').classList.remove('hidden');
    return;
  }

  // Simular estado Validando
  window.setFormState('submitting');

  setTimeout(() => {
    try {
      const imagenUrl = currentImageData || getDefaultImageForCategory(categoria);

      if (editId) {
        // Modo Edición
        repository.updateExcedente(editId, {
          nombre,
          categoria,
          cantidadKg,
          temperatura,
          horaLimite,
          notas,
          estado,
          imagenUrl
        });
      } else {
        // Modo Nuevo: Donante fijado a Provenza Bistro & Café
        repository.addExcedente({
          nombre,
          categoria,
          establecimiento: 'Provenza Bistro & Café',
          ubicacion: 'El Poblado, Medellín',
          cantidadKg,
          temperatura,
          horaLimite,
          notas,
          organizacionDestino: presetOrg || 'Asignando ruta...',
          estado: presetOrg ? 'Asignado' : 'Publicado',
          imagenUrl
        });
      }

      window.setFormState('success');
      if (typeof window.showToast === 'function') {
        window.showToast(
          editId ? '¡Lote actualizado!' : '¡Excedente publicado!',
          `${nombre} (${cantidadKg} kg) ya está disponible en la red Re-Food.`,
          'success'
        );
      }
    } catch (err) {
      if (typeof window.showToast === 'function') {
        window.showToast('Error al guardar el lote', err.message, 'error');
      }
      window.setFormState('active');
    }
  }, 600);
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
    if (submitBtn) submitBtn.textContent = currentEditingId ? 'Guardar Cambios del Lote' : 'Publicar Excedente Inmediato';
  } else if (state === 'submitting') {
    if (formContainer) formContainer.classList.remove('hidden');
    if (successBanner) successBanner.classList.add('hidden');
    if (errorBanner) errorBanner.classList.add('hidden');
    if (submitBtn) submitBtn.textContent = 'Validando inocuidad y guardando...';
  } else if (state === 'success') {
    if (formContainer) formContainer.classList.add('hidden');
    if (successBanner) successBanner.classList.remove('hidden');
    if (errorBanner) errorBanner.classList.add('hidden');
  } else if (state === 'error') {
    if (errorBanner) errorBanner.classList.remove('hidden');
  }
};

window.resetFormPublicar = function() {
  currentEditingId = null;
  currentImageData = null;
  window.setFormState('active');
  const form = document.getElementById('form-publicar-excedente');
  if (form) form.reset();
  const editIdInput = document.getElementById('input-edit-id');
  if (editIdInput) editIdInput.value = '';
  window.removeUploadedImage();
};
