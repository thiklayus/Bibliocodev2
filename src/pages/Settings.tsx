import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ThemeSelector from '@/components/ThemeSelector';
import BottomNav from '@/components/BottomNav';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 glass-nav border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">Configurações</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="font-display text-base font-bold text-foreground mb-4">Tema de Leitura</h2>
          <ThemeSelector />
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-foreground mb-2">Sobre</h2>
          <p className="font-serif text-sm text-muted-foreground leading-relaxed">
            O Bibliocode é uma biblioteca digital livre e premium, focada no prazer da leitura.
            Bíblia, clássicos da literatura brasileira e filosofia — tudo em um único lugar, com design
            inspirado na experiência tátil de um livro físico.
          </p>
          <p className="font-serif text-xs text-muted-foreground mt-4 tracking-widest">
            Bibliocode • Arquitetado por Thiklayus
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
