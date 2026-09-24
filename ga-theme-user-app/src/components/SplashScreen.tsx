import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

// Curated 9:16 aspect ratio gaming & esports images from Unsplash
const UNSPLASH_9_16_IMAGES = [
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1080&h=1920&q=90', // Neon gaming setup & controller
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1080&h=1920&q=90', // Esports arena & battle station
  'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1080&h=1920&q=90', // Tournament gamer battlestation
];

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  durationMs = 3200,
}) => {
  const [progress, setProgress] = useState(0);
  const [activeImageIndex] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(pct);
      if (elapsed >= durationMs) {
        clearInterval(interval);
        onComplete();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  const activeImage = UNSPLASH_9_16_IMAGES[activeImageIndex];

  return (
    <div
      id="gamex-splash-screen"
      className="relative w-full h-full min-h-screen bg-black overflow-hidden flex flex-col justify-between select-none font-sans text-white"
    >
      {/* 9:16 Pure Crisp Unblurred Unsplash Gaming Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={activeImage}
          alt="Gamex Esports 9:16"
          className="w-full h-full object-cover object-center aspect-[9/16]"
        />
        {/* Soft subtle top/bottom gradients for contrast only, no blur on image */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>

      {/* Top Bar: Progress & Skip button */}
      <div className="relative z-30 px-4 pt-3 pb-1 flex items-center justify-between">
        {/* Animated Top Progress Bar */}
        <div className="h-1.5 bg-black/40 rounded-full overflow-hidden flex-1 mr-4 border border-white/20 shadow-md">
          <div
            className="h-full bg-gradient-to-r from-[#2575fc] via-[#6a11cb] to-[#00d2ff] transition-all duration-75 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Skip Button */}
        <button
          type="button"
          onClick={onComplete}
          className="text-xs font-bold px-4 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/30 shadow-lg transition-all cursor-pointer active:scale-95 font-['Outfit',_sans-serif]"
        >
          Skip
        </button>
      </div>

      {/* Spacer to push brand to bottom */}
      <div className="flex-1" />

      {/* Bottom Brand */}
      <div className="relative z-10 w-full pb-8 px-4 text-center font-['Outfit',_sans-serif]">
        <div className="font-black text-2xl sm:text-3xl uppercase tracking-wider leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          <span className="text-white">GAMEX </span>
          <span className="text-[#00d2ff]">ESPORTS</span>
        </div>
        <p className="text-xs text-white/80 font-medium tracking-wide mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Real Gaming • Real Winnings
        </p>
      </div>
    </div>
  );
};
