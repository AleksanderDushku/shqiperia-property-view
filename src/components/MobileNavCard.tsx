
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight } from 'lucide-react';

interface MobileNavCardProps {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  color: 'red' | 'green' | 'blue' | 'yellow';
}

const MobileNavCard: React.FC<MobileNavCardProps> = ({
  to,
  title,
  description,
  icon,
  badge,
  color
}) => {
  const colorClasses = {
    red: 'from-red-500 to-albania-red',
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-indigo-600',
    yellow: 'from-yellow-500 to-orange-600'
  };

  return (
    <Link to={to} className="group block">
      <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${colorClasses[color]} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-white">
                {icon}
              </div>
            </div>
            {badge && (
              <Badge className="bg-albania-red/10 text-albania-red border-albania-red/20 font-medium">
                {badge}
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-albania-red transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-end mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 text-albania-red font-medium text-sm">
              <span>Explore</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MobileNavCard;
