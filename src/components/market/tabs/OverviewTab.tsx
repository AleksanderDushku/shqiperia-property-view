
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useIsMobile } from '../../../hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import PriceChart from '../../PriceChart';
import PropertyTypeChart from '../../PropertyTypeChart';
import RegionPriceTable from '../../RegionPriceTable';
import { BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';

const quarterlyData = [
  { quarter: 'Q1 2024', supply: 1245, demand: 1520, opportunity_index: 85 },
  { quarter: 'Q2 2024', supply: 1350, demand: 1480, opportunity_index: 82 },
  { quarter: 'Q3 2024', supply: 1420, demand: 1580, opportunity_index: 88 },
  { quarter: 'Q4 2024', supply: 1520, demand: 1620, opportunity_index: 90 },
  { quarter: 'Q1 2025', supply: 1480, demand: 1680, opportunity_index: 92 },
];

const OverviewTab: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Price Evolution with professional context */}
      <div className="mb-6">
        <Card className="w-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">{t('market.price.evolution')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('market.price.trends.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PriceChart title="" />
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2 flex justify-between">
            <span>{t('property.luxury')}: +12% {t('year.over.year')}</span>
            <span>{t('property.commercial')}: +7.8% {t('year.over.year')}</span>
          </CardFooter>
        </Card>
      </div>
      
      {/* Supply and Demand with opportunity index */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <Card className="w-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">{t('market.supply.demand')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('market.trends.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={quarterlyData}
                  margin={{
                    top: 5,
                    right: isMobile ? 10 : 30,
                    left: isMobile ? 0 : 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" tick={{fontSize: isMobile ? 10 : 12}} />
                  <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
                  <Bar dataKey="supply" name={t('market.supply')} fill="#000000" />
                  <Bar dataKey="demand" name={t('market.demand')} fill="#E41E20" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white">
                {t('market.opportunity.index')}: {quarterlyData[quarterlyData.length - 1].opportunity_index}/100
              </Badge>
              <span className="text-green-600">
                +{(quarterlyData[quarterlyData.length - 1].opportunity_index - quarterlyData[0].opportunity_index)} pts
              </span>
            </div>
          </CardFooter>
        </Card>
        
        <PropertyTypeChart title={t('property.distribution')} />
      </div>
      
      {/* Regional Prices with investment recommendations */}
      <div className="mb-6 overflow-x-auto">
        <Card className="w-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">{t('market.quarterly.change')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('market.regional.price.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegionPriceTable title="" />
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
            <span>{t('market.highest.growth')}: {t('region.tirana')} (+7.2%), {t('region.vlore')} (+6.8%)</span>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default OverviewTab;
