
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import { propertiesData } from '../data/propertyData';

const Properties: React.FC = () => {
  const { t } = useLanguage();
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);

  const handleFilter = (filters: any) => {
    // In a real app, this would make API calls with the filters
    // For now, we'll do simple client-side filtering
    const filtered = propertiesData.filter(property => {
      // Filter by price
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }
      
      // Filter by size
      if (property.size < filters.sizeRange[0] || property.size > filters.sizeRange[1]) {
        return false;
      }
      
      // Filter by property type
      if (filters.propertyType !== 'all' && property.type !== filters.propertyType) {
        return false;
      }
      
      // Filter by rooms
      if (filters.rooms !== 'all') {
        if (filters.rooms === '4+' && property.rooms < 4) {
          return false;
        } else if (filters.rooms !== '4+' && property.rooms !== parseInt(filters.rooms)) {
          return false;
        }
      }
      
      // Filter by search term
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        if (!property.title.toLowerCase().includes(searchLower) && 
            !property.titleEn.toLowerCase().includes(searchLower) &&
            !property.location.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      return true;
    });
    
    setFilteredProperties(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('properties.title')}</h1>
        <p className="text-gray-600">{t('properties.subtitle')}</p>
      </div>
      
      {/* Filters */}
      <PropertyFilters onFilter={handleFilter} />
      
      {/* Property grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg text-gray-500">{t('no.data')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
