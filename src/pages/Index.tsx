
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import MarketHeroSection from '../components/hero/MarketHeroSection';
import LiveMarketData from '../components/market/LiveMarketData';
import MarketOverviewCards from '../components/market/MarketOverviewCards';
import SeasonalMarketAnalysis from '../components/SeasonalMarketAnalysis';
import MarketNews from '../components/MarketNews';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Clock, Database } from 'lucide-react';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
    <div className={`min-h-screen ${dark_mode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <MarketHeroSection />
      
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Live Market Data */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {t('Live Market Data')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {t('Real-time insights updated daily at 6:00 AM')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {t('Updated Daily')}
              </Badge>
              <Badge variant="outline" className="flex items-center">
                <Database className="h-3 w-3 mr-1" />
                {t('Automated')}
              </Badge>
            </div>
          </div>
          <LiveMarketData />
        </section>

        {/* Market Overview Cards */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {t('Market Analysis Tools')}
          </h2>
          <MarketOverviewCards />
        </section>

        {/* Seasonal Analysis */}
        <section>
          <SeasonalMarketAnalysis />
        </section>

        {/* Market News & Insights */}
        <section>
          <MarketNews />
        </section>

        {/* Data Update Info */}
        <Card className={`${dark_mode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Database className="h-5 w-5 mr-2 text-albania-red" />
              {t('Automated Data Updates')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-1">{t('Update Schedule')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('Daily at 6:00 AM (GMT+1)')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('Data Sources')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('Multiple property platforms, INSTAT, market analysis')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">{t('Coverage')}</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('Tirana, Durrës, Vlorë, Sarandë & surrounding areas')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
