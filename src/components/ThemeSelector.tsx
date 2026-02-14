import { useTheme } from '@/contexts/ThemeContext';
import { Sun, BookOpen, Moon } from 'lucide-react';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: 'dark' as const, label: 'Noturno', icon: Moon },
    { key: 'sepia' as const, label: 'Sépia', icon: BookOpen },
    { key: 'light' as const, label: 'Claro', icon: Sun },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {themes.map((t) => (
        <button
          key={t.key}
          onClick={() => setTheme(t.key)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-serif border transition-all duration-300 ${
            theme === t.key
              ? 'border-accent/50 bg-accent/10 text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
          }`}
        >
          <t.icon className="h-3.5 w-3.5" />
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
