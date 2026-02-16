import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import WelcomeScreen from '@/pages/WelcomeScreen';
import CategoryPage from '@/pages/CategoryPage';
import Reader from '@/pages/Reader';
import SuggestBook from '@/pages/SuggestBook';
import Settings from '@/pages/Settings';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Página principal */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard principal */}
        <Route path="/dashboard" element={<WelcomeScreen />} />

        {/* Categorias */}
        <Route path="/category/:categoryId" element={<CategoryPage />} />

        {/* Leitura */}
        <Route path="/reader/:bookId" element={<Reader />} />

        {/* Sugestão */}
        <Route path="/suggest" element={<SuggestBook />} />

        {/* Configurações */}
        <Route path="/settings" element={<Settings />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
