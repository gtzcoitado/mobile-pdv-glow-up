
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Banknote, Smartphone, ArrowLeft, Check, Plus, Minus } from 'lucide-react';
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

interface PaymentMethod {
  id: string;
  type: 'debit' | 'credit' | 'cash' | 'pix';
  amount: number;
}

const Pagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState('');
  
  // Get cart data from navigation state
  const cart: CartItem[] = location.state?.cart || [];
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const totalPaid = paymentMethods.reduce((sum, method) => sum + method.amount, 0);
  const remaining = subtotal - totalPaid;
  const change = receivedAmount ? parseFloat(receivedAmount) - subtotal : 0;

  const paymentOptions = [
    { id: 'debit', name: 'Cartão de Débito', icon: CreditCard, color: 'bg-blue-500' },
    { id: 'credit', name: 'Cartão de Crédito', icon: CreditCard, color: 'bg-purple-500' },
    { id: 'cash', name: 'Dinheiro', icon: Banknote, color: 'bg-green-500' },
    { id: 'pix', name: 'PIX', icon: Smartphone, color: 'bg-orange-500' },
  ];

  const addPaymentMethod = (type: 'debit' | 'credit' | 'cash' | 'pix') => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type,
      amount: 0
    };
    setPaymentMethods([...paymentMethods, newMethod]);
  };

  const updatePaymentAmount = (id: string, amount: number) => {
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === id ? { ...method, amount } : method
      )
    );
  };

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const getMethodName = (type: string) => {
    const option = paymentOptions.find(opt => opt.id === type);
    return option?.name || type;
  };

  const handlePayment = async () => {
    if (paymentMethods.length === 0) {
      toast({
        title: "Erro",
        description: "Adicione pelo menos um método de pagamento",
        variant: "destructive"
      });
      return;
    }

    if (Math.abs(remaining) > 0.01) {
      toast({
        title: "Erro", 
        description: "O valor total dos pagamentos deve ser igual ao total da venda",
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
            {paymentMethods.map((method, index) => (
              <div key={method.id} className="flex justify-between">
                <span>{getMethodName(method.type)}:</span>
                <span>R$ {method.amount.toFixed(2)}</span>
              </div>
            ))}
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Pagamento</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <Card className="p-6 dark:bg-slate-800">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Métodos de Pagamento</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {paymentOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => addPaymentMethod(option.id as any)}
                className="p-4 rounded-lg border-2 border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 transition-all"
              >
                <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium dark:text-white">{option.name}</p>
              </button>
            ))}
          </div>

          {/* Selected Payment Methods */}
          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <div key={method.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium dark:text-white">{getMethodName(method.type)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePaymentMethod(method.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={method.amount || ''}
                  onChange={(e) => updatePaymentAmount(method.id, parseFloat(e.target.value) || 0)}
                  className="mt-2 dark:bg-slate-600 dark:border-slate-500"
                />
              </div>
            ))}
          </div>

          {remaining !== 0 && (
            <div className={`mt-4 p-3 rounded-lg ${remaining > 0 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <p className={`font-medium ${remaining > 0 ? 'text-yellow-700 dark:text-yellow-300' : 'text-red-700 dark:text-red-300'}`}>
                {remaining > 0 ? `Falta: R$ ${remaining.toFixed(2)}` : `Excesso: R$ ${Math.abs(remaining).toFixed(2)}`}
              </p>
            </div>
          )}
        </Card>

        {/* Order Summary */}
        <Card className="p-6 dark:bg-slate-800">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Resumo do Pedido</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-sm dark:text-slate-300">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-sm font-medium dark:text-white">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between text-lg font-bold">
              <span className="dark:text-white">Total:</span>
              <span className="text-green-600 dark:text-green-400">R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="dark:text-slate-300">Pago:</span>
              <span className="dark:text-white">R$ {totalPaid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="dark:text-slate-300">Restante:</span>
              <span className={remaining === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                R$ {remaining.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={loading || paymentMethods.length === 0 || Math.abs(remaining) > 0.01}
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
