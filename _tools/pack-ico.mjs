// Packs PNG files into a multi-resolution .ico using the PNG-in-ICO format
// (supported by all modern browsers; avoids needing a native BMP encoder).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const sizes = [16, 32, 48];
const pngs = sizes.map(s => fs.readFileSync(path.join(ROOT, `favicon-${s}x${s}.png`)));

const headerSize = 6;
const dirEntrySize = 16;
const numImages = pngs.length;

const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0);       // reserved
header.writeUInt16LE(1, 2);       // type: 1 = icon
header.writeUInt16LE(numImages, 4);

let offset = headerSize + dirEntrySize * numImages;
const dirEntries = [];
const imageDatas = [];

sizes.forEach((size, i) => {
  const png = pngs[i];
  const entry = Buffer.alloc(dirEntrySize);
  entry.writeUInt8(size === 256 ? 0 : size, 0);   // width (0 = 256)
  entry.writeUInt8(size === 256 ? 0 : size, 1);   // height
  entry.writeUInt8(0, 2);                          // color palette
  entry.writeUInt8(0, 3);                          // reserved
  entry.writeUInt16LE(1, 4);                       // color planes
  entry.writeUInt16LE(32, 6);                      // bits per pixel
  entry.writeUInt32LE(png.length, 8);              // image data size
  entry.writeUInt32LE(offset, 12);                 // offset
  dirEntries.push(entry);
  imageDatas.push(png);
  offset += png.length;
});

const ico = Buffer.concat([header, ...dirEntries, ...imageDatas]);
fs.writeFileSync(path.join(ROOT, 'favicon.ico'), ico);
console.log('wrote favicon.ico,', ico.length, 'bytes');
