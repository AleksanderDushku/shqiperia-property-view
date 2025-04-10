
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Download, Printer, Share2, Filter } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const MarketHeader: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{t('market.title')}</h1>
          <p className="text-gray-600 text-sm md:text-base">{t('market.subtitle')}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
            <Download className="h-3.5 w-3.5" />
            <span>{t('download.data')}</span>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
            <Printer className="h-3.5 w-3.5" />
            <span>{t('print')}</span>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
            <Share2 className="h-3.5 w-3.5" />
            <span>{t('share')}</span>
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
            <Filter className="h-3.5 w-3.5" />
            <span>{t('filter.results')}</span>
          </Button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-gray-50">
          {t('dashboard.last.updated')}: {new Date().toLocaleDateString()}
        </Badge>
        <Badge variant="secondary" className="bg-albania-red text-white hover:bg-albania-red/90">
          {t('high.opportunity')} - {t('region.tirana')}
        </Badge>
        <Badge variant="secondary" className="bg-albania-red text-white hover:bg-albania-red/90">
          {t('high.opportunity')} - {t('region.vlore')}
        </Badge>
      </div>
    </div>
  );
};

export default MarketHeader;
