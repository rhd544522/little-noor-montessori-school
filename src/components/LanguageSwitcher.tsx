import React from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../translations/translations';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile' | 'header-top';
  className?: string;
}

const LANGUAGES: { code: LanguageCode; label: string; nativeName: string }[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'gu', label: 'ગુજરાતી', nativeName: 'ગુજરાતી' },
  { code: 'hi', label: 'हिन्दी', nativeName: 'हिन्दी' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'desktop',
  className = '',
}) => {
  const { language, setLanguage, t } = useLanguage();

  if (variant === 'mobile') {
    return (
      <div className={`p-4 rounded-2xl bg-[#E2E8E0]/70 border border-[#9CAF88]/35 ${className}`}>
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-[#1E3A2B] uppercase tracking-wider">
          <Globe className="w-4 h-4 text-[#1E3A2B]" aria-hidden="true" />
          <span>{t.nav.language}</span>
        </div>

        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Select website language">
          {LANGUAGES.map((lang) => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                aria-pressed={isActive}
                aria-label={`Switch language to ${lang.label}`}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer border ${
                  isActive
                    ? 'bg-[#1E3A2B] text-white border-[#1E3A2B] shadow-xs'
                    : 'bg-white text-[#1E3A2B] border-[#9CAF88]/30 hover:bg-[#FAF8F1]'
                }`}
              >
                <span className="leading-tight">{lang.nativeName}</span>
                {isActive && (
                  <span className="inline-flex items-center text-[10px] text-[#9CAF88] font-bold">
                    <Check className="w-2.5 h-2.5 mr-0.5" />
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop / Header variant
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#9CAF88]/40 shadow-2xs backdrop-blur-xs ${className}`}
      role="group"
      aria-label="Website language selector"
    >
      <div className="flex items-center gap-1 pl-1 pr-1.5 text-xs font-bold text-[#1E3A2B]">
        <Globe className="w-3.5 h-3.5 text-[#1E3A2B]" aria-hidden="true" />
        <span className="hidden xl:inline text-[11px] uppercase tracking-wider font-extrabold text-[#1E3A2B]/75">
          {t.nav.language}:
        </span>
      </div>

      <div className="flex items-center divide-x divide-[#9CAF88]/30">
        {LANGUAGES.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              aria-pressed={isActive}
              aria-label={`Select ${lang.label}`}
              className={`px-2 py-0.5 text-xs transition-all duration-200 cursor-pointer rounded-sm ${
                isActive
                  ? 'font-extrabold text-[#1E3A2B] bg-[#E2E8E0] shadow-3xs underline decoration-[#1E3A2B] decoration-2 underline-offset-4'
                  : 'font-medium text-[#1E3A2B]/70 hover:text-[#1E3A2B] hover:bg-[#FAF8F1]'
              }`}
            >
              <span>{lang.nativeName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
