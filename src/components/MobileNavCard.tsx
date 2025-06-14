
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface MobileNavCardProps {
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  color?: 'red' | 'green' | 'blue' | 'yellow';
}

const MobileNavCard: React.FC<MobileNavCardProps> = ({
  to,
  title,
  description,
  icon,
  badge,
  color = 'red'
}) => {
  const { dark_mode } = useDarkMode();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'yellow':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'bg-red-50 dark:bg-red-900/20';
    }
  };

  return (
    <Link to={to} className="group block">
      <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
        dark_mode 
          ? 'bg-gray-800 border-gray-700 hover:border-albania-red/50' 
          : 'bg-white border-gray-100 hover:border-albania-red/30'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-4 rounded-2xl ${getColorClasses(color)}`}>
              {icon}
            </div>
            {badge && (
              <span className="bg-albania-red text-white text-xs px-3 py-1 rounded-full font-medium">
                {badge}
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold dark:text-white group-hover:text-albania-red transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <Button 
                variant="ghost" 
                className="text-albania-red hover:text-albania-red hover:bg-albania-red/10 p-0 h-auto font-medium"
              >
                Eksploro tani
              </Button>
              <ChevronRight className="h-5 w-5 text-albania-red group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MobileNavCard;
