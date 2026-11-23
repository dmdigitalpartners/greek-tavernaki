/**
 * Validate js/menu-data.js against the printed-menu spreadsheet.
 *
 *   node _tools/validate-menu.mjs [path/to.xlsx]     (default: _tools/Restaurant_Menu_Master.xlsx)
 *
 * Reports every spreadsheet row → matched dish with price/weight, unmatched rows
 * on both sides, and any mismatch in name / price / price unit / weight /
 * allergens / description. Exits 1 if there is any mismatch that is not one of
 * the deliberate decisions listed in KEEP_* below.
 *
 * Matching is by the explicit ITEM_TO_DISH table (spreadsheet Item ID → dish id),
 * because dish names were reworded between menu versions. When the next printed
 * menu arrives, extend this table rather than relying on name similarity.
 */

import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { readXlsx, sheetObjects } from './xlsx-read.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ── Spreadsheet Item ID → menu-data.js dish id ──────────────────────────────
export const ITEM_TO_DISH = {
  'SAL-01': 'selska-salata',            'SAL-02': 'salata-dakos-krit',
  'SAL-03': 'zelena-salata',            'SAL-04': 'salata-greko-kapreze',
  'SAL-05': 'salata-zele-s-morkovi',    'SAL-06': 'salata-roka-s-halumi',
  'SAL-07': 'salata-tsezar',            'SAL-08': 'redena-salata',
  'SAL-09': 'salata-s-morski-darove',   'SAL-10': 'salata-s-pecheni-chushki',
  'SAL-11': 'vareni-kartofi-s-cherven-luk',
  'SAL-12': 'salata-sas-spanak',        'SAL-13': 'kinoa-i-skaridi',

  'STR-01': 'feta-s-zehtin-i-rigan',    'STR-02': 'grilovano-halumi',
  'STR-03': 'pikantno-feta-na-folio',   'STR-04': 'feta-v-hrupkava-korichka',
  'STR-05': 'plato-razyadki',           'STR-06': 'tirokafteri',
  'STR-07': 'tarama',                   'STR-08': 'dzadziki',
  'STR-09': 'paprika',                  'STR-10': 'lyuti-chushki',
  'STR-11': 'gratska-pitka',

  'PRE-01': 'parzheni-chushki-i-patladzhan', 'PRE-02': 'parzheni-tikvichki-s-dzadziki',
  'PRE-03': 'palneni-gabi-s-bekon',     'PRE-04': 'kroketi-miks',
  'PRE-05': 'topeni-sirentsa',          'PRE-06': 'machkani-beybi-kartofi',
  'PRE-07': 'zelenchutsi-na-skara',     'PRE-08-A': 'parzheni-kartofi',
  'PRE-08-B': 'parzheni-kartofi-sas-sirene',
  'PRE-09': 'palnен-patladzhan',        // renamed Пълнен → Печен патладжан, same dish
  'PRE-10': 'skaridi-saganaki',         'PRE-11': 'midi-saganaki',
  'PRE-12': 'buyurdi-gyuvech',          'PRE-13': 'kavarma-saganaki',

  'TIG-01': 'svinski-kystcheta-chushki', 'TIG-02': 'teleshki-drob-karameliziran-luk',
  'TIG-03': 'pileshki-kystcheta-rozmarin',

  'SKA-01': 'teleshka-parzhola',        'SKA-02': 'daska-s-mesa-za-dvama',
  'SKA-03': 'svinska-vratna-parzhola',  'SKA-04': 'agneshki-rebra',
  'SKA-05-A': 'suvlaki-pileshko',       'SKA-05-B': 'suvlaki-svinsko',
  'SKA-05-C': 'suvlaki-teleshko',       'SKA-05-D': 'suvlaki-miks',
  'SKA-06': 'pileshko-file-na-skara',   'SKA-07': 'agneshki-kebap',
  'SKA-08-A': 'palnен-biftek-graviera', 'SKA-08-B': 'palnen-biftek-domat-feta',
  'SKA-09': 'selska-nadenitsa',         'SKA-10': 'biftek',

  'SPC-01': 'kralski-kotlet',           'SPC-02': 'kebap-s-kiselo-mlyako',
  'SPC-03': 'svinski-bekon-grilovani-zelenchutsi', 'SPC-04': 'teleshko-bon-file',
  'SPC-05': 'pileshki-shnitsel-s-gabi', 'SPC-06': 'svinski-shnitsel-s-gabi',
  'SPC-07': 'svinsko-bon-file-s-sos-ot-sirena',

  'DES-01': 'deserti',

  'PAS-01': 'papadele-sas-somga',       'PAS-02': 'rizoto-s-morski-darove',
  'PAS-03': 'kritaroto-s-morski-darove', 'PAS-04': 'pasta-sas-skaridi',
  'PAS-05': 'papadele-s-teleshko',      'PAS-06': 'rizoto-s-pileshko-i-zelenchutsi',
  'PAS-07': 'lingvini-salsa-sos',       'PAS-08': 'pene-s-pileshko-i-smetana',
  'PAS-09': 'taliateli-pileshko-dizhon',

  'FSH-01': 'lavrak-na-skara',          'FSH-02': 'chipura',
  'FSH-03': 'sardela-na-skara',         'FSH-04': 'somga-na-skara',
  'FSH-05': 'gavros-na-tigan',          'FSH-06': 'marinovan-gavros',
  'FSH-07': 'barbun',                   'FSH-08': 'pushena-skumriya',
  'FSH-09': 'plato-s-morski-darove',
  'FSH-10-A': 'tsipura-lavrak-fagri-1kg', 'FSH-10-B': 'tsipura-lavrak-fagri-2kg',
  'FSH-11': 'divi-tsipura-lavrak-fagri',
  'FSH-12-A': 'kalmari-na-tigan',       'FSH-12-B': 'kalmar-na-plocha',
  'FSH-13': 'palnен-kalmar',            'FSH-14': 'oktopod-na-skara',
  'FSH-15': 'zadusheni-midi',
  'FSH-16-A': 'skaridi-na-skara',       'FSH-16-B': 'skaridi-na-tigan',
};

