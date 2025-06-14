
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight, BarChart3, TrendingUp, MapPin, Calculator, Building } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const MarketOverviewCards: React.FC = () => {
  const { t } = useLanguage();

  const market_sections = [
    {
      title: t('Price Trends'),
      description: t('Comprehensive analysis of property price movements across Albania'),
      icon: <TrendingUp className="h-6 w-6" />,
      link: '/market',
      color: 'from-blue-500 to-indigo-600',
      badge: t('Updated Daily')
    },
    {
      title: t('Regional Analysis'),
      description: t('Deep dive into specific regions and neighborhoods with growth potential'),
      icon: <MapPin className="h-6 w-6" />,
      link: '/neighborhoods',
      color: 'from-green-500 to-emerald-600',
      badge: t('All Regions')
    },
    {
      title: t('Investment Calculator'),
      description: t('Calculate potential returns and mortgage options for your investments'),
      icon: <Calculator className="h-6 w-6" />,
      link: '/calculator',
      color: 'from-purple-500 to-violet-600',
      badge: t('Free Tool')
    },
    {
      title: t('Market Reports'),
      description: t('Professional reports and insights for serious investors and developers'),
      icon: <BarChart3 className="h-6 w-6" />,
      link: '/analysis',
      color: 'from-amber-500 to-orange-600',
      badge: t('Professional')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {market_sections.map((section, index) => (
        <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                {section.icon}
              </div>
              <Badge variant="secondary" className="text-xs">
                {section.badge}
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold group-hover:text-albania-red transition-colors">
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {section.description}
            </p>
            <Button asChild className="w-full group-hover:bg-albania-red transition-colors">
              <Link to={section.link} className="flex items-center justify-center">
                {t('Explore')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MarketOverviewCards;
