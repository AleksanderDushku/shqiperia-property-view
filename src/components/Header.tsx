
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import DarkModeToggle from './DarkModeToggle';
import AuthButton from './AuthButton';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { 
  Menu, 
  Home, 
  BarChart3, 
  Calculator, 
  Building2, 
  MapPin, 
  Info, 
  Globe2,
  X
} from 'lucide-react';

const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { dark_mode } = useDarkMode();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.market'), href: '/market', icon: BarChart3 },
    { name: t('nav.analysis'), href: '/analysis', icon: Building2 },
    { name: t('calculator'), href: '/calculator', icon: Calculator },
    { name: t('neighborhoods'), href: '/neighborhoods', icon: MapPin },
    { name: t('nav.about'), href: '/about', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-md ${
      dark_mode 
        ? 'bg-gray-900/90 border-gray-800' 
        : 'bg-white/90 border-gray-200'
    } supports-[backdrop-filter]:bg-background/80`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-albania-red to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-2xl bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent">
                PronaStats
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                {t('site.tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-item px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive(item.href)
                      ? 'bg-albania-red text-white shadow-lg'
                      : dark_mode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      : 'text-gray-600 hover:text-albania-red hover:bg-albania-red/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            <AuthButton />
            <DarkModeToggle />
            
            {/* Language Toggle */}
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 text-albania-red hover:text-albania-red/80 hover:bg-albania-red/5 font-medium rounded-xl px-3 py-2"
            >
              <Globe2 className="h-4 w-4" />
              <span>{language === 'sq' ? 'EN' : 'SQ'}</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm" className="rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-albania-red rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-bold text-lg">PronaStats</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  {/* Mobile Navigation */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-2">
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive(item.href)
                                ? 'bg-albania-red text-white shadow-lg'
                                : 'hover:bg-albania-red/5 hover:text-albania-red'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                  
                  {/* Mobile Footer */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                    <Button
                      variant="ghost"
                      onClick={toggleLanguage}
                      className="w-full justify-start text-albania-red hover:text-albania-red/80 hover:bg-albania-red/5"
                    >
                      <Globe2 className="h-5 w-5 mr-3" />
                      {language === 'sq' ? 'Switch to English' : 'Kalo në Shqip'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
