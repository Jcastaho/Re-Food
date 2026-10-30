const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(__dirname, reqPath);

  // Seguridad básica: evitar salir del directorio raíz
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Acceso denegado');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Si no existe, intentar en /dashboard
      const dashboardPath = path.join(__dirname, 'dashboard', reqPath);
      fs.stat(dashboardPath, (errD, statsD) => {
        if (errD || !statsD.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`<h1>404 no encontrado</h1><p>Archivo: ${reqPath}</p>`);
          return;
        }
        serveFile(dashboardPath, res);
      });
      return;
    }

    if (stats.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      fs.stat(indexFile, (errI, statsI) => {
        if (!errI && statsI.isFile()) {
          serveFile(indexFile, res);
        } else {
          res.writeHead(403);
          res.end('Directorio');
        }
      });
      return;
    }

    serveFile(filePath, res);
  });
});

function serveFile(file, res) {
  const ext = path.extname(file).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Error interno');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(content);
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Re-Food activo en http://localhost:${PORT}`);
});
