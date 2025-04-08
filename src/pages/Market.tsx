
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import PriceChart from '../components/PriceChart';
import RegionPriceTable from '../components/RegionPriceTable';
import PropertyTypeChart from '../components/PropertyTypeChart';
import MarketInsights from '../components/MarketInsights';
import MarketNews from '../components/MarketNews';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useIsMobile } from '../hooks/use-mobile';
import { Building, TrendingUp, BarChart3, Briefcase, Download, Share2, Filter, Printer } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { investmentMetrics, seasonalTrends, affordabilityMetrics } from '../data/propertyData';

// Enhanced market data with professional insights integrated
const quarterlyData = [
  { quarter: 'Q1 2024', supply: 1245, demand: 1520, opportunity_index: 85 },
  { quarter: 'Q2 2024', supply: 1350, demand: 1480, opportunity_index: 82 },
  { quarter: 'Q3 2024', supply: 1420, demand: 1580, opportunity_index: 88 },
  { quarter: 'Q4 2024', supply: 1520, demand: 1620, opportunity_index: 90 },
  { quarter: 'Q1 2025', supply: 1480, demand: 1680, opportunity_index: 92 },
];

const Market: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [activeTab, set_active_tab] = useState('overview');
  
  // Professional real estate insights with richer content
  const marketKeyInsights = [
    {
      title: t('market.infrastructure.impact'),
      content: 'Major transportation infrastructure projects have increased property values by an average of 18% in affected areas, creating development opportunities.',
    },
    {
      title: t('market.regulatory.changes'),
      content: 'New zoning regulations have opened up previously restricted areas for mixed-use development, particularly in the western districts.',
    },
    {
      title: t('market.tech.influence'),
      content: 'Property technology adoption is accelerating, with virtual tours increasing showing efficiency by 35% and reducing time-to-sale by 22%.',
    },
    {
      title: t('market.development.costs'),
      content: 'Construction costs have risen by 8.7% year-over-year, primarily driven by material costs and labor shortages in specialized trades.',
    }
  ];
  
  return (
    <div className="container mx-auto px-3 py-6">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{t('market.title')}</h1>
            <p className="text-gray-600 text-sm md:text-base">{t('market.subtitle')}</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
              <Download className="h-3.5 w-3.5" />
              <span>{t('download.data')}</span>
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
              <Printer className="h-3.5 w-3.5" />
              <span>{t('print')}</span>
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
              <Share2 className="h-3.5 w-3.5" />
              <span>{t('share')}</span>
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
              <Filter className="h-3.5 w-3.5" />
              <span>{t('filter.results')}</span>
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-gray-50">
            {t('dashboard.last.updated')}: {new Date().toLocaleDateString()}
          </Badge>
          <Badge variant="secondary" className="bg-albania-red text-white hover:bg-albania-red/90">
            {t('high.opportunity')} - {t('region.tirana')}
          </Badge>
          <Badge variant="secondary" className="bg-albania-red text-white hover:bg-albania-red/90">
            {t('high.opportunity')} - {t('region.vlore')}
          </Badge>
        </div>
      </div>
      
      {/* Key Insights for Professionals */}
      <Card className="mb-6 border-l-4 border-l-albania-red">
        <CardHeader className="pb-2">
          <CardTitle className="text-base md:text-lg flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-albania-red" />
            {t('market.key.insights')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketKeyInsights.map((insight, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-sm md:text-base mb-2 text-albania-red">{insight.title}</h3>
                <p className="text-gray-700 text-xs md:text-sm">{insight.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={set_active_tab} className="w-full mb-6">
        <TabsList className="mb-4 md:mb-6 bg-albania-gray w-full overflow-x-auto flex">
          <TabsTrigger value="overview" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <BarChart3 className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.overview')}</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <TrendingUp className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.trends')}</span>
          </TabsTrigger>
          <TabsTrigger value="investment" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <Briefcase className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.investment')}</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="data-[state=active]:bg-albania-red data-[state=active]:text-white flex-1 min-w-[80px]">
            <Building className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.news')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {/* Price Evolution with professional context */}
          <div className="mb-6">
            <Card className="w-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.price.evolution')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('market.price.trends.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PriceChart title="" />
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2 flex justify-between">
                <span>{t('property.luxury')}: +12% {t('year.over.year')}</span>
                <span>{t('property.commercial')}: +7.8% {t('year.over.year')}</span>
              </CardFooter>
            </Card>
          </div>
          
          {/* Supply and Demand with opportunity index */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card className="w-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.supply.demand')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('market.trends.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={quarterlyData}
                      margin={{
                        top: 5,
                        right: isMobile ? 10 : 30,
                        left: isMobile ? 0 : 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" tick={{fontSize: isMobile ? 10 : 12}} />
                      <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                      <Tooltip />
                      <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
                      <Bar dataKey="supply" name={t('market.supply')} fill="#000000" />
                      <Bar dataKey="demand" name={t('market.demand')} fill="#E41E20" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white">
                    {t('market.opportunity.index')}: {quarterlyData[quarterlyData.length - 1].opportunity_index}/100
                  </Badge>
                  <span className="text-green-600">
                    +{(quarterlyData[quarterlyData.length - 1].opportunity_index - quarterlyData[0].opportunity_index)} pts
                  </span>
                </div>
              </CardFooter>
            </Card>
            
            <PropertyTypeChart title={t('property.distribution')} />
          </div>
          
          {/* Regional Prices with investment recommendations */}
          <div className="mb-6 overflow-x-auto">
            <Card className="w-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.quarterly.change')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('market.regional.price.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegionPriceTable title="" />
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
                <span>{t('market.highest.growth')}: {t('region.tirana')} (+7.2%), {t('region.vlore')} (+6.8%)</span>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends">
          <div className="mb-6">
            <MarketInsights />
          </div>
          
          {/* Seasonality Trends */}
          <div className="mb-6">
            <Card className="w-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('analysis.seasonality')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('analysis.seasonality.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`${isMobile ? 'h-[250px]' : 'h-[300px]'}`}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={seasonalTrends}
                      margin={{
                        top: 5,
                        right: isMobile ? 10 : 30,
                        left: isMobile ? 0 : 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{fontSize: isMobile ? 10 : 12}} />
                      <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
                      <Tooltip />
                      <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
                      <Line type="monotone" dataKey="listingVolume" name={t('market.listings')} stroke="#E41E20" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="transactionVolume" name={t('market.transactions')} stroke="#000000" />
                      <Line type="monotone" dataKey="priceIndex" name={t('market.price.index')} stroke="#0088FE" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="bg-white">
                    {t('market.peak.season')}: {t('market.may')}-{t('market.june')}
                  </Badge>
                  <Badge variant="outline" className="bg-white">
                    {t('market.low.season')}: {t('market.december')}-{t('market.january')}
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="investment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card className="w-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.price.income.ratio')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('market.price.income.explanation')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-5xl font-bold text-albania-red mb-2">
                    {affordabilityMetrics.priceToIncomeRatio}
                  </div>
                  <div className="text-sm text-gray-500">{t('market.years')}</div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-4 w-full max-w-md">
                    <div className="text-center">
                      <div className="text-sm font-medium">{t('region.tirana')}</div>
                      <div className="text-lg font-bold">11.2</div>
                      <div className="text-xs text-gray-500">{t('market.years')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{t('region.durres')}</div>
                      <div className="text-lg font-bold">8.4</div>
                      <div className="text-xs text-gray-500">{t('market.years')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{t('region.vlore')}</div>
                      <div className="text-lg font-bold">9.7</div>
                      <div className="text-xs text-gray-500">{t('market.years')}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="w-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.roi.potential')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('analysis.roi.analysis')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-center h-full py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                    <Card className="p-4 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">{t('analysis.short.term')}</div>
                      <div className="text-2xl font-bold text-black">{investmentMetrics.returnOnInvestment.shortTerm}%</div>
                      <div className="text-xs text-gray-500">1 {t('market.year')}</div>
                    </Card>
                    <Card className="p-4 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">{t('analysis.medium.term')}</div>
                      <div className="text-2xl font-bold text-black">{investmentMetrics.returnOnInvestment.mediumTerm}%</div>
                      <div className="text-xs text-gray-500">3 {t('market.years')}</div>
                    </Card>
                    <Card className="p-4 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">{t('analysis.long.term')}</div>
                      <div className="text-2xl font-bold text-black">{investmentMetrics.returnOnInvestment.longTerm}%</div>
                      <div className="text-xs text-gray-500">5 {t('market.years')}</div>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-4 border border-gray-200">
                      <div className="text-sm font-medium mb-1">{t('market.rental.yield')} - {t('property.residential')}</div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500">{t('region.center.tirana')}</div>
                          <div className="text-lg font-bold">{investmentMetrics.rentalYield.residential.center}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">{t('region.suburbs')}</div>
                          <div className="text-lg font-bold">{investmentMetrics.rentalYield.residential.suburban}%</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4 border border-gray-200">
                      <div className="text-sm font-medium mb-1">{t('market.rental.yield')} - {t('property.commercial')}</div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-gray-500">{t('market.retail')}</div>
                          <div className="text-lg font-bold">{investmentMetrics.rentalYield.commercial.retail}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">{t('market.office')}</div>
                          <div className="text-lg font-bold">{investmentMetrics.rentalYield.commercial.office}%</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <Card className="w-full hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">{t('market.investment.origin')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('market.investment.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-4">
                        <div>
                          <div className="text-sm text-gray-500">{t('market.domestic.investors')}</div>
                          <div className="text-2xl font-bold">{investmentMetrics.investorOrigin.domestic}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">{t('market.foreign.investors')}</div>
                          <div className="text-2xl font-bold">{investmentMetrics.investorOrigin.foreign}%</div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-albania-red h-full rounded-full" 
                          style={{ width: `${investmentMetrics.investorOrigin.domestic}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <div className="space-y-3">
                      <div className="text-sm font-medium">{t('market.foreign.investors')}</div>
                      {investmentMetrics.foreignInvestors.map((investor, i) => (
                        <div key={i} className="flex items-center">
                          <div className="w-24 text-sm">{investor.country}</div>
                          <div className="flex-1 mx-2">
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-albania-red h-full rounded-full" 
                                style={{ width: `${investor.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm font-medium">{investor.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="news">
          <div className="mb-6">
            <MarketNews />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Market;
