
import { useState } from 'react';
import { Search, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const Estoque = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('todos');
  const [showLowStock, setShowLowStock] = useState(false);

  const products = [
    { id: '1', name: 'Brahma', current: 134, min: 5, group: 'Geral' },
    { id: '2', name: 'Pão', current: 113, min: 1, group: 'Geral' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Package className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">Estoque</h1>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Filtrar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-400"
          />
        </div>

        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="h-12 rounded-xl border-2 border-slate-200">
            <SelectValue placeholder="Todos os grupos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os grupos</SelectItem>
            <SelectItem value="geral">Geral</SelectItem>
            <SelectItem value="bebidas">Bebidas</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="low-stock"
            checked={showLowStock}
            onCheckedChange={setShowLowStock}
          />
          <label htmlFor="low-stock" className="text-sm text-slate-600">
            Abaixo do mínimo
          </label>
        </div>
      </div>

      <div className="space-y-4">
        {products.map(product => (
          <Card key={product.id} className="p-6 bg-gradient-to-r from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
                <p className="text-sm text-slate-500">Grupo: {product.group}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-blue-600">
                    Atual: {product.current}
                  </span>
                  <span className="text-sm text-slate-500">
                    — Mín: {product.min}
                  </span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-6">
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
