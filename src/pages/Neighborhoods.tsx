
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import NeighborhoodProfile from '../components/NeighborhoodProfile';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, MapPin, Building, Filter } from 'lucide-react';
import { NeighborhoodData } from '../types/neighborhood';
import PropertyMap from '../components/PropertyMap';

// Sample neighborhood data
const neighborhoodsData: NeighborhoodData[] = [
  {
    id: "bllok",
    name: "Blloku",
    nameEn: "The Block",
    description: "Zona më ekskluzive e Tiranës me restorante, bare dhe dyqane të shumta. Një nga zonat më të kërkuara për banim.",
    descriptionEn: "The most exclusive area of Tirana with numerous restaurants, bars and shops. One of the most sought-after residential areas.",
    avgPrice: 2200,
    priceChange: 8.5,
    propertyTypes: [
      { type: "Apartament", percentage: 85 },
      { type: "Ambient biznesi", percentage: 12 },
      { type: "Shtëpi", percentage: 3 }
    ],
    amenities: [
      { icon: "shop", name: "Dyqane & Restorante", nameEn: "Shops & Restaurants", rating: 5 },
      { icon: "transport", name: "Transport publik", nameEn: "Public Transport", rating: 4.5 },
      { icon: "education", name: "Shkolla & Kopshte", nameEn: "Schools & Kindergartens", rating: 3.5 },
    ],
    commuteTimes: [
      { place: "Qendra e qytetit", placeEn: "City Center", time: 5, transport: "car" },
      { place: "Stacioni i trenit", placeEn: "Train Station", time: 15, transport: "car" },
      { place: "Aeroporti", placeEn: "Airport", time: 30, transport: "car" }
    ],
    priceTrend: [
      { year: '2018', price: 1600 },
      { year: '2019', price: 1750 },
      { year: '2020', price: 1850 },
      { year: '2021', price: 1950 },
      { year: '2022', price: 2050 },
      { year: '2023', price: 2200 }
    ]
  },
  {
    id: "tirana-e-re",
    name: "Tirana e Re",
    nameEn: "New Tirana",
    description: "Zonë kryesisht rezidenciale me ndërtime të reja dhe infrastrukturë moderne. Ofron një ekuilibër të mirë mes çmimit dhe cilësisë.",
    descriptionEn: "Predominantly residential area with new constructions and modern infrastructure. Offers a good balance between price and quality.",
    avgPrice: 1650,
    priceChange: 6.2,
    propertyTypes: [
      { type: "Apartament", percentage: 78 },
      { type: "Ambient biznesi", percentage: 7 },
      { type: "Shtëpi", percentage: 15 }
    ],
    amenities: [
      { icon: "shop", name: "Dyqane & Restorante", nameEn: "Shops & Restaurants", rating: 4 },
      { icon: "transport", name: "Transport publik", nameEn: "Public Transport", rating: 3.5 },
      { icon: "education", name: "Shkolla & Kopshte", nameEn: "Schools & Kindergartens", rating: 4.5 },
    ],
    commuteTimes: [
      { place: "Qendra e qytetit", placeEn: "City Center", time: 10, transport: "car" },
      { place: "Stacioni i trenit", placeEn: "Train Station", time: 20, transport: "car" },
      { place: "Aeroporti", placeEn: "Airport", time: 25, transport: "car" }
    ],
    priceTrend: [
      { year: '2018', price: 1200 },
      { year: '2019', price: 1300 },
      { year: '2020', price: 1350 },
      { year: '2021', price: 1450 },
      { year: '2022', price: 1550 },
      { year: '2023', price: 1650 }
    ]
  },
  {
    id: "komuna-e-parisit",
    name: "Komuna e Parisit",
    nameEn: "Paris Commune",
    description: "Zonë me densitet të lartë banimi dhe pozicionim qendror. Karakterizohet nga një përzierje e ndërtimeve të vjetra dhe të reja.",
    descriptionEn: "High-density residential area with central positioning. Characterized by a mix of old and new constructions.",
    avgPrice: 1800,
    priceChange: 5.8,
    propertyTypes: [
      { type: "Apartament", percentage: 90 },
      { type: "Ambient biznesi", percentage: 8 },
      { type: "Shtëpi", percentage: 2 }
    ],
    amenities: [
      { icon: "shop", name: "Dyqane & Restorante", nameEn: "Shops & Restaurants", rating: 4.5 },
      { icon: "transport", name: "Transport publik", nameEn: "Public Transport", rating: 5 },
      { icon: "education", name: "Shkolla & Kopshte", nameEn: "Schools & Kindergartens", rating: 4 },
    ],
    commuteTimes: [
      { place: "Qendra e qytetit", placeEn: "City Center", time: 8, transport: "car" },
      { place: "Stacioni i trenit", placeEn: "Train Station", time: 18, transport: "car" },
      { place: "Aeroporti", placeEn: "Airport", time: 28, transport: "car" }
    ],
    priceTrend: [
      { year: '2018', price: 1350 },
      { year: '2019', price: 1450 },
      { year: '2020', price: 1550 },
      { year: '2021', price: 1650 },
      { year: '2022', price: 1750 },
      { year: '2023', price: 1800 }
    ]
  },
  {
    id: "blloku-vasil-shanto",
    name: "Blloku Vasil Shanto",
    nameEn: "Vasil Shanto Block",
    description: "Zonë në zhvillim e sipër me ndërtime të reja apartamentesh. Ka infrastrukturë të mirë dhe akses të lehtë në shërbimet publike.",
    descriptionEn: "Developing area with new apartment buildings. Has good infrastructure and easy access to public services.",
    avgPrice: 1500,
    priceChange: 7.2,
    propertyTypes: [
      { type: "Apartament", percentage: 85 },
      { type: "Ambient biznesi", percentage: 5 },
      { type: "Shtëpi", percentage: 10 }
    ],
    amenities: [
      { icon: "shop", name: "Dyqane & Restorante", nameEn: "Shops & Restaurants", rating: 3.5 },
      { icon: "transport", name: "Transport publik", nameEn: "Public Transport", rating: 4 },
      { icon: "education", name: "Shkolla & Kopshte", nameEn: "Schools & Kindergartens", rating: 4 },
    ],
    commuteTimes: [
      { place: "Qendra e qytetit", placeEn: "City Center", time: 12, transport: "car" },
      { place: "Stacioni i trenit", placeEn: "Train Station", time: 22, transport: "car" },
      { place: "Aeroporti", placeEn: "Airport", time: 32, transport: "car" }
    ],
    priceTrend: [
      { year: '2018', price: 1050 },
      { year: '2019', price: 1150 },
      { year: '2020', price: 1250 },
      { year: '2021', price: 1300 },
      { year: '2022', price: 1400 },
      { year: '2023', price: 1500 }
    ]
  }
];

const NeighborhoodsPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredNeighborhoods, setFilteredNeighborhoods] = useState(neighborhoodsData);
  const [priceSort, setPriceSort] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('tirane');
  
  const handleSearch = () => {
    let filtered = [...neighborhoodsData];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        n => n.name.toLowerCase().includes(term) || 
             n.nameEn.toLowerCase().includes(term) ||
             n.description.toLowerCase().includes(term) ||
             n.descriptionEn.toLowerCase().includes(term)
      );
    }
    
    // Apply price sorting
    if (priceSort) {
      if (priceSort === 'low-high') {
        filtered.sort((a, b) => a.avgPrice - b.avgPrice);
      } else if (priceSort === 'high-low') {
        filtered.sort((a, b) => b.avgPrice - a.avgPrice);
      } else if (priceSort === 'growth') {
        filtered.sort((a, b) => b.priceChange - a.priceChange);
      }
    }
    
    setFilteredNeighborhoods(filtered);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('Lagjet dhe zonat')}</h1>
        <p className="text-gray-600">{t('Zbuloni karakteristikat, çmimet dhe trendet për secilën lagje')}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('Kërko lagje...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder={t('Qyteti')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tirane">{t('Tiranë')}</SelectItem>
                <SelectItem value="durres">{t('Durrës')}</SelectItem>
                <SelectItem value="vlore">{t('Vlorë')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-64">
            <Select value={priceSort} onValueChange={setPriceSort}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder={t('Rendit sipas...')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('Parazgjedhur')}</SelectItem>
                <SelectItem value="low-high">{t('Çmimi: I ulët në të lartë')}</SelectItem>
                <SelectItem value="high-low">{t('Çmimi: I lartë në të ulët')}</SelectItem>
                <SelectItem value="growth">{t('Rritja më e lartë')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleSearch} 
            className="bg-albania-red hover:bg-albania-red/90 text-white md:w-auto"
          >
            {t('Kërko')}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="list" className="w-full mb-6">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="list" className="flex-1 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Building className="w-4 h-4 mr-2 inline" />
            {t('Listë')}
          </TabsTrigger>
          <TabsTrigger value="map" className="flex-1 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <MapPin className="w-4 h-4 mr-2 inline" />
            {t('Hartë')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <div className="grid grid-cols-1 gap-6">
            {filteredNeighborhoods.length > 0 ? (
              filteredNeighborhoods.map(neighborhood => (
                <NeighborhoodProfile key={neighborhood.id} neighborhood={neighborhood} />
              ))
            ) : (
              <div className="text-center py-10">
                <Building className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-1">{t('Asnjë lagje e gjetur')}</h3>
                <p className="text-gray-400">
                  {t('Provo të ndryshosh kriteret e kërkimit')}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="map">
          <PropertyMap
            neighborhoods={filteredNeighborhoods}
            selectedCity={selectedCity}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NeighborhoodsPage;
