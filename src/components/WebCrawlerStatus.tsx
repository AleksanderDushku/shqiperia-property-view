
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { useLanguage } from '../contexts/LanguageContext';
import { Database } from 'lucide-react';

interface WebCrawlerStatusProps {
  lastUpdated: string;
  progress: number;
  totalSources: number;
  completedSources: number;
}

const WebCrawlerStatus: React.FC<WebCrawlerStatusProps> = ({
  lastUpdated,
  progress,
  totalSources,
  completedSources
}) => {
  const { t } = useLanguage();
  
  // Format date
  const formattedDate = new Date(lastUpdated).toLocaleDateString();
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm font-medium">{t('dashboard.last.updated')}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </div>
          <div className="p-2 rounded-full bg-albania-gray text-albania-red">
            <Database className="w-4 h-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {completedSources} / {totalSources} {t('about.data.sources')}
            </div>
            <div className="text-xs font-medium text-albania-red">
              {progress}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebCrawlerStatus;
