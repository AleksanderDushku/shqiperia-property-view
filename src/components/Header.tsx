
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Globe, Menu, X } from 'lucide-react';

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
            className={`transition-colors ${isActive('/') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 hover:text-albania-red'}`}
          >
            {t('nav.dashboard')}
          </Link>
          <Link 
            to="/market" 
            className={`transition-colors ${isActive('/market') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 hover:text-albania-red'}`}
          >
            {t('nav.market')}
          </Link>
          <Link 
            to="/analysis" 
            className={`transition-colors ${isActive('/analysis') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 hover:text-albania-red'}`}
          >
            {t('nav.analysis')}
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors ${isActive('/about') 
              ? 'text-albania-red font-medium' 
              : 'text-gray-700 hover:text-albania-red'}`}
          >
            {t('nav.about')}
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center space-x-1"
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
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') 
                ? 'text-albania-red font-medium' 
                : 'text-gray-700'}`}
              onClick={toggleMobileMenu}
            >
              {t('nav.dashboard')}
            </Link>
            <Link 
              to="/market" 
              className={`transition-colors ${isActive('/market') 
                ? 'text-albania-red font-medium' 
                : 'text-gray-700'}`}
              onClick={toggleMobileMenu}
            >
              {t('nav.market')}
            </Link>
            <Link 
              to="/analysis" 
              className={`transition-colors ${isActive('/analysis') 
                ? 'text-albania-red font-medium' 
                : 'text-gray-700'}`}
              onClick={toggleMobileMenu}
            >
              {t('nav.analysis')}
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${isActive('/about') 
                ? 'text-albania-red font-medium' 
                : 'text-gray-700'}`}
              onClick={toggleMobileMenu}
            >
              {t('nav.about')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
