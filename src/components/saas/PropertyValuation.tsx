
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Home, TrendingUp, Calculator, MapPin, DollarSign, BarChart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FeatureGate } from './FeatureGate';

interface ValuationResult {
  estimated_value: number;
  confidence_score: number;
  value_range: { min: number; max: number };
  comparable_properties: number;
  market_trends: string;
  investment_score: number;
}

const PropertyValuation: React.FC = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [formData, setFormData] = useState({
    address: '',
    propertyType: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    condition: '',
    region: ''
  });

  const handleValuation = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        estimated_value: 185000,
        confidence_score: 87,
        value_range: { min: 170000, max: 200000 },
        comparable_properties: 15,
        market_trends: 'bullish',
        investment_score: 78
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <FeatureGate feature="property_valuation">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              {t('AI Property Valuation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="valuation" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="valuation">{t('Valuation')}</TabsTrigger>
                <TabsTrigger value="comparables">{t('Comparables')}</TabsTrigger>
                <TabsTrigger value="investment">{t('Investment Analysis')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="valuation" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      {t('Property Details')}
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="address">{t('Property Address')}</Label>
                        <Input
                          id="address"
                          placeholder="Enter full address"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label>{t('Property Type')}</Label>
                          <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder={t('Select type')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="apartment">{t('Apartment')}</SelectItem>
                              <SelectItem value="house">{t('House')}</SelectItem>
                              <SelectItem value="villa">{t('Villa')}</SelectItem>
                              <SelectItem value="studio">{t('Studio')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>{t('Region')}</Label>
                          <Select value={formData.region} onValueChange={(value) => setFormData({...formData, region: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder={t('Select region')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tirana">{t('Tirana')}</SelectItem>
                              <SelectItem value="durres">{t('Durres')}</SelectItem>
                              <SelectItem value="vlore">{t('Vlore')}</SelectItem>
                              <SelectItem value="sarande">{t('Sarande')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="size">{t('Size (m²)')}</Label>
                          <Input
                            id="size"
                            type="number"
                            placeholder="120"
                            value={formData.size}
                            onChange={(e) => setFormData({...formData, size: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="bedrooms">{t('Bedrooms')}</Label>
                          <Input
                            id="bedrooms"
                            type="number"
                            placeholder="3"
                            value={formData.bedrooms}
                            onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="bathrooms">{t('Bathrooms')}</Label>
                          <Input
                            id="bathrooms"
                            type="number"
                            placeholder="2"
                            value={formData.bathrooms}
                            onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="yearBuilt">{t('Year Built')}</Label>
                          <Input
                            id="yearBuilt"
                            type="number"
                            placeholder="2015"
                            value={formData.yearBuilt}
                            onChange={(e) => setFormData({...formData, yearBuilt: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>{t('Condition')}</Label>
                          <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder={t('Select condition')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="excellent">{t('Excellent')}</SelectItem>
                              <SelectItem value="good">{t('Good')}</SelectItem>
                              <SelectItem value="fair">{t('Fair')}</SelectItem>
                              <SelectItem value="poor">{t('Poor')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleValuation} 
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? t('Calculating...') : t('Get AI Valuation')}
                    </Button>
                  </div>
                  
                  {result && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        {t('Valuation Results')}
                      </h3>
                      
                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-green-600 mb-2">
                            €{result.estimated_value.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 mb-4">
                            {t('Estimated Market Value')}
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            {result.confidence_score}% {t('Confidence')}
                          </Badge>
                        </CardContent>
                      </Card>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{t('Value Range')}</span>
                              <Badge variant="outline">
                                €{result.value_range.min.toLocaleString()} - €{result.value_range.max.toLocaleString()}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{t('Comparable Properties')}</span>
                              <Badge variant="outline">
                                {result.comparable_properties} {t('properties')}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{t('Market Trend')}</span>
                              <Badge className={result.market_trends === 'bullish' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {result.market_trends === 'bullish' ? t('Bullish') : t('Bearish')}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{t('Investment Score')}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gray-200 rounded-full">
                                  <div 
                                    className="h-full bg-blue-600 rounded-full"
                                    style={{ width: `${result.investment_score}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{result.investment_score}/100</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="comparables" className="space-y-4">
                <h3 className="text-lg font-semibold">{t('Comparable Properties')}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t('Similar properties used in the valuation calculation')}
                </p>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">Property {i}</h4>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              Tirana, Blloku District
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            €{(180000 + i * 10000).toLocaleString()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Size:</span>
                            <span className="ml-1 font-medium">{120 + i * 10}m²</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Beds:</span>
                            <span className="ml-1 font-medium">{2 + i}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Year:</span>
                            <span className="ml-1 font-medium">{2015 + i}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Match:</span>
                            <span className="ml-1 font-medium">{95 - i * 5}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="investment" className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  {t('Investment Analysis')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('ROI Projections')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>{t('1 Year ROI')}</span>
                        <Badge className="bg-green-100 text-green-800">+8.5%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{t('3 Year ROI')}</span>
                        <Badge className="bg-green-100 text-green-800">+28.2%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{t('5 Year ROI')}</span>
                        <Badge className="bg-green-100 text-green-800">+52.7%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t('Rental Analysis')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>{t('Monthly Rent')}</span>
                        <Badge>€950 - €1,200</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{t('Rental Yield')}</span>
                        <Badge className="bg-blue-100 text-blue-800">6.2%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{t('Occupancy Rate')}</span>
                        <Badge className="bg-purple-100 text-purple-800">92%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </FeatureGate>
  );
};

export default PropertyValuation;
