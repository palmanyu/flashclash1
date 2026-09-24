import React from 'react';
import {
  TotalUsersGroupIcon,
  BeaconIcon,
  TempleIcon,
  PendingWithdrawalIcon,
  MicroSDIcon,
} from './Icons';

interface DashboardViewProps {
  onNavigate?: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = () => {
  const cards = [
    {
      id: 'stat-total-users',
      label: 'Total Users',
      value: '70',
      icon: <TotalUsersGroupIcon className="w-12 h-12 text-[#0f2d59]" />,
    },
    {
      id: 'stat-active-users',
      label: 'Active Users',
      value: '0',
      icon: <BeaconIcon className="w-12 h-12 text-[#0f2d59]" />,
    },
    {
      id: 'stat-pending-deposits',
      label: 'Pending Deposits',
      value: '32',
      icon: <TempleIcon className="w-12 h-12 text-[#0f2d59]" />,
    },
    {
      id: 'stat-pending-withdrawals',
      label: 'Pending Withdrawals',
      value: '15',
      icon: <PendingWithdrawalIcon className="w-12 h-12 text-[#0f2d59]" />,
    },
    {
      id: 'stat-storage-used',
      label: 'Storage Used',
      value: '236.46 MB',
      icon: <MicroSDIcon className="w-12 h-12 text-[#0f2d59]" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards Grid (Pixel-to-Pixel Replica of Image 2 & 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            id={card.id}
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100/90 flex items-center justify-between transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          >
            {/* Left Icon */}
            <div className="flex items-center justify-center shrink-0">
              {card.icon}
            </div>

            {/* Right: Label & Value */}
            <div className="text-right">
              <span className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                {card.label}
              </span>
              <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
