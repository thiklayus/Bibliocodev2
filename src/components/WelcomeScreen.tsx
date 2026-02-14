import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Feather, Landmark } from 'lucide-react';

const cards = [
  {
    title: 'Fé',
    subtitle: 'Escrituras Sagradas',
    description: 'A Bíblia Sagrada completa na versão Almeida Corrigida Fiel.',
    icon: BookOpen,
    path: '/category/bible',
    gradient: 'from-amber-800/20 to-amber-900/30',
  },
  {
    title: 'Cultura',
    subtitle: 'Clássicos Brasileiros',
    description: 'Machado de Assis e as grandes obras da literatura nacional.',
    icon: Feather,
    path: '/category/classics',
    gradient: 'from-emerald-800/20 to-emerald-900/30',
  },
  {
    title: 'Sabedoria',
    subtitle: 'Filosofia Clássica',
    description: 'Platão, Sócrates e os fundamentos do pensamento ocidental.',
    icon: Landmark,
    path: '/category/philosophy',
    gradient: 'from-indigo-800/20 to-indigo-900/30',
  },
];

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight">
          Bibliocode
        </h1>
        <p className="mt-3 font-serif text-muted-foreground text-sm md:text-base tracking-wide">
          Escolha seu caminho de leitura
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-border" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {cards.map((card, i) => (
          <motion.button
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            onClick={() => navigate(card.path)}
            className={`group relative overflow-hidden rounded-lg border border-border bg-gradient-to-br ${card.gradient} p-8 text-left transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`}
          >
            <card.icon className="h-8 w-8 text-accent mb-4 transition-transform group-hover:scale-110" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-1">
              {card.title}
            </h2>
            <p className="font-serif text-sm text-accent font-semibold mb-3">
              {card.subtitle}
            </p>
            <p className="font-serif text-sm text-muted-foreground leading-relaxed">
              {card.description}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-xs text-muted-foreground font-serif tracking-widest"
      >
        Bibliocode • Arquitetado por Thiklayus
      </motion.p>
    </div>
  );
};

export default WelcomeScreen;
