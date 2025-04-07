
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import PriceChart from '../components/PriceChart';
import RegionPriceTable from '../components/RegionPriceTable';
import PropertyTypeChart from '../components/PropertyTypeChart';
import MarketInsights from '../components/MarketInsights';
import MarketNews from '../components/MarketNews';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useIsMobile } from '../hooks/use-mobile';
import { Building, TrendingUp, BarChart3, Briefcase } from 'lucide-react';

// Market data with professional insights integrated
const quarterlyData = [
  { quarter: 'Q1 2024', supply: 1245, demand: 1520, opportunity_index: 85 },
  { quarter: 'Q2 2024', supply: 1350, demand: 1480, opportunity_index: 82 },
  { quarter: 'Q3 2024', supply: 1420, demand: 1580, opportunity_index: 88 },
  { quarter: 'Q4 2024', supply: 1520, demand: 1620, opportunity_index: 90 },
  { quarter: 'Q1 2025', supply: 1480, demand: 1680, opportunity_index: 92 },
];

const Market: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  // Professional real estate insights
  const marketKeyInsights = [
    {
      title: t('market.infrastructure.impact'),
      content: 'Major transportation infrastructure projects have increased property values by an average of 18% in affected areas, creating development opportunities.',
    },
    {
      title: t('market.regulatory.changes'),
      content: 'New zoning regulations have opened up previously restricted areas for mixed-use development, particularly in the western districts.',
    },
    {
      title: t('market.tech.influence'),
      content: 'Property technology adoption is accelerating, with virtual tours increasing showing efficiency by 35% and reducing time-to-sale by 22%.',
    },
  ];
  
  return (
    <div className="container mx-auto px-3 py-6">
      <div className="mb-6">
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{t('market.title')}</h1>
        <p className="text-gray-600 text-sm md:text-base">{t('market.subtitle')}</p>
      </div>
      
      {/* Key Insights for Professionals */}
      <Card className="mb-6 border-l-4 border-l-albania-red">
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-albania-red" />
            {t('market.key.insights')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketKeyInsights.map((insight, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-sm md:text-base mb-2">{insight.title}</h3>
                <p className="text-gray-700 text-xs md:text-sm">{insight.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" className="w-full mb-6">
        <TabsList className="mb-4 md:mb-6 bg-albania-gray w-full overflow-x-auto flex">
          <TabsTrigger value="overview" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <BarChart3 className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.overview')}</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <TrendingUp className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.trends')}</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <Building className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.news')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {/* Price Evolution with professional context */}
          <div className="mb-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.price.evolution')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Analysis of price trends incorporating development costs, regulatory impacts, and investment potential
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PriceChart title="" />
              </CardContent>
            </Card>
          </div>
          
          {/* Supply and Demand with opportunity index */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.supply.demand')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Market balance analysis with development opportunity indexing
                </CardDescription>
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
          
          {/* Regional Prices with investment recommendations */}
          <div className="mb-6 overflow-x-auto">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.quarterly.change')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Regional price dynamics with development potential indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegionPriceTable title="" />
              </CardContent>
            </Card>
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
