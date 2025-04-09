
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { investmentMetrics } from '../../data/propertyData';

const InvestorMetricsTab: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <Card className="overflow-hidden hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">{t('Analiza e kthimit nga investimi')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('Përshkrimi i investimit në treg')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Card className="p-3">
                  <p className="text-xs text-gray-500">{t('Afatshkurtër')}</p>
                  <p className="font-semibold text-lg">{investmentMetrics.returnOnInvestment.shortTerm}%</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-gray-500">{t('Afatmesëm')}</p>
                  <p className="font-semibold text-lg">{investmentMetrics.returnOnInvestment.mediumTerm}%</p>
                </Card>
                <Card className="p-3">
                  <p className="text-xs text-gray-500">{t('Afatgjatë')}</p>
                  <p className="font-semibold text-lg">{investmentMetrics.returnOnInvestment.longTerm}%</p>
                </Card>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">{t('Kthimi nga qiraja')}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Card className="p-3">
                    <p className="text-xs text-gray-500">{t('Rezidenciale')}</p>
                    <p className="font-semibold">{investmentMetrics.rentalYield.residential.center}% - {investmentMetrics.rentalYield.residential.suburban}%</p>
                  </Card>
                  <Card className="p-3">
                    <p className="text-xs text-gray-500">{t('Komerciale')}</p>
                    <p className="font-semibold">{investmentMetrics.rentalYield.commercial.retail}% - {investmentMetrics.rentalYield.commercial.office}%</p>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>{t('Projeksione çmimesh')}: +{investmentMetrics.appreciationRate.oneYearForecast}% ({new Date().getFullYear() + 1})</span>
            </div>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden hover:shadow transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-base md:text-lg">{t('Origjina e investimeve')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="w-1/2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-albania-red mr-2"></div>
                  <span className="text-sm">{t('Investitorë vendas')}</span>
                </div>
                <div className="text-2xl font-bold">{investmentMetrics.investorOrigin.domestic}%</div>
              </div>
              <div className="w-1/2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-700 mr-2"></div>
                  <span className="text-sm">{t('Investitorë të huaj')}</span>
                </div>
                <div className="text-2xl font-bold">{investmentMetrics.investorOrigin.foreign}%</div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">{t('Investitorë të huaj')}</h4>
              <div className="grid grid-cols-3 gap-2">
                {investmentMetrics.foreignInvestors.slice(0, 3).map((investor, i) => (
                  <Card key={i} className="p-3">
                    <p className="text-xs text-gray-500">{investor.country}</p>
                    <p className="font-semibold">{investor.percentage}%</p>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InvestorMetricsTab;
