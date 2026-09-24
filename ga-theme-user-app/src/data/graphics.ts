/**
 * Pre-composed, high-fidelity SVG graphic images for banners and tournament thumbnails.
 * These are delivered as full graphic images (data URIs) matching the official GameX app.
 */

const toDataUri = (svgString: string): string => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString.trim())}`;
};

// ==========================================
// 1. FULL SLIDER BANNER IMAGES (420 x 170)
// ==========================================

export const BANNER_IMAGE_INSTAGRAM = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 170" width="420" height="170">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14062a"/>
      <stop offset="40%" stop-color="#2a0845"/>
      <stop offset="100%" stop-color="#55086b"/>
    </linearGradient>
    <radialGradient id="glowPurp" cx="90%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#c026d3" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#c026d3" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowCyan" cx="20%" cy="80%" r="40%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="instaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f58529"/>
      <stop offset="30%" stop-color="#dd2a7b"/>
      <stop offset="60%" stop-color="#8134af"/>
      <stop offset="100%" stop-color="#515bd4"/>
    </linearGradient>
    <linearGradient id="jacketYellow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="40%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
    <linearGradient id="hairCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="60%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
    <linearGradient id="gamexGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="420" height="170" rx="16" fill="url(#bgGrad)"/>
  <rect width="420" height="170" rx="16" fill="url(#glowPurp)"/>
  <rect width="420" height="170" rx="16" fill="url(#glowCyan)"/>

  <!-- Subtle Cyber Diagonal Grid Lines -->
  <g stroke="rgba(255,255,255,0.06)" stroke-width="1.5">
    <line x1="200" y1="0" x2="350" y2="170"/>
    <line x1="240" y1="0" x2="390" y2="170"/>
    <line x1="280" y1="0" x2="430" y2="170"/>
    <line x1="320" y1="0" x2="470" y2="170"/>
  </g>

  <!-- CHARACTER ARTWORK (Left side) -->
  <g transform="translate(15, 10)">
    <!-- Back Headphone band -->
    <path d="M 45 42 Q 65 25 85 42" stroke="#334155" stroke-width="7" fill="none"/>
    <path d="M 45 42 Q 65 25 85 42" stroke="#06b6d4" stroke-width="2.5" fill="none"/>

    <!-- Spiky Cyan / Aqua Esports Hair -->
    <path d="M 40 45 L 30 25 L 48 32 L 52 14 L 68 28 L 80 12 L 86 30 L 98 22 L 92 48 Q 104 38 100 56 Q 85 70 70 65 Z" fill="url(#hairCyan)" filter="url(#dropShadow)"/>

    <!-- Head & Skin -->
    <path d="M 48 48 Q 70 42 90 48 L 92 82 Q 70 100 48 82 Z" fill="#fcd34d"/>
    <!-- Intense Anime Eyes -->
    <polygon points="54,58 66,56 64,62 56,62" fill="#0f172a"/>
    <polygon points="56,58 64,57 62,60 58,60" fill="#38bdf8"/>
    <polygon points="76,56 88,58 86,62 78,62" fill="#0f172a"/>
    <polygon points="78,57 86,58 84,60 80,60" fill="#38bdf8"/>

    <!-- Black Tactical Ninja Mouth Mask -->
    <path d="M 46 66 L 94 66 L 86 96 L 70 102 L 54 96 Z" fill="#0f172a"/>
    <path d="M 52 74 L 88 74" stroke="#06b6d4" stroke-width="2"/>
    <path d="M 56 82 L 84 82" stroke="#334155" stroke-width="2"/>

    <!-- Neck Headphones -->
    <rect x="36" y="86" width="16" height="26" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
    <rect x="88" y="86" width="16" height="26" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
    <path d="M 44 100 Q 70 114 96 100" stroke="#0f172a" stroke-width="7" fill="none"/>

    <!-- Yellow / Orange Sports Jacket & Torso -->
    <path d="M 28 114 L 50 96 L 70 104 L 90 96 L 112 114 L 126 160 L 14 160 Z" fill="url(#jacketYellow)" filter="url(#dropShadow)"/>
    <!-- Jacket Black Trim & Zipper -->
    <path d="M 64 102 L 64 160 L 76 160 L 76 102 Z" fill="#0f172a"/>
    <line x1="70" y1="104" x2="70" y2="160" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2"/>
    <!-- Jacket Collar & Details -->
    <path d="M 28 114 L 54 135 L 48 160 L 14 160 Z" fill="#ca8a04"/>
    <path d="M 112 114 L 86 135 L 92 160 L 126 160 Z" fill="#ca8a04"/>
    <!-- Cyber Badge on Shoulder -->
    <circle cx="34" cy="132" r="5" fill="#06b6d4"/>
  </g>

  <!-- BANNER TYPOGRAPHY & GRAPHICS (Right side) -->
  <g transform="translate(170, 22)">
    <!-- Subheading: FOLLOW OUR (Slanted Yellow) -->
    <text x="0" y="16" font-family="'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="15" fill="#facc15" letter-spacing="1.5" filter="url(#dropShadow)">
      FOLLOW OUR
    </text>

    <!-- Main Title: INSTAGRAM PAGE (Slanted White Impact) -->
    <text x="0" y="44" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="34" fill="#ffffff" letter-spacing="1" filter="url(#dropShadow)">
      INSTAGRAM PAGE
    </text>

    <!-- Red Ribbon Badge: FOR GIVEAWAYS! -->
    <g transform="translate(0, 52)">
      <polygon points="0,0 134,0 128,21 0,21" fill="#e11d48" filter="url(#dropShadow)"/>
      <text x="10" y="15" font-family="'Chakra Petch', sans-serif" font-weight="900" font-style="italic" font-size="11" fill="#ffffff" letter-spacing="1.2">
        FOR GIVEAWAYS!
      </text>
    </g>

    <!-- Middle Row: GameX Logo + Curved Arrow + Instagram Icon -->
    <g transform="translate(0, 84)">
      <!-- GameX Logo -->
      <g transform="translate(0, 4)">
        <polygon points="0,8 14,0 14,16" fill="#facc15"/>
        <text x="18" y="15" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="18" fill="url(#gamexGrad)" letter-spacing="0.5">
          Game<tspan fill="#06b6d4">X</tspan>
        </text>
        <text x="20" y="24" font-family="'Chakra Petch', sans-serif" font-weight="700" font-size="7" fill="#94a3b8" letter-spacing="3">
          ESPORTS
        </text>
      </g>

      <!-- Curved Arrow pointing right-down -->
      <g transform="translate(100, -2)">
        <path d="M 0 16 Q 22 2 44 14" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 38 7 L 46 14 L 38 20" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Official Instagram App Icon (Rounded Gradient + Camera) -->
      <g transform="translate(170, -8)" filter="url(#dropShadow)">
        <rect width="44" height="44" rx="11" fill="url(#instaGrad)"/>
        <rect x="9" y="9" width="26" height="26" rx="7" fill="none" stroke="#ffffff" stroke-width="3"/>
        <circle cx="22" cy="22" r="6" fill="none" stroke="#ffffff" stroke-width="3"/>
        <circle cx="28.5" cy="15.5" r="1.8" fill="#ffffff"/>
      </g>
    </g>
  </g>
</svg>
`);

