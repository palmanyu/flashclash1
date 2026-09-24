import React from 'react';

export interface ContestBannerGraphicProps {
  bannerType?: 'solo-br' | 'duo-br' | 'squad-br' | 'cs-1v1' | 'lone-wolf' | 'free-match';
  customTitle?: string;
  customSubtitle?: string;
  imageUrl?: string;
}

export const OFFICIAL_CONTEST_THUMBNAIL =
  'https://fs.digicroz.com/gamex-bucket/gaming-app/media/contest-thumbnail.e9260761.jpg';

export const ContestBannerGraphic: React.FC<ContestBannerGraphicProps> = ({
  bannerType = 'solo-br',
  customTitle,
  customSubtitle = 'TOURNAMENT',
  imageUrl = OFFICIAL_CONTEST_THUMBNAIL,
}) => {
  if (imageUrl) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden select-none bg-slate-950">
        <img
          src={imageUrl}
          alt={customTitle || 'Contest Thumbnail'}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  const isDuo = bannerType === 'duo-br';
  const isCs = bannerType === 'cs-1v1';
  const isLoneWolf = bannerType === 'lone-wolf';

  const titleText = customTitle || (isDuo ? 'DUO BR FULL MAP' : isCs ? 'CLASH SQUAD 1V1' : isLoneWolf ? 'LONE WOLF 1V1' : 'SOLO BR FULL MAP');

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden select-none bg-slate-950">
      <svg
        viewBox="0 0 356 200"
        className="w-full h-full object-cover block"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Theme Gradients */}
          {isDuo ? (
            <>
              <linearGradient id="duoBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#041426" />
                <stop offset="40%" stopColor="#082b4a" />
                <stop offset="80%" stopColor="#0a3d69" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <radialGradient id="duoGlow" cx="25%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
            </>
          ) : isCs ? (
            <>
              <linearGradient id="csBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#25050b" />
                <stop offset="45%" stopColor="#450a16" />
                <stop offset="85%" stopColor="#690e22" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
              <radialGradient id="csGlow" cx="25%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
              </radialGradient>
            </>
          ) : isLoneWolf ? (
            <>
              <linearGradient id="lwBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#180429" />
                <stop offset="45%" stopColor="#300952" />
                <stop offset="85%" stopColor="#4c127d" />
                <stop offset="100%" stopColor="#6b21a8" />
              </linearGradient>
              <radialGradient id="lwGlow" cx="25%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
              </radialGradient>
            </>
          ) : (
            <>
              <linearGradient id="soloBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e0b02" />
                <stop offset="35%" stopColor="#3b1604" />
                <stop offset="70%" stopColor="#632608" />
                <stop offset="100%" stopColor="#a13e0b" />
              </linearGradient>
              <radialGradient id="soloGlow" cx="25%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
              </radialGradient>
            </>
          )}

          {/* 3D Text Shadow */}
          <filter id="tourneyShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.95" />
          </filter>
          <filter id="rulesShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. Background Fill */}
        <rect
          width="420"
          height="200"
          fill={isDuo ? 'url(#duoBg)' : isCs ? 'url(#csBg)' : isLoneWolf ? 'url(#lwBg)' : 'url(#soloBg)'}
        />
        <rect
          width="420"
          height="200"
          fill={isDuo ? 'url(#duoGlow)' : isCs ? 'url(#csGlow)' : isLoneWolf ? 'url(#lwGlow)' : 'url(#soloGlow)'}
        />

        {/* Dynamic Speedlines and energy sparks */}
        <g opacity="0.25" stroke={isDuo ? '#38bdf8' : isCs ? '#fb7185' : isLoneWolf ? '#e879f9' : '#fde047'} strokeWidth="1.5">
          <line x1="120" y1="0" x2="200" y2="200" />
          <line x1="160" y1="0" x2="240" y2="200" />
          <line x1="220" y1="0" x2="300" y2="200" />
        </g>

        {/* 2. Character Artwork (Left Side) */}
        {!isDuo ? (
          /* Solo Bearded Character in Hawaiian/Combat shirt & sunglasses with Safari Hat */
          <g transform="translate(10, 20)">
            {/* Ambient Aura */}
            <circle cx="95" cy="85" r="70" fill="#ea580c" opacity="0.25" />

            {/* Shoulders / Red Combat Shirt with collar */}
            <path
              d="M 20 185 L 50 120 L 70 115 L 95 130 L 120 115 L 140 120 L 175 185 Z"
              fill="#dc2626"
            />
            {/* Hawaiian Gold Pattern Accents on Shirt */}
            <path d="M 35 150 L 55 170 M 140 150 L 160 170" stroke="#fef08a" strokeWidth="3" opacity="0.6" />
            <path d="M 45 130 Q 55 145 40 160" stroke="#ca8a04" strokeWidth="2.5" fill="none" opacity="0.8" />
            <path d="M 145 130 Q 135 145 150 160" stroke="#ca8a04" strokeWidth="2.5" fill="none" opacity="0.8" />

            {/* Exposed Chest skin with Gold Chain */}
            <polygon points="70,115 120,115 95,150" fill="#fbcfe8" opacity="0.2" />
            <polygon points="70,115 120,115 95,145" fill="#fed7aa" />
            <path d="M 75 120 Q 95 152 115 120" fill="none" stroke="#facc15" strokeWidth="3.5" filter="url(#tourneyShadow)" />

            {/* Neck */}
            <rect x="80" y="98" width="30" height="24" rx="4" fill="#fed7aa" />

            {/* Full White Beard & Mustache (Lush free fire beard) */}
            <path
              d="M 58 75 C 50 105 60 138 95 140 C 130 138 140 105 132 75 C 122 88 110 92 95 92 C 80 92 68 88 58 75 Z"
              fill="#f8fafc"
              filter="url(#tourneyShadow)"
            />
            {/* Beard texture strands */}
            <path d="M 80 100 Q 95 135 95 138 M 70 95 Q 85 125 90 135 M 120 95 Q 105 125 100 135" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />

            {/* Face / Cheeks */}
            <path d="M 64 60 C 64 45 126 45 126 60 C 126 78 64 78 64 60 Z" fill="#fed7aa" />

            {/* Aviator Sunglasses (Black mirror with silver frame) */}
            <g filter="url(#tourneyShadow)">
              <rect x="68" y="58" width="24" height="17" rx="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
              <rect x="98" y="58" width="24" height="17" rx="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="92" y1="64" x2="98" y2="64" stroke="#cbd5e1" strokeWidth="2" />
              {/* Glasses Glare */}
              <line x1="72" y1="60" x2="80" y2="72" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
              <line x1="102" y1="60" x2="110" y2="72" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
            </g>

            {/* Safari Explorer Hat with Goggles on Crown */}
            <g filter="url(#tourneyShadow)">
              {/* Hat Crown */}
              <path d="M 65 52 C 65 24 125 24 125 52 Z" fill="#eab308" />
              <path d="M 68 50 C 68 28 122 28 122 50 Z" fill="#ca8a04" />
              {/* Hat Band */}
              <rect x="63" y="48" width="64" height="6" rx="1" fill="#78350f" />
              {/* Goggles strapped on hat */}
              <rect x="74" y="36" width="18" height="12" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="98" y="36" width="18" height="12" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="92" y1="42" x2="98" y2="42" stroke="#38bdf8" strokeWidth="2" />
              {/* Wide Hat Brim */}
              <ellipse cx="95" cy="54" rx="45" ry="12" fill="#ca8a04" />
              <ellipse cx="95" cy="53" rx="43" ry="10" fill="#facc15" />
            </g>
          </g>
        ) : (
          /* Duo Characters: Cyber Ninja + Spiky Red Warrior */
          <g transform="translate(5, 20)">
            {/* Duo Aura */}
            <circle cx="85" cy="85" r="70" fill="#06b6d4" opacity="0.25" />

            {/* Warrior 1 (Left - Blue/Silver Hair with Mask) */}
            <g transform="translate(10, 10)">
              {/* Spiky Silver Hair */}
              <path d="M 28 40 L 18 20 L 34 25 L 42 6 L 56 22 L 68 12 L 72 30 L 80 25 L 75 48 Z" fill="#93c5fd" />
              {/* Face & Mask */}
              <path d="M 32 38 Q 50 32 68 38 L 70 70 Q 50 82 30 70 Z" fill="#fed7aa" />
              {/* Black Ninja Mask */}
              <path d="M 30 48 Q 50 56 70 48 L 68 76 Q 50 88 32 76 Z" fill="#0f172a" />
              {/* Eyes */}
              <line x1="38" y1="42" x2="48" y2="42" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="56" y1="42" x2="66" y2="42" stroke="#0f172a" strokeWidth="2.5" />
              {/* Blue neon ear cuff */}
              <circle cx="70" cy="52" r="3" fill="#00f2fe" />
              {/* Tactical Body Vest */}
              <path d="M 16 80 L 32 68 L 50 72 L 68 68 L 84 80 L 92 145 L 6 145 Z" fill="#1e293b" />
              <path d="M 28 80 L 40 145 M 70 80 L 60 145" stroke="#06b6d4" strokeWidth="3" />
            </g>

            {/* Warrior 2 (Right - Red/White Hair with Gold Tattoo and Gun) */}
            <g transform="translate(68, 15)">
              {/* Red Spiky Hair */}
              <path d="M 25 35 L 15 15 L 32 20 L 40 4 L 52 18 L 65 8 L 68 28 L 78 22 L 72 45 Z" fill="#ef4444" />
              <path d="M 38 12 L 48 4 L 58 18" fill="#f8fafc" />
              {/* Face */}
              <path d="M 28 35 Q 45 30 62 35 L 64 65 Q 45 78 26 65 Z" fill="#fdba74" />
              {/* Gold Tattoo Bandana Mask */}
              <polygon points="26,48 64,48 58,74 45,82 32,74" fill="#ca8a04" />
              <path d="M 35 56 L 45 68 L 55 56" stroke="#000000" strokeWidth="2" fill="none" />
              {/* Headset / Comm */}
              <rect x="62" y="44" width="8" height="12" rx="3" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
              {/* Bare Chest with Dragon/Tiger Gold Body Tattoo */}
              <path d="M 12 78 L 28 66 L 45 70 L 62 66 L 78 78 L 86 140 L 4 140 Z" fill="#f59e0b" opacity="0.3" />
              <path d="M 12 78 L 28 66 L 45 70 L 62 66 L 78 78 L 86 140 L 4 140 Z" fill="#fdba74" />
              <path d="M 25 85 Q 40 105 30 125 M 35 90 Q 55 110 45 130" stroke="#ca8a04" strokeWidth="2.5" fill="none" />
              {/* Tactical Gun in Hand */}
              <g transform="translate(38, 92) rotate(-15)">
                <rect x="0" y="0" width="28" height="12" rx="2" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
                <rect x="18" y="10" width="8" height="14" rx="1.5" fill="#1e293b" />
                <line x1="0" y1="4" x2="6" y2="4" stroke="#ef4444" strokeWidth="2" />
              </g>
            </g>
          </g>
        )}

        {/* 3. Tournament Title Section (Top Right) */}
        <g transform="translate(295, 34)" textAnchor="middle">
          {/* Subtitle / Category (e.g. SOLO BR FULL MAP / DUO BR FULL MAP) */}
          <text
            x="0"
            y="0"
            fontFamily="'Teko', 'Chakra Petch', 'Impact', sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="25"
            fill={isDuo ? '#38bdf8' : isCs ? '#fb7185' : '#facc15'}
            stroke="#000000"
            strokeWidth="3.5"
            paintOrder="stroke fill"
            letterSpacing="0.8"
            filter="url(#tourneyShadow)"
          >
            {titleText}
          </text>

          {/* Big 3D "TOURNAMENT" Header */}
          <text
            x="0"
            y="26"
            fontFamily="'Teko', 'Chakra Petch', 'Impact', sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="31"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="4.5"
            paintOrder="stroke fill"
            letterSpacing="1"
            filter="url(#tourneyShadow)"
          >
            {customSubtitle}
          </text>
        </g>

        {/* 4. White Curved Arrow (Pointing to Rules Box) */}
        <g transform="translate(162, 54)" filter="url(#tourneyShadow)">
          <path
            d="M 12 0 C 4 18 0 35 14 52"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Arrow Head */}
          <path
            d="M 6 42 L 15 54 L 20 40"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* 5. Tournament Rules Box (Right Side) */}
        <g transform="translate(188, 74)" filter="url(#rulesShadow)">
          {/* Rounded Box with Orange/Cyan Border */}
          <rect
            width="218"
            height="115"
            rx="8"
            fill={isDuo ? 'rgba(4, 18, 33, 0.92)' : isCs ? 'rgba(30, 6, 12, 0.92)' : 'rgba(24, 10, 4, 0.92)'}
            stroke={isDuo ? '#06b6d4' : isCs ? '#f43f5e' : '#f59e0b'}
            strokeWidth="2"
          />

          {/* 8 Lines of Official Rules - Pixel-accurate to screenshot */}
          <g
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="7.5"
            fill="#ffffff"
            letterSpacing="0.2"
          >
            <text x="109" y="14">BAN GUN - DOUBLE VECTOR , M79!</text>
            <text x="109" y="27">BAN CHARACTER - RYDEN!</text>
            <text x="109" y="40">MINIMUM LEVEL - 40 LVL!</text>
            <text x="109" y="53">IDP TIME - 5 MIN BEFORE MATCH TIME!</text>
            <text x="109" y="66">RECORD - ROOM ENTRY AND GAMEPLAY!</text>
            <text x="109" y="79">PENALTY OR BAN - UNREGISTER INVITE!</text>
            <text x="109" y="92">TEAMING , GLITCH , INAPPROPRIATE!</text>
            <text x="109" y="105">GAMEPLAY LEAD TO BAN OR PENALTY!</text>
          </g>
        </g>

        {/* 6. Bottom-Left Official Badges */}
        <g transform="translate(18, 172)" filter="url(#tourneyShadow)">
          {/* FREE FIRE MAX Pill */}
          <rect width="76" height="16" rx="3" fill="#000000" stroke="#ca8a04" strokeWidth="0.8" />
          <text
            x="5"
            y="11.5"
            fontFamily="'Chakra Petch', sans-serif"
            fontWeight="900"
            fontSize="7.5"
            fill="#ffffff"
            letterSpacing="0.5"
          >
            FREE FIRE
          </text>
          <rect x="52" y="2" width="20" height="12" rx="2" fill="#ea580c" />
          <text
            x="55"
            y="11.5"
            fontFamily="'Chakra Petch', sans-serif"
            fontWeight="900"
            fontSize="7.5"
            fill="#ffffff"
          >
            MAX
          </text>

          {/* GameX Logo with stylized golden X */}
          <g transform="translate(86, -1)">
            <text
              x="0"
              y="13"
              fontFamily="'Orbitron', 'Outfit', sans-serif"
              fontWeight="900"
              fontSize="14"
              fontStyle="italic"
              fill="#ffffff"
            >
              GAME<tspan fill={isDuo ? '#38bdf8' : isCs ? '#fb7185' : '#f59e0b'}>X</tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
