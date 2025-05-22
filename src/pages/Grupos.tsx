
import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const Grupos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const groups = [
    { id: '1', name: 'Geral' },
    { id: '2', name: 'teste' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Cadastro de Grupos</h1>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          Criar grupo
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
        <Input
          placeholder="Filtrar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-400"
        />
      </div>

      <div className="space-y-4">
        {groups.map(group => (
          <Card key={group.id} className="p-6 bg-gradient-to-r from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{group.name}</h3>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600 rounded-lg px-6"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 rounded-lg px-6"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Grupos;
