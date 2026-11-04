/**
 * Presentation Layer - Login View
 * Pantalla de inicio de sesión con soporte multi-rol (Donante vs Receptora)
 */

export function renderLogin() {
  return `
  <div class="fixed inset-0 z-50 bg-[#F7F7F0] flex flex-col justify-between selection:bg-[#D9F27A] selection:text-[#123D32] overflow-y-auto min-h-screen">
    <!-- Barra superior informativa / Accesos de Prueba Rápidos -->
    <aside class="w-full bg-[#0a231d] text-white/80 py-2.5 px-4 text-xs z-50 border-b border-[#123D32]">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-[#D9F27A] animate-pulse"></span>
          <span class="font-medium text-white tracking-wide uppercase text-[11px]">Acceso Demostrativo Multi-Rol:</span>
          <span class="text-white/60 hidden sm:inline">Selecciona el tipo de cuenta para explorar su experiencia:</span>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button onclick="window.loginAsRole('donante')" class="px-3 py-1 rounded bg-[#D9F27A] text-[#123D32] text-xs font-bold transition-all hover:bg-[#c2f362] shadow-sm flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">store</span>
            <span>Restaurante Donante</span>
          </button>
          <button onclick="window.loginAsRole('receptor')" class="px-3 py-1 rounded bg-white text-[#123D32] text-xs font-bold transition-all hover:bg-neutral-100 shadow-sm flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px] text-[#546500]">volunteer_activism</span>
            <span>Fundación Receptora</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Contenedor Principal del Viewport -->
    <main class="flex-grow flex items-center justify-center p-0 lg:p-4 xl:p-8">
      <div class="w-full max-w-[1400px] bg-white lg:rounded-3xl shadow-2xl overflow-hidden border border-[#E5E7DE] min-h-[calc(100vh-42px)] lg:min-h-[780px] flex flex-col lg:flex-row">
        
        <!-- Columna Izquierda Editorial (52%) -->
        <section class="relative w-full lg:w-[52%] min-h-[440px] lg:min-h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden bg-[#123D32]">
          <!-- Fondo fotográfico con gradiente corporativo Re-Food -->
          <div class="absolute inset-0 z-0">
            <img alt="Cocina profesional y rescate de alimentos en Medellín" class="w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.02]" src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#123D32] via-[#123D32]/80 to-[#123D32]/50 mix-blend-multiply"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#123D32]/90 via-[#123D32]/60 to-transparent"></div>
          </div>

          <!-- Top Area: Brand Emblem -->
          <header class="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3">
            <div class="inline-flex items-center gap-3.5 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-white/40 max-w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100" class="h-8 w-auto max-w-full" fill="none">
                <g transform="translate(15, 20)">
                  <path d="M 32 5 C 10 20 6 42 18 55 C 24 40 28 22 32 5 Z" fill="#123D32"></path>
                  <path d="M 34 5 C 38 22 42 40 36 55 C 50 45 54 22 34 5 Z" fill="#60BA80"></path>
                </g>
                <text x="85" y="58" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="44" letter-spacing="-0.03em">
                  <tspan fill="#60BA80">Re</tspan><tspan fill="#123D32">Food</tspan>
                </text>
                <text x="86" y="78" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="600" font-size="9" fill="#123D32" letter-spacing="0.22em">
                  CONECTA · DONA · APROVECHA
                </text>
              </svg>
            </div>
            <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D9F27A] text-[#123D32] font-bold text-[11px] tracking-wider uppercase shadow-sm border border-[#A9D84B]">
              <span class="w-2 h-2 rounded-full bg-[#546500]"></span>
              Red Metropolitana · Valle de Aburrá
            </span>
          </header>

          <!-- Centro: Manifiesto y Cifra de Impacto -->
          <div class="relative z-10 mt-12 lg:mt-auto pt-6">
            <div class="mb-6 max-w-xl">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-3">
                Lo que sobra aquí, <br class="hidden sm:inline" />
                <span class="text-[#D9F27A] inline-block underline decoration-[#D9F27A]/50 decoration-4">alimenta allá.</span>
              </h1>
              <p class="text-sm sm:text-base text-white/90 font-normal leading-relaxed max-w-md">
                Plataforma de rescate que conecta los excedentes de hoteles, restaurantes y panaderías con comedores comunitarios y bancos de alimentos en Medellín.
              </p>
            </div>

            <!-- Impact Metric Floating Badge -->
            <div class="bg-[#123D32]/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 text-white max-w-lg shadow-xl flex items-start gap-4">
              <div class="w-11 h-11 rounded-xl bg-[#D9F27A]/20 flex-shrink-0 flex items-center justify-center text-[#D9F27A] border border-[#D9F27A]/30">
                <span class="material-symbols-outlined text-[24px]">eco</span>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-[#D9F27A]">Economía Circular Activa</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-[#D9F27A]/60"></span>
                  <span class="text-xs text-white/70">Valle de Aburrá</span>
                </div>
                <p class="text-sm sm:text-base font-medium text-white/95 leading-snug">
                  Trazabilidad 100% certificada con acta DIAN y control de cadena de frío en tránsito.
                </p>
              </div>
            </div>
          </div>

          <!-- Footer Izquierdo -->
          <footer class="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span class="flex items-center gap-1.5">
              <span class="inline-block w-2 h-2 rounded-full bg-[#D9F27A]"></span>
              Red Metropolitana Re-Food · Medellín
            </span>
            <span>Versión 2.5 Multi-Rol</span>
          </footer>
        </section>

        <!-- Columna Derecha: Formulario de Acceso (48%) -->
        <section class="w-full lg:w-[48%] bg-[#F7F7F0] flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative">
          <div class="max-w-md w-full mx-auto my-auto py-2">
            
            <!-- Encabezado de Formulario con Selector de Rol -->
            <div class="mb-6">
              <div class="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-md bg-[#123D32]/5 border border-[#123D32]/10">
                <span class="w-1.5 h-1.5 rounded-full bg-[#123D32]"></span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#123D32]" id="role-badge-text">
                  Inicio de Sesión
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123D32] tracking-tight leading-tight">
                Acceso a la Plataforma
              </h2>
              <p class="mt-1.5 text-xs sm:text-sm text-[#77817A] leading-relaxed">
                Selecciona tu tipo de cuenta o ingresa con tus credenciales asignadas:
              </p>
            </div>

            <!-- Selector Visual de Rol -->
            <div class="grid grid-cols-2 gap-2 p-1.5 bg-[#e8e9e2] rounded-2xl mb-5">
              <button type="button" onclick="window.selectLoginTab('donante')" id="tab-login-donante" class="py-2.5 px-3 rounded-xl text-xs font-bold transition-all bg-[#00261e] text-white shadow-sm flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-[16px]">store</span>
                <span>Donante (Restaurante)</span>
              </button>
              <button type="button" onclick="window.selectLoginTab('receptor')" id="tab-login-receptor" class="py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-[#414845] hover:text-[#1a1c18] flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-[16px]">volunteer_activism</span>
                <span>Receptora (Fundación)</span>
              </button>
            </div>

            <!-- Formulario interactivo con credenciales asignadas -->
            <form onsubmit="window.handleLoginSubmit(event)" class="flex flex-col gap-4">
              <div class="flex flex-col gap-1">
                <label class="text-xs font-bold uppercase tracking-wider text-[#77817A]">
                  Correo Electrónico
                </label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-3 text-[#77817A] text-[20px]">mail</span>
                  <input type="email" id="login-email" required value="donante@refood.co" placeholder="tu-correo@refood.co" class="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E5E7DE] focus:outline-none focus:border-[#123D32] focus:ring-2 focus:ring-[#123D32]/20 text-sm bg-white text-[#202D29] shadow-xs" />
                </div>
              </div>

              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold uppercase tracking-wider text-[#77817A]">
                    Contraseña
                  </label>
                  <span class="text-xs text-[#546500] font-mono font-semibold" id="pass-hint">
                    donante123
                  </span>
                </div>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-3 text-[#77817A] text-[20px]">lock</span>
                  <input type="password" id="login-password" required value="donante123" placeholder="Contraseña de acceso" class="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E5E7DE] focus:outline-none focus:border-[#123D32] focus:ring-2 focus:ring-[#123D32]/20 text-sm bg-white text-[#202D29] shadow-xs" />
                </div>
              </div>

              <button type="submit" id="btn-login-submit" class="w-full py-3.5 px-4 bg-[#123D32] hover:bg-[#0e2f27] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all mt-1">
                <span id="btn-login-text">Iniciar Sesión</span>
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <div class="relative flex items-center justify-center my-0.5">
                <div class="border-t border-[#E5E7DE] w-full"></div>
                <span class="bg-[#F7F7F0] px-3 text-[11px] text-[#77817A] uppercase font-bold tracking-wider">o ingresar con 1 clic</span>
              </div>

              <!-- Botones de Acceso Directo por Rol -->
              <div class="grid grid-cols-2 gap-2">
                <button type="button" onclick="window.loginAsRole('donante')" class="py-2.5 px-3 bg-white hover:bg-neutral-50 text-[#123D32] border border-[#123D32]/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs">
                  <span class="material-symbols-outlined text-[16px] text-[#546500]">store</span>
                  <span>Provenza Bistro</span>
                </button>
                <button type="button" onclick="window.loginAsRole('receptor')" class="py-2.5 px-3 bg-white hover:bg-neutral-50 text-[#123D32] border border-[#123D32]/30 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs">
                  <span class="material-symbols-outlined text-[16px] text-[#546500]">volunteer_activism</span>
                  <span>Fundación Saciar</span>
                </button>
              </div>
            </form>

            <!-- Nota de Registro e Institucional -->
            <div class="mt-6 pt-4 border-t border-[#E5E7DE] text-center">
              <p class="text-xs text-[#77817A]">
                ¿Quieres vincular tu restaurante o comedor comunitario? <br />
                <a href="#institucional" class="text-[#123D32] font-bold hover:underline inline-flex items-center gap-1 mt-1">
                  <span>Conoce el programa Re-Food Valle de Aburrá</span>
                  <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
  `;
}

