import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TrendingUp, BarChart3, Activity, MapPin, Building } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import 'leaflet/dist/leaflet.css';
import L, { Map as LeafletMap } from 'leaflet';
import MapModeToggle from './MapModeToggle';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CityData {
  id: string;
  name: string;
  nameEn: string;
  price_per_sqm: number;
  hot_percentage: number;
  growth_rate: number;
  properties_count: number;
  coordinates: { lat: number; lng: number };
  trend: 'up' | 'down' | 'stable';
  activity_level: 'high' | 'medium' | 'low';
}

const albanianCities: CityData[] = [
  { id: 'tirana', name: 'Tiranë', nameEn: 'Tirana', price_per_sqm: 2100, hot_percentage: 95, growth_rate: 12.5, properties_count: 4200, coordinates: { lat: 41.3275, lng: 19.8187 }, trend: 'up', activity_level: 'high' },
  { id: 'durres', name: 'Durrës', nameEn: 'Durres', price_per_sqm: 1200, hot_percentage: 88, growth_rate: 8.2, properties_count: 1850, coordinates: { lat: 41.3133, lng: 19.4544 }, trend: 'up', activity_level: 'high' },
  { id: 'vlore', name: 'Vlorë', nameEn: 'Vlore', price_per_sqm: 1450, hot_percentage: 92, growth_rate: 15.7, properties_count: 980, coordinates: { lat: 40.4667, lng: 19.4897 }, trend: 'up', activity_level: 'high' },
  { id: 'sarande', name: 'Sarandë', nameEn: 'Sarande', price_per_sqm: 1650, hot_percentage: 98, growth_rate: 18.2, properties_count: 650, coordinates: { lat: 39.8756, lng: 20.0053 }, trend: 'up', activity_level: 'high' },
  { id: 'shkoder', name: 'Shkodër', nameEn: 'Shkoder', price_per_sqm: 950, hot_percentage: 72, growth_rate: 5.3, properties_count: 720, coordinates: { lat: 42.0695, lng: 19.5132 }, trend: 'stable', activity_level: 'medium' },
  { id: 'elbasan', name: 'Elbasan', nameEn: 'Elbasan', price_per_sqm: 850, hot_percentage: 68, growth_rate: 3.8, properties_count: 580, coordinates: { lat: 41.1125, lng: 20.0822 }, trend: 'stable', activity_level: 'medium' },
  { id: 'korce', name: 'Korçë', nameEn: 'Korce', price_per_sqm: 780, hot_percentage: 65, growth_rate: 2.1, properties_count: 420, coordinates: { lat: 40.6186, lng: 20.7819 }, trend: 'stable', activity_level: 'medium' },
  { id: 'berat', name: 'Berat', nameEn: 'Berat', price_per_sqm: 720, hot_percentage: 58, growth_rate: 1.9, properties_count: 310, coordinates: { lat: 40.7058, lng: 19.9522 }, trend: 'down', activity_level: 'low' },
  { id: 'gjirokaster', name: 'Gjirokastër', nameEn: 'Gjirokaster', price_per_sqm: 680, hot_percentage: 62, growth_rate: 3.2, properties_count: 280, coordinates: { lat: 40.0769, lng: 20.1389 }, trend: 'stable', activity_level: 'medium' },
  { id: 'lezhe', name: 'Lezhë', nameEn: 'Lezhe', price_per_sqm: 720, hot_percentage: 58, growth_rate: 2.8, properties_count: 190, coordinates: { lat: 41.7836, lng: 19.6436 }, trend: 'stable', activity_level: 'low' }
];

