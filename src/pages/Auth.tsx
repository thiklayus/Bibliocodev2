import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        setError('Credenciais inválidas. Tente novamente.');
      } else {
        navigate('/dashboard');
      }
    } else {
      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password, displayName);
      if (error) {
        setError('Erro ao criar conta. Tente novamente.');
      } else {
        setSuccess('Conta criada! Verifique seu e-mail para confirmar.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground mb-8 flex items-center gap-2 text-sm font-serif">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </h1>
        <p className="font-serif text-sm text-muted-foreground mb-8">
          {isLogin ? 'Acesse sua biblioteca pessoal.' : 'Junte-se ao Bibliocode.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Nome de exibição"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground font-serif text-sm focus:outline-none focus:ring-1 focus:ring-accent/50"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground font-serif text-sm focus:outline-none focus:ring-1 focus:ring-accent/50"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-foreground font-serif text-sm focus:outline-none focus:ring-1 focus:ring-accent/50"
            />
          </div>

          {error && <p className="text-sm font-serif text-destructive">{error}</p>}
          {success && <p className="text-sm font-serif text-accent">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-accent text-accent-foreground font-display font-bold text-sm tracking-wide transition-colors hover:bg-accent/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <p className="text-center mt-6 font-serif text-sm text-muted-foreground">
          {isLogin ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} className="text-accent hover:underline">
            {isLogin ? 'Criar conta' : 'Entrar'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
