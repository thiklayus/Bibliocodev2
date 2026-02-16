import { useState, useCallback } from 'react';
import SplashScreen from '@/components/SplashScreen';
import WelcomeScreen from '@/components/WelcomeScreen';

const Index = () => {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
      {splashDone && <WelcomeScreen />}
    </>
  );
};

export default Index;
import { Navigate } from 'react-router-dom';

const Index = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Index;
