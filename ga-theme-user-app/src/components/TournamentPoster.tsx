import React from 'react';
import { Users } from 'lucide-react';
import { TournamentCard } from '../types';

interface TournamentPosterProps {
  tournament: TournamentCard;
  onClick: () => void;
}

/**
 * Pixel-accurate Esports Tournament Card:
 * - 16:9 aspect ratio (decreased height)
 * - High-definition game thumbnail
 * - Solid black bottom bar line with Game Mode / Name and Active Contest player count
 */
export const TournamentPoster: React.FC<TournamentPosterProps> = ({ tournament, onClick }) => {
  const isCard1 = tournament.themeColor === 'red' || tournament.characterType === 'bandana';
  const imgUrl = tournament.thumbnailUrl || tournament.imageUrl;

  const accentColor = isCard1 ? '#ef4444' : '#00e5ff';
  const modeText = tournament.gameMode || (isCard1 ? 'FULL MAP' : 'CS 1V1 / 2V2');
  const activeCount = tournament.activePlayers || (isCard1 ? 24 : 54);

  if (imgUrl) {
    return (
      <div
        onClick={onClick}
        className="group relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all hover:scale-[1.01] shadow-md select-none bg-slate-900 border border-slate-700/60 flex flex-col justify-end"
        style={{
          boxShadow: isCard1
            ? '0 4px 16px rgba(220, 38, 38, 0.28)'
            : '0 4px 16px rgba(0, 168, 232, 0.28)',
        }}
      >
        {/* 16:9 Game Thumbnail Image */}
        <img
          src={imgUrl}
          alt={tournament.title}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="eager"
          referrerPolicy="no-referrer"
        />

        {/* Solid Black Line (Bottom Bar) with Game Name & Active Contest / Players */}
        <div className="relative z-10 w-full bg-black/95 backdrop-blur-xs border-t border-black px-2.5 py-1 flex items-center justify-between shadow-xs">
          {/* Left: Game Mode / Name Pill */}
          <div className="flex items-center gap-1 min-w-0">
            <span className="bg-black/90 border border-slate-700/80 rounded px-1.5 py-0.5 text-[8.5px] sm:text-[9px] font-black tracking-wider text-white uppercase truncate font-['Outfit',_sans-serif]">
              {modeText}
            </span>
          </div>

          {/* Right: Active Contest / Players */}
          <div
            className="flex items-center gap-1 text-[10px] sm:text-[11px] font-black shrink-0 font-['Outfit',_sans-serif]"
            style={{ color: accentColor }}
          >
            <Users className="w-3 h-3 stroke-[2.5]" />
            <span>{activeCount}</span>
          </div>
        </div>
      </div>
    );
  }

  const theme = isCard1
    ? {
        border: '#dc2626',
        bgStart: '#2d0508',
        bgEnd: '#140103',
        speedLine: 'rgba(255, 255, 255, 0.22)',
        xColor: '#ef4444',
        accentColor: '#ef4444',
        pillBorder: '#3b0d11',
        titleText: tournament.title || 'BR FULL MAP',
        modeText: tournament.gameMode || 'FULL MAP',
        playerCount: tournament.activePlayers || 24,
      }
    : {
        border: '#00a8e8',
        bgStart: '#041f33',
        bgEnd: '#020d17',
        speedLine: 'rgba(255, 255, 255, 0.22)',
        xColor: '#00e5ff',
        accentColor: '#00e5ff',
        pillBorder: '#0b2e47',
        titleText: tournament.title || 'CLASH SQUAD ...',
        modeText: tournament.gameMode || 'CS 1V1 / 2V2',
        playerCount: tournament.activePlayers || 54,
      };

  return (
    <div
      onClick={onClick}
      className="group relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all hover:scale-[1.01] shadow-md select-none"
      style={{
        boxShadow: isCard1
          ? '0 4px 16px rgba(220, 38, 38, 0.22)'
          : '0 4px 16px rgba(0, 168, 232, 0.22)',
      }}
    >
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full block"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Card Corner Clip to keep solid black bottom bar inside rounded corners */}
          <clipPath id={`clip-${tournament.id}`}>
            <rect x="0" y="0" width="200" height="160" rx="16" ry="16" />
          </clipPath>

          {/* Top Background Gradient */}
          <linearGradient id={`bgGrad-${tournament.id}`} x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={theme.bgStart} />
            <stop offset="100%" stopColor={theme.bgEnd} />
          </linearGradient>

          {/* Drop shadow for text punch */}
          <filter id={`drop-${tournament.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* Clipped Group for internal elements */}
        <g clipPath={`url(#clip-${tournament.id})`}>
          {/* 1. Main Background Gradient */}
          <rect width="200" height="160" fill={`url(#bgGrad-${tournament.id})`} />

          {/* 2. Diagonal Battle Speedlines (matching the screenshot exactly) */}
          <g stroke={theme.speedLine} strokeWidth="1" strokeLinecap="round">
            <line x1="85" y1="0" x2="140" y2="125" />
            <line x1="110" y1="0" x2="165" y2="125" />
            <line x1="135" y1="0" x2="190" y2="125" />
            <line x1="160" y1="0" x2="215" y2="125" />
          </g>

          {/* 3. Character Vector Artwork */}
          {isCard1 ? (
            /* Card 1 Ninja Avatar */
            <g transform="translate(4, 4)">
              {/* Spiky Anime Ninja Hair */}
              <polygon points="12,50 18,22 28,38" fill="#18181b" />
              <polygon points="22,36 31,14 39,36" fill="#18181b" />
              <polygon points="36,36 46,16 54,38" fill="#18181b" />
              <polygon points="50,38 62,24 67,50" fill="#18181b" />
              <polygon points="26,38 18,34 16,50" fill="#27272a" />

              {/* Tan Face */}
              <rect x="22" y="38" width="37" height="24" rx="3" fill="#facc15" />

              {/* Horizontal Black Slit Eyes */}
              <rect x="26" y="47" width="8" height="3" rx="0.5" fill="#000000" />
              <rect x="45" y="47" width="8" height="3" rx="0.5" fill="#000000" />

              {/* Bright Vivid Orange Bandana / Face Mask */}
              <polygon points="18,54 63,54 62,70 41,92 19,70" fill="#f97316" />

              {/* Dark Charcoal / Navy Jacket */}
              <path d="M 4 125 L 14 78 L 41 84 L 68 78 L 78 125 Z" fill="#1e293b" />
              {/* Central Orange Zipper Stripe */}
              <line x1="41" y1="84" x2="41" y2="125" stroke="#f97316" strokeWidth="2.5" />
            </g>
          ) : (
            /* Card 2 Tactical Beret / Cap Avatar */
            <g transform="translate(4, 4)">
              {/* Tactical Cap / Flat Beret */}
              <polygon points="14,40 22,25 60,25 68,40" fill="#0f172a" />
              <polygon points="8,40 18,35 24,43 12,45" fill="#1e293b" />
              <line x1="14" y1="39" x2="68" y2="39" stroke="#334155" strokeWidth="2" />

              {/* Pale Tan Face */}
              <rect x="22" y="38" width="37" height="26" rx="4" fill="#fed7aa" />

              {/* Left Eye: Cyan Glow Lens/Slit */}
              <rect x="26" y="47" width="8" height="3.5" rx="1" fill="#00e5ff" />
              {/* Right Eye: Dark Black Slit */}
              <rect x="45" y="47" width="8" height="3.5" rx="1" fill="#0f172a" />

              {/* Gentle Smile Line */}
              <path
                d="M 31 59 Q 41 65 50 59"
                stroke="#0f172a"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Blue Tactical Shirt / Jacket */}
              <path d="M 4 125 L 14 74 L 41 80 L 68 74 L 78 125 Z" fill="#0284c7" />
              {/* Inner Dark V-Collar */}
              <polygon points="34,78 48,78 41,94" fill="#0f172a" />
            </g>
          )}

          {/* 4. Top-Right "FREE FIRE MAX" Badge */}
          <g transform="translate(192, 9)">
            {/* Black container with golden yellow border */}
            <rect
              x="-76"
              y="0"
              width="76"
              height="15.5"
              rx="3.5"
              fill="#000000"
              stroke="#ca8a04"
              strokeWidth="0.9"
            />
            {/* FREE FIRE bold condensed text */}
            <text
              x="-22"
              y="10.5"
              textAnchor="end"
              fontFamily="'Chakra Petch', 'Montserrat', sans-serif"
              fontWeight="900"
              fontSize="7.5"
              letterSpacing="0.4"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="1.2"
              paintOrder="stroke fill"
            >
              FREE FIRE
            </text>
            {/* Golden underline */}
            <line x1="-71" y1="12" x2="-22" y2="12" stroke="#facc15" strokeWidth="0.9" />

            {/* MAX Orange Box */}
            <rect x="-19" y="2" width="16" height="11.5" rx="2" fill="#ea580c" />
            <text
              x="-11"
              y="10.5"
              textAnchor="middle"
              fontFamily="'Chakra Petch', sans-serif"
              fontWeight="900"
              fontSize="7"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="1"
              paintOrder="stroke fill"
            >
              MAX
            </text>
          </g>

          {/* 5. Typography on the Right */}
          <g transform="translate(192, 36)" textAnchor="end">
            {/* Line 1: Main Title (BR FULL MAP / CLASH SQUAD ...) */}
            <text
              x="0"
              y="22"
              fontFamily="'Teko', 'Impact', sans-serif"
              fontWeight="700"
              fontStyle="italic"
              fontSize={isCard1 ? "18" : "15.5"}
              letterSpacing="0.6"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              paintOrder="stroke fill"
              filter={`url(#drop-${tournament.id})`}
            >
              {theme.titleText}
            </text>

            {/* Line 2: TOURNAMENT (vibrant yellow/gold with black outline) */}
            <text
              x="0"
              y="39"
              fontFamily="'Teko', 'Impact', sans-serif"
              fontWeight="700"
              fontStyle="italic"
              fontSize="17.5"
              letterSpacing="0.6"
              fill="#facc15"
              stroke="#000000"
              strokeWidth="3.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              paintOrder="stroke fill"
              filter={`url(#drop-${tournament.id})`}
            >
              TOURNAMENT
            </text>

            {/* Line 3: GameX Logo */}
            <g transform="translate(0, 46)">
              <text
                x="0"
                y="12"
                fontFamily="'Orbitron', 'Outfit', sans-serif"
                fontWeight="900"
                fontSize="11.5"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="2.2"
                strokeLinejoin="round"
                strokeLinecap="round"
                paintOrder="stroke fill"
                filter={`url(#drop-${tournament.id})`}
              >
                Game<tspan fill={theme.xColor}>X</tspan>
              </text>
            </g>
          </g>

          {/* 6. Solid Black Bottom Bar (matching screenshot) */}
          <rect x="0" y="124" width="200" height="36" fill="#000000" />

          {/* Left: Mode Pill Box */}
          <g transform="translate(8, 129)">
            <rect
              x="0"
              y="0"
              width={isCard1 ? 62 : 72}
              height="20"
              rx="5"
              fill="#000000"
              stroke={theme.pillBorder}
              strokeWidth="1"
            />
            <text
              x={isCard1 ? 31 : 36}
              y="13.5"
              textAnchor="middle"
              fontFamily="'Outfit', sans-serif"
              fontWeight="800"
              fontSize="8.5"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="1.2"
              paintOrder="stroke fill"
              letterSpacing="0.4"
            >
              {theme.modeText}
            </text>
          </g>

          {/* Right: User Icon + Number (glowing in theme accent, directly on black bar) */}
          <g transform="translate(192, 129)" textAnchor="end">
            {/* User Silhouette Icon */}
            <g transform={`translate(-28, 4)`} fill={theme.accentColor}>
              <circle cx="4" cy="3" r="2.2" />
              <path d="M 0.5 9.5 C 0.5 7.2 2 5.8 4 5.8 C 6 5.8 7.5 7.2 7.5 9.5 Z" />
            </g>
            {/* Player count */}
            <text
              x="0"
              y="14.5"
              fontFamily="'Outfit', sans-serif"
              fontWeight="900"
              fontSize="11.5"
              fill={theme.accentColor}
              stroke="#000000"
              strokeWidth="1.2"
              paintOrder="stroke fill"
            >
              {theme.playerCount}
            </text>
          </g>
        </g>

        {/* 7. Thick Outer Rounded Border (Solid Red or Cyan matching image) */}
        <rect
          x="1.25"
          y="1.25"
          width="197.5"
          height="157.5"
          rx="16"
          ry="16"
          fill="none"
          stroke={theme.border}
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
};
