
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';

interface GroupFormData {
  name: string;
}

const Grupos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingGroup, setEditingGroup] = useState<any | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<GroupFormData>();

  const groups = [
    { id: '1', name: 'Geral' },
    { id: '2', name: 'Bebidas' },
    { id: '3', name: 'Lanches' },
    { id: '4', name: 'teste' },
  ];

  const handleAddGroup = () => {
    setIsAdding(true);
    setEditingGroup(null);
    reset({ name: '' });
  };

  const handleEditGroup = (group: any) => {
    setIsAdding(false);
    setEditingGroup(group);
    setValue('name', group.name);
  };

  const handleCancelEdit = () => {
    setIsAdding(false);
    setEditingGroup(null);
    reset();
  };

  const onSubmit = (data: GroupFormData) => {
    console.log(isAdding ? 'Adding group:' : 'Updating group:', data);
    // Here you would add or update the group in the database
    handleCancelEdit();
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Cadastro de Grupos</h1>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg rounded-xl w-full sm:w-auto"
          onClick={handleAddGroup}
        >
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

      {isAdding && (
        <Card className="p-6 bg-white shadow-md border-2 border-blue-100 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Novo Grupo
            </h2>
            <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nome do Grupo</label>
              <Input
                {...register('name', { required: 'Nome é obrigatório' })}
                className="h-12 border-slate-300 bg-slate-50"
                placeholder="Nome do grupo"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md"
              >
                Salvar
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 border-slate-300"
                onClick={handleCancelEdit}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {filteredGroups.map(group => (
          <Card key={group.id} className="p-4 bg-gradient-to-r from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">{group.name}</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600 rounded-lg"
                  onClick={() => handleEditGroup(group)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {editingGroup && editingGroup.id === group.id && (
              <div className="mt-4 pt-4 border-t border-slate-200 animate-fade-in">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nome do Grupo</label>
                    <Input
                      {...register('name', { required: 'Nome é obrigatório' })}
                      className="h-12 border-slate-300 bg-slate-50"
                      placeholder="Nome do grupo"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Atualizar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 border-slate-300"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Grupos;
