
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import PDV from "./pages/PDV";
import Produtos from "./pages/Produtos";
import Grupos from "./pages/Grupos";
import Estoque from "./pages/Estoque";
import Funcionarios from "./pages/Funcionarios";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
                  <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                  
                  <div className="flex flex-1 relative">
                    <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    
                    <main className="flex-1 overflow-auto lg:ml-0">
                      <Routes>
                        <Route path="/" element={<PDV />} />
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/grupos" element={<Grupos />} />
                        <Route path="/estoque" element={<Estoque />} />
                        <Route path="/funcionarios" element={<Funcionarios />} />
                        <Route path="/relatorios" element={<Relatorios />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
