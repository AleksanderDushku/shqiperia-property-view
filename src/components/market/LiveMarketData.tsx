
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Activity, BarChart3, MapPin, Database } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useLanguage } from '../../contexts/LanguageContext';
import { LoadingSkeleton } from '../ui/loading-skeleton';
import { StatsDisplay } from '../ui/stats-display';
import { DataUpdateStatus } from '../ui/data-update-status';

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
      
      // Type assertion to ensure market_sentiment matches our expected type
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
      case 'bullish': return 'bg-green-100 text-green-800 border-green-200';
      case 'bearish': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
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
            <Card key={i} className="h-40">
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
      <Card className="col-span-full">
        <CardContent className="p-8 text-center">
          <Database className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 text-lg">{t('No market data available')}</p>
          <p className="text-sm text-gray-400 mt-2">{t('Market data will be updated twice daily')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {t('Live Market Data')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('Last updated')}: {last_updated}
          </p>
        </div>
        <DataUpdateStatus />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-albania-red">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-albania-red" />
              {t('Average Price')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatsDisplay
              label=""
              value={`€${market_data.average_price_per_sqm.toFixed(0)}/m²`}
              change={market_data.yearly_change}
              period={t('yearly')}
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Activity className="h-4 w-4 mr-2 text-blue-500" />
              {t('Total Listings')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatsDisplay
              label=""
              value={market_data.total_listings.toLocaleString()}
              change={market_data.quarterly_change}
              period={t('quarterly')}
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('Market Sentiment')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className={`${get_sentiment_color(market_data.market_sentiment)} flex items-center w-fit mb-3 border`}>
              {get_sentiment_icon(market_data.market_sentiment)}
              <span className="ml-1 capitalize">{market_data.market_sentiment}</span>
            </Badge>
            <div className="text-sm text-gray-500 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {t('Most Active')}: {market_data.most_active_region}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t('Opportunity Index')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{market_data.opportunity_index}/100</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div 
                className="bg-gradient-to-r from-albania-red to-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${market_data.opportunity_index}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">
              {t('Growth regions')}: {market_data.growth_regions.join(', ')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveMarketData;
