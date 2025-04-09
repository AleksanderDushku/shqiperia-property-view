
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from './ui/card';
import { MapPin, Home, BuildingIcon, TrendingUp, Table } from 'lucide-react';
import { NeighborhoodData } from '../types/neighborhood';

interface PropertyMapProps {
  neighborhoods: NeighborhoodData[];
  selectedCity: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ neighborhoods, selectedCity }) => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeNeighborhood, setActiveNeighborhood] = useState<NeighborhoodData | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // City coordinates
  const cityCoordinates: Record<string, { lat: number; lng: number }> = {
    tirane: { lat: 41.3275, lng: 19.8187 },
    durres: { lat: 41.3246, lng: 19.4565 },
    vlore: { lat: 40.4509, lng: 19.4931 }
  };

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNeighborhoodClick = (neighborhood: NeighborhoodData) => {
    setActiveNeighborhood(neighborhood);
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-albania-red" />
            {t('Lagjet në')} {t(selectedCity === 'tirane' ? 'Tiranë' : selectedCity === 'durres' ? 'Durrës' : 'Vlorë')}
          </h3>
          
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {neighborhoods.map(neighborhood => (
              <div 
                key={neighborhood.id}
                className={`p-3 rounded-md cursor-pointer transition-all hover:bg-gray-50 ${activeNeighborhood?.id === neighborhood.id ? 'bg-red-50 border-l-4 border-albania-red' : 'bg-gray-50'}`}
                onClick={() => handleNeighborhoodClick(neighborhood)}
              >
                <div className="font-medium">{neighborhood.name}</div>
                <div className="text-sm text-gray-500 mt-1">{t('Çmimi mesatar')}: €{neighborhood.avgPrice}/m²</div>
                <div className="text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className={`h-3 w-3 ${neighborhood.priceChange > 0 ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={neighborhood.priceChange > 0 ? 'text-green-600' : 'text-red-600'}>
                    {neighborhood.priceChange > 0 ? '+' : ''}{neighborhood.priceChange}% {t('vit mbi vit')}
                  </span>
                </div>
              </div>
            ))}

            {neighborhoods.length === 0 && (
              <div className="text-center py-8">
                <MapPin className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">{t('Nuk u gjetën lagje')}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-3 min-h-[500px] relative">
          {!mapLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border-4 border-albania-red border-t-transparent animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500">{t('Duke ngarkuar hartën...')}</p>
              </div>
            </div>
          ) : (
            <>
              <div 
                ref={mapRef} 
                className="h-[500px] w-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/19.8187,41.3275,12,0/800x500?access_token=pk.mapbox_demo_token')] bg-no-repeat bg-cover"
              >
                <div className="relative h-full">
                  {/* Simulated neighborhood pins */}
                  {neighborhoods.map((neighborhood, index) => {
                    // Create simulated positions in a grid
                    const col = index % 3;
                    const row = Math.floor(index / 3);
                    const top = 30 + row * 80;
                    const left = 30 + col * 120;
                    
                    return (
                      <div 
                        key={neighborhood.id}
                        className={`absolute cursor-pointer transition-all transform hover:scale-110 ${activeNeighborhood?.id === neighborhood.id ? 'z-10' : 'z-0'}`}
                        style={{ top: `${top}%`, left: `${left}%` }}
                        onClick={() => handleNeighborhoodClick(neighborhood)}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeNeighborhood?.id === neighborhood.id ? 'bg-albania-red text-white' : 'bg-white text-albania-red border border-albania-red'}`}>
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded-md text-xs font-medium shadow">
                          {neighborhood.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {activeNeighborhood && (
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 border-t border-gray-200 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{activeNeighborhood.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{activeNeighborhood.description.substring(0, 100)}...</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4 text-albania-red" />
                          <span className="text-sm font-medium">€{activeNeighborhood.avgPrice}/m²</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BuildingIcon className="h-4 w-4 text-albania-red" />
                          <span className="text-sm">
                            {activeNeighborhood.propertyTypes[0].type}: {activeNeighborhood.propertyTypes[0].percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      className="bg-albania-red text-white text-xs px-3 py-1.5 rounded-md hover:bg-albania-red/90 transition-colors flex items-center gap-1"
                      onClick={() => setActiveNeighborhood(null)}
                    >
                      <Table className="h-3.5 w-3.5" />
                      {t('Shiko detajet')}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
