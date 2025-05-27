
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Banknote, Smartphone, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Loading from '@/components/Loading';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Pagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState('');
  
  // Get cart data from navigation state
  const cart: CartItem[] = location.state?.cart || [];
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const change = receivedAmount ? parseFloat(receivedAmount) - subtotal : 0;

  const paymentMethods = [
    { id: 'debit', name: 'Cartão de Débito', icon: CreditCard, color: 'bg-blue-500' },
    { id: 'credit', name: 'Cartão de Crédito', icon: CreditCard, color: 'bg-purple-500' },
    { id: 'cash', name: 'Dinheiro', icon: Banknote, color: 'bg-green-500' },
    { id: 'pix', name: 'PIX', icon: Smartphone, color: 'bg-orange-500' },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Erro",
        description: "Selecione um método de pagamento",
        variant: "destructive"
      });
      return;
    }

    if (selectedMethod === 'cash' && (!receivedAmount || parseFloat(receivedAmount) < subtotal)) {
      toast({
        title: "Erro", 
        description: "Valor recebido deve ser maior ou igual ao total",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setShowSuccess(true);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/', { replace: true });
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="p-8 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Venda Concluída!</h2>
          <p className="text-slate-600 mb-4">Pagamento processado com sucesso</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-bold">R$ {subtotal.toFixed(2)}</span>
            </div>
            {selectedMethod === 'cash' && change > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Troco:</span>
                <span className="font-bold">R$ {change.toFixed(2)}</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <CreditCard className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">Pagamento</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Método de Pagamento</h2>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">{method.name}</p>
              </button>
            ))}
          </div>

          {selectedMethod === 'cash' && (
            <div className="mt-4 space-y-3">
              <label className="text-sm font-medium">Valor Recebido</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={receivedAmount}
                onChange={(e) => setReceivedAmount(e.target.value)}
                className="text-lg"
              />
              {change > 0 && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-green-700 font-medium">
                    Troco: R$ {change.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Order Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-sm">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-sm font-medium">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-green-600">R$ {subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={loading || !selectedMethod}
            className="w-full mt-6 h-12"
          >
            {loading ? (
              <Loading text="Processando..." />
            ) : (
              "Finalizar Pagamento"
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Pagamento;
