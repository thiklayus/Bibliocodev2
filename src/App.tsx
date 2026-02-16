import BiblePage from "./pages/BiblePage";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CategoryPage from "./pages/CategoryPage";
import Reader from "./pages/Reader";
import Settings from "./pages/Settings";
import SuggestBook from "./pages/SuggestBook";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/bible" element={<BiblePage />} />
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/reader/:bookId" element={<Reader />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/suggest" element={<SuggestBook />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <SpeedInsights />
        <Analytics />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
