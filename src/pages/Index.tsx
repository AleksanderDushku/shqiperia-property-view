
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Calculator, BarChart3, Building2, MapPin, TrendingUp, DollarSign } from 'lucide-react';

// Components
import Dashboard from './Dashboard';
import SeasonalMarketAnalysis from '../components/SeasonalMarketAnalysis';
import AlbanianBanksEnhanced from '../components/AlbanianBanksEnhanced';
import INSTATDataSource from '../components/INSTATDataSource';
import DataSourcesDropdown from '../components/DataSourcesDropdown';
import ModernStatsCard from '../components/ModernStatsCard';
import MobileNavCard from '../components/MobileNavCard';

const Index: React.FC = () => {
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();
  const { dark_mode } = useDarkMode();
  
  // Add subtle scroll reveal animation
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className={`min-h-screen ${dark_mode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className={`animate-fade-in space-y-8 ${isMobile ? 'px-4' : 'px-6'}`}>
        <div className="container mx-auto py-8">
          {/* Hero Section */}
          <div className="text-center mb-12 reveal-element transition-all duration-700 opacity-0 translate-y-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-gray-100 leading-tight">
                {language === 'sq' ? 'Analiza e Tregut të Pronave në Shqipëri' : 'Albanian Property Market Analysis'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {language === 'sq' 
                  ? 'Platforma më e besueshme për të dhëna të sakta dhe në kohë reale mbi tregun e pronave në Shqipëri'
                  : 'The most reliable platform for accurate and real-time data on the Albanian property market'}
              </p>
              
              {/* Data Sources Dropdown */}
              <div className="mb-8">
                <DataSourcesDropdown />
              </div>
            </div>
          </div>

          {/* Key Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 reveal-element transition-all duration-700 opacity-0 translate-y-4">
            <ModernStatsCard
              title={language === 'sq' ? 'Çmimi mesatar/m²' : 'Average Price/m²'}
              value="€1,850"
              change={8.5}
              badge="Tiranë"
              icon={<TrendingUp className="h-6 w-6" />}
              color="red"
            />
            <ModernStatsCard
              title={language === 'sq' ? 'Rritje vjetore' : 'Annual Growth'}
              value="12.3%"
              change={2.1}
              badge="YoY"
              icon={<BarChart3 className="h-6 w-6" />}
              color="green"
            />
            <ModernStatsCard
              title={language === 'sq' ? 'Prona aktive' : 'Active Properties'}
              value="15,432"
              change={-3.2}
              badge="Aktive"
              icon={<Building2 className="h-6 w-6" />}
              color="blue"
            />
            <ModernStatsCard
              title={language === 'sq' ? 'Norma e kredisë' : 'Mortgage Rate'}
              value="6.8%"
              change={-0.5}
              badge="Mesatare"
              icon={<DollarSign className="h-6 w-6" />}
              color="yellow"
            />
          </div>
          
          {/* Market Analysis Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 reveal-element transition-all duration-700 opacity-0 translate-y-4">
              <SeasonalMarketAnalysis />
            </div>
            
            <div className="reveal-element transition-all duration-700 opacity-0 translate-y-4" style={{ transitionDelay: '200ms' }}>
              <INSTATDataSource />
            </div>
          </div>
          
          {/* Banks Section */}
          <div className="reveal-element transition-all duration-700 opacity-0 translate-y-4 mb-12" style={{ transitionDelay: '400ms' }}>
            <AlbanianBanksEnhanced />
          </div>
          
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <MobileNavCard
              to="/calculator"
              title={t('Llogaritës financiar')}
              description={t('Përdor llogaritësin tonë për të planifikuar blerjen tënde të ardhshme dhe për të llogaritur kthimin e investimit')}
              icon={<Calculator className="h-8 w-8 text-albania-red" />}
              badge="Trending"
              color="red"
            />
            
            <MobileNavCard
              to="/market"
              title={t('Analiza e tregut')}
              description={t('Eksploro analizën e detajuar të tregut të pasurive të paluajtshme dhe trendet më të fundit')}
              icon={<BarChart3 className="h-8 w-8 text-albania-red" />}
              badge="Updated"
              color="green"
            />

            <MobileNavCard
              to="/neighborhoods"
              title={t('Neighborhoods')}
              description={t('Discover detailed neighborhood profiles and local market insights')}
              icon={<MapPin className="h-8 w-8 text-albania-red" />}
              badge="New"
              color="blue"
            />
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="reveal-element transition-all duration-700 opacity-0 translate-y-4" style={{ transitionDelay: '600ms' }}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
