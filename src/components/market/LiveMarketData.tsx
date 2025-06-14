
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Activity, BarChart3, MapPin, Database } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useLanguage } from '../../contexts/LanguageContext';
import { LoadingSkeleton } from '../ui/loading-skeleton';
import { DataUpdateStatus } from '../ui/data-update-status';
import { AIAnalysisIndicator } from '../ui/ai-analysis-indicator';
import { ModernStatsCard } from '../ui/modern-stats-card';

interface MarketData {
  id: string;
  date: string;
  average_price_per_sqm: number;
  total_listings: number;
  quarterly_change: number;
  yearly_change: number;
  most_active_region: string;
  growth_regions: string[];
  market_sentiment: 'bullish' | 'bearish' | 'neutral';
  opportunity_index: number;
}

const LiveMarketData: React.FC = () => {
  const { t } = useLanguage();
  const [market_data, set_market_data] = useState<MarketData | null>(null);
  const [loading, set_loading] = useState(true);
  const [last_updated, set_last_updated] = useState<string>('');

  useEffect(() => {
    fetch_market_data();
  }, []);

  const fetch_market_data = async () => {
    try {
      const { data, error } = await supabase
        .from('market_data')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      
      const typed_data: MarketData = {
        ...data,
        market_sentiment: data.market_sentiment as 'bullish' | 'bearish' | 'neutral'
      };
      
      set_market_data(typed_data);
      set_last_updated(new Date(data.updated_at || data.created_at).toLocaleString());
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      set_loading(false);
    }
  };

  const get_sentiment_color = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'bearish': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const get_sentiment_icon = (sentiment: string) => {
    return sentiment === 'bullish' ? <TrendingUp className="h-4 w-4" /> :
           sentiment === 'bearish' ? <TrendingDown className="h-4 w-4" /> :
           <Activity className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <LoadingSkeleton className="w-64 h-8 mb-2" />
            <LoadingSkeleton className="w-48 h-4" />
          </div>
          <LoadingSkeleton className="w-32 h-8" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="h-48">
              <CardContent className="p-6">
                <LoadingSkeleton rows={3} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!market_data) {
    return (
      <Card className="col-span-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-0">
        <CardContent className="p-12 text-center">
          <div className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 w-fit mx-auto mb-6">
            <Database className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-xl font-medium mb-2">{t('No market data available')}</p>
          <p className="text-sm text-gray-400">{t('Market data will be updated twice daily')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent">
            {t('Live Market Data')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t('Last updated')}: {last_updated}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <DataUpdateStatus />
        </div>
      </div>

      <AIAnalysisIndicator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModernStatsCard
          title={t('Average Price')}
          value={`€${market_data.average_price_per_sqm.toFixed(0)}/m²`}
          change={market_data.yearly_change}
          period={t('yearly')}
          icon={<BarChart3 className="h-6 w-6" />}
          gradient="from-albania-red to-red-600"
          badge={t('Per m²')}
        />

        <ModernStatsCard
          title={t('Total Listings')}
          value={market_data.total_listings.toLocaleString()}
          change={market_data.quarterly_change}
          period={t('quarterly')}
          icon={<Activity className="h-6 w-6" />}
          gradient="from-blue-500 to-indigo-600"
          badge={t('Active')}
        />

        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 group-hover:opacity-10 transition-opacity"></div>
          <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>
          
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
              {t('Market Sentiment')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-0">
            <Badge className={`${get_sentiment_color(market_data.market_sentiment)} flex items-center w-fit mb-4 border shadow-sm`}>
              {get_sentiment_icon(market_data.market_sentiment)}
              <span className="ml-2 capitalize font-medium">{market_data.market_sentiment}</span>
            </Badge>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
              <MapPin className="h-3 w-3 mr-1 text-albania-red" />
              <span className="font-medium">{t('Most Active')}: {market_data.most_active_region}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 opacity-5 group-hover:opacity-10 transition-opacity"></div>
          <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-600"></div>
          
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6" />
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                {t('AI Score')}
              </Badge>
            </div>
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
              {t('Opportunity Index')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:scale-105 transition-transform">
              {market_data.opportunity_index}/100
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-purple-500 to-violet-600 h-3 rounded-full transition-all duration-1000 shadow-lg"
                style={{ width: `${market_data.opportunity_index}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
              <span className="font-medium">{t('Growth regions')}: </span>
              {market_data.growth_regions.join(', ')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveMarketData;
