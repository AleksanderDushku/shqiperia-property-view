import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import NeighborhoodProfile from '../components/NeighborhoodProfile';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, MapPin, Building, Filter, Brain, Zap } from 'lucide-react';
import { NeighborhoodData } from '../types/neighborhood';
import PropertyMap from '../components/PropertyMap';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// Sample neighborhood data - keeping existing data
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
  const [priceSort, setPriceSort] = useState<string>('default');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg mb-6">
            <Brain className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">{t('Analiza e Lagjeve')} - AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
            {t('Lagjet dhe Zonat')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('Zbuloni karakteristikat, çmimet dhe trendet për secilën lagje me analizë të detajuar')}
          </p>
        </div>
        
        {/* Enhanced Search Card */}
        <Card className="bg-gradient-to-r from-white to-gray-50 shadow-xl border-0 rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('Kërko lagje...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              <div className="w-full md:w-48">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500">
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
                  <SelectTrigger className="h-12 bg-white border-gray-200 focus:border-green-500 focus:ring-green-500">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder={t('Rendit sipas...')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">{t('Parazgjedhur')}</SelectItem>
                    <SelectItem value="low-high">{t('Çmimi: I ulët në të lartë')}</SelectItem>
                    <SelectItem value="high-low">{t('Çmimi: I lartë në të ulët')}</SelectItem>
                    <SelectItem value="growth">{t('Rritja më e lartë')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleSearch} 
                className="h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl px-8"
              >
                {t('Kërko')}
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                <Zap className="h-3 w-3 mr-1" />
                {filteredNeighborhoods.length} {t('lagje të gjetura')}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                {t('Çmimi Mesatar')}: €{Math.round(filteredNeighborhoods.reduce((acc, n) => acc + n.avgPrice, 0) / filteredNeighborhoods.length || 0)}/m²
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced Tabs */}
        <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
          <Tabs defaultValue="list" className="w-full">
            <div className="bg-gradient-to-r from-gray-50 to-white p-2">
              <TabsList className="w-full max-w-md mx-auto h-auto p-1 bg-transparent">
                <TabsTrigger 
                  value="list" 
                  className="flex-1 flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <Building className="w-4 h-4" />
                  {t('Listë')}
                </TabsTrigger>
                <TabsTrigger 
                  value="map" 
                  className="flex-1 flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  {t('Hartë')}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="list" className="p-8">
              <div className="grid grid-cols-1 gap-8">
                {filteredNeighborhoods.length > 0 ? (
                  filteredNeighborhoods.map(neighborhood => (
                    <NeighborhoodProfile key={neighborhood.id} neighborhood={neighborhood} />
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">{t('Asnjë lagje e gjetur')}</h3>
                    <p className="text-gray-400">
                      {t('Provo të ndryshosh kriteret e kërkimit')}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="map" className="p-8">
              <PropertyMap
                neighborhoods={filteredNeighborhoods}
                selectedCity={selectedCity}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default NeighborhoodsPage;
