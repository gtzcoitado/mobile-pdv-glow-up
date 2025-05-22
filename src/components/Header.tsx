
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-4 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/10"></div>
      <div className="relative flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-white/10 transition-all duration-200"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <div className="flex items-center">
          <div className="mr-2 hidden sm:block">
            <svg width="24" height="24" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
              <path d="M200 0L350 150H250L150 50L200 0Z" fill="white"/>
              <path d="M250 150V350C250 350 350 350 350 250C350 150 250 150 250 150Z" fill="white"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            NEW RIFT
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
