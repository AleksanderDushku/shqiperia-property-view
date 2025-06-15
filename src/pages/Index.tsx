
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import LiveMarketData from '../components/market/LiveMarketData';
import CustomerHeroSection from '../components/hero/CustomerHeroSection';
import BusinessBenefitsSection from '../components/sections/BusinessBenefitsSection';
import SocialProofSection from '../components/sections/SocialProofSection';
import TechnologyShowcase from '../components/sections/TechnologyShowcase';
import AlbanianCitiesMap from '../components/map/AlbanianCitiesMap';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const { dark_mode } = useDarkMode();

  return (
    <div className={`min-h-screen ${dark_mode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Enhanced Hero Section */}
      <CustomerHeroSection />

      {/* Business Benefits Section */}
      <BusinessBenefitsSection />

      {/* Albanian Cities Interactive Map */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-albania-red to-red-600 text-white px-6 py-2 mb-6 text-lg font-semibold">
              <MapPin className="h-5 w-5 mr-2" />
              {language === 'sq' ? 'Harta Interaktive' : 'Interactive Map'}
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent">
              {language === 'sq' ? 'Qytetet e Shqipërisë' : 'Albanian Cities'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'sq' 
                ? 'Eksploroni çmimet e pronave dhe statistikat për çdo qytet të Shqipërisë'
                : 'Explore property prices and statistics for every Albanian city'
              }
            </p>
          </div>
          <AlbanianCitiesMap />
        </div>
      </section>

      {/* Live Market Data Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 mb-6 text-lg font-semibold">
              {language === 'sq' ? 'Të Dhëna Live' : 'Live Data'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {language === 'sq' ? 'Të Dhënat e Tregut në Kohë Reale' : 'Real-Time Market Data'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'sq' 
                ? 'Shikoni të dhënat e fundit të tregut të përditësuara automatikisht çdo 15 minuta'
                : 'View the latest market data updated automatically every 15 minutes'
              }
            </p>
          </div>
          <LiveMarketData />
          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600">
              <Link to="/market">
                {language === 'sq' ? 'Shiko të Gjitha të Dhënat' : 'View All Data'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProofSection />

      {/* Technology Showcase */}
      <TechnologyShowcase />

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-albania-red to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'sq' ? 'Gati të Filloni?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-95">
            {language === 'sq'
              ? 'Bashkohuni me mijëra profesionistë që po transformojnë biznesin e tyre të pronave me PronaStats'
              : 'Join thousands of professionals transforming their real estate business with PronaStats'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button asChild size="lg" className="bg-white text-albania-red hover:bg-gray-100 font-bold px-10 py-4">
              <Link to="/market">
                {language === 'sq' ? 'Eksploro Tregut' : 'Explore Market'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-10 py-4">
              <Link to="/analysis">
                {language === 'sq' ? 'Shiko Analizat' : 'View Analysis'}
              </Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>hello@pronastats.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+355 69 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{language === 'sq' ? 'Analizë Falas' : 'Free Analysis'}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
