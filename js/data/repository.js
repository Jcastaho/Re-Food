/**
 * Data Repository - Clean Architecture
 * Proporciona métodos agnósticos para consultar y persistir entidades
 * Seguro para entornos de navegador y testing con persistencia en LocalStorage
 */

import { INITIAL_EXCEDENTES, INITIAL_ORGANIZACIONES, INITIAL_NOTIFICACIONES } from './mockData.js';
import { Excedente } from '../core/entities.js';
import { getDefaultImageForCategory } from '../core/imageCompressor.js';

class DataRepository {
  constructor() {
    this.STORAGE_KEY_EXCEDENTES = 'refood_excedentes_v2';
    this.STORAGE_KEY_NOTIFS = 'refood_notificaciones_v2';
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
      const stored = localStorage.getItem(this.STORAGE_KEY_EXCEDENTES);
      if (!stored) {
        localStorage.setItem(this.STORAGE_KEY_EXCEDENTES, JSON.stringify(INITIAL_EXCEDENTES));
      } else {
        // Asegurar que elementos antiguos tengan fotos y campos completos
        const parsed = JSON.parse(stored);
        let modificado = false;
        const actualizados = parsed.map(item => {
          if (!item.imagenUrl) {
            item.imagenUrl = getDefaultImageForCategory(item.categoria);
            modificado = true;
          }
          return item;
        });
        if (modificado) {
          localStorage.setItem(this.STORAGE_KEY_EXCEDENTES, JSON.stringify(actualizados));
        }
      }

      if (!localStorage.getItem(this.STORAGE_KEY_NOTIFS)) {
        localStorage.setItem(this.STORAGE_KEY_NOTIFS, JSON.stringify(INITIAL_NOTIFICACIONES));
      }
    } catch {
      // Fallback a memoria silencioso
    }
  }

  _saveExcedentes(list) {
    if (this._isStorageAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEY_EXCEDENTES, JSON.stringify(list));
      } catch (err) {
        console.warn('No se pudo guardar en LocalStorage, manteniendo en memoria:', err);
        this._memoryExcedentes = list;
      }
    } else {
      this._memoryExcedentes = list;
    }
  }

  getExcedentes() {
    if (!this._isStorageAvailable()) return this._memoryExcedentes;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_EXCEDENTES);
      if (!raw) return this._memoryExcedentes;
      const parsed = JSON.parse(raw);
      // Garantizar que todos tengan imagenUrl
      return parsed.map(item => ({
        ...item,
        imagenUrl: item.imagenUrl || getDefaultImageForCategory(item.categoria)
      }));
    } catch {
      return this._memoryExcedentes;
    }
  }

  getExcedenteById(id) {
    const list = this.getExcedentes();
    return list.find(item => item.id === id) || null;
  }

  addExcedente(data) {
    const nuevo = new Excedente(data);
    const list = this.getExcedentes();
    list.unshift(nuevo);
    this._saveExcedentes(list);

    this.addNotificacion({
      titulo: `Excedente publicado`,
      detalle: `${nuevo.nombre} (${nuevo.cantidadKg} kg) registrado en la red de rescate.`,
      hora: 'Hace un momento',
      tipo: 'check'
    });

    return nuevo;
  }

  updateExcedente(id, updateData) {
    const list = this.getExcedentes();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error(`Excedente con ID ${id} no encontrado.`);
    }

    const anterior = list[index];
    const actualizado = {
      ...anterior,
      ...updateData,
      id: anterior.id, // ID inmutable
      cantidadKg: updateData.cantidadKg !== undefined ? parseFloat(updateData.cantidadKg) : anterior.cantidadKg,
      imagenUrl: updateData.imagenUrl || anterior.imagenUrl || getDefaultImageForCategory(updateData.categoria || anterior.categoria),
      fechaActualizacion: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    };

    list[index] = actualizado;
    this._saveExcedentes(list);

    this.addNotificacion({
      titulo: `Lote actualizado`,
      detalle: `${actualizado.nombre} modificado exitosamente.`,
      hora: 'Hace un momento',
      tipo: 'info'
    });

    return actualizado;
  }

  deleteExcedente(id) {
    const list = this.getExcedentes();
    const itemABorrar = list.find(item => item.id === id);
    if (!itemABorrar) return false;

    const filtrados = list.filter(item => item.id !== id);
    this._saveExcedentes(filtrados);

    this.addNotificacion({
      titulo: `Excedente eliminado`,
      detalle: `El lote ${itemABorrar.nombre} (${itemABorrar.id}) fue retirado del sistema.`,
      hora: 'Hace un momento',
      tipo: 'warning'
    });

    return true;
  }

  updateEstadoExcedente(id, nuevoEstado) {
    return this.updateExcedente(id, { estado: nuevoEstado });
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
