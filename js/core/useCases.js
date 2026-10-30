/**
 * Use Cases - Clean Architecture
 * Orquesta la lógica del negocio sin depender de la UI ni de la BD
 */

import { Excedente } from './entities.js';

export class InocuidadUseCase {
  /**
   * Evalúa el riesgo y vida útil de un alimento según normatividad del Valle de Aburrá
   * @param {string} tipoAlimento 
   * @param {number} temperaturaC 
   * @param {number} horasPreparado 
   * @returns {object} diagnóstico de inocuidad y recomendaciones
   */
  static evaluarRiesgo(tipoAlimento, temperaturaC, horasPreparado) {
    const temp = parseFloat(temperaturaC) || 20;
    const horas = parseFloat(horasPreparado) || 0;

    let nivel = 'Optimo'; // 'Optimo' | 'Precaucion' | 'RiesgoCritico'
    let color = 'emerald';
    let vidaUtilRestanteHoras = 12;
    let mensaje = 'Condiciones higiénico-sanitarias seguras para distribución prioritaria.';

    // Reglas de inocuidad térmica (cadena de frío o mantenimiento caliente)
    if (tipoAlimento === 'Proteínas cocidas' || tipoAlimento === 'Lácteos') {
      if (temp > 8 && temp < 60) {
        // Zona de peligro térmico
        if (horas > 4) {
          nivel = 'RiesgoCritico';
          color = 'rose';
          vidaUtilRestanteHoras = 0;
          mensaje = 'Zona de peligro de proliferación bacteriana superada (>4h a temp. ambiente). No apto para rescate.';
        } else {
          nivel = 'Precaucion';
          color = 'amber';
          vidaUtilRestanteHoras = Math.max(1, 4 - horas);
          mensaje = 'Requiere refrigeración inmediata urgente o entrega en menos de 2 horas.';
        }
      } else if (temp <= 4) {
        vidaUtilRestanteHoras = Math.max(2, 48 - (horas * 2));
      }
    } else if (tipoAlimento === 'Panadería y secos') {
      if (horas > 48) {
        nivel = 'Precaucion';
        color = 'amber';
        vidaUtilRestanteHoras = 8;
        mensaje = 'Pérdida paulatina de frescura y humedad organoléptica.';
      } else {
        vidaUtilRestanteHoras = 72 - horas;
      }
    } else if (tipoAlimento === 'Frutas y verduras') {
      vidaUtilRestanteHoras = Math.max(4, 24 - horas);
    }

    return {
      nivel,
      color,
      vidaUtilRestanteHoras: Math.round(vidaUtilRestanteHoras),
      temperaturaActual: temp,
      horasTranscurridas: horas,
      mensaje,
      aptoParaDonacion: nivel !== 'RiesgoCritico'
    };
  }
}

export class ImpactoUseCase {
  /**
   * Calcula raciones entregadas y huella de carbono evitada
   * @param {number} totalKg 
   */
  static calcularMetricas(totalKg) {
    const kg = parseFloat(totalKg) || 0;
    // Factor estándar Banco de Alimentos: 1 kg de alimento recuperado ≈ 2.5 raciones
    const raciones = Math.round(kg * 2.5);
    // Factor FAO/MinAmbiente: 1 kg de alimento no desperdiciado evita ≈ 2.2 kg de CO2e
    const co2EvitadoKg = Math.round(kg * 2.2);
    // Equivalencia en litros de agua ahorrados ≈ 450 L por kg
    const aguaAhorradaLitros = Math.round(kg * 450);

    return {
      totalKg: kg,
      raciones,
      co2EvitadoKg,
      aguaAhorradaLitros,
      porcentajeMeta: Math.min(100, Math.round((kg / 50) * 100))
    };
  }
}
