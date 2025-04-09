
import React from 'react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Download, Share2, Printer } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useIsMobile } from '../../hooks/use-mobile';
import { marketStats } from '../../data/propertyData';

const DashboardHeader: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{t('Paneli i analizës së tregut')}</h1>
          <p className="text-gray-600 text-sm md:text-base">{t('Statistika dhe trende të tregut të pronave në Shqipëri')}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
            <Download className="h-3.5 w-3.5" />
            <span>{t('Shkarko të dhënat')}</span>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
            <Printer className="h-3.5 w-3.5" />
            <span>{t('Printo')}</span>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
            <Share2 className="h-3.5 w-3.5" />
            <span>{t('Ndaj')}</span>
          </Button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-gray-50">
          {t('Përditësuar më')}: {new Date(marketStats.lastUpdated).toLocaleDateString()}
        </Badge>
        <Badge variant="secondary" className="bg-albania-red text-white hover:bg-albania-red/90">
          +{marketStats.yearlyChange}% {t('vit mbi vit')}
        </Badge>
      </div>
    </div>
  );
};

export default DashboardHeader;
