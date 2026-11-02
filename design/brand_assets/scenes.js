// Asset catalogue: each entry is { w, h, draw() } and renders to out/<name>.png.

const ASSETS = {};

/* ---------- logos & icons ---------- */

ASSETS.logo_horizontal = { w: 1800, h: 340, trim: true, draw: () => logoHorizontal(20, 40, 240) };
ASSETS.logo_horizontal_light = { w: 1800, h: 340, trim: true, draw: () => logoHorizontal(20, 40, 240, true) };
ASSETS.logo_inline = { w: 1700, h: 260, trim: true, draw: () => logoInline(20, 30, 160) };
ASSETS.logo_compact = { w: 900, h: 340, trim: true, draw: () => logoCompact(20, 40, 240) };
ASSETS.logo_compact_light = { w: 900, h: 340, trim: true, draw: () => logoCompact(20, 40, 240, true) };
ASSETS.logo_stacked = { w: 1300, h: 900, trim: true, draw: () => logoStacked(650, 40, 1100) };
ASSETS.logo_stacked_light = { w: 1300, h: 900, trim: true, draw: () => logoStacked(650, 40, 1100, true) };
ASSETS.logo_badge = {
  w: 512, h: 512,
  draw: () => `<circle cx="256" cy="256" r="250" fill="#fff"/><circle cx="256" cy="256" r="236" fill="none" stroke="${C.gold}" stroke-width="6"/>
    ${emblem(256 - 230 * EMBLEM_W / 2, 140, 230)}`,
};
ASSETS.icon_512 = { w: 512, h: 512, draw: () => appIcon(512) };
// Maskable PWA icon: full-bleed square, emblem inside the 80% safe zone.
ASSETS.icon_maskable_512 = { w: 512, h: 512, draw: () => appIcon(512, 0.24, 0) };

/* ---------- text helpers ---------- */

function T(x, y, size, content, o = {}) {
  return `<text x="${x}" y="${y}" font-family="${o.family || SANS}" font-weight="${o.weight || 800}" font-size="${size}"
    fill="${o.color || C.ink}" text-anchor="${o.anchor || 'start'}" letter-spacing="${o.ls || 0}" opacity="${o.opacity || 1}">${content}</text>`;
}

// One headline line where `hl` sits on a gold marker (light bg) or turns gold (dark bg).
function markLine(x, y, size, before, hl, after = '', dark = false, weight = 800, markerColor = C.gold) {
  const wb = before ? textW(before + ' ', size, SANS, weight) : 0;
  const wh = textW(hl, size, SANS, weight);
  const marker = dark || !hl ? '' :
    `<rect x="${x + wb - size * 0.08}" y="${y - size * 0.34}" width="${wh + size * 0.16}" height="${size * 0.38}" rx="${size * 0.08}" fill="${markerColor}"/>`;
  return marker + `<text x="${x}" y="${y}" font-family="${SANS}" font-weight="${weight}" font-size="${size}" fill="${dark ? '#fff' : C.ink}">
    ${before ? before + ' ' : ''}<tspan fill="${dark ? C.gold : C.ink}">${hl}</tspan>${after}</text>`;
}

// Contact pills laid out in a row starting at x; returns svg.
function contactRow(x, y, h, items, opts = {}) {
  let out = '', cx = x;
  for (const [ic, text] of items) {
    out += pill(cx, y, h, ic, text, opts);
    cx += pillWidth(h, text) + h * 0.3;
  }
  return out;
}

/* ---------- desktop banners 1920x300 (keep key content inside x 300..1620) ---------- */

function bannerBgLight() {
  return `<rect width="1920" height="300" fill="${C.paper}"/>
    <rect width="1920" height="300" fill="url(#bgWarm)"/>
    <defs><linearGradient id="bgWarm" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FFF3D1"/><stop offset=".45" stop-color="#FFFCF5"/><stop offset="1" stop-color="#FFF1CA"/></linearGradient></defs>
    <path d="M0 0 H210 C150 90 170 210 90 300 H0 Z" fill="${C.gold}" opacity=".9"/>
    <path d="M0 0 H150 C100 80 110 200 40 300 H0 Z" fill="${C.ink}"/>
    ${rings(250, 30, 120, 3, C.gold, 0.35, 3)}
    <rect x="1700" y="20" width="200" height="130" fill="url(#pDots)" opacity=".5"/>
    <path d="M1920 300 H1700 C1760 240 1780 140 1860 90 C1890 70 1910 60 1920 58 Z" fill="${C.ink}"/>
    <path d="M1920 300 H1790 C1830 250 1850 180 1920 150 Z" fill="${C.gold}"/>`;
}

