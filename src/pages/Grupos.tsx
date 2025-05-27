
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import Loading from '@/components/Loading';
import ConfirmDialog from '@/components/ConfirmDialog';

interface GroupFormData {
  name: string;
}

const Grupos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingGroup, setEditingGroup] = useState<any | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<any | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<GroupFormData>();
  const { toast } = useToast();

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

  const onSubmit = async (data: GroupFormData) => {
    const action = isAdding ? 'creating' : `editing-${editingGroup?.id}`;
    setLoadingAction(action);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(isAdding ? 'Adding group:' : 'Updating group:', data);
    
    toast({
      title: "Sucesso!",
      description: `Grupo ${isAdding ? 'criado' : 'atualizado'} com sucesso`,
    });
    
    setLoadingAction(null);
    handleCancelEdit();
  };

  const handleDeleteGroup = (group: any) => {
    setGroupToDelete(group);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!groupToDelete) return;
    
    setLoadingAction(`deleting-${groupToDelete.id}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Deleting group:', groupToDelete.name);
    
    toast({
      title: "Grupo excluído",
      description: `${groupToDelete.name} foi excluído com sucesso`,
    });
    
    setLoadingAction(null);
    setDeleteDialogOpen(false);
    setGroupToDelete(null);
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Cadastro de Grupos</h1>
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
        <Card className="p-6 bg-white dark:bg-slate-800 shadow-md border-2 border-blue-100 dark:border-blue-900 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
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
                disabled={loadingAction === 'creating'}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md"
              >
                {loadingAction === 'creating' ? (
                  <Loading text="Salvando..." />
                ) : (
                  "Salvar"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 border-slate-300"
                onClick={handleCancelEdit}
                disabled={loadingAction === 'creating'}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {filteredGroups.map(group => (
          <Card key={group.id} className="p-4 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{group.name}</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600 rounded-lg"
                  onClick={() => handleEditGroup(group)}
                  disabled={loadingAction !== null}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 rounded-lg"
                  onClick={() => handleDeleteGroup(group)}
                  disabled={loadingAction !== null}
                >
                  {loadingAction === `deleting-${group.id}` ? (
                    <Loading size="sm" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {editingGroup && editingGroup.id === group.id && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 animate-fade-in">
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
                      disabled={loadingAction === `editing-${group.id}`}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md"
                    >
                      {loadingAction === `editing-${group.id}` ? (
                        <Loading text="Atualizando..." />
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Atualizar
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 border-slate-300"
                      onClick={handleCancelEdit}
                      disabled={loadingAction === `editing-${group.id}`}
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

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Deseja excluir grupo?"
        description={`Tem certeza que deseja excluir o grupo "${groupToDelete?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={confirmDelete}
        loading={loadingAction?.startsWith('deleting')}
      />
    </div>
  );
};

export default Grupos;
