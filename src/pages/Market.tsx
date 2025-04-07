
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import PriceChart from '../components/PriceChart';
import RegionPriceTable from '../components/RegionPriceTable';
import PropertyTypeChart from '../components/PropertyTypeChart';
import MarketInsights from '../components/MarketInsights';
import MarketNews from '../components/MarketNews';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useIsMobile } from '../hooks/use-mobile';

const quarterlyData = [
  { quarter: 'Q1 2024', supply: 1245, demand: 1520 },
  { quarter: 'Q2 2024', supply: 1350, demand: 1480 },
  { quarter: 'Q3 2024', supply: 1420, demand: 1580 },
  { quarter: 'Q4 2024', supply: 1520, demand: 1620 },
  { quarter: 'Q1 2025', supply: 1480, demand: 1680 },
];

const Market: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-3 py-6">
      <div className="mb-6">
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{t('market.title')}</h1>
        <p className="text-gray-600 text-sm md:text-base">{t('market.subtitle')}</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full mb-6">
        <TabsList className="mb-4 md:mb-6 bg-albania-gray w-full overflow-x-auto flex">
          <TabsTrigger value="overview" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            {t('market.overview')}
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            {t('market.trends')}
          </TabsTrigger>
          <TabsTrigger value="news" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            {t('market.news')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {/* Price Evolution */}
          <div className="mb-6">
            <PriceChart title={t('market.price.evolution')} />
          </div>
          
          {/* Supply and Demand */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.supply.demand')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={quarterlyData}
                      margin={{
                        top: 5,
                        right: isMobile ? 10 : 30,
                        left: isMobile ? 0 : 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" tick={{fontSize: isMobile ? 10 : 12}} />
                      <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                      <Tooltip />
                      <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
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
          <div className="mb-6 overflow-x-auto">
            <RegionPriceTable title={t('market.quarterly.change')} />
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <div className="mb-6">
            <MarketInsights />
          </div>
        </TabsContent>
        
        <TabsContent value="news">
          <div className="mb-6">
            <MarketNews />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Market;
