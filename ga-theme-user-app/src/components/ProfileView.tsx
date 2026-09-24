import React, { useState } from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
import { ToastNotification } from './ToastNotification';
import { UserProfile } from '../types';

interface ProfileViewProps {
  onBack: () => void;
  username?: string;
  onUpdateUsername?: (newName: string) => void;
  currentUser?: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
}

/**
 * Pixel-accurate Profile component matching Image 4
 */
export const ProfileView: React.FC<ProfileViewProps> = ({
  onBack,
  username: initialUsername = 'digicroz',
  onUpdateUsername,
  currentUser,
  onUpdateProfile,
}) => {
  const [username, setUsername] = useState(currentUser?.username || initialUsername);
  const [firstName, setFirstName] = useState(currentUser?.firstName || 'demo');
  const [lastName, setLastName] = useState(currentUser?.lastName || 'demo');
  const [mobileNumber, setMobileNumber] = useState(currentUser?.phoneNumber || '+91 7896748333');
  const [email, setEmail] = useState(currentUser?.email || 'digicroz@digi.com');
  const [toast, setToast] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUsername) {
      onUpdateUsername(username);
    }
    if (onUpdateProfile && currentUser) {
      onUpdateProfile({
        ...currentUser,
        username,
        firstName,
        lastName,
        phoneNumber: mobileNumber,
        email,
      });
    }
    setToast('Profile changes saved successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-white select-none text-slate-900 overflow-hidden">
      {/* Top Header Bar */}
      <div className="shrink-0 h-14 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-3 relative z-20">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-full active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="absolute inset-x-0 text-center font-bold text-slate-900 text-base tracking-wide pointer-events-none font-['Outfit',_sans-serif]">
          Profile
        </h1>
        <div className="w-9" />
      </div>

      {/* Toast Notification Alert Matching White Theme */}
      <ToastNotification message={toast} type="success" onClose={() => setToast('')} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24 overscroll-contain space-y-5 bg-white">

        {/* Profile Avatar with Camera Icon */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative">
            {/* Circle with Red Accent Border Ring */}
            <div className="w-24 h-24 rounded-full bg-red-50 border-[3px] border-red-600 flex items-center justify-center shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <Camera className="w-10 h-10 text-red-600 stroke-[2]" />
            </div>
          </div>

          {/* Username */}
          <h2 className="text-slate-900 font-bold text-lg sm:text-xl tracking-wide mt-3.5 font-['Outfit',_sans-serif]">
            Username : {username}
          </h2>
        </div>

        {/* Form Fields: 4 Cards matching Theme */}
        <form onSubmit={handleSave} className="space-y-3 pt-1">
          {/* 1. First Name */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-sm text-left">
            <label className="block text-slate-500 font-medium text-[11px] leading-tight">
              First Name :
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-transparent text-slate-900 font-bold text-sm outline-hidden mt-0.5"
            />
          </div>

          {/* 2. Last Name */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-sm text-left">
            <label className="block text-slate-500 font-medium text-[11px] leading-tight">
              Last Name :
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-transparent text-slate-900 font-bold text-sm outline-hidden mt-0.5"
            />
          </div>

          {/* 3. Mobile Number */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-sm text-left">
            <label className="block text-slate-500 font-medium text-[11px] leading-tight">
              Mobile Number :
            </label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full bg-transparent text-slate-900 font-bold text-sm outline-hidden mt-0.5"
            />
          </div>

          {/* 4. Email */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-sm text-left">
            <label className="block text-slate-500 font-medium text-[11px] leading-tight">
              Email :
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-slate-900 font-bold text-sm outline-hidden mt-0.5"
            />
          </div>

          {/* Save Changes Button */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-[0.98] text-white font-bold text-sm px-8 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-center tracking-wide"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
