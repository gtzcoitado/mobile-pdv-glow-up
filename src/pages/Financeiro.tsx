
import { useState } from 'react';
import { Plus, Minus, DollarSign, TrendingUp, TrendingDown, Calendar, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Loading from '@/components/Loading';

interface Transaction {
  id: string;
  type: 'entrada' | 'saida' | 'sangria';
  amount: number;
  description: string;
  date: string;
  time: string;
}

interface CashRegister {
  opening: number;
  sales: number;
  withdrawals: number;
  current: number;
}

const Financeiro = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalDescription, setWithdrawalDescription] = useState('');
  
  // Mock data - in real app this would come from API
  const [cashRegister, setCashRegister] = useState<CashRegister>({
    opening: 100.00,
    sales: 850.50,
    withdrawals: 200.00,
    current: 750.50
  });

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'entrada',
      amount: 850.50,
      description: 'Vendas do dia',
      date: '27/05/2025',
      time: '18:30'
    },
    {
      id: '2', 
      type: 'sangria',
      amount: 200.00,
      description: 'Sangria para banco',
      date: '27/05/2025',
      time: '16:00'
    },
    {
      id: '3',
      type: 'entrada',
      amount: 100.00,
      description: 'Abertura do caixa',
      date: '27/05/2025',
      time: '08:00'
    }
  ]);

  const handleWithdrawal = async () => {
    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
      toast({
        title: "Erro",
        description: "Informe um valor válido",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(withdrawalAmount) > cashRegister.current) {
      toast({
        title: "Erro", 
        description: "Valor superior ao disponível em caixa",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const amount = parseFloat(withdrawalAmount);
    setCashRegister(prev => ({
      ...prev,
      withdrawals: prev.withdrawals + amount,
      current: prev.current - amount
    }));

    setWithdrawalAmount('');
    setWithdrawalDescription('');
    setLoading(false);
    
    toast({
      title: "Sucesso",
      description: `Sangria de R$ ${amount.toFixed(2)} realizada com sucesso`
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'entrada':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'sangria':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Receipt className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'entrada':
        return 'text-green-600';
      case 'sangria':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <DollarSign className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl font-bold text-slate-800">Financeiro</h1>
      </div>

      {/* Cash Register Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Abertura</p>
              <p className="text-xl font-bold text-blue-700">
                R$ {cashRegister.opening.toFixed(2)}
              </p>
            </div>
            <Plus className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Vendas</p>
              <p className="text-xl font-bold text-green-700">
                R$ {cashRegister.sales.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Sangrias</p>
              <p className="text-xl font-bold text-red-700">
                R$ {cashRegister.withdrawals.toFixed(2)}
              </p>
            </div>
            <Minus className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-r from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Saldo Atual</p>
              <p className="text-xl font-bold text-purple-700">
                R$ {cashRegister.current.toFixed(2)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="sangria" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sangria">Nova Sangria</TabsTrigger>
          <TabsTrigger value="extrato">Extrato</TabsTrigger>
        </TabsList>

        <TabsContent value="sangria" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Realizar Sangria</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Valor</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  className="text-lg"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">Descrição</label>
                <Textarea
                  placeholder="Motivo da sangria..."
                  value={withdrawalDescription}
                  onChange={(e) => setWithdrawalDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={handleWithdrawal}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {loading ? (
                  <Loading text="Processando sangria..." />
                ) : (
                  "Realizar Sangria"
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="extrato" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Extrato do Caixa</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="h-4 w-4" />
                Hoje - 27/05/2025
              </div>
            </div>

            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-slate-800">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-slate-500">
                        {transaction.date} às {transaction.time}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`font-bold ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'sangria' ? '-' : '+'}R$ {transaction.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Saldo Final:</span>
                <span className="text-xl font-bold text-green-600">
                  R$ {cashRegister.current.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Financeiro;
