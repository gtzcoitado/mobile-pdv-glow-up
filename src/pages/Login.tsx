
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Building2, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Loading from '@/components/Loading';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loginType, setLoginType] = useState<'company' | 'user'>('company');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Login realizado com sucesso!",
      description: `Bem-vindo ao sistema ${loginType === 'company' ? 'empresarial' : 'de usuário'}`,
    });
    
    setLoading(false);
    navigate('/');
  };

  const techParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Tech Animation Background */}
      <div className="absolute inset-0 overflow-hidden">
        {techParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400/20 dark:bg-blue-300/10 animate-pulse"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        
        {/* Floating tech elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-ping" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-green-400/40 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-purple-400/20 rounded-full animate-bounce" />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-yellow-400/30 rounded-full animate-ping" />
      </div>

      <Card className="w-full max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg shadow-2xl border-0">
        <div className="p-8 space-y-6">
          {/* Logo and Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <img 
                src="/lovable-uploads/b5425ad5-b90b-4dc0-8e59-5d6e2ae9c5a1.png" 
                alt="NEW RIFT Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">NEW RIFT</h1>
              <p className="text-slate-600 dark:text-slate-300">
                {loginType === 'company' ? 'Login Empresarial' : 'Login de Usuário'}
              </p>
            </div>
          </div>

          {/* Login Type Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setLoginType('company')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
                loginType === 'company'
                  ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Empresa
            </button>
            <button
              type="button"
              onClick={() => setLoginType('user')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
                loginType === 'user'
                  ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <User className="h-4 w-4" />
              Usuário
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {loginType === 'company' ? 'Email Empresarial' : 'Email'}
              </label>
              <Input
                type="email"
                placeholder={loginType === 'company' ? 'empresa@exemplo.com' : 'usuario@exemplo.com'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 dark:bg-slate-700 dark:border-slate-600"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 pr-12 dark:bg-slate-700 dark:border-slate-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
            >
              {loading ? (
                <Loading text="Entrando..." />
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            {loginType === 'company' ? (
              <p>Acesso exclusivo para empresas cadastradas</p>
            ) : (
              <p>Entre com suas credenciais de usuário</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
