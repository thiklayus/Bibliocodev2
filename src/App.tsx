import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import BiblePage from '@/pages/BiblePage';
import CategoryPage from '@/pages/CategoryPage';
import Reader from '@/pages/Reader';
import SuggestBook from '@/pages/SuggestBook';
import Settings from '@/pages/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Entrada oficial */}
        <Route path="/" element={<Index />} />

        {/* Home real */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Bíblia isolada */}
        <Route path="/bible" element={<BiblePage />} />

        {/* Categorias */}
        <Route path="/category/:categoryId" element={<CategoryPage />} />

        {/* Leitura de livros (não Bíblia) */}
        <Route path="/reader/:bookId" element={<Reader />} />

        {/* Extras */}
        <Route path="/suggest" element={<SuggestBook />} />
        <Route path="/settings" element={<Settings />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
