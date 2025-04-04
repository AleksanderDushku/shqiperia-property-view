
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { propertyTypesData } from '../data/propertyData';
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyTypeChartProps {
  title: string;
}

const COLORS = ['#E41E20', '#000000', '#4CAF50', '#2196F3'];

const PropertyTypeChart: React.FC<PropertyTypeChartProps> = ({ title }) => {
  const { t } = useLanguage();
  
  const data = propertyTypesData.map(item => ({
    name: t(`property.${item.name.toLowerCase()}`),
    value: item.value
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '']} />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyTypeChart;
