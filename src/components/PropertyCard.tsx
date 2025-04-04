
import React from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Property } from '../data/propertyData';
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { language, t } = useLanguage();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-[16/9] overflow-hidden relative">
        <img 
          src={property.imageUrl} 
          alt={language === 'sq' ? property.title : property.titleEn} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 px-2 py-1 bg-albania-red text-white text-xs rounded">
          {property.source}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
          {language === 'sq' ? property.title : property.titleEn}
        </h3>
        <p className="text-gray-500 text-sm mb-2">{property.location}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-albania-red">
            {formatPrice(property.price)} €
          </span>
          <span className="text-sm text-gray-500">
            {property.size} {t('sqm')}
          </span>
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-700">
          {property.type !== 'land' && (
            <div className="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{property.rooms} {t('properties.rooms')}</span>
            </div>
          )}
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{t(`property.${property.type}`)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 bg-gray-50 text-xs text-gray-500">
        {t('dashboard.price.sqm')}: {Math.round(property.price / property.size)} €/m²
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
