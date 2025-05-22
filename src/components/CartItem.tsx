
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem = ({ name, price, quantity, onIncrease, onDecrease, onRemove }: CartItemProps) => {
  return (
    <Card className="p-3 bg-white border border-slate-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-slate-800">{name}</h4>
          <p className="text-sm text-green-600 font-semibold">R$ {price.toFixed(2)}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-slate-300 hover:bg-red-50 hover:border-red-300"
            onClick={onDecrease}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="w-8 text-center font-semibold text-slate-700">
            {quantity}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-slate-300 hover:bg-green-50 hover:border-green-300"
            onClick={onIncrease}
          >
            <Plus className="h-3 w-3" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-slate-300 hover:bg-red-50 hover:border-red-300 ml-2"
            onClick={onRemove}
          >
            <Trash2 className="h-3 w-3 text-red-500" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