let currentSelectedRole = 'donante';

window.selectLoginTab = function(role) {
  currentSelectedRole = role;
  const btnDon = document.getElementById('tab-login-donante');
  const btnRec = document.getElementById('tab-login-receptor');
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  const passHint = document.getElementById('pass-hint');
  const badgeText = document.getElementById('role-badge-text');

  if (role === 'donante') {
    if (btnDon) btnDon.className = "py-2.5 px-3 rounded-xl text-xs font-bold transition-all bg-[#00261e] text-white shadow-sm flex items-center justify-center gap-1.5";
    if (btnRec) btnRec.className = "py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-[#414845] hover:text-[#1a1c18] flex items-center justify-center gap-1.5";
    if (emailInput) emailInput.value = 'donante@refood.co';
    if (passInput) passInput.value = 'donante123';
    if (passHint) passHint.textContent = 'donante123';
    if (badgeText) badgeText.textContent = 'Restaurante Donante';
  } else {
    if (btnDon) btnDon.className = "py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-[#414845] hover:text-[#1a1c18] flex items-center justify-center gap-1.5";
    if (btnRec) btnRec.className = "py-2.5 px-3 rounded-xl text-xs font-bold transition-all bg-[#00261e] text-white shadow-sm flex items-center justify-center gap-1.5";
    if (emailInput) emailInput.value = 'receptor@refood.co';
    if (passInput) passInput.value = 'receptor123';
    if (passHint) passHint.textContent = 'receptor123';
    if (badgeText) badgeText.textContent = 'Fundación Receptora';
  }
};

