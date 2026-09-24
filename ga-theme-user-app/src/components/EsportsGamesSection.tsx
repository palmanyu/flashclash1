import React from 'react';
import { ChevronRight } from 'lucide-react';
import { TournamentCard } from '../types';
import { TournamentPoster } from './TournamentPoster';

interface EsportsGamesSectionProps {
  tournaments: TournamentCard[];
  onSelectTournament: (tournament: TournamentCard) => void;
  onViewAll?: () => void;
}

export const EsportsGamesSection: React.FC<EsportsGamesSectionProps> = ({
  tournaments,
  onSelectTournament,
  onViewAll,
}) => {
  return (
    <div className="px-3 pt-1 pb-24 select-none">
      {/* Section Header: Esports Games + View all > */}
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="font-['Outfit',_sans-serif] font-black text-slate-900 text-base tracking-wide">
          Esports Games
        </h2>
        <button
          onClick={onViewAll}
          className="flex items-center gap-0.5 text-red-600 hover:text-red-700 font-bold text-xs cursor-pointer transition-colors active:scale-95"
        >
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* 2-Column Tournament Grid matching screenshot */}
      <div className="grid grid-cols-2 gap-2.5">
        {tournaments.map((t) => (
          <TournamentPoster
            key={t.id}
            tournament={t}
            onClick={() => onSelectTournament(t)}
          />
        ))}
      </div>
    </div>
  );
};

