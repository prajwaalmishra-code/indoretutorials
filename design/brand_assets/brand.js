// Indore Tutorials brand kit: palette, contact details, emblem and logo lockups.
// Rendered to PNG by render.py; edit BRAND below and re-run to refresh every asset.

const BRAND = {
  name1: 'Indore',
  name2: 'Tutorials',
  tagline: 'UNLOCK YOUR POTENTIAL...',
  phone: '7489 699 909',
  web: 'www.indoretutorials.online',
  email: 'indoretutorial1857@gmail.com',
};

const C = {
  gold: '#FCBC00', goldL: '#FFD54D', goldD: '#E59C00', goldDD: '#9A6A00',
  ink: '#14141B', ink2: '#23232E', ink3: '#3A3A4A', mute: '#6B6B7B',
  cream: '#FFF6DE', paper: '#FFFCF5', white: '#FFFFFF', line: '#F0E3BF',
  navy: '#1F2C4D', navyL: '#33467A', green: '#3E8E6A', greenD: '#2B6A4E',
  coral: '#F07A5A', sky: '#DCE8F7',
};

const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Plus Jakarta Sans', 'Manrope', Arial, sans-serif";

let _uid = 0;
const uid = (p = 'u') => `${p}${++_uid}`;

// Measure rendered text width with the same fonts the SVG uses.
const _ctx = document.createElement('canvas').getContext('2d');
function textW(text, size, family = SANS, weight = 700, spacing = 0) {
  _ctx.font = `${weight} ${size}px ${family}`;
  return _ctx.measureText(text).width + spacing * text.length;
}

// Shared gradients/filters; every scene SVG includes this once.
function defs() {
  return `<defs>
    <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.goldL}"/><stop offset="1" stop-color="${C.goldD}"/></linearGradient>
    <linearGradient id="gGoldH" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.goldD}"/><stop offset=".5" stop-color="${C.goldL}"/><stop offset="1" stop-color="${C.goldD}"/></linearGradient>
    <linearGradient id="gInk" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22222D"/><stop offset="1" stop-color="#0E0E13"/></linearGradient>
    <radialGradient id="gGlow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="${C.gold}" stop-opacity=".55"/><stop offset="1" stop-color="${C.gold}" stop-opacity="0"/></radialGradient>
    <radialGradient id="gGlowW" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="fShadow" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#1a1408" flood-opacity=".16"/></filter>
    <filter id="fShadowS" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#1a1408" flood-opacity=".18"/></filter>
    <pattern id="pDots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="2.4" fill="${C.gold}"/></pattern>
    <pattern id="pDotsInk" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="2.2" fill="${C.ink}" opacity=".18"/></pattern>
    <pattern id="pDotsW" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="2.2" fill="#fff" opacity=".14"/></pattern>
  </defs>`;
}

