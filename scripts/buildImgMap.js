// scripts/buildImgMap.js
import fs from 'fs';
import path from 'path';

const IMG_ROOT = path.join(process.cwd(), 'public', 'img');

// Extensiones válidas
const exts = ['.jpg', '.jpeg', '.png', '.webp'];

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? walk(res) : res;
  }));
  return Array.prototype.concat(...files);
}

(async () => {
  const files = await walk(IMG_ROOT);
  const mapEntries = files
    .filter(f => exts.includes(path.extname(f).toLowerCase()))
    .map(f => {
      const rel = path.relative(IMG_ROOT, f).replace(/\\/g, '/');
      // buscar clave a partir del archivo: por ejemplo "ENCL_032_001.jpg" → "032-ENC-001"
      const name = path.basename(f, path.extname(f));
      const match = name.match(/ENCL[_-](\d{3})[_-](\d{3})/i);
      if (!match) return null;
      const encl = `${match[1]}-ENC-${match[2]}`;
      return `  "${encl}": "/img/${rel}",`;
    })
    .filter(Boolean);

  const output =
`// Este archivo se genera automáticamente con buildImgMap.js
export const enclosureImageMap = {
${mapEntries.join('\n')}
};\n`;

  const outPath = path.join(process.cwd(), 'src', 'imgMap.js');
  await fs.promises.writeFile(outPath, output);
  console.log('✅ imgMap generado en src/imgMap.js');
})();
