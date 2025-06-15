
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { monthlyTrends } from './data';

const PriceTrendsInsight: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm">
        <p>{t('market.trends.description')}</p>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyTrends}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => [`${value} €/m²`, '']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="tirana" 
              name={t('region.tirana')} 
              stroke="#E41E20" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
            <Line type="monotone" dataKey="durres" name={t('region.durres')} stroke="#000000" />
            <Line type="monotone" dataKey="vlore" name={t('region.vlore')} stroke="#4CAF50" />
            <Line type="monotone" dataKey="sarande" name={t('region.sarande')} stroke="#2196F3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('region.tirana')}</h3>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5.2%</span>
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">1,350 €/m²</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('region.durres')}</h3>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+3.5%</span>
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">920 €/m²</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('region.vlore')}</h3>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+7.1%</span>
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">1,050 €/m²</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">{t('region.sarande')}</h3>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8.3%</span>
            </div>
          </div>
          <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">1,250 €/m²</p>
        </div>
      </div>
    </div>
  );
};

export default PriceTrendsInsight;