export const BANNER_IMAGE_TOURNAMENT = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 170" width="420" height="170">
  <defs>
    <linearGradient id="bgTourney" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081b33"/>
      <stop offset="40%" stop-color="#0f2b4c"/>
      <stop offset="100%" stop-color="#194775"/>
    </linearGradient>
    <filter id="sh1">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.8"/>
    </filter>
  </defs>
  <rect width="420" height="170" rx="16" fill="url(#bgTourney)"/>
  <circle cx="360" cy="40" r="80" fill="#0284c7" opacity="0.25"/>
  <circle cx="60" cy="140" r="60" fill="#38bdf8" opacity="0.2"/>

  <!-- Character / Trophy Graphic on Left -->
  <g transform="translate(25, 20)">
    <circle cx="55" cy="65" r="50" fill="#0369a1" opacity="0.4"/>
    <path d="M 30 40 L 80 40 L 75 75 Q 55 95 35 75 Z" fill="#fbbf24" filter="url(#sh1)"/>
    <path d="M 22 45 Q 12 58 28 64 L 30 55" fill="none" stroke="#f59e0b" stroke-width="4"/>
    <path d="M 88 45 Q 98 58 82 64 L 80 55" fill="none" stroke="#f59e0b" stroke-width="4"/>
    <rect x="48" y="86" width="14" height="22" fill="#d97706"/>
    <polygon points="34,120 76,120 70,108 40,108" fill="#b45309"/>
    <polygon points="55,48 59,58 70,58 61,64 64,74 55,68 46,74 49,64 40,58 51,58" fill="#ffffff"/>
  </g>

  <!-- Typography on Right -->
  <g transform="translate(160, 24)">
    <text x="0" y="16" font-family="'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="14" fill="#38bdf8" letter-spacing="1.5">
      MEGA TOURNAMENT
    </text>
    <text x="0" y="44" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="34" fill="#ffffff" letter-spacing="1" filter="url(#sh1)">
      ₹10,000 PRIZE POOL
    </text>
    <polygon points="0,52 105,52 98,72 0,72" fill="#0284c7" filter="url(#sh1)"/>
    <text x="12" y="66" font-family="'Chakra Petch', sans-serif" font-weight="900" font-style="italic" font-size="11" fill="#ffffff">
      JOIN TODAY!
    </text>
    <g transform="translate(0, 88)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="18" fill="#ffffff">
        Game<tspan fill="#38bdf8">X</tspan>
      </text>
      <text x="2" y="25" font-family="'Chakra Petch', sans-serif" font-weight="700" font-size="7" fill="#94a3b8" letter-spacing="3">
        OFFICIAL LEAGUE
      </text>
    </g>
  </g>
