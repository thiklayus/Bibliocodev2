import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#E6D5B8' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center"
          >
            <motion.h1
              className="font-display text-4xl md:text-6xl font-bold tracking-tight text-glow"
              style={{ color: '#3D2B1F' }}
              animate={{
                textShadow: [
                  '0 0 10px rgba(139,90,43,0.2)',
                  '0 0 30px rgba(139,90,43,0.4)',
                  '0 0 10px rgba(139,90,43,0.2)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Bem-vindo ao Bibliocode
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-4 font-serif text-lg tracking-widest uppercase"
              style={{ color: '#6B4E37' }}
            >
              Bíblia, clássicos e conhecimento em um só lugar
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mx-auto mt-6 h-px w-48"
              style={{ background: '#8B5A2B' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
