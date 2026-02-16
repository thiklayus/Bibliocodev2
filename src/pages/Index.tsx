import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SplashScreen from '@/components/SplashScreen';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const audio = new Audio('/entry.mp3'); // mantenha seu áudio
    audio.volume = 0.4;
    audio.play().catch(() => {});

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return <Navigate to="/dashboard" replace />;
};

export default Index;
