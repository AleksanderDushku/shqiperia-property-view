
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, MapPin, Activity, BarChart3, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CityData {
  id: string;
  name: string;
  nameEn: string;
  price_per_sqm: number;
  hot_percentage: number;
  growth_rate: number;
  properties_count: number;
  coordinates: { x: number; y: number };
  trend: 'up' | 'down' | 'stable';
  activity_level: 'high' | 'medium' | 'low';
}

const albanianCities: CityData[] = [
  {
    id: 'tirana',
    name: 'Tiranë',
    nameEn: 'Tirana',
    price_per_sqm: 2100,
    hot_percentage: 95,
    growth_rate: 12.5,
    properties_count: 4200,
    coordinates: { x: 50, y: 45 },
    trend: 'up',
    activity_level: 'high'
  },
  {
    id: 'durres',
    name: 'Durrës',
    nameEn: 'Durres',
    price_per_sqm: 1200,
    hot_percentage: 88,
    growth_rate: 8.2,
    properties_count: 1850,
    coordinates: { x: 45, y: 42 },
    trend: 'up',
    activity_level: 'high'
  },
  {
    id: 'vlore',
    name: 'Vlorë',
    nameEn: 'Vlore',
    price_per_sqm: 1450,
    hot_percentage: 92,
    growth_rate: 15.7,
    properties_count: 980,
    coordinates: { x: 42, y: 70 },
    trend: 'up',
    activity_level: 'high'
  },
  {
    id: 'sarande',
    name: 'Sarandë',
    nameEn: 'Sarande',
    price_per_sqm: 1650,
    hot_percentage: 98,
    growth_rate: 18.2,
    properties_count: 650,
    coordinates: { x: 48, y: 85 },
    trend: 'up',
    activity_level: 'high'
  },
  {
    id: 'shkoder',
    name: 'Shkodër',
    nameEn: 'Shkoder',
    price_per_sqm: 950,
    hot_percentage: 72,
    growth_rate: 5.3,
    properties_count: 720,
    coordinates: { x: 48, y: 25 },
    trend: 'stable',
    activity_level: 'medium'
  },
  {
    id: 'elbasan',
    name: 'Elbasan',
    nameEn: 'Elbasan',
    price_per_sqm: 850,
    hot_percentage: 68,
    growth_rate: 3.8,
    properties_count: 580,
    coordinates: { x: 55, y: 50 },
    trend: 'stable',
    activity_level: 'medium'
  },
  {
    id: 'korce',
    name: 'Korçë',
    nameEn: 'Korce',
    price_per_sqm: 780,
    hot_percentage: 65,
    growth_rate: 2.1,
    properties_count: 420,
    coordinates: { x: 68, y: 65 },
    trend: 'stable',
    activity_level: 'medium'
  },
  {
    id: 'berat',
    name: 'Berat',
    nameEn: 'Berat',
    price_per_sqm: 720,
    hot_percentage: 58,
    growth_rate: 1.9,
    properties_count: 310,
    coordinates: { x: 48, y: 62 },
    trend: 'down',
    activity_level: 'low'
  }
];

