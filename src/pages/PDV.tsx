
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, ArrowLeft } from 'lucide-react';
import Loading from '@/components/Loading';

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ProductType {
  id: string;
  name: string;
  price: number;
  group: string;
  stock: number;
}

const PDV = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const products: ProductType[] = [
    { id: '1', name: 'Brahma', price: 5.00, group: 'Geral', stock: 134 },
    { id: '2', name: 'Pão', price: 1.00, group: 'Geral', stock: 113 },
    { id: '3', name: 'Coca-Cola', price: 4.50, group: 'Bebidas', stock: 45 },
    { id: '4', name: 'Água', price: 2.00, group: 'Bebidas', stock: 89 },
    { id: '5', name: 'Salgadinho', price: 3.50, group: 'Lanches', stock: 30 },
    { id: '6', name: 'Chocolate', price: 2.50, group: 'Lanches', stock: 25 },
  ];

  // Get unique groups from products
  const groups = Array.from(new Set(products.map(product => product.group)));

  const addToCart = async (product: ProductType) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setLoading(false);
  };

  const updateQuantity = async (id: string, change: number) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
    
    setLoading(false);
  };

  const removeFromCart = async (id: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setCart(prev => prev.filter(item => item.id !== id));
    setLoading(false);
  };

  const goToPayment = () => {
    if (cart.length === 0) return;
    
    navigate('/pagamento', {
      state: { cart }
    });
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const filteredGroups = groups.filter(group =>
    group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedGroup ? product.group === selectedGroup : true)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header with search */}
      <div className="p-4 bg-white shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl border-2 border-slate-200 focus:border-blue-400 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row gap-4 p-4 overflow-hidden">
        {/* Product selection area */}
        <div className="flex-1 min-h-0 overflow-auto">
          {selectedGroup ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedGroup(null)}
                  className="flex items-center text-blue-600"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Voltar
                </Button>
                <h2 className="text-lg font-medium text-slate-800">
                  Grupo: {selectedGroup}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    group={product.group}
                    stock={product.stock}
                    onAdd={() => addToCart(product)}
                    compact={true}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-slate-800">Grupos</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredGroups.map((group) => (
                  <Card 
                    key={group} 
                    className="p-4 bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg cursor-pointer flex items-center justify-center h-24 text-center"
                    onClick={() => setSelectedGroup(group)}
                  >
                    <h3 className="font-semibold text-slate-800">{group}</h3>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div className="w-full md:w-96 flex-shrink-0">
          <Card className="p-6 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200">
            <div className="flex items-center mb-4">
              <ShoppingCart className="mr-2 h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-800">Carrinho</h2>
              <span className="ml-auto text-sm text-slate-500">
                {cart.length} {cart.length === 1 ? 'item' : 'itens'}
              </span>
            </div>

            {loading && (
              <div className="flex justify-center py-4">
                <Loading text="Atualizando..." />
              </div>
            )}

            <div className="space-y-3 max-h-60 lg:max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-center text-slate-500 py-8">Carrinho vazio</p>
              ) : (
                cart.map(item => (
                  <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onIncrease={() => updateQuantity(item.id, 1)}
                    onDecrease={() => updateQuantity(item.id, -1)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                ))
              )}
            </div>

            <div className="border-t border-slate-200 pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-slate-700">Subtotal:</span>
                <span className="text-xl font-bold text-green-600">
                  R$ {subtotal.toFixed(2)}
                </span>
              </div>
              
              <Button 
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={cart.length === 0 || loading}
                onClick={goToPayment}
              >
                {loading ? (
                  <Loading text="Carregando..." />
                ) : (
                  "Ir para Pagamento"
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PDV;
