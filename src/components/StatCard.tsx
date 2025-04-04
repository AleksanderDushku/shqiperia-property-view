
import React from 'react';
import { Card, CardContent } from './ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  change?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, icon, change }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">{value}</p>
              {subtext && (
                <span className="ml-1 text-sm text-gray-500">{subtext}</span>
              )}
            </div>
            
            {change !== undefined && (
              <div className={`mt-2 flex items-center text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <span>{change >= 0 ? '↑' : '↓'} {Math.abs(change)}%</span>
                <span className="ml-2 text-gray-500">nga viti i kaluar</span>
              </div>
            )}
          </div>
          
          {icon && <div className="p-2 rounded-full bg-albania-gray text-albania-red">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
