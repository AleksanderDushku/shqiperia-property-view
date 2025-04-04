
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import StatCard from '../components/StatCard';
import PriceChart from '../components/PriceChart';
import PropertyTypeChart from '../components/PropertyTypeChart';
import RegionPriceTable from '../components/RegionPriceTable';
import WebCrawlerStatus from '../components/WebCrawlerStatus';
import { marketStats } from '../data/propertyData';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h1>
        <p className="text-gray-600">{t('dashboard.subtitle')}</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title={t('dashboard.avg.price')}
          value={`${marketStats.averagePrice} €`}
          subtext={t('sqm')}
          change={marketStats.yearlyChange}
        />
        
        <StatCard 
          title={t('dashboard.total.listings')}
          value={marketStats.totalListings.toLocaleString()}
          change={7.2}
        />
        
        <StatCard 
          title={t('dashboard.price.sqm')}
          value={`${marketStats.pricePerSqm} €`}
          change={marketStats.quarterlyChange}
        />
        
        <WebCrawlerStatus 
          lastUpdated={marketStats.lastUpdated}
          progress={85}
          totalSources={5}
          completedSources={5}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PriceChart title={t('dashboard.price.trends')} />
        <PropertyTypeChart title={t('property.types')} />
      </div>
      
      {/* Table */}
      <RegionPriceTable title={t('dashboard.price.regions')} />
    </div>
  );
};

export default Dashboard;
