
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface EnhancedCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  className?: string;
  gradient?: string;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  title,
  subtitle,
  children,
  icon,
  badge,
  className,
  gradient = "from-blue-500 to-indigo-600"
}) => {
  return (
    <Card className={cn(
      "group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 overflow-hidden",
      className
    )}>
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          {icon && (
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
              {icon}
            </div>
          )}
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-albania-red transition-colors">
          {title}
        </CardTitle>
        {subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        )}
      </CardHeader>
      <CardContent className="pb-6">
        {children}
      </CardContent>
    </Card>
  );
};
