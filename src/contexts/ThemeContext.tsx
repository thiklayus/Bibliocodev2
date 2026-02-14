import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light' | 'sepia';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
  soundEnabled: true,
  setSoundEnabled: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('bibliocode-theme') as ThemeMode) || 'dark';
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const v = localStorage.getItem('bibliocode-sound');
    return v !== 'false';
  });

  useEffect(() => {
    localStorage.setItem('bibliocode-theme', theme);
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-sepia');
    if (theme === 'light') root.classList.add('theme-light');
    if (theme === 'sepia') root.classList.add('theme-sepia');
    // dark is the default (no class needed)
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('bibliocode-sound', String(soundEnabled));
  }, [soundEnabled]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, soundEnabled, setSoundEnabled }}>
      {children}
    </ThemeContext.Provider>
  );
};
