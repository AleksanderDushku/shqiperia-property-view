
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface ModernStatsCardProps {
  title: string;
  value: string;
  change?: number;
  badge?: string;
  icon: React.ReactNode;
  color?: 'red' | 'green' | 'blue' | 'yellow';
}

const ModernStatsCard: React.FC<ModernStatsCardProps> = ({
  title,
  value,
  change,
  badge,
  icon,
  color = 'red'
}) => {
  const { dark_mode } = useDarkMode();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'yellow':
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-red-50 dark:bg-red-900/20 text-albania-red border-red-200 dark:border-red-800';
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
      dark_mode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${getColorClasses(color)}`}>
            {icon}
          </div>
          {badge && (
            <Badge variant="secondary" className="bg-albania-red text-white text-xs px-2 py-1">
              {badge}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold dark:text-white">{value}</span>
            {change !== undefined && (
              <div className={`flex items-center gap-1 text-sm font-medium ${
                change >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {change >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{change >= 0 ? '+' : ''}{change}%</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernStatsCard;