// Brand emblem: stacked discs (crescent, C, O, dot) in a 400x340 box, cut with real
// transparency so it works on any background. `light` swaps ink parts to white.
function emblem(x, y, h, light = false) {
  const s = h / 340, id = uid('em');
  const dark = light ? '#FFFFFF' : C.ink;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <defs>
      <mask id="${id}a" maskUnits="userSpaceOnUse" x="-20" y="-20" width="460" height="400">
        <ellipse cx="150" cy="170" rx="140" ry="166" fill="#fff"/>
        <ellipse cx="200" cy="170" rx="124" ry="160" fill="#000"/></mask>
      <mask id="${id}b" maskUnits="userSpaceOnUse" x="-20" y="-20" width="460" height="400">
        <ellipse cx="210" cy="170" rx="116" ry="156" fill="#fff"/>
        <ellipse cx="256" cy="170" rx="96" ry="144" fill="#000"/></mask>
      <mask id="${id}c" maskUnits="userSpaceOnUse" x="-20" y="-20" width="460" height="400">
        <ellipse cx="262" cy="170" rx="80" ry="132" fill="#fff"/>
        <ellipse cx="282" cy="170" rx="34" ry="62" fill="#000"/></mask>
      <linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${C.goldL}"/><stop offset=".55" stop-color="${C.gold}"/><stop offset="1" stop-color="${C.goldD}"/></linearGradient>
    </defs>
    <ellipse cx="150" cy="170" rx="140" ry="166" fill="${dark}" mask="url(#${id}a)"/>
    <ellipse cx="210" cy="170" rx="116" ry="156" fill="url(#${id}g)" mask="url(#${id}b)"/>
    <ellipse cx="262" cy="170" rx="80" ry="132" fill="${dark}" mask="url(#${id}c)"/>
    <ellipse cx="372" cy="170" rx="20" ry="46" fill="url(#${id}g)"/>
  </g>`;
}
const EMBLEM_W = 392 / 340; // width per unit of height

// Wordmark "Indore Tutorials" with the tagline under it, left-aligned at x.
// `size` is the font-size; wordmarkWidth(size) gives the rendered width.
function wordmarkWidth(size) {
  const sp = -size * 0.015;
  return textW(BRAND.name1, size, SERIF, 700, sp) + size * 0.12 + textW(BRAND.name2, size, SERIF, 700, sp);
}

function wordmark(x, y, size, light = false, tagline = true) {
  const tcol = light ? '#FFFFFF' : C.ink;
  const w = wordmarkWidth(size);
  let out = `<text x="${x}" y="${y}" font-family="${SERIF}" font-weight="700" font-size="${size}" letter-spacing="${-size * 0.015}">
    <tspan fill="url(#gGold)">${BRAND.name1}</tspan><tspan fill="${tcol}" dx="${size * 0.12}">${BRAND.name2}</tspan></text>`;
  if (tagline) {
    const ty = y + size * 0.52, ts = size * 0.205;
    const textW = w * 0.66, gap = size * 0.16, rule = (w - textW) / 2 - gap;
    out += `<rect x="${x}" y="${ty - ts * 0.42}" width="${rule}" height="${ts * 0.22}" rx="${ts * 0.11}" fill="${C.gold}"/>
      <rect x="${x + w - rule}" y="${ty - ts * 0.42}" width="${rule}" height="${ts * 0.22}" rx="${ts * 0.11}" fill="${C.gold}"/>
      <text x="${x + w / 2}" y="${ty}" text-anchor="middle" font-family="${SANS}" font-weight="700" font-size="${ts}" letter-spacing="${ts * 0.42}" fill="${tcol}" textLength="${textW}" lengthAdjust="spacing">${BRAND.tagline}</text>`;
  }
  return out;
}

// Horizontal lockup: emblem + wordmark side by side. Height ~ h.
function logoHorizontal(x, y, h, light = false) {
  const eh = h, size = h * 0.5;
  return emblem(x, y, eh, light) + wordmark(x + eh * EMBLEM_W + h * 0.16, y + h * 0.56, size, light);
}

// Compact lockup for tight spaces (navbar): emblem + two-line "Indore / Tutorials".
function logoCompact(x, y, h, light = false) {
  const size = h * 0.46, tx = x + h * EMBLEM_W + h * 0.12;
  return emblem(x, y, h, light) +
    `<text font-family="${SERIF}" font-weight="700" font-size="${size}" letter-spacing="${-size * 0.01}">
      <tspan x="${tx}" y="${y + h * 0.44}" fill="url(#gGold)">${BRAND.name1}</tspan>
      <tspan x="${tx}" y="${y + h * 0.92}" fill="${light ? '#FFFFFF' : C.ink}">${BRAND.name2}</tspan></text>`;
}

// Single-line lockup for the navbar: small emblem + "Indore Tutorials" on one line.
// `size` is the wordmark font-size; the emblem matches the cap height.
function logoInline(x, y, size, light = false) {
  const eh = size * 0.86;
  return emblem(x, y + size * 0.06, eh, light) +
    wordmark(x + eh * EMBLEM_W + size * 0.22, y + size * 0.8, size, light, false);
}

function logoHorizontalWidth(h) {
  return h * EMBLEM_W + h * 0.16 + wordmarkWidth(h * 0.5);
}

// Stacked lockup: emblem centered above wordmark. cx is the center line.
function logoStacked(cx, y, w, light = false) {
  const size = w / wordmarkWidth(1), eh = size * 1.55;
  return emblem(cx - eh * EMBLEM_W / 2, y, eh, light) + wordmark(cx - w / 2, y + eh + size * 0.95, size, light);
}

// Rounded app-icon tile with the emblem: used for favicons and PWA icons.
function appIcon(size, pad = 0.2, radius = 0.22) {
  const r = size * radius, eh = size * (1 - pad * 2) / EMBLEM_W;
  return `<rect width="${size}" height="${size}" rx="${r}" fill="url(#gInk)"/>
    <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.42}" fill="url(#gGlow)" opacity=".35"/>
    ${emblem(size * pad, (size - eh) / 2, eh, true)}`;
}
