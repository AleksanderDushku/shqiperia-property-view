
import React from 'react';
import { Switch } from '../ui/switch';
import { Map, Satellite } from 'lucide-react';

interface MapModeToggleProps {
  mapStyle: string;
  setMapStyle: (style: string) => void;
}

const MapModeToggle: React.FC<MapModeToggleProps> = ({ mapStyle, setMapStyle }) => {
  const isSatellite = mapStyle === 'satellite';

  const handleToggle = (checked: boolean) => {
    setMapStyle(checked ? 'satellite' : 'street');
  };

  return (
    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-xl border border-gray-200 z-[1000] flex items-center gap-3">
      <Map className={`h-5 w-5 transition-colors ${!isSatellite ? 'text-albania-red' : 'text-gray-500'}`} />
      <Switch
        id="map-mode"
        checked={isSatellite}
        onCheckedChange={handleToggle}
        aria-label="Toggle map style"
      />
      <Satellite className={`h-5 w-5 transition-colors ${isSatellite ? 'text-albania-red' : 'text-gray-500'}`} />
    </div>
  );
};

export default MapModeToggle;
