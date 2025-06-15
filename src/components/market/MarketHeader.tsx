
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col space-y-4">
        <div className="text-center md:text-left">
          <h2 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-3 bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent`}>
            {t('Analiza e Tregut të Pronave')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
            {t('Të dhëna të detajuara për tregun e pronave në Shqipëri dhe rajonet kryesore')}
          </p>
        </div>
        
        {/* Action Buttons - Mobile Optimized */}
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-wrap justify-center md:justify-end'} gap-2 md:gap-3`}>
          <Button 
            size={isMobile ? "sm" : "default"} 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center gap-2 shadow-lg"
          >
            <Download className="h-4 w-4" />
            <span className={isMobile ? 'text-xs' : 'text-sm'}>{t('Shkarko të Dhënat')}</span>
          </Button>
          
          {!isMobile && (
            <>
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
            </>
          )}
          
          {/* Mobile Condensed Actions */}
          {isMobile && (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-1">
                <Printer className="h-3 w-3" />
                <span className="text-xs">{t('Printo')}</span>
              </Button>
              <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-1">
                <Share2 className="h-3 w-3" />
                <span className="text-xs">{t('Ndaj')}</span>
              </Button>
              <Button size="sm" variant="outline" className="flex-1 flex items-center justify-center gap-1">
                <Filter className="h-3 w-3" />
                <span className="text-xs">{t('Filtro')}</span>
              </Button>
            </div>
          )}
        </div>
        
        {/* Status Badges - Mobile Optimized */}
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-wrap justify-center md:justify-start'} gap-2 md:gap-3`}>
          <Badge className="bg-gradient-to-r from-albania-red to-red-600 text-white hover:from-red-600 hover:to-red-700 px-3 py-1.5 flex items-center gap-2 shadow-lg w-fit">
            <Clock className="h-3 w-3 md:h-4 md:w-4" />
            <span className={isMobile ? 'text-xs' : 'text-sm'}>
              {t('Përditësuar')}: {new Date().toLocaleDateString('sq')}
            </span>
          </Badge>
          
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-wrap'} gap-2`}>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-3 py-1.5 flex items-center gap-2 shadow-lg w-fit">
              <Zap className="h-3 w-3 md:h-4 md:w-4" />
              <span className={isMobile ? 'text-xs' : 'text-sm'}>
                {t('Mundësi e Lartë')} - {t('Tiranë')}
              </span>
            </Badge>
            
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 px-3 py-1.5 flex items-center gap-2 shadow-lg w-fit">
              <Zap className="h-3 w-3 md:h-4 md:w-4" />
              <span className={isMobile ? 'text-xs' : 'text-sm'}>
                {t('Mundësi e Lartë')} - {t('Vlorë')}
              </span>
            </Badge>
            
            <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 px-3 py-1.5 flex items-center gap-2 shadow-lg w-fit">
              <Zap className="h-3 w-3 md:h-4 md:w-4" />
              <span className={isMobile ? 'text-xs' : 'text-sm'}>
                {t('Rritje')} +15% - {t('Durrës')}
              </span>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHeader;
