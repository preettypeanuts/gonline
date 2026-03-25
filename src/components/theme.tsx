'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitch() {
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
      className="relative w-11 h-11 min-w-11 min-h-11 aspect-square rounded-full bg-black dark:bg-white overflow-hidden transition-colors duration-300"
    >
      <div
        className={`cursor-pointer flex flex-col justify-center items-center transition-transform duration-300 ease-in-out
        ${isDark ? '-translate-y-9.5' : 'translate-y-0.5'}`}
      >
        {/* Light Mode */}
        <div className="w-10 h-10 flex items-center justify-center">
          <Sun className="text-white dark:text-black fill-white dark:fill-black size-4.5" />
        </div>

        {/* Dark Mode */}
        <div className="w-10 h-10 flex items-center justify-center">
          <Moon className="text-white dark:text-black fill-white dark:fill-black size-4.5 " />
        </div>

      </div>
    </button>
  );
}
