
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const Login = () => {
  const [view, setView] = useState<'company' | 'user'>('company');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; speed: number; opacity: number; }[]>([]);
  const [connectors, setConnectors] = useState<{ id: number; x1: number; y1: number; x2: number; y2: number; opacity: number; }[]>([]);
  
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  // Create animated technology-themed particles and connections
  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3
    }));
    
    setParticles(newParticles);
    
    // Create connections between particles
    const newConnectors: typeof connectors = [];
    for (let i = 0; i < particleCount; i++) {
      const particleA = newParticles[i];
      
      // Connect to 1-3 nearest particles
      for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
        const particleB = newParticles[(i + j + 1) % particleCount];
        
        newConnectors.push({
          id: newConnectors.length,
          x1: particleA.x,
          y1: particleA.y,
          x2: particleB.x,
          y2: particleB.y,
          opacity: Math.random() * 0.2 + 0.1
        });
      }
    }
    
    setConnectors(newConnectors);
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y / 20) * 0.2,
      })).map(particle => {
        if (particle.y < -5) {
          return {
            ...particle,
            y: 105,
            x: Math.random() * 100
          };
        }
        return particle;
      }));
      
      // Update connectors based on new particle positions
      setConnectors(prev => {
        const updatedConnectors = [...prev];
        newParticles.forEach((particle, i) => {
          // Find connectors that use this particle
          updatedConnectors.forEach((connector, j) => {
            if (connector.x1 === particle.x && connector.y1 === particle.y) {
              updatedConnectors[j] = {
                ...connector,
                x1: newParticles[i].x,
                y1: newParticles[i].y
              };
            }
            if (connector.x2 === particle.x && connector.y2 === particle.y) {
              updatedConnectors[j] = {
                ...connector,
                x2: newParticles[i].x,
                y2: newParticles[i].y
              };
            }
          });
        });
        return updatedConnectors;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    // Just navigate to main page for demonstration
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Theme toggle button */}
      <button 
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm z-20 text-white hover:bg-white/20 transition-colors"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Animated particles */}
      {particles.map((particle) => (
        <div 
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-blue-400/30 dark:bg-blue-300/30 backdrop-blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transition: 'all 0.5s linear'
          }}
        />
      ))}

      {/* Connectors between particles */}
      <svg className="absolute inset-0 w-full h-full z-0">
        {connectors.map((connector) => (
          <line
            key={`connector-${connector.id}`}
            x1={`${connector.x1}%`}
            y1={`${connector.y1}%`}
            x2={`${connector.x2}%`}
            y2={`${connector.y2}%`}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
            strokeOpacity={connector.opacity}
          />
        ))}
      </svg>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            {/* Your New Rift logo */}
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

        {view === 'company' ? (
          <Card className="p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-xl shadow-blue-900/30 dark:shadow-blue-950/50 border-none rounded-xl animate-scale-in">
            <div className="flex mb-6 border-b border-slate-200 dark:border-slate-700">
              <button
                className={`pb-3 px-4 font-medium text-sm transition-colors duration-200 ${
                  view === 'company'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
                onClick={() => setView('company')}
              >
                Login da Empresa
              </button>
              <button
                className={`pb-3 px-4 font-medium text-sm transition-colors duration-200 ${
                  view === 'user'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
                onClick={() => setView('user')}
              >
                Login do Usuário
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">CNPJ ou Código</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Digite o CNPJ ou código da empresa"
                    value={companyCode}
                    onChange={(e) => setCompanyCode(e.target.value)}
                    className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="company-remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label htmlFor="company-remember" className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  Manter conectado
                </label>
              </div>
            </div>

            <Button 
              className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setView('user')}
            >
              Avançar
            </Button>
          </Card>
        ) : (
          <Card className="p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-xl shadow-blue-900/30 dark:shadow-blue-950/50 border-none rounded-xl animate-scale-in">
            <div className="flex mb-6 border-b border-slate-200 dark:border-slate-700">
              <button
                className={`pb-3 px-4 font-medium text-sm transition-colors duration-200 ${
                  view === 'company'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
                onClick={() => setView('company')}
              >
                Login da Empresa
              </button>
              <button
                className={`pb-3 px-4 font-medium text-sm transition-colors duration-200 ${
                  view === 'user'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
                onClick={() => setView('user')}
              >
                Login do Usuário
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Usuário</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Digite seu usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Checkbox 
                  id="user-remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <label htmlFor="user-remember" className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  Manter conectado
                </label>
              </div>
            </div>

            <Button 
              className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleLogin}
            >
              Entrar
            </Button>
          </Card>
        )}
      </div>
      
      <div className="text-blue-300/70 dark:text-blue-200/70 mt-4 text-sm">
        © 2025 New Rift Technology
      </div>
    </div>
  );
};

export default Login;
