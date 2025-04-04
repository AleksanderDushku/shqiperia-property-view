
import React from 'react';
import Dashboard from './Dashboard';
import { useLanguage } from '../contexts/LanguageContext';

const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <Dashboard />
    </div>
  );
};

export default Index;
