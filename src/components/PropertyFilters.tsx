
import React, { useState } from 'react';
import { Search, Filter, Home, Building, Map } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from './ui/badge';

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
  
  // Advanced filters
  const [bathrooms, setBathrooms] = useState<string>('all');
  const [yearBuilt, setYearBuilt] = useState<number[]>([1950, 2025]);
  const [floorLevel, setFloorLevel] = useState<string>('all');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [propertyStatus, setPropertyStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewAdvanced, setViewAdvanced] = useState<boolean>(false);

  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  const handleApplyFilters = () => {
    onFilter({
      priceRange,
      sizeRange,
      rooms,
      propertyType,
      location,
      searchTerm,
      bathrooms,
      yearBuilt,
      floorLevel,
      amenities,
      propertyStatus,
      sortBy
    });
  };

  const handleResetFilters = () => {
    setPriceRange([0, 500000]);
    setSizeRange([0, 300]);
    setRooms('all');
    setPropertyType('all');
    setLocation('all');
    setSearchTerm('');
    setBathrooms('all');
    setYearBuilt([1950, 2025]);
    setFloorLevel('all');
    setAmenities([]);
    setPropertyStatus('all');
    setSortBy('newest');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-100">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold flex items-center gap-1.5">
            <Filter className="h-4 w-4 text-albania-red" /> 
            {t('Filtrime të pronave')}
          </h3>
          <Button 
            variant="link" 
            className="text-albania-red p-0 h-auto"
            onClick={() => setViewAdvanced(!viewAdvanced)}
          >
            {viewAdvanced ? t('Filtrime bazë') : t('Filtrime të avancuara')}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('Kërko emër, vendndodhje...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          {/* Property Type */}
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="flex items-center">
              <Building className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder={t('Lloji i pronës')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('Të gjitha')}</SelectItem>
              <SelectItem value="apartment">{t('Apartament')}</SelectItem>
              <SelectItem value="house">{t('Shtëpi')}</SelectItem>
              <SelectItem value="land">{t('Tokë')}</SelectItem>
              <SelectItem value="commercial">{t('Biznes')}</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Rooms */}
          <Select value={rooms} onValueChange={setRooms}>
            <SelectTrigger>
              <Home className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder={t('Dhomat')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('Të gjitha')}</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4+">4+</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Location */}
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <Map className="h-4 w-4 mr-2 text-gray-500" />
              <SelectValue placeholder={t('Vendndodhja')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('Të gjitha')}</SelectItem>
              <SelectItem value="tirane">{t('Tiranë')}</SelectItem>
              <SelectItem value="durres">{t('Durrës')}</SelectItem>
              <SelectItem value="vlore">{t('Vlorë')}</SelectItem>
              <SelectItem value="sarande">{t('Sarandë')}</SelectItem>
              <SelectItem value="shkoder">{t('Shkodër')}</SelectItem>
              <SelectItem value="elbasan">{t('Elbasan')}</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Price Range */}
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span>{t('Çmimi')}:</span>
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
              <span>{t('Sipërfaqja')}:</span>
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
      </div>
      
      {/* Advanced Filters */}
      {viewAdvanced && (
        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="advanced-filters" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">
              {t('Filtrime shtesë')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {/* Bathrooms */}
                <div>
                  <label className="text-sm font-medium mb-1 block">{t('Banja')}</label>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Zgjidhni numrin e banjave')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('Të gjitha')}</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Floor Level */}
                <div>
                  <label className="text-sm font-medium mb-1 block">{t('Kati')}</label>
                  <Select value={floorLevel} onValueChange={setFloorLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Zgjidhni katin')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('Të gjitha')}</SelectItem>
                      <SelectItem value="ground">{t('Kati përdhes')}</SelectItem>
                      <SelectItem value="1-3">{t('Kati 1-3')}</SelectItem>
                      <SelectItem value="4-6">{t('Kati 4-6')}</SelectItem>
                      <SelectItem value="7+">{t('Kati 7+')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Year Built */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">{t('Viti i ndërtimit')}:</label>
                    <span className="text-sm">{yearBuilt[0]} - {yearBuilt[1]}</span>
                  </div>
                  <Slider
                    defaultValue={[1950, 2025]}
                    min={1950}
                    max={2025}
                    step={5}
                    value={yearBuilt}
                    onValueChange={setYearBuilt}
                  />
                </div>
                
                {/* Property Status */}
                <div>
                  <label className="text-sm font-medium mb-1 block">{t('Statusi')}</label>
                  <Select value={propertyStatus} onValueChange={setPropertyStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Zgjidhni statusin')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('Të gjitha')}</SelectItem>
                      <SelectItem value="sale">{t('Në shitje')}</SelectItem>
                      <SelectItem value="rent">{t('Me qira')}</SelectItem>
                      <SelectItem value="new">{t('E re')}</SelectItem>
                      <SelectItem value="under-construction">{t('Në ndërtim')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium mb-1 block">{t('Rendit sipas')}</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('Zgjidhni renditjen')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">{t('Më të rejat')}</SelectItem>
                      <SelectItem value="price-asc">{t('Çmimi: I ulët në të lartë')}</SelectItem>
                      <SelectItem value="price-desc">{t('Çmimi: I lartë në të ulët')}</SelectItem>
                      <SelectItem value="size-asc">{t('Sipërfaqja: E vogël në të madhe')}</SelectItem>
                      <SelectItem value="size-desc">{t('Sipërfaqja: E madhe në të vogël')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Amenities */}
                <div>
                  <label className="text-sm font-medium mb-1 block">{t('Veçori shtesë')}</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="amenity-balcony" 
                        checked={amenities.includes('balcony')}
                        onCheckedChange={() => handleAmenityToggle('balcony')}
                      />
                      <label htmlFor="amenity-balcony" className="text-sm">{t('Ballkon')}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="amenity-parking" 
                        checked={amenities.includes('parking')}
                        onCheckedChange={() => handleAmenityToggle('parking')}
                      />
                      <label htmlFor="amenity-parking" className="text-sm">{t('Parking')}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="amenity-elevator" 
                        checked={amenities.includes('elevator')}
                        onCheckedChange={() => handleAmenityToggle('elevator')}
                      />
                      <label htmlFor="amenity-elevator" className="text-sm">{t('Ashensor')}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="amenity-furnished" 
                        checked={amenities.includes('furnished')}
                        onCheckedChange={() => handleAmenityToggle('furnished')}
                      />
                      <label htmlFor="amenity-furnished" className="text-sm">{t('I mobiluar')}</label>
                    </div>
                  </div>
                </div>
              </div>
              
              {amenities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {amenities.map(amenity => (
                    <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                      {amenity === 'balcony' && t('Ballkon')}
                      {amenity === 'parking' && t('Parking')}
                      {amenity === 'elevator' && t('Ashensor')}
                      {amenity === 'furnished' && t('I mobiluar')}
                      <button 
                        className="ml-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleAmenityToggle(amenity)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleResetFilters} 
          className="text-gray-500"
        >
          {t('Pastro filtrat')}
        </Button>
        <Button 
          onClick={handleApplyFilters} 
          className="bg-albania-red hover:bg-albania-red/90 text-white"
        >
          {t('Apliko filtrat')}
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
