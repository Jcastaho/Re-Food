/**
 * Presentation Layer - Receptor Views (Entidad Receptora: Fundación Saciar)
 * Vistas exclusivas para comedores comunitarios y bancos de alimentos
 */

import { repository } from '../../data/repository.js';
import { getDefaultImageForCategory } from '../../core/imageCompressor.js';

// Estado local para filtros interactivos en vistas del receptor
let dispActiveCategory = 'todos';
let dispSearchQuery = '';
let recepcionActiveTab = 'todos'; // 'todos' | 'pendientes' | 'recibidos'
let loteParaRecibirId = null;

// 1. DASHBOARD / CENTRO DE ACOPIO RECEPTOR
export function renderReceptorDashboard() {
  const all = repository.getExcedentes();
  const perfil = repository.getPerfilReceptor();
  const distribuciones = repository.getDistribuciones();

  const misLotes = all.filter(e => e.organizacionDestino && e.organizacionDestino.includes('Saciar'));
  const recibidos = misLotes.filter(e => e.estado === 'Entregado');
  const enCamino = misLotes.filter(e => e.estado === 'En Ruta' || e.estado === 'Asignado');

  const kgRecibidos = recibidos.reduce((acc, curr) => acc + (parseFloat(curr.pesoRecibidoKg || curr.cantidadKg) || 0), 0);
  const racionesPorLotes = Math.round(kgRecibidos * 2.5);
  const racionesDistribuidas = distribuciones.reduce((acc, curr) => acc + (parseInt(curr.raciones, 10) || 0), 0);
  const totalRaciones = Math.max(racionesPorLotes, racionesDistribuidas);

  const disponiblesCount = all.filter(e => e.estado === 'Publicado').length;
  const isAbierto = perfil.estadoRecepcion !== 'Cerrado';

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1 flex-wrap">
          <span class="w-2.5 h-2.5 rounded-full ${isAbierto ? 'bg-[#d5ee76]' : 'bg-rose-500'}"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Centro de Acopio Social · ${perfil.municipio}</span>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${isAbierto ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}">
            Recepción: ${perfil.estadoRecepcion || 'Abierto'}
          </span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-[#00261e] tracking-tight">
          ${perfil.nombre}
        </h1>
        <p class="text-sm text-[#414845] mt-1">
          Panel de recibo de alimentos, revisión de calidad e higiene y entrega de raciones comunitarias.
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
          <span class="text-xs text-[#546500] font-semibold mt-0.5 block">Total recibido y pesado en sede</span>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3 cursor-pointer hover:shadow-md transition-all" onclick="window.navigate('receptor-impacto')">
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Raciones Entregadas</span>
          <div class="w-10 h-10 rounded-xl bg-[#d5ee76]/40 text-[#123d32] flex items-center justify-center font-bold">
            <span class="material-symbols-outlined text-[22px]">restaurant</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">${totalRaciones}</span>
            <span class="text-sm font-bold text-[#717975]">platos</span>
          </div>
          <span class="text-xs text-[#546500] font-semibold mt-0.5 block">680 beneficiarios atendidos</span>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3 cursor-pointer hover:shadow-md transition-all" onclick="window.navigate('receptor-muelle')">
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Pedidos en Camino</span>
          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <span class="material-symbols-outlined text-[22px]">local_shipping</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">${enCamino.length}</span>
            <span class="text-sm font-bold text-[#717975]">entregas</span>
          </div>
          <span class="text-xs text-amber-700 font-semibold mt-0.5 block">Vehículo refrigerado hacia la sede</span>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col justify-between gap-3 cursor-pointer hover:shadow-md transition-all" onclick="window.navigate('receptor-perfil')">
        <div class="flex items-center justify-between">
          <span class="text-xs text-[#717975] uppercase font-bold tracking-wider">Capacidad Bodega</span>
          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <span class="material-symbols-outlined text-[22px]">warehouse</span>
          </div>
        </div>
        <div>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#00261e]">${perfil.capacidadKgDia}</span>
            <span class="text-sm font-bold text-[#717975]">kg/día</span>
          </div>
          <span class="text-xs text-emerald-700 font-semibold mt-0.5 block">Cuarto frío a ${perfil.cuartoFrioTemp || '3.8 °C'} operativo</span>
        </div>
      </div>
    </div>

    <!-- Zona de Recepción Inmediata & Alimentos en Camino -->
    <div class="bg-white rounded-2xl border border-[#e8e9e2] shadow-sm p-6 flex flex-col gap-5">
      <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-4 flex-wrap gap-2">
        <div>
          <h2 class="text-lg font-bold text-[#00261e] flex items-center gap-2">
            <span class="material-symbols-outlined text-[#546500]">inventory</span>
            <span>Punto de Recepción y Entregas Programadas</span>
          </h2>
          <p class="text-xs text-[#717975] mt-0.5">Alimentos asignados a ${perfil.nombre} listos para revisión y recibo en sede.</p>
        </div>
        <button onclick="window.navigate('receptor-muelle')" class="text-xs font-semibold text-[#123d32] hover:underline flex items-center gap-1">
          <span>Ir a recepción de alimentos</span>
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
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-sm text-[#00261e] truncate">${item.nombre}</span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#eeeee7] font-bold text-[#414845]">${item.id}</span>
                  </div>
                  <span class="text-xs text-[#717975] mt-0.5">
                    Donante: <strong class="text-[#1a1c18]">${item.establecimiento}</strong> · ${item.categoria}
                  </span>
                  <span class="text-[11px] text-[#546500]">
                    ${isEntregado && item.tempLlegada ? `Recibido a ${item.tempLlegada} · Peso verificado: ${item.pesoRecibidoKg || item.cantidadKg} kg` : `Temperatura salida: ${item.temperatura}`}
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 shrink-0 flex-wrap">
                <div class="text-left sm:text-right mr-1">
                  <span class="text-base font-extrabold text-[#00261e]">${item.pesoRecibidoKg || item.cantidadKg} kg</span>
                  <span class="text-[11px] text-[#717975] block">Aprox. ${Math.round((item.pesoRecibidoKg || item.cantidadKg) * 2.5)} raciones</span>
                </div>

                <span class="px-3 py-1 rounded-full text-xs font-bold border ${badge}">
                  ${item.estado}
                </span>

                ${!isEntregado ? `
                <button onclick="window.abrirModalRecibirLote('${item.id}')" class="px-3.5 py-1.5 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1">
                  <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">task_alt</span>
                  <span>Recibir Pedido</span>
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
  ${renderModalVerificacionRecibo()}
  `;
}

// 2. MURO DE ALIMENTOS DISPONIBLES PARA RESCATAR (CON FILTROS Y BÚSQUEDA EN VIVO)
export function renderReceptorDisponibles() {
  const all = repository.getExcedentes();
  const disponibles = all.filter(e => e.estado === 'Publicado');
  const categorias = [
    { id: 'todos', label: 'Todas las categorías' },
    { id: 'Cereales y preparados', label: 'Arroces y preparados' },
    { id: 'Proteínas cocidas', label: 'Proteínas' },
    { id: 'Panadería y secos', label: 'Panadería' },
    { id: 'Frutas y verduras', label: 'Frutas y verduras' },
    { id: 'Lácteos', label: 'Lácteos' }
  ];

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
          Excedentes publicados por restaurantes y panaderías de Medellín listos para aprovechar en comedores comunitarios.
        </p>
      </div>

      <div class="px-3.5 py-2 rounded-xl bg-white border border-[#e8e9e2] text-xs font-bold text-[#123d32] shadow-sm flex items-center gap-2 self-start sm:self-auto">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span id="disp-counter-badge">${disponibles.length} lotes listos para recoger</span>
      </div>
    </div>

    <!-- Barra de Búsqueda y Filtros por Categoría -->
    <div class="bg-white p-4 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <div class="flex items-center gap-1.5 flex-wrap" id="disp-cat-container">
        ${categorias.map(cat => `
          <button type="button" onclick="window.filtrarDisponiblesReceptor('${cat.id}')" id="disp-cat-${cat.id}" class="disp-cat-btn px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${dispActiveCategory === cat.id ? 'bg-[#00261e] text-white shadow-sm' : 'bg-[#f4f4ed] text-[#414845] hover:bg-[#e8e9e2]'}">
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <div class="relative w-full md:w-72 shrink-0">
        <span class="material-symbols-outlined absolute left-3 top-2.5 text-[#717975] text-[18px]">search</span>
        <input type="text" id="disp-search-input" value="${dispSearchQuery}" oninput="window.buscarDisponiblesReceptor(this.value)" placeholder="Buscar alimento, restaurante o barrio..." class="w-full pl-9 pr-3 py-2 text-xs bg-[#fafaf3] rounded-xl border border-[#c0c8c4] focus:outline-none focus:border-[#123d32]" />
      </div>
    </div>

    <!-- Grid de Alimentos Disponibles -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="receptor-disponibles-grid">
      ${renderDisponiblesCards(getFilteredDisponibles())}
    </div>
  </div>
  `;
}

function getFilteredDisponibles() {
  const all = repository.getExcedentes();
  let list = all.filter(e => e.estado === 'Publicado');

  if (dispActiveCategory !== 'todos') {
    list = list.filter(e => e.categoria === dispActiveCategory);
  }

  if (dispSearchQuery.trim() !== '') {
    const q = dispSearchQuery.toLowerCase();
    list = list.filter(e =>
      e.nombre.toLowerCase().includes(q) ||
      (e.establecimiento && e.establecimiento.toLowerCase().includes(q)) ||
      (e.ubicacion && e.ubicacion.toLowerCase().includes(q)) ||
      (e.categoria && e.categoria.toLowerCase().includes(q))
    );
  }

  return list;
}

function renderDisponiblesCards(disponibles) {
  if (disponibles.length === 0) {
    return `
      <div class="col-span-full p-12 bg-white rounded-2xl border border-[#e8e9e2] text-center flex flex-col items-center gap-3">
        <span class="material-symbols-outlined text-[42px] text-[#717975]">search_off</span>
        <h3 class="text-base font-bold text-[#00261e]">No se encontraron alimentos con ese filtro</h3>
        <p class="text-xs text-[#717975] max-w-sm">Prueba seleccionando otra categoría o limpia la búsqueda para ver todos los lotes disponibles en la red.</p>
        <button onclick="window.filtrarDisponiblesReceptor('todos'); window.buscarDisponiblesReceptor(''); const inp = document.getElementById('disp-search-input'); if(inp) inp.value='';" class="mt-1 px-4 py-2 bg-[#00261e] text-white rounded-xl text-xs font-bold">
          Ver todos los disponibles
        </button>
      </div>
    `;
  }

  return disponibles.map(item => `
    <div class="bg-white rounded-2xl border border-[#e8e9e2] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
      <div>
        <div class="relative h-44 w-full bg-gray-100 overflow-hidden">
          <img src="${item.imagenUrl || getDefaultImageForCategory(item.categoria)}" alt="${item.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <span class="absolute top-3 left-3 bg-[#00261e]/85 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-bold">
            ${item.cantidadKg} kg · Aprox ${Math.round(item.cantidadKg * 2.5)} raciones
          </span>
          <span class="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Calidad Verificada
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
              <span>Hora límite recogida:</span>
              <span class="font-bold text-[#546500]">${item.horaLimite || '18:30'}</span>
            </div>
          </div>

          ${item.notas ? `
          <p class="text-[11px] text-[#717975] italic line-clamp-2">"${item.notas}"</p>
          ` : ''}
        </div>
      </div>

      <div class="p-5 pt-0">
        <button onclick="window.solicitarLoteReceptor('${item.id}')" class="w-full py-3 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
          <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">volunteer_activism</span>
          <span>Solicitar este lote para nuestro comedor</span>
        </button>
      </div>
    </div>
  `).join('');
}

// 3. RECEPCIÓN DE ALIMENTOS Y BODEGA (CON MODAL INTERACTIVO DE CHEQUEO Y PESAJE)
export function renderReceptorMuelle() {
  const all = repository.getExcedentes();
  const perfil = repository.getPerfilReceptor();
  const misLotes = all.filter(e => e.organizacionDestino && e.organizacionDestino.includes('Saciar'));
  const pendientesCount = misLotes.filter(e => e.estado !== 'Entregado').length;
  const recibidosCount = misLotes.filter(e => e.estado === 'Entregado').length;

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Control de Entrada y Calidad</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Recepción de Alimentos y Bodega</h1>
        <p class="text-sm text-[#414845] mt-1">Registra la llegada de los vehículos, verifica el peso en báscula y la temperatura, y genera el acta de entrega.</p>
      </div>

      <div class="px-4 py-2 rounded-xl bg-white border border-[#e8e9e2] text-xs font-bold text-[#00261e] shadow-sm flex items-center gap-2 self-start sm:self-auto">
        <span class="material-symbols-outlined text-[18px] text-[#546500]">local_shipping</span>
        <span>Punto de Recepción · ${perfil.direccion}</span>
      </div>
    </div>

    <!-- Pestañas de filtro en Recepción -->
    <div class="flex items-center gap-2 flex-wrap">
      <button onclick="window.filtrarRecepcionTab('todos')" id="rec-tab-todos" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${recepcionActiveTab === 'todos' ? 'bg-[#00261e] text-white shadow-sm' : 'bg-white text-[#414845] border border-[#e8e9e2] hover:bg-[#eeeee7]'}">
        Todos los asignados (${misLotes.length})
      </button>
      <button onclick="window.filtrarRecepcionTab('pendientes')" id="rec-tab-pendientes" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${recepcionActiveTab === 'pendientes' ? 'bg-[#00261e] text-white shadow-sm' : 'bg-white text-[#414845] border border-[#e8e9e2] hover:bg-[#eeeee7]'}">
        En camino / Por recibir (${pendientesCount})
      </button>
      <button onclick="window.filtrarRecepcionTab('recibidos')" id="rec-tab-recibidos" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${recepcionActiveTab === 'recibidos' ? 'bg-[#00261e] text-white shadow-sm' : 'bg-white text-[#414845] border border-[#e8e9e2] hover:bg-[#eeeee7]'}">
        Recibidos en bodega (${recibidosCount})
      </button>
    </div>

    <!-- Lista de Entregas -->
    <div class="bg-white rounded-2xl border border-[#e8e9e2] shadow-sm p-6 flex flex-col gap-4">
      <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-3">
        <h2 class="text-base font-bold text-[#00261e]">Lotes Asignados a ${perfil.nombre}</h2>
        <span class="text-xs text-[#546500] font-semibold">Revisión sanitaria en punto de entrega</span>
      </div>

      <div id="recepcion-lotes-container" class="divide-y divide-[#eeeee7]">
        ${renderRecepcionRows(misLotes)}
      </div>
    </div>
  </div>
  ${renderModalVerificacionRecibo()}
  `;
}

function renderRecepcionRows(misLotes) {
  let filtrados = misLotes;
  if (recepcionActiveTab === 'pendientes') {
    filtrados = misLotes.filter(e => e.estado !== 'Entregado');
  } else if (recepcionActiveTab === 'recibidos') {
    filtrados = misLotes.filter(e => e.estado === 'Entregado');
  }

  if (filtrados.length === 0) {
    return `
      <div class="p-8 text-center text-xs text-[#717975]">
        No hay lotes en esta sección. Puedes solicitar alimentos disponibles desde el muro de rescate.
      </div>
    `;
  }

  return filtrados.map(lote => `
    <div class="py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div class="flex items-start gap-4 min-w-0">
        <img src="${lote.imagenUrl || getDefaultImageForCategory(lote.categoria)}" class="w-16 h-16 rounded-xl object-cover border border-[#e8e9e2] shrink-0" />
        <div class="flex flex-col min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-bold text-sm sm:text-base text-[#00261e]">${lote.nombre}</span>
            <span class="text-xs font-mono font-bold bg-[#eeeee7] px-2 py-0.5 rounded text-[#414845]">${lote.id}</span>
          </div>
          <span class="text-xs text-[#717975] mt-0.5">Donado por: <strong class="text-[#1a1c18]">${lote.establecimiento}</strong> (${lote.ubicacion})</span>
          <span class="text-xs text-[#546500] font-semibold mt-0.5">
            ${lote.estado === 'Entregado' && lote.tempLlegada
              ? `✓ Verificado al recibir: Temp. ${lote.tempLlegada} · Peso en báscula: ${lote.pesoRecibidoKg || lote.cantidadKg} kg`
              : `Temperatura al salir de cocina: ${lote.temperatura}`}
          </span>
          ${lote.notasRecepcion ? `
            <span class="text-[11px] text-[#414845] italic mt-0.5">Nota de recibo: "${lote.notasRecepcion}"</span>
          ` : ''}
        </div>
      </div>

      <div class="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-3 shrink-0 flex-wrap">
        <div class="text-left lg:text-right mr-1">
          <span class="text-base font-extrabold text-[#00261e] block">${lote.pesoRecibidoKg || lote.cantidadKg} kg</span>
          <span class="text-xs text-[#717975]">${Math.round((lote.pesoRecibidoKg || lote.cantidadKg) * 2.5)} raciones</span>
        </div>

        <span class="px-3 py-1 rounded-full text-xs font-bold ${lote.estado === 'Entregado' ? 'bg-[#d5ee76]/50 text-[#171e00] border border-[#b9d15d]' : 'bg-amber-100 text-amber-900 border border-amber-300'}">
          ${lote.estado}
        </span>

        <button onclick="window.navigate('ruta-logistica?id=${lote.id}')" class="px-3 py-2 bg-[#f4f4ed] hover:bg-[#e8e9e2] text-[#00261e] rounded-xl text-xs font-semibold flex items-center gap-1 transition-all" title="Ver recorrido del vehículo">
          <span class="material-symbols-outlined text-[16px]">route</span>
          <span class="hidden sm:inline">Ver Ruta</span>
        </button>

        ${lote.estado !== 'Entregado' ? `
        <button onclick="window.abrirModalRecibirLote('${lote.id}')" class="px-4 py-2 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">fact_check</span>
          <span>Verificar y Recibir</span>
        </button>
        ` : `
        <button onclick="window.abrirModalCertificado('${lote.id}')" class="px-3.5 py-2 bg-[#123d32] hover:bg-[#0c2821] text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer">
          <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">description</span>
          <span>Acta DIAN</span>
        </button>
        `}
      </div>
    </div>
  `).join('');
}

function renderModalVerificacionRecibo() {
  return `
  <!-- Modal Interactivo de Verificación y Recibo de Alimentos -->
  <div id="modal-recibir-lote" class="hidden fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e8e9e2] flex flex-col gap-4">
      <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-3">
        <div class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-[#123d32] flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">fact_check</span>
          </div>
          <div>
            <h3 class="text-base font-extrabold text-[#00261e]" id="recibo-modal-titulo">Verificación de Alimentos al Recibir</h3>
            <span class="text-xs text-[#546500] font-semibold" id="recibo-modal-sub">Control de calidad e higiene en sede</span>
          </div>
        </div>
        <button type="button" onclick="window.cerrarModalRecibirLote()" class="p-1 rounded-lg hover:bg-black/5 text-[#717975]">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <form id="form-verificar-recibo" onsubmit="window.guardarVerificacionRecibo(event)" class="flex flex-col gap-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold uppercase text-[#717975]">Peso verificado en báscula (kg) *</label>
            <input type="number" step="0.1" min="0.5" required id="recibo-input-peso" class="px-3.5 py-2 rounded-xl border border-[#c0c8c4] text-sm font-bold text-[#00261e] focus:outline-none focus:border-[#123d32]" />
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold uppercase text-[#717975]">Temperatura al llegar *</label>
            <select id="recibo-input-temp" class="px-3.5 py-2 rounded-xl border border-[#c0c8c4] text-xs font-semibold text-[#1a1c18] bg-white focus:outline-none focus:border-[#123d32]">
              <option value="Refrigerado (4 °C)">Refrigerado óptimo (2 °C a 5 °C)</option>
              <option value="En caliente (>60 °C)">Caliente seguro (&gt; 60 °C)</option>
              <option value="Ambiente fresco (20 °C)">Ambiente seco / Panadería (20 °C)</option>
              <option value="Congelado (-18 °C)">Congelado (-18 °C)</option>
            </select>
          </div>

          <div class="flex flex-col gap-1 sm:col-span-2">
            <label class="text-xs font-bold uppercase text-[#717975]">Estado del empaque y calidad de los alimentos</label>
            <select id="recibo-input-calidad" class="px-3.5 py-2 rounded-xl border border-[#c0c8c4] text-xs font-semibold text-[#1a1c18] bg-white focus:outline-none focus:border-[#123d32]">
              <option value="Óptimo - Sellado e higiénico">✓ Óptimo: Recipientes sellados, limpios y olor fresco</option>
              <option value="Aceptable - Consumo inmediato">✓ Aceptable: Para preparación y entrega inmediata hoy</option>
            </select>
          </div>

          <div class="flex flex-col gap-1 sm:col-span-2">
            <label class="text-xs font-bold uppercase text-[#717975]">Observaciones de quien recibe en bodega</label>
            <textarea id="recibo-input-notas" rows="2" placeholder="Ej. Recibido completo y en buen estado por Marta Lucía Correa." class="px-3.5 py-2 rounded-xl border border-[#c0c8c4] text-xs text-[#1a1c18] focus:outline-none focus:border-[#123d32] resize-none"></textarea>
          </div>
        </div>

        <div class="p-3 rounded-xl bg-[#f4f4ed] border border-[#e3e3dc] text-[11px] text-[#414845] flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px] text-[#546500] shrink-0">verified</span>
          <span>Al confirmar, el lote ingresa al inventario del comedor y se expide automáticamente el <strong>Certificado de Donación DIAN</strong> para el restaurante.</span>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2 border-t border-[#f4f4ed]">
          <button type="button" onclick="window.cerrarModalRecibirLote()" class="px-4 py-2 rounded-xl text-xs font-semibold text-[#414845] hover:bg-[#eeeee7]">
            Cancelar
          </button>
          <button type="submit" class="px-5 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer">
            <span class="material-symbols-outlined text-[16px] text-[#d5ee76]">task_alt</span>
            <span>Confirmar Recibo y Generar Acta</span>
          </button>
        </div>
      </form>
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

      <button onclick="window.print()" class="px-4 py-2 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm self-start sm:self-auto">
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
          <div class="p-8 text-center text-xs text-[#717975]">No se han emitido actas de entrega aún. Confirma la recepción de alimentos en tu sede para generar actas oficiales.</div>
        ` : recibidos.map(item => `
          <div class="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#fafaf3] transition-colors">
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-[#123d32] flex items-center justify-center font-bold shrink-0">
                <span class="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-bold text-sm text-[#00261e]">Acta ACTA-${item.id}-2026 · ${item.nombre}</span>
                <span class="text-xs text-[#717975]">Restaurante donante: <strong class="text-[#1a1c18]">${item.establecimiento}</strong></span>
                <span class="text-[11px] text-[#546500] font-mono">
                  ${item.tempLlegada ? `Verificado en sede (${item.tempLlegada}) · Código SHA-256` : 'Verificado en punto de entrega · Código SHA-256'}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-4 shrink-0">
              <div class="text-right">
                <span class="text-sm font-extrabold text-[#00261e] block">${item.pesoRecibidoKg || item.cantidadKg} kg</span>
                <span class="text-[11px] text-[#717975]">${Math.round((item.pesoRecibidoKg || item.cantidadKg) * 2.5)} raciones</span>
              </div>
              <button onclick="window.abrirModalCertificado('${item.id}')" class="px-4 py-2 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer">
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

// 5. DISTRIBUCIÓN Y BENEFICIARIOS (CON FORMULARIO DE ENTREGA DE RACIONES DEL DÍA)
export function renderReceptorImpacto() {
  const distribuciones = repository.getDistribuciones();
  const perfil = repository.getPerfilReceptor();

  const sumInfancia = distribuciones
    .filter(d => d.grupo.includes('Infancia') || d.grupo.includes('Niños'))
    .reduce((acc, c) => acc + (parseInt(c.raciones, 10) || 0), 155);
  const sumMayores = distribuciones
    .filter(d => d.grupo.includes('Mayores'))
    .reduce((acc, c) => acc + (parseInt(c.raciones, 10) || 0), 120);
  const sumMadres = distribuciones
    .filter(d => d.grupo.includes('Madres') || d.grupo.includes('Familia'))
    .reduce((acc, c) => acc + (parseInt(c.raciones, 10) || 0), 165);

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2.5 h-2.5 rounded-full bg-[#546500]"></span>
          <span class="text-xs uppercase font-bold tracking-widest text-[#717975]">Impacto Comunitario y Social</span>
        </div>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">Distribución a Familias Beneficiarias</h1>
        <p class="text-sm text-[#414845] mt-1">Población atendida diariamente en los comedores comunitarios de Belén y la Comuna 16.</p>
      </div>
    </div>

    <!-- Tarjetas de Grupos Focales -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="text-xs uppercase font-bold text-[#717975]">Primera Infancia y Niños</span>
          <span class="material-symbols-outlined text-[#546500]">child_care</span>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-extrabold text-[#00261e]">${sumInfancia}</span>
          <span class="text-xs font-bold text-[#717975]">raciones entregadas</span>
        </div>
        <p class="text-xs text-[#546500] font-semibold">Almuerzos y refrigerios reforzados con proteínas, frutas y lácteos donados.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="text-xs uppercase font-bold text-[#717975]">Adultos Mayores</span>
          <span class="material-symbols-outlined text-[#546500]">elderly</span>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-extrabold text-[#00261e]">${sumMayores}</span>
          <span class="text-xs font-bold text-[#717975]">raciones entregadas</span>
        </div>
        <p class="text-xs text-[#546500] font-semibold">Servicio en el comedor central de Belén y almuerzos en portacomidas llevados a casa para adultos mayores con movilidad reducida.</p>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-[#e8e9e2] shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="text-xs uppercase font-bold text-[#717975]">Madres Cabeza de Familia</span>
          <span class="material-symbols-outlined text-[#546500]">family_restroom</span>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-4xl font-extrabold text-[#00261e]">${sumMadres}</span>
          <span class="text-xs font-bold text-[#717975]">paquetes / raciones</span>
        </div>
        <p class="text-xs text-[#546500] font-semibold">Paquetes de mercado, cereales y panadería para el bienestar alimentario del hogar.</p>
      </div>
    </div>

    <!-- Registro de Entrega Diaria + Historial -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- Formulario para registrar entrega -->
      <div class="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
        <div class="border-b border-[#f4f4ed] pb-3">
          <h2 class="text-base font-bold text-[#00261e] flex items-center gap-2">
            <span class="material-symbols-outlined text-[#546500]">add_task</span>
            <span>Registrar Entrega de Raciones del Día</span>
          </h2>
          <p class="text-xs text-[#717975] mt-0.5">Lleva el control diario de los platos y mercados entregados a la comunidad.</p>
        </div>

        <form onsubmit="window.handleRegistrarDistribucion(event)" class="flex flex-col gap-3.5">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold uppercase text-[#717975]">Grupo Beneficiario *</label>
            <select id="dist-grupo" class="px-3.5 py-2.5 rounded-xl border border-[#c0c8c4] text-xs font-semibold bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]">
              <option value="Primera Infancia y Niños">Primera Infancia y Niños</option>
              <option value="Adultos Mayores">Adultos Mayores</option>
              <option value="Madres Cabeza de Familia">Madres Cabeza de Familia</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase text-[#717975]">Cantidad de raciones *</label>
              <input type="number" id="dist-raciones" min="1" max="500" required value="45" class="px-3.5 py-2 rounded-xl border border-[#c0c8c4] text-sm font-bold text-[#00261e] focus:outline-none focus:border-[#123d32]" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase text-[#717975]">Coordina entrega</label>
              <input type="text" id="dist-responsable" value="${perfil.coordinador || 'Marta Lucía Correa'}" class="px-3.5 py-2 rounded-xl border border-[#c0c8c4] text-xs text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold uppercase text-[#717975]">Alimentos o menú servido *</label>
            <input type="text" id="dist-menu" required placeholder="Ej. Almuerzos con pollo, arroz salteado y porción de fruta" class="px-3.5 py-2.5 rounded-xl border border-[#c0c8c4] text-xs text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
          </div>

          <button type="submit" class="w-full py-3 bg-[#00261e] hover:bg-[#123d32] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all mt-1 cursor-pointer">
            <span class="material-symbols-outlined text-[18px] text-[#d5ee76]">restaurant</span>
            <span>Guardar Registro de Entrega</span>
          </button>
        </form>
      </div>

      <!-- Historial de Jornadas de Entrega -->
      <div class="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#e8e9e2] shadow-sm flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-[#f4f4ed] pb-3">
          <h2 class="text-base font-bold text-[#00261e]">Bitácora Reciente de Entregas Comunitarias</h2>
          <span class="text-xs font-semibold text-[#546500]">${distribuciones.length} jornadas registradas</span>
        </div>

        <div class="divide-y divide-[#eeeee7]">
          ${distribuciones.map(d => `
            <div class="py-3.5 flex items-start justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-[#d5ee76]/40 text-[#123d32] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  <span class="material-symbols-outlined text-[18px]">soup_kitchen</span>
                </div>
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-sm font-bold text-[#00261e]">${d.grupo}</span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#eeeee7] text-[#414845] font-bold">${d.id}</span>
                  </div>
                  <p class="text-xs text-[#414845] mt-0.5">${d.menu}</p>
                  <span class="text-[11px] text-[#717975] mt-0.5 block">Responsable: ${d.responsable} · ${d.fecha}</span>
                </div>
              </div>
              <div class="text-right shrink-0">
                <span class="text-base font-extrabold text-[#00261e] block">+${d.raciones}</span>
                <span class="text-[10px] uppercase font-bold text-[#546500]">raciones</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
  `;
}

// 6. PERFIL DE LA FUNDACIÓN (EDITABLE Y PERSISTENTE)
export function renderReceptorPerfil() {
  const perfil = repository.getPerfilReceptor();

  return `
  <div class="w-full max-w-[1360px] mx-auto px-space-md lg:px-space-lg py-space-lg flex flex-col gap-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span class="text-xs uppercase font-bold tracking-widest text-[#546500]">Ficha Institucional Receptora</span>
        <h1 class="text-3xl font-extrabold text-[#00261e] tracking-tight">${perfil.nombre}</h1>
        <p class="text-sm text-[#414845] mt-1">Organización social verificada de la Red Re-Food · NIT ${perfil.nit}</p>
      </div>

      <span class="px-3.5 py-1.5 rounded-full text-xs font-bold self-start sm:self-auto ${perfil.estadoRecepcion === 'Cerrado' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-[#d5ee76]/60 text-[#171e00] border border-[#b9d15d]'}">
        Estado actual: ${perfil.estadoRecepcion === 'Cerrado' ? 'Cerrado temporalmente' : 'Abierto para recibir donaciones'}
      </span>
    </div>

    <form onsubmit="window.handleGuardarPerfilReceptor(event)" class="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e9e2] shadow-sm flex flex-col gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Columna 1: Datos de la Sede -->
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-bold text-[#00261e] uppercase tracking-wider border-b border-[#f4f4ed] pb-2">Información Operativa de la Sede</h3>

          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold uppercase text-[#717975]">Nombre de la Fundación / Comedor</label>
            <input type="text" id="rec-cfg-nombre" required value="${perfil.nombre}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase text-[#717975]">Dirección de entrega</label>
              <input type="text" id="rec-cfg-direccion" required value="${perfil.direccion}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase text-[#717975]">Municipio</label>
              <input type="text" id="rec-cfg-municipio" required value="${perfil.municipio}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase text-[#717975]">Capacidad de recepción (kg/día)</label>
              <input type="number" id="rec-cfg-capacidad" min="10" required value="${perfil.capacidadKgDia}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs font-bold bg-white text-[#00261e] focus:outline-none focus:border-[#123d32]" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase text-[#717975]">Temperatura Cuarto Frío</label>
              <input type="text" id="rec-cfg-frio" value="${perfil.cuartoFrioTemp || '3.8 °C'}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
          </div>
        </div>

        <!-- Columna 2: Coordinación de Recibo -->
        <div class="flex flex-col gap-4">
          <h3 class="text-sm font-bold text-[#00261e] uppercase tracking-wider border-b border-[#f4f4ed] pb-2">Contacto de Recepción y Horarios</h3>

          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold uppercase text-[#717975]">Coordinador(a) de Bodega y Recibo</label>
            <input type="text" id="rec-cfg-coordinador" required value="${perfil.coordinador}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase text-[#717975]">Teléfono directo / WhatsApp</label>
              <input type="text" id="rec-cfg-telefono" required value="${perfil.telefono}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-bold uppercase text-[#717975]">Estado del Punto de Entrega</label>
              <select id="rec-cfg-estado" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs font-bold bg-white text-[#00261e] focus:outline-none focus:border-[#123d32]">
                <option value="Abierto" ${perfil.estadoRecepcion !== 'Cerrado' ? 'selected' : ''}>Abierto para recibir</option>
                <option value="Cerrado" ${perfil.estadoRecepcion === 'Cerrado' ? 'selected' : ''}>Cerrado temporalmente (Bodega llena)</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-xs font-bold uppercase text-[#717975]">Horario de atención para recibir alimentos</label>
            <input type="text" id="rec-cfg-horario" required value="${perfil.horarioRecepcion}" class="px-4 py-2.5 rounded-xl border border-[#c0c8c4] text-xs bg-white text-[#1a1c18] focus:outline-none focus:border-[#123d32]" />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#f4f4ed]">
        <button type="submit" class="px-6 py-2.5 bg-[#00261e] hover:bg-[#123d32] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer">
          <span class="material-symbols-outlined text-[18px] text-[#d5ee76]">save</span>
          <span>Guardar Datos de la Fundación</span>
        </button>
      </div>
    </form>
  </div>
  `;
}

// ==========================================
// HANDLERS GLOBALES DE LA VISTA RECEPTORA
// ==========================================

window.filtrarDisponiblesReceptor = function(categoria) {
  dispActiveCategory = categoria;
  const btns = document.querySelectorAll('.disp-cat-btn');
  btns.forEach(b => {
    b.className = 'disp-cat-btn px-3 py-1.5 rounded-xl text-xs font-semibold transition-all bg-[#f4f4ed] text-[#414845] hover:bg-[#e8e9e2]';
  });
  const activeBtn = document.getElementById(`disp-cat-${categoria}`);
  if (activeBtn) {
    activeBtn.className = 'disp-cat-btn px-3 py-1.5 rounded-xl text-xs font-semibold transition-all bg-[#00261e] text-white shadow-sm';
  }
  actualizarGridDisponiblesReceptor();
};

window.buscarDisponiblesReceptor = function(query) {
  dispSearchQuery = query || '';
  actualizarGridDisponiblesReceptor();
};

function actualizarGridDisponiblesReceptor() {
  const filtrados = getFilteredDisponibles();
  const grid = document.getElementById('receptor-disponibles-grid');
  if (grid) grid.innerHTML = renderDisponiblesCards(filtrados);
  const badge = document.getElementById('disp-counter-badge');
  if (badge) badge.textContent = `${filtrados.length} lotes listos para recoger`;
}

window.solicitarLoteReceptor = function(loteId) {
  try {
    const lote = repository.getExcedenteById(loteId);
    repository.updateExcedente(loteId, {
      organizacionDestino: 'Fundación Saciar - Nutrimos el Futuro',
      estado: 'Asignado'
    });

    if (typeof window.showToast === 'function') {
      window.showToast(
        '¡Alimento solicitado con éxito!',
        `Se asignó "${lote ? lote.nombre : loteId}" a Fundación Saciar y se programó el vehículo refrigerado para recogerlo.`,
        'success'
      );
    }
    window.navigate('receptor-muelle');
  } catch (err) {
    if (typeof window.showToast === 'function') {
      window.showToast('Error al solicitar lote', err.message, 'error');
    }
  }
};

window.filtrarRecepcionTab = function(tab) {
  recepcionActiveTab = tab;
  window.navigate('receptor-muelle');
};

window.abrirModalRecibirLote = function(loteId) {
  loteParaRecibirId = loteId;
  const lote = repository.getExcedenteById(loteId);
  const modal = document.getElementById('modal-recibir-lote');
  const titulo = document.getElementById('recibo-modal-titulo');
  const sub = document.getElementById('recibo-modal-sub');
  const inputPeso = document.getElementById('recibo-input-peso');
  const inputNotas = document.getElementById('recibo-input-notas');

  if (lote) {
    if (titulo) titulo.textContent = `Recibir: ${lote.nombre}`;
    if (sub) sub.textContent = `Lote ${lote.id} · Donado por ${lote.establecimiento}`;
    if (inputPeso) inputPeso.value = lote.cantidadKg;
    if (inputNotas) inputNotas.value = '';
  }

  if (modal) modal.classList.remove('hidden');
};

window.cerrarModalRecibirLote = function() {
  loteParaRecibirId = null;
  const modal = document.getElementById('modal-recibir-lote');
  if (modal) modal.classList.add('hidden');
};

window.guardarVerificacionRecibo = function(e) {
  if (e) e.preventDefault();
  if (!loteParaRecibirId) return;

  const peso = parseFloat(document.getElementById('recibo-input-peso')?.value) || 0;
  const temp = document.getElementById('recibo-input-temp')?.value || 'Refrigerado (4 °C)';
  const calidad = document.getElementById('recibo-input-calidad')?.value || 'Óptimo';
  const notas = document.getElementById('recibo-input-notas')?.value.trim() || 'Recibido conforme en bodega.';

  try {
    const idConfirmado = loteParaRecibirId;
    repository.updateExcedente(idConfirmado, {
      estado: 'Entregado',
      pesoRecibidoKg: peso,
      cantidadKg: peso,
      tempLlegada: temp,
      estadoCalidad: calidad,
      notasRecepcion: notas
    });

    window.cerrarModalRecibirLote();

    if (typeof window.showToast === 'function') {
      window.showToast(
        '¡Recepción confirmada en bodega!',
        `Se registraron ${peso} kg a ${temp} y se generó el Certificado Oficial DIAN.`,
        'success'
      );
    }

    window.navigate('receptor-actas');
  } catch (err) {
    if (typeof window.showToast === 'function') {
      window.showToast('Error al registrar recibo', err.message, 'error');
    }
  }
};

// Alias retrocompatible
window.confirmarDescargueEnMuelle = function(loteId) {
  window.abrirModalRecibirLote(loteId);
};

window.handleRegistrarDistribucion = function(e) {
  if (e) e.preventDefault();
  const grupo = document.getElementById('dist-grupo')?.value;
  const raciones = document.getElementById('dist-raciones')?.value;
  const responsable = document.getElementById('dist-responsable')?.value;
  const menu = document.getElementById('dist-menu')?.value.trim();

  if (!menu) return;

  repository.addDistribucion({
    grupo,
    raciones,
    menu,
    responsable
  });

  if (typeof window.showToast === 'function') {
    window.showToast(
      'Entrega comunitaria registrada',
      `Se sumaron ${raciones} raciones entregadas a ${grupo}.`,
      'success'
    );
  }

  window.navigate('receptor-impacto');
};

window.handleGuardarPerfilReceptor = function(e) {
  if (e) e.preventDefault();
  const nombre = document.getElementById('rec-cfg-nombre')?.value.trim();
  const direccion = document.getElementById('rec-cfg-direccion')?.value.trim();
  const municipio = document.getElementById('rec-cfg-municipio')?.value.trim();
  const capacidadKgDia = parseFloat(document.getElementById('rec-cfg-capacidad')?.value) || 420;
  const cuartoFrioTemp = document.getElementById('rec-cfg-frio')?.value.trim();
  const coordinador = document.getElementById('rec-cfg-coordinador')?.value.trim();
  const telefono = document.getElementById('rec-cfg-telefono')?.value.trim();
  const estadoRecepcion = document.getElementById('rec-cfg-estado')?.value;
  const horarioRecepcion = document.getElementById('rec-cfg-horario')?.value.trim();

  repository.updatePerfilReceptor({
    nombre,
    direccion,
    municipio,
    capacidadKgDia,
    cuartoFrioTemp,
    coordinador,
    telefono,
    estadoRecepcion,
    horarioRecepcion
  });

  if (typeof window.showToast === 'function') {
    window.showToast(
      'Ficha de la fundación actualizada',
      'Los cambios se guardaron y ya están visibles en tu Centro de Acopio.',
      'success'
    );
  }

  window.navigate('receptor-perfil');
};
