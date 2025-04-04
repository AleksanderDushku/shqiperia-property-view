
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import PriceChart from '../components/PriceChart';
import RegionPriceTable from '../components/RegionPriceTable';
import PropertyTypeChart from '../components/PropertyTypeChart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const quarterlyData = [
  { quarter: 'Q1 2024', supply: 1245, demand: 1520 },
  { quarter: 'Q2 2024', supply: 1350, demand: 1480 },
  { quarter: 'Q3 2024', supply: 1420, demand: 1580 },
  { quarter: 'Q4 2024', supply: 1520, demand: 1620 },
  { quarter: 'Q1 2025', supply: 1480, demand: 1680 },
];

const Market: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('market.title')}</h1>
        <p className="text-gray-600">{t('market.subtitle')}</p>
      </div>
      
      {/* Price Evolution */}
      <div className="mb-8">
        <PriceChart title={t('market.price.evolution')} />
      </div>
      
      {/* Supply and Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t('market.supply.demand')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={quarterlyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="supply" name="Oferta" fill="#000000" />
                  <Bar dataKey="demand" name="Kërkesa" fill="#E41E20" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <PropertyTypeChart title={t('property.distribution')} />
      </div>
      
      {/* Regional Prices */}
      <div className="mb-8">
        <RegionPriceTable title={t('market.quarterly.change')} />
      </div>
    </div>
  );
};

export default Market;
