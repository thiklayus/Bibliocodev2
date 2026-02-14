import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookMarked } from 'lucide-react';
import BookCard from '@/components/BookCard';
import BottomNav from '@/components/BottomNav';
import ThemeSelector from '@/components/ThemeSelector';
import { getLastRead } from '@/lib/reading-progress';

const Dashboard = () => {
  const navigate = useNavigate();
  const lastRead = getLastRead();

  const categories = [
    {
      title: 'Escrituras Sagradas',
      books: [{ id: 'bible', title: 'Bíblia Sagrada ACF', author: 'Almeida Corrigida Fiel', emoji: '✝️' }],
    },
    {
      title: 'Literatura Brasileira',
      books: [
        { id: 'gutenberg-55752', title: 'Dom Casmurro', author: 'Machado de Assis', emoji: '📖' },
        { id: 'gutenberg-54829', title: 'Memórias Póstumas de Brás Cubas', author: 'Machado de Assis', emoji: '📜' },
      ],
    },
    {
      title: 'Filosofia & Estratégia',
      books: [
        { id: 'gutenberg-1497', title: 'A República', author: 'Platão', emoji: '🏛️' },
        { id: 'local-0', title: 'Meditações', author: 'Marco Aurélio', emoji: '🧘' },
        { id: 'local-1', title: 'A Arte da Guerra', author: 'Sun Tzu', emoji: '⚔️' },
        { id: 'local-2', title: 'O Príncipe', author: 'Nicolau Maquiavel', emoji: '👑' },
      ],
    },
    {
      title: 'Literatura Universal',
      books: [
        { id: 'local-3', title: 'Divina Comédia', author: 'Dante Alighieri', emoji: '🔥' },
        { id: 'local-4', title: 'Orgulho e Preconceito', author: 'Jane Austen', emoji: '💎' },
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 glass-nav border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">Bibliocode</h1>
          <ThemeSelector />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-10">
        {lastRead && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => navigate(`/reader/${lastRead.bookId}`)}
              className="w-full flex items-center gap-4 rounded-lg border border-accent/20 bg-accent/5 p-4 text-left hover:bg-accent/10 transition-colors"
            >
              <BookMarked className="h-6 w-6 text-accent/70 flex-shrink-0" />
              <div>
                <p className="font-serif text-sm text-accent font-semibold">Continuar Lendo</p>
                <p className="font-serif text-xs text-muted-foreground">{lastRead.title}</p>
              </div>
            </button>
          </motion.div>
        )}

        <div className="text-center">
          <p className="font-serif text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase">
            Coleção Curada — Obras Fundamentais da Civilização
          </p>
        </div>

        {categories.map((cat, ci) => (
          <motion.section
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.08 }}
          >
            <h2 className="font-display text-lg font-bold text-foreground mb-4 tracking-tight">{cat.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.books.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  emoji={book.emoji}
                  onClick={() => navigate(`/reader/${book.id}`)}
                />
              ))}
            </div>
          </motion.section>
        ))}
      </main>

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
