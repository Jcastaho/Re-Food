/**
 * Main Application Bootstrap - Clean Architecture
 */

import { initRouter } from './presentation/router.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🌱 Inicializando Re-Food Valle de Aburrá Dashboard...');
  initRouter();
});