ASSETS.banner_1_desktop = {
  w: 1920, h: 300,
  draw: () => bannerBgLight() +
    markLine(320, 92, 50, 'Learn Smarter,', '') +
    markLine(320, 148, 50, '', 'Score Higher.') +
    T(320, 184, 20, 'Live classes, video courses &amp; test series by expert faculty.', { weight: 600, color: C.mute }) +
    contactRow(320, 206, 44, [['phone', BRAND.phone], ['globe', BRAND.web]]) +
    // illustration
    `<circle cx="1180" cy="330" r="250" fill="url(#gGold)"/>
     ${rings(1180, 330, 300, 3, C.ink, 0.12, 2.5)}
     <rect x="1310" y="40" width="130" height="90" fill="url(#pDotsInk)"/>` +
    student(1060, 70, 0.78, { skin: 'wheat', hair: 'bun', top: C.ink, pose: 'desk', eyes: 'down', earring: true }) +
    `<rect x="930" y="282" width="520" height="18" rx="4" fill="${C.ink}"/>` +
    laptopBack(1154, 284, 150) +
    deskLamp(950, 284, 150) + bookStack(1300, 282, 110) + mug(1420, 282, 40) +
    infoCard(870, 46, 250, 70, 'live', 'Live Class', 'Physics · 6:00 PM', {}) +
    infoCard(1420, 140, 230, 70, 'trophy', 'Score 98%', 'Mock Test #12', { bar: 0.98 }) +
    sparkle(1270, 40, 14) + sparkle(1480, 110, 9, C.ink) + sparkle(890, 160, 10) +
    formulaChip(1700, 190, 'a² + b² = c²', 22, -6),
};

ASSETS.banner_2_desktop = {
  w: 1920, h: 300,
  draw: () => `<rect width="1920" height="300" fill="url(#gInk)"/>
    <rect width="1920" height="300" fill="url(#pDotsW)" opacity=".5"/>
    <circle cx="1220" cy="150" r="300" fill="url(#gGlow)" opacity=".55"/>
    ${rings(120, 150, 170, 4, C.gold, 0.5, 3)}
    ${rings(1840, 160, 150, 4, C.gold, 0.4, 3)}` +
    markLine(320, 92, 50, 'Boost Your', 'Score', '', true) +
    markLine(320, 148, 50, 'with', 'Smart Tests', '', true) +
    T(320, 184, 20, 'Mock tests · PYQs · All-India rank · Detailed analysis', { weight: 600, color: '#C9C9D4' }) +
    contactRow(320, 206, 44, [['phone', BRAND.phone], ['globe', BRAND.web]], { bg: '#2A2A36', stroke: '#3A3A4A' }) +
    // test paper card
    `<g filter="url(#fShadow)" transform="rotate(-4 1000 160)">
      <rect x="880" y="40" width="240" height="250" rx="18" fill="#FFFCF5"/>
      <rect x="880" y="40" width="240" height="50" rx="18" fill="${C.gold}"/><rect x="880" y="70" width="240" height="20" fill="${C.gold}"/>
      ${T(904, 74, 20, 'MOCK TEST 12', { color: C.ink })}
      ${[0, 1, 2, 3].map(i => `<circle cx="912" cy="${122 + i * 38}" r="12" fill="${i === 2 ? '#F2E7CC' : C.ink}"/>
        ${i === 2 ? '' : icon('check', 912, 122 + i * 38, 14, C.gold)}
        <rect x="934" y="${114 + i * 38}" width="${150 - i * 14}" height="8" rx="4" fill="#E7DCC2"/>
        <rect x="934" y="${128 + i * 38}" width="${100 - i * 10}" height="6" rx="3" fill="#F0E7D2"/>`).join('')}
    </g>` +
    student(1130, 60, 0.8, { skin: 'light', hair: 'ponytail', top: C.gold, topShade: 'rgba(150,90,0,.25)', collar: 'shirt', pose: 'think', glasses: true }) +
    // score ring
    `<g filter="url(#fShadow)"><circle cx="1470" cy="110" r="64" fill="#fff"/>
      <circle cx="1470" cy="110" r="48" fill="none" stroke="#F1E9D6" stroke-width="12"/>
      <circle cx="1470" cy="110" r="48" fill="none" stroke="${C.gold}" stroke-width="12" stroke-linecap="round"
        stroke-dasharray="${2 * Math.PI * 48 * 0.92} 999" transform="rotate(-90 1470 110)"/>
      ${T(1470, 118, 26, '92%', { anchor: 'middle' })}</g>` +
    infoCard(1380, 200, 250, 70, 'star', 'All-India Rank', 'Compare with toppers', { dark: false }) +
    sparkle(860, 40, 12) + sparkle(1560, 40, 10, '#fff') + sparkle(1100, 270, 9) +
    formulaChip(1680, 50, 'π r²', 24, 8, true),
};

