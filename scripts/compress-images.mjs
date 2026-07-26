import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMG_DIR = path.resolve('public/images');

async function compressDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      await compressDir(full);
    } else if (/\.(png|jpg|jpeg)$/i.test(f.name)) {
      const orig = fs.statSync(full).size;
      const tmp = full + '.tmp';
      try {
        await sharp(full)
          .resize({ width: 1200, withoutEnlargement: true })
          .png({ quality: 75, compressionLevel: 9 })
          .toFile(tmp);
        const newsize = fs.statSync(tmp).size;
        if (newsize < orig) {
          fs.renameSync(tmp, full);
          console.log(`${path.relative(IMG_DIR, full)}: ${(orig/1024).toFixed(0)}KB → ${(newsize/1024).toFixed(0)}KB (${((1 - newsize/orig)*100).toFixed(0)}% saved)`);
        } else {
          fs.unlinkSync(tmp);
          console.log(`${path.relative(IMG_DIR, full)}: ${(orig/1024).toFixed(0)}KB (already optimal)`);
        }
      } catch (e) {
        if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
        console.error(`${path.relative(IMG_DIR, full)}: error - ${e.message}`);
      }
    }
  }
}

console.log('Compressing images...\n');
await compressDir(IMG_DIR);
console.log('\nDone!');
