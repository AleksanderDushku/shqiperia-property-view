
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { BarChart, TrendingUp } from 'lucide-react';
import PriceChart from '../PriceChart';
import PropertyTypeChart from '../PropertyTypeChart';
import RegionPriceTable from '../RegionPriceTable';
import { useLanguage } from '../../contexts/LanguageContext';
import { marketStats } from '../../data/propertyData';

const MarketOverviewTab: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <BarChart className="h-5 w-5 text-albania-red" />
              {t('Trendet e çmimeve')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PriceChart title="" />
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2 flex justify-between">
            <span>{t('Vit mbi vit')}: +{marketStats.yearlyChange}%</span>
            <span>{t('Tremujor mbi tremujor')}: +{marketStats.quarterlyChange}%</span>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <BarChart className="h-5 w-5 text-albania-red" />
              {t('Llojet e pronave')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyTypeChart title="" />
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-white text-gray-700">
                {t('Apartamente')}: 58%
              </Badge>
              <Badge variant="outline" className="bg-white text-gray-700">
                {t('Luksoze')}: +2.1% {t('vit mbi vit')}
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Table */}
      <div className="mb-6">
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingUp className="h-5 w-5 text-albania-red" />
              {t('Çmimet sipas rajoneve')}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <RegionPriceTable title="" />
          </CardContent>
          <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
            <span>{t('Mundësi të larta')}: {t('Tiranë')}, {t('Vlorë')}</span>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default MarketOverviewTab;