ASSETS.banner_3_desktop = {
  w: 1920, h: 300,
  draw: () => bannerBgLight() +
    markLine(320, 90, 40, 'Knowledge That Costs Nothing,', '') +
    markLine(320, 144, 40, '', 'Empowers Everything.') +
    T(320, 180, 20, 'Join 900+ students preparing smarter with Indore Tutorials.', { weight: 600, color: C.mute }) +
    contactRow(320, 206, 44, [['phone', BRAND.phone], ['globe', BRAND.web]]) +
    `<path d="M980 300 C1030 170 1470 170 1520 300 Z" fill="url(#gGold)"/>
     ${rings(1250, 300, 260, 3, C.ink, 0.1, 2.5)}` +
    student(1010, 92, 0.7, { skin: 'brown', hair: 'braid', top: C.navy, pose: 'books', mouth: 'open' }) +
    student(1340, 92, 0.7, { skin: 'wheat', hair: 'short', top: C.ink, collar: 'shirt', pose: 'wave', mouth: 'open' }) +
    student(1158, 66, 0.8, { skin: 'light', hair: 'long', pose: 'grad', collar: 'gown', top: C.ink, cap: true, mouth: 'open' }) +
    infoCard(975, 22, 200, 64, 'users', '900+', 'Happy students') +
    infoCard(1500, 60, 230, 66, 'book', 'E-Library', 'Notes &amp; e-books') +
    sparkle(1290, 40, 14) + sparkle(1510, 170, 9, C.ink) + sparkle(950, 160, 10) +
    formulaChip(1700, 190, 'E = mc²', 22, -6),
};

/* ---------- mobile banners 750x400 ---------- */

function bannerBgMobile(dark = false) {
  return dark
    ? `<rect width="750" height="400" fill="url(#gInk)"/><rect width="750" height="400" fill="url(#pDotsW)" opacity=".5"/>
       <circle cx="560" cy="230" r="250" fill="url(#gGlow)" opacity=".55"/>${rings(700, 60, 120, 3, C.gold, 0.45, 3)}`
    : `<rect width="750" height="400" fill="url(#bgWarmM)"/>
       <defs><linearGradient id="bgWarmM" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stop-color="#FFFCF5"/><stop offset="1" stop-color="#FFEFC2"/></linearGradient></defs>
       <rect x="600" y="16" width="140" height="90" fill="url(#pDots)" opacity=".45"/>
       <path d="M0 400 V330 C40 350 60 380 120 400 Z" fill="${C.gold}"/>`;
}

