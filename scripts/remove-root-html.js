/**
 * On Vercel, remove dist/index.html so the root path (/) is not served
 * as a static file. The vercel.json rewrite then proxies to Figma.
 * (Vercel serves static files before applying rewrites.)
 */
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, '..', 'dist', 'index.html');

if (process.env.VERCEL && existsSync(indexPath)) {
  unlinkSync(indexPath);
  console.log('Removed dist/index.html so root proxies to Figma.');
}
