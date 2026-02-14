import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Feather, Landmark, Sword, Globe } from 'lucide-react';

const cards = [
  {
    title: 'Fé',
    subtitle: 'Escrituras Sagradas',
    description: 'A Bíblia Sagrada na versão Almeida Corrigida Fiel.',
    icon: BookOpen,
    path: '/category/bible',
  },
  {
    title: 'Cultura',
    subtitle: 'Literatura Brasileira',
    description: 'Machado de Assis e as grandes obras da literatura nacional.',
    icon: Feather,
    path: '/category/classics',
  },
  {
    title: 'Sabedoria',
    subtitle: 'Filosofia & Estratégia',
    description: 'Platão, Marco Aurélio, Sun Tzu e Maquiavel.',
    icon: Landmark,
    path: '/category/philosophy',
  },
  {
    title: 'Universais',
    subtitle: 'Literatura Universal',
    description: 'Dante, Jane Austen e as obras que moldaram civilizações.',
    icon: Globe,
    path: '/category/universal',
  },
];

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight">
          Bibliocode
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 font-serif text-muted-foreground text-sm md:text-base tracking-wide max-w-md mx-auto"
        >
          Bíblia, clássicos e conhecimento: uma viagem sem limites.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto mt-5 h-px w-24 bg-border"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 font-serif text-muted-foreground/60 text-xs tracking-[0.15em] uppercase"
        >
          Coleção Curada — Obras Fundamentais da Civilização
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl w-full">
        {cards.map((card, i) => (
          <motion.button
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
            onClick={() => navigate(card.path)}
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 text-left transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_40px_hsl(var(--accent)/0.06)] active:scale-[0.98]"
          >
            <card.icon className="h-6 w-6 text-accent/70 mb-4 transition-colors group-hover:text-accent" />
            <h2 className="font-display text-xl font-bold text-foreground mb-1 tracking-tight">
              {card.title}
            </h2>
            <p className="font-serif text-xs text-accent/80 font-semibold mb-3 tracking-wide uppercase">
              {card.subtitle}
            </p>
            <p className="font-serif text-sm text-muted-foreground leading-relaxed">
              {card.description}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.button>
        ))}
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-16 text-center space-y-2"
      >
        <p className="text-[10px] text-muted-foreground/50 font-serif tracking-[0.2em] uppercase">
          Bibliocode • Desenvolvido por Thiklayus • Engenharia Humanística para o Conhecimento
        </p>
      </motion.footer>
    </div>
  );
};

export default WelcomeScreen;
