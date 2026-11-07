/**
 * Data Layer - Mock Data precargado fiel a los mockups de Stitch
 */

export const INITIAL_EXCEDENTES = [
  {
    id: "RF-8492",
    nombre: "Arroz chaufa y vegetales salteados",
    establecimiento: "Provenza Bistro & Café",
    categoria: "Cereales y preparados",
    ubicacion: "El Poblado, Medellín",
    cantidadKg: 14.5,
    estado: "En Ruta", // 'Publicado' | 'Asignado' | 'En Ruta' | 'Entregado'
    caducidadHoras: 6,
    temperatura: "En caliente (>60°C)",
    horaLimite: "16:00",
    notas: "Empacado en bandejas térmicas de aluminio selladas.",
    imagenUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    organizacionDestino: "Banco de Alimentos de Medellín",
    fechaPublicacion: "18 de octubre de 2026, 14:30"
  },
  {
    id: "RF-8491",
    nombre: "Pan de masa madre y croissants",
    establecimiento: "Panadería Artesanal Laureles",
    categoria: "Panadería y secos",
    ubicacion: "Laureles, Medellín",
    cantidadKg: 8.2,
    estado: "Asignado",
    caducidadHoras: 24,
    temperatura: "Ambiente (20°C)",
    horaLimite: "18:00",
    notas: "Horneado del día, empacado en bolsas de papel kraft.",
    imagenUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    organizacionDestino: "Fundación Saciar Calle 30",
    fechaPublicacion: "18 de octubre de 2026, 11:15"
  },
  {
    id: "RF-8488",
    nombre: "Bandejas de proteína y ensalada",
    establecimiento: "Hotel Parque Envigado",
    categoria: "Proteínas cocidas",
    ubicacion: "Envigado, Antioquia",
    cantidadKg: 19.0,
    estado: "Publicado",
    caducidadHoras: 8,
    temperatura: "Refrigerado (4°C)",
    horaLimite: "19:30",
    notas: "Almacenado a 4°C en cuarto frío. Listo para transporte refrigerado.",
    imagenUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    organizacionDestino: "En proceso de match",
    fechaPublicacion: "18 de octubre de 2026, 10:00"
  },
  {
    id: "RF-8475",
    nombre: "Tomate chonto, aguacate y plátano",
    establecimiento: "Mercado Orgánico Sabaneta",
    categoria: "Frutas y verduras",
    ubicacion: "Sabaneta, Antioquia",
    cantidadKg: 26.0,
    estado: "Entregado",
    caducidadHoras: 48,
    temperatura: "Ambiente (20°C)",
    horaLimite: "15:00",
    notas: "Canastillas limpias de plástico de alta densidad.",
    imagenUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
    organizacionDestino: "Comedor Comunitario Santo Domingo",
    fechaPublicacion: "17 de octubre de 2026, 16:45"
  }
];

