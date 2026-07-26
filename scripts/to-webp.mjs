import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMG_DIR = path.resolve('public/images');
let totalBefore = 0, totalAfter = 0;

async function convertDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      await convertDir(full);
    } else if (/\.png$/i.test(f.name)) {
      const webp = full.replace(/\.png$/i, '.webp');
      const orig = fs.statSync(full).size;
      totalBefore += orig;
      try {
        await sharp(full).webp({ quality: 75 }).toFile(webp);
        const newsize = fs.statSync(webp).size;
        totalAfter += newsize;
        console.log(`${path.relative(IMG_DIR, f.name)} → .webp: ${(orig/1024).toFixed(0)}KB → ${(newsize/1024).toFixed(0)}KB`);
      } catch (e) {
        console.error(`${f.name}: error - ${e.message}`);
        totalAfter += orig; // keep original size in total
      }
    }
  }
}

console.log('Converting PNG to WebP...\n');
await convertDir(IMG_DIR);
console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB (${((1-totalAfter/totalBefore)*100).toFixed(0)}% saved)`);
