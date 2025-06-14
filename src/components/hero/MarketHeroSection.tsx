
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, MapPin, Building2, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

const MarketHeroSection: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
    <div className={`relative overflow-hidden ${dark_mode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-albania-red to-red-700'} text-white py-16 px-4`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative container mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-white/20 text-white border-white/30 mb-4">
            <BarChart3 className="h-4 w-4 mr-2" />
            {t('Live Market Data')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('Real Estate Market')}
            <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">
              {t('Albania & Tirana Analysis')}
            </span>
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            {t('Get comprehensive insights into Albania\'s property market with real-time data, trends analysis, and investment opportunities updated daily.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-2">{t('Daily Updates')}</h3>
              <p className="text-sm opacity-90">
                {t('Automated daily market data collection and analysis')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-2">{t('Regional Analysis')}</h3>
              <p className="text-sm opacity-90">
                {t('Detailed insights for Tirana, Durrës, Vlorë, and other major cities')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6 text-center">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-2">{t('Investment Insights')}</h3>
              <p className="text-sm opacity-90">
                {t('Professional analysis for investors and developers')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketHeroSection;
