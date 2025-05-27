
import { useState } from 'react';
import { Search, Package, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Loading from '@/components/Loading';

const Estoque = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('todos');
  const [adjustingStock, setAdjustingStock] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const products = [
    { id: '1', name: 'Brahma', group: 'Geral', stock: 134, minStock: 5 },
    { id: '2', name: 'Pão', group: 'Geral', stock: 113, minStock: 1 },
    { id: '3', name: 'Coca-Cola', group: 'Bebidas', stock: 10, minStock: 5 },
    { id: '4', name: 'Água', group: 'Bebidas', stock: 15, minStock: 3 },
  ];

  const groups = ['Todos os grupos', 'Geral', 'Bebidas', 'Lanches'];

  const handleStockAdjustment = async (productId: string, type: 'in' | 'out') => {
    const quantity = parseInt(quantities[productId] || '0');
    if (quantity <= 0) {
      toast({
        title: "Erro",
        description: "Informe uma quantidade válida",
        variant: "destructive"
      });
      return;
    }

    setAdjustingStock(productId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const product = products.find(p => p.id === productId);
    console.log(`Stock adjustment for ${product?.name}: ${type === 'in' ? '+' : '-'}${quantity}`);
    
    toast({
      title: "Estoque ajustado com sucesso!",
      description: `${quantity} unidades ${type === 'in' ? 'adicionadas' : 'removidas'} do produto ${product?.name}`,
    });
    
    setAdjustingStock(null);
    setQuantities(prev => ({ ...prev, [productId]: '' }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'todos' || product.group.toLowerCase() === selectedGroup.toLowerCase();
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Package className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Controle de Estoque</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Buscar produto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:border-blue-400 dark:bg-slate-800"
          />
        </div>
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-800">
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

      <div className="space-y-4">
        {filteredProducts.map(product => (
          <Card key={product.id} className="p-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{product.name}</h3>
                <p className="text-slate-600 dark:text-slate-300">Grupo: {product.group}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    Atual: {product.stock}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    Mínimo: {product.minStock}
                  </span>
                </div>
                {product.stock <= product.minStock && (
                  <div className="mt-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm w-fit">
                    Abaixo do mínimo
                  </div>
                )}
              </div>

              <div className="lg:w-80">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Quantidade a adicionar
                    </label>
                    <Input
                      type="number"
                      placeholder="1"
                      value={quantities[product.id] || ''}
                      onChange={(e) => setQuantities(prev => ({ ...prev, [product.id]: e.target.value }))}
                      className="mt-1 dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleStockAdjustment(product.id, 'in')}
                      disabled={adjustingStock !== null}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      {adjustingStock === product.id ? (
                        <Loading size="sm" text="Ajustando..." />
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Entrada
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleStockAdjustment(product.id, 'out')}
                      disabled={adjustingStock !== null}
                      variant="outline"
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <Minus className="mr-2 h-4 w-4" />
                      Saída
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Estoque;
