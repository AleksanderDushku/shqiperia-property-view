
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'sq' ? 'en' : 'sq');
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-albania-red rounded-md flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="font-semibold text-xl text-gray-900">{t('site.title')}</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-albania-red transition-colors">
            {t('nav.dashboard')}
          </Link>
          <Link to="/market" className="text-gray-700 hover:text-albania-red transition-colors">
            {t('nav.market')}
          </Link>
          <Link to="/properties" className="text-gray-700 hover:text-albania-red transition-colors">
            {t('nav.properties')}
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-albania-red transition-colors">
            {t('nav.about')}
          </Link>
        </nav>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleLanguage}
          className="flex items-center space-x-1"
        >
          <Globe className="h-4 w-4" />
          <span>{language === 'sq' ? 'EN' : 'SQ'}</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
