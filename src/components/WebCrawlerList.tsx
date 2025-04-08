
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { dataSources } from '../data/propertyData';
import { ExternalLink, Search, ArrowUp, ArrowDown, Database, BarChart3, Percent } from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useIsMobile } from '../hooks/use-mobile';

const WebCrawlerList: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, set_search_term] = useState('');
  const [sortConfig, set_sort_config] = useState<{key: string, direction: 'asc' | 'desc'}>({
    key: 'name',
    direction: 'asc'
  });
  const isMobile = useIsMobile();
  
  // Generate random crawl times for demonstration
  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  // Generate random success status
  const getRandomStatus = () => {
    const statuses = ['success', 'pending', 'success', 'success', 'success'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  
  // Generate random listing counts
  const getRandomCount = () => {
    return Math.floor(Math.random() * 1000) + 100;
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    set_sort_config({ key, direction });
  };

  // Filter and sort the data sources
  const filteredSources = dataSources
    .filter(source => 
      source.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      // Adding sorting for reliability and coverage
      if (sortConfig.key === 'reliability') {
        return sortConfig.direction === 'asc'
          ? (a.reliability || 0) - (b.reliability || 0)
          : (b.reliability || 0) - (a.reliability || 0);
      }
      if (sortConfig.key === 'coverage') {
        return sortConfig.direction === 'asc'
          ? (a.coverage || 0) - (b.coverage || 0)
          : (b.coverage || 0) - (a.coverage || 0);
      }
      return 0;
    });

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };
  
  // Calculate data stats
  const totalSources = dataSources.length;
  const activeSources = dataSources.filter((_, i) => getRandomStatus() !== 'failed').length;
  const totalListings = filteredSources.reduce((acc, _, i) => acc + getRandomCount(), 0);
  const averageReliability = dataSources.reduce((acc, src) => acc + (src.reliability || 0), 0) / dataSources.length;
  const averageCoverage = dataSources.reduce((acc, src) => acc + (src.coverage || 0), 0) / dataSources.length;

  // Get reliability class
  const getReliabilityClass = (value: number) => {
    if (value >= 0.9) return 'text-green-600';
    if (value >= 0.8) return 'text-amber-500';
    return 'text-red-500';
  };

  // Get coverage class
  const getCoverageClass = (value: number) => {
    if (value >= 0.8) return 'text-green-600';
    if (value >= 0.7) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg md:text-2xl font-bold flex items-center gap-2">
          <Database className="h-5 w-5 text-albania-red" />
          {t('crawler.title')}
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          {t('crawler.description')}
        </CardDescription>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mb-2">
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{t('about.data.sources')}</p>
                  <p className="text-xl font-bold">{totalSources}</p>
                </div>
                <Database className="h-8 w-8 text-albania-red opacity-80" />
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>{t('crawler.success')}</span>
                  <span className="font-medium">{Math.round((activeSources/totalSources)*100)}%</span>
                </div>
                <Progress value={(activeSources/totalSources)*100} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{t('dashboard.total.listings')}</p>
                  <p className="text-xl font-bold">{totalListings.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-albania-red opacity-80" />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {t('dashboard.last.updated')}: {new Date().toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{t('crawler.reliability')}</p>
                  <p className="text-xl font-bold">{(averageReliability * 100).toFixed(1)}%</p>
                </div>
                <Percent className="h-8 w-8 text-albania-red opacity-80" />
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>{t('crawler.reliability')}</span>
                  <span className={`font-medium ${getReliabilityClass(averageReliability)}`}>
                    {averageReliability >= 0.9 ? t('high.opportunity') : 
                     averageReliability >= 0.8 ? t('medium.opportunity') : t('low.opportunity')}
                  </span>
                </div>
                <Progress value={averageReliability * 100} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{t('crawler.coverage')}</p>
                  <p className="text-xl font-bold">{(averageCoverage * 100).toFixed(1)}%</p>
                </div>
                <Database className="h-8 w-8 text-albania-red opacity-80" />
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>{t('crawler.coverage')}</span>
                  <span className={`font-medium ${getCoverageClass(averageCoverage)}`}>
                    {averageCoverage >= 0.8 ? t('high.opportunity') : 
                     averageCoverage >= 0.7 ? t('medium.opportunity') : t('low.opportunity')}
                  </span>
                </div>
                <Progress value={averageCoverage * 100} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4 relative">
          <Input
            type="text"
            placeholder={`${t('properties.search')}...`}
            value={searchTerm}
            onChange={(e) => set_search_term(e.target.value)}
            className="pr-8 max-w-sm"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="sources" className="w-full">
          <TabsList className="w-full mb-2 bg-gray-100 rounded-none px-4">
            <TabsTrigger value="sources">{t('about.data.sources')}</TabsTrigger>
            <TabsTrigger value="metrics">{t('dashboard.key.metrics')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sources" className="mt-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{t('crawler.website')}</span>
                        {getSortIcon('name')}
                      </div>
                    </TableHead>
                    <TableHead>{t('crawler.listing_count')}</TableHead>
                    <TableHead>{t('crawler.last_update')}</TableHead>
                    <TableHead>{t('crawler.status')}</TableHead>
                    {!isMobile && (
                      <>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('reliability')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{t('crawler.reliability')}</span>
                            {getSortIcon('reliability')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handleSort('coverage')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>{t('crawler.coverage')}</span>
                            {getSortIcon('coverage')}
                          </div>
                        </TableHead>
                      </>
                    )}
                    <TableHead className="text-right">{t('crawler.visit')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSources.map((source, index) => {
                    const status = getRandomStatus();
                    const count = getRandomCount();
                    return (
                      <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium">{source.name}</TableCell>
                        <TableCell>{count.toLocaleString()}</TableCell>
                        <TableCell>{`${new Date().toLocaleDateString()} ${getRandomTime()}`}</TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-2 ${
                            status === 'success' ? 'text-green-600' : 
                            status === 'pending' ? 'text-amber-500' : 'text-red-600'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              status === 'success' ? 'bg-green-600' :
                              status === 'pending' ? 'bg-amber-500' : 'bg-red-600'
                            }`} />
                            {status === 'success' ? t('crawler.success') : 
                            status === 'pending' ? t('crawler.pending') : t('crawler.failed')}
                          </div>
                        </TableCell>
                        {!isMobile && (
                          <>
                            <TableCell>
                              <div className="flex items-center">
                                <span className={`font-medium ${getReliabilityClass(source.reliability || 0)}`}>
                                  {source.reliability ? (source.reliability * 100).toFixed(0) + '%' : 'N/A'}
                                </span>
                                <Progress 
                                  value={(source.reliability || 0) * 100} 
                                  className="h-1.5 w-16 ml-2" 
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className={`font-medium ${getCoverageClass(source.coverage || 0)}`}>
                                  {source.coverage ? (source.coverage * 100).toFixed(0) + '%' : 'N/A'}
                                </span>
                                <Progress 
                                  value={(source.coverage || 0) * 100} 
                                  className="h-1.5 w-16 ml-2" 
                                />
                              </div>
                            </TableCell>
                          </>
                        )}
                        <TableCell className="text-right">
                          <a 
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-albania-red hover:underline transition-colors"
                          >
                            {t('crawler.visit')}
                            <ExternalLink size={14} />
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="mt-0 px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gray-50 pb-2">
                  <CardTitle className="text-base font-medium">{t('crawler.reliability')}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {dataSources.slice(0, 5).sort((a, b) => (b.reliability || 0) - (a.reliability || 0)).map((source, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-normal">
                            {i + 1}
                          </Badge>
                          <span className="text-sm font-medium">{source.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${getReliabilityClass(source.reliability || 0)}`}>
                            {source.reliability ? (source.reliability * 100).toFixed(1) + '%' : 'N/A'}
                          </span>
                          <Progress 
                            value={(source.reliability || 0) * 100} 
                            className="h-1.5 w-16" 
                          />
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 mt-4">
                      {t('crawler.reliability')} {t('market.trends.description')}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-gray-50 pb-2">
                  <CardTitle className="text-base font-medium">{t('crawler.coverage')}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {dataSources.slice(0, 5).sort((a, b) => (b.coverage || 0) - (a.coverage || 0)).map((source, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-normal">
                            {i + 1}
                          </Badge>
                          <span className="text-sm font-medium">{source.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${getCoverageClass(source.coverage || 0)}`}>
                            {source.coverage ? (source.coverage * 100).toFixed(1) + '%' : 'N/A'}
                          </span>
                          <Progress 
                            value={(source.coverage || 0) * 100} 
                            className="h-1.5 w-16" 
                          />
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 mt-4">
                      {t('crawler.coverage')} {t('market.investment.description')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WebCrawlerList;
