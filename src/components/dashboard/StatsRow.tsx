
import React from 'react';
import StatCard from '../StatCard';
import WebCrawlerStatus from '../WebCrawlerStatus';
import { useLanguage } from '../../contexts/LanguageContext';
import { TrendingUp, Home, Building } from 'lucide-react';
import { marketStats, dataSources } from '../../data/propertyData';

const StatsRow: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
      <StatCard 
        title={t('Çmimi mesatar')}
        value={`${marketStats.averagePrice} €`}
        subtext={t('për m²')}
        change={marketStats.yearlyChange}
        icon={<TrendingUp className="w-5 h-5" />}
      />
      
      <StatCard 
        title={t('Njoftime totale')}
        value={marketStats.totalListings.toLocaleString()}
        change={7.2}
        icon={<Home className="w-5 h-5" />}
      />
      
      <StatCard 
        title={t('Çmimi për m²')}
        value={`${marketStats.pricePerSqm} €`}
        change={marketStats.quarterlyChange}
        icon={<Building className="w-5 h-5" />}
      />
      
      <WebCrawlerStatus 
        lastUpdated={marketStats.lastUpdated}
        progress={85}
        totalSources={dataSources.length}
        completedSources={dataSources.filter((_, i) => i % 5 !== 0).length}
      />
    </div>
  );
};

export default StatsRow;
