import { motion } from 'framer-motion';

interface BookCardProps {
  title: string;
  author: string;
  emoji: string;
  onClick: () => void;
}

const BookCard = ({ title, author, emoji, onClick }: BookCardProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="book-card book-card-shadow rounded-lg border border-border bg-card p-6 text-left w-full"
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="font-display text-lg font-bold text-card-foreground leading-snug mb-1">
        {title}
      </h3>
      <p className="font-serif text-sm text-muted-foreground">{author}</p>
    </motion.button>
  );
};

export default BookCard;
