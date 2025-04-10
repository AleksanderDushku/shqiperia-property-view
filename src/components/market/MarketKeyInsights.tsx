
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Briefcase } from 'lucide-react';

const MarketKeyInsights: React.FC = () => {
  const { t } = useLanguage();
  
  const marketKeyInsights = [
    {
      title: t('market.infrastructure.impact'),
      content: 'Major transportation infrastructure projects have increased property values by an average of 18% in affected areas, creating development opportunities.',
    },
    {
      title: t('market.regulatory.changes'),
      content: 'New zoning regulations have opened up previously restricted areas for mixed-use development, particularly in the western districts.',
    },
    {
      title: t('market.tech.influence'),
      content: 'Property technology adoption is accelerating, with virtual tours increasing showing efficiency by 35% and reducing time-to-sale by 22%.',
    },
    {
      title: t('market.development.costs'),
      content: 'Construction costs have risen by 8.7% year-over-year, primarily driven by material costs and labor shortages in specialized trades.',
    }
  ];

  return (
    <Card className="mb-6 border-l-4 border-l-albania-red">
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-albania-red" />
          {t('market.key.insights')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketKeyInsights.map((insight, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-sm md:text-base mb-2 text-albania-red">{insight.title}</h3>
              <p className="text-gray-700 text-xs md:text-sm">{insight.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketKeyInsights;
