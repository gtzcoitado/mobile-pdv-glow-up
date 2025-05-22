
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductFormData>();

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

  const onSubmit = (data: ProductFormData) => {
    console.log(isAdding ? 'Adding product:' : 'Updating product:', data);
    // Here you would add or update the product in the database
    handleCancelEdit();
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'todos' || product.group.toLowerCase() === selectedGroup.toLowerCase();
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Cadastro de Produtos</h1>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg rounded-xl w-full sm:w-auto"
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

      {(isAdding || editingProduct) && (
        <Card className="p-6 bg-white shadow-md border-2 border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              {isAdding ? 'Novo Produto' : 'Editar Produto'}
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
                defaultValue={editingProduct?.group || ''}
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
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md"
              >
                {isAdding ? 'Salvar' : 'Atualizar'}
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

      <div className="space-y-4">
        {filteredProducts.map(product => (
          <Card key={product.id} className="p-4 sm:p-6 bg-gradient-to-r from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
                <p className="text-green-600 font-bold text-xl">R$ {product.price.toFixed(2)}</p>
                <p className="text-sm text-slate-500">Grupo: {product.group}</p>
                <p className="text-sm text-slate-500">Mín: {product.stock}</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="bg-yellow-500 border-yellow-500 text-white hover:bg-yellow-600 hover:border-yellow-600 rounded-lg px-6 flex-1 sm:flex-initial"
                  onClick={() => handleEditProduct(product)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 rounded-lg px-6 flex-1 sm:flex-initial"
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

export default Produtos;
