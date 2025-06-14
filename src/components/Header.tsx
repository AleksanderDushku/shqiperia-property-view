
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import DarkModeToggle from './DarkModeToggle';
import AuthButton from './AuthButton';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Home, BarChart3, Calculator, Building2, MapPin, Info, Search } from 'lucide-react';

const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { dark_mode } = useDarkMode();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: t('Ballina'), href: '/', icon: Home },
    { name: t('Tregu'), href: '/market', icon: BarChart3 },
    { name: t('Prona'), href: '/properties', icon: Building2 },
    { name: t('Llogaritës'), href: '/calculator', icon: Calculator },
    { name: t('Lagjet'), href: '/neighborhoods', icon: MapPin },
    { name: t('Rreth nesh'), href: '/about', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 w-full border-b ${
      dark_mode 
        ? 'bg-gray-900/95 border-gray-800 backdrop-blur' 
        : 'bg-white/95 border-gray-200 backdrop-blur'
    } supports-[backdrop-filter]:bg-background/60`}>
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-albania-red rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-albania-red hidden sm:inline-block">
                PronaStats
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-item px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-albania-red text-white'
                      : dark_mode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-700 hover:text-albania-red hover:bg-albania-red/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline-block">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            <AuthButton />
            <DarkModeToggle />
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="hidden sm:flex text-albania-red hover:text-albania-red/80 font-medium"
            >
              {language === 'sq' ? 'EN' : 'SQ'}
            </Button>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-bold text-xl text-albania-red">PronaStats</span>
                  </div>
                  
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                          isActive(item.href)
                            ? 'bg-albania-red text-white'
                            : 'hover:bg-albania-red/10 hover:text-albania-red'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="ghost"
                      onClick={toggleLanguage}
                      className="w-full justify-start text-albania-red hover:text-albania-red/80"
                    >
                      {language === 'sq' ? 'English' : 'Shqip'}
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
