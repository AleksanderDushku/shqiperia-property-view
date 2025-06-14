
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import EnhancedMarketHero from '../components/hero/EnhancedMarketHero';
import LiveMarketData from '../components/market/LiveMarketData';
import MarketOverviewCards from '../components/market/MarketOverviewCards';
import SeasonalMarketAnalysis from '../components/SeasonalMarketAnalysis';
import MarketNews from '../components/MarketNews';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Database, Shield, Zap, TrendingUp, Brain, Clock, Users, Award } from 'lucide-react';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  const system_features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: t('AI-Powered Analytics'),
      description: t('Advanced machine learning algorithms analyze market patterns to provide predictive insights and opportunity scoring.'),
      color: 'from-purple-500 to-violet-600'
    },
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
    }
  ];

  const stats = [
    { icon: <Users className="h-8 w-8" />, value: '15,000+', label: t('Active Listings') },
    { icon: <Database className="h-8 w-8" />, value: '5+', label: t('Data Sources') },
    { icon: <Award className="h-8 w-8" />, value: '99.9%', label: t('Accuracy Rate') },
    { icon: <Clock className="h-8 w-8" />, value: '2x', label: t('Daily Updates') }
  ];

  return (
    <div className={`min-h-screen ${dark_mode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Hero Section */}
      <EnhancedMarketHero />
      
      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-albania-red/5 to-red-600/5 rounded-3xl border border-albania-red/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-albania-red to-red-600 text-white mb-4 shadow-lg group-hover: group-hover:shadow-2xl transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Market Data Section */}
        <section>
          <LiveMarketData />
        </section>

        {/* Market Analysis Tools Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent">
              {t('Market Analysis Tools')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('Professional tools and insights for real estate professionals, investors, and market analysts.')}
            </p>
          </div>
          <MarketOverviewCards />
        </section>

        {/* How Our System Works */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent">
              {t('How Our AI System Works')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('Advanced automation and AI analysis running twice daily at 6 AM and 6 PM')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {system_features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <CardHeader className="pb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-albania-red transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
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

        {/* Enhanced Technical Implementation Details */}
        <Card className={`${dark_mode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200'} overflow-hidden`}>
          <div className="h-2 bg-gradient-to-r from-albania-red to-red-600"></div>
          <CardHeader>
            <CardTitle className="flex items-center text-3xl mb-4">
              <Database className="h-8 w-8 mr-4 text-albania-red" />
              {t('Technical Implementation')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="font-bold text-xl text-albania-red">{t('Data Collection Schedule')}</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{t('Morning Update')}:</span>
                    <span className="font-bold text-albania-red">6:00 AM (GMT+1)</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{t('Evening Update')}:</span>
                    <span className="font-bold text-albania-red">6:00 PM (GMT+1)</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{t('Processing Time')}:</span>
                    <span className="font-bold text-green-600">~5-10 minutes</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="font-bold text-xl text-albania-red">{t('Data Sources & Coverage')}</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{t('Primary Sources')}:</span>
                    <span className="font-bold text-blue-600">5+ platforms</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{t('Coverage Areas')}:</span>
                    <span className="font-bold text-blue-600">12+ regions</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">{t('Data Points')}:</span>
                    <span className="font-bold text-blue-600">15,000+ listings</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-albania-red/10 to-red-600/10 rounded-2xl border-l-4 border-l-albania-red">
              <p className="text-lg leading-relaxed">
                <strong className="text-albania-red">{t('Automated AI Process')}:</strong> {t('Our system uses PostgreSQL cron jobs to automatically trigger data collection and AI analysis. The entire pipeline runs without manual intervention, ensuring consistent and reliable market data updates with intelligent pattern recognition.')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
