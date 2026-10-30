/**
 * Data Repository - Clean Architecture
 * Proporciona métodos agnósticos para consultar y persistir entidades
 * Seguro para entornos de navegador y testing
 */

import { INITIAL_EXCEDENTES, INITIAL_ORGANIZACIONES, INITIAL_NOTIFICACIONES } from './mockData.js';
import { Excedente } from '../core/entities.js';

class DataRepository {
  constructor() {
    this.STORAGE_KEY_EXCEDENTES = 'refood_excedentes_v1';
    this.STORAGE_KEY_NOTIFS = 'refood_notificaciones_v1';
    this._memoryExcedentes = [...INITIAL_EXCEDENTES];
    this._memoryNotifs = [...INITIAL_NOTIFICACIONES];
    this._initStorage();
  }

  _isStorageAvailable() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  _initStorage() {
    if (!this._isStorageAvailable()) return;
    try {
      if (!localStorage.getItem(this.STORAGE_KEY_EXCEDENTES)) {
        localStorage.setItem(this.STORAGE_KEY_EXCEDENTES, JSON.stringify(INITIAL_EXCEDENTES));
      }
      if (!localStorage.getItem(this.STORAGE_KEY_NOTIFS)) {
        localStorage.setItem(this.STORAGE_KEY_NOTIFS, JSON.stringify(INITIAL_NOTIFICACIONES));
      }
    } catch {
      // Fallback a memoria silencioso
    }
  }

  getExcedentes() {
    if (!this._isStorageAvailable()) return this._memoryExcedentes;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_EXCEDENTES);
      return raw ? JSON.parse(raw) : this._memoryExcedentes;
    } catch {
      return this._memoryExcedentes;
    }
  }

  getExcedenteById(id) {
    const list = this.getExcedentes();
    return list.find(item => item.id === id) || list[0];
  }

  addExcedente(data) {
    const nuevo = new Excedente(data);
    const list = this.getExcedentes();
    const itemGuardado = {
      ...nuevo,
      organizacionDestino: 'Asignando ruta...'
    };
    list.unshift(itemGuardado);

    if (this._isStorageAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEY_EXCEDENTES, JSON.stringify(list));
      } catch {
        this._memoryExcedentes = list;
      }
    } else {
      this._memoryExcedentes = list;
    }

    this.addNotificacion({
      titulo: `Excedente ${nuevo.nombre} publicado`,
      detalle: `${nuevo.cantidadKg} kg registrados exitosamente en el sistema de rescate.`,
      hora: 'Hace un momento',
      tipo: 'check'
    });

    return nuevo;
  }

  getOrganizaciones() {
    return INITIAL_ORGANIZACIONES;
  }

  getOrganizacionById(id) {
    return INITIAL_ORGANIZACIONES.find(o => o.id === id) || INITIAL_ORGANIZACIONES[0];
  }

  getNotificaciones() {
    if (!this._isStorageAvailable()) return this._memoryNotifs;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_NOTIFS);
      return raw ? JSON.parse(raw) : this._memoryNotifs;
    } catch {
      return this._memoryNotifs;
    }
  }

  addNotificacion({ titulo, detalle, hora = 'Hace un instante', tipo = 'info' }) {
    const list = this.getNotificaciones();
    list.unshift({
      id: `NOTIF-${Date.now()}`,
      titulo,
      detalle,
      hora,
      tipo,
      leida: false
    });
    if (this._isStorageAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEY_NOTIFS, JSON.stringify(list));
      } catch {
        this._memoryNotifs = list;
      }
    } else {
      this._memoryNotifs = list;
    }
  }

  getMetricasResumen() {
    const excedentes = this.getExcedentes();
    const totalPublicados = excedentes.length;
    const kgRecuperados = excedentes
      .filter(e => e.estado === 'Entregado' || e.estado === 'En Ruta')
      .reduce((acc, curr) => acc + (parseFloat(curr.cantidadKg) || 0), 0);
    const entregadas = excedentes.filter(e => e.estado === 'Entregado').length;

    return {
      totalPublicados,
      kgRecuperados: Math.round(kgRecuperados * 10) / 10,
      entregadas,
      porcentajeEfectividad: totalPublicados > 0 ? Math.round((entregadas / totalPublicados) * 100) : 100
    };
  }
}

export const repository = new DataRepository();
