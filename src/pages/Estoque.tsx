
import { useState } from 'react';
import { Package, Plus, Minus, Search, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Loading from '@/components/Loading';

interface StockItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  group: string;
  price: number;
}

const Estoque = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [stockItems, setStockItems] = useState<StockItem[]>([
    { id: '1', name: 'Brahma', currentStock: 134, minStock: 20, maxStock: 200, group: 'Geral', price: 5.00 },
    { id: '2', name: 'Pão', currentStock: 113, minStock: 50, maxStock: 300, group: 'Geral', price: 1.00 },
    { id: '3', name: 'Coca-Cola', currentStock: 45, minStock: 30, maxStock: 150, group: 'Bebidas', price: 4.50 },
    { id: '4', name: 'Água', currentStock: 89, minStock: 40, maxStock: 200, group: 'Bebidas', price: 2.00 },
    { id: '5', name: 'Salgadinho', currentStock: 30, minStock: 15, maxStock: 100, group: 'Lanches', price: 3.50 },
    { id: '6', name: 'Chocolate', currentStock: 25, minStock: 10, maxStock: 80, group: 'Lanches', price: 2.50 },
  ]);

  const groups = ['Todos os grupos', 'Geral', 'Bebidas', 'Lanches'];

  const getStockStatus = (current: number, min: number, max: number) => {
    if (current <= min) return { status: 'low', color: 'text-red-600', bg: 'bg-red-50' };
    if (current >= max) return { status: 'high', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { status: 'normal', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const handleStockEdit = (id: string, currentStock: number) => {
    setEditingId(id);
    setEditStock(currentStock.toString());
  };

  const handleStockSave = async (id: string) => {
    const newStock = parseInt(editStock);
    if (isNaN(newStock) || newStock < 0) {
      toast({
        title: "Erro",
        description: "Informe um valor válido",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setStockItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, currentStock: newStock } : item
      )
    );

    setEditingId(null);
    setEditStock('');
    setLoading(false);
    
    toast({
      title: "Sucesso",
      description: "Estoque ajustado com sucesso",
    });
  };

  const handleStockCancel = () => {
    setEditingId(null);
    setEditStock('');
  };

  const adjustStock = async (id: string, change: number) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setStockItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, currentStock: Math.max(0, item.currentStock + change) }
          : item
      )
    );
    
    setLoading(false);
    
    toast({
      title: "Sucesso",
      description: "Estoque ajustado com sucesso",
    });
  };

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || selectedGroup === 'Todos os grupos' || item.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Package className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">Controle de Estoque</h1>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {groups.map(group => (
                <SelectItem 
                  key={group} 
                  value={group === 'Todos os grupos' ? 'all' : group}
                >
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Stock Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const stockStatus = getStockStatus(item.currentStock, item.minStock, item.maxStock);
          const isEditing = editingId === item.id;
          
          return (
            <Card key={item.id} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.group}</p>
                    <p className="text-sm font-medium text-green-600">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className={`px-2 py-1 rounded text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                    {stockStatus.status === 'low' && 'Baixo'}
                    {stockStatus.status === 'high' && 'Alto'}
                    {stockStatus.status === 'normal' && 'Normal'}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estoque atual:</span>
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(e.target.value)}
                          className="w-16 h-6 text-xs"
                          disabled={loading}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStockSave(item.id)}
                          disabled={loading}
                          className="h-6 w-6 p-0"
                        >
                          {loading ? (
                            <Loading size="sm" />
                          ) : (
                            <Save className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleStockCancel}
                          disabled={loading}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="font-bold">{item.currentStock}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStockEdit(item.id, item.currentStock)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Mín: {item.minStock}</span>
                    <span>Máx: {item.maxStock}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => adjustStock(item.id, -1)}
                    disabled={loading || item.currentStock <= 0}
                    className="flex-1"
                  >
                    {loading ? <Loading size="sm" /> : <Minus className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => adjustStock(item.id, 1)}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? <Loading size="sm" /> : <Plus className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Estoque;
