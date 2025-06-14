
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ModernStatsCardProps {
  title: string;
  value: string;
  change: number;
  badge: string;
  icon: React.ReactNode;
  color: 'red' | 'green' | 'blue' | 'yellow';
}

const ModernStatsCard: React.FC<ModernStatsCardProps> = ({
  title,
  value,
  change,
  badge,
  icon,
  color
}) => {
  const colorClasses = {
    red: 'from-red-500 to-albania-red',
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-indigo-600',
    yellow: 'from-yellow-500 to-orange-600'
  };

  const isPositive = change > 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs font-medium">
            {badge}
          </Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-2">
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight">
            {value}
          </p>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-sm font-medium ${
              isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              vs last month
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernStatsCard;
