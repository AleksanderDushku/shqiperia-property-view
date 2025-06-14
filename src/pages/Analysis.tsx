
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon, TrendingUp, AlertTriangle, ArrowUp, ArrowDown, Brain, Zap } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { regionPriceData, propertyTypesData, priceHistoryData } from '../data/propertyData';
import { Badge } from '../components/ui/badge';

// Sample data for affordability analysis
const affordabilityData = [
  { city: 'Tiranë', medianIncome: 650, priceToIncomeRatio: 16.2, affordabilityIndex: 3.2 },
  { city: 'Durrës', medianIncome: 580, priceToIncomeRatio: 12.4, affordabilityIndex: 4.6 },
  { city: 'Vlorë', medianIncome: 540, priceToIncomeRatio: 14.8, affordabilityIndex: 4.1 },
  { city: 'Shkodër', medianIncome: 510, priceToIncomeRatio: 9.9, affordabilityIndex: 5.5 },
  { city: 'Elbasan', medianIncome: 490, priceToIncomeRatio: 9.5, affordabilityIndex: 5.7 },
  { city: 'Sarandë', medianIncome: 570, priceToIncomeRatio: 16.3, affordabilityIndex: 3.1 },
];

// Sample data for investment potential
const investmentData = [
  { city: 'Tiranë', roi: 5.8, growthPotential: 8.2, riskIndex: 4.7 },
  { city: 'Durrës', roi: 6.2, growthPotential: 7.8, riskIndex: 5.1 },
  { city: 'Vlorë', roi: 7.5, growthPotential: 9.3, riskIndex: 5.8 },
  { city: 'Shkodër', roi: 4.9, growthPotential: 5.1, riskIndex: 3.9 },
  { city: 'Elbasan', roi: 4.5, growthPotential: 4.8, riskIndex: 3.5 },
  { city: 'Sarandë', roi: 8.3, growthPotential: 10.2, riskIndex: 6.9 },
];

// Seasonality data
const seasonalityData = [
  { month: 'Jan', sales: 342, inquiries: 780, priceIndex: 98 },
  { month: 'Feb', sales: 356, inquiries: 810, priceIndex: 99 },
  { month: 'Mar', sales: 440, inquiries: 950, priceIndex: 100 },
  { month: 'Apr', sales: 510, inquiries: 1150, priceIndex: 102 },
  { month: 'May', sales: 590, inquiries: 1380, priceIndex: 104 },
  { month: 'Jun', sales: 620, inquiries: 1450, priceIndex: 105 },
  { month: 'Jul', sales: 650, inquiries: 1420, priceIndex: 106 },
  { month: 'Aug', sales: 630, inquiries: 1350, priceIndex: 106 },
  { month: 'Sep', sales: 580, inquiries: 1280, priceIndex: 105 },
  { month: 'Oct', sales: 510, inquiries: 1100, priceIndex: 103 },
  { month: 'Nov', sales: 420, inquiries: 920, priceIndex: 101 },
  { month: 'Dec', sales: 380, inquiries: 840, priceIndex: 100 }
];

// Market comparison data
const marketComparisonData = [
  { city: 'Tiranë', commercial: 1650, residential: 1250, mixed: 1350 },
  { city: 'Durrës', commercial: 1200, residential: 850, mixed: 980 },
  { city: 'Vlorë', commercial: 1300, residential: 950, mixed: 1050 },
  { city: 'Sarandë', commercial: 1450, residential: 1100, mixed: 1200 },
  { city: 'Shkodër', commercial: 850, residential: 600, mixed: 720 },
  { city: 'Elbasan', commercial: 780, residential: 550, mixed: 650 }
];

const COLORS = ['#E41E20', '#000000', '#4CAF50', '#2196F3'];

