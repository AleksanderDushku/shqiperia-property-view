
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from '../contexts/LanguageContext';
import { TrendingUp, Home, Building } from 'lucide-react';
import PriceTrendsInsight from './market/insights/PriceTrendsInsight';
import AffordabilityInsight from './market/insights/AffordabilityInsight';
import InvestmentInsight from './market/insights/InvestmentInsight';

const MarketInsights: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="w-full shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center text-albania-red">
          <TrendingUp className="mr-2 h-6 w-6" />
          {t('market.insights')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price-trends" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-1 sm:grid-cols-3 bg-gray-100 dark:bg-gray-800 h-auto">
            <TabsTrigger value="price-trends" className="data-[state=active]:bg-albania-red data-[state=active]:text-white data-[state=active]:shadow-lg rounded-md">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t('market.price.trends')}
            </TabsTrigger>
            <TabsTrigger value="affordability" className="data-[state=active]:bg-albania-red data-[state=active]:text-white data-[state=active]:shadow-lg rounded-md">
              <Home className="w-4 h-4 mr-2" />
              {t('market.affordability')}
            </TabsTrigger>
            <TabsTrigger value="investment" className="data-[state=active]:bg-albania-red data-[state=active]:text-white data-[state=active]:shadow-lg rounded-md">
              <Building className="w-4 h-4 mr-2" />
              {t('market.investment')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="price-trends">
            <PriceTrendsInsight />
          </TabsContent>
          
          <TabsContent value="affordability">
            <AffordabilityInsight />
          </TabsContent>
          
          <TabsContent value="investment">
            <InvestmentInsight />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
