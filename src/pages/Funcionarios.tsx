import { useState } from 'react';
import { Plus, UserCog, Edit, Trash2, X, User, Lock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import Loading from '@/components/Loading';
import ConfirmDialog from '@/components/ConfirmDialog';

interface EmployeeFormData {
  name: string;
  password: string;
  role: string;
}

const Funcionarios = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<any | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<EmployeeFormData>();
  const { toast } = useToast();

  const employees = [
    { id: '1', name: 'nathan', role: 'administrador' },
    { id: '2', name: 'teste', role: 'caixa' },
    { id: '3', name: 'maria', role: 'gerente' },
  ];

  const getRoleBadge = (role: string) => {
    const variants = {
      administrador: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300',
      caixa: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300',
      gerente: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300',
    };
    
    return variants[role as keyof typeof variants] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleAddEmployee = () => {
    setIsAdding(true);
    setEditingEmployee(null);
    reset({ name: '', password: '', role: '' });
  };

  const handleEditEmployee = (employee: any) => {
    setEditingEmployee(employee);
    setIsAdding(false);
    setValue('name', employee.name);
    setValue('password', '');
    setValue('role', employee.role);
  };

  const handleCancelEdit = () => {
    setIsAdding(false);
    setEditingEmployee(null);
    reset();
  };

  const onSubmit = async (data: EmployeeFormData) => {
    const action = isAdding ? 'creating' : `editing-${editingEmployee?.id}`;
    setLoadingAction(action);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(isAdding ? 'Adding employee:' : 'Updating employee:', data);
    
    toast({
      title: "Sucesso!",
      description: `Funcionário ${isAdding ? 'cadastrado' : 'atualizado'} com sucesso`,
    });
    
    setLoadingAction(null);
    handleCancelEdit();
  };

  const handleDeleteEmployee = (employee: any) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    
    setLoadingAction(`deleting-${employeeToDelete.id}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Deleting employee:', employeeToDelete.name);
    
    toast({
      title: "Funcionário excluído",
      description: `${employeeToDelete.name} foi excluído com sucesso`,
    });
    
    setLoadingAction(null);
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <UserCog className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Funcionários</h1>
        </div>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg rounded-xl w-full sm:w-auto"
          onClick={handleAddEmployee}
        >
          <Plus className="mr-2 h-4 w-4" />
          Cadastrar funcionário
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6 bg-white dark:bg-slate-800 shadow-md border-2 border-blue-100 dark:border-blue-900 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Novo Funcionário
            </h2>
            <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nome</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  {...register('name', { required: 'Nome é obrigatório' })}
                  className="h-12 border-slate-300 bg-slate-50 pl-10"
                  placeholder="Nome do funcionário"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  {...register('password', { required: isAdding ? 'Senha é obrigatória' : false })}
                  type="password"
                  className="h-12 border-slate-300 bg-slate-50 pl-10"
                  placeholder={isAdding ? "Senha" : "Deixe em branco para manter a atual"}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Função</label>
              <Select
                onValueChange={(value) => setValue('role', value)}
                defaultValue={''}
              >
                <SelectTrigger className="h-12 border-slate-300 bg-slate-50">
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrador">Administrador</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="caixa">Caixa</SelectItem>
                </SelectContent>
              </Select>
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
        {employees.map(employee => (
          <Card key={employee.id} className="p-4 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{employee.name}</h3>
                <Badge className={`${getRoleBadge(employee.role)}`}>
                  {employee.role}
                </Badge>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600 rounded-lg px-6 flex-1 sm:flex-initial"
                  onClick={() => handleEditEmployee(employee)}
                  disabled={loadingAction !== null}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 rounded-lg px-6 flex-1 sm:flex-initial"
                  onClick={() => handleDeleteEmployee(employee)}
                  disabled={loadingAction !== null}
                >
                  {loadingAction === `deleting-${employee.id}` ? (
                    <Loading size="sm" />
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </>
                  )}
                </Button>
              </div>
            </div>

            {editingEmployee && editingEmployee.id === employee.id && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 animate-fade-in">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nome</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        {...register('name', { required: 'Nome é obrigatório' })}
                        className="h-12 border-slate-300 bg-slate-50 pl-10"
                        placeholder="Nome do funcionário"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <Input
                        {...register('password')}
                        type="password"
                        className="h-12 border-slate-300 bg-slate-50 pl-10"
                        placeholder="Deixe em branco para manter a atual"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Função</label>
                    <Select
                      onValueChange={(value) => setValue('role', value)}
                      defaultValue={employee.role}
                    >
                      <SelectTrigger className="h-12 border-slate-300 bg-slate-50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrador">Administrador</SelectItem>
                        <SelectItem value="gerente">Gerente</SelectItem>
                        <SelectItem value="caixa">Caixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={loadingAction === `editing-${employee.id}`}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md"
                    >
                      {loadingAction === `editing-${employee.id}` ? (
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
                      disabled={loadingAction === `editing-${employee.id}`}
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
        title="Deseja excluir funcionário?"
        description={`Tem certeza que deseja excluir o funcionário "${employeeToDelete?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={confirmDelete}
        loading={loadingAction?.startsWith('deleting')}
      />
    </div>
  );
};

export default Funcionarios;
