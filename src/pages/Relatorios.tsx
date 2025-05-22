
import { useState } from 'react';
import { BarChart3, TrendingUp, FileText, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface SaleItem {
  id: string;
  date: string;
  time: string;
  product: string;
  quantity: number;
  value: number;
}

interface ProductSaleItem {
  product: string;
  quantity: number;
  total: number;
}

const Relatorios = () => {
  const [selectedTab, setSelectedTab] = useState('sales');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  
  // Payment methods selection state
  const [paymentMethods, setPaymentMethods] = useState({
    debit: false,
    credit: false,
    cash: false,
    pix: false
  });

  const sales: SaleItem[] = [
    { id: '1', date: '22/05/2025', time: '10:23:00', product: 'TESTE DO NATH', quantity: 3, value: 3.00 },
    { id: '2', date: '22/05/2025', time: '09:50:12', product: 'pão', quantity: 1, value: 1.00 },
    { id: '3', date: '22/05/2025', time: '09:50:12', product: 'Brahma', quantity: 1, value: 5.00 },
    { id: '4', date: '21/05/2025', time: '15:29:00', product: 'pão', quantity: 1, value: 1.00 },
    { id: '5', date: '21/05/2025', time: '11:45:00', product: 'Brahma', quantity: 1, value: 5.00 },
    { id: '6', date: '20/05/2025', time: '14:30:00', product: 'Coca-Cola', quantity: 2, value: 9.00 },
  ];

  const productSales: ProductSaleItem[] = [
    { product: 'Brahma', quantity: 6, total: 30.00 },
    { product: 'pão', quantity: 9, total: 9.00 },
    { product: 'Teste', quantity: 7, total: 7.00 },
    { product: 'TESTE DO NATH', quantity: 3, total: 3.00 },
    { product: 'Coca-Cola', quantity: 4, total: 18.00 },
  ];

  const groups = ['Todos os grupos', 'Geral', 'Bebidas', 'Lanches', 'Teste'];

  // Calculate totals for sales report
  const totalTransactions = sales.length;
  const totalItems = sales.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = sales.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">Relatórios</h1>
      </div>

      <Tabs 
        defaultValue="sales" 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="sales" className="text-sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            Relatório de Vendas
          </TabsTrigger>
          <TabsTrigger value="products" className="text-sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Produtos Vendidos
          </TabsTrigger>
        </TabsList>
        
        {/* Sales Report */}
        <TabsContent value="sales" className="space-y-4">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Filtros</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  De:
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-12 border-slate-300 bg-slate-50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Até:
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-12 border-slate-300 bg-slate-50"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="debit"
                  checked={paymentMethods.debit}
                  onCheckedChange={(checked) => 
                    setPaymentMethods({...paymentMethods, debit: checked === true})
                  }
                />
                <label htmlFor="debit" className="text-sm text-slate-600 cursor-pointer">
                  Débito
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="credit"
                  checked={paymentMethods.credit}
                  onCheckedChange={(checked) => 
                    setPaymentMethods({...paymentMethods, credit: checked === true})
                  }
                />
                <label htmlFor="credit" className="text-sm text-slate-600 cursor-pointer">
                  Crédito
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="cash"
                  checked={paymentMethods.cash}
                  onCheckedChange={(checked) => 
                    setPaymentMethods({...paymentMethods, cash: checked === true})
                  }
                />
                <label htmlFor="cash" className="text-sm text-slate-600 cursor-pointer">
                  Dinheiro
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="pix"
                  checked={paymentMethods.pix}
                  onCheckedChange={(checked) => 
                    setPaymentMethods({...paymentMethods, pix: checked === true})
                  }
                />
                <label htmlFor="pix" className="text-sm text-slate-600 cursor-pointer">
                  Pix
                </label>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-slate-500">Transações:</p>
                <p className="text-2xl font-bold text-blue-700">{totalTransactions}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <p className="text-sm text-slate-500">Itens vendidos:</p>
                <p className="text-2xl font-bold text-purple-700">{totalItems}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-sm text-slate-500">Receita total:</p>
                <p className="text-2xl font-bold text-green-700">
                  R$ {totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                      Data / Hora
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                      Produto
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-slate-500">
                      Qtd
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-500">
                      Valor (R$)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {`${sale.date}, ${sale.time}`}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-700">
                        {sale.product}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-slate-500">
                        {sale.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-right text-green-600">
                        {sale.value.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        {/* Products Report */}
        <TabsContent value="products" className="space-y-4">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">Filtros</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  De:
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-12 border-slate-300 bg-slate-50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Até:
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-12 border-slate-300 bg-slate-50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Grupo</label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger className="h-12 border-slate-300 bg-slate-50">
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
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-500">
                      Produto
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-slate-500">
                      Qtd
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-slate-500">
                      Receita (R$)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {productSales.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-700">
                        {item.product}
                      </td>
                      <td className="px-4 py-3 text-sm text-center text-slate-500">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-right text-green-600">
                        {item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-slate-700">
                      Total
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-medium text-slate-700">
                      {productSales.reduce((sum, item) => sum + item.quantity, 0)}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-right text-green-700">
                      R$ {productSales.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Relatorios;
