
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { investmentTrends, priceToIncomeRatio, COLORS } from './data';

const InvestmentInsight: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm">
        <p>{t('market.investment.description')}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">{t('market.investment.origin')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={investmentTrends}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                stackOffset="expand"
                layout="vertical"
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value: number) => `${value * 100}%`} />
                <YAxis type="category" dataKey="quarter" width={60} />
                <Tooltip formatter={(value: number, name: string, props: any) => [`${props.payload[name]}%`, name === 'domestic' ? t('market.domestic.investors') : t('market.foreign.investors')]} />
                <Legend formatter={(value) => value === 'domestic' ? t('market.domestic.investors') : t('market.foreign.investors')} />
                <Bar dataKey="domestic" name="domestic" stackId="a" fill="#000000" />
                <Bar dataKey="foreign" name="foreign" stackId="a" fill="#E41E20" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">{t('market.price.to.rent')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priceToIncomeRatio}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="city"
                  label={({ city, value }: any) => `${city}: ${value}`}
                >
                  {priceToIncomeRatio.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {t('market.price.to.rent.explanation')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentInsight;
