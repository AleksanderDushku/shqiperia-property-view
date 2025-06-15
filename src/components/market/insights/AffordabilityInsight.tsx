
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { priceToIncomeRatio, mortgageData } from './data';

const AffordabilityInsight: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm">
        <p>{t('market.affordability.description')}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">{t('market.price.income.ratio')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceToIncomeRatio} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip formatter={(value: number) => [`${value}x`, '']} />
                <Bar dataKey="value" fill="#E41E20" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {t('market.price.income.explanation')}
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">{t('market.mortgage.trends')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mortgageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" orientation="left" stroke="#E41E20" />
                <YAxis yAxisId="right" orientation="right" stroke="#000000" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="averageRate" name={t('market.mortgage.rate')} stroke="#E41E20" activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="numberOfMortgages" name={t('market.mortgage.volume')} stroke="#000000" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffordabilityInsight;
