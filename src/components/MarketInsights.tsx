
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from '../contexts/LanguageContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Building, Home } from 'lucide-react';

const monthlyTrends = [
  { month: 'Jan 24', tirana: 1250, durres: 850, vlore: 950, sarande: 1100 },
  { month: 'Feb 24', tirana: 1270, durres: 860, vlore: 970, sarande: 1120 },
  { month: 'Mar 24', tirana: 1290, durres: 880, vlore: 990, sarande: 1150 },
  { month: 'Apr 24', tirana: 1310, durres: 890, vlore: 1010, sarande: 1180 },
  { month: 'May 24', tirana: 1330, durres: 900, vlore: 1030, sarande: 1220 },
  { month: 'Jun 24', tirana: 1350, durres: 920, vlore: 1050, sarande: 1250 },
];

const priceToIncomeRatio = [
  { city: 'Tiranë', value: 15.3 },
  { city: 'Durrës', value: 12.1 },
  { city: 'Vlorë', value: 13.7 },
  { city: 'Sarandë', value: 14.5 },
  { city: 'Shkodër', value: 9.6 },
  { city: 'Elbasan', value: 8.9 },
];

const mortgageData = [
  { year: '2020', averageRate: 3.8, numberOfMortgages: 4200 },
  { year: '2021', averageRate: 3.5, numberOfMortgages: 5100 },
  { year: '2022', averageRate: 3.2, numberOfMortgages: 5800 },
  { year: '2023', averageRate: 3.7, numberOfMortgages: 6300 },
  { year: '2024', averageRate: 4.1, numberOfMortgages: 5900 },
];

const investmentTrends = [
  { quarter: 'Q1 2023', domestic: 45, foreign: 55 },
  { quarter: 'Q2 2023', domestic: 47, foreign: 53 },
  { quarter: 'Q3 2023', domestic: 44, foreign: 56 },
  { quarter: 'Q4 2023', domestic: 42, foreign: 58 },
  { quarter: 'Q1 2024', domestic: 40, foreign: 60 },
  { quarter: 'Q2 2024', domestic: 38, foreign: 62 },
];

const COLORS = ['#E41E20', '#000000', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'];

const MarketInsights: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-albania-red" />
          {t('market.insights')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price-trends" className="w-full">
          <TabsList className="mb-6 bg-albania-gray">
            <TabsTrigger value="price-trends" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t('market.price.trends')}
            </TabsTrigger>
            <TabsTrigger value="affordability" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
              <Home className="w-4 h-4 mr-2" />
              {t('market.affordability')}
            </TabsTrigger>
            <TabsTrigger value="investment" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
              <Building className="w-4 h-4 mr-2" />
              {t('market.investment')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="price-trends" className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg text-sm">
              <p>
                {t('market.trends.description')}
              </p>
            </div>
            
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyTrends}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} €/m²`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="tirana" 
                    name={t('region.tirana')} 
                    stroke="#E41E20" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="durres" 
                    name={t('region.durres')} 
                    stroke="#000000" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="vlore" 
                    name={t('region.vlore')} 
                    stroke="#4CAF50" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sarande" 
                    name={t('region.sarande')} 
                    stroke="#2196F3" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">{t('region.tirana')}</h3>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+5.2%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold mt-2">1,350 €/m²</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">{t('region.durres')}</h3>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+3.5%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold mt-2">920 €/m²</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">{t('region.vlore')}</h3>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+7.1%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold mt-2">1,050 €/m²</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">{t('region.sarande')}</h3>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+8.3%</span>
                  </div>
                </div>
                <p className="text-2xl font-bold mt-2">1,250 €/m²</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="affordability" className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg text-sm">
              <p>
                {t('market.affordability.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">{t('market.price.income.ratio')}</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={priceToIncomeRatio}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="city" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}x`, '']} />
                      <Bar dataKey="value" fill="#E41E20" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {t('market.price.income.explanation')}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">{t('market.mortgage.trends')}</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mortgageData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis yAxisId="left" orientation="left" stroke="#E41E20" />
                      <YAxis yAxisId="right" orientation="right" stroke="#000000" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="averageRate" 
                        name={t('market.mortgage.rate')} 
                        stroke="#E41E20" 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="numberOfMortgages" 
                        name={t('market.mortgage.volume')} 
                        stroke="#000000" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="investment" className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg text-sm">
              <p>
                {t('market.investment.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">{t('market.investment.origin')}</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={investmentTrends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      stackOffset="expand"
                      layout="vertical"
                      barSize={30}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                      <YAxis type="category" dataKey="quarter" />
                      <Tooltip formatter={(value) => [`${value}%`, '']} />
                      <Legend />
                      <Bar dataKey="domestic" name={t('market.domestic.investors')} stackId="a" fill="#000000" />
                      <Bar dataKey="foreign" name={t('market.foreign.investors')} stackId="a" fill="#E41E20" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">{t('market.price.to.rent')}</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priceToIncomeRatio}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="city"
                        label={({ city, value }) => `${city}: ${value}`}
                      >
                        {priceToIncomeRatio.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {t('market.price.to.rent.explanation')}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
