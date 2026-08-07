import { existsSync, readdirSync, statSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { execSync } from 'node:child_process';

// 1) 确保 sharp 可用
try {
  require.resolve('sharp');
} catch {
  console.log('installing sharp...');
  execSync('npm install --no-save sharp', { stdio: 'inherit' });
}
const sharp = (await import('sharp')).default;

const SRC = 'd:/web_ergen/public/images';
const SRC_DIR = 'd:/web_ergen/src';
const EXT = new Set(['.png', '.jpg', '.jpeg']);
const bad = [];

function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (EXT.has(extname(e).toLowerCase())) acc.push(p);
  }
  return acc;
}

// 2) 转 WebP（坏格式文件跳过并收集）
const files = walk(SRC);
console.log(`found ${files.length} images to convert`);
let saved = 0, ok = 0;
for (const f of files) {
  try {
    const before = statSync(f).size;
    const meta = await sharp(f).metadata();
    const targetW = Math.min(meta.width || 1600, 1600);
    const webp = await sharp(f)
      .resize({ width: targetW, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toBuffer();
    const outPath = f.replace(extname(f), '.webp');
    writeFileSync(outPath, webp);
    if (outPath !== f) rmSync(f);
    saved += before - webp.length;
    ok++;
    console.log(`${basename(f)}: ${(before/1024).toFixed(0)}KB -> ${(webp.length/1024).toFixed(0)}KB`);
  } catch (err) {
    bad.push(f);
    console.log(`SKIP (unsupported) ${basename(f)}: ${err.message}`);
  }
}
console.log(`converted ${ok}, skipped ${bad.length}, total saved: ${(saved/1024/1024).toFixed(2)}MB`);

// 3) 扫描 src 下所有 .jsx/.css，把 images/xxx.png|jpg|jpeg 引用改成 .webp
function srcFiles(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) srcFiles(p, acc);
    else if (/\.(jsx?|css)$/.test(e)) acc.push(p);
  }
  return acc;
}
const refs = srcFiles(SRC_DIR);
let changed = 0;
const re = /(images\/[^"')\s]+\.)(png|jpe?g)/gi;
for (const f of refs) {
  const txt = readFileSync(f, 'utf8');
  if (!re.test(txt)) continue;
  re.lastIndex = 0;
  writeFileSync(f, txt.replace(re, '$1webp'));
  changed++;
  console.log('updated refs in', f);
}
console.log(`updated ${changed} source files`);

if (bad.length) {
  console.log('\nUNSUPPORTED FILES (manual check needed):');
  bad.forEach(b => console.log('  ' + b));
}
