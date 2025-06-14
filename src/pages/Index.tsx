
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';
import { useDarkMode } from '../contexts/DarkModeContext';
import { Calculator, BarChart3, Building2, MapPin, TrendingUp, DollarSign, Bell, Download } from 'lucide-react';

// Components
import Dashboard from './Dashboard';
import SeasonalMarketAnalysis from '../components/SeasonalMarketAnalysis';
import AlbanianBanksEnhanced from '../components/AlbanianBanksEnhanced';
import INSTATDataSource from '../components/INSTATDataSource';
import DataSourcesDropdown from '../components/DataSourcesDropdown';
import ModernStatsCard from '../components/ModernStatsCard';
import MobileNavCard from '../components/MobileNavCard';
import LeadGenerationForm from '../components/LeadGenerationForm';
import PropertyWatchlist from '../components/PropertyWatchlist';

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
                {language === 'sq' ? 'Platforma #1 për Analizën e Tregut të Pronave në Shqipëri' : 'Albania\'s #1 Property Market Intelligence Platform'}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {language === 'sq' 
                  ? 'Të dhëna të sakta në kohë reale, analiza të thella dhe mjete investimi për blerës, investitorë dhe profesionistë të pasurive të paluajtshme'
                  : 'Real-time accurate data, deep analytics, and investment tools for buyers, investors, and real estate professionals'}
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>15,000+ Properties Tracked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Real-time Market Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-albania-red rounded-full"></div>
                  <span>Trusted by 2,500+ Investors</span>
                </div>
              </div>
              
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
              title={language === 'sq' ? 'Kthim mesatar' : 'Average ROI'}
              value="8.2%"
              change={1.4}
              badge="Rental"
              icon={<DollarSign className="h-6 w-6" />}
              color="yellow"
            />
          </div>

          {/* Lead Generation Form */}
          <div className="mb-12 reveal-element transition-all duration-700 opacity-0 translate-y-4">
            <LeadGenerationForm />
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

          {/* Property Watchlist Section */}
          <div className="mb-12 reveal-element transition-all duration-700 opacity-0 translate-y-4" style={{ transitionDelay: '300ms' }}>
            <PropertyWatchlist />
          </div>
          
          {/* Banks Section */}
          <div className="reveal-element transition-all duration-700 opacity-0 translate-y-4 mb-12" style={{ transitionDelay: '400ms' }}>
            <AlbanianBanksEnhanced />
          </div>
          
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <MobileNavCard
              to="/calculator"
              title={t('AI Property Valuation')}
              description={t('Get instant property valuations powered by AI and real market data. Perfect for investment decisions.')}
              icon={<Calculator className="h-8 w-8 text-albania-red" />}
              badge="AI Powered"
              color="red"
            />
            
            <MobileNavCard
              to="/market"
              title={t('Advanced Market Analytics')}
              description={t('Deep dive into market trends, price forecasts, and investment opportunities with interactive charts.')}
              icon={<BarChart3 className="h-8 w-8 text-albania-red" />}
              badge="Premium"
              color="green"
            />

            <MobileNavCard
              to="/neighborhoods"
              title={t('Neighborhood Intelligence')}
              description={t('Detailed neighborhood profiles with ROI analysis, growth potential, and local market insights.')}
              icon={<MapPin className="h-8 w-8 text-albania-red" />}
              badge="Exclusive"
              color="blue"
            />
          </div>

          {/* Success Stories / Social Proof Section */}
          <div className="mt-16 reveal-element transition-all duration-700 opacity-0 translate-y-4" style={{ transitionDelay: '600ms' }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-white">
                {language === 'sq' ? 'Histori suksesi nga investitorët tanë' : 'Success Stories from Our Investors'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {language === 'sq' 
                  ? 'Zbuloni si investitorët e tjerë kanë arritur suksesin duke përdorur platformen tonë'
                  : 'Discover how other investors achieved success using our platform'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-albania-red mb-2">€125K → €165K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">32% ROI in 18 months</div>
                  <p className="text-sm italic">
                    "Used PronaStats to identify undervalued properties in Vlorë. The market predictions were spot on!"
                  </p>
                  <div className="mt-4 text-xs text-gray-500">- Anonymous Investor, Vlorë</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-albania-red mb-2">8.5% Annual</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Rental Yield Portfolio</div>
                  <p className="text-sm italic">
                    "Built a 5-property portfolio using the neighborhood analytics. Consistent 8%+ returns."
                  </p>
                  <div className="mt-4 text-xs text-gray-500">- Real Estate Investor, Tirana</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-albania-red mb-2">€80K Saved</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Through market timing</div>
                  <p className="text-sm italic">
                    "The price alerts helped me buy during a market dip. Saved tens of thousands!"
                  </p>
                  <div className="mt-4 text-xs text-gray-500">- First-time Buyer, Durrës</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="reveal-element transition-all duration-700 opacity-0 translate-y-4" style={{ transitionDelay: '800ms' }}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
