
import { useState } from 'react';
import { Plus, UserCog, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Funcionarios = () => {
  const employees = [
    { id: '1', name: 'nathan', role: 'administrador' },
    { id: '2', name: 'teste', role: 'caixa' },
  ];

  const getRoleBadge = (role: string) => {
    const variants = {
      administrador: 'bg-purple-100 text-purple-800 border-purple-200',
      caixa: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    
    return variants[role as keyof typeof variants] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <UserCog className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">Funcionários</h1>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          Cadastrar funcionário
        </Button>
      </div>

      <div className="space-y-4">
        {employees.map(employee => (
          <Card key={employee.id} className="p-6 bg-gradient-to-r from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{employee.name}</h3>
                <Badge className={`mt-2 ${getRoleBadge(employee.role)}`}>
                  {employee.role}
                </Badge>
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

export default Funcionarios;
