
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import Loading from '@/components/Loading';
import ConfirmDialog from '@/components/ConfirmDialog';

interface ProductFormData {
  name: string;
  price: string;
  group: string;
  minStock: string;
}

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('todos');
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any | null>(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductFormData>();
  const { toast } = useToast();

  const products = [
    { id: '1', name: 'Brahma', price: 5.00, group: 'Geral', stock: 5 },
    { id: '2', name: 'Pão', price: 1.00, group: 'Geral', stock: 1 },
    { id: '3', name: 'Coca-Cola', price: 4.50, group: 'Bebidas', stock: 10 },
    { id: '4', name: 'Água', price: 2.00, group: 'Bebidas', stock: 15 },
  ];

  const groups = ['Todos os grupos', 'Geral', 'Bebidas', 'Lanches', 'Teste'];

  const handleAddProduct = () => {
    setIsAdding(true);
    setEditingProduct(null);
    reset({ name: '', price: '', group: '', minStock: '' });
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsAdding(false);
    setValue('name', product.name);
    setValue('price', product.price.toString());
    setValue('group', product.group);
    setValue('minStock', product.stock.toString());
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsAdding(false);
    reset();
  };

  const onSubmit = async (data: ProductFormData) => {
    const action = isAdding ? 'creating' : `editing-${editingProduct?.id}`;
    setLoadingAction(action);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(isAdding ? 'Adding product:' : 'Updating product:', data);
    
    toast({
      title: "Sucesso!",
      description: `Produto ${isAdding ? 'criado' : 'atualizado'} com sucesso`,
    });
    
    setLoadingAction(null);
    handleCancelEdit();
  };

  const handleDeleteProduct = (product: any) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    setLoadingAction(`deleting-${productToDelete.id}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Deleting product:', productToDelete.name);
    
    toast({
      title: "Produto excluído",
      description: `${productToDelete.name} foi excluído com sucesso`,
    });
    
    setLoadingAction(null);
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'todos' || product.group.toLowerCase() === selectedGroup.toLowerCase();
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Cadastro de Produtos</h1>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg rounded-xl w-full sm:w-auto"
          onClick={handleAddProduct}
        >
          <Plus className="mr-2 h-4 w-4" />
          Criar produto
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Filtrar por nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-400"
          />
        </div>
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl border-2 border-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {groups.map(group => (
              <SelectItem key={group} value={group.toLowerCase().replace(/\s+/g, '-')}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isAdding && (
        <Card className="p-6 bg-white dark:bg-slate-800 shadow-md border-2 border-blue-100 dark:border-blue-900 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Novo Produto
            </h2>
            <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Nome</label>
              <Input
                {...register('name', { required: 'Nome é obrigatório' })}
                className="h-12 border-slate-300 bg-slate-50"
                placeholder="Nome do produto"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Preço (R$)</label>
              <Input
                {...register('price', { required: 'Preço é obrigatório' })}
                type="number"
                step="0.01"
                className="h-12 border-slate-300 bg-slate-50"
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Grupo</label>
              <Select 
                onValueChange={(value) => setValue('group', value)} 
                defaultValue={''}
              >
                <SelectTrigger className="h-12 border-slate-300 bg-slate-50">
                  <SelectValue placeholder="Selecione um grupo" />
                </SelectTrigger>
                <SelectContent>
                  {groups.slice(1).map(group => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.group && <p className="text-red-500 text-sm">{errors.group.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Estoque mínimo</label>
              <Input
                {...register('minStock', { required: 'Estoque mínimo é obrigatório' })}
                type="number"
                className="h-12 border-slate-300 bg-slate-50"
                placeholder="Quantidade mínima"
              />
              {errors.minStock && <p className="text-red-500 text-sm">{errors.minStock.message}</p>}
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

      <div className="space-y-4">
        {filteredProducts.map(product => (
          <Card key={product.id} className="p-4 sm:p-6 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{product.name}</h3>
                <p className="text-green-600 dark:text-green-400 font-bold text-xl">R$ {product.price.toFixed(2)}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Grupo: {product.group}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Mín: {product.stock}</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600 rounded-lg px-6 flex-1 sm:flex-initial"
                  onClick={() => handleEditProduct(product)}
                  disabled={loadingAction !== null}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 rounded-lg px-6 flex-1 sm:flex-initial"
                  onClick={() => handleDeleteProduct(product)}
                  disabled={loadingAction !== null}
                >
                  {loadingAction === `deleting-${product.id}` ? (
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
            
            {editingProduct && editingProduct.id === product.id && (
              <div className="mt-4 border-t pt-4 animate-fade-in">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nome</label>
                    <Input
                      {...register('name', { required: 'Nome é obrigatório' })}
                      className="h-12 border-slate-300 bg-slate-50"
                      placeholder="Nome do produto"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Preço (R$)</label>
                    <Input
                      {...register('price', { required: 'Preço é obrigatório' })}
                      type="number"
                      step="0.01"
                      className="h-12 border-slate-300 bg-slate-50"
                      placeholder="0.00"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Grupo</label>
                    <Select 
                      onValueChange={(value) => setValue('group', value)} 
                      defaultValue={product.group}
                    >
                      <SelectTrigger className="h-12 border-slate-300 bg-slate-50">
                        <SelectValue placeholder="Selecione um grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        {groups.slice(1).map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.group && <p className="text-red-500 text-sm">{errors.group.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Estoque mínimo</label>
                    <Input
                      {...register('minStock', { required: 'Estoque mínimo é obrigatório' })}
                      type="number"
                      className="h-12 border-slate-300 bg-slate-50"
                      placeholder="Quantidade mínima"
                    />
                    {errors.minStock && <p className="text-red-500 text-sm">{errors.minStock.message}</p>}
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={loadingAction === `editing-${product.id}`}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md"
                    >
                      {loadingAction === `editing-${product.id}` ? (
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
                      disabled={loadingAction === `editing-${product.id}`}
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
        title="Deseja excluir produto?"
        description={`Tem certeza que deseja excluir o produto "${productToDelete?.name}"? Esta ação não pode ser desfeita.`}
        onConfirm={confirmDelete}
        loading={loadingAction?.startsWith('deleting')}
      />
    </div>
  );
};

export default Produtos;
