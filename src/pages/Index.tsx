
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import LiveMarketData from '../components/market/LiveMarketData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { TrendingUp, MapPin, Calculator, BarChart3, Users, Building2, Target, ArrowRight, Zap, Brain, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  const company_benefits = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('Lead Generation'),
      description: t('Attract qualified buyers and sellers with market insights'),
      link: '/market',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: t('Client Tools'),
      description: t('Mortgage calculator and investment analysis for clients'),
      link: '/calculator',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: t('Market Intelligence'),
      description: t('Neighborhood insights and pricing intelligence'),
      link: '/neighborhoods',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: t('Professional Reports'),
      description: t('Market analysis reports for presentations'),
      link: '/analysis',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const quick_stats = [
    { value: '15,000+', label: t('Properties Tracked'), icon: <Building2 className="h-5 w-5" /> },
    { value: '12+', label: t('Cities Covered'), icon: <MapPin className="h-5 w-5" /> },
    { value: '2x', label: t('Daily Updates'), icon: <Clock className="h-5 w-5" /> },
    { value: '99.9%', label: t('Data Accuracy'), icon: <Target className="h-5 w-5" /> }
  ];

  return (
    <div className={`min-h-screen ${dark_mode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Minimal Hero Section */}
      <section className={`relative ${dark_mode ? 'bg-gradient-to-br from-gray-900 to-albania-red/20' : 'bg-gradient-to-br from-albania-red to-red-700'} text-white py-20`}>
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 mb-6">
            <Zap className="h-4 w-4 mr-2" />
            {t('AI-Powered Market Data')}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('Real Estate Intelligence')}
            <span className="block text-xl md:text-2xl font-normal mt-4 opacity-90">
              {t('For Modern Real Estate Professionals')}
            </span>
          </h1>
          
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            {t('Empower your real estate business with AI-driven market insights, automated reports, and client tools.')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-white text-albania-red hover:bg-gray-100 font-semibold px-8 py-3">
              <Link to="/market">
                {t('View Market Data')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quick_stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Real Estate Company Benefits */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent">
              {t('Grow Your Real Estate Business')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('Everything you need to serve clients better and close more deals')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {company_benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0">
                <div className={`h-1 bg-gradient-to-r ${benefit.color}`}></div>
                <CardHeader className="pb-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${benefit.color} text-white w-fit mb-3 group-hover:scale-110 transition-transform`}>
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-albania-red transition-colors">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {benefit.description}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={benefit.link}>
                      {t('Explore')}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Live Market Data - Simplified */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {t('Live Market Data')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('Updated automatically twice daily at 6 AM & 6 PM')}
            </p>
          </div>
          <LiveMarketData />
        </section>

        {/* AI Technology Highlight */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-2xl p-12 text-center">
          <div className="p-4 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white w-fit mx-auto mb-6">
            <Brain className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {t('Powered by AI & Automation')}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            {t('Our system automatically collects, validates, and analyzes market data from multiple sources using advanced AI algorithms.')}
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-albania-red">5+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('Data Sources')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-albania-red">2x</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('Daily Updates')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-albania-red">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('Monitoring')}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
