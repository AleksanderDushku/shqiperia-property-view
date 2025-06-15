
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { investmentData } from '../../../data/investmentData';

const ForeignInvestorsDetails: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
    <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
      <CardHeader>
        <CardTitle>{t('market.investment.origin')} - {t('Detajet')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {investmentData.foreignInvestors.map((investor) => (
            <div key={investor.country} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{investor.country}</span>
                <Badge className="bg-albania-red text-white">{investor.percentage}%</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('Total Investment')}: {investor.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForeignInvestorsDetails;
