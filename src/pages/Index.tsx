
import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';
import SeasonalMarketAnalysis from '../components/SeasonalMarketAnalysis';
import MortgageCalculator from '../components/MortgageCalculator';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, Calculator, MapPin } from 'lucide-react';

const Index: React.FC = () => {
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();
  
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
    <div className={`animate-fade-in space-y-6 ${isMobile ? 'px-2' : 'px-4'}`}>
      <div className="container mx-auto py-6">
        <div className="text-center mb-8 reveal-element transition-all duration-700 opacity-0 translate-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {language === 'sq' ? 'Analiza e Tregut të Pronave në Shqipëri' : 'Albanian Property Market Analysis'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'sq' 
              ? 'Platforma më e besueshme për të dhëna të sakta dhe në kohë reale mbi tregun e pronave në Shqipëri'
              : 'The most reliable platform for accurate and real-time data on the Albanian property market'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2 reveal-element transition-all duration-700 opacity-0 translate-y-4">
            <SeasonalMarketAnalysis />
          </div>
          
          <div className="col-span-1 reveal-element transition-all duration-700 opacity-0 translate-y-4" style={{ transitionDelay: '200ms' }}>
            <MortgageCalculator />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/calculator" className="group reveal-element transition-all duration-700 opacity-0 translate-y-4 bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all border border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center p-6 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-3 mb-4 transition-all group-hover:scale-110 duration-300">
              <Calculator className="h-8 w-8 text-albania-red" />
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('Llogaritës financiar')}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('Përdor llogaritësin tonë për të planifikuar blerjen tënde të ardhshme dhe për të llogaritur kthimin e investimit')}
            </p>
            <Button variant="link" className="group-hover:underline text-albania-red flex items-center gap-1 mt-auto">
              {t('Eksploro tani')}
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          
          <Link to="/neighborhoods" className="group reveal-element transition-all duration-700 opacity-0 translate-y-4" style={{ transitionDelay: '200ms' }}>
            <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/30 transition-all border border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center p-6 text-center h-full">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-3 mb-4 transition-all group-hover:scale-110 duration-300">
                <MapPin className="h-8 w-8 text-albania-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{t('Lagjet dhe zonat')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('Zbulo profilet e detajuara të lagjeve popullore me amenitete dhe trendet e çmimeve')}
              </p>
              <Button variant="link" className="group-hover:underline text-albania-red flex items-center gap-1 mt-auto">
                {t('Zbulo zonat')}
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </Link>
        </div>
      </div>
      <Dashboard />
    </div>
  );
};

export default Index;
