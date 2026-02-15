import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Star, MessageSquare, Shield, LogOut, Check, X, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Suggestion {
  id: string;
  title: string;
  author: string;
  reason: string | null;
  submitted_email: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

interface RatingStats {
  book_key: string;
  avg_rating: number;
  count: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [ratingStats, setRatingStats] = useState<RatingStats[]>([]);
  const [tab, setTab] = useState<'overview' | 'suggestions' | 'ratings'>('overview');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = async () => {
    setLoadingData(true);
    const [sugRes, ratRes] = await Promise.all([
      supabase.from('book_suggestions').select('*').order('created_at', { ascending: false }),
      supabase.from('book_ratings').select('book_key, rating'),
    ]);

    if (sugRes.data) setSuggestions(sugRes.data);
    
    if (ratRes.data) {
      const stats: Record<string, { total: number; count: number }> = {};
      ratRes.data.forEach((r: any) => {
        if (!stats[r.book_key]) stats[r.book_key] = { total: 0, count: 0 };
        stats[r.book_key].total += r.rating;
        stats[r.book_key].count += 1;
      });
      setRatingStats(Object.entries(stats).map(([book_key, s]) => ({
        book_key,
        avg_rating: Math.round((s.total / s.count) * 10) / 10,
        count: s.count,
      })));
    }
    setLoadingData(false);
  };

  const updateSuggestion = async (id: string, status: 'approved' | 'rejected') => {
    await supabase.from('book_suggestions').update({ status, reviewed_at: new Date().toISOString() }).eq('id', id);
    loadData();
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent/50" />
      </div>
    );
  }

  const pendingCount = suggestions.filter(s => s.status === 'pending').length;

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-30 glass-nav border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Shield className="h-5 w-5 text-accent" />
            <h1 className="font-display text-lg font-bold text-foreground">Painel Administrativo</h1>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-sm font-serif text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-border">
          {[
            { key: 'overview' as const, label: 'Visão Geral', icon: BookOpen },
            { key: 'suggestions' as const, label: `Sugestões${pendingCount > 0 ? ` (${pendingCount})` : ''}`, icon: MessageSquare },
            { key: 'ratings' as const, label: 'Avaliações', icon: Star },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-serif border-b-2 transition-colors ${
                tab === t.key ? 'border-accent text-accent' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {loadingData ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-accent/50" />
          </div>
        ) : (
          <>
            {tab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="font-serif text-sm text-muted-foreground mb-1">Total Sugestões</p>
                  <p className="font-display text-3xl font-bold text-foreground">{suggestions.length}</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="font-serif text-sm text-muted-foreground mb-1">Pendentes</p>
                  <p className="font-display text-3xl font-bold text-accent">{pendingCount}</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                  <p className="font-serif text-sm text-muted-foreground mb-1">Livros Avaliados</p>
                  <p className="font-display text-3xl font-bold text-foreground">{ratingStats.length}</p>
                </div>
              </motion.div>
            )}

            {tab === 'suggestions' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {suggestions.length === 0 ? (
                  <p className="font-serif text-sm text-muted-foreground text-center py-8">Nenhuma sugestão recebida.</p>
                ) : (
                  suggestions.map(s => (
                    <div key={s.id} className="rounded-lg border border-border bg-card p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-base font-bold text-foreground">{s.title}</h3>
                          <p className="font-serif text-sm text-muted-foreground">{s.author}</p>
                          {s.reason && <p className="font-serif text-xs text-muted-foreground/70 mt-2">{s.reason}</p>}
                          <p className="font-serif text-[10px] text-muted-foreground/50 mt-2">
                            {new Date(s.created_at).toLocaleDateString('pt-BR')}
                            {s.submitted_email && ` • ${s.submitted_email}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {s.status === 'pending' ? (
                            <>
                              <button onClick={() => updateSuggestion(s.id, 'approved')} className="p-2 rounded-lg border border-border hover:bg-accent/10 text-accent transition-colors" title="Aprovar">
                                <Check className="h-4 w-4" />
                              </button>
                              <button onClick={() => updateSuggestion(s.id, 'rejected')} className="p-2 rounded-lg border border-border hover:bg-destructive/10 text-destructive transition-colors" title="Rejeitar">
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <span className={`text-xs font-serif px-2 py-1 rounded ${s.status === 'approved' ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'}`}>
                              {s.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {tab === 'ratings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {ratingStats.length === 0 ? (
                  <p className="font-serif text-sm text-muted-foreground text-center py-8">Nenhuma avaliação registrada.</p>
                ) : (
                  ratingStats.map(r => (
                    <div key={r.book_key} className="flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4">
                      <p className="font-serif text-sm text-foreground">{r.book_key}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-accent fill-accent" />
                          <span className="font-display text-sm font-bold text-foreground">{r.avg_rating}</span>
                        </div>
                        <span className="text-xs font-serif text-muted-foreground">({r.count})</span>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </>
        )}
      </main>

      <footer className="text-center py-6 border-t border-border mt-8">
        <p className="font-serif text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase">
          Bibliocode • Desenvolvido por Thiklayus • Engenharia Humanística para o Conhecimento
        </p>
      </footer>
    </div>
  );
};

export default Admin;
