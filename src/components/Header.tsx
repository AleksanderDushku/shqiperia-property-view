
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Globe, Menu, X, Home, BarChart2, TrendingUp, Info } from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
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

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-albania-red rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="font-bold text-xl text-gray-900">{t('site.title')}</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link 
            to="/" 
            className={`transition-colors flex items-center gap-1 ${isActive('/') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 hover:text-albania-red'}`}
          >
            <Home className="h-4 w-4" />
            <span>{t('nav.dashboard')}</span>
          </Link>
          <Link 
            to="/market" 
            className={`transition-colors flex items-center gap-1 ${isActive('/market') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 hover:text-albania-red'}`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>{t('nav.market')}</span>
          </Link>
          <Link 
            to="/analysis" 
            className={`transition-colors flex items-center gap-1 ${isActive('/analysis') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 hover:text-albania-red'}`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>{t('nav.analysis')}</span>
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors flex items-center gap-1 ${isActive('/about') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 hover:text-albania-red'}`}
          >
            <Info className="h-4 w-4" />
            <span>{t('nav.about')}</span>
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center space-x-1 bg-white hover:bg-gray-50"
          >
            <Globe className="h-4 w-4" />
            <span>{language === 'sq' ? 'EN' : 'SQ'}</span>
          </Button>
          
          <button 
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`transition-colors flex items-center gap-2 p-2 rounded-md ${isActive('/') 
                ? 'text-albania-red font-medium bg-red-50' 
                : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={toggleMobileMenu}
            >
              <Home className="h-5 w-5" />
              {t('nav.dashboard')}
            </Link>
            <Link 
              to="/market" 
              className={`transition-colors flex items-center gap-2 p-2 rounded-md ${isActive('/market') 
                ? 'text-albania-red font-medium bg-red-50' 
                : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={toggleMobileMenu}
            >
              <BarChart2 className="h-5 w-5" />
              {t('nav.market')}
            </Link>
            <Link 
              to="/analysis" 
              className={`transition-colors flex items-center gap-2 p-2 rounded-md ${isActive('/analysis') 
                ? 'text-albania-red font-medium bg-red-50' 
                : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={toggleMobileMenu}
            >
              <TrendingUp className="h-5 w-5" />
              {t('nav.analysis')}
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors flex items-center gap-2 p-2 rounded-md ${isActive('/about') 
                ? 'text-albania-red font-medium bg-red-50' 
                : 'text-gray-700 hover:bg-gray-50'}`}
              onClick={toggleMobileMenu}
            >
              <Info className="h-5 w-5" />
              {t('nav.about')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
