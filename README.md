# 🌱 Re-Food | Red Metropolitana de Rescate Alimentario (Valle de Aburrá)

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
👉 **`URL: https://jcastaho.github.io/Re-Food/`**

---

## 👥 Credenciales de Acceso Oficiales (Multi-Rol)

Re-Food cuenta con dos experiencias completamente adaptadas según el rol del usuario:

| Rol | Entidad / Establecimiento | Usuario / Correo | Contraseña | Pantalla Inicial |
| :--- | :--- | :--- | :--- | :--- |
| 🧑‍🍳 **Donante (Restaurante)** | **Provenza Bistro & Café** | `donante@refood.co` | `donante123` | `#resumen` (Panel Donante) |
| 🤝 **Receptora (Fundación)** | **Fundación Saciar** | `receptor@refood.co` | `receptor123` | `#receptor-dashboard` (Centro de Acopio) |

> 💡 **Acceso Rápido:** En la pantalla de inicio de sesión (`#login`) puedes ingresar con las credenciales anteriores o simplemente hacer clic en los botones directos **"Provenza Bistro"** o **"Fundación Saciar"**.

---

## 🌟 Dos Experiencias Integradas

### 1. 🧑‍🍳 Vista Donante (Establecimiento Gastronómico)
Diseñada para que hoteles, panaderías y restaurantes gestionen sus excedentes antes de que pierdan valor nutricional:

* **Publicación Inteligente con Optimización de Imágenes (`#publicar`):**
  * Compresión automática en el navegador (Canvas a WebP < 80 KB) de fotos tomadas con celular o cámara.
  * Presets fotográficos por categoría (cereales, proteínas, panadería, frutas/verduras, lácteos).
  * Diagnóstico térmico en vivo según la Resolución 2674 de 2013 del INVIMA.
* **Control de Inventario y CRUD Reactivo (`#mis-excedentes`):**
  * Selector de ámbito: *Mis Lotes (Provenza Bistro & Café)* vs. *Red Metropolitana (Todos los Restaurantes)*.
  * Operaciones de edición, borrado seguro con modal y actualización de estados (*Publicado, Asignado, En Ruta, Entregado*).
* **Calculadora Térmica de Inocuidad (`#calculadora`):**
  * Deslizadores interactivos de temperatura y horas de preparación con botón directo para donar el lote verificado.
* **Directorio y Asignación de Fundaciones (`#organizaciones`):**
  * Filtro por municipio (*Medellín, Envigado, Bello*) y asignación de lotes disponibles con 1 clic.
* **Trazabilidad y Ruta Logística (`#ruta-logistica`):**
  * Monitoreo contextual por lote del vehículo refrigerado con control de temperatura en tránsito (4°C).
* **Certificado Oficial de Donación DIAN (`#detalle-donacion`):**
  * Generación y descarga/impresión de acta oficial con código SHA-256 bajo el Artículo 125 del Estatuto Tributario y Ley 1990 de 2019.

---

### 2. 🤝 Vista Receptora (Fundación / Comedor Comunitario)
Diseñada para que comedores sociales y bancos de alimentos gestionen el acopio, verifiquen la entrega de alimentos y certifiquen donaciones:

* **Centro de Acopio Social (`#receptor-dashboard`):**
  * Indicadores en vivo: Kilos recibidos hoy, raciones servidas, pedidos en camino y capacidad disponible en bodega/cuarto frío.
* **Muro de Rescate · Alimentos Disponibles (`#receptor-disponibles`):**
  * Catálogo en tiempo real con filtros por categoría y buscador de comida recién publicada por restaurantes, con botón **"Solicitar este lote para nuestro comedor"** para coordinar la recogida.
* **Recepción de Alimentos y Control de Calidad (`#receptor-muelle`):**
  * Monitoreo de vehículos en camino y formulario interactivo de verificación al recibir (peso verificado en báscula, temperatura de llegada y estado de empaque).
* **Libro de Actas y Certificados Emitidos (`#receptor-actas`):**
  * Historial de certificados tributarios emitidos a favor de los restaurantes donantes, listos para descargar o imprimir.
* **Población Beneficiaria (`#receptor-impacto`):**
  * Registro interactivo de entregas diarias de raciones y trazabilidad social de platos entregados a primera infancia, adultos mayores y madres cabeza de familia en Belén y la Comuna 16.
* **Ficha Institucional Receptora (`#receptor-perfil`):**
  * Configuración editable y persistente de la capacidad diaria de bodega (kg/día), horarios de recepción, estado del punto de entrega (*Abierto / Cerrado*) y contacto del coordinador.

---

## 🏛️ Clean Architecture (Arquitectura Limpia)

El proyecto está estructurado estrictamente bajo los principios de Clean Architecture usando **JavaScript ES Modules nativo**:

```
Re-Food/
├── index.html                   # Shell SPA (Sidebar adaptativo, Header y Contenedor Reactivo)
├── 404.html                     # Fallback SPA para GitHub Pages
├── .nojekyll                    # Configuración para GitHub Pages
├── server.js                    # Servidor local de desarrollo (Node.js nativo)
│
├── js/
│   ├── app.js                   # Bootstrap de la aplicación y sincronización de badges
│   │
│   ├── core/                    # 🏛️ CAPA DE DOMINIO (Reglas de negocio puras)
│   │   ├── entities.js          # Entidades: Excedente, Organizacion, Donacion
│   │   ├── useCases.js          # Casos de uso: Inocuidad, Huella Ambiental, Raciones
│   │   └── imageCompressor.js   # Optimización y compresión client-side WebP/JPEG
│   │
│   ├── data/                    # 💾 CAPA DE DATOS (Patrón Repository y Persistencia)
│   │   ├── mockData.js          # Datos iniciales (Provenza Bistro, Saciar, Laureles, etc.)
│   │   └── repository.js        # Repositorio agnóstico con sincronización en LocalStorage
│   │
│   └── presentation/            # 🎨 CAPA DE PRESENTACIÓN (UI y Enrutamiento)
│       ├── router.js            # Router SPA multi-rol basado en HashRouting
│       └── views/               # Controladores y componentes de vista
│           ├── dashboardView.js       # Panel principal del donante
│           ├── publicarView.js        # Formulario de publicación y edición con fotos
│           ├── misExcedentesView.js   # Inventario y filtros reactivos del restaurante
│           ├── calculadoraView.js     # Calculadora térmica de inocuidad conectada
│           ├── organizacionesView.js  # Directorio y asignación de fundaciones por municipio
│           ├── receptorViews.js       # Vistas exclusivas de la entidad receptora (Saciar)
│           ├── loginView.js           # Inicio de sesión con selector de roles
│           └── extraViews.js          # Ruta logística, impacto, guía, certificado DIAN
```

---

## 💻 Cómo Ejecutar en Local

### Opción 1: Con Node.js (Recomendado)

No requiere instalación de librerías externas (`npm install` no es necesario).

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

## 📜 Marco Normativo Colombiano Aplicado

* **Ley 1990 de 2019:** Política de Prevención y Reducción de Pérdidas y Desperdicios de Alimentos en Colombia.
* **Resolución 2674 de 2013 (INVIMA):** Buenas prácticas de manufactura y control térmico en transporte refrigerado.
* **Artículo 125 del Estatuto Tributario:** Beneficio de deducción y descuento del impuesto de renta por donaciones de alimentos a entidades sin ánimo de lucro certificadas (ESAL).
