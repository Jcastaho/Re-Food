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
    temperatura: "En caliente (62°C)",
    organizacionDestino: "Banco de Alimentos de Medellín",
    fechaPublicacion: "18 de octubre de 2026, 14:30"
  },
  {
    id: "RF-8491",
    nombre: "Pan de masa madre y croissants",
    establecimiento: "Panadería Artesanal Laureles",
    categoria: "Panadería",
    ubicacion: "Laureles, Medellín",
    cantidadKg: 8.2,
    estado: "Asignado",
    caducidadHoras: 24,
    temperatura: "Ambiente (21°C)",
    organizacionDestino: "Fundación Saciar Calle 30",
    fechaPublicacion: "18 de octubre de 2026, 11:15"
  },
  {
    id: "RF-8488",
    nombre: "Bandejas de proteína y ensalada",
    establecimiento: "Hotel Parque Envigado",
    categoria: "Proteínas",
    ubicacion: "Envigado, Antioquia",
    cantidadKg: 19.0,
    estado: "Publicado",
    caducidadHoras: 8,
    temperatura: "Refrigerado (4°C)",
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
    temperatura: "Fresco (16°C)",
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
