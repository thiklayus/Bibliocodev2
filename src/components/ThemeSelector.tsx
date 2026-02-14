import { useTheme } from '@/contexts/ThemeContext';
import { Sun, BookOpen, Moon } from 'lucide-react';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: 'light' as const, label: 'Claro', icon: Sun },
    { key: 'sepia' as const, label: 'Sépia', icon: BookOpen },
    { key: 'dark' as const, label: 'Noturno', icon: Moon },
  ];

  return (
    <div className="flex items-center gap-2">
      {themes.map((t) => (
        <button
          key={t.key}
          onClick={() => setTheme(t.key)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-serif border transition-all ${
            theme === t.key
              ? 'border-accent bg-accent text-accent-foreground'
              : 'border-border text-muted-foreground hover:border-accent/50'
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
