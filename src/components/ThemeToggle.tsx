import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'labeled' | 'compact';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  className = '',
}) => {
  const { isDark, toggleTheme } = useTheme();

  if (variant === 'labeled') {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-[#9CAF88]/30 transition-all duration-200 cursor-pointer ${
          isDark
            ? 'bg-[#182C20] hover:bg-[#1E3728] text-[#FAF8F1]'
            : 'bg-white hover:bg-[#E2E8E0] text-[#1E3A2B]'
        } ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-[#254633] text-[#FAF8F1]'
                : 'bg-[#E2E8E0] text-[#1E3A2B]'
            }`}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-[#1E3A2B]" />
            )}
          </div>
          <div className="text-left">
            <span className="text-xs font-bold block">
              {isDark ? 'Night Garden Theme' : 'Daylight Theme'}
            </span>
            <span className="text-[10px] text-[#9CAF88] block">
              {isDark ? 'Tap for daytime mode' : 'Tap for dark mode'}
            </span>
          </div>
        </div>

        {/* Pill switch visual indicator */}
        <div
          className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
            isDark ? 'bg-[#9CAF88]' : 'bg-[#E2E8E0]'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className={`w-5 h-5 rounded-full shadow-sm flex items-center justify-center ${
              isDark ? 'bg-[#0D1912] ml-auto' : 'bg-white mr-auto'
            }`}
          >
            {isDark ? (
              <Sun className="w-3 h-3 text-amber-300" />
            ) : (
              <Moon className="w-3 h-3 text-[#1E3A2B]" />
            )}
          </motion.div>
        </div>
      </button>
    );
  }

  // Icon button (ideal for floating navbar, top bar)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      title={isDark ? 'Switch to Daytime mode' : 'Switch to Night Garden mode'}
      aria-label={isDark ? 'Switch to Daytime mode' : 'Switch to Night Garden mode'}
      className={`relative p-2 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#9CAF88] cursor-pointer overflow-hidden ${
        variant === 'compact' ? 'w-8 h-8' : 'w-9 h-9'
      } ${
        isDark
          ? 'bg-[#182C20] hover:bg-[#203B2B] border-[#9CAF88]/40 text-[#FAF8F1] shadow-inner'
          : 'bg-white hover:bg-[#E2E8E0] border-[#9CAF88]/40 text-[#1E3A2B] shadow-2xs'
      } flex items-center justify-center ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-sun"
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-300" />
          </motion.div>
        ) : (
          <motion.div
            key="light-moon"
            initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-[#1E3A2B]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};
