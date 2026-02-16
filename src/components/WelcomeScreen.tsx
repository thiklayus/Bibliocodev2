import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Landmark, Library } from 'lucide-react';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Fé',
      subtitle: 'Escrituras Sagradas',
      description: 'A Bíblia Sagrada na versão Almeida Corrigida Fiel.',
      icon: BookOpen,
      path: '/bible', // 🔥 CORRIGIDO AQUI
    },
    {
      title: 'Brasil',
      subtitle: 'Literatura Brasileira',
      description: 'Machado de Assis e as grandes obras nacionais.',
      icon: Landmark,
      path: '/dashboard',
    },
    {
      title: 'Sabedoria',
      subtitle: 'Filosofia & Estratégia',
      description: 'Platão, Marco Aurélio, Sun Tzu e Maquiavel.',
      icon: Library,
      path: '/dashboard',
    },
    {
      title: 'Universal',
      subtitle: 'Clássicos Universais',
      description: 'Dante, Jane Austen e obras fundamentais.',
      icon: Globe,
      path: '/dashboard',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl font-bold text-center mb-8"
      >
        Bibliocode
      </motion.h1>

      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.button
              key={card.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => navigate(card.path)}
              className="p-6 rounded-xl border border-border bg-card hover:bg-accent/10 transition-colors text-left"
            >
              <div className="flex items-center gap-4 mb-3">
                <Icon className="h-6 w-6 text-accent" />
                <div>
                  <h2 className="font-display text-lg font-bold">
                    {card.title}
                  </h2>
                  <p className="font-serif text-xs text-muted-foreground uppercase tracking-wide">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              <p className="font-serif text-sm text-muted-foreground">
                {card.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomeScreen;
