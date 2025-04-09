
import React from 'react';
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

  return (
    <div className={`animate-fade-in space-y-6 ${isMobile ? 'px-2' : 'px-4'}`}>
      <div className="container mx-auto py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {language === 'sq' ? 'Analiza e Tregut të Pronave në Shqipëri' : 'Albanian Property Market Analysis'}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'sq' 
              ? 'Platforma më e besueshme për të dhëna të sakta dhe në kohë reale mbi tregun e pronave në Shqipëri'
              : 'The most reliable platform for accurate and real-time data on the Albanian property market'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2">
            <SeasonalMarketAnalysis />
          </div>
          
          <div className="col-span-1">
            <MortgageCalculator />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/calculator" className="group bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-all border border-gray-100 flex flex-col justify-center items-center p-6 text-center">
            <div className="bg-red-50 rounded-full p-3 mb-4">
              <Calculator className="h-8 w-8 text-albania-red" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('Llogaritës financiar')}</h3>
            <p className="text-gray-600 mb-4">
              {t('Përdor llogaritësin tonë për të planifikuar blerjen tënde të ardhshme dhe për të llogaritur kthimin e investimit')}
            </p>
            <Button variant="link" className="group-hover:underline text-albania-red flex items-center gap-1 mt-auto">
              {t('Eksploro tani')}
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          
          <Link to="/neighborhoods" className="group bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-all border border-gray-100 flex flex-col justify-center items-center p-6 text-center">
            <div className="bg-red-50 rounded-full p-3 mb-4">
              <MapPin className="h-8 w-8 text-albania-red" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('Lagjet dhe zonat')}</h3>
            <p className="text-gray-600 mb-4">
              {t('Zbulo profilet e detajuara të lagjeve popullore me amenitete dhe trendet e çmimeve')}
            </p>
            <Button variant="link" className="group-hover:underline text-albania-red flex items-center gap-1 mt-auto">
              {t('Zbulo zonat')}
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
      <Dashboard />
    </div>
  );
};

export default Index;
