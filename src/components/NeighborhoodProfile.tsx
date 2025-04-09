
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Building, MapPin, Zap, Home, ShoppingBag, GraduationCap, Car, Bus, Clock, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NeighborhoodData {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  avgPrice: number;
  priceChange: number;
  propertyTypes: { type: string; percentage: number }[];
  amenities: { icon: string; name: string; nameEn: string; rating: number }[];
  commuteTimes: { place: string; placeEn: string; time: number; transport: 'car' | 'bus' }[];
  priceTrend: { year: string; price: number }[];
}

interface NeighborhoodProfileProps {
  neighborhood: NeighborhoodData;
}

const NeighborhoodProfile: React.FC<NeighborhoodProfileProps> = ({ neighborhood }) => {
  const { language, t } = useLanguage();
  
  // Helper for amenity icon
  const getAmenityIcon = (icon: string) => {
    switch(icon) {
      case 'shop': return <ShoppingBag className="h-4 w-4" />;
      case 'education': return <GraduationCap className="h-4 w-4" />;
      case 'transport': return <Bus className="h-4 w-4" />;
      case 'home': return <Home className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2 bg-gray-50">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-albania-red" />
          <CardTitle>{language === 'sq' ? neighborhood.name : neighborhood.nameEn}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2">
          {language === 'sq' ? neighborhood.description : neighborhood.descriptionEn}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="col-span-2">
            <div className="mb-2">
              <span className="text-sm text-gray-500">{t('Çmimi mesatar për m²')}</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">€{neighborhood.avgPrice}</span>
                <Badge className={`${neighborhood.priceChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {neighborhood.priceChange > 0 ? '+' : ''}{neighborhood.priceChange}%
                </Badge>
              </div>
            </div>
            
            <div className="h-40 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={neighborhood.priceTrend} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} width={40} />
                  <Tooltip formatter={(value) => [`€${value}`, t('Çmimi/m²')]} />
                  <Line type="monotone" dataKey="price" stroke="#e41e20" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">{t('Llojet e pronave')}</h4>
            <div className="space-y-2">
              {neighborhood.propertyTypes.map((type, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{type.type}</span>
                    <span className="font-medium">{type.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      className="bg-albania-red h-1.5 rounded-full" 
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Zap className="h-4 w-4 text-albania-red" />
              {t('Vlerësimi i lehtësive')}
            </h4>
            <div className="space-y-3">
              {neighborhood.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-gray-100">
                    {getAmenityIcon(amenity.icon)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">
                        {language === 'sq' ? amenity.name : amenity.nameEn}
                      </span>
                      <span className="text-sm font-medium">{amenity.rating}/5</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div 
                        className="bg-albania-red h-1.5 rounded-full" 
                        style={{ width: `${(amenity.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Clock className="h-4 w-4 text-albania-red" />
              {t('Kohët e udhëtimit')}
            </h4>
            <div className="space-y-2">
              {neighborhood.commuteTimes.map((commute, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    {commute.transport === 'car' ? 
                      <Car className="h-4 w-4 text-gray-500" /> : 
                      <Bus className="h-4 w-4 text-gray-500" />
                    }
                    <span className="text-sm">
                      {language === 'sq' ? commute.place : commute.placeEn}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{commute.time} min</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 py-3 flex justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <TrendingUp className="h-3 w-3" />
          <span>{t('Të dhëna të përditësuara')}: {new Date().toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NeighborhoodProfile;
