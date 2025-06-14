
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, MapPin, Building2, BarChart3, Clock, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const EnhancedMarketHero: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  const features = [
    {
      icon: <RefreshCw className="h-8 w-8" />,
      title: t('Twice Daily Updates'),
      description: t('Market data refreshed at 6 AM and 6 PM automatically'),
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: t('Regional Analysis'),
      description: t('Detailed insights for Tirana, Durrës, Vlorë, and other major cities'),
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: t('Investment Insights'),
      description: t('Professional analysis for investors and developers'),
      color: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <div className={`relative overflow-hidden ${dark_mode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-albania-red/20' : 'bg-gradient-to-br from-albania-red via-red-700 to-red-800'} text-white`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
              <BarChart3 className="h-4 w-4 mr-2" />
              {t('Live Market Data')} • {t('Updated Twice Daily')}
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('Real Estate Market')}
            <span className="block text-2xl md:text-4xl font-normal mt-4 opacity-90 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {t('Albania & Tirana Analysis')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed mb-8">
            {t('Get comprehensive insights into Albania\'s property market with real-time data, trends analysis, and investment opportunities updated twice daily.')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-albania-red hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
              <Link to="/market">
                {t('Explore Market Data')}
                <BarChart3 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 text-lg">
              <Link to="/calculator">
                {t('Investment Calculator')}
                <TrendingUp className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Update Schedule */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
            <Clock className="h-6 w-6 text-white" />
            <div className="text-left">
              <p className="font-semibold text-white">{t('Automated Updates')}</p>
              <p className="text-sm opacity-90">{t('Daily at 6:00 AM & 6:00 PM (GMT+1)')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMarketHero;
