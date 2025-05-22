
import { useState } from 'react';
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
  
  const navigate = useNavigate();

  const handleLogin = () => {
    // Just navigate to main page for demonstration
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PDV NEW RIFT
          </h1>
          <p className="text-slate-500 mt-2">Sistema de vendas</p>
        </div>

        <Card className="p-6 bg-white shadow-xl shadow-blue-500/5 border-none">
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
                    className="pl-10 h-12 bg-slate-50"
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
                    className="pl-10 h-12 bg-slate-50"
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
                    className="pl-10 h-12 bg-slate-50"
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
            className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleLogin}
          >
            {view === 'company' ? 'Avançar' : 'Entrar'}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Login;
