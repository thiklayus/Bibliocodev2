import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Lightbulb, Settings } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur">
      <div className="max-w-4xl mx-auto flex justify-around py-3">

        {/* Início */}
        <button
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center text-xs ${
            isActive('/dashboard') ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <Home className="h-5 w-5 mb-1" />
          Início
        </button>

        {/* Leitura */}
        <button
          onClick={() => navigate('/bible')}
          className={`flex flex-col items-center text-xs ${
            isActive('/bible') ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <BookOpen className="h-5 w-5 mb-1" />
          Leitura
        </button>

        {/* Sugerir */}
        <button
          onClick={() => navigate('/suggest')}
          className={`flex flex-col items-center text-xs ${
            isActive('/suggest') ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <Lightbulb className="h-5 w-5 mb-1" />
          Sugerir
        </button>

        {/* Ajustes */}
        <button
          onClick={() => navigate('/settings')}
          className={`flex flex-col items-center text-xs ${
            isActive('/settings') ? 'text-accent' : 'text-muted-foreground'
          }`}
        >
          <Settings className="h-5 w-5 mb-1" />
          Ajustes
        </button>

      </div>
    </nav>
  );
};

export default BottomNav;
