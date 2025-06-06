
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon, Search, Filter, TrendingUp, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { regionPriceData, propertyTypesData, priceHistoryData } from '../data/propertyData';

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
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-red-50">
          <Icon className="h-5 w-5 text-albania-red" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">{value}</p>
            <span className={`flex items-center text-xs font-medium ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 'text-gray-500'
            }`}>
              {trend === 'up' ? <ArrowUp className="h-3 w-3" /> : 
               trend === 'down' ? <ArrowDown className="h-3 w-3" /> : null}
              {trendValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Analysis: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [activeTab, set_active_tab] = useState('market-dynamics');

  return (
    <div className="container mx-auto px-3 py-6">
      <div className="mb-6">
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{t('analysis.title')}</h1>
        <p className="text-gray-600 text-sm md:text-base mb-6">{t('analysis.subtitle')}</p>
        
        {/* Key Insights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KeyInsight 
            icon={TrendingUp} 
            title={t('analysis.key.price')} 
            value="1,350 €/m²" 
            trend="up" 
            trendValue="+5.2%" 
          />
          <KeyInsight 
            icon={BarChartIcon} 
            title={t('analysis.key.affordability')} 
            value="16.2x" 
            trend="down" 
            trendValue="-0.8%" 
          />
          <KeyInsight 
            icon={PieChartIcon} 
            title={t('analysis.key.roi')} 
            value="5.8%" 
            trend="up" 
            trendValue="+0.3%" 
          />
          <KeyInsight 
            icon={AlertTriangle} 
            title={t('analysis.key.risk')} 
            value="Medium" 
            trend="neutral" 
            trendValue="Stable" 
          />
        </div>
      </div>
      
      <Card className="mb-6 border-0 shadow-sm">
        <CardContent className="p-0">
          <Tabs defaultValue="market-dynamics" onValueChange={set_active_tab} className="w-full">
            <TabsList className="w-full bg-gray-50 rounded-t-lg p-1 border-b">
              <TabsTrigger value="market-dynamics" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[100px]">
                <div className="flex items-center gap-1">
                  <LineChartIcon className="w-4 h-4" />
                  <span className={isMobile ? "text-xs" : ""}>{t('analysis.market.dynamics')}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="affordability" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[100px]">
                <div className="flex items-center gap-1">
                  <BarChartIcon className="w-4 h-4" />
                  <span className={isMobile ? "text-xs" : ""}>{t('analysis.affordability')}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="investment" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[100px]">
                <div className="flex items-center gap-1">
                  <PieChartIcon className="w-4 h-4" />
                  <span className={isMobile ? "text-xs" : ""}>{t('analysis.investment')}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="seasonality" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[100px]">
                <div className="flex items-center gap-1">
                  <LineChartIcon className="w-4 h-4" />
                  <span className={isMobile ? "text-xs" : ""}>{t('analysis.seasonality')}</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            {/* Market Dynamics Tab */}
            <TabsContent value="market-dynamics" className="px-4 py-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{t('analysis.market.dynamics')}</h2>
                <p className="text-gray-600 text-sm">{t('analysis.market.dynamics.description')}</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg">{t('analysis.market.comparison')}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {t('analysis.market.comparison.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={marketComparisonData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" tick={{fontSize: isMobile ? 10 : 12}} />
                          <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                          <Tooltip formatter={(value) => [`${value} €/m²`, '']} />
                          <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
                          <Bar dataKey="commercial" name={t('property.commercial')} fill="#E41E20" />
                          <Bar dataKey="residential" name={t('property.residential')} fill="#000000" />
                          <Bar dataKey="mixed" name={t('property.mixed')} fill="#4CAF50" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg">{t('analysis.property.distribution')}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {t('analysis.property.distribution.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={propertyTypesData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={isMobile ? 80 : 100}
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
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg">{t('analysis.price.evolution')}</CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    {t('analysis.price.evolution.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`${isMobile ? 'h-[300px]' : 'h-[350px]'}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={priceHistoryData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} €/m²`, '']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="apartment" 
                          name={t('property.apartment')} 
                          stroke="#E41E20" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="house" 
                          name={t('property.house')} 
                          stroke="#000000" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="land" 
                          name={t('property.land')} 
                          stroke="#4CAF50" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="commercial" 
                          name={t('property.commercial')} 
                          stroke="#2196F3" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Affordability Tab */}
            <TabsContent value="affordability" className="px-4 py-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{t('analysis.affordability')}</h2>
                <p className="text-gray-600 text-sm">{t('analysis.affordability.description')}</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg">{t('analysis.price.income.ratio')}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {t('analysis.price.income.ratio.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={affordabilityData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" tick={{fontSize: isMobile ? 10 : 12}} />
                          <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                          <Tooltip />
                          <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
                          <Bar dataKey="priceToIncomeRatio" name={t('analysis.price.income.ratio')} fill="#E41E20" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg">{t('analysis.affordability.index')}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {t('analysis.affordability.index.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={affordabilityData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" tick={{fontSize: isMobile ? 10 : 12}} />
                          <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                          <Tooltip />
                          <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
                          <Bar dataKey="affordabilityIndex" name={t('analysis.affordability.index')} fill="#4CAF50" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="mt-4 text-xs md:text-sm text-gray-600">
                      {t('analysis.affordability.note')}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg">{t('analysis.median.income')}</CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    {t('analysis.median.income.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`${isMobile ? 'h-[300px]' : 'h-[350px]'}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={affordabilityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="city" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} €`, '']} />
                        <Legend />
                        <Bar dataKey="medianIncome" name={t('analysis.median.income')} fill="#2196F3" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Investment Tab */}
            <TabsContent value="investment" className="px-4 py-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{t('analysis.investment')}</h2>
                <p className="text-gray-600 text-sm">{t('analysis.investment.description')}</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg">{t('analysis.roi')}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {t('analysis.roi.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={investmentData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" tick={{fontSize: isMobile ? 10 : 12}} />
                          <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
                          <Bar dataKey="roi" name={t('analysis.annual.roi')} fill="#E41E20" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg">{t('analysis.growth.potential')}</CardTitle>
                    <CardDescription className="text-xs text-gray-500">
                      {t('analysis.growth.potential.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={investmentData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="city" tick={{fontSize: isMobile ? 10 : 12}} />
                          <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                          <Tooltip formatter={(value) => [`${value}%`, '']} />
                          <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
                          <Bar dataKey="growthPotential" name={t('analysis.growth.potential')} fill="#4CAF50" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg">{t('analysis.risk.assessment')}</CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    {t('analysis.risk.assessment.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`${isMobile ? 'h-[300px]' : 'h-[350px]'}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={investmentData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="city" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip formatter={(value) => [`${value}/10`, '']} />
                        <Legend />
                        <Bar dataKey="riskIndex" name={t('analysis.risk.index')} fill="#2196F3" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-4 text-xs md:text-sm text-gray-600">
                    {t('analysis.risk.note')}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Seasonality Tab */}
            <TabsContent value="seasonality" className="px-4 py-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{t('analysis.seasonality')}</h2>
                <p className="text-gray-600 text-sm">{t('analysis.seasonality.description')}</p>
              </div>
              
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base md:text-lg">{t('analysis.seasonal.sales')}</CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    {t('analysis.seasonal.sales.subtitle')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`${isMobile ? 'h-[300px]' : 'h-[350px]'}`}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={seasonalityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="sales" 
                          name={t('analysis.monthly.sales')} 
                          stroke="#E41E20" 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="inquiries" 
                          name={t('analysis.monthly.inquiries')} 
                          stroke="#000000" 
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="priceIndex" 
                          name={t('analysis.price.index')} 
                          stroke="#4CAF50" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg">{t('analysis.peak.season')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center p-2">
                      <div className="text-3xl font-bold text-albania-red mb-2">Q2-Q3</div>
                      <p className="text-center text-sm text-gray-600">
                        {t('analysis.peak.season.info')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg">{t('analysis.price.fluctuation')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center p-2">
                      <div className="text-3xl font-bold text-albania-red mb-2">8.2%</div>
                      <p className="text-center text-sm text-gray-600">
                        {t('analysis.price.fluctuation.info')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base md:text-lg">{t('analysis.best.buying.time')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center p-2">
                      <div className="text-3xl font-bold text-albania-red mb-2">Q4-Q1</div>
                      <p className="text-center text-sm text-gray-600">
                        {t('analysis.best.buying.info')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analysis;
