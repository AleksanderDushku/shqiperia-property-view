
import React from 'react';
import Dashboard from './Dashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';

const Index: React.FC = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className={`animate-fade-in space-y-6 ${isMobile ? 'px-2' : 'px-4'}`}>
      <div className="container mx-auto py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {language === 'sq' ? 'Analiza e Tregut të Pronave në Shqipëri' : 'Albanian Property Market Analysis'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'sq' 
              ? 'Platforma më e besueshme për të dhëna të sakta dhe në kohë reale mbi tregun e pronave në Shqipëri'
              : 'The most reliable platform for accurate and real-time data on the Albanian property market'}
          </p>
        </div>
      </div>
      <Dashboard />
    </div>
  );
};

export default Index;
