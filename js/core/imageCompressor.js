/**
 * Core Domain Service - Image Compressor & Optimizer
 * Procesa y optimiza imágenes en el navegador antes de persistirlas.
 * Reduce fotos pesadas de 5-10MB a menos de 50-90KB en formato WebP/JPEG
 */

export const CATEGORY_IMAGE_PRESETS = {
  'Cereales y preparados': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  'Proteínas cocidas': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  'Panadería y secos': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  'Panadería': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  'Proteínas': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  'Frutas y verduras': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
  'Lácteos': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80',
  'default': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80'
};

export function getDefaultImageForCategory(categoria) {
  return CATEGORY_IMAGE_PRESETS[categoria] || CATEGORY_IMAGE_PRESETS.default;
}

/**
 * Comprime un archivo de imagen (File o Blob)
 * @param {File|Blob} file 
 * @param {Object} options 
 * @returns {Promise<{dataUrl: string, sizeKb: number, originalSizeKb: number, width: number, height: number}>}
 */
export async function compressImage(file, options = {}) {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.78,
    outputType = 'image/webp'
  } = options;

  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('El archivo proporcionado no es una imagen válida.'));
    }

    const originalSizeKb = Math.round(file.size / 1024);
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Error al leer el archivo de imagen.'));

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('No se pudo cargar la imagen para procesamiento.'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calcular escalado manteniendo relación de aspecto
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('No se pudo inicializar el contexto 2D de canvas.'));
        }

        // Suavizado de imagen de alta calidad
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Dibujar imagen redimensionada
        ctx.drawImage(img, 0, 0, width, height);

        // Exportar a WebP con fallback a JPEG
        let dataUrl = '';
        try {
          dataUrl = canvas.toDataURL(outputType, quality);
          if (!dataUrl.startsWith(`data:${outputType}`)) {
            dataUrl = canvas.toDataURL('image/jpeg', quality);
          }
        } catch {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        // Calcular tamaño aproximado del base64 resultante
        const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
        const sizeBytes = Math.round((base64Length * 3) / 4);
        const sizeKb = Math.round(sizeBytes / 1024);

        resolve({
          dataUrl,
          sizeKb,
          originalSizeKb,
          width,
          height
        });
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}

