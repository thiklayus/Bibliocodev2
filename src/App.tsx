import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Dashboard from '@/pages/Dashboard';
import BiblePage from '@/pages/BiblePage';
import CategoryPage from '@/pages/CategoryPage';
import Reader from '@/pages/Reader';
import SuggestBook from '@/pages/SuggestBook';
import Settings from '@/pages/Settings';
import SplashScreen from '@/components/SplashScreen';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const audio = new Audio('/entry.mp3'); // mantenha seu som
    audio.volume = 0.4;
    audio.play().catch(() => {});

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bible" element={<BiblePage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/reader/:bookId" element={<Reader />} />
        <Route path="/suggest" element={<SuggestBook />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
