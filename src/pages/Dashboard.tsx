
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import StatCard from '../components/StatCard';
import PriceChart from '../components/PriceChart';
import PropertyTypeChart from '../components/PropertyTypeChart';
import RegionPriceTable from '../components/RegionPriceTable';
import WebCrawlerStatus from '../components/WebCrawlerStatus';
import WebCrawlerList from '../components/WebCrawlerList';
import { marketStats, dataSources, developmentMetrics, investmentMetrics } from '../data/propertyData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { BarChart, Home, TrendingUp, Building, Calendar, AlertTriangle, Percent, Download, Share2, Printer } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-3 py-6">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{t('dashboard.title')}</h1>
            <p className="text-gray-600 text-sm md:text-base">{t('dashboard.subtitle')}</p>
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
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-gray-50">
            {t('dashboard.last.updated')}: {new Date(marketStats.lastUpdated).toLocaleDateString()}
          </Badge>
          <Badge variant="secondary" className="bg-albania-red text-white hover:bg-albania-red/90">
            +{marketStats.yearlyChange}% {t('year.over.year')}
          </Badge>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
        <StatCard 
          title={t('dashboard.avg.price')}
          value={`${marketStats.averagePrice} €`}
          subtext={t('sqm')}
          change={marketStats.yearlyChange}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        
        <StatCard 
          title={t('dashboard.total.listings')}
          value={marketStats.totalListings.toLocaleString()}
          change={7.2}
          icon={<Home className="w-5 h-5" />}
        />
        
        <StatCard 
          title={t('dashboard.price.sqm')}
          value={`${marketStats.pricePerSqm} €`}
          change={marketStats.quarterlyChange}
          icon={<Building className="w-5 h-5" />}
        />
        
        <WebCrawlerStatus 
          lastUpdated={marketStats.lastUpdated}
          progress={85}
          totalSources={dataSources.length}
          completedSources={dataSources.filter((_, i) => i % 5 !== 0).length}
        />
      </div>
      
      <Tabs defaultValue="market" className="w-full mb-6">
        <TabsList className="w-full mb-4 bg-albania-gray">
          <TabsTrigger value="market" className="flex-1 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('market.overview')}</span>
          </TabsTrigger>
          <TabsTrigger value="developer" className="flex-1 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Building className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('dashboard.developer.insights')}</span>
          </TabsTrigger>
          <TabsTrigger value="investor" className="flex-1 data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Percent className="w-4 h-4 mr-2 inline md:hidden" />
            <span>{t('dashboard.investor.metrics')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="market">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <BarChart className="h-5 w-5 text-albania-red" />
                  {t('dashboard.price.trends')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PriceChart title="" />
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2 flex justify-between">
                <span>{t('year.over.year')}: +{marketStats.yearlyChange}%</span>
                <span>{t('quarter.over.quarter')}: +{marketStats.quarterlyChange}%</span>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <BarChart className="h-5 w-5 text-albania-red" />
                  {t('property.types')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyTypeChart title="" />
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white text-gray-700">
                    {t('property.apartment')}: 58%
                  </Badge>
                  <Badge variant="outline" className="bg-white text-gray-700">
                    {t('property.luxury')}: +2.1% {t('year.over.year')}
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {/* Table */}
          <div className="mb-6">
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <TrendingUp className="h-5 w-5 text-albania-red" />
                  {t('dashboard.price.regions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <RegionPriceTable title="" />
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
                <span>{t('high.opportunity')}: {t('region.tirana')}, {t('region.vlore')}</span>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="developer">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            <Card className="lg:col-span-2 overflow-hidden hover:shadow transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg">{t('dashboard.construction.costs')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('market.development.costs')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">{t('property.residential')}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Card className="p-3">
                        <p className="text-xs text-gray-500">{t('market.economy')}</p>
                        <p className="font-semibold">{developmentMetrics.constructionCosts.residential.economic} €/m²</p>
                      </Card>
                      <Card className="p-3">
                        <p className="text-xs text-gray-500">{t('market.midrange')}</p>
                        <p className="font-semibold">{developmentMetrics.constructionCosts.residential.midRange} €/m²</p>
                      </Card>
                      <Card className="p-3">
                        <p className="text-xs text-gray-500">{t('property.luxury')}</p>
                        <p className="font-semibold">{developmentMetrics.constructionCosts.residential.luxury} €/m²</p>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">{t('property.commercial')}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Card className="p-3">
                        <p className="text-xs text-gray-500">{t('market.standard')}</p>
                        <p className="font-semibold">{developmentMetrics.constructionCosts.commercial.standard} €/m²</p>
                      </Card>
                      <Card className="p-3">
                        <p className="text-xs text-gray-500">{t('market.premium')}</p>
                        <p className="font-semibold">{developmentMetrics.constructionCosts.commercial.premium} €/m²</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <span>{t('market.development.costs')}: +{developmentMetrics.constructionPermits.change}% {t('year.over.year')}</span>
                </div>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden hover:shadow transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg">{t('analysis.building.permits')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('analysis.development.opportunities')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col justify-center items-center h-full py-4">
                  <div className="text-4xl font-bold text-albania-red">
                    {developmentMetrics.constructionPermits.current}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {t('crawler.last_update')}: {new Date().toLocaleDateString()}
                  </div>
                  <div className="mt-4 text-sm font-medium text-green-600">
                    +{developmentMetrics.constructionPermits.change}% {t('year.over.year')}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{t('market.development.costs')}: {developmentMetrics.constructionPermits.previous} ({new Date().getFullYear() - 1})</span>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card className="overflow-hidden hover:shadow transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg">{t('analysis.development.opportunities')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{t('region.tirana')}</p>
                      <p className="text-sm text-gray-500">{t('region.center.tirana')}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {t('high.opportunity')}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{t('region.durres')}</p>
                      <p className="text-sm text-gray-500">{t('region.durres')} {t('region.center.tirana')}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {t('high.opportunity')}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">{t('region.vlore')}</p>
                      <p className="text-sm text-gray-500">{t('crawler.coast')}</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      {t('medium.opportunity')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg">{t('analysis.zoning.regulations')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <p className="font-medium">{t('analysis.urban.planning')}</p>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        {t('analysis.update')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('analysis.urban.planning.description')}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <p className="font-medium">{t('analysis.regulatory.landscape')}</p>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        {t('analysis.important')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('analysis.regulatory.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="investor">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card className="overflow-hidden hover:shadow transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg">{t('analysis.roi.analysis')}</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t('market.investment.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Card className="p-3">
                      <p className="text-xs text-gray-500">{t('analysis.short.term')}</p>
                      <p className="font-semibold text-lg">{investmentMetrics.returnOnInvestment.shortTerm}%</p>
                    </Card>
                    <Card className="p-3">
                      <p className="text-xs text-gray-500">{t('analysis.medium.term')}</p>
                      <p className="font-semibold text-lg">{investmentMetrics.returnOnInvestment.mediumTerm}%</p>
                    </Card>
                    <Card className="p-3">
                      <p className="text-xs text-gray-500">{t('analysis.long.term')}</p>
                      <p className="font-semibold text-lg">{investmentMetrics.returnOnInvestment.longTerm}%</p>
                    </Card>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">{t('market.rental.yield')}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Card className="p-3">
                        <p className="text-xs text-gray-500">{t('property.residential')}</p>
                        <p className="font-semibold">{investmentMetrics.rentalYield.residential.center}% - {investmentMetrics.rentalYield.residential.suburban}%</p>
                      </Card>
                      <Card className="p-3">
                        <p className="text-xs text-gray-500">{t('property.commercial')}</p>
                        <p className="font-semibold">{investmentMetrics.rentalYield.commercial.retail}% - {investmentMetrics.rentalYield.commercial.office}%</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 text-xs text-gray-500 py-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>{t('analysis.price.projections')}: +{investmentMetrics.appreciationRate.oneYearForecast}% ({new Date().getFullYear() + 1})</span>
                </div>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden hover:shadow transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg">{t('market.investment.origin')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-albania-red mr-2"></div>
                      <span className="text-sm">{t('market.domestic.investors')}</span>
                    </div>
                    <div className="text-2xl font-bold">{investmentMetrics.investorOrigin.domestic}%</div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-gray-700 mr-2"></div>
                      <span className="text-sm">{t('market.foreign.investors')}</span>
                    </div>
                    <div className="text-2xl font-bold">{investmentMetrics.investorOrigin.foreign}%</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">{t('market.foreign.investors')}</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {investmentMetrics.foreignInvestors.slice(0, 3).map((investor, i) => (
                      <Card key={i} className="p-3">
                        <p className="text-xs text-gray-500">{investor.country}</p>
                        <p className="font-semibold">{investor.percentage}%</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Web Crawlers Section */}
      <div className="mb-6">
        <WebCrawlerList />
      </div>
    </div>
  );
};

export default Dashboard;
