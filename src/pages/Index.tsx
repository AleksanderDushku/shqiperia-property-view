
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import EnhancedMarketHero from '../components/hero/EnhancedMarketHero';
import LiveMarketData from '../components/market/LiveMarketData';
import MarketOverviewCards from '../components/market/MarketOverviewCards';
import SeasonalMarketAnalysis from '../components/SeasonalMarketAnalysis';
import MarketNews from '../components/MarketNews';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Database, Shield, Zap, TrendingUp } from 'lucide-react';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  const system_features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: t('Automated Data Collection'),
      description: t('Our system automatically collects and processes market data twice daily using advanced web crawling technology.'),
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('Data Accuracy & Validation'),
      description: t('All data is validated and cross-referenced from multiple sources to ensure maximum accuracy and reliability.'),
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('Real-time Processing'),
      description: t('Market calculations and trend analysis are performed in real-time with each data update cycle.'),
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('Predictive Analytics'),
      description: t('Advanced algorithms analyze patterns to provide market sentiment and opportunity scoring.'),
      color: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <div className={`min-h-screen ${dark_mode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Hero Section */}
      <EnhancedMarketHero />
      
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Live Market Data Section */}
        <section>
          <LiveMarketData />
        </section>

        {/* Market Analysis Tools Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('Market Analysis Tools')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('Professional tools and insights for real estate professionals, investors, and market analysts.')}
            </p>
          </div>
          <MarketOverviewCards />
        </section>

        {/* How Our System Works */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('How Our System Works')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('Advanced automation and data processing running twice daily at 6 AM and 6 PM')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {system_features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <CardHeader className="pb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white w-fit group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-albania-red transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Seasonal Analysis */}
        <section>
          <SeasonalMarketAnalysis />
        </section>

        {/* Market News & Insights */}
        <section>
          <MarketNews />
        </section>

        {/* Technical Implementation Details */}
        <Card className={`${dark_mode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Database className="h-6 w-6 mr-3 text-albania-red" />
              {t('Technical Implementation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">{t('Data Collection Schedule')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t('Morning Update')}:</span>
                    <span className="font-medium">6:00 AM (GMT+1)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t('Evening Update')}:</span>
                    <span className="font-medium">6:00 PM (GMT+1)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t('Processing Time')}:</span>
                    <span className="font-medium">~5-10 minutes</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">{t('Data Sources & Coverage')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t('Primary Sources')}:</span>
                    <span className="font-medium">5+ platforms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t('Coverage Areas')}:</span>
                    <span className="font-medium">12+ regions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">{t('Data Points')}:</span>
                    <span className="font-medium">15,000+ listings</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg border-l-4 border-l-albania-red">
              <p className="text-sm">
                <strong>{t('Automated Process')}:</strong> {t('Our system uses PostgreSQL cron jobs to automatically trigger data collection and processing. The entire pipeline runs without manual intervention, ensuring consistent and reliable market data updates.')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
