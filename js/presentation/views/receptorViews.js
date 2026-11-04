/**
 * Presentation Layer - Receptor Views (Entidad Receptora: Fundación Saciar)
 * Vistas exclusivas para comedores comunitarios y bancos de alimentos
 */

import { repository } from '../../data/repository.js';
import { getDefaultImageForCategory } from '../../core/imageCompressor.js';

// 1. DASHBOARD / CENTRO DE ACOPIO RECEPTOR
export function renderReceptorDashboard() {
  const all = repository.getExcedentes();
  const misLotes = all.filter(e => e.organizacionDestino && e.organizacionDestino.includes('Saciar'));
  const recibidos = misLotes.filter(e => e.estado === 'Entregado');
  const enCamino = misLotes.filter(e => e.estado === 'En Ruta' || e.estado === 'Asignado');

  const kgRecibidos = recibidos.reduce((acc, curr) => acc + (parseFloat(curr.cantidadKg) || 0), 0);
  const raciones = Math.round(kgRecibidos * 2.5);

  const disponiblesCount = all.filter(e => e.estado === 'Publicado').length;

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-[#d5ee76]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Centro de Acopio Social · Belén, Medellín</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">
          Fundación Saciar - Nutrimos el Futuro
        </h1>
        <p class="text-sm text-[#414845] mt-1">
          Panel de recepción, verificación bromatológica y distribución de raciones comunitarias.
        </p>
      </div>

      <div class="flex items-center gap-2.5 flex-wrap">
        <button onclick="window.navigate('receptor-disponibles')" class="px-5 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all">
          <span class="material-symbols-outlined text-[18px] text-[#d5ee76]">soup_kitchen</span>
          <span>Ver Alimentos Disponibles (${disponiblesCount})</span>
        </button>
      </div>
    </div>

    <!-- 4 Indicadores Clave de la Fundación -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Alimentos Recibidos</span>
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-[#123d32] flex items-center justify-center font-bold">
            <span class="material-symbols-outlined text-[22px]">scale</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">${Math.round(kgRecibidos * 10) / 10}</span>
            <span class="text-sm font-bold text-[#717975]">kg</span>
          </div>
          <span class="text-xs text-[#546500] font-semibold mt-0.5 block">Total acopiado certificado</span>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Raciones Servidas</span>
          <div class="w-10 h-10 rounded-xl bg-[#d5ee76]/40 text-[#123d32] flex items-center justify-center font-bold">
            <span class="material-symbols-outlined text-[22px]">restaurant</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">${raciones}</span>
            <span class="text-sm font-bold text-[#717975]">platos</span>
          </div>
          <span class="text-xs text-[#546500] font-semibold mt-0.5 block">680 beneficiarios activos</span>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Lotes en Camino</span>
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <span class="material-symbols-outlined text-[22px]">local_shipping</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">${enCamino.length}</span>
            <span class="text-sm font-bold text-[#717975]">despachos</span>
          </div>
          <span class="text-xs text-amber-700 font-semibold mt-0.5 block">Furgón isotérmico hacia sede</span>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3">
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Capacidad Bodega</span>
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <span class="material-symbols-outlined text-[22px]">warehouse</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">420</span>
            <span class="text-sm font-bold text-[#717975]">kg/día</span>
          </div>
          <span class="text-xs text-emerald-700 font-semibold mt-0.5 block">Cuarto frío a 3.8°C operativo</span>
        </div>
      </div>
    </div>

    <!-- Muelle de Recepción Inmediata & Alimentos en Camino -->
    <div class="bg-white rounded-2xl border border-[#e8e9e2] shadow-sm p-6 flex flex-col gap-5">
      <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-4">
        <div>
          <h2 class="text-lg font-bold text-[#00261e] flex items-center gap-2">
            <span class="material-symbols-outlined text-[#546500]">forklift</span>
            <span>Muelle de Descargue y Entregas Programadas</span>
          </h2>
          <p class="text-xs text-[#717975] mt-0.5">Alimentos asignados a Fundación Saciar listos para confirmación de descargue.</p>
        </div>
        <button onclick="window.navigate('receptor-muelle')" class="text-xs font-semibold text-[#123d32] hover:underline flex items-center gap-1">
          <span>Ver muelle completo</span>
          <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      ${misLotes.length === 0 ? `
        <div class="p-8 text-center text-xs text-[#717975] bg-[#fafaf3] rounded-xl border border-[#e8e9e2]">
          No hay lotes asignados en este momento. Revisa el muro de alimentos disponibles para solicitar donaciones de restaurantes cercanos.
        </div>
      ` : `
        <div class="divide-y divide-[#eeeee7]">
          ${misLotes.map(item => {
            const isEnRuta = item.estado === 'En Ruta';
            const isEntregado = item.estado === 'Entregado';
            let badge = isEntregado ? 'bg-[#d5ee76]/50 text-[#171e00] border-[#b9d15d]' :
                        isEnRuta ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse' :
                        'bg-blue-100 text-blue-900 border-blue-200';

            return `
            <div class="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3.5 min-w-0">
                <img src="${item.imagenUrl}" class="w-14 h-14 rounded-xl object-cover border border-[#e8e9e2] shrink-0" />
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-sm text-[#00261e] truncate">${item.nombre}</span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#eeeee7] font-bold text-[#414845]">${item.id}</span>
                  </div>
                  <span class="text-xs text-[#717975] mt-0.5">
                    Donante: <strong class="text-[#1a1c18]">${item.establecimiento}</strong> · ${item.categoria}
                  </span>
                  <span class="text-[11px] text-[#546500]">Temperatura despacho: ${item.temperatura}</span>
                </div>
              </div>

              <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 shrink-0">
                <div class="text-left sm:text-right">
                  <span class="text-base font-extrabold text-[#00261e]">${item.cantidadKg} kg</span>
                  <span class="text-[11px] text-[#717975] block">Aprox. ${Math.round(item.cantidadKg * 2.5)} raciones</span>
                </div>

                <span class="px-3 py-1 rounded-full text-xs font-bold border ${badge}">
                  ${item.estado}
                </span>

                ${!isEntregado ? `
                <button onclick="window.confirmarDescargueEnMuelle('${item.id}')" class="px-3.5 py-1.5 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">task_alt</span>
                  <span>Confirmar Descargue</span>
                </button>
                ` : `
                <button onclick="window.abrirModalCertificado('${item.id}')" class="px-3 py-1.5 bg-white border border-[#c0c8c4] hover:bg-[#fafaf3] text-[#1a1c18] rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs">
                  <span class="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                  <span>Ver Acta</span>
                </button>
                `}
              </div>
            </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  </div>
  `;
}

// 2. MURO DE ALIMENTOS DISPONIBLES PARA RESCATAR
export function renderReceptorDisponibles() {
  const all = repository.getExcedentes();
  const disponibles = all.filter(e => e.estado === 'Publicado');

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Red de Rescate en Tiempo Real</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Alimentos Disponibles para Rescatar</h1>
        <p class="text-sm text-[#414845] mt-1">
          Excedentes publicados por restaurantes de Medellín listos para ser aprovechados en comedores comunitarios.
        </p>
      </div>

      <div class="px-3.5 py-1.5 rounded-xl bg-white border border-[#e8e9e2] text-xs font-bold text-[#123d32] shadow-sm flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span>${disponibles.length} lotes listos para entrega</span>
      </div>
    </div>

    <!-- Grid de Alimentos Disponibles -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${disponibles.length === 0 ? `
        <div class="col-span-full p-12 bg-white rounded-2xl border border-[#e8e9e2] text-center flex flex-col items-center gap-3">
          <span class="material-symbols-outlined text-[42px] text-[#717975]">check_circle</span>
          <h3 class="text-base font-bold text-[#00261e]">No hay excedentes en espera en este momento</h3>
          <p class="text-xs text-[#717975] max-w-sm">Todos los lotes publicados han sido asignados y están en ruta hacia los comedores del Valle de Aburrá.</p>
        </div>
      ` : disponibles.map(item => `
        <div class="bg-white rounded-2xl border border-[#e8e9e2] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
          <div>
            <div class="relative h-44 w-full bg-gray-100 overflow-hidden">
              <img src="${item.imagenUrl}" alt="${item.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <span class="absolute top-3 left-3 bg-[#00261e]/85 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-bold">
                ${item.cantidadKg} kg · Aprox ${Math.round(item.cantidadKg * 2.5)} raciones
              </span>
              <span class="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Inocuidad OK
              </span>
            </div>

            <div class="p-5 flex flex-col gap-3">
              <div>
                <span class="text-[10px] font-mono font-bold text-[#717975] uppercase">${item.id} · ${item.categoria}</span>
                <h3 class="font-extrabold text-base text-[#00261e] leading-snug mt-0.5">${item.nombre}</h3>
              </div>

              <div class="flex flex-col gap-1.5 text-xs text-[#414845] bg-[#fafaf3] p-3 rounded-xl border border-[#f0f0ea]">
                <div class="flex items-center gap-1.5 font-semibold text-[#1a1c18]">
                  <span class="material-symbols-outlined text-[16px] text-[#546500]">store</span>
                  <span>${item.establecimiento}</span>
                </div>
                <div class="flex justify-between text-[#717975] text-[11px]">
                  <span>Ubicación:</span>
                  <span class="font-medium text-[#1a1c18]">${item.ubicacion}</span>
                </div>
                <div class="flex justify-between text-[#717975] text-[11px]">
                  <span>Conservación:</span>
                  <span class="font-medium text-[#1a1c18]">${item.temperatura}</span>
                </div>
                <div class="flex justify-between text-[#717975] text-[11px]">
                  <span>Hora máxima recogida:</span>
                  <span class="font-bold text-[#546500]">${item.horaLimite || '18:30'}</span>
                </div>
              </div>

              ${item.notas ? `
              <p class="text-[11px] text-[#717975] italic line-clamp-2">"${item.notas}"</p>
              ` : ''}
            </div>
          </div>

          <div class="p-5 pt-0">
            <button onclick="window.solicitarLoteReceptor('${item.id}')" class="w-full py-3 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all">
              <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">volunteer_activism</span>
              <span>Solicitar este lote para nuestro comedor</span>
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  `;
}

// 3. MUELLE Y RECEPCIÓN BROMATOLÓGICA
export function renderReceptorMuelle() {
  const all = repository.getExcedentes();
  const misLotes = all.filter(e => e.organizacionDestino && e.organizacionDestino.includes('Saciar'));

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Control Operativo de Entrada</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Recepción en Muelle y Bodega</h1>
        <p class="text-sm text-[#414845] mt-1">Registra la llegada de furgonetas, valida la temperatura en muelle y firma el acta de recepción.</p>
      </div>

      <div class="px-4 py-2 rounded-xl bg-white border border-[#e8e9e2] text-xs font-bold text-[#00261e] shadow-sm flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px] text-[#546500]">local_shipping</span>
        <span>Muelle Calle 30A · Belén Activo</span>
      </div>
    </div>

    <!-- Lista de Entregas -->
    <div class="bg-white rounded-2xl border border-[#e8e9e2] shadow-sm p-6 flex flex-col gap-4">
      <h2 class="text-base font-bold text-[#00261e] border-b border-[#f4f4ed] pb-3">Registro de Lotes Asignados a Fundación Saciar</h2>

      ${misLotes.length === 0 ? `
        <div class="p-8 text-center text-xs text-[#717975]">No hay lotes en muelle para Fundación Saciar.</div>
      ` : `
        <div class="divide-y divide-[#eeeee7]">
          ${misLotes.map(lote => `
          <div class="py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div class="flex items-start gap-4 min-w-0">
              <img src="${lote.imagenUrl}" class="w-16 h-16 rounded-xl object-cover border border-[#e8e9e2] shrink-0" />
              <div class="flex flex-col min-w-0">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-sm sm:text-base text-[#00261e]">${lote.nombre}</span>
                  <span class="text-xs font-mono font-bold bg-[#eeeee7] px-2 py-0.5 rounded text-[#414845]">${lote.id}</span>
                </div>
                <span class="text-xs text-[#717975] mt-0.5">Donado por: <strong>${lote.establecimiento}</strong> (${lote.ubicacion})</span>
                <span class="text-xs text-[#546500] font-semibold mt-0.5">Temperatura origen: ${lote.temperatura}</span>
              </div>
            </div>

            <div class="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-4 shrink-0">
              <div class="text-left lg:text-right">
                <span class="text-base font-extrabold text-[#00261e] block">${lote.cantidadKg} kg</span>
                <span class="text-xs text-[#717975]">${Math.round(lote.cantidadKg * 2.5)} raciones</span>
              </div>

              <span class="px-3 py-1 rounded-full text-xs font-bold ${lote.estado === 'Entregado' ? 'bg-[#d5ee76]/50 text-[#171e00] border border-[#b9d15d]' : 'bg-amber-100 text-amber-900 border border-amber-300'}">
                ${lote.estado}
              </span>

              ${lote.estado !== 'Entregado' ? `
              <button onclick="window.confirmarDescargueEnMuelle('${lote.id}')" class="px-4 py-2 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">inventory</span>
                <span>Confirmar Descargue</span>
              </button>
              ` : `
              <button onclick="window.abrirModalCertificado('${lote.id}')" class="px-3.5 py-2 bg-[#123d32] hover:bg-[#0c2821] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">description</span>
                <span>Acta DIAN</span>
              </button>
              `}
            </div>
          </div>
          `).join('')}
        </div>
      `}
    </div>
  </div>
  `;
}

// 4. ACTAS Y CERTIFICADOS RECEPTOR
export function renderReceptorActas() {
  const all = repository.getExcedentes();
  const recibidos = all.filter(e => e.organizacionDestino && e.organizacionDestino.includes('Saciar') && e.estado === 'Entregado');

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Auditoría y Certificación Tributaria</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Actas y Certificados de Donación</h1>
        <p class="text-sm text-[#414845] mt-1">Historial oficial de certificados emitidos a favor de los restaurantes donantes (Art. 125 E.T.).</p>
      </div>

      <button onclick="window.print()" class="px-4 py-2 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
        <span class="material-symbols-outlined text-[18px]">print</span>
        <span>Imprimir Libro de Donaciones</span>
      </button>
    </div>

    <div class="bg-white rounded-2xl border border-[#e8e9e2] shadow-sm overflow-hidden">
      <div class="p-5 border-b border-[#eeeee7] flex items-center justify-between">
        <h3 class="font-bold text-sm text-[#00261e]">Certificados Oficiales Emitidos por Fundación Saciar</h3>
        <span class="text-xs font-semibold text-[#546500]">${recibidos.length} actas vigentes</span>
      </div>

      <div class="divide-y divide-[#eeeee7]">
        ${recibidos.length === 0 ? `
          <div class="p-8 text-center text-xs text-[#717975]">No se han emitido actas de entrega aún. Confirma descargues en muelle para generar actas oficiales.</div>
        ` : recibidos.map(item => `
          <div class="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#fafaf3] transition-colors">
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-[#123d32] flex items-center justify-center font-bold shrink-0">
                <span class="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-bold text-sm text-[#00261e]">Acta ACTA-${item.id}-2026 · ${item.nombre}</span>
                <span class="text-xs text-[#717975]">Beneficiario donante: <strong class="text-[#1a1c18]">${item.establecimiento}</strong></span>
                <span class="text-[11px] text-[#546500] font-mono">Hash SHA-256 verificado en muelle</span>
              </div>
            </div>

            <div class="flex items-center gap-4 shrink-0">
              <div class="text-right">
                <span class="text-sm font-extrabold text-[#00261e] block">${item.cantidadKg} kg</span>
                <span class="text-[11px] text-[#717975]">${Math.round(item.cantidadKg * 2.5)} raciones</span>
              </div>
              <button onclick="window.abrirModalCertificado('${item.id}')" class="px-4 py-2 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all">
                <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">visibility</span>
                <span>Ver y Descargar PDF</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  `;
}

// 5. DISTRIBUCIÓN Y BENEFICIARIOS
export function renderReceptorImpacto() {
  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Impacto Comunitario y Social</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Distribución a Familias Beneficiarias</h1>
        <p class="text-sm text-[#414845] mt-1">Población atendida diariamente en comedores satélite de Belén y la Comuna 16.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-3">
        <span class="text-xs uppercase font-bold text-[#717975]">Primera Infancia y Niños</span>
        <span class="text-4xl font-extrabold text-[#00261e]">240</span>
        <p class="text-xs text-[#546500] font-semibold">Almuerzos y refrigerios reforzados con proteínas y lácteos donados.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-3">
        <span class="text-xs uppercase font-bold text-[#717975]">Adultos Mayores</span>
        <span class="text-4xl font-extrabold text-[#00261e]">180</span>
        <p class="text-xs text-[#546500] font-semibold">Comedor central de Belén y viandas a domicilio para no ambulantes.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-3">
        <span class="text-xs uppercase font-bold text-[#717975]">Madres Cabeza de Familia</span>
        <span class="text-4xl font-extrabold text-[#00261e]">260</span>
        <p class="text-xs text-[#546500] font-semibold">Paquetes de cereales y panadería para seguridad alimentaria del hogar.</p>
      </div>
    </div>
  </div>
  `;
}

// 6. PERFIL DE LA FUNDACIÓN
export function renderReceptorPerfil() {
  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div>
      <span class="text-xs uppercase font-bold tracking-widest text-[#546500]">Ficha Institucional Receptora</span>
      <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Fundación Saciar - Nutrimos el Futuro</h1>
      <p class="text-sm text-[#414845] mt-1">Nodo verificado de la Red Re-Food · Personería Jurídica 14820</p>
    </div>

    <div class="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e9e2] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="text-sm font-bold text-[#00261e] uppercase tracking-wider mb-3">Información Operativa de Sede</h3>
        <div class="space-y-2 text-xs text-[#414845]">
          <div class="flex justify-between py-1.5 border-b border-[#f4f4ed]">
            <span>Dirección:</span>
            <strong class="text-[#1a1c18]">Calle 30A # 65-12, Belén</strong>
          </div>
          <div class="flex justify-between py-1.5 border-b border-[#f4f4ed]">
            <span>Municipio:</span>
            <strong class="text-[#1a1c18]">Medellín (Antioquia)</strong>
          </div>
          <div class="flex justify-between py-1.5 border-b border-[#f4f4ed]">
            <span>Capacidad de Acopio:</span>
            <strong class="text-[#1a1c18]">420 kg/día</strong>
          </div>
          <div class="flex justify-between py-1.5 border-b border-[#f4f4ed]">
            <span>Cuarto Frío:</span>
            <strong class="text-emerald-700">Operativo (2°C a 4°C)</strong>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-bold text-[#00261e] uppercase tracking-wider mb-3">Contacto de Muelle</h3>
        <div class="space-y-2 text-xs text-[#414845]">
          <div class="flex justify-between py-1.5 border-b border-[#f4f4ed]">
            <span>Jefe de Bodega:</span>
            <strong class="text-[#1a1c18]">Marta Lucía Correa</strong>
          </div>
          <div class="flex justify-between py-1.5 border-b border-[#f4f4ed]">
            <span>Teléfono Directo:</span>
            <strong class="text-[#123d32]">+57 (604) 312 8840</strong>
          </div>
          <div class="flex justify-between py-1.5 border-b border-[#f4f4ed]">
            <span>Horario de Muelle:</span>
            <strong class="text-[#1a1c18]">Lunes a Sábado: 07:00 - 19:30</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// Handlers Globales Receptor
window.solicitarLoteReceptor = function(loteId) {
  try {
    repository.updateExcedente(loteId, {
      organizacionDestino: 'Fundación Saciar - Nutrimos el Futuro',
      estado: 'Asignado'
    });

    alert('¡Lote solicitado con éxito! Se ha coordinado la furgoneta isotérmica para recogida en el restaurante donante.');
    window.navigate('receptor-muelle');
  } catch (err) {
    alert('Error al solicitar lote: ' + err.message);
  }
};

window.confirmarDescargueEnMuelle = function(loteId) {
  try {
    repository.updateExcedente(loteId, {
      estado: 'Entregado'
    });

    alert('¡Recepción confirmada en muelle! Se ha registrado el ingreso a bodega y generado el Acta Oficial DIAN.');
    window.navigate('receptor-actas');
  } catch (err) {
    alert('Error al confirmar descargue: ' + err.message);
  }
};

