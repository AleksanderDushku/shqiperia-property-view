
import React from 'react';
import Dashboard from './Dashboard';
import WebCrawlerList from '../components/WebCrawlerList';
import { useLanguage } from '../contexts/LanguageContext';

const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <Dashboard />
      
      <div className="container mx-auto px-4 pb-8">
        <h2 className="text-2xl font-bold mb-4">{t('crawler.title')}</h2>
        <p className="text-gray-600 mb-6">{t('crawler.description')}</p>
        <WebCrawlerList />
      </div>
    </div>
  );
};

export default Index;
