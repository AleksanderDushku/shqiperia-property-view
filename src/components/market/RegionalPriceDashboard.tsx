
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, MapPin, Filter } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface RegionalData {
  region: string;
  price_per_m2: number;
  quarterly_change: number;
  market_activity: 'high' | 'medium' | 'low';
  property_count: number;
  avg_size: number;
  luxury_percentage: number;
}

const mockRegionalData: RegionalData[] = [
  {
    region: 'Tiranë Center',
    price_per_m2: 2100,
    quarterly_change: 8.5,
    market_activity: 'high',
    property_count: 1250,
    avg_size: 85,
    luxury_percentage: 35,
  },
  {
    region: 'Tiranë Bllok',
    price_per_m2: 2350,
    quarterly_change: 12.3,
    market_activity: 'high',
    property_count: 680,
    avg_size: 95,
    luxury_percentage: 55,
  },
  {
    region: 'Durrës Coast',
    price_per_m2: 1200,
    quarterly_change: 6.2,
    market_activity: 'medium',
    property_count: 890,
    avg_size: 78,
    luxury_percentage: 25,
  },
  {
    region: 'Vlorë Bay',
    price_per_m2: 1450,
    quarterly_change: 15.7,
    market_activity: 'high',
    property_count: 420,
    avg_size: 82,
    luxury_percentage: 40,
  },
  {
    region: 'Sarandë Riviera',
    price_per_m2: 1650,
    quarterly_change: 18.2,
    market_activity: 'high',
    property_count: 320,
    avg_size: 88,
    luxury_percentage: 60,
  },
  {
    region: 'Shkodër Historic',
    price_per_m2: 780,
    quarterly_change: -2.1,
    market_activity: 'low',
    property_count: 180,
    avg_size: 75,
    luxury_percentage: 15,
  },
];

const chartConfig = {
  price_per_m2: {
    label: "Price per m²",
    color: "#E41E20",
  },
  quarterly_change: {
    label: "Quarterly Change (%)",
    color: "#000000",
  },
};

const RegionalPriceDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();
  const [selectedRegion, set_selected_region] = useState<string>('all');
  const [view_mode, set_view_mode] = useState<'prices' | 'changes' | 'activity'>('prices');
  const [filtered_data, set_filtered_data] = useState<RegionalData[]>(mockRegionalData);

  useEffect(() => {
    if (selectedRegion === 'all') {
      set_filtered_data(mockRegionalData);
    } else {
      set_filtered_data(mockRegionalData.filter(item => item.region === selectedRegion));
    }
  }, [selectedRegion]);

  const get_activity_color = (activity: string) => {
    switch (activity) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const get_change_icon = (change: number) => {
    return change >= 0 ? 
      <TrendingUp className="h-4 w-4 text-green-600" /> : 
      <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Select value={selectedRegion} onValueChange={set_selected_region}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t('Select Region')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('All Regions')}</SelectItem>
              {mockRegionalData.map((region) => (
                <SelectItem key={region.region} value={region.region}>
                  {region.region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-1">
            <Button
              variant={view_mode === 'prices' ? 'default' : 'outline'}
              size="sm"
              onClick={() => set_view_mode('prices')}
              className={view_mode === 'prices' ? 'bg-albania-red text-white' : ''}
            >
              {t('Prices')}
            </Button>
            <Button
              variant={view_mode === 'changes' ? 'default' : 'outline'}
              size="sm"
              onClick={() => set_view_mode('changes')}
              className={view_mode === 'changes' ? 'bg-albania-red text-white' : ''}
            >
              {t('Changes')}
            </Button>
            <Button
              variant={view_mode === 'activity' ? 'default' : 'outline'}
              size="sm"
              onClick={() => set_view_mode('activity')}
              className={view_mode === 'activity' ? 'bg-albania-red text-white' : ''}
            >
              {t('Activity')}
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive Chart */}
      <Card className={`transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-albania-red" />
            {view_mode === 'prices' && t('Regional Price Comparison')}
            {view_mode === 'changes' && t('Quarterly Price Changes')}
            {view_mode === 'activity' && t('Market Activity Levels')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {view_mode === 'prices' ? (
                <BarChart data={filtered_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="region" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: any) => [`€${value}/m²`, 'Price']}
                  />
                  <Bar 
                    dataKey="price_per_m2" 
                    fill="var(--color-price_per_m2)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : view_mode === 'changes' ? (
                <LineChart data={filtered_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="region" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: any) => [`${value}%`, 'Change']}
                  />
                  <Line 
                    type="monotone"
                    dataKey="quarterly_change" 
                    stroke="var(--color-quarterly_change)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-quarterly_change)", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              ) : (
                <BarChart data={filtered_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="region" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value: any) => [`${value}`, 'Properties']}
                  />
                  <Bar 
                    dataKey="property_count" 
                    fill="var(--color-price_per_m2)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered_data.map((region) => (
          <Card key={region.region} className={`transition-all duration-300 hover:shadow-lg ${dark_mode ? 'border-gray-700' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{region.region}</h3>
                <div className={`w-3 h-3 rounded-full ${get_activity_color(region.market_activity)}`} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{t('Price per m²')}</span>
                  <span className="font-bold">€{region.price_per_m2.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{t('Change')}</span>
                  <div className="flex items-center gap-1">
                    {get_change_icon(region.quarterly_change)}
                    <span className={`text-sm font-medium ${region.quarterly_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {region.quarterly_change >= 0 ? '+' : ''}{region.quarterly_change}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{t('Properties')}</span>
                  <span className="text-sm">{region.property_count}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {region.luxury_percentage}% {t('Luxury')}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {region.avg_size}m² {t('Avg')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RegionalPriceDashboard;
