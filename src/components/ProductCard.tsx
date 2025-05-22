
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  name: string;
  price: number;
  group: string;
  stock?: number;
  onAdd?: () => void;
  compact?: boolean;
}

const ProductCard = ({ name, price, group, stock, onAdd, compact = false }: ProductCardProps) => {
  if (compact) {
    return (
      <Card 
        className="p-3 bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col h-32"
        onClick={onAdd}
      >
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 text-sm line-clamp-2">
            {name}
          </h3>
        </div>
        <div className="mt-auto">
          <p className="text-lg font-bold text-green-600">
            R$ {price.toFixed(2)}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group cursor-pointer">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
              {name}
            </h3>
            <p className="text-sm text-slate-500">{group}</p>
            {stock !== undefined && (
              <p className="text-xs text-slate-400 mt-1">Estoque: {stock}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-green-600">
              R$ {price.toFixed(2)}
            </p>
          </div>
        </div>
        
        {onAdd && (
          <Button 
            onClick={onAdd}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
