/**
 * Presentation Layer - Login View
 * Pantalla de inicio de sesión de Stitch adaptada para acceso instantáneo
 */

export function renderLogin() {
  return `
  <div class="fixed inset-0 z-50 bg-[#F7F7F0] flex flex-col justify-between selection:bg-[#D9F27A] selection:text-[#123D32] overflow-y-auto min-h-screen">
    <!-- Barra superior informativa / Simulador -->
    <aside class="w-full bg-[#0a231d] text-white/80 py-2.5 px-4 text-xs z-50 border-b border-[#123D32]">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-[#D9F27A] animate-pulse"></span>
          <span class="font-medium text-white tracking-wide uppercase text-[11px]">Acceso Libre Donantes:</span>
          <span class="text-white/60 hidden sm:inline">Ingresa con cualquier correo o presiona directamente el botón "Iniciar Sesión"</span>
        </div>
        <div class="flex items-center gap-1.5 py-0.5">
          <button onclick="window.quickDemoLogin()" class="px-3 py-1 rounded bg-[#D9F27A] text-[#123D32] text-xs font-bold transition-all hover:bg-[#c2f362] shadow-sm flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">bolt</span>
            <span>Entrar como Provenza Bistro</span>
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
              Red de Rescate · Valle de Aburrá
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
                Conectamos excedentes alimentarios de establecimientos gastronómicos en Medellín con comedores y fundaciones que los necesitan.
              </p>
            </div>

            <!-- Impact Metric Floating Badge -->
            <div class="bg-[#123D32]/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 text-white max-w-lg shadow-xl flex items-start gap-4">
              <div class="w-11 h-11 rounded-xl bg-[#D9F27A]/20 flex-shrink-0 flex items-center justify-center text-[#D9F27A] border border-[#D9F27A]/30">
                <span class="material-symbols-outlined text-[24px]">eco</span>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-[#D9F27A]">Impacto Consolidado</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-[#D9F27A]/60"></span>
                  <span class="text-xs text-white/70">Medellín & AMVA</span>
                </div>
                <p class="text-sm sm:text-base font-medium text-white/95 leading-snug">
                  Más de <strong class="text-[#D9F27A] font-bold">14.800 kg</strong> redistribuidos a comedores y bancos de alimentos locales.
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
            <span>Versión 2.4</span>
          </footer>
        </section>

        <!-- Columna Derecha: Formulario de Acceso (48%) -->
        <section class="w-full lg:w-[48%] bg-[#F7F7F0] flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative">
          <div class="max-w-md w-full mx-auto my-auto py-2">
            
            <!-- Encabezado de Formulario -->
            <div class="mb-8">
              <div class="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-md bg-[#123D32]/5 border border-[#123D32]/10">
                <span class="w-1.5 h-1.5 rounded-full bg-[#123D32]"></span>
                <span class="text-[11px] font-bold uppercase tracking-wider text-[#123D32]">
                  Centro de Control Donantes
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-[#123D32] tracking-tight leading-tight">
                Qué bueno tenerte de vuelta
              </h2>
              <p class="mt-2 text-xs sm:text-sm text-[#77817A] leading-relaxed">
                Ingresa para programar recolecciones de excedentes, calcular inocuidad y seguir tus donaciones en tiempo real.
              </p>
            </div>

            <!-- Formulario interactivo sin restricciones -->
            <form onsubmit="window.handleLoginSubmit(event)" class="flex flex-col gap-5">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-bold uppercase tracking-wider text-[#77817A]">
                  Correo Electrónico o Usuario
                </label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-3 text-[#77817A] text-[20px]">mail</span>
                  <input type="text" id="login-email" value="gerencia@provenzabistro.co" placeholder="tu-correo@restaurante.com" class="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E5E7DE] focus:outline-none focus:border-[#123D32] focus:ring-2 focus:ring-[#123D32]/20 text-sm bg-white text-[#202D29] shadow-xs" />
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold uppercase tracking-wider text-[#77817A]">
                    Contraseña
                  </label>
                  <a href="#" onclick="alert('Modo demostración: puedes ingresar con cualquier contraseña o sin ella.'); return false;" class="text-xs text-[#546500] hover:underline font-semibold">
                    ¿Olvidaste tu clave?
                  </a>
                </div>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-3 text-[#77817A] text-[20px]">lock</span>
                  <input type="password" id="login-password" value="••••••••••••" placeholder="Contraseña de acceso" class="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E5E7DE] focus:outline-none focus:border-[#123D32] focus:ring-2 focus:ring-[#123D32]/20 text-sm bg-white text-[#202D29] shadow-xs" />
                </div>
              </div>

              <div class="flex items-center justify-between text-xs text-[#77817A]">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked class="w-4 h-4 accent-[#123D32] rounded cursor-pointer" />
                  <span>Mantener sesión iniciada</span>
                </label>
                <span class="text-emerald-700 font-semibold flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Acceso habilitado
                </span>
              </div>

              <button type="submit" id="btn-login-submit" class="w-full py-3.5 px-4 bg-[#123D32] hover:bg-[#0e2f27] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all mt-2">
                <span id="btn-login-text">Iniciar Sesión en Centro de Control</span>
                <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <div class="relative flex items-center justify-center my-1">
                <div class="border-t border-[#E5E7DE] w-full"></div>
                <span class="bg-[#F7F7F0] px-3 text-xs text-[#77817A] uppercase font-bold tracking-wider">o</span>
              </div>

              <!-- Botón Acceso Rápido Directo sin credenciales -->
              <button type="button" onclick="window.quickDemoLogin()" class="w-full py-3 px-4 bg-white hover:bg-neutral-50 text-[#123D32] border border-[#123D32]/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all">
                <span class="material-symbols-outlined text-[18px] text-[#546500]">rocket_launch</span>
                <span>Entrar directamente sin credenciales (Demo)</span>
              </button>
            </form>

            <!-- Nota de Registro -->
            <div class="mt-8 pt-6 border-t border-[#E5E7DE] text-center">
              <p class="text-xs text-[#77817A]">
                ¿Eres un hotel, restaurante o negocio nuevo en Medellín? <br />
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

// Controladores para Login interactivo
window.handleLoginSubmit = function(e) {
  if (e) e.preventDefault();
  const btn = document.getElementById('btn-login-text');
  if (btn) btn.textContent = 'Accediendo al Panel...';

  const emailInput = document.getElementById('login-email');
  const userEmail = emailInput ? emailInput.value.trim() : 'donante@refood.co';

  // Guardar estado de autenticación en localStorage
  localStorage.setItem('refood_logged_in', 'true');
  localStorage.setItem('refood_user_email', userEmail || 'donante@refood.co');

  setTimeout(() => {
    window.navigate('resumen');
  }, 400);
};

window.quickDemoLogin = function() {
  localStorage.setItem('refood_logged_in', 'true');
  localStorage.setItem('refood_user_email', 'gerencia@provenzabistro.co');
  window.navigate('resumen');
};

window.logout = function() {
  localStorage.removeItem('refood_logged_in');
  window.navigate('login');
};