// ── Deliberate decisions ────────────────────────────────────────────────────
// Allergen rule: the site never drops an allergen because the photo codes omit
// it — sheet codes are only ever ADDED. Allergens the site lists but the sheet
// doesn't are reported as "owner to confirm" rather than as errors.
// Allergen codes flagged unreadable/uncertain on the "Needs Review" sheet:
// the site keeps its current allergens for these.
export const KEEP_ALLERGENS = new Set([
  'SAL-07', 'SAL-09', 'STR-04', 'STR-05', 'PRE-10', 'PRE-11', 'TIG-03',
  'PAS-01', 'PAS-02', 'PAS-03', 'PAS-04', 'PAS-06', 'PAS-09',
  // Needs Review #10: every grill-page tag read as "7", marks too faint to trust
  'SKA-01', 'SKA-02', 'SKA-03', 'SKA-04', 'SKA-05-A', 'SKA-05-B', 'SKA-05-C', 'SKA-05-D',
  'SKA-06', 'SKA-07', 'SKA-08-A', 'SKA-08-B', 'SKA-09', 'SKA-10',
]);
// Description flagged as partly unreadable (Needs Review #9): keep the site's.
export const KEEP_DESCRIPTION = new Set(['SKA-02']);

export const ALLERGEN_CODES = {
  1: 'gluten', 2: 'crustaceans', 3: 'eggs', 4: 'fish', 5: 'peanuts', 6: 'soya', 7: 'milk',
  8: 'nuts', 9: 'celery', 10: 'mustard', 11: 'sesame', 12: 'sulphites', 13: 'lupin', 14: 'molluscs',
};

export const CATEGORY_MAP = {
  'Салати': 'salads', 'Стартери': 'starters', 'Предястия': 'appetizers',
  'Месни ястия на тиган': 'pan-meat', 'Месни ястия на скара': 'bbq-meat',
  'Специалитети': 'specialties', 'Десерти': 'desserts',
  'Паста и ризото': 'pasta', 'Риба и морски дарове': 'fish',
};

// Fish sold by weight: the printed "100g" next to the price is the price basis,
// not a portion (Needs Review #11, #12).
export const PER_100G = new Set(['FSH-01', 'FSH-02', 'FSH-05', 'FSH-07']);

// ── Expected values for one spreadsheet row ─────────────────────────────────
const lcFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);

export function expectedFor(row) {
  const id = row['Item ID'];
  const base = row['Product Name'].trim();
  const variant = row['Variant'].trim();
  const basis = row['Price Basis'].trim();

  let name;
  if (id === 'DES-01') name = 'Десерти';
  else if (basis === 'per kg') name = `${base} (${variant})`;
  else if (variant) name = `${base} ${lcFirst(variant)}`;
  else if (row['Subcategory'] === 'На скара') name = `${base} на скара`; // printed under the "НА СКАРА" heading
  else name = base;

  const priceRaw = row['Price (EUR)'];
  const price = priceRaw === '' ? null : Math.round(parseFloat(priceRaw) * 100) / 100;

  let price_unit = null;
  let weight = '';
  if (basis === 'per kg') price_unit = 'кг';
  else if (PER_100G.has(id)) price_unit = '100 г';
  else if (row['Portion']) {
    const n = parseFloat(row['Portion']);
    weight = row['Unit'] === 'kg' ? `${n * 1000} г` : `${n} г`;
  }

  const codes = row['Allergens (codes)'].split(',').map((s) => s.trim()).filter(Boolean).map(Number);
  const allergens = codes.map((c) => ALLERGEN_CODES[c]);

  return {
    itemId: id,
    dishId: ITEM_TO_DISH[id],
    category: CATEGORY_MAP[row['Category']],
    name_bg: name,
    price,
    price_unit,
    weight,
    allergens,
    description_bg: row['Description'].trim(),
  };
}

