
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { investmentData } from '../../../data/investmentData';

const InvestmentMetrics: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Rental Yield */}
      <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
        <CardHeader>
          <CardTitle>{t('market.rental.yield')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>{t('property.residential')} - {t('region.center.tirana')}</span>
              <Badge variant="outline">{investmentData.rentalYield.residential.center}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('property.residential')} - {t('region.suburbs')}</span>
              <Badge variant="outline">{investmentData.rentalYield.residential.suburban}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('market.retail')}</span>
              <Badge variant="outline">{investmentData.rentalYield.commercial.retail}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('market.office')}</span>
              <Badge variant="outline">{investmentData.rentalYield.commercial.office}%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Appreciation */}
      <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
        <CardHeader>
          <CardTitle>{t('analysis.price.projections')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>5-{t('market.year')} {t('dashboard.avg.price')}</span>
              <Badge className="bg-green-500 text-white">+{investmentData.appreciationRate.fiveYearAvg}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>1-{t('market.year')} {t('Projeksion')}</span>
              <Badge className="bg-blue-500 text-white">+{investmentData.appreciationRate.oneYearForecast}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('market.domestic.investors')}</span>
              <Badge variant="outline">{investmentData.investorOrigin.domestic}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>{t('market.foreign.investors')}</span>
              <Badge variant="outline">{investmentData.investorOrigin.foreign}%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentMetrics;
