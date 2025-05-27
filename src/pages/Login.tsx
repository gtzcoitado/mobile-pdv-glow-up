
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Building2, User, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/use-theme';
import Loading from '@/components/Loading';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [step, setStep] = useState<'company' | 'user'>('company');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyCode: '',
    username: '',
    password: ''
  });

  // Verificar se está no modo escuro (baseado no tema ou horário)
  const isDarkMode = theme === 'dark' || (theme === 'system' && (() => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  })());

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    if (theme === 'light') return Sun;
    if (theme === 'dark') return Moon;
    return isDarkMode ? Moon : Sun;
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Claro';
    if (theme === 'dark') return 'Escuro';
    return 'Auto';
  };

  const handleCompanyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyCode.trim()) {
      toast({
        title: "Erro",
        description: "Informe o código da empresa ou CNPJ",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Empresa encontrada!",
      description: "Agora faça o login do usuário",
    });
    
    setLoading(false);
    setStep('user');
  };

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo ao sistema",
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

  const ThemeIcon = getThemeIcon();

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-all duration-1000 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100'
    }`}>
      {/* Theme Toggle Button */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="sm"
        className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800/90 border-slate-600 text-slate-200 hover:bg-slate-700/90 hover:text-white' 
            : 'bg-white/90 border-blue-300 text-blue-700 hover:bg-blue-50/90 shadow-lg'
        }`}
      >
        <ThemeIcon className="h-4 w-4 mr-2" />
        {getThemeLabel()}
      </Button>

      {/* Tech Animation Background */}
      <div className="absolute inset-0 overflow-hidden">
        {techParticles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-pulse ${
              isDarkMode ? 'bg-blue-400/20' : 'bg-blue-500/20'
            }`}
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
        <div className={`absolute top-20 left-20 w-2 h-2 rounded-full animate-ping ${
          isDarkMode ? 'bg-cyan-400/30' : 'bg-cyan-500/40'
        }`} />
        <div className={`absolute top-40 right-32 w-1 h-1 rounded-full animate-pulse ${
          isDarkMode ? 'bg-green-400/40' : 'bg-green-500/50'
        }`} />
        <div className={`absolute bottom-32 left-40 w-3 h-3 rounded-full animate-bounce ${
          isDarkMode ? 'bg-purple-400/20' : 'bg-purple-500/30'
        }`} />
        <div className={`absolute bottom-20 right-20 w-2 h-2 rounded-full animate-ping ${
          isDarkMode ? 'bg-yellow-400/30' : 'bg-yellow-500/40'
        }`} />
      </div>

      <Card className={`w-full max-w-md shadow-2xl border-0 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-slate-800/95 backdrop-blur-lg border-slate-700/50' 
          : 'bg-white/95 backdrop-blur-lg border-blue-200/50 shadow-blue-200/25'
      }`}>
        <div className="p-8 space-y-6">
          {/* Logo and Header */}
          <div className="text-center space-y-4">
            <div className={`mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isDarkMode ? 'shadow-lg shadow-blue-500/25' : 'shadow-lg shadow-blue-400/30'
            }`}>
              <img 
                src="/lovable-uploads/b5425ad5-b90b-4dc0-8e59-5d6e2ae9c5a1.png" 
                alt="NEW RIFT Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>NEW RIFT</h1>
              <p className={`transition-colors duration-500 ${
                isDarkMode ? 'text-slate-300' : 'text-blue-600'
              }`}>
                {step === 'company' ? 'Código da Empresa' : 'Login de Usuário'}
              </p>
            </div>
          </div>

          {step === 'company' ? (
            /* Company Code Form */
            <form onSubmit={handleCompanyLogin} className="space-y-4">
              <div className="space-y-2">
                <label className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-300' : 'text-blue-700'
                }`}>
                  Código de empresa ou CNPJ
                </label>
                <Input
                  type="text"
                  placeholder="Digite o código da empresa ou CNPJ"
                  value={formData.companyCode}
                  onChange={(e) => setFormData({ ...formData, companyCode: e.target.value })}
                  className={`h-12 transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-slate-700/80 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20' 
                      : 'bg-blue-50/80 border-blue-300 text-blue-900 placeholder:text-blue-500 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300"
              >
                {loading ? (
                  <Loading text="Verificando..." />
                ) : (
                  <>
                    <Building2 className="mr-2 h-5 w-5" />
                    Continuar
                  </>
                )}
              </Button>
            </form>
          ) : (
            /* User Login Form */
            <form onSubmit={handleUserLogin} className="space-y-4">
              <div className="space-y-2">
                <label className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-300' : 'text-blue-700'
                }`}>
                  Nome de usuário
                </label>
                <Input
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className={`h-12 transition-all duration-500 ${
                    isDarkMode 
                      ? 'bg-slate-700/80 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20' 
                      : 'bg-blue-50/80 border-blue-300 text-blue-900 placeholder:text-blue-500 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-medium transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-300' : 'text-blue-700'
                }`}>Senha</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`h-12 pr-12 transition-all duration-500 ${
                      isDarkMode 
                        ? 'bg-slate-700/80 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20' 
                        : 'bg-blue-50/80 border-blue-300 text-blue-900 placeholder:text-blue-500 focus:border-blue-500 focus:ring-blue-500/20'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-500 ${
                      isDarkMode 
                        ? 'text-slate-400 hover:text-slate-200' 
                        : 'text-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('company')}
                  className={`flex-1 h-12 transition-all duration-500 ${
                    isDarkMode 
                      ? 'border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-slate-200 bg-slate-800/50' 
                      : 'border-blue-300 text-blue-600 hover:bg-blue-50 bg-blue-50/50'
                  }`}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-300"
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
              </div>
            </form>
          )}

          {/* Footer */}
          <div className={`text-center text-sm transition-colors duration-500 ${
            isDarkMode ? 'text-slate-400' : 'text-blue-500'
          }`}>
            {step === 'company' ? (
              <p>Digite o código da empresa para continuar</p>
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
