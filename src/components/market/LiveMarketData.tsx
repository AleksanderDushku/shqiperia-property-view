
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useLanguage } from '../../contexts/LanguageContext';

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
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      set_loading(false);
    }
  };

  const get_sentiment_color = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'bg-green-100 text-green-800';
      case 'bearish': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const get_sentiment_icon = (sentiment: string) => {
    return sentiment === 'bullish' ? <TrendingUp className="h-4 w-4" /> :
           sentiment === 'bearish' ? <TrendingDown className="h-4 w-4" /> :
           <Activity className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-32">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!market_data) {
    return (
      <Card className="col-span-full">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">{t('No market data available')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
            <BarChart3 className="h-4 w-4 mr-2 text-albania-red" />
            {t('Average Price')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{market_data.average_price_per_sqm.toFixed(0)}/m²</div>
          <div className="flex items-center mt-1">
            {market_data.yearly_change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
            )}
            <span className={`text-sm ${market_data.yearly_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {market_data.yearly_change >= 0 ? '+' : ''}{market_data.yearly_change.toFixed(1)}% {t('yearly')}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
            <Activity className="h-4 w-4 mr-2 text-albania-red" />
            {t('Total Listings')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{market_data.total_listings.toLocaleString()}</div>
          <div className="flex items-center mt-1">
            {market_data.quarterly_change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
            )}
            <span className={`text-sm ${market_data.quarterly_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {market_data.quarterly_change >= 0 ? '+' : ''}{market_data.quarterly_change.toFixed(1)}% {t('quarterly')}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {t('Market Sentiment')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge className={`${get_sentiment_color(market_data.market_sentiment)} flex items-center w-fit`}>
            {get_sentiment_icon(market_data.market_sentiment)}
            <span className="ml-1 capitalize">{market_data.market_sentiment}</span>
          </Badge>
          <div className="text-sm text-gray-500 mt-2">
            {t('Most Active')}: {market_data.most_active_region}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            {t('Opportunity Index')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{market_data.opportunity_index}/100</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-albania-red h-2 rounded-full transition-all duration-300"
              style={{ width: `${market_data.opportunity_index}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {t('Growth regions')}: {market_data.growth_regions.join(', ')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveMarketData;