export const INITIAL_ORGANIZACIONES = [
  {
    id: "ORG-01",
    nombre: "Banco de Alimentos de Medellín",
    tipo: "Banco Central de Alimentos",
    direccion: "Carrera 51 # 28-34, Barrio Colombia",
    municipio: "Medellín",
    capacidadKgDia: 850,
    beneficiarios: 1200,
    distanciaKm: 4.8,
    certificacion: "HACCP & Invima Nivel 4",
    estadoVerificacion: "Verificada",
    telefono: "+57 (604) 448 3200",
    descripcion: "Nodo principal de redistribución alimentaria para comunidades vulnerables y comedores del Valle de Aburrá."
  },
  {
    id: "ORG-02",
    nombre: "Fundación Saciar - Nutrimos el Futuro",
    tipo: "Comedor y Banco Social",
    direccion: "Calle 30A # 65-12, Belén",
    municipio: "Medellín",
    capacidadKgDia: 420,
    beneficiarios: 680,
    distanciaKm: 3.2,
    certificacion: "Registro Social Vigente",
    estadoVerificacion: "Verificada",
    telefono: "+57 (604) 312 8840",
    descripcion: "Atención prioritaria a adultos mayores y madres cabeza de familia en el occidente de Medellín."
  },
  {
    id: "ORG-03",
    nombre: "Hogar Infantil San José",
    tipo: "Centro de Cuidado Infantil",
    direccion: "Circular 4 # 73-19, Laureles",
    municipio: "Medellín",
    capacidadKgDia: 120,
    beneficiarios: 190,
    distanciaKm: 5.1,
    certificacion: "ICBF Autorizado",
    estadoVerificacion: "Verificada",
    telefono: "+57 (604) 411 9022",
    descripcion: "Recepción de frutas, lácteos y preparados para nutrición balanceada de primera infancia."
  },
  {
    id: "ORG-04",
    nombre: "Comedor Comunitario Semillas de Esperanza",
    tipo: "Comedor Barrial",
    direccion: "Cra 32 # 102-18, Santo Domingo Savio",
    municipio: "Medellín",
    capacidadKgDia: 250,
    beneficiarios: 400,
    distanciaKm: 9.4,
    certificacion: "Alianza Re-Food",
    estadoVerificacion: "Verificada",
    telefono: "+57 310 492 8119",
    descripcion: "Distribución directa de almuerzos comunitarios diarios en la zona nororiental."
  },
  {
    id: "ORG-05",
    nombre: "Hogar San Vicente de Paúl",
    tipo: "Hogar de Paso y Nutrición",
    direccion: "Calle 38 Sur # 43A-19, Parque Principal",
    municipio: "Envigado",
    capacidadKgDia: 180,
    beneficiarios: 220,
    distanciaKm: 6.2,
    certificacion: "Verificación Municipal",
    estadoVerificacion: "Verificada",
    telefono: "+57 (604) 331 4455",
    descripcion: "Atención alimentaria a adultos mayores y familias vulnerables del sur del Valle de Aburrá."
  },
  {
    id: "ORG-06",
    nombre: "Comedor del Norte La Gabriela",
    tipo: "Comedor Comunitario",
    direccion: "Diagonal 52 # 14-30, La Gabriela",
    municipio: "Bello",
    capacidadKgDia: 310,
    beneficiarios: 450,
    distanciaKm: 12.8,
    certificacion: "Alianza Red Valle de Aburrá",
    estadoVerificacion: "Verificada",
    telefono: "+57 (604) 451 9020",
    descripcion: "Nodo de recepción rápida para excedentes de panadería y frutas en el norte metropolitano."
  }
];

export const INITIAL_NOTIFICACIONES = [
  {
    id: "NOTIF-1",
    titulo: "Transporte en ruta para entrega",
    detalle: "El vehículo logístico #4 ha recogido el lote RF-8492 en Provenza Bistro.",
    hora: "Hace 18 minutos",
    tipo: "ruta",
    leida: false
  },
  {
    id: "NOTIF-2",
    titulo: "Impacto alcanzado: 26 kg recuperados",
    detalle: "Tu donación de frutas completó la meta semanal de raciones para Sabaneta.",
    hora: "Hace 2 horas",
    tipo: "eco",
    leida: false
  },
  {
    id: "NOTIF-3",
    titulo: "Banco de Alimentos confirmó recepción",
    detalle: "Se emitió el certificado tributario y de inocuidad correspondiente.",
    hora: "Ayer a las 18:00",
    tipo: "check",
    leida: true
  }
];

export const INITIAL_DISTRIBUCIONES = [
  {
    id: "DIST-101",
    fecha: "18 de octubre de 2026, 12:30",
    grupo: "Primera Infancia y Niños",
    raciones: 85,
    menu: "Almuerzo balanceado: proteína cocida, arroz con vegetales y fruta",
    responsable: "Marta Lucía Correa"
  },
  {
    id: "DIST-102",
    fecha: "18 de octubre de 2026, 11:45",
    grupo: "Adultos Mayores",
    raciones: 60,
    menu: "Sopa nutritiva, pollo al horno y porción de pan artesanal",
    responsable: "Carlos Andrés Mejía"
  },
  {
    id: "DIST-103",
    fecha: "17 de octubre de 2026, 16:20",
    grupo: "Madres Cabeza de Familia",
    raciones: 95,
    menu: "Paquete alimentario: panadería del día, aguacate, tomate y cereales",
    responsable: "Marta Lucía Correa"
  }
];
