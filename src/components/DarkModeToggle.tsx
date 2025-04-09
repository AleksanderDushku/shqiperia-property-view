
import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Switch } from './ui/switch';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle: React.FC = () => {
  const { dark_mode, toggle_dark_mode } = useDarkMode();

  return (
    <div className="flex items-center space-x-2 transition-all duration-300">
      <Sun className={`h-4 w-4 transition-opacity duration-300 ${dark_mode ? 'text-gray-400 opacity-50' : 'text-yellow-500 opacity-100'}`} />
      <Switch 
        checked={dark_mode} 
        onCheckedChange={toggle_dark_mode} 
        className="data-[state=checked]:bg-albania-red" 
      />
      <Moon className={`h-4 w-4 transition-opacity duration-300 ${dark_mode ? 'text-blue-300 opacity-100' : 'text-gray-500 opacity-50'}`} />
    </div>
  );
};

export default DarkModeToggle;