ASSETS.banner_1_mobile = {
  w: 750, h: 400, scale: 2,
  draw: () => bannerBgMobile() +
    `<circle cx="590" cy="420" r="210" fill="url(#gGold)"/>${rings(590, 420, 250, 3, C.ink, 0.12, 2.5)}` +
    student(486, 186, 0.74, { skin: 'wheat', hair: 'bun', top: C.ink, pose: 'desk', eyes: 'down', earring: true }) +
    `<rect x="400" y="384" width="350" height="16" fill="${C.ink}"/>` + laptopBack(575, 386, 140) + deskLamp(410, 386, 120) + bookStack(660, 384, 80) +
    infoCard(486, 80, 220, 64, 'live', 'Live Class', 'Physics · 6:00 PM') +
    markLine(30, 100, 44, 'Learn Smarter,', '') +
    markLine(30, 154, 44, '', 'Score Higher.') +
    T(30, 194, 21, 'Live classes · Videos · Test series', { weight: 600, color: C.mute }) +
    pill(30, 228, 46, 'phone', BRAND.phone) +
    pill(30, 286, 46, 'globe', BRAND.web, { bg: '#fff', fg: C.ink, stroke: '#F0E3BF' }) +
    sparkle(720, 150, 10, C.ink),
};

ASSETS.banner_2_mobile = {
  w: 750, h: 400, scale: 2,
  draw: () => bannerBgMobile(true) +
    `<g filter="url(#fShadow)" transform="rotate(-5 470 250)">
      <rect x="400" y="160" width="170" height="190" rx="16" fill="#FFFCF5"/>
      <rect x="400" y="160" width="170" height="40" rx="16" fill="${C.gold}"/><rect x="400" y="184" width="170" height="16" fill="${C.gold}"/>
      ${T(418, 187, 16, 'MOCK TEST 12', { color: C.ink })}
      ${[0, 1, 2].map(i => `<circle cx="424" cy="${226 + i * 36}" r="11" fill="${C.ink}"/>${icon('check', 424, 226 + i * 36, 13, C.gold)}
        <rect x="444" y="${219 + i * 36}" width="${100 - i * 12}" height="7" rx="3.5" fill="#E7DCC2"/>
        <rect x="444" y="${231 + i * 36}" width="${70 - i * 8}" height="5" rx="2.5" fill="#F0E7D2"/>`).join('')}
    </g>` +
    student(520, 176, 0.75, { skin: 'light', hair: 'ponytail', top: C.gold, topShade: 'rgba(150,90,0,.25)', collar: 'shirt', pose: 'think', glasses: true }) +
    `<g filter="url(#fShadow)"><circle cx="672" cy="196" r="48" fill="#fff"/>
      <circle cx="672" cy="196" r="35" fill="none" stroke="#F1E9D6" stroke-width="9"/>
      <circle cx="672" cy="196" r="35" fill="none" stroke="${C.gold}" stroke-width="9" stroke-linecap="round"
        stroke-dasharray="${2 * Math.PI * 35 * 0.92} 999" transform="rotate(-90 672 196)"/>
      ${T(672, 203, 20, '92%', { anchor: 'middle' })}</g>` +
    markLine(30, 100, 44, 'Boost Your', 'Score', '', true) +
    markLine(30, 154, 44, 'with', 'Smart Tests', '', true) +
    T(30, 194, 21, 'Mock tests · PYQs · All-India rank', { weight: 600, color: '#C9C9D4' }) +
    pill(30, 228, 46, 'phone', BRAND.phone, { bg: '#2A2A36', stroke: '#3A3A4A' }) +
    pill(30, 286, 46, 'globe', BRAND.web, { bg: '#2A2A36', stroke: '#3A3A4A' }) +
    sparkle(470, 120, 10) + sparkle(720, 300, 8, '#fff'),
};

