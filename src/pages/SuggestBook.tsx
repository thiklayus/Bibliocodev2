import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Loader2, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import BottomNav from '@/components/BottomNav';

const SuggestBook = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    setLoading(true);
    setError('');

    const { error: err } = await supabase.from('book_suggestions').insert({
      title: title.trim(),
      author: author.trim(),
      reason: reason.trim() || null,
      submitted_by: user?.id || null,
      submitted_email: user?.email || null,
    });

    if (err) {
      setError('Erro ao enviar sugestão. Faça login e tente novamente.');
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-sm">
          <div className="text-4xl mb-4">📬</div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Sugestão Enviada!</h2>
          <p className="font-serif text-sm text-muted-foreground mb-6">
            Sua sugestão será analisada pela equipe editorial. Obrigado por contribuir com o Bibliocode.
          </p>
          <button onClick={() => navigate('/dashboard')} className="font-serif text-sm text-accent hover:underline">
            Voltar à biblioteca
          </button>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-30 glass-nav border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">Sugerir um Livro</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="font-serif text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Aviso Legal:</strong> O Bibliocode aceita apenas obras em domínio público 
            (autor falecido há mais de 70 anos) ou com licença aberta compatível. Toda sugestão será verificada antes da publicação.
          </p>
        </div>

        {!user && (
          <div className="rounded-lg border border-border bg-card p-4 mb-6 text-center">
            <p className="font-serif text-sm text-muted-foreground mb-3">Faça login para enviar sugestões.</p>
            <button onClick={() => navigate('/auth')} className="font-serif text-sm text-accent hover:underline">
              Entrar ou criar conta
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-serif text-sm text-foreground mb-1 block">Título da Obra *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              maxLength={200}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-serif text-sm focus:outline-none focus:ring-1 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="font-serif text-sm text-foreground mb-1 block">Autor *</label>
            <input
              type="text"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
              maxLength={200}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-serif text-sm focus:outline-none focus:ring-1 focus:ring-accent/50"
            />
          </div>
          <div>
            <label className="font-serif text-sm text-foreground mb-1 block">Por que incluir esta obra?</label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              maxLength={500}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-serif text-sm focus:outline-none focus:ring-1 focus:ring-accent/50 resize-none"
            />
          </div>

          {error && <p className="font-serif text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading || !user}
            className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-accent/90 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Enviar Sugestão
          </button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
};

export default SuggestBook;
