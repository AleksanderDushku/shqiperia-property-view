
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Globe, Menu, X, Home, BarChart2, TrendingUp, Info } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, set_mobile_menu_open] = React.useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'sq' ? 'en' : 'sq');
  };

  const toggleMobileMenu = () => {
    set_mobile_menu_open(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Direct translations based on current language
  const navLabels = {
    dashboard: language === 'sq' ? 'Paneli' : 'Dashboard',
    market: language === 'sq' ? 'Tregu' : 'Market',
    analysis: language === 'sq' ? 'Analiza' : 'Analysis',
    about: language === 'sq' ? 'Rreth Nesh' : 'About Us'
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md py-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-albania-red rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">PronaStats</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link 
            to="/" 
            className={`transition-colors flex items-center gap-1 ${isActive('/') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 dark:text-gray-300 hover:text-albania-red dark:hover:text-albania-red'}`}
          >
            <Home className="h-4 w-4" />
            <span>{navLabels.dashboard}</span>
          </Link>
          <Link 
            to="/market" 
            className={`transition-colors flex items-center gap-1 ${isActive('/market') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 dark:text-gray-300 hover:text-albania-red dark:hover:text-albania-red'}`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>{navLabels.market}</span>
          </Link>
          <Link 
            to="/analysis" 
            className={`transition-colors flex items-center gap-1 ${isActive('/analysis') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 dark:text-gray-300 hover:text-albania-red dark:hover:text-albania-red'}`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>{navLabels.analysis}</span>
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors flex items-center gap-1 ${isActive('/about') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 dark:text-gray-300 hover:text-albania-red dark:hover:text-albania-red'}`}
          >
            <Info className="h-4 w-4" />
            <span>{navLabels.about}</span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center space-x-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'sq' ? 'EN' : 'SQ'}</span>
          </Button>
          
          <button 
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`transition-colors flex items-center gap-2 p-2 rounded-md ${isActive('/') 
                ? 'text-albania-red font-medium bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              onClick={toggleMobileMenu}
            >
              <Home className="h-5 w-5" />
              {navLabels.dashboard}
            </Link>
            <Link 
              to="/market" 
              className={`transition-colors flex items-center gap-2 p-2 rounded-md ${isActive('/market') 
                ? 'text-albania-red font-medium bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              onClick={toggleMobileMenu}
            >
              <BarChart2 className="h-5 w-5" />
              {navLabels.market}
            </Link>
            <Link 
              to="/analysis" 
              className={`transition-colors flex items-center gap-2 p-2 rounded-md ${isActive('/analysis') 
                ? 'text-albania-red font-medium bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              onClick={toggleMobileMenu}
            >
              <TrendingUp className="h-5 w-5" />
              {navLabels.analysis}
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors flex items-center gap-2 p-2 rounded-md ${isActive('/about') 
                ? 'text-albania-red font-medium bg-red-50 dark:bg-red-900/20' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              onClick={toggleMobileMenu}
            >
              <Info className="h-5 w-5" />
              {navLabels.about}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
