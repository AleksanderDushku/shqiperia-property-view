
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { BarChart, TrendingUp, ExternalLink, Info } from 'lucide-react';
import PriceChart from '../PriceChart';
import PropertyTypeChart from '../PropertyTypeChart';
import RegionPriceTable from '../RegionPriceTable';
import { useLanguage } from '../../contexts/LanguageContext';
import { marketStats } from '../../data/propertyData';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const MarketOverviewTab: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();
  
  return (
    <>
      {/* Data source badge */}
      <div className="mb-4 flex items-center justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={`text-xs flex items-center gap-1 ${dark_mode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : ''}`}
                onClick={() => window.open('https://www.instat.gov.al/en/themes/industry-trade-and-services/construction-industry/', '_blank')}
              >
                <Info className="h-3.5 w-3.5 text-albania-red" />
                <span>{t('INSTAT')}</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="max-w-xs text-xs">{t('Të dhënat e bazuara në statistikat zyrtare të INSTAT-it')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <Card className={`overflow-hidden transition-all duration-300 ${dark_mode ? 'hover:border-gray-600 border-gray-700' : 'hover:shadow-lg'}`}>
          <CardHeader className={`pb-2 ${dark_mode ? 'bg-gray-800' : ''}`}>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <BarChart className="h-5 w-5 text-albania-red" />
              {t('Trendet e çmimeve')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PriceChart title="" />
          </CardContent>
          <CardFooter className={`text-xs py-2 flex justify-between ${dark_mode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
            <span>{t('Vit mbi vit')}: +{marketStats.yearlyChange}%</span>
            <span>{t('Tremujor mbi tremujor')}: +{marketStats.quarterlyChange}%</span>
          </CardFooter>
        </Card>
        
        <Card className={`overflow-hidden transition-all duration-300 ${dark_mode ? 'hover:border-gray-600 border-gray-700' : 'hover:shadow-lg'}`}>
          <CardHeader className={`pb-2 ${dark_mode ? 'bg-gray-800' : ''}`}>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <BarChart className="h-5 w-5 text-albania-red" />
              {t('Llojet e pronave')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyTypeChart title="" />
          </CardContent>
          <CardFooter className={`text-xs py-2 ${dark_mode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={`${dark_mode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700'}`}>
                {t('Apartamente')}: 58%
              </Badge>
              <Badge variant="outline" className={`${dark_mode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700'}`}>
                {t('Luksoze')}: +2.1% {t('vit mbi vit')}
              </Badge>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Table */}
      <div className="mb-6">
        <Card className={`overflow-hidden transition-all duration-300 ${dark_mode ? 'hover:border-gray-600 border-gray-700' : 'hover:shadow-lg'}`}>
          <CardHeader className={`pb-2 ${dark_mode ? 'bg-gray-800' : ''}`}>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingUp className="h-5 w-5 text-albania-red" />
              {t('Çmimet sipas rajoneve')}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <RegionPriceTable title="" />
          </CardContent>
          <CardFooter className={`text-xs py-2 ${dark_mode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
            <span>{t('Mundësi të larta')}: {t('Tiranë')}, {t('Vlorë')}</span>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default MarketOverviewTab;
