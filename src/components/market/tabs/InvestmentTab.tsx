
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { investmentMetrics } from '../../../data/propertyData';

const InvestmentTab: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <Card className="w-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">{t('market.price.income.ratio')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('market.price.income.explanation')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-5xl font-bold text-albania-red mb-2">
                {investmentMetrics.priceToIncomeRatio}
              </div>
              <div className="text-sm text-gray-500">{t('market.years')}</div>
              
              <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-md">
                <div className="text-center">
                  <div className="text-sm font-medium">{t('region.tirana')}</div>
                  <div className="text-lg font-bold">11.2</div>
                  <div className="text-xs text-gray-500">{t('market.years')}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{t('region.durres')}</div>
                  <div className="text-lg font-bold">8.4</div>
                  <div className="text-xs text-gray-500">{t('market.years')}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{t('region.vlore')}</div>
                  <div className="text-lg font-bold">9.7</div>
                  <div className="text-xs text-gray-500">{t('market.years')}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">{t('market.roi.potential')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('analysis.roi.analysis')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-center h-full py-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <Card className="p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">{t('analysis.short.term')}</div>
                  <div className="text-2xl font-bold text-black">{investmentMetrics.returnOnInvestment.shortTerm}%</div>
                  <div className="text-xs text-gray-500">1 {t('market.year')}</div>
                </Card>
                <Card className="p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">{t('analysis.medium.term')}</div>
                  <div className="text-2xl font-bold text-black">{investmentMetrics.returnOnInvestment.mediumTerm}%</div>
                  <div className="text-xs text-gray-500">3 {t('market.years')}</div>
                </Card>
                <Card className="p-4 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">{t('analysis.long.term')}</div>
                  <div className="text-2xl font-bold text-black">{investmentMetrics.returnOnInvestment.longTerm}%</div>
                  <div className="text-xs text-gray-500">5 {t('market.years')}</div>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 border border-gray-200">
                  <div className="text-sm font-medium mb-1">{t('market.rental.yield')} - {t('property.residential')}</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-500">{t('region.center.tirana')}</div>
                      <div className="text-lg font-bold">{investmentMetrics.rentalYield.residential.center}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{t('region.suburbs')}</div>
                      <div className="text-lg font-bold">{investmentMetrics.rentalYield.residential.suburban}%</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 border border-gray-200">
                  <div className="text-sm font-medium mb-1">{t('market.rental.yield')} - {t('property.commercial')}</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-500">{t('market.retail')}</div>
                      <div className="text-lg font-bold">{investmentMetrics.rentalYield.commercial.retail}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{t('market.office')}</div>
                      <div className="text-lg font-bold">{investmentMetrics.rentalYield.commercial.office}%</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card className="w-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">{t('market.investment.origin')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('market.investment.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-500">{t('market.domestic.investors')}</div>
                      <div className="text-2xl font-bold">{investmentMetrics.investorOrigin.domestic}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{t('market.foreign.investors')}</div>
                      <div className="text-2xl font-bold">{investmentMetrics.investorOrigin.foreign}%</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-albania-red h-full rounded-full" 
                      style={{ width: `${investmentMetrics.investorOrigin.domestic}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  <div className="text-sm font-medium">{t('market.foreign.investors')}</div>
                  {investmentMetrics.foreignInvestors.map((investor, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-24 text-sm">{investor.country}</div>
                      <div className="flex-1 mx-2">
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-albania-red h-full rounded-full" 
                            style={{ width: `${investor.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{investor.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InvestmentTab;
