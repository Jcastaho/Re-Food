# 🌱 Re-Food | Red Metropolitana de Rescate Alimentario (Valle de Aburrá)

URL: https://jcastaho.github.io/Re-Food/

> **"Lo que sobra aquí, alimenta allá."**  
> Plataforma tecnológica para conectar excedentes alimentarios de hoteles, restaurantes y panaderías con bancos de alimentos y comedores comunitarios en Medellín y el Valle de Aburrá.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean%20Architecture-00261e?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success?style=for-the-badge&logo=github)

---

## 🚀 Demo en Vivo en GitHub Pages

Puedes acceder a la versión desplegada en vivo a través del siguiente enlace una vez habilitado el servicio:
👉 **`https://<tu-usuario-de-github>.github.io/Re-Food/`**

---

## 🌟 Características Principales

1. **Centro de Control para Donantes (Dashboard):**
   - Indicadores en tiempo real: Excedentes publicados, Alimentos recuperados (kg), Donaciones entregadas y tasa de efectividad (100%).
   - Gráfico de progreso ecológico y social (Raciones servidas, CO₂e evitado).
   - Tabla interactiva con trazabilidad de lotes en ruta y entregados.

2. **Publicación Inteligente de Excedentes (`#publicar`):**
   - Formulario para registrar alimentos por categoría (Cereales, Proteínas, Panadería, Frutas/Verduras, Lácteos).
   - Selección de temperatura (°C) y horario de recogida.
   - Diagnóstico automático de inocuidad en tiempo real.
   - Almacenamiento reactivo local que actualiza de inmediato el dashboard.

3. **Gestión de Inventario (`#mis-excedentes`):**
   - Listado completo de lotes con filtros por estado: _Todos_, _En Ruta_, _Asignados_, _Entregados_.
   - Buscador por nombre de alimento o código de lote.

4. **Calculadora Interactiva de Inocuidad y Vida Útil (`#calculadora`):**
   - Algoritmo térmico basado en la Resolución 2674 de 2013 y normatividad INVIMA.
   - Deslizadores en tiempo real para evaluar zonas de peligro térmico y semáforo bacteriológico (_Seguro_, _Precaución_, _Riesgo Crítico_).

5. **Directorio y Trazabilidad Logística:**
   - **Organizaciones Receptoras (`#organizaciones`):** Catálogo de ONGs y comedores auditados.
   - **Banco de Alimentos de Medellín (`#banco-alimentos`):** Ficha técnica con capacidad y horarios.
   - **Ruta Logística en Vivo (`#ruta-logistica`):** Seguimiento de la furgoneta isotérmica con control de temperatura en tránsito.
   - **Detalle de Donación (`#detalle-donacion`):** Trazabilidad del lote con hash y certificado.

6. **Pantalla de Inicio de Sesión (`#login`):**
   - Diseño editorial completo dividido en área informativa e interfaz de acceso.
   - **Acceso demostrativo:** Permite ingresar con cualquier correo/contraseña o directamente dando clic en el botón _"Iniciar Sesión"_ o _"Entrar directamente sin credenciales"_.

---

## 🏛️ Clean Architecture (Arquitectura Limpia)

El proyecto está estructurado estrictamente bajo los principios de Clean Architecture usando **JavaScript ES Modules nativo**:

```
Re-Food/
├── index.html                   # Shell SPA (Sidebar, Header y Contenedor Reactivo)
├── 404.html                     # Fallback SPA para GitHub Pages
├── .nojekyll                    # Configuración para GitHub Pages
├── server.js                    # Servidor local de desarrollo (Node.js nativo)
│
├── js/
│   ├── app.js                   # Bootstrap de la aplicación
│   │
│   ├── core/                    # 🏛️ CAPA DE DOMINIO (Reglas de negocio puras)
│   │   ├── entities.js          # Entidades: Excedente, Organizacion, Donacion
│   │   └── useCases.js          # Casos de uso: Inocuidad, Huella Ambiental, Raciones
│   │
│   ├── data/                    # 💾 CAPA DE DATOS (Patrón Repository y Persistencia)
│   │   ├── mockData.js          # Datos precargados de Stitch (Provenza, Laureles, etc.)
│   │   └── repository.js        # Repositorio agnóstico con sincronización en LocalStorage
│   │
│   └── presentation/            # 🎨 CAPA DE PRESENTACIÓN (UI y Enrutamiento)
│       ├── router.js            # Router SPA basado en HashRouting
│       └── views/               # Controladores y componentes de vista
│           ├── dashboardView.js       # Panel principal del donante
│           ├── publicarView.js        # Formulario de publicación interactivo
│           ├── misExcedentesView.js   # Inventario y filtros reactivos
│           ├── calculadoraView.js     # Calculadora térmica de inocuidad
│           ├── organizacionesView.js  # Directorio de fundaciones
│           ├── loginView.js           # Inicio de sesión editorial fullscreen
│           └── extraViews.js          # Impacto, Ruta, Guía, Configuración
```

---

## 💻 Cómo Ejecutar en Local

### Opción 1: Con Node.js (Recomendado)

No requiere instalación de librerías (`npm install` no es necesario).

```bash
# Iniciar servidor nativo en el puerto 8000
node server.js
```

Abre tu navegador en: **`http://localhost:8000`**

### Opción 2: Cualquier Servidor Estático

```bash
# Con npx serve
npx serve . -p 8000

# Con Python
python -m http.server 8000
```

---

## 🌐 Cómo Activar GitHub Pages Paso a Paso

1. Sube los cambios a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "feat: complete Re-Food dashboard with Clean Architecture and GitHub Pages support"
   git push origin main
   ```
2. En GitHub, ve a la pestaña **Settings** (Configuración) de tu repositorio.
3. En el menú lateral izquierdo, haz clic en **Pages**.
4. En la sección **Build and deployment**:
   - **Source:** Selecciona `Deploy from a branch`.
   - **Branch:** Selecciona `main` (o `master`) y la carpeta `/ (root)`.
   - Haz clic en **Save** (Guardar).
5. Espera 1 minuto y GitHub Pages te mostrará tu enlace oficial:
   `https://<tu-usuario>.github.io/Re-Food/`

---

## 👥 Créditos y Licencia

Desarrollado para la iniciativa **Re-Food Valle de Aburrá / Medellín**. Código bajo licencia MIT.
