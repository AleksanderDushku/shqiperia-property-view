
import React, { useState } from 'react';
import MarketKeyInsights from '../components/market/MarketKeyInsights';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useIsMobile } from '../hooks/use-mobile';
import MarketCustomization from '../components/market/MarketCustomization';
import MarketAIAssistant from '../components/market/MarketAIAssistant';
import MarketPageHeader from '../components/market/page/MarketPageHeader';
import MarketTabs from '../components/market/page/MarketTabs';

const Market: React.FC = () => {
  const { dark_mode } = useDarkMode();
  const isMobile = useIsMobile();
  const [showCustomization, setShowCustomization] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  return (
    <div className={`min-h-screen ${dark_mode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-albania-red/10' : 'bg-gradient-to-br from-gray-50 via-white to-albania-red/5'} ${isMobile ? 'py-4' : 'py-8'}`}>
      <div className={`container mx-auto ${isMobile ? 'px-3' : 'px-4'}`}>
        <MarketPageHeader
          onToggleCustomization={() => setShowCustomization((prev) => !prev)}
          onToggleAIAssistant={() => setShowAIAssistant((prev) => !prev)}
        />

        {showCustomization && (
          <div className="mb-8">
            <MarketCustomization />
          </div>
        )}

        {showAIAssistant && (
          <div className="mb-8">
            <MarketAIAssistant />
          </div>
        )}
        
        <div className={`mb-${isMobile ? '8' : '12'}`}>
          <MarketKeyInsights />
        </div>

        <MarketTabs />
      </div>
    </div>
  );
};

export default Market;
