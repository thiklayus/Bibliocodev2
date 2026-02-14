import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'light' | 'sepia' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light', setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('bibliocode-theme') as ThemeMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('bibliocode-theme', theme);
    const root = document.documentElement;
    root.classList.remove('theme-sepia', 'theme-dark');
    if (theme === 'sepia') root.classList.add('theme-sepia');
    if (theme === 'dark') root.classList.add('theme-dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
