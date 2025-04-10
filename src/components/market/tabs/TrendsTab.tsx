
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useIsMobile } from '../../../hooks/use-mobile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import MarketInsights from '../../MarketInsights';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const seasonalTrends = [
  { month: 'Jan', listingVolume: 240, transactionVolume: 150, priceIndex: 98 },
  { month: 'Feb', listingVolume: 300, transactionVolume: 180, priceIndex: 99 },
  { month: 'Mar', listingVolume: 380, transactionVolume: 220, priceIndex: 100 },
  { month: 'Apr', listingVolume: 460, transactionVolume: 250, priceIndex: 102 },
  { month: 'May', listingVolume: 520, transactionVolume: 280, priceIndex: 104 },
  { month: 'Jun', listingVolume: 580, transactionVolume: 320, priceIndex: 105 },
  { month: 'Jul', listingVolume: 600, transactionVolume: 350, priceIndex: 106 },
  { month: 'Aug', listingVolume: 570, transactionVolume: 340, priceIndex: 106 },
  { month: 'Sep', listingVolume: 510, transactionVolume: 310, priceIndex: 105 },
  { month: 'Oct', listingVolume: 450, transactionVolume: 270, priceIndex: 103 },
  { month: 'Nov', listingVolume: 380, transactionVolume: 220, priceIndex: 101 },
  { month: 'Dec', listingVolume: 320, transactionVolume: 190, priceIndex: 99 }
];

const TrendsTab: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <>
      <div className="mb-6">
        <MarketInsights />
      </div>
      
      {/* Seasonality Trends */}
      <div className="mb-6">
        <Card className="w-full hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">{t('analysis.seasonality')}</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              {t('analysis.seasonality.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={seasonalTrends}
                  margin={{
                    top: 5,
                    right: isMobile ? 10 : 30,
                    left: isMobile ? 0 : 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{fontSize: isMobile ? 10 : 12}} />
                  <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                  <Tooltip />
                  <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
                  <Line type="monotone" dataKey="listingVolume" name={t('market.listings')} stroke="#E41E20" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="transactionVolume" name={t('market.transactions')} stroke="#000000" />
                  <Line type="monotone" dataKey="priceIndex" name={t('market.price.index')} stroke="#0088FE" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-white">
                {t('market.peak.season')}: {t('market.may')}-{t('market.june')}
              </Badge>
              <Badge variant="outline" className="bg-white">
                {t('market.low.season')}: {t('market.december')}-{t('market.january')}
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default TrendsTab;
