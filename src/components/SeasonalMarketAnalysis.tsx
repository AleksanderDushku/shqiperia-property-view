
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Seasonal market data
const seasonalData = [
  { name: 'Jan', listings: 240, sales: 124, priceIndex: 97 },
  { name: 'Feb', listings: 300, sales: 145, priceIndex: 98 },
  { name: 'Mar', listings: 400, sales: 200, priceIndex: 99 },
  { name: 'Apr', listings: 450, sales: 235, priceIndex: 101 },
  { name: 'May', listings: 500, sales: 290, priceIndex: 102 },
  { name: 'Jun', listings: 580, sales: 320, priceIndex: 103 },
  { name: 'Jul', listings: 600, sales: 340, priceIndex: 104 },
  { name: 'Aug', listings: 570, sales: 325, priceIndex: 104 },
  { name: 'Sep', listings: 520, sales: 280, priceIndex: 103 },
  { name: 'Oct', listings: 460, sales: 250, priceIndex: 102 },
  { name: 'Nov', listings: 400, sales: 210, priceIndex: 100 },
  { name: 'Dec', listings: 350, sales: 180, priceIndex: 99 }
];

const SeasonalMarketAnalysis: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-[#8884d8]">
            {t('Njoftime')}: {payload[0].value}
          </p>
          <p className="text-[#82ca9d]">
            {t('Shitje')}: {payload[1].value}
          </p>
          <p className="text-[#ffc658]">
            {t('Indeksi i çmimit')}: {payload[2].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{t('Analiza Sezonale e Tregut')}</CardTitle>
        <CardDescription>
          {t('Si ndryshon tregu i pronave përgjatë vitit')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={seasonalData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar yAxisId="left" dataKey="listings" name={t('Njoftime')} fill="#8884d8" />
              <Bar yAxisId="left" dataKey="sales" name={t('Shitje')} fill="#82ca9d" />
              <Bar yAxisId="right" dataKey="priceIndex" name={t('Indeksi i çmimit')} fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800">{t('Piku i njoftimeve')}</h4>
              <p className="text-gray-700 mt-1">{t('Korrik')}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t('Mesi i verës sheh më shumë njoftime të reja')}
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800">{t('Piku i shitjeve')}</h4>
              <p className="text-gray-700 mt-1">{t('Korrik')}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t('Shitjet rriten nga fundi i pranverës deri në fund të verës')}
              </p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium text-amber-800">{t('Çmimet më të larta')}</h4>
              <p className="text-gray-700 mt-1">{t('Korrik-Gusht')}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t('Indeksi i çmimeve arrin pikun gjatë verës')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonalMarketAnalysis;
