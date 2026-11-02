/**
 * Core Domain Entities - Clean Architecture
 * Representa los modelos fundamentales del negocio Re-Food
 */

import { getDefaultImageForCategory } from './imageCompressor.js';

export class Excedente {
  constructor({
    id,
    nombre,
    categoria,
    establecimiento = 'Provenza Bistro & Café',
    ubicacion = 'El Poblado, Medellín',
    cantidadKg,
    estado = 'Publicado', // 'Publicado' | 'Asignado' | 'En Ruta' | 'Entregado'
    caducidadHoras = 12,
    temperatura = 'Ambiente (20°C)',
    horaLimite = '18:30',
    notas = '',
    imagenUrl = '',
    organizacionDestino = 'Asignando ruta...',
    fechaPublicacion = null
  }) {
    this.id = id || `RF-${Math.floor(1000 + Math.random() * 9000)}`;
    this.nombre = nombre;
    this.categoria = categoria || 'Cereales y preparados';
    this.establecimiento = establecimiento;
    this.ubicacion = ubicacion;
    this.cantidadKg = parseFloat(cantidadKg) || 0;
    this.estado = estado;
    this.caducidadHoras = caducidadHoras;
    this.temperatura = temperatura;
    this.horaLimite = horaLimite;
    this.notas = notas;
    this.imagenUrl = imagenUrl || getDefaultImageForCategory(this.categoria);
    this.organizacionDestino = organizacionDestino;
    this.fechaPublicacion = fechaPublicacion || new Date().toLocaleString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

export class Organizacion {
  constructor({
    id,
    nombre,
    tipo,
    direccion,
    municipio = 'Medellín',
    capacidadKgDia = 150,
    beneficiarios = 350,
    estadoVerificacion = 'Verificada',
    horarioAtencion = '08:00 - 17:00'
  }) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.direccion = direccion;
    this.municipio = municipio;
    this.capacidadKgDia = capacidadKgDia;
    this.beneficiarios = beneficiarios;
    this.estadoVerificacion = estadoVerificacion;
    this.horarioAtencion = horarioAtencion;
  }
}

export class Donacion {
  constructor({
    id,
    excedenteId,
    excedenteNombre,
    donanteNombre,
    organizacionReceptora,
    cantidadKg,
    estado = 'Asignado',
    codigoSeguimiento,
    fecha = new Date().toLocaleDateString('es-CO')
  }) {
    this.id = id || `RF-${Math.floor(1000 + Math.random() * 9000)}`;
    this.excedenteId = excedenteId;
    this.excedenteNombre = excedenteNombre;
    this.donanteNombre = donanteNombre;
    this.organizacionReceptora = organizacionReceptora;
    this.cantidadKg = cantidadKg;
    this.estado = estado;
    this.codigoSeguimiento = codigoSeguimiento || `TRACK-${Date.now().toString(36).toUpperCase()}`;
    this.fecha = fecha;
  }
}