</svg>
`);

export const BANNER_IMAGE_CLASH = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 170" width="420" height="170">
  <defs>
    <linearGradient id="bgClash" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a0815"/>
      <stop offset="40%" stop-color="#4a0f26"/>
      <stop offset="100%" stop-color="#701a3d"/>
    </linearGradient>
  </defs>
  <rect width="420" height="170" rx="16" fill="url(#bgClash)"/>
  <circle cx="360" cy="40" r="80" fill="#f43f5e" opacity="0.25"/>

  <!-- Crossed Swords on Left -->
  <g transform="translate(35, 30)">
    <line x1="20" y1="20" x2="80" y2="80" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round"/>
    <line x1="80" y1="20" x2="20" y2="80" stroke="#e2e8f0" stroke-width="6" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="16" fill="#e11d48"/>
    <polygon points="50,40 53,47 60,47 54,52 56,59 50,55 44,59 46,52 40,47 47,47" fill="#fff"/>
  </g>

  <!-- Typography -->
  <g transform="translate(160, 24)">
    <text x="0" y="16" font-family="'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="14" fill="#f43f5e" letter-spacing="1.5">
      DAILY CLASH SQUAD
    </text>
    <text x="0" y="44" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="34" fill="#ffffff" letter-spacing="1">
      1V1 &amp; 4V4 KNOCKOUT
    </text>
    <polygon points="0,52 110,52 102,72 0,72" fill="#e11d48"/>
    <text x="12" y="66" font-family="'Chakra Petch', sans-serif" font-weight="900" font-style="italic" font-size="11" fill="#ffffff">
      INSTANT CASH!
    </text>
    <g transform="translate(0, 88)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="18" fill="#ffffff">
        Game<tspan fill="#f43f5e">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);

export const BANNER_IMAGE_REFER = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 170" width="420" height="170">
  <defs>
    <linearGradient id="bgRefer" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06241a"/>
      <stop offset="40%" stop-color="#0d3b2c"/>
      <stop offset="100%" stop-color="#14533e"/>
    </linearGradient>
  </defs>
  <rect width="420" height="170" rx="16" fill="url(#bgRefer)"/>
  <!-- Gift Box graphic -->
  <g transform="translate(45, 30)">
    <rect x="15" y="35" width="60" height="50" rx="6" fill="#10b981"/>
    <rect x="10" y="25" width="70" height="15" rx="4" fill="#34d399"/>
    <rect x="40" y="25" width="10" height="60" fill="#facc15"/>
    <circle cx="38" cy="18" r="8" fill="none" stroke="#facc15" stroke-width="4"/>
    <circle cx="52" cy="18" r="8" fill="none" stroke="#facc15" stroke-width="4"/>
  </g>
  <g transform="translate(160, 24)">
    <text x="0" y="16" font-family="'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="14" fill="#34d399" letter-spacing="1.5">
      INVITE &amp; EARN
    </text>
    <text x="0" y="44" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="34" fill="#ffffff" letter-spacing="1">
      GET ₹50 PER FRIEND
    </text>
    <polygon points="0,52 115,52 107,72 0,72" fill="#059669"/>
    <text x="12" y="66" font-family="'Chakra Petch', sans-serif" font-weight="900" font-style="italic" font-size="11" fill="#ffffff">
      UNLIMITED CASH!
    </text>
    <g transform="translate(0, 88)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="18" fill="#ffffff">
        Game<tspan fill="#34d399">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);

export const BANNER_IMAGE_LONEWOLF = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 170" width="420" height="170">
  <defs>
    <linearGradient id="bgWolf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#23093b"/>
      <stop offset="50%" stop-color="#3b1262"/>
      <stop offset="100%" stop-color="#591b92"/>
    </linearGradient>
  </defs>
  <rect width="420" height="170" rx="16" fill="url(#bgWolf)"/>
  <circle cx="70" cy="70" r="45" fill="#a855f7" opacity="0.3"/>
  <!-- Target crosshair -->
  <g transform="translate(30, 25)">
    <circle cx="45" cy="45" r="32" fill="none" stroke="#c084fc" stroke-width="4"/>
    <circle cx="45" cy="45" r="18" fill="none" stroke="#c084fc" stroke-width="2"/>
    <line x1="45" y1="5" x2="45" y2="85" stroke="#c084fc" stroke-width="2"/>
    <line x1="5" y1="45" x2="85" y2="45" stroke="#c084fc" stroke-width="2"/>
  </g>
  <g transform="translate(160, 24)">
    <text x="0" y="16" font-family="'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="14" fill="#c084fc" letter-spacing="1.5">
      LONE WOLF DUEL
    </text>
    <text x="0" y="44" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="34" fill="#ffffff" letter-spacing="1">
      2X PER KILL BONUS
    </text>
    <polygon points="0,52 115,52 107,72 0,72" fill="#9333ea"/>
    <text x="12" y="66" font-family="'Chakra Petch', sans-serif" font-weight="900" font-style="italic" font-size="11" fill="#ffffff">
      FAST CASHOUT!
    </text>
    <g transform="translate(0, 88)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="18" fill="#ffffff">
        Game<tspan fill="#c084fc">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);

export const BANNER_IMAGE_SURVIVAL = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 170" width="420" height="170">
  <defs>
    <linearGradient id="bgSurv" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a1205"/>
      <stop offset="50%" stop-color="#4d2209"/>
      <stop offset="100%" stop-color="#74340d"/>
    </linearGradient>
  </defs>
  <rect width="420" height="170" rx="16" fill="url(#bgSurv)"/>
  <!-- Flame emblem on left -->
  <g transform="translate(45, 30)">
    <path d="M 40 10 Q 55 35 48 50 Q 65 30 65 55 Q 65 85 40 85 Q 15 85 15 55 Q 15 35 40 10 Z" fill="#ea580c"/>
    <path d="M 40 35 Q 50 50 45 60 Q 55 45 55 65 Q 55 80 40 80 Q 25 80 25 65 Q 25 50 40 35 Z" fill="#facc15"/>
  </g>
  <g transform="translate(160, 24)">
    <text x="0" y="16" font-family="'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="14" fill="#fb923c" letter-spacing="1.5">
      WEEKEND SURVIVAL
    </text>
    <text x="0" y="44" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="34" fill="#ffffff" letter-spacing="1">
      ZERO ENTRY FEE
    </text>
    <polygon points="0,52 110,52 102,72 0,72" fill="#ea580c"/>
    <text x="12" y="66" font-family="'Chakra Petch', sans-serif" font-weight="900" font-style="italic" font-size="11" fill="#ffffff">
      LIMITED SLOTS!
    </text>
    <g transform="translate(0, 88)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="18" fill="#ffffff">
        Game<tspan fill="#fb923c">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);

// ==========================================
// 2. FULL ESPORTS TOURNAMENT THUMBNAIL IMAGES (260 x 130)
// Complete graphic banners containing Free Fire character, badge, title, subtitle & GameX logo
// ==========================================

export const TOURNAMENT_THUMB_BR_FULL_MAP = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130" width="260" height="130">
  <defs>
    <linearGradient id="brBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#180b03"/>
      <stop offset="40%" stop-color="#2d1405"/>
      <stop offset="100%" stop-color="#4d2208"/>
    </linearGradient>
    <radialGradient id="brGlow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#ea580c" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#ea580c" stop-opacity="0"/>
    </radialGradient>
    <filter id="brDrop">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="260" height="130" fill="url(#brBg)"/>
  <rect width="260" height="130" fill="url(#brGlow)"/>

  <!-- Angled energetic battle speedlines -->
  <g stroke="rgba(234,88,12,0.15)" stroke-width="2">
    <line x1="80" y1="0" x2="150" y2="130"/>
    <line x1="110" y1="0" x2="180" y2="130"/>
    <line x1="140" y1="0" x2="210" y2="130"/>
  </g>

  <!-- CHARACTER: Free Fire Bandana Warrior (Left) -->
  <g transform="translate(10, 15)">
    <!-- Spiky Hair -->
    <path d="M 22 28 L 12 15 L 28 20 L 32 6 L 44 18 L 54 8 L 56 22 L 66 16 L 60 32 Z" fill="#1e293b"/>
    <!-- Face -->
    <path d="M 26 28 Q 42 24 58 28 L 60 52 Q 42 66 24 52 Z" fill="#fcd34d"/>
    <!-- Bandana / Tactical Mask (Red/Orange) -->
    <polygon points="22,42 62,42 54,64 42,72 30,64" fill="#ea580c"/>
    <!-- Intense Eyes -->
    <line x1="30" y1="36" x2="38" y2="36" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="46" y1="36" x2="54" y2="36" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Combat Jacket & Armor -->
    <path d="M 10 74 L 28 60 L 42 66 L 56 60 L 74 74 L 84 120 L 0 120 Z" fill="#334155" filter="url(#brDrop)"/>
    <rect x="36" y="66" width="12" height="54" fill="#0f172a"/>
    <line x1="42" y1="66" x2="42" y2="120" stroke="#f97316" stroke-width="2"/>
    <rect x="22" y="80" width="10" height="24" rx="2" fill="#ea580c"/>
  </g>

  <!-- FREE FIRE MAX BADGE (Top-Right) -->
  <g transform="translate(160, 8)" filter="url(#brDrop)">
    <rect width="92" height="19" rx="3" fill="#0a0a0a" stroke="#ca8a04" stroke-width="1"/>
    <text x="6" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff" letter-spacing="0.5">
      FREE FIRE
    </text>
    <rect x="62" y="2.5" width="26" height="14" rx="2" fill="#ea580c"/>
    <text x="66" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      MAX
    </text>
  </g>

  <!-- TOURNAMENT TYPOGRAPHY (Right-aligned) -->
  <g transform="translate(252, 42)" text-anchor="end">
    <!-- Title: BR FULL MAP -->
    <text x="0" y="24" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="28" fill="#ffffff" letter-spacing="0.5" filter="url(#brDrop)">
      BR FULL MAP
    </text>
    <!-- Subtitle: TOURNAMENT -->
    <text x="0" y="46" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="24" fill="#facc15" letter-spacing="1" filter="url(#brDrop)">
      TOURNAMENT
    </text>

    <!-- GameX Logo -->
    <g transform="translate(0, 56)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" filter="url(#brDrop)">
        Game<tspan fill="#f97316">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);

export const TOURNAMENT_THUMB_CS_1V1 = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130" width="260" height="130">
  <defs>
    <linearGradient id="csBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041824"/>
      <stop offset="40%" stop-color="#07293d"/>
      <stop offset="100%" stop-color="#0a3e5c"/>
    </linearGradient>
    <radialGradient id="csGlow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <filter id="csDrop">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <rect width="260" height="130" fill="url(#csBg)"/>
  <rect width="260" height="130" fill="url(#csGlow)"/>

  <g stroke="rgba(6,182,212,0.15)" stroke-width="2">
    <line x1="80" y1="0" x2="150" y2="130"/>
    <line x1="110" y1="0" x2="180" y2="130"/>
    <line x1="140" y1="0" x2="210" y2="130"/>
  </g>

  <!-- CHARACTER: Free Fire Cowboy / Hat Gunslinger (Left) -->
  <g transform="translate(10, 15)">
    <!-- Cowboy Hat -->
    <path d="M 12 30 Q 42 16 72 30 L 64 30 Q 42 10 20 30 Z" fill="#0f172a" filter="url(#csDrop)"/>
    <ellipse cx="42" cy="28" rx="20" ry="8" fill="#1e293b"/>
    <rect x="32" y="16" width="20" height="12" rx="4" fill="#0f172a"/>
    <!-- Face -->
    <path d="M 26 32 Q 42 28 58 32 L 58 54 Q 42 66 26 54 Z" fill="#fed7aa"/>
    <!-- Eye patch / Beard -->
    <path d="M 30 52 Q 42 62 54 52" stroke="#0f172a" stroke-width="3" fill="none"/>
    <line x1="30" y1="38" x2="38" y2="38" stroke="#06b6d4" stroke-width="2.5"/>
    <line x1="46" y1="38" x2="54" y2="38" stroke="#0f172a" stroke-width="2.5"/>
    <!-- Blue Coat & Duster -->
    <path d="M 10 74 L 28 60 L 42 66 L 56 60 L 74 74 L 84 120 L 0 120 Z" fill="#0284c7" filter="url(#csDrop)"/>
    <path d="M 28 60 L 42 80 L 56 60 Z" fill="#0c4a6e"/>
  </g>

  <!-- FREE FIRE MAX BADGE -->
  <g transform="translate(160, 8)" filter="url(#csDrop)">
    <rect width="92" height="19" rx="3" fill="#0a0a0a" stroke="#ca8a04" stroke-width="1"/>
    <text x="6" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff" letter-spacing="0.5">
      FREE FIRE
    </text>
    <rect x="62" y="2.5" width="26" height="14" rx="2" fill="#ea580c"/>
    <text x="66" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      MAX
    </text>
  </g>

  <!-- TYPOGRAPHY -->
  <g transform="translate(252, 42)" text-anchor="end">
    <text x="0" y="24" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="28" fill="#ffffff" letter-spacing="0.5" filter="url(#csDrop)">
      CLASH SQUAD 1V1
    </text>
    <text x="0" y="46" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="24" fill="#facc15" letter-spacing="1" filter="url(#csDrop)">
      TOURNAMENT
    </text>
    <g transform="translate(0, 56)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" filter="url(#csDrop)">
        Game<tspan fill="#06b6d4">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);

export const TOURNAMENT_THUMB_SOLO_SURVIVAL = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130" width="260" height="130">
  <defs>
    <linearGradient id="soloBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1f0e02"/>
      <stop offset="40%" stop-color="#3b1b05"/>
      <stop offset="100%" stop-color="#5c2908"/>
    </linearGradient>
    <radialGradient id="soloGlow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <filter id="soloDrop">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <rect width="260" height="130" fill="url(#soloBg)"/>
  <rect width="260" height="130" fill="url(#soloGlow)"/>

  <!-- Character: Cyber Cyborg Warrior (Left) -->
  <g transform="translate(10, 15)">
    <path d="M 22 28 L 12 15 L 28 20 L 32 6 L 44 18 L 54 8 L 56 22 L 66 16 L 60 32 Z" fill="#d97706"/>
    <path d="M 26 28 Q 42 24 58 28 L 60 52 Q 42 66 26 52 Z" fill="#fed7aa"/>
    <path d="M 22 36 L 42 36 L 40 46 L 24 46 Z" fill="#0f172a"/>
    <circle cx="32" cy="41" r="3" fill="#ef4444"/>
    <line x1="46" y1="41" x2="54" y2="41" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 10 74 L 28 60 L 42 66 L 56 60 L 74 74 L 84 120 L 0 120 Z" fill="#78350f" filter="url(#soloDrop)"/>
  </g>

  <!-- FREE FIRE MAX BADGE -->
  <g transform="translate(160, 8)" filter="url(#soloDrop)">
    <rect width="92" height="19" rx="3" fill="#0a0a0a" stroke="#ca8a04" stroke-width="1"/>
    <text x="6" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      FREE FIRE
    </text>
    <rect x="62" y="2.5" width="26" height="14" rx="2" fill="#ea580c"/>
    <text x="66" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      MAX
    </text>
  </g>

  <!-- TYPOGRAPHY -->
  <g transform="translate(252, 42)" text-anchor="end">
    <text x="0" y="24" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="28" fill="#ffffff" letter-spacing="0.5" filter="url(#soloDrop)">
      SOLO SURVIVAL
    </text>
    <text x="0" y="46" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="24" fill="#facc15" letter-spacing="1" filter="url(#soloDrop)">
      TOURNAMENT
    </text>
    <g transform="translate(0, 56)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" filter="url(#soloDrop)">
        Game<tspan fill="#f59e0b">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);

export const TOURNAMENT_THUMB_LONE_WOLF = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130" width="260" height="130">
  <defs>
    <linearGradient id="lwBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140626"/>
      <stop offset="40%" stop-color="#2a0a4c"/>
      <stop offset="100%" stop-color="#44107a"/>
    </linearGradient>
    <radialGradient id="lwGlow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
    <filter id="lwDrop">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <rect width="260" height="130" fill="url(#lwBg)"/>
  <rect width="260" height="130" fill="url(#lwGlow)"/>

  <!-- Character: Ninja Assassin (Left) -->
  <g transform="translate(10, 15)">
    <!-- Ninja Hood -->
    <path d="M 20 20 Q 42 6 64 20 L 68 56 Q 42 70 16 56 Z" fill="#1e1b4b"/>
    <!-- Ninja Mask with glowing purple eyes -->
    <rect x="24" y="34" width="36" height="14" rx="3" fill="#0f172a"/>
    <ellipse cx="34" cy="41" rx="4" ry="2" fill="#c084fc"/>
    <ellipse cx="50" cy="41" rx="4" ry="2" fill="#c084fc"/>
    <!-- Ninja Robes -->
    <path d="M 10 74 L 28 60 L 42 66 L 56 60 L 74 74 L 84 120 L 0 120 Z" fill="#581c87" filter="url(#lwDrop)"/>
    <line x1="20" y1="70" x2="64" y2="114" stroke="#c084fc" stroke-width="2.5"/>
  </g>

  <!-- FREE FIRE MAX BADGE -->
  <g transform="translate(160, 8)" filter="url(#lwDrop)">
    <rect width="92" height="19" rx="3" fill="#0a0a0a" stroke="#ca8a04" stroke-width="1"/>
    <text x="6" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      FREE FIRE
    </text>
    <rect x="62" y="2.5" width="26" height="14" rx="2" fill="#ea580c"/>
    <text x="66" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      MAX
    </text>
  </g>

  <!-- TYPOGRAPHY -->
  <g transform="translate(252, 42)" text-anchor="end">
    <text x="0" y="24" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="28" fill="#ffffff" letter-spacing="0.5" filter="url(#lwDrop)">
      LONE WOLF 1V1
    </text>
    <text x="0" y="46" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="24" fill="#facc15" letter-spacing="1" filter="url(#lwDrop)">
      TOURNAMENT
    </text>
    <g transform="translate(0, 56)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" filter="url(#lwDrop)">
        Game<tspan fill="#c084fc">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);

export const TOURNAMENT_THUMB_SOLO_SURVIVAL_2 = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130" width="260" height="130">
  <defs>
    <linearGradient id="s2Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041a21"/>
      <stop offset="40%" stop-color="#09303d"/>
      <stop offset="100%" stop-color="#0e4b5e"/>
    </linearGradient>
    <radialGradient id="s2Glow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#14b8a6" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#14b8a6" stop-opacity="0"/>
    </radialGradient>
    <filter id="s2Drop">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <rect width="260" height="130" fill="url(#s2Bg)"/>
  <rect width="260" height="130" fill="url(#s2Glow)"/>

  <!-- Character: Rebel with Cap (Left) -->
  <g transform="translate(10, 15)">
    <!-- Backwards Cap -->
    <path d="M 22 24 Q 42 14 62 24 L 64 36 L 20 36 Z" fill="#0f766e"/>
    <rect x="14" y="32" width="16" height="5" rx="2" fill="#115e59"/>
    <!-- Face -->
    <path d="M 24 34 Q 42 30 60 34 L 60 54 Q 42 66 24 54 Z" fill="#fed7aa"/>
    <line x1="30" y1="42" x2="38" y2="42" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="46" y1="42" x2="54" y2="42" stroke="#0f172a" stroke-width="2.5"/>
    <path d="M 10 74 L 28 60 L 42 66 L 56 60 L 74 74 L 84 120 L 0 120 Z" fill="#134e4a" filter="url(#s2Drop)"/>
  </g>

  <!-- FREE FIRE MAX BADGE -->
  <g transform="translate(160, 8)" filter="url(#s2Drop)">
    <rect width="92" height="19" rx="3" fill="#0a0a0a" stroke="#ca8a04" stroke-width="1"/>
    <text x="6" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      FREE FIRE
    </text>
    <rect x="62" y="2.5" width="26" height="14" rx="2" fill="#ea580c"/>
    <text x="66" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      MAX
    </text>
  </g>

  <!-- TYPOGRAPHY -->
  <g transform="translate(252, 42)" text-anchor="end">
    <text x="0" y="24" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="28" fill="#ffffff" letter-spacing="0.5" filter="url(#s2Drop)">
      SOLO SURVIVAL 2
    </text>
    <text x="0" y="46" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="24" fill="#facc15" letter-spacing="1" filter="url(#s2Drop)">
      TOURNAMENT
    </text>
    <g transform="translate(0, 56)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" filter="url(#s2Drop)">
        Game<tspan fill="#2dd4bf">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);

export const TOURNAMENT_THUMB_CS_4V4 = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130" width="260" height="130">
  <defs>
    <linearGradient id="cs4Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#240409"/>
      <stop offset="40%" stop-color="#420811"/>
      <stop offset="100%" stop-color="#690e1c"/>
    </linearGradient>
    <radialGradient id="cs4Glow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#f43f5e" stop-opacity="0"/>
    </radialGradient>
    <filter id="cs4Drop">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.9"/>
    </filter>
  </defs>

  <rect width="260" height="130" fill="url(#cs4Bg)"/>
  <rect width="260" height="130" fill="url(#cs4Glow)"/>

  <!-- Character: Skull Mask Warrior (Left) -->
  <g transform="translate(10, 15)">
    <!-- Helmet & Skull Face -->
    <path d="M 22 22 Q 42 10 62 22 L 64 54 Q 42 68 20 54 Z" fill="#0f172a"/>
    <!-- Skull Facepaint/Mask -->
    <path d="M 28 36 Q 42 30 56 36 L 54 52 Q 42 62 30 52 Z" fill="#e2e8f0"/>
    <!-- Black eye sockets -->
    <circle cx="36" cy="42" r="4.5" fill="#b91c1c"/>
    <circle cx="48" cy="42" r="4.5" fill="#b91c1c"/>
    <polygon points="42,48 40,54 44,54" fill="#0f172a"/>
    <!-- Tactical Jacket -->
    <path d="M 10 74 L 28 60 L 42 66 L 56 60 L 74 74 L 84 120 L 0 120 Z" fill="#881337" filter="url(#cs4Drop)"/>
  </g>

  <!-- FREE FIRE MAX BADGE -->
  <g transform="translate(160, 8)" filter="url(#cs4Drop)">
    <rect width="92" height="19" rx="3" fill="#0a0a0a" stroke="#ca8a04" stroke-width="1"/>
    <text x="6" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      FREE FIRE
    </text>
    <rect x="62" y="2.5" width="26" height="14" rx="2" fill="#ea580c"/>
    <text x="66" y="13" font-family="'Chakra Petch', sans-serif" font-weight="900" font-size="8.5" fill="#ffffff">
      MAX
    </text>
  </g>

  <!-- TYPOGRAPHY -->
  <g transform="translate(252, 42)" text-anchor="end">
    <text x="0" y="24" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="28" fill="#ffffff" letter-spacing="0.5" filter="url(#cs4Drop)">
      CLASH SQUAD 4V4
    </text>
    <text x="0" y="46" font-family="'Teko', 'Chakra Petch', sans-serif" font-weight="800" font-style="italic" font-size="24" fill="#facc15" letter-spacing="1" filter="url(#cs4Drop)">
      TOURNAMENT
    </text>
    <g transform="translate(0, 56)">
      <text x="0" y="16" font-family="'Orbitron', 'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" filter="url(#cs4Drop)">
        Game<tspan fill="#f43f5e">X</tspan>
      </text>
    </g>
  </g>
</svg>
`);
