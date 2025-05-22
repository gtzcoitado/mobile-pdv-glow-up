
import { useState } from 'react';
import { Search, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StockItem {
  id: string;
  name: string;
  current: number;
  min: number;
  group: string;
}

const Estoque = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [showLowStock, setShowLowStock] = useState(false);
  const [adjustingItem, setAdjustingItem] = useState<StockItem | null>(null);
  const [adjustType, setAdjustType] = useState<'in' | 'out'>('in');
  const [adjustQuantity, setAdjustQuantity] = useState('1');

  const stockItems: StockItem[] = [
    { id: '1', name: 'Brahma', current: 134, min: 5, group: 'Geral' },
    { id: '2', name: 'Pão', current: 113, min: 1, group: 'Geral' },
    { id: '3', name: 'Coca-Cola', current: 45, min: 10, group: 'Bebidas' },
    { id: '4', name: 'Água', current: 12, min: 15, group: 'Bebidas' },
    { id: '5', name: 'Salgadinho', current: 8, min: 10, group: 'Lanches' },
  ];

  const groups = ['Todos os grupos', 'Geral', 'Bebidas', 'Lanches', 'Teste'];

  const handleAdjust = (item: StockItem) => {
    setAdjustingItem(item);
    setAdjustType('in');
    setAdjustQuantity('1');
  };

  const handleConfirmAdjust = () => {
    if (!adjustingItem) return;
    
    const quantity = parseInt(adjustQuantity);
    if (isNaN(quantity) || quantity <= 0) return;

    console.log(`Adjusting ${adjustingItem.name}: ${adjustType === 'in' ? '+' : '-'}${quantity}`);
    // Here you would update the stock in the database
    
    setAdjustingItem(null);
  };

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || item.group.toLowerCase() === selectedGroup.toLowerCase();
    const matchesLowStock = !showLowStock || item.current <= item.min;
    
    return matchesSearch && matchesGroup && matchesLowStock;
  });

  const getStockStatusClass = (current: number, min: number) => {
    if (current <= min * 0.5) return 'text-red-600';
    if (current <= min) return 'text-amber-600';
    return 'text-green-600';
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Controle de Estoque</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Buscar produto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-400"
          />
        </div>
        
        <div className="flex gap-4 items-center">
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-full md:w-48 h-12 rounded-xl border-2 border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {groups.map(group => (
                <SelectItem 
                  key={group} 
                  value={group === 'Todos os grupos' ? 'all' : group.toLowerCase()}
                >
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="lowStock"
              checked={showLowStock}
              onChange={(e) => setShowLowStock(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
            <label htmlFor="lowStock" className="text-sm font-medium text-slate-700">
              Abaixo do mínimo
            </label>
          </div>
        </div>
      </div>

      {adjustingItem && (
        <Card className="p-6 bg-white shadow-md border-2 border-blue-100">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Ajuste de Estoque: {adjustingItem.name}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Estoque atual:</p>
                <p className="font-semibold text-lg">{adjustingItem.current}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Mínimo:</p>
                <p className="font-semibold text-lg">{adjustingItem.min}</p>
              </div>
            </div>
            
            <Tabs defaultValue="in" onValueChange={(v) => setAdjustType(v as 'in' | 'out')}>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="in" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Entrada
                </TabsTrigger>
                <TabsTrigger value="out" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  <Minus className="mr-2 h-4 w-4" />
                  Saída
                </TabsTrigger>
              </TabsList>
              <TabsContent value="in" className="mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Quantidade a adicionar
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={adjustQuantity}
                    onChange={(e) => setAdjustQuantity(e.target.value)}
                    className="h-12 border-slate-300 bg-slate-50"
                  />
                </div>
              </TabsContent>
              <TabsContent value="out" className="mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Quantidade a remover
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max={adjustingItem.current.toString()}
                    value={adjustQuantity}
                    onChange={(e) => setAdjustQuantity(e.target.value)}
                    className="h-12 border-slate-300 bg-slate-50"
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleConfirmAdjust}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md"
              >
                Confirmar Ajuste
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 border-slate-300"
                onClick={() => setAdjustingItem(null)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {filteredItems.map(item => (
          <Card key={item.id} className="p-4 bg-gradient-to-r from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-semibold text-slate-800">{item.name}</h3>
                <p className="text-sm text-slate-500 mb-1">Grupo: {item.group}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-slate-600">Atual:</span>
                  <span className={`font-bold ${getStockStatusClass(item.current, item.min)}`}>
                    {item.current}
                  </span>
                  <span className="text-slate-400 mx-1">—</span>
                  <span className="text-sm text-slate-600">Mín:</span>
                  <span className="font-medium text-slate-700">{item.min}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleAdjust(item)}
                className="bg-blue-500 hover:bg-blue-600 text-white shadow-md rounded-lg px-6 w-full sm:w-auto"
              >
                Ajustar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Estoque;
