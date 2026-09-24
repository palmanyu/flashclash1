import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { BANNER_SLIDES_LIST, BannerSlideView } from './BannerSlideView';

interface InstagramBannerProps {
  onOpenDetails?: () => void;
}

export const InstagramBanner: React.FC<InstagramBannerProps> = ({ onOpenDetails }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  // Moving slider with auto-advance every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES_LIST.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = BANNER_SLIDES_LIST[currentIndex];

  // Direct redirection to the slide's external destination website or app
  const handleRedirect = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    const url = slide?.targetUrl || 'https://www.instagram.com/gamex_esports';
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = url;
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 40) {
      // Swiped left -> Next slide
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES_LIST.length);
    } else if (diff < -40) {
      // Swiped right -> Prev slide
      setCurrentIndex((prev) => (prev - 1 + BANNER_SLIDES_LIST.length) % BANNER_SLIDES_LIST.length);
    }

    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <div className="px-3 pt-1 pb-1 select-none">
      {/* Banner Card with Red Glowing Border & Direct URL Redirection */}
      <div
        onClick={handleRedirect}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-2xl border border-red-500/60 bg-black shadow-md cursor-pointer group transition-all duration-500 w-full aspect-[420/205] min-h-[195px] sm:min-h-[210px]"
      >
        {/* The entire banner is a single, complete high-fidelity graphic banner */}
        <div className="absolute inset-0 z-10 w-full h-full">
          <BannerSlideView slide={slide} />
        </div>

        {/* BOTTOM-LEFT: Direct Link Pill Button */}
        <div className="absolute bottom-2.5 left-3 z-30">
          <button
            type="button"
            onClick={handleRedirect}
            className="bg-black/90 hover:bg-black active:scale-95 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full border border-red-600/90 shadow-md transition-all cursor-pointer flex items-center gap-1.5 tracking-tight"
          >
            <span>Visit Link</span>
            <ExternalLink className="w-3 h-3 text-red-500 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Centered Carousel Pagination Dots Below Banner */}
      <div className="flex items-center justify-center gap-1.5 mt-2 mb-1">
        {BANNER_SLIDES_LIST.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 cursor-pointer ${
              currentIndex === index
                ? 'w-5 h-1.5 rounded-full bg-red-600 shadow-[0_0_6px_#dc2626]'
                : 'w-1.5 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

