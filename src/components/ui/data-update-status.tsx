
import React from 'react';
import { Badge } from './badge';
import { Clock, Database, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const DataUpdateStatus: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="outline" className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {t('Updated Twice Daily')}
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1">
        <RefreshCw className="h-3 w-3" />
        {t('6 AM & 6 PM')}
      </Badge>
      <Badge variant="outline" className="flex items-center gap-1">
        <Database className="h-3 w-3" />
        {t('Automated')}
      </Badge>
    </div>
  );
};
