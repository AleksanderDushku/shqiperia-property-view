
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyFiltersProps {
  onFilter: (filters: any) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFilter }) => {
  const { t } = useLanguage();
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
  const [sizeRange, setSizeRange] = useState<number[]>([0, 300]);
  const [rooms, setRooms] = useState<string>('all');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      sizeRange,
      rooms,
      propertyType,
      location,
      searchTerm
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('properties.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        {/* Property Type */}
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <SelectValue placeholder={t('all')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all')}</SelectItem>
            <SelectItem value="apartment">{t('property.apartment')}</SelectItem>
            <SelectItem value="house">{t('property.house')}</SelectItem>
            <SelectItem value="land">{t('property.land')}</SelectItem>
            <SelectItem value="commercial">{t('property.commercial')}</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Rooms */}
        <Select value={rooms} onValueChange={setRooms}>
          <SelectTrigger>
            <SelectValue placeholder={t('properties.rooms')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all')}</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4+">4+</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Location */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder={t('properties.location')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all')}</SelectItem>
            <SelectItem value="tirane">{t('region.tirana')}</SelectItem>
            <SelectItem value="durres">{t('region.durres')}</SelectItem>
            <SelectItem value="vlore">{t('region.vlore')}</SelectItem>
            <SelectItem value="sarande">{t('region.sarande')}</SelectItem>
            <SelectItem value="shkoder">{t('region.shkoder')}</SelectItem>
            <SelectItem value="elbasan">{t('region.elbasan')}</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Price Range */}
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>{t('properties.price')}:</span>
            <span>{priceRange[0]}€ - {priceRange[1]}€</span>
          </div>
          <Slider
            defaultValue={[0, 500000]}
            max={500000}
            step={10000}
            value={priceRange}
            onValueChange={setPriceRange}
          />
        </div>
        
        {/* Size Range */}
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>{t('properties.size')}:</span>
            <span>{sizeRange[0]}m² - {sizeRange[1]}m²</span>
          </div>
          <Slider
            defaultValue={[0, 300]}
            max={300}
            step={10}
            value={sizeRange}
            onValueChange={setSizeRange}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleApplyFilters} 
          className="bg-albania-red hover:bg-albania-red/90 text-white"
        >
          {t('properties.filter')}
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