const AlbanianCitiesMap: React.FC = () => {
  const { language } = useLanguage();
  const [selected_city, set_selected_city] = useState<CityData | null>(albanianCities[0]);
  const [map_style, set_map_style] = useState<string>('street');
  const mapRef = useRef<LeafletMap>(null);

  useEffect(() => {
    // When a city is selected, fly to its location on the map.
    if (mapRef.current && selected_city) {
      mapRef.current.flyTo([selected_city.coordinates.lat, selected_city.coordinates.lng], 11);
    }
  }, [selected_city]);

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

  const create_custom_icon = (city: CityData) => {
    const color = city.hot_percentage >= 90 ? '#ef4444' : 
                  city.hot_percentage >= 75 ? '#f97316' : 
                  city.hot_percentage >= 60 ? '#eab308' : '#3b82f6';
    
    return L.divIcon({
      html: `<div style="background: ${color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${city.hot_percentage}%</div>`,
      className: 'custom-div-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  // Map tile URLs
  const tile_urls = {
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-albania-red/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-albania-red">
                <MapPin className="h-6 w-6" />
                {language === 'sq' ? 'Harta e Tregut Shqiptar' : 'Albanian Market Map'}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative h-full p-0">
              <div className="h-full w-full relative">
                <MapContainer
                  ref={mapRef}
                  center={[41.1, 19.9]}
                  zoom={7}
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={true}
                >
                  <TileLayer
                    url={tile_urls[map_style as keyof typeof tile_urls]}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {albanianCities.map(city => (
                    <Marker
                      key={city.id}
                      position={[city.coordinates.lat, city.coordinates.lng]}
                      icon={create_custom_icon(city)}
                      eventHandlers={{
                        click: () => set_selected_city(city)
                      }}
                    >
                      <Popup>
                        <div className="font-bold">{language === 'sq' ? city.name : city.nameEn}</div>
                        <div>€{city.price_per_sqm}/m²</div>
                        <div>Hot: {city.hot_percentage}%</div>
                      </Popup>
                    </Marker>
                  ))}
                  
                </MapContainer>
                
                <MapModeToggle mapStyle={map_style} setMapStyle={set_map_style} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* City Details Panel */}
        <div className="space-y-6">
          {selected_city ? (
            <>
              <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-albania-red/20 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-albania-red to-red-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl">{language === 'sq' ? selected_city.name : selected_city.nameEn}</span>
                    <Badge className={`${get_activity_color(selected_city.activity_level)} text-white border-0 text-xs px-3 py-1`}>
                      {selected_city.activity_level.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200">
                      <div className="text-3xl font-bold text-green-700">€{selected_city.price_per_sqm}</div>
                      <div className="text-sm text-gray-600 font-medium">{language === 'sq' ? 'Çmimi/m²' : 'Price/m²'}</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-orange-100 rounded-xl border border-red-200">
                      <div className="text-3xl font-bold text-red-700">{selected_city.hot_percentage}%</div>
                      <div className="text-sm text-gray-600 font-medium">{language === 'sq' ? 'Nxehtësia' : 'Hotness'}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium">{language === 'sq' ? 'Rritja Vjetore' : 'Annual Growth'}</span>
                      </div>
                      <div className="font-bold text-green-600 text-lg">+{selected_city.growth_rate}%</div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{language === 'sq' ? 'Prona Aktive' : 'Active Properties'}</span>
                      </div>
                      <div className="font-bold text-blue-600 text-lg">{selected_city.properties_count.toLocaleString()}</div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-albania-red to-red-600 hover:from-red-600 hover:to-red-700 py-3 text-lg font-semibold"
                    onClick={() => console.log('View details for', selected_city.name)}
                  >
                    {language === 'sq' ? 'Shiko Detajet e Plota' : 'View Full Details'}
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 shadow-xl h-full flex items-center justify-center">
              <CardContent className="p-8 text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-3">
                  {language === 'sq' ? 'Zgjidhni një Qytet' : 'Select a City'}
                </h3>
                <p className="text-gray-500">
                  {language === 'sq' 
                    ? 'Klikoni në një qytet në hartë për të parë statistikat e detajuara'
                    : 'Click on a city marker to view detailed statistics'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Hottest Markets List */}
        <div className="lg:col-span-3">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-albania-red">
                  <Activity className="h-6 w-6" />
                  {language === 'sq' ? 'Qytetet më të Nxehta' : 'Hottest Markets'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {albanianCities
                  .sort((a, b) => b.hot_percentage - a.hot_percentage)
                  .slice(0, 5)
                  .map((city, index) => (
                    <div 
                      key={city.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 cursor-pointer transition-all duration-300 border border-gray-200"
                      onClick={() => {
                        set_selected_city(city);
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-bold text-albania-red bg-red-50 rounded-full w-8 h-8 flex items-center justify-center">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{language === 'sq' ? city.name : city.nameEn}</div>
                          <div className="text-sm text-gray-500">€{city.price_per_sqm}/m²</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-albania-red">{city.hot_percentage}%</div>
                        <div className={`text-sm font-medium ${city.trend === 'up' ? 'text-green-600' : city.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                          {city.trend === 'up' ? '↗️' : city.trend === 'down' ? '↘️' : '➡️'} {city.growth_rate}%
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AlbanianCitiesMap;
