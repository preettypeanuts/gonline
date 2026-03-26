'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function MobileThemeSwitch() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setIsDark(currentTheme === 'dark');
  }, [theme, systemTheme, mounted]);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex flex-row items-center gap-2 p-3 w-full rounded-secondary text-neutral-300 bg-white/5 overflow-hidden"
    >
      <div className="relative h-5 overflow-hidden">
        <div
          className={`flex flex-col transition-transform duration-300 ease-in-out ${
            isDark ? '-translate-y-5' : 'translate-y-0'
          }`}
        >
          <Sun className="size-5 shrink-0" />
          <Moon className="size-5 shrink-0" />
        </div>
      </div>

      <div className="relative h-5 overflow-hidden">
        <div
          className={`flex flex-col transition-transform duration-300 ease-in-out ${
            isDark ? '-translate-y-5' : 'translate-y-0'
          }`}
        >
          <span className="text-sm font-medium h-5 flex items-center">Light</span>
          <span className="text-sm font-medium h-5 flex items-center">Dark</span>
        </div>
      </div>
    </button>
  );
}