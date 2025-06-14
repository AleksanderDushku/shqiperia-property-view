
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Download, Printer, Share2, Filter, Clock, Zap } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const MarketHeader: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="mb-6 md:mb-0">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-3 bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent`}>
            {t('Analiza e Tregut të Pronave')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            {t('Të dhëna të detajuara për tregun e pronave në Shqipëri dhe rajonet kryesore')}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center gap-2 shadow-lg">
            <Download className="h-4 w-4" />
            <span>{t('Shkarko të Dhënat')}</span>
          </Button>
          <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 flex items-center gap-2">
            <Printer className="h-4 w-4" />
            <span>{t('Printo')}</span>
          </Button>
          <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>{t('Ndaj')}</span>
          </Button>
          <Button size="sm" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>{t('Filtro')}</span>
          </Button>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-3">
        <Badge className="bg-gradient-to-r from-albania-red to-red-600 text-white hover:from-red-600 hover:to-red-700 px-4 py-2 flex items-center gap-2 shadow-lg">
          <Clock className="h-4 w-4" />
          {t('Përditësuar')}: {new Date().toLocaleDateString('sq')}
        </Badge>
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-4 py-2 flex items-center gap-2 shadow-lg">
          <Zap className="h-4 w-4" />
          {t('Mundësi e Lartë')} - {t('Tiranë')}
        </Badge>
        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 px-4 py-2 flex items-center gap-2 shadow-lg">
          <Zap className="h-4 w-4" />
          {t('Mundësi e Lartë')} - {t('Vlorë')}
        </Badge>
        <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 px-4 py-2 flex items-center gap-2 shadow-lg">
          <Zap className="h-4 w-4" />
          {t('Rritje')} +15% - {t('Durrës')}
        </Badge>
      </div>
    </div>
  );
};

export default MarketHeader;
