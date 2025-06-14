
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketHeader from '../components/market/MarketHeader';
import MarketKeyInsights from '../components/market/MarketKeyInsights';
import OverviewTab from '../components/market/tabs/OverviewTab';
import TrendsTab from '../components/market/tabs/TrendsTab';
import InvestmentTab from '../components/market/tabs/InvestmentTab';
import RegionalPriceDashboard from '../components/market/RegionalPriceDashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Database, TrendingUp, MapPin, Calculator } from 'lucide-react';

const Market: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
    <div className={`min-h-screen ${dark_mode ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="mb-8">
          <MarketHeader />
          <div className="mt-6 p-6 bg-gradient-to-r from-albania-red/10 to-red-600/10 rounded-xl border border-albania-red/20">
            <p className="text-lg leading-relaxed">
              {t('Professional market analysis updated twice daily at 6 AM and 6 PM. Our automated system processes thousands of listings to provide accurate market insights and investment opportunities.')}
            </p>
          </div>
        </div>

        {/* Key Market Insights */}
        <div className="mb-8">
          <MarketKeyInsights />
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 h-auto p-1">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Overview')}</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2 py-3">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Trends')}</span>
            </TabsTrigger>
            <TabsTrigger value="regional" className="flex items-center gap-2 py-3">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Regional')}</span>
            </TabsTrigger>
            <TabsTrigger value="investment" className="flex items-center gap-2 py-3">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">{t('Investment')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <TrendsTab />
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-albania-red" />
                  {t('Regional Price Analysis')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RegionalPriceDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investment" className="space-y-6">
            <InvestmentTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Market;
