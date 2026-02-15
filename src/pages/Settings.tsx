import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Volume2, VolumeX } from 'lucide-react';
import ThemeSelector from '@/components/ThemeSelector';
import BottomNav from '@/components/BottomNav';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const navigate = useNavigate();
  const { soundEnabled, setSoundEnabled } = useTheme();

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 glass-nav border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">
            Configurações
          </h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 space-y-10">
        <section>
          <h2 className="font-display text-base font-bold text-foreground mb-4">
            Tema de Leitura
          </h2>
          <ThemeSelector />
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-foreground mb-4">
            Som de Entrada
          </h2>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-serif text-foreground transition-colors hover:bg-muted"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-accent" />
            ) : (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
            {soundEnabled
              ? 'Ativado — som sutil ao entrar'
              : 'Desativado'}
          </button>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-foreground mb-2">
            Sobre
          </h2>
          <p className="font-serif text-sm text-muted-foreground leading-relaxed">
            O Bibliocode é uma Biblioteca Digital de Referência, dedicada a preservar conhecimento essencial
            e facilitar a leitura profunda. Cada obra presente foi cuidadosamente selecionada — apenas textos
            que moldaram civilizações, em domínio público, com licença aberta compatível.
          </p>
          <p className="font-serif text-sm text-muted-foreground leading-relaxed mt-3">
            Missão: transformar dispositivos em instrumentos de contemplação.
          </p>
        </section>

        <section>
          <h2 className="font-display text-base font-bold text-foreground mb-3">
            Contato & Feedback
          </h2>
          <a
            href="mailto:thiklayus.bibliocode@gmail.com"
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-serif text-foreground transition-colors hover:bg-muted"
          >
            <Mail className="h-4 w-4 text-accent/70" />
            thiklayus.bibliocode@gmail.com
          </a>
        </section>

        <section>
          <p className="font-serif text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase">
            Bibliocode • Desenvolvido por Thiklayus • Engenharia Humanística para o Conhecimento
          </p>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Settings;
              
