/*
  Local server that mimics GitHub Pages.

  The one rule that matters: if the requested path is not a real file on disk,
  serve 404.html with a 404 status. That is the behaviour the routing fix
  depends on, and it is why `npm start` cannot be used to test this. The dev
  server compiles in memory and never serves 404.html at all.

  Usage:
    npm run build
    node serve-pages.js
    (or PORT=3001 node serve-pages.js if 3000 is taken)

  This file is for local testing only. Do not reference it from the app.
*/
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, 'build');
const PORT = process.env.PORT || 3000;

const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
};

if (!fs.existsSync(ROOT)) {
  console.error('No build folder found. Run "npm run build" first.');
  process.exit(1);
}

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    let file = path.join(ROOT, url);

    // Block path traversal
    if (!file.startsWith(ROOT)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, 'index.html');
    }

    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.writeHead(200, {
        'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
      });
      return fs.createReadStream(file).pipe(res);
    }

    // Not a real file, so serve 404.html the way GitHub Pages does
    res.writeHead(404, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(ROOT, '404.html')).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`Serving ./build like GitHub Pages at http://localhost:${PORT}`);
    console.log('Deep links return 404 and fall back to 404.html, as they do in production.');
    console.log('Press Ctrl+C to stop.');
  });
