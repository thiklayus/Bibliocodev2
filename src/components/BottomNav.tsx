import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Settings, Mail } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: Home, label: 'Início', path: '/dashboard' },
    { icon: BookOpen, label: 'Leitura', path: '/' },
    { icon: Settings, label: 'Ajustes', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-border">
      <div className="flex items-center justify-around py-3 max-w-lg mx-auto">
        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors duration-300 ${
                active ? 'text-accent' : 'text-muted-foreground/60 hover:text-muted-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-serif tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
