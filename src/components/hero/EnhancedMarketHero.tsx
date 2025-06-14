
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, MapPin, Building2, BarChart3, Clock, RefreshCw, Zap, Brain } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const EnhancedMarketHero: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: t('AI-Powered Analysis'),
      description: t('Advanced algorithms analyze market patterns and predict investment opportunities'),
      color: 'from-purple-500 to-violet-600'
    },
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
    }
  ];

  return (
    <div className={`relative overflow-hidden ${dark_mode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-albania-red/20' : 'bg-gradient-to-br from-albania-red via-red-700 to-red-800'} text-white`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-3 text-base font-medium shadow-lg">
              <Zap className="h-5 w-5 mr-2 animate-pulse" />
              {t('Live Market Data')} • {t('Updated Twice Daily')}
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {t('Real Estate Market')}
            </span>
            <span className="block text-3xl md:text-5xl font-normal mt-6 opacity-90">
              {t('Albania & Tirana Analysis')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 max-w-5xl mx-auto leading-relaxed mb-12">
            {t('Get comprehensive insights into Albania\'s property market with real-time data, AI-powered trends analysis, and investment opportunities updated twice daily.')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-white text-albania-red hover:bg-gray-100 font-semibold px-10 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <Link to="/market">
                {t('Explore Market Data')}
                <BarChart3 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-10 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <Link to="/calculator">
                {t('Investment Calculator')}
                <TrendingUp className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
              <CardContent className="p-10 text-center">
                <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-gray-100 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base opacity-90 leading-relaxed group-hover:opacity-100 transition-opacity">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Data Update Schedule */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-lg rounded-3xl px-10 py-6 border border-white/20 shadow-2xl">
            <div className="p-3 bg-white/20 rounded-full">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white text-xl">{t('Automated AI Updates')}</p>
              <p className="text-base opacity-90">{t('Daily at 6:00 AM & 6:00 PM (GMT+1)')}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">{t('Live')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMarketHero;
