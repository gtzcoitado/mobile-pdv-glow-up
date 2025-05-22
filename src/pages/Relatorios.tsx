
import { BarChart3, TrendingUp, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Relatorios = () => {
  const reports = [
    {
      id: '1',
      title: 'Relatório de Vendas',
      description: 'Visualize todas as vendas realizadas por período',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: '2',
      title: 'Relatório de Produtos Vendidos',
      description: 'Acompanhe quais produtos mais vendem',
      icon: BarChart3,
      color: 'from-blue-500 to-purple-500',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">Relatórios</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map(report => {
          const Icon = report.icon;
          return (
            <Card 
              key={report.id} 
              className="p-6 bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${report.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                    {report.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {report.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Relatorios;
