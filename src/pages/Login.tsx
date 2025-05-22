
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, User } from 'lucide-react';

const Login = () => {
  const [view, setView] = useState<'company' | 'user'>('company');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [bubbles, setBubbles] = useState<{id: number, x: number, y: number, size: number, speed: number}[]>([]);
  
  const navigate = useNavigate();

  // Create animated background bubbles
  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 50 + 10,
      speed: Math.random() * 2 + 0.5
    }));
    
    setBubbles(newBubbles);
    
    const interval = setInterval(() => {
      setBubbles(prev => prev.map(bubble => ({
        ...bubble,
        y: bubble.y - bubble.speed * 0.2,
        x: bubble.x + Math.sin(bubble.y / 30) * 0.3,
      })).map(bubble => {
        if (bubble.y < -10) {
          return {
            ...bubble,
            y: 110,
            x: Math.random() * 100
          };
        }
        return bubble;
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    // Just navigate to main page for demonstration
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Animated bubbles */}
      {bubbles.map((bubble) => (
        <div 
          key={bubble.id}
          className="absolute rounded-full bg-blue-400/10 backdrop-blur-sm"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            transition: 'all 0.5s linear'
          }}
        />
      ))}

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <svg width="80" height="80" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
              <path d="M200 0L350 150H250L150 50L200 0Z" fill="white"/>
              <path d="M250 150V350C250 350 350 350 350 250C350 150 250 150 250 150Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            NEW RIFT
          </h1>
          <p className="text-blue-200 mt-2">Sistema de vendas</p>
        </div>

        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl shadow-blue-900/30 border-none rounded-xl animate-scale-in">
          <div className="flex mb-6 border-b border-slate-200">
            <button
              className={`pb-3 px-4 font-medium text-sm transition-colors duration-200 ${
                view === 'company'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              onClick={() => setView('company')}
            >
              Login da Empresa
            </button>
            <button
              className={`pb-3 px-4 font-medium text-sm transition-colors duration-200 ${
                view === 'user'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              onClick={() => setView('user')}
            >
              Login do Usuário
            </button>
          </div>

          {view === 'company' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">CNPJ ou Código</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Digite o CNPJ ou código da empresa"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                    className="pl-10 h-12 bg-slate-50 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="company-remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label htmlFor="company-remember" className="ml-2 text-sm text-slate-600">
                  Manter conectado
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Usuário</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 bg-slate-50 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-slate-50 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="user-remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label htmlFor="user-remember" className="ml-2 text-sm text-slate-600">
                  Manter conectado
                </label>
              </div>
            </div>
          )}

          <Button 
            className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleLogin}
          >
            {view === 'company' ? 'Avançar' : 'Entrar'}
          </Button>
        </Card>
      </div>
      
      <div className="text-blue-300/70 mt-4 text-sm">
        © 2025 New Rift Technology
      </div>
    </div>
  );
};

export default Login;
