
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { dataSources } from '../data/propertyData';
import { ExternalLink, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from './ui/input';

const WebCrawlerList: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, set_search_term] = useState('');
  const [sortConfig, set_sort_config] = useState<{key: string, direction: 'asc' | 'desc'}>({
    key: 'name',
    direction: 'asc'
  });
  
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
      return 0;
    });

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold">{t('about.data.sources')}</CardTitle>
        <div className="mt-2 relative">
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
                <TableHead className="text-right">{t('crawler.visit')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSources.map((source, index) => {
                const status = getRandomStatus();
                return (
                  <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">{source.name}</TableCell>
                    <TableCell>{getRandomCount()}</TableCell>
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
      </CardContent>
    </Card>
  );
};

export default WebCrawlerList;