ASSETS.banner_3_mobile = {
  w: 750, h: 400, scale: 2,
  draw: () => bannerBgMobile() +
    `<path d="M410 400 C440 260 730 260 760 400 Z" fill="url(#gGold)"/>` +
    student(420, 220, 0.6, { skin: 'brown', hair: 'braid', top: C.navy, pose: 'books', mouth: 'open' }) +
    student(600, 220, 0.6, { skin: 'wheat', hair: 'short', top: C.ink, collar: 'shirt', pose: 'wave', mouth: 'open' }) +
    student(506, 186, 0.7, { skin: 'light', hair: 'long', pose: 'grad', collar: 'gown', top: C.ink, cap: true, mouth: 'open' }) +
    infoCard(470, 90, 200, 62, 'users', '900+', 'Happy students') +
    markLine(30, 96, 36, 'Knowledge That', '') +
    markLine(30, 142, 36, 'Costs Nothing,', '') +
    markLine(30, 188, 36, '', 'Empowers Everything.') +
    pill(30, 228, 46, 'phone', BRAND.phone) +
    pill(30, 286, 46, 'globe', BRAND.web, { bg: '#fff', fg: C.ink, stroke: '#F0E3BF' }) +
    sparkle(700, 140, 10, C.ink) + sparkle(440, 120, 8),
};

/* ---------- banner 4: gold background ---------- */

function bannerBgGold(w, h) {
  return `<defs><linearGradient id="bgGold${w}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.goldL}"/><stop offset=".55" stop-color="${C.gold}"/><stop offset="1" stop-color="${C.goldD}"/></linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#bgGold${w})"/>
    <rect width="${w}" height="${h}" fill="url(#pDotsInk)" opacity=".35"/>`;
}

ASSETS.banner_4_desktop = {
  w: 1920, h: 300,
  draw: () => bannerBgGold(1920, 300) +
    `<path d="M0 0 H210 C150 90 170 210 90 300 H0 Z" fill="#fff" opacity=".85"/>
     <path d="M0 0 H150 C100 80 110 200 40 300 H0 Z" fill="${C.ink}"/>
     <path d="M1920 300 H1700 C1760 240 1780 140 1860 90 C1890 70 1910 60 1920 58 Z" fill="${C.ink}"/>
     <path d="M1920 300 H1790 C1830 250 1850 180 1920 150 Z" fill="#fff" opacity=".85"/>
     ${rings(1180, 330, 300, 3, C.ink, 0.14, 2.5)}
     <circle cx="1180" cy="330" r="240" fill="#fff" opacity=".35"/>` +
    markLine(320, 92, 50, 'Learn Anytime,', '') +
    markLine(320, 148, 50, '', 'Anywhere.', '', false, 800, '#fff') +
    T(320, 184, 20, 'HD video lectures, notes &amp; e-books. Study at your own pace.', { weight: 600, color: C.ink2 }) +
    contactRow(320, 206, 44, [['phone', BRAND.phone], ['globe', BRAND.web]]) +
    student(1150, 66, 0.78, { skin: 'brown', hair: 'long', top: C.navy, pose: 'wave', mouth: 'open', earring: true }) +
    `<rect x="930" y="282" width="360" height="18" rx="4" fill="${C.ink}"/>` +
    laptopFront(1080, 284, 250) +
    openBook(1450, 230, 130, C.ink) +
    infoCard(880, 36, 240, 70, 'play', 'Video Courses', 'Watch anytime') +
    infoCard(1400, 90, 230, 70, 'book', 'E-Library', 'Notes &amp; e-books') +
    sparkle(1300, 40, 14, '#fff') + sparkle(900, 272, 10, C.ink) + sparkle(1560, 200, 9, '#fff') +
    formulaChip(1690, 50, 'H₂O', 24, 8),
};

ASSETS.banner_4_mobile = {
  w: 750, h: 400, scale: 2,
  draw: () => bannerBgGold(750, 400) +
    `<circle cx="590" cy="420" r="210" fill="#fff" opacity=".4"/>${rings(590, 420, 250, 3, C.ink, 0.14, 2.5)}` +
    student(510, 190, 0.7, { skin: 'brown', hair: 'long', top: C.navy, pose: 'wave', mouth: 'open', earring: true }) +
    `<rect x="400" y="384" width="350" height="16" fill="${C.ink}"/>` + laptopFront(500, 386, 190) +
    infoCard(470, 70, 220, 64, 'play', 'Video Courses', 'Watch anytime') +
    markLine(30, 100, 44, 'Learn Anytime,', '') +
    markLine(30, 154, 44, '', 'Anywhere.', '', false, 800, '#fff') +
    T(30, 194, 21, 'Videos · Notes · E-books', { weight: 600, color: C.ink2 }) +
    pill(30, 228, 46, 'phone', BRAND.phone) +
    pill(30, 286, 46, 'globe', BRAND.web, { bg: '#fff', fg: C.ink, stroke: '#F0E3BF' }) +
    sparkle(720, 160, 10, '#fff'),
};