const KeyInsight = ({ icon: Icon, title, value, trend, trendValue }: { icon: React.ElementType, title: string, value: string, trend: 'up' | 'down' | 'neutral', trendValue: string }) => {
  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-albania-red to-red-600 shadow-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <Badge className={`flex items-center gap-1 ${
                trend === 'up' ? 'bg-green-100 text-green-700 border-green-200' : 
                trend === 'down' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}>
                {trend === 'up' ? <ArrowUp className="h-3 w-3" /> : 
                 trend === 'down' ? <ArrowDown className="h-3 w-3" /> : null}
                {trendValue}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Analysis: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-albania-red/5 py-8">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-albania-red to-red-600 text-white px-6 py-3 rounded-full shadow-lg mb-6">
            <Brain className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">{t('Analiza e Avancuar')} - AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-albania-red via-red-600 to-red-800 bg-clip-text text-transparent mb-4">
            {t('Analiza e Tregut')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('Analizë e thellë dhe profesionale e tregut të pronave në Shqipëri me teknologji AI')}
          </p>
        </div>
        
        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KeyInsight 
            icon={TrendingUp} 
            title={t('Çmimi Mesatar')} 
            value="1,350 €/m²" 
            trend="up" 
            trendValue="+5.2%" 
          />
          <KeyInsight 
            icon={BarChartIcon} 
            title={t('Indeksi i Përballueshmerisë')} 
            value="16.2x" 
            trend="down" 
            trendValue="-0.8%" 
          />
          <KeyInsight 
            icon={PieChartIcon} 
            title={t('Kthimi i Investimit')} 
            value="5.8%" 
            trend="up" 
            trendValue="+0.3%" 
          />
          <KeyInsight 
            icon={AlertTriangle} 
            title={t('Indeksi i Rrezikut')} 
            value="I Mesëm" 
            trend="neutral" 
            trendValue="Stabil" 
          />
        </div>
        
        {/* Enhanced Tabs */}
        <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
          <Tabs defaultValue="market-dynamics" className="w-full">
            <div className="bg-gradient-to-r from-gray-50 to-white p-2">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-transparent">
                <TabsTrigger 
                  value="market-dynamics" 
                  className="flex items-center gap-2 py-4 px-6 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-albania-red data-[state=active]:to-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <LineChartIcon className="w-4 h-4" />
                  <span className={isMobile ? "text-xs" : ""}>{t('Dinamika e Tregut')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="affordability" 
                  className="flex items-center gap-2 py-4 px-6 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <BarChartIcon className="w-4 h-4" />
                  <span className={isMobile ? "text-xs" : ""}>{t('Përballueshmerria')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="investment" 
                  className="flex items-center gap-2 py-4 px-6 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <PieChartIcon className="w-4 h-4" />
                  <span className={isMobile ? "text-xs" : ""}>{t('Investimi')}</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="seasonality" 
                  className="flex items-center gap-2 py-4 px-6 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <LineChartIcon className="w-4 h-4" />
                  <span className={isMobile ? "text-xs" : ""}>{t('Sezonshmëria')}</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Market Dynamics Tab */}
            <TabsContent value="market-dynamics" className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-albania-red/5 to-red-100/50 rounded-2xl p-8 border border-albania-red/20">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-albania-red" />
                  <h2 className="text-3xl font-bold text-albania-red">{t('Dinamika e Tregut')}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('Analiza e detajuar e lëvizjeve të tregut të pronave në Shqipëri me fokus në trendet aktuale')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-gradient-to-r from-albania-red to-red-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <BarChartIcon className="h-6 w-6" />
                      {t('Krahasimi i Tregut')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={marketComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value} €/m²`, '']} />
                          <Legend />
                          <Bar dataKey="commercial" name={t('Komerciale')} fill="#E41E20" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="residential" name={t('Rezidenciale')} fill="#000000" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="mixed" name={t('Përzier')} fill="#4CAF50" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <PieChartIcon className="h-6 w-6" />
                      {t('Shpërndarja e Pronave')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={propertyTypesData}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {propertyTypesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Affordability Tab */}
            <TabsContent value="affordability" className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-green-50/5 to-emerald-100/50 rounded-2xl p-8 border border-green-200/20">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                  <h2 className="text-3xl font-bold text-green-700">{t('Përballueshmëria')}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('Analiza e thelluar e përballueshmërisë së pronave në qytete të ndryshme të Shqipërisë')}
                </p>
              </div>
            
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <BarChartIcon className="h-6 w-6" />
                      {t('Raporti Çmim/Të Ardhura')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={affordabilityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value}x`, '']} />
                          <Legend />
                          <Bar dataKey="priceToIncomeRatio" name={t('Raporti')} fill="#E41E20" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
            
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <BarChartIcon className="h-6 w-6" />
                      {t('Indeksi i Përballueshmërisë')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={affordabilityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="affordabilityIndex" name={t('Indeksi')} fill="#4CAF50" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 text-center">
                      {t('Sa më i lartë indeksi, aq më e përballueshme është prona')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Investment Tab */}
            <TabsContent value="investment" className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-blue-50/5 to-indigo-100/50 rounded-2xl p-8 border border-blue-200/20">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-blue-700">{t('Potenciali i Investimit')}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('Analiza e mundësive të investimit në tregun e pronave në Shqipëri')}
                </p>
              </div>
            
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <PieChartIcon className="h-6 w-6" />
                      {t('ROI Vjetor')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={investmentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Legend />
                          <Bar dataKey="roi" name={t('ROI')} fill="#E41E20" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
            
                <Card className="shadow-xl border-0">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <PieChartIcon className="h-6 w-6" />
                      {t('Potenciali i Rritjes')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={investmentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Legend />
                          <Bar dataKey="growthPotential" name={t('Potenciali')} fill="#4CAF50" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Seasonality Tab */}
            <TabsContent value="seasonality" className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-purple-50/5 to-violet-100/50 rounded-2xl p-8 border border-purple-200/20">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                  <h2 className="text-3xl font-bold text-purple-700">{t('Sezonshmëria e Tregut')}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('Analiza e ndikimit të stinëve në tregun e pronave në Shqipëri')}
                </p>
              </div>
            
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <LineChartIcon className="h-6 w-6" />
                    {t('Shitjet Sezonale')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={seasonalityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" name={t('Shitjet')} stroke="#E41E20" strokeWidth={2} />
                        <Line type="monotone" dataKey="inquiries" name={t('Kërkesat')} stroke="#000000" strokeWidth={2} />
                        <Line type="monotone" dataKey="priceIndex" name={t('Indeksi i Çmimit')} stroke="#4CAF50" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Analysis;
