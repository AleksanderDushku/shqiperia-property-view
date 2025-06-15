
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from '../tabs/OverviewTab';
import TrendsTab from '../tabs/TrendsTab';
import InvestmentTab from '../tabs/InvestmentTab';
import RegionalPriceDashboard from '../RegionalPriceDashboard';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useIsMobile } from '../../../hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Database, TrendingUp, MapPin, Calculator } from 'lucide-react';

const MarketTabs: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2 h-auto' : 'grid-cols-4 h-auto'} p-1 bg-gray-50 dark:bg-gray-900`}>
          <TabsTrigger 
            value="overview" 
            className={`flex items-center gap-2 ${isMobile ? 'py-3 px-3 text-xs' : 'py-4 px-6 text-sm'} font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-albania-red data-[state=active]:to-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300`}
          >
            <Database className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
            <span className={isMobile ? 'hidden sm:inline' : ''}>{t('Përmbledhje')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="trends" 
            className={`flex items-center gap-2 ${isMobile ? 'py-3 px-3 text-xs' : 'py-4 px-6 text-sm'} font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-xl transition-all duration-300`}
          >
            <TrendingUp className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
            <span className={isMobile ? 'hidden sm:inline' : ''}>{t('Trendet')}</span>
          </TabsTrigger>
          {!isMobile && (
            <>
              <TabsTrigger 
                value="regional" 
                className="flex items-center gap-3 py-4 px-6 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <MapPin className="h-5 w-5" />
                <span>{t('Rajonet')}</span>
              </TabsTrigger>
              <TabsTrigger 
                value="investment" 
                className="flex items-center gap-3 py-4 px-6 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                <Calculator className="h-5 w-5" />
                <span>{t('Investime')}</span>
              </TabsTrigger>
            </>
          )}
        </TabsList>
        
        {isMobile && (
          <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-gray-50 dark:bg-gray-900 mt-2">
            <TabsTrigger 
              value="regional" 
              className="flex items-center gap-2 py-3 px-3 text-xs font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Rajonet')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="investment" 
              className="flex items-center gap-2 py-3 px-3 text-xs font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
            >
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Investime')}</span>
            </TabsTrigger>
          </TabsList>
        )}
      </div>

      <TabsContent value="overview" className="space-y-8">
        <div className="bg-gradient-to-r from-albania-red/5 to-red-100/50 dark:from-albania-red/10 dark:to-red-900/20 rounded-2xl p-8 border border-albania-red/20">
          <h2 className="text-3xl font-bold text-albania-red mb-4 flex items-center gap-3">
            <Database className="h-8 w-8" />
            {t('Përmbledhja e Tregut')}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('Analiza e detajuar e tregut të pronave në Shqipëri me fokus në Tiranë dhe qytetet kryesore')}
          </p>
        </div>
        <OverviewTab />
      </TabsContent>

      <TabsContent value="trends" className="space-y-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <h2 className="text-3xl font-bold text-green-700 mb-4 flex items-center gap-3">
            <TrendingUp className="h-8 w-8" />
            {t('Trendet e Çmimeve')}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('Analiza e thellë e lëvizjeve të çmimeve të pronave në të gjithë Shqipërinë')}
          </p>
        </div>
        <TrendsTab />
      </TabsContent>

      <TabsContent value="regional" className="space-y-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 flex items-center gap-3">
            <MapPin className="h-8 w-8" />
            {t('Analiza Rajonale')}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('Krahasimi i çmimeve dhe analizës së detajuar për rajonet kryesore të Shqipërisë')}
          </p>
        </div>
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <MapPin className="h-6 w-6" />
              {t('Analiza e Çmimeve Rajonale')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <RegionalPriceDashboard />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="investment" className="space-y-8">
        <div className="bg-gradient-to-r from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-800">
          <h2 className="text-3xl font-bold text-purple-700 mb-4 flex items-center gap-3">
            <Calculator className="h-8 w-8" />
            {t('Mundësitë e Investimit')}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('Kalkulime dhe analiza për investitorët që duan të investojnë në tregun shqiptar')}
          </p>
        </div>
        <InvestmentTab />
      </TabsContent>
    </Tabs>
  );
};

export default MarketTabs;
