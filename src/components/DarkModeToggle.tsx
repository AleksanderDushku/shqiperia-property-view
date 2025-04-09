
import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Switch } from './ui/switch';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle: React.FC = () => {
  const { dark_mode, toggle_dark_mode } = useDarkMode();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <Switch 
        checked={dark_mode} 
        onCheckedChange={toggle_dark_mode} 
        className="data-[state=checked]:bg-albania-red" 
      />
      <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </div>
  );
};

export default DarkModeToggle;