export function loadMenuData(file = path.join(ROOT, 'js', 'menu-data.js')) {
  const w = {};
  new Function('window', fs.readFileSync(file, 'utf8'))(w);
  return w.menuData;
}

export function loadRows(xlsx = path.join(ROOT, '_tools', 'Restaurant_Menu_Master.xlsx')) {
  return sheetObjects(readXlsx(xlsx)['Master Menu']);
}

// ── Report ──────────────────────────────────────────────────────────────────
function main() {
  const xlsx = process.argv[2] ? path.resolve(process.argv[2]) : undefined;
  const rows = loadRows(xlsx);
  const dishes = loadMenuData();
  const byId = new Map(dishes.map((d) => [d.id, d]));
  const used = new Set();
  const fmt = (p) => (p == null ? '—' : p.toFixed(2));
  const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

  let errors = 0;
  const kept = [];
  const toConfirm = [];
  const lines = [];

  for (const row of rows) {
    const e = expectedFor(row);
    const d = e.dishId && byId.get(e.dishId);
    if (!d) {
      errors++;
      lines.push(`✗ ${e.itemId.padEnd(9)} ${e.name_bg}  →  NO MATCHING DISH${e.dishId ? ` (expected id ${e.dishId})` : ''}`);
      continue;
    }
    used.add(d.id);
    const issues = [];
    if (d.name_bg !== e.name_bg) issues.push(`name "${d.name_bg}" ≠ "${e.name_bg}"`);
    if (d.category !== e.category) issues.push(`category ${d.category} ≠ ${e.category}`);
    if (d.price !== e.price) issues.push(`price ${fmt(d.price)} ≠ ${fmt(e.price)}`);
    if ((d.price_unit || null) !== e.price_unit) issues.push(`price_unit ${d.price_unit} ≠ ${e.price_unit}`);
    if ((d.weight || '') !== e.weight) issues.push(`weight "${d.weight}" ≠ "${e.weight}"`);
    const siteA = d.allergens || [];
    const missing = e.allergens.filter((a) => !siteA.includes(a));
    const extra = siteA.filter((a) => !e.allergens.includes(a));
    if (KEEP_ALLERGENS.has(e.itemId)) {
      if (!sameSet(siteA, e.allergens)) kept.push(`${e.itemId} ${d.name_bg}: site [${siteA.join(', ')}], sheet [${e.allergens.join(', ')}]`);
    } else {
      if (missing.length) issues.push(`allergens: sheet lists [${missing.join(', ')}] that the site is missing`);
      if (extra.length) toConfirm.push(`${e.itemId} ${d.name_bg}: site has [${extra.join(', ')}], not on the printed tag`);
    }
    if (e.description_bg && d.description_bg !== e.description_bg && !KEEP_DESCRIPTION.has(e.itemId)) {
      issues.push(`description "${d.description_bg}" ≠ "${e.description_bg}"`);
    }
    errors += issues.length;
    const unit = d.price_unit ? ` / ${d.price_unit}` : '';
    lines.push(
      `${issues.length ? '✗' : '✓'} ${e.itemId.padEnd(9)} → ${d.id.padEnd(36)} ${fmt(d.price).padStart(6)} €${unit.padEnd(8)} ${(d.weight || '').padEnd(7)} ${d.name_bg}` +
        (issues.length ? `\n      ${issues.join('\n      ')}` : '')
    );
  }

  const orphans = dishes.filter((d) => !used.has(d.id));

  console.log(lines.join('\n'));
  console.log(`\nSpreadsheet rows: ${rows.length}   Dishes in menu-data.js: ${dishes.length}`);
  console.log(`Dishes not on the spreadsheet: ${orphans.length ? orphans.map((d) => `${d.id} (${d.name_bg})`).join(', ') : 'none'}`);
  if (kept.length) console.log(`\nAllergens kept from the site (Needs Review — codes unreadable):\n  ${kept.join('\n  ')}`);
  if (toConfirm.length) console.log(`\nAllergens kept but missing from the printed tag (owner to confirm):\n  ${toConfirm.join('\n  ')}`);
  errors += orphans.length;
  console.log(errors ? `\n${errors} mismatch(es)` : '\nAll rows match.');
  process.exitCode = errors ? 1 : 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
