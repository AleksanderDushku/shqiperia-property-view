
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { dataSources } from '../data/propertyData';
import { ExternalLink } from 'lucide-react';

const WebCrawlerList: React.FC = () => {
  const { t } = useLanguage();
  
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('crawler.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('crawler.website')}</TableHead>
              <TableHead>{t('crawler.listing_count')}</TableHead>
              <TableHead>{t('crawler.last_update')}</TableHead>
              <TableHead>{t('crawler.status')}</TableHead>
              <TableHead className="text-right">{t('crawler.visit')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataSources.map((source, index) => {
              const status = getRandomStatus();
              return (
                <TableRow key={index}>
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
                      className="inline-flex items-center gap-1 text-albania-red hover:underline"
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
      </CardContent>
    </Card>
  );
};

export default WebCrawlerList;
