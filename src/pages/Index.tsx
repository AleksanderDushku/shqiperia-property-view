
import React from 'react';
import Dashboard from './Dashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className={`space-y-6 ${isMobile ? 'px-2' : 'px-4'}`}>
      <Dashboard />
    </div>
  );
};

export default Index;
