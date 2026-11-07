/**
 * Data Repository - Clean Architecture
 * Proporciona métodos agnósticos para consultar y persistir entidades
 * Seguro para entornos de navegador y testing con persistencia en LocalStorage
 */

import { INITIAL_EXCEDENTES, INITIAL_ORGANIZACIONES, INITIAL_NOTIFICACIONES, INITIAL_DISTRIBUCIONES } from './mockData.js';
import { Excedente } from '../core/entities.js';
import { getDefaultImageForCategory } from '../core/imageCompressor.js';

class DataRepository {
  constructor() {
    this.STORAGE_KEY_EXCEDENTES = 'refood_excedentes_v2';
    this.STORAGE_KEY_NOTIFS = 'refood_notificaciones_v2';
    this.STORAGE_KEY_PERFIL = 'refood_perfil_donante_v1';
    this.STORAGE_KEY_PERFIL_RECEPTOR = 'refood_perfil_receptor_v1';
    this.STORAGE_KEY_DISTRIBUCIONES = 'refood_distribuciones_v1';
    this._memoryExcedentes = [...INITIAL_EXCEDENTES];
    this._memoryNotifs = [...INITIAL_NOTIFICACIONES];
    this._memoryDistribuciones = [...INITIAL_DISTRIBUCIONES];
    this._memoryPerfil = {
      nombre: 'Provenza Bistro & Café',
      razonSocial: 'Provenza Gastronomía S.A.S.',
      nit: '901.442.819-2',
      responsable: 'Chef Andrés Gómez',
      telefono: '+57 (604) 312 9088',
      whatsapp: '+57 310 492 8119',
      email: 'cocina@provenzabistro.co',
      direccion: 'Cra 35 # 8A-42, El Poblado',
      municipio: 'Medellín',
      horarioRecogida: '15:00 - 18:30',
      tipoCocina: 'Restaurante Fusión & Cafetería',
      alertaWhatsapp: true,
      alertaEmail: true
    };
    this._memoryPerfilReceptor = {
      nombre: 'Fundación Saciar - Nutrimos el Futuro',
      nit: '890.981.234-5',
      coordinador: 'Marta Lucía Correa',
      telefono: '+57 (604) 312 8840',
      direccion: 'Calle 30A # 65-12, Belén',
      municipio: 'Medellín',
      capacidadKgDia: 420,
      cuartoFrioTemp: '3.8 °C',
      horarioRecepcion: 'Lunes a Sábado: 07:00 - 19:30',
      estadoRecepcion: 'Abierto'
    };
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
      if (!localStorage.getItem(this.STORAGE_KEY_PERFIL)) {
        localStorage.setItem(this.STORAGE_KEY_PERFIL, JSON.stringify(this._memoryPerfil));
      }
      if (!localStorage.getItem(this.STORAGE_KEY_PERFIL_RECEPTOR)) {
        localStorage.setItem(this.STORAGE_KEY_PERFIL_RECEPTOR, JSON.stringify(this._memoryPerfilReceptor));
      }
      if (!localStorage.getItem(this.STORAGE_KEY_DISTRIBUCIONES)) {
        localStorage.setItem(this.STORAGE_KEY_DISTRIBUCIONES, JSON.stringify(this._memoryDistribuciones));
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

  getNotificacionesNoLeidasCount() {
    const list = this.getNotificaciones();
    return list.filter(n => !n.leida).length;
  }

  marcarNotificacionesLeidas() {
    const list = this.getNotificaciones().map(n => ({ ...n, leida: true }));
    if (this._isStorageAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEY_NOTIFS, JSON.stringify(list));
      } catch {
        this._memoryNotifs = list;
      }
    } else {
      this._memoryNotifs = list;
    }
    return list;
  }

  limpiarNotificaciones() {
    const vacia = [];
    if (this._isStorageAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEY_NOTIFS, JSON.stringify(vacia));
      } catch {
        this._memoryNotifs = vacia;
      }
    } else {
      this._memoryNotifs = vacia;
    }
    return vacia;
  }

  getPerfilDonante() {
    if (!this._isStorageAvailable()) return this._memoryPerfil;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_PERFIL);
      return raw ? JSON.parse(raw) : this._memoryPerfil;
    } catch {
      return this._memoryPerfil;
    }
  }

  updatePerfilDonante(data) {
    const actual = this.getPerfilDonante();
    const actualizado = { ...actual, ...data };

    if (this._isStorageAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEY_PERFIL, JSON.stringify(actualizado));
      } catch {
        this._memoryPerfil = actualizado;
      }
    } else {
      this._memoryPerfil = actualizado;
    }

    this.addNotificacion({
      titulo: 'Perfil comercial actualizado',
      detalle: 'Los datos de contacto y horarios de recogida fueron guardados correctamente.',
      hora: 'Hace un momento',
      tipo: 'check'
    });

    return actualizado;
  }

  getPerfilReceptor() {
    if (!this._isStorageAvailable()) return this._memoryPerfilReceptor;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_PERFIL_RECEPTOR);
      return raw ? JSON.parse(raw) : this._memoryPerfilReceptor;
    } catch {
      return this._memoryPerfilReceptor;
    }
  }

  updatePerfilReceptor(data) {
    const actual = this.getPerfilReceptor();
    const actualizado = {
      ...actual,
      ...data,
      capacidadKgDia: data.capacidadKgDia !== undefined ? parseFloat(data.capacidadKgDia) : actual.capacidadKgDia
    };

    if (this._isStorageAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEY_PERFIL_RECEPTOR, JSON.stringify(actualizado));
      } catch {
        this._memoryPerfilReceptor = actualizado;
      }
    } else {
      this._memoryPerfilReceptor = actualizado;
    }

    this.addNotificacion({
      titulo: 'Ficha de la fundación actualizada',
      detalle: `Los datos operativos de ${actualizado.nombre} fueron guardados.`,
      hora: 'Hace un momento',
      tipo: 'check'
    });

    return actualizado;
  }

  getDistribuciones() {
    if (!this._isStorageAvailable()) return this._memoryDistribuciones;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY_DISTRIBUCIONES);
      return raw ? JSON.parse(raw) : this._memoryDistribuciones;
    } catch {
      return this._memoryDistribuciones;
    }
  }

  addDistribucion({ grupo, raciones, menu, responsable }) {
    const list = this.getDistribuciones();
    const nueva = {
      id: `DIST-${Math.floor(100 + Math.random() * 900)}`,
      fecha: new Date().toLocaleString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      grupo: grupo || 'Primera Infancia y Niños',
      raciones: parseInt(raciones, 10) || 10,
      menu: menu || 'Almuerzo comunitario balanceado',
      responsable: responsable || 'Marta Lucía Correa'
    };

    list.unshift(nueva);

    if (this._isStorageAvailable()) {
      try {
        localStorage.setItem(this.STORAGE_KEY_DISTRIBUCIONES, JSON.stringify(list));
      } catch {
        this._memoryDistribuciones = list;
      }
    } else {
      this._memoryDistribuciones = list;
    }

    this.addNotificacion({
      titulo: 'Entrega de raciones registrada',
      detalle: `Se sirvieron ${nueva.raciones} raciones para ${nueva.grupo}.`,
      hora: 'Hace un momento',
      tipo: 'eco'
    });

    return nueva;
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
