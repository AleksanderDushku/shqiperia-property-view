
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import WebCrawlerList from '../components/WebCrawlerList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { TrendingUp, Building, Percent } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsRow from '../components/dashboard/StatsRow';
import MarketOverviewTab from '../components/dashboard/MarketOverviewTab';
import DeveloperInsightsTab from '../components/dashboard/DeveloperInsightsTab';
import InvestorMetricsTab from '../components/dashboard/InvestorMetricsTab';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-3 py-6">
      <DashboardHeader />
      
      {/* Stats cards */}
      <StatsRow />
      
      <Tabs defaultValue="market" className="w-full mb-6">
        <TabsList className="w-full mb-4 bg-albania-gray">
          <TabsTrigger value="market" className="flex-1 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('Përmbledhje tregu')}</span>
          </TabsTrigger>
          <TabsTrigger value="developer" className="flex-1 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Building className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('Të dhëna për zhvilluesit')}</span>
          </TabsTrigger>
          <TabsTrigger value="investor" className="flex-1 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Percent className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('Matje për investitorë')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="market">
          <MarketOverviewTab />
        </TabsContent>
        
        <TabsContent value="developer">
          <DeveloperInsightsTab />
        </TabsContent>
        
        <TabsContent value="investor">
          <InvestorMetricsTab />
        </TabsContent>
      </Tabs>

      {/* Web Crawlers Section */}
      <div className="mb-6">
        <WebCrawlerList />
      </div>
    </div>
  );
};

export default Dashboard;
