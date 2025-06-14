
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsDisplayProps {
  label: string;
  value: string | number;
  change?: number;
  period?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  label,
  value,
  change,
  period = 'yearly',
  icon,
  className
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {label}
        </span>
      </div>
      
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </div>
      
      {change !== undefined && (
        <div className="flex items-center">
          {change >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
          )}
          <span className={cn(
            "text-sm font-medium",
            change >= 0 ? "text-green-600" : "text-red-600"
          )}>
            {change >= 0 ? '+' : ''}{change.toFixed(1)}% {period}
          </span>
        </div>
      )}
    </div>
  );
};