const AlbanianCitiesMap: React.FC = () => {
  const { language } = useLanguage();
  const [selected_city, set_selected_city] = useState<CityData | null>(null);
  const [hover_city, set_hover_city] = useState<CityData | null>(null);

  const get_hot_color = (percentage: number) => {
    if (percentage >= 90) return 'from-red-500 to-orange-600';
    if (percentage >= 75) return 'from-orange-500 to-yellow-500';
    if (percentage >= 60) return 'from-yellow-500 to-green-400';
    return 'from-blue-500 to-indigo-600';
  };

  const get_activity_color = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  const display_city = hover_city || selected_city;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Interactive Map */}
      <div className="lg:col-span-2">
        <Card className="h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-albania-red/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-albania-red">
              <MapPin className="h-6 w-6" />
              {language === 'sq' ? 'Harta e Shqipërisë' : 'Map of Albania'}
            </CardTitle>
          </CardHeader>
          <CardContent className="relative h-full p-6">
            {/* SVG Map Container */}
            <div className="relative w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl border-2 border-slate-300 shadow-inner overflow-hidden">
              {/* Albania outline - simplified */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              >
                <path
                  d="M35 20 L65 15 L75 25 L80 35 L75 50 L70 65 L65 75 L55 85 L45 90 L35 85 L30 75 L25 60 L20 45 L25 30 Z"
                  fill="rgba(220, 38, 38, 0.1)"
                  stroke="rgba(220, 38, 38, 0.3)"
                  strokeWidth="0.5"
                />
              </svg>

              {/* City markers */}
              {albanianCities.map((city) => (
                <div
                  key={city.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${city.coordinates.x}%`,
                    top: `${city.coordinates.y}%`
                  }}
                  onMouseEnter={() => set_hover_city(city)}
                  onMouseLeave={() => set_hover_city(null)}
                  onClick={() => set_selected_city(city)}
                >
                  {/* Hot percentage indicator */}
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${get_hot_color(city.hot_percentage)} shadow-lg border-2 border-white flex items-center justify-center text-white text-xs font-bold group-hover:scale-125 transition-all duration-300`}>
                    {city.hot_percentage}
                  </div>
                  
                  {/* City name label */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    <div className="text-xs font-semibold text-gray-800">
                      {language === 'sq' ? city.name : city.nameEn}
                    </div>
                    <div className="text-xs text-gray-600">
                      €{city.price_per_sqm}/m²
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200">
              <div className="text-xs font-semibold text-gray-800 mb-2">
                {language === 'sq' ? 'Përqindja e Nxehtësisë' : 'Hot Percentage'}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-orange-600"></div>
                <span>90%+</span>
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                <span>75%+</span>
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-green-400"></div>
                <span>60%+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* City Details Panel */}
      <div className="space-y-6">
        {display_city ? (
          <>
            <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-albania-red/20">
              <CardHeader className="bg-gradient-to-r from-albania-red to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span>{language === 'sq' ? display_city.name : display_city.nameEn}</span>
                  <Badge className={`${get_activity_color(display_city.activity_level)} text-white border-0`}>
                    {display_city.activity_level}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">€{display_city.price_per_sqm}</div>
                    <div className="text-sm text-gray-600">{language === 'sq' ? 'Çmimi/m²' : 'Price/m²'}</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-red-50 to-orange-100 rounded-lg">
                    <div className="text-2xl font-bold text-red-700">{display_city.hot_percentage}%</div>
                    <div className="text-sm text-gray-600">{language === 'sq' ? 'Nxehtësia' : 'Hotness'}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{language === 'sq' ? 'Rritja' : 'Growth'}</span>
                    </div>
                    <div className="font-semibold text-green-600">+{display_city.growth_rate}%</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{language === 'sq' ? 'Prona' : 'Properties'}</span>
                    </div>
                    <div className="font-semibold text-blue-600">{display_city.properties_count.toLocaleString()}</div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-albania-red to-red-600 hover:from-red-600 hover:to-red-700"
                  onClick={() => console.log('View details for', display_city.name)}
                >
                  {language === 'sq' ? 'Shiko Detajet' : 'View Details'}
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
            <CardContent className="p-8 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {language === 'sq' ? 'Zgjidhni një Qytet' : 'Select a City'}
              </h3>
              <p className="text-sm text-gray-500">
                {language === 'sq' 
                  ? 'Klikoni në një qytet në hartë për të parë detajet'
                  : 'Click on a city in the map to view details'
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Top Cities Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-albania-red">
              <Activity className="h-5 w-5" />
              {language === 'sq' ? 'Qytetet Kryesore' : 'Top Cities'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {albanianCities
              .sort((a, b) => b.hot_percentage - a.hot_percentage)
              .slice(0, 4)
              .map((city, index) => (
                <div 
                  key={city.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => set_selected_city(city)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-bold text-albania-red">#{index + 1}</div>
                    <div>
                      <div className="font-medium">{language === 'sq' ? city.name : city.nameEn}</div>
                      <div className="text-xs text-gray-500">€{city.price_per_sqm}/m²</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{city.hot_percentage}%</div>
                    <div className={`text-xs ${city.trend === 'up' ? 'text-green-600' : city.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                      {city.trend === 'up' ? '↗' : city.trend === 'down' ? '↘' : '→'} {city.growth_rate}%
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlbanianCitiesMap;
