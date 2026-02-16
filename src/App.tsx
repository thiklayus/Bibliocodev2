import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

        {/* Home oficial */}
        <Route path="/" element={<Dashboard />} />

        {/* Bíblia */}
        <Route path="/bible" element={<BiblePage />} />

        {/* Categorias */}
        <Route path="/category/:categoryId" element={<CategoryPage />} />

        {/* Leitura livros */}
        <Route path="/reader/:bookId" element={<Reader />} />

        {/* Extras */}
        <Route path="/suggest" element={<SuggestBook />} />
        <Route path="/settings" element={<Settings />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
