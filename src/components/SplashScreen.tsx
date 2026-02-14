import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [visible, setVisible] = useState(true);
  const { soundEnabled } = useTheme();
  const soundPlayed = useRef(false);

  useEffect(() => {
    // Play subtle entrance sound once per session
    if (soundEnabled && !soundPlayed.current && !sessionStorage.getItem('bibliocode-sound-played')) {
      soundPlayed.current = true;
      sessionStorage.setItem('bibliocode-sound-played', '1');
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.15);
        gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.8);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.5);
      } catch {}
    }

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete, soundEnabled]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center"
          >
            <motion.h1
              className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground text-glow"
              animate={{
                textShadow: [
                  '0 0 10px hsl(var(--accent) / 0.15)',
                  '0 0 30px hsl(var(--accent) / 0.25)',
                  '0 0 10px hsl(var(--accent) / 0.15)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Bibliocode
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-5 font-serif text-base tracking-widest text-muted-foreground"
            >
              Bíblia, clássicos e conhecimento: uma viagem sem limites.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mx-auto mt-6 h-px w-48 bg-accent/30"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
