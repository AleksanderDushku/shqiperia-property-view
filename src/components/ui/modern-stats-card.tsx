
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface ModernStatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  period?: string;
  icon: React.ReactNode;
  gradient: string;
  badge?: string;
  className?: string;
}

export const ModernStatsCard: React.FC<ModernStatsCardProps> = ({
  title,
  value,
  change,
  period,
  icon,
  gradient,
  badge,
  className
}) => {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0",
      className
    )}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
      <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs font-medium">
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-105 transition-transform">
          {value}
        </div>
        
        {change !== undefined && (
          <div className="flex items-center gap-1">
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
              change >= 0 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}>
              <span>{change >= 0 ? '+' : ''}{change.toFixed(1)}%</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{period}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