window.handleLoginSubmit = function(e) {
  if (e) e.preventDefault();
  const email = document.getElementById('login-email')?.value.trim().toLowerCase() || '';

  // Deducir rol por correo o tab activo
  let role = currentSelectedRole;
  if (email.includes('receptor') || email.includes('saciar') || email.includes('comedor')) {
    role = 'receptor';
  } else if (email.includes('donante') || email.includes('provenza') || email.includes('bistro')) {
    role = 'donante';
  }

  window.loginAsRole(role);
};

window.loginAsRole = function(role) {
  const isDonante = role === 'donante';

  localStorage.setItem('refood_logged_in', 'true');
  localStorage.setItem('refood_role', role);
  localStorage.setItem('refood_entity_name', isDonante ? 'Provenza Bistro & Café' : 'Fundación Saciar');
  localStorage.setItem('refood_user_email', isDonante ? 'donante@refood.co' : 'receptor@refood.co');

  if (typeof window.applyRoleShell === 'function') {
    window.applyRoleShell(role);
  }

  // Navegar a la pantalla de inicio correspondiente a cada rol
  window.navigate(isDonante ? 'resumen' : 'receptor-dashboard');
};

window.logout = function() {
  localStorage.removeItem('refood_logged_in');
  localStorage.removeItem('refood_role');
  localStorage.removeItem('refood_entity_name');
  window.navigate('login');
};
