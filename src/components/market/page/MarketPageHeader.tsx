
import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useIsMobile } from '../../../hooks/use-mobile';
import { Button } from '../../ui/button';
import { Settings, Bot, Zap } from 'lucide-react';
import MarketHeader from '../MarketHeader';
import MarketStats from '../MarketStats';

interface MarketPageHeaderProps {
  onToggleCustomization: () => void;
  onToggleAIAssistant: () => void;
}

const MarketPageHeader: React.FC<MarketPageHeaderProps> = ({
  onToggleCustomization,
  onToggleAIAssistant,
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className={`mb-${isMobile ? '8' : '12'}`}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-albania-red to-red-600 text-white px-4 py-2 rounded-full shadow-lg mb-4">
          <Zap className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} animate-pulse`} />
          <span className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>
            {t('Live Market Data')} - {t('Albania')}
          </span>
        </div>
        
        <div className="flex justify-center gap-2 mb-4">
          <Button
            size={isMobile ? "sm" : "default"}
            variant="outline"
            onClick={onToggleCustomization}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {!isMobile && <span>{t('Customize')}</span>}
          </Button>
          <Button
            size={isMobile ? "sm" : "default"}
            variant="outline"
            onClick={onToggleAIAssistant}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0"
          >
            <Bot className="h-4 w-4" />
            {!isMobile && <span>{t('AI Assistant')}</span>}
          </Button>
        </div>
        
        <h1 className={`${isMobile ? 'text-2xl md:text-4xl' : 'text-4xl md:text-6xl'} font-bold bg-gradient-to-r from-albania-red via-red-600 to-red-800 bg-clip-text text-transparent mb-4`}>
          {t('Tregu i Pronave')}
        </h1>
        <p className={`${isMobile ? 'text-base' : 'text-xl'} text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4`}>
          {t('Analiza profesionale e tregut e përditësuar dy herë në ditë në orën 6 të mëngjesit dhe 6 të mbrëmjes')}
        </p>
      </div>
      
      <MarketHeader />
      
      <MarketStats />
    </div>
  );
};

export default MarketPageHeader;
