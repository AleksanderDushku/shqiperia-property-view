
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { priceHistoryData } from '../data/propertyData';

interface PriceChartProps {
  title: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ title }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={priceHistoryData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} €/m²`, '']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="apartment" 
                name={t('property.apartment')} 
                stroke="#E41E20" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="house" 
                name={t('property.house')} 
                stroke="#000000" 
              />
              <Line 
                type="monotone" 
                dataKey="land" 
                name={t('property.land')} 
                stroke="#4CAF50" 
              />
              <Line 
                type="monotone" 
                dataKey="commercial" 
                name={t('property.commercial')} 
                stroke="#2196F3" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;