/* ---------- login / signup: desktop 1000x1400 (safe x 190..810, keep y > 1270 quiet) ---------- */

// Centered line with an optional gold-highlighted tail.
function centerLine(cx, y, size, plain, gold = '', dark = false) {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-family="${SANS}" font-weight="800" font-size="${size}" fill="${dark ? '#fff' : C.ink}">${plain}${gold ? `<tspan fill="${dark ? C.gold : C.goldDD}">${gold}</tspan>` : ''}</text>`;
}

function centeredPill(cx, y, h, ic, text, opts) {
  return pill(cx - pillWidth(h, text) / 2, y, h, ic, text, opts);
}

function deskScene(cx, top, k, person, dark) {
  const deskY = top + 296 * k;
  return `<circle cx="${cx}" cy="${top + 190 * k}" r="${170 * k}" fill="url(#gGold)"/>
    ${rings(cx, top + 190 * k, 210 * k, 3, dark ? C.gold : C.ink, dark ? 0.35 : 0.12, 3)}` +
    deskLamp(cx - 205 * k, deskY, 160 * k, dark) +
    student(cx - 120 * k, top, k, person) +
    `<rect x="${cx - 215 * k}" y="${deskY - 2}" width="${430 * k}" height="${22 * k}" rx="${6 * k}" fill="${dark ? '#2E2E3A' : C.ink}"/>
     <rect x="${cx - 190 * k}" y="${deskY + 20 * k}" width="${12 * k}" height="${70 * k}" fill="${dark ? '#2E2E3A' : C.ink}"/>
     <rect x="${cx + 178 * k}" y="${deskY + 20 * k}" width="${12 * k}" height="${70 * k}" fill="${dark ? '#2E2E3A' : C.ink}"/>` +
    laptopBack(cx, deskY, 190 * k, dark) +
    bookStack(cx + 110 * k, deskY, 80 * k) + mug(cx + 128 * k, deskY - 64 * k, 30 * k) +
    plant(cx - 165 * k, deskY, 60 * k);
}

ASSETS.auth_login_desktop = {
  w: 1000, h: 1400,
  draw: () => `<rect width="1000" height="1400" fill="url(#gInk)"/>
    <rect width="1000" height="1400" fill="url(#pDotsW)" opacity=".6"/>
    <circle cx="500" cy="860" r="460" fill="url(#gGlow)" opacity=".5"/>
    ${rings(-40, 200, 260, 4, C.gold, 0.35, 3)}${rings(1060, 1180, 260, 4, C.gold, 0.3, 3)}` +
    logoStacked(500, 110, 440, true) +
    centerLine(500, 418, 56, 'Your success story', '', true) +
    centerLine(500, 484, 56, '', 'continues here.', true) +
    T(500, 538, 26, 'Pick up right where you left off.', { anchor: 'middle', weight: 600, color: '#BDBDC9' }) +
    deskScene(500, 640, 1.45, { skin: 'wheat', hair: 'bun', top: C.navyL, pose: 'desk', eyes: 'down', earring: true }, true) +
    infoCard(185, 640, 250, 76, 'clock', 'Live at 6 PM', 'Physics · Chapter 4', {}) +
    infoCard(565, 780, 250, 76, 'trophy', 'Score 98%', 'Mock Test #12', { bar: 0.98 }) +
    sparkle(250, 790, 16) + sparkle(770, 660, 12, '#fff') + sparkle(820, 980, 9) +
    centeredPill(500, 1150, 56, 'phone', BRAND.phone, { bg: '#2A2A36', stroke: '#3A3A4A' }) +
    centeredPill(500, 1218, 50, 'globe', BRAND.web, { bg: 'transparent', shadow: false, iconBg: '#2A2A36', iconColor: C.gold, fg: '#D9D9E2' }),
};

ASSETS.auth_signup_desktop = {
  w: 1000, h: 1400,
  draw: () => `<rect width="1000" height="1400" fill="url(#bgSign)"/>
    <defs><linearGradient id="bgSign" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFFCF5"/><stop offset=".6" stop-color="#FFF4D6"/><stop offset="1" stop-color="#FFE9AE"/></linearGradient></defs>
    <rect x="60" y="560" width="200" height="160" fill="url(#pDots)" opacity=".45"/>
    <rect x="760" y="380" width="180" height="140" fill="url(#pDots)" opacity=".45"/>
    ${rings(1040, 160, 240, 4, C.gold, 0.4, 3)}` +
    logoStacked(500, 100, 440) +
    centerLine(500, 404, 54, 'Start your journey') +
    markLine(500 - textW('to success today.', 54, SANS, 800) / 2, 470, 54, '', 'to success today.') +
    T(500, 524, 25, 'Create a free account in under a minute.', { anchor: 'middle', weight: 600, color: C.mute }) +
    `<path d="M150 990 C210 720 790 720 850 990 Z" fill="url(#gGold)"/>
     ${rings(500, 990, 360, 3, C.ink, 0.1, 3)}` +
    student(196, 640, 1.2, { skin: 'brown', hair: 'braid', top: C.navy, pose: 'books', mouth: 'open' }) +
    student(516, 640, 1.2, { skin: 'deep', hair: 'curly', top: C.coral, collar: 'hoodie', pose: 'wave', mouth: 'open' }) +
    student(340, 590, 1.33, { skin: 'light', hair: 'long', pose: 'grad', collar: 'gown', top: C.ink, cap: true, mouth: 'open' }) +
    `<rect x="0" y="990" width="1000" height="410" fill="${C.ink}"/>
     <rect x="0" y="990" width="1000" height="410" fill="url(#pDotsW)" opacity=".5"/>` +
    [['play', 'Video Courses'], ['live', 'Live Classes'], ['check', 'Test Series'], ['book', 'E-Library']].map(([ic, label], i) => {
      const x = 196 + (i % 2) * 312, y = 1030 + Math.floor(i / 2) * 70;
      return `<rect x="${x}" y="${y}" width="296" height="56" rx="28" fill="#23232E" stroke="#34343F" stroke-width="2"/>
        <circle cx="${x + 28}" cy="${y + 28}" r="19" fill="${C.gold}"/>${icon(ic, x + 28, y + 28, 18, C.ink)}
        ${T(x + 58, y + 36, 22, label, { color: '#fff', weight: 700 })}`;
    }).join('') +
    centeredPill(500, 1180, 52, 'phone', BRAND.phone, { bg: C.gold, fg: C.ink, iconBg: C.ink, iconColor: C.gold }),
};

/* ---------- login / signup: mobile 1200x480 (shown as a short strip above the form) ---------- */

ASSETS.auth_login_mobile = {
  w: 1200, h: 480,
  draw: () => `<rect width="1200" height="480" fill="url(#gInk)"/>
    <rect width="1200" height="480" fill="url(#pDotsW)" opacity=".6"/>
    <circle cx="880" cy="300" r="330" fill="url(#gGlow)" opacity=".5"/>
    ${rings(1180, 40, 160, 3, C.gold, 0.35, 3)}` +
    logoHorizontal(90, 60, 74, true) +
    T(90, 250, 66, 'Welcome back!', { color: '#fff' }) +
    `<text x="90" y="312" font-family="${SANS}" font-weight="700" font-size="34" fill="#C9C9D4">Your success story <tspan fill="${C.gold}">continues here.</tspan></text>` +
    pill(90, 352, 62, 'phone', BRAND.phone, { bg: '#2A2A36', stroke: '#3A3A4A' }) +
    deskScene(890, 150, 1.05, { skin: 'wheat', hair: 'bun', top: C.navyL, pose: 'desk', eyes: 'down', earring: true }, true),
};

ASSETS.auth_signup_mobile = {
  w: 1200, h: 480,
  draw: () => `<rect width="1200" height="480" fill="url(#bgSignM)"/>
    <defs><linearGradient id="bgSignM" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFCF5"/><stop offset="1" stop-color="#FFEBB5"/></linearGradient></defs>
    <rect x="620" y="30" width="160" height="110" fill="url(#pDots)" opacity=".45"/>` +
    logoHorizontal(90, 60, 74) +
    T(90, 250, 62, 'Start your journey', {}) +
    markLine(90, 318, 62, '', 'to success today.') +
    T(90, 396, 30, 'Live Classes · Test Series · E-Library', { weight: 700, color: C.mute }) +
    `<path d="M700 480 C740 280 1160 280 1200 480 Z" fill="url(#gGold)"/>` +
    student(700, 230, 0.95, { skin: 'brown', hair: 'braid', top: C.navy, pose: 'books', mouth: 'open' }) +
    student(950, 230, 0.95, { skin: 'deep', hair: 'curly', top: C.coral, collar: 'hoodie', pose: 'wave', mouth: 'open' }) +
    student(820, 180, 1.05, { skin: 'light', hair: 'long', pose: 'grad', collar: 'gown', top: C.ink, cap: true, mouth: 'open' }),
};

/* ---------- course thumbnail placeholder 800x450 ---------- */

ASSETS.default_thumb = {
  w: 800, h: 450,
  draw: () => `<rect width="800" height="450" fill="url(#bgThumb)"/>
    <defs><linearGradient id="bgThumb" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFCF5"/><stop offset="1" stop-color="#FFEDBA"/></linearGradient></defs>
    <rect x="40" y="40" width="160" height="110" fill="url(#pDots)" opacity=".45"/>
    <circle cx="420" cy="250" r="170" fill="url(#gGold)"/>${rings(420, 250, 210, 3, C.ink, 0.12, 3)}
    <rect x="160" y="356" width="520" height="18" rx="6" fill="${C.ink}"/>` +
    laptopFront(410, 358, 260) + bookStack(560, 356, 120) + plant(200, 358, 110) +
    `<g transform="rotate(-12 620 150)">${gradCap(620, 120, 120)}</g>` +
    formulaChip(90, 230, 'E = mc²', 24, -8) + sparkle(560, 80, 16) + sparkle(250, 120, 10, C.ink) +
    logoHorizontal(40, 394, 40),
};

/* ---------- character test sheet (dev only) ---------- */

ASSETS._sheet = {
  w: 1600, h: 420,
  draw: () => `<rect width="1600" height="420" fill="${C.cream}"/>` +
    student(0, 60, 1, { skin: 'wheat', hair: 'ponytail', top: C.navy, pose: 'books', glasses: true }) +
    student(260, 60, 1, { skin: 'brown', hair: 'short', top: C.gold, topShade: 'rgba(150,90,0,.25)', collar: 'shirt', pose: 'think' }) +
    student(520, 60, 1, { skin: 'light', hair: 'long', top: C.ink, pose: 'grad', collar: 'gown', cap: true, mouth: 'open' }) +
    student(780, 60, 1, { skin: 'deep', hair: 'curly', top: C.coral, collar: 'hoodie', pose: 'wave', mouth: 'open' }) +
    student(1040, 60, 1, { skin: 'wheat', hair: 'bun', top: C.navyL, pose: 'desk', eyes: 'down', earring: true }) +
    `<rect x="1040" y="350" width="260" height="70" fill="${C.ink}"/>` + laptopBack(1170, 356, 150) +
    student(1300, 60, 1, { skin: 'brown', hair: 'braid', top: C.green, pose: 'books', mouth: 'open' }),
};

ASSETS._props = {
  w: 1600, h: 300,
  draw: () => `<rect width="1600" height="300" fill="#fff"/>` + bookStack(40, 260, 160) + openBook(330, 200, 200) +
    laptopFront(560, 260, 200) + deskLamp(700, 260, 200) + plant(900, 260, 160) + mug(1060, 260, 70) +
    sparkle(1180, 80, 24) + infoCard(1220, 40, 330, 96, 'trophy', 'Score 98%', 'Mock Test #12', { bar: 0.98 }) +
    pill(1220, 170, 64, 'phone', BRAND.phone) + formulaChip(1220, 240, 'E = mc²', 22),
};
