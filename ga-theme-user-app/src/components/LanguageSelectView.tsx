import React, { useState } from 'react';
import { ChevronLeft, ArrowRight, Globe, AlertCircle } from 'lucide-react';

interface LanguageSelectViewProps {
  onContinue: (language: string) => void;
  onBack?: () => void;
  initialLanguage?: string;
  onShowToast?: (msg: string) => void;
}

export const LanguageSelectView: React.FC<LanguageSelectViewProps> = ({
  onContinue,
  onBack,
  initialLanguage = 'English',
  onShowToast,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage);
  const [hindiNotice, setHindiNotice] = useState<boolean>(false);

  const languages = [
    {
      id: 'en',
      name: 'English',
      native: 'English',
      desc: 'Default game interface',
      comingSoon: false,
    },
    {
      id: 'hi',
      name: 'Hindi',
      native: 'हिन्दी',
      desc: 'हिंदी भाषा में खेलें (जल्द आ रहा है)',
      comingSoon: true,
    },
  ];

  const handleSelectLanguage = (lang: typeof languages[0]) => {
    if (lang.comingSoon) {
      setHindiNotice(true);
      if (onShowToast) {
        onShowToast('Hindi language is coming soon! English will be used for now.');
      }
      setTimeout(() => setHindiNotice(false), 4500);
      return;
    }
    setHindiNotice(false);
    setSelectedLanguage(lang.name);
  };

  const handleContinue = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gamex_preferred_lang', selectedLanguage);
    }
    onContinue(selectedLanguage);
  };

  return (
    <div
      id="choose-language-screen"
      className="relative w-full h-full min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between select-none font-['Outfit',_sans-serif]"
    >
      {/* Top Header Bar matching White Theme */}
      <header className="bg-white border-b border-slate-200 px-4 py-3.5 flex items-center gap-3 shrink-0 shadow-2xs">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#2575fc]" />
          <h1 className="text-xl font-bold font-['Outfit',_sans-serif] tracking-tight text-slate-900">
            CHOOSE LANGUAGE
          </h1>
        </div>
      </header>

      {/* Main Options Container */}
      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
          Select Your Preferred Language
        </p>

        <div className="space-y-3">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.name;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => handleSelectLanguage(lang)}
                className={`w-full text-left rounded-2xl p-4 flex items-center justify-between transition-all cursor-pointer active:scale-[0.99] ${
                  isSelected
                    ? 'bg-white text-slate-900 border-2 border-[#2575fc] ring-3 ring-blue-500/10 shadow-sm'
                    : 'bg-white text-slate-800 hover:border-slate-300 border border-slate-200 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-2 border-[#2575fc] bg-white'
                        : 'border-2 border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2575fc]" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-base text-slate-900 font-['Outfit',_sans-serif] tracking-wide block">
                      {lang.name}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {lang.desc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#2575fc] px-2.5 py-1 bg-blue-50 rounded-lg border border-blue-100">
                    {lang.native}
                  </span>
                  {lang.comingSoon && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/80 shrink-0">
                      Coming Soon!
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Hindi Coming Soon Notice Banner */}
        {hindiNotice && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2.5 animate-shake shadow-2xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Hindi language support is coming soon! Game interface currently defaults to English.</span>
          </div>
        )}
      </main>

      {/* Bottom Sticky Action Button */}
      <footer className="p-4 max-w-md mx-auto w-full pb-8 bg-white border-t border-slate-200 shrink-0">
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-[#2575fc] to-[#1a56db] hover:from-[#1e66e6] hover:to-[#1648bc] text-white font-bold font-['Outfit',_sans-serif] py-3.5 px-6 rounded-xl text-lg tracking-wider uppercase transition-all duration-150 cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};
