
import { Home, Package, Users, BarChart3, UserCog, LogOut, Folder, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'PDV', path: '/' },
    { icon: Package, label: 'Produtos', path: '/produtos' },
    { icon: Folder, label: 'Grupos', path: '/grupos' },
    { icon: BarChart3, label: 'Estoque', path: '/estoque' },
    { icon: UserCog, label: 'Funcionários', path: '/funcionarios' },
    { icon: DollarSign, label: 'Financeiro', path: '/financeiro' },
    { icon: Users, label: 'Relatórios', path: '/relatorios' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950
        transform transition-transform duration-300 ease-out z-50 shadow-2xl
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:w-64 lg:h-screen
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-700 dark:border-slate-800">
            <h2 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PDV NEW RIFT
            </h2>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start h-12 text-left transition-all duration-200 rounded-xl ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
