
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BarChart3, TrendingUp, Briefcase, Building, MapPin } from 'lucide-react';
import MarketHeader from '../components/market/MarketHeader';
import MarketKeyInsights from '../components/market/MarketKeyInsights';
import OverviewTab from '../components/market/tabs/OverviewTab';
import TrendsTab from '../components/market/tabs/TrendsTab';
import InvestmentTab from '../components/market/tabs/InvestmentTab';
import MarketNews from '../components/MarketNews';
import RegionalPriceDashboard from '../components/market/RegionalPriceDashboard';
import AlbanianBanksEnhanced from '../components/AlbanianBanksEnhanced';

const Market: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, set_active_tab] = useState('overview');
  
  return (
    <div className="container mx-auto px-3 py-6">
      <MarketHeader />
      
      {/* Key Insights for Professionals */}
      <MarketKeyInsights />
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={set_active_tab} className="w-full mb-6">
        <TabsList className="mb-4 md:mb-6 bg-albania-gray w-full overflow-x-auto flex">
          <TabsTrigger value="overview" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <BarChart3 className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.overview')}</span>
          </TabsTrigger>
          <TabsTrigger value="regional" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <MapPin className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('Regional Analysis')}</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <TrendingUp className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.trends')}</span>
          </TabsTrigger>
          <TabsTrigger value="investment" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <Briefcase className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.investment')}</span>
          </TabsTrigger>
          <TabsTrigger value="banks" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <Building className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('Banks & Loans')}</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <Building className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.news')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        
        <TabsContent value="regional">
          <div className="mb-6">
            <RegionalPriceDashboard />
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <TrendsTab />
        </TabsContent>
        
        <TabsContent value="investment">
          <InvestmentTab />
        </TabsContent>
        
        <TabsContent value="banks">
          <div className="mb-6">
            <AlbanianBanksEnhanced />
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
