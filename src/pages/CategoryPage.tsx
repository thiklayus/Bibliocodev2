import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import BookCard from '@/components/BookCard';
import BottomNav from '@/components/BottomNav';

const categoriesData: Record<string, { title: string; emoji: string; books: { id: string; title: string; author: string; emoji: string }[] }> = {
  bible: {
    title: 'Escrituras Sagradas',
    emoji: '📖',
    books: [{ id: 'bible', title: 'Bíblia Sagrada ACF', author: 'Almeida Corrigida Fiel', emoji: '✝️' }],
  },
  classics: {
    title: 'Clássicos Brasileiros',
    emoji: '🖋️',
    books: [
      { id: 'gutenberg-55752', title: 'Dom Casmurro', author: 'Machado de Assis', emoji: '📖' },
      { id: 'gutenberg-54829', title: 'Memórias Póstumas de Brás Cubas', author: 'Machado de Assis', emoji: '📜' },
    ],
  },
  philosophy: {
    title: 'Filosofia Clássica',
    emoji: '🏛️',
    books: [
      { id: 'gutenberg-1497', title: 'A República', author: 'Platão', emoji: '🏛️' },
    ],
  },
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = categoriesData[categoryId || ''];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-serif text-muted-foreground">Categoria não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 glass-nav border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">
            {category.emoji} {category.title}
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {category.books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <BookCard
                title={book.title}
                author={book.author}
                emoji={book.emoji}
                onClick={() => navigate(`/reader/${book.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CategoryPage;
