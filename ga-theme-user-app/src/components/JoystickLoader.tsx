import React from 'react';

interface JoystickLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showText?: boolean;
  className?: string;
}

/**
 * High-fidelity animated Gaming Joystick loader
 * Features a tactile arcade joystick tilting in a dynamic gaming loop,
 * pulsing gaming buttons, glowing D-pad, and neon gamer aesthetic.
 */
export const JoystickLoader: React.FC<JoystickLoaderProps> = ({
  size = 'md',
  text = 'Loading matches...',
  showText = true,
  className = '',
}) => {
  // Dimension scaling
  const dimensions = {
    sm: { width: 56, height: 56, fontSize: 'text-[11px]' },
    md: { width: 90, height: 90, fontSize: 'text-xs' },
    lg: { width: 130, height: 130, fontSize: 'text-sm' },
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none py-4 ${className}`}>
      {/* Animated Joystick Graphic */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(220,38,38,0.35)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Base Radial Gradient */}
            <radialGradient id="joystickBaseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Glowing Balltop Red Gradient */}
            <radialGradient id="stickBallGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ff7b72" />
              <stop offset="40%" stopColor="#ef4444" />
              <stop offset="85%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>

            {/* Metallic Shaft Gradient */}
            <linearGradient id="shaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Cyan Button Glow */}
            <radialGradient id="cyanButtonGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </radialGradient>

            {/* Amber Button Glow */}
            <radialGradient id="amberButtonGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </radialGradient>

            {/* Green Button Glow */}
            <radialGradient id="greenButtonGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="70%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </radialGradient>
          </defs>

          {/* 1. Controller / Arcade Panel Base */}
          <rect
            x="8"
            y="26"
            width="84"
            height="56"
            rx="18"
            fill="url(#joystickBaseGrad)"
            stroke="#dc2626"
            strokeWidth="1.8"
          />
          {/* Subtle Accent Glow Ring */}
          <rect
            x="11"
            y="29"
            width="78"
            height="50"
            rx="15"
            fill="none"
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray="2 3"
          />

          {/* 2. D-Pad on Left */}
          <g transform="translate(24, 52)">
            {/* D-Pad Cross Background */}
            <path
              d="M -3 -11 H 3 V -3 H 11 V 3 H 3 V 11 H -3 V 3 H -11 V -3 H -3 Z"
              fill="#090d16"
              stroke="#475569"
              strokeWidth="0.8"
            />
            {/* Center Indent */}
            <circle cx="0" cy="0" r="1.5" fill="#1e293b" />
            {/* Animated Pulsing Arrows on D-pad */}
            <polygon
              points="0,-8 -2,-5 2,-5"
              className="animate-pulse"
              fill="#ef4444"
            />
            <polygon
              points="8,0 5,-2 5,2"
              className="animate-pulse"
              fill="#00e5ff"
              style={{ animationDelay: '200ms' }}
            />
            <polygon
              points="0,8 -2,5 2,5"
              className="animate-pulse"
              fill="#ef4444"
              style={{ animationDelay: '400ms' }}
            />
            <polygon
              points="-8,0 -5,-2 -5,2"
              className="animate-pulse"
              fill="#00e5ff"
              style={{ animationDelay: '600ms' }}
            />
          </g>

          {/* 3. Gaming Action Buttons on Right (X, Y, A, B) */}
          <g transform="translate(76, 52)">
            {/* Top Button (Yellow / Y) */}
            <circle
              cx="0"
              cy="-8"
              r="3.5"
              fill="url(#amberButtonGrad)"
              className="animate-pulse"
              style={{ animationDuration: '1.2s' }}
            />
            {/* Right Button (Red / B) */}
            <circle
              cx="8"
              cy="0"
              r="3.5"
              fill="url(#stickBallGrad)"
              className="animate-pulse"
              style={{ animationDuration: '1.4s', animationDelay: '250ms' }}
            />
            {/* Bottom Button (Green / A) */}
            <circle
              cx="0"
              cy="8"
              r="3.5"
              fill="url(#greenButtonGrad)"
              className="animate-pulse"
              style={{ animationDuration: '1.3s', animationDelay: '500ms' }}
            />
            {/* Left Button (Cyan / X) */}
            <circle
              cx="-8"
              cy="0"
              r="3.5"
              fill="url(#cyanButtonGrad)"
              className="animate-pulse"
              style={{ animationDuration: '1.5s', animationDelay: '750ms' }}
            />
          </g>

          {/* 4. Center Arcade Joystick Mechanism */}
          <g transform="translate(50, 52)">
            {/* Dust Washer Base Ring */}
            <ellipse cx="0" cy="8" rx="13" ry="5.5" fill="#020617" stroke="#334155" strokeWidth="1" />
            <ellipse cx="0" cy="7" rx="10" ry="4" fill="#0f172a" />

            {/* Dynamic Tilting Joystick Pivot */}
            <g className="origin-[0px_7px] animate-[joystickTilt_1.8s_ease-in-out_infinite]">
              {/* Metallic Shaft */}
              <line
                x1="0"
                y1="7"
                x2="0"
                y2="-18"
                stroke="url(#shaftGrad)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Shaft Highlight Line */}
              <line
                x1="-0.8"
                y1="6"
                x2="-0.8"
                y2="-17"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.85"
              />

              {/* Red Balltop Knob with 3D Specular Sheen */}
              <circle
                cx="0"
                cy="-21"
                r="11"
                fill="url(#stickBallGrad)"
                stroke="#7f1d1d"
                strokeWidth="1.2"
              />
              {/* Specular Glint */}
              <ellipse cx="-3.5" cy="-24.5" rx="3.5" ry="2" fill="#ffffff" opacity="0.65" />
              {/* Inner Rim Light */}
              <circle cx="0" cy="-21" r="10" fill="none" stroke="#fca5a5" strokeWidth="0.8" opacity="0.4" />
            </g>
          </g>
        </svg>

        {/* Outer Pulsing Glow */}
        <div className="absolute inset-0 rounded-full bg-red-500/10 animate-ping pointer-events-none -z-10" />
      </div>

      {/* Loading Label with Bouncing Dots */}
      {showText && (
        <div className="mt-3 flex items-center gap-1.5 font-['Outfit',_sans-serif]">
          <span className={`font-bold tracking-wider uppercase text-slate-700 ${dimensions.fontSize}`}>
            {text}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </div>
      )}

      {/* Custom Keyframe Styles */}
      <style>{`
        @keyframes joystickTilt {
          0% {
            transform: rotate(0deg);
          }
          20% {
            transform: rotate(-18deg) translate(-2px, 1px);
          }
          40% {
            transform: rotate(14deg) translate(2px, 0px);
          }
          60% {
            transform: rotate(-12deg) translate(-1px, 2px);
          }
          80% {
            transform: rotate(16deg) translate(2px, -1px);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};
