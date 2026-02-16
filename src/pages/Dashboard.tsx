import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookMarked } from 'lucide-react';
import { useMemo, useCallback } from 'react';

import BookCard from '@/components/BookCard';
import BottomNav from '@/components/BottomNav';
import ThemeSelector from '@/components/ThemeSelector';

const Dashboard = () => {
  const navigate = useNavigate();

  // 🔒 Navegação centralizada (evita erro futuro)
  const handleBookNavigation = useCallback(
    (bookId: string) => {
      if (bookId === 'bible') {
        navigate('/bible');
        return;
      }

      navigate(`/reader/${bookId}`);
    },
    [navigate]
  );

  // 📚 Categorias memorizadas (evita recriação desnecessária)
  const categories = useMemo(
    () => [
      {
        title: 'Escrituras Sagradas',
        books: [
          {
            id: 'bible',
            title: 'Bíblia Sagrada ACF',
            author: 'Almeida Corrigida Fiel',
            emoji: '✝️',
          },
        ],
      },
      {
        title: 'Literatura Brasileira',
        books: [
          {
            id: 'gutenberg-55752',
            title: 'Dom Casmurro',
            author: 'Machado de Assis',
            emoji: '📖',
          },
          {
            id: 'gutenberg-54829',
            title: 'Memórias Póstumas de Brás Cubas',
            author: 'Machado de Assis',
            emoji: '📜',
          },
        ],
      },
      {
        title: 'Filosofia & Estratégia',
        books: [
          {
            id: 'gutenberg-1497',
            title: 'A República',
            author: 'Platão',
            emoji: '🏛️',
          },
          {
            id: 'local-0',
            title: 'Meditações',
            author: 'Marco Aurélio',
            emoji: '🧘',
          },
          {
            id: 'local-1',
            title: 'A Arte da Guerra',
            author: 'Sun Tzu',
            emoji: '⚔️',
          },
          {
            id: 'local-2',
            title: 'O Príncipe',
            author: 'Nicolau Maquiavel',
            emoji: '👑',
          },
        ],
      },
      {
        title: 'Literatura Universal',
        books: [
          {
            id: 'local-3',
            title: 'Divina Comédia',
            author: 'Dante Alighieri',
            emoji: '🔥',
          },
          {
            id: 'local-4',
            title: 'Orgulho e Preconceito',
            author: 'Jane Austen',
            emoji: '💎',
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="min-h-screen pb-20">

      {/* HEADER FIXO */}
      <header className="sticky top-0 z-30 glass-nav border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-lg font-bold text-foreground">
            Bibliocode
          </h1>
          <ThemeSelector />
        </div>
      </header>

      {/* HERO INSTITUCIONAL */}
      <div className="max-w-4xl mx-auto px-4 mt-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-2xl font-bold tracking-tight"
        >
          Bíblia, clássicos e conhecimento
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-serif text-sm text-muted-foreground mt-3"
        >
          Uma biblioteca digital projetada para leitura profunda e organização inteligente.
        </motion.p>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        {categories.map((category, index) => (
          <motion.section
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <h2 className="font-display text-lg font-bold text-foreground mb-4 tracking-tight">
              {category.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.books.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  emoji={book.emoji}
                  onClick={() => handleBookNavigation(book.id)}
                />
              ))}
            </div>
          </motion.section>
        ))}

      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 border-t border-border mt-8">
        <p className="font-serif text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase">
          Bibliocode • Desenvolvido por Thiklayus • Engenharia Humanística para o Conhecimento
        </p>
      </footer>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
