
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import StatCard from '../components/StatCard';
import PriceChart from '../components/PriceChart';
import PropertyTypeChart from '../components/PropertyTypeChart';
import RegionPriceTable from '../components/RegionPriceTable';
import WebCrawlerStatus from '../components/WebCrawlerStatus';
import WebCrawlerList from '../components/WebCrawlerList';
import { marketStats, dataSources } from '../data/propertyData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Home, TrendingUp, Building } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-3 py-6">
      <div className="mb-6">
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{t('dashboard.title')}</h1>
        <p className="text-gray-600 text-sm md:text-base">{t('dashboard.subtitle')}</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
        <StatCard 
          title={t('dashboard.avg.price')}
          value={`${marketStats.averagePrice} €`}
          subtext={t('sqm')}
          change={marketStats.yearlyChange}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        
        <StatCard 
          title={t('dashboard.total.listings')}
          value={marketStats.totalListings.toLocaleString()}
          change={7.2}
          icon={<Home className="w-5 h-5" />}
        />
        
        <StatCard 
          title={t('dashboard.price.sqm')}
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
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <BarChart className="h-5 w-5 text-albania-red" />
              {t('dashboard.price.trends')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PriceChart title="" />
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <BarChart className="h-5 w-5 text-albania-red" />
              {t('property.types')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyTypeChart title="" />
          </CardContent>
        </Card>
      </div>
      
      {/* Table */}
      <div className="mb-6">
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingUp className="h-5 w-5 text-albania-red" />
              {t('dashboard.price.regions')}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <RegionPriceTable title="" />
          </CardContent>
        </Card>
      </div>

      {/* Web Crawlers Section */}
      <div className="mb-6">
        <WebCrawlerList />
      </div>
    </div>
  );
};

export default Dashboard;
