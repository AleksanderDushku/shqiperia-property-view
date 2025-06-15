
import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { TrendingUp, DollarSign, Building } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { investmentData } from '../../../data/investmentData';

const RoiCards: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t('analysis.short.term')} ROI</p>
              <p className="text-2xl font-bold text-albania-red">{investmentData.returnOnInvestment.shortTerm}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-albania-red" />
          </div>
        </CardContent>
      </Card>

      <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t('analysis.medium.term')} ROI</p>
              <p className="text-2xl font-bold text-albania-red">{investmentData.returnOnInvestment.mediumTerm}%</p>
            </div>
            <DollarSign className="h-8 w-8 text-albania-red" />
          </div>
        </CardContent>
      </Card>

      <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{t('analysis.long.term')} ROI</p>
              <p className="text-2xl font-bold text-albania-red">{investmentData.returnOnInvestment.longTerm}%</p>
            </div>
            <Building className="h-8 w-8 text-albania-red" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoiCards;
