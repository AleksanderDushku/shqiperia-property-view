
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { useLanguage } from '../contexts/LanguageContext';

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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{t('dashboard.last.updated')}</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground">{completedSources} / {totalSources} {t('about.data.sources')}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebCrawlerStatus;
