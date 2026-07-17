import sharp from 'sharp';
import { readdir, mkdir, stat, access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const JOBS = [
  { srcDir: path.join(ROOT, 'menu-images'),   outDir: path.join(ROOT, 'menu-images-webp') },
  { srcDir: path.join(ROOT, 'Visual Assets'), outDir: path.join(ROOT, 'Visual Assets')    },
  { srcDir: path.join(ROOT, 'brand_assets'),  outDir: path.join(ROOT, 'brand_assets')     },
  { srcDir: path.join(ROOT, 'brand_assets', 'allergen-icons'), outDir: path.join(ROOT, 'brand_assets', 'allergen-icons') },
];

async function fileExists(p) {
  try { await access(p, constants.F_OK); return true; }
  catch { return false; }
}

let totalBefore = 0, totalAfter = 0, skipped = 0, converted = 0;

for (const { srcDir, outDir } of JOBS) {
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(srcDir)).filter(f => f.toLowerCase().endsWith('.png'));
  console.log(`\nProcessing ${path.relative(ROOT, srcDir)} (${files.length} PNG files):`);

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const outName = file.slice(0, -4) + '.webp';
    const outPath = path.join(outDir, outName);

    if (await fileExists(outPath)) {
      console.log(`  SKIP (exists): ${outName}`);
      skipped++;
      continue;
    }

    const { size: before } = await stat(srcPath);
    totalBefore += before;

    await sharp(srcPath).webp({ quality: 82, effort: 4 }).toFile(outPath);

    const { size: after } = await stat(outPath);
    totalAfter += after;
    converted++;

    const pct = ((1 - after / before) * 100).toFixed(1);
    console.log(`  ${file} → ${outName}`);
    console.log(`    ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (-${pct}%)`);
  }
}

console.log(`\n=== Summary ===`);
console.log(`Converted: ${converted}, Skipped: ${skipped}`);
if (converted > 0) {
  console.log(`Total before: ${(totalBefore / 1048576).toFixed(1)} MB`);
  console.log(`Total after:  ${(totalAfter / 1048576).toFixed(1)} MB`);
  console.log(`Savings:      ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`);
}
