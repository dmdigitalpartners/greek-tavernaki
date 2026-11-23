/**
 * Minimal, dependency-free .xlsx reader (zip + sheet XML), enough to read the
 * menu spreadsheets. Returns { [sheetName]: string[][] } with every cell as text.
 *
 *   import { readXlsx } from './xlsx-read.mjs';
 *   const sheets = readXlsx('_tools/Restaurant_Menu_Master.xlsx');
 */

import fs from 'node:fs';
import zlib from 'node:zlib';

function unzip(buf) {
  // Locate the End Of Central Directory record, then walk the central directory.
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('Not a zip file');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const files = {};
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10);
    const csize = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28);
    const xlen = buf.readUInt16LE(p + 30);
    const clen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    const dataStart = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const raw = buf.subarray(dataStart, dataStart + csize);
    files[name] = method === 0 ? raw : zlib.inflateRawSync(raw);
    p += 46 + nlen + xlen + clen;
  }
  return files;
}

const decode = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'")
   .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, '&');

const texts = (xml) => [...xml.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)].map((m) => decode(m[1])).join('');

const colIndex = (ref) => {
  let n = 0;
  for (const ch of ref.match(/^[A-Z]+/)[0]) n = n * 26 + ch.charCodeAt(0) - 64;
  return n - 1;
};

export function readXlsx(file) {
  const files = unzip(fs.readFileSync(file));
  const str = (n) => (files[n] ? files[n].toString('utf8') : '');
  const shared = [...str('xl/sharedStrings.xml').matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => texts(m[1]));
  const rels = Object.fromEntries(
    [...str('xl/_rels/workbook.xml.rels').matchAll(/<Relationship\b[^>]*>/g)].map((m) => [
      m[0].match(/Id="([^"]+)"/)[1],
      m[0].match(/Target="([^"]+)"/)[1],
    ])
  );
  const out = {};
  for (const m of str('xl/workbook.xml').matchAll(/<sheet\b[^>]*>/g)) {
    const name = decode(m[0].match(/name="([^"]+)"/)[1]);
    let target = rels[m[0].match(/r:id="([^"]+)"/)[1]].replace(/^\//, '');
    if (!target.startsWith('xl/')) target = 'xl/' + target;
    const rows = [];
    for (const r of str(target).matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
      const row = [];
      for (const c of r[1].matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        const attrs = c[1];
        const ref = attrs.match(/r="([A-Z]+)\d+"/)[1];
        const type = (attrs.match(/t="([^"]+)"/) || [])[1];
        const body = c[2] || '';
        const v = (body.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
        let val = '';
        if (type === 's') val = shared[+v];
        else if (type === 'inlineStr') val = texts(body);
        else if (v != null) val = decode(v);
        row[colIndex(ref)] = val;
      }
      rows.push(Array.from(row, (x) => x ?? ''));
    }
    out[name] = rows;
  }
  return out;
}

/** Sheet rows → objects keyed by the header row. */
export function sheetObjects(rows) {
  const [head, ...body] = rows;
  return body.filter((r) => r.some((x) => x !== '')).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}
