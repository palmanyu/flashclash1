import React from 'react';
import { JoystickLoader } from './JoystickLoader';

/**
 * Reusable animated shimmer skeleton components
 */

export const SkeletonShimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative overflow-hidden bg-slate-200/80 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
  </div>
);

/**
 * 16:9 Esports Games Card Skeleton with bottom black bar line
 */
export const EsportsGamesCardSkeleton: React.FC = () => (
  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 shadow-md flex flex-col justify-end">
    {/* Background Shimmer Image Placeholder */}
    <div className="absolute inset-0 bg-slate-800">
      <SkeletonShimmer className="w-full h-full" />
    </div>

    {/* Black line / bottom bar skeleton */}
    <div className="relative z-10 w-full bg-black/95 px-2 py-1 flex items-center justify-between border-t border-black">
      {/* Game Mode Pill */}
      <div className="h-4 w-16 rounded bg-slate-700/80 animate-pulse" />
      {/* Active Count */}
      <div className="h-4 w-10 rounded bg-red-900/60 animate-pulse" />
    </div>
  </div>
);

/**
 * 2-Column Esports Games Section Skeleton
 */
export const EsportsGamesSectionSkeleton: React.FC = () => (
  <div className="px-3 pt-1 pb-4 select-none">
    {/* Section Header */}
    <div className="flex items-center justify-between mb-2.5">
      <div className="h-5 w-32 rounded-md bg-slate-200 animate-pulse" />
      <div className="h-4 w-14 rounded-md bg-slate-200 animate-pulse" />
    </div>

    {/* 2-Column 16:9 Cards */}
    <div className="grid grid-cols-2 gap-2.5">
      <EsportsGamesCardSkeleton />
      <EsportsGamesCardSkeleton />
    </div>
  </div>
);

/**
 * Carousel Banner Skeleton
 */
export const CarouselBannerSkeleton: React.FC = () => (
  <div className="px-3 pt-1 pb-1">
    <div className="relative overflow-hidden rounded-2xl border border-slate-300 bg-slate-900 shadow-md w-full aspect-[420/205] min-h-[195px]">
      <SkeletonShimmer className="w-full h-full" />
      {/* Bottom Button Pill Skeleton */}
      <div className="absolute bottom-2.5 left-3">
        <div className="h-6 w-24 rounded-full bg-black/70 border border-slate-700 animate-pulse" />
      </div>
    </div>
    {/* Dots */}
    <div className="flex items-center justify-center gap-1.5 mt-2 mb-1">
      <div className="w-5 h-1.5 rounded-full bg-slate-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
    </div>
  </div>
);

/**
 * Contest Card Skeleton
 */
export const ContestCardSkeleton: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden shadow-sm bg-slate-50 border border-slate-200 border-b-2 border-b-red-500">
    {/* Banner Graphic Placeholder */}
    <div className="w-full aspect-[16/9] bg-slate-900 relative">
      <SkeletonShimmer className="w-full h-full" />
      <div className="absolute bottom-2 left-2 h-4 w-28 rounded bg-slate-700/80 animate-pulse" />
    </div>

    {/* Details Body Placeholder */}
    <div className="p-3.5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-4 w-36 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-16 rounded-full bg-slate-200 animate-pulse" />
      </div>

      <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100">
        <div className="h-8 rounded bg-slate-100 animate-pulse" />
        <div className="h-8 rounded bg-slate-100 animate-pulse" />
        <div className="h-8 rounded bg-slate-100 animate-pulse" />
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="h-3 w-28 rounded bg-slate-200 animate-pulse" />
        <div className="h-8 w-20 rounded-xl bg-red-600/70 animate-pulse" />
      </div>
    </div>
  </div>
);

/**
 * Full Skeleton Feed with Animated Joystick Loader
 */
export const FullFeedLoadingSkeleton: React.FC<{ message?: string }> = ({
  message = 'Loading tournament arena...',
}) => (
  <div className="min-h-[400px] flex flex-col items-center justify-center px-4 py-8">
    <JoystickLoader size="lg" text={message} />
    <div className="w-full max-w-sm mt-6 space-y-3">
      <EsportsGamesCardSkeleton />
    </div>
  </div>
);

/**
 * Contest List Skeleton View with Joystick Loader
 */
export const ContestListLoadingSkeleton: React.FC<{ message?: string }> = ({
  message = 'Syncing contests...',
}) => (
  <div className="space-y-4 px-3.5 py-2">
    {/* Floating Joystick Status Header */}
    <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-red-500/30 rounded-2xl p-4 shadow-md flex items-center justify-center">
      <JoystickLoader size="sm" text={message} />
    </div>

    {/* Contest Card Skeletons */}
    <ContestCardSkeleton />
    <ContestCardSkeleton />
  </div>
);
