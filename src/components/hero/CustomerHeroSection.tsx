
import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, BarChart3, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

const CustomerHeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { dark_mode } = useDarkMode();

  const quick_stats = [
    { 
      value: '15,000+', 
      label: language === 'sq' ? 'Prona të Gjurmuara' : 'Properties Tracked', 
      icon: <BarChart3 className="h-5 w-5" /> 
    },
    { 
      value: '500+', 
      label: language === 'sq' ? 'Klientë të Kënaqur' : 'Happy Clients', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      value: '12+', 
      label: language === 'sq' ? 'Qytete të Mbuluara' : 'Cities Covered', 
      icon: <TrendingUp className="h-5 w-5" /> 
    },
    { 
      value: '99.9%', 
      label: language === 'sq' ? 'Saktësia e të Dhënave' : 'Data Accuracy', 
      icon: <Zap className="h-5 w-5" /> 
    }
  ];

  return (
    <section className={`relative overflow-hidden ${dark_mode ? 'bg-gradient-to-br from-gray-900 via-albania-red/20 to-gray-800' : 'bg-gradient-to-br from-albania-red via-red-600 to-red-800'} text-white py-20 lg:py-32`}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Trust Badge */}
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-3 mb-8 text-base font-semibold">
            <Zap className="h-5 w-5 mr-2 animate-pulse" />
            {language === 'sq' ? 'Platforma #1 e Analizës së Pronave në Shqipëri' : '#1 Real Estate Analytics Platform in Albania'}
          </Badge>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block">
              {language === 'sq' ? 'Zbuloni' : 'Discover'}
            </span>
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              {language === 'sq' ? 'Tregun e Pronave' : 'Real Estate Market'}
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-normal mt-4 opacity-95">
              {language === 'sq' ? 'në Shqipëri' : 'in Albania'}
            </span>
          </h1>
          
          {/* Value Proposition */}
          <p className="text-xl md:text-2xl opacity-95 max-w-4xl mx-auto mb-12 leading-relaxed">
            {language === 'sq' 
              ? 'Analizoni çmimet e pronave, trendet e tregut dhe mundësitë e investimit në të gjithë Shqipërinë me të dhëna të përditësuara në kohë reale.'
              : 'Analyze property prices, market trends and investment opportunities across Albania with real-time updated data.'
            }
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button asChild size="lg" className="bg-white text-albania-red hover:bg-gray-100 font-bold px-10 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Link to="/market">
                {language === 'sq' ? 'Eksploro Tregut' : 'Explore Market'}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold px-10 py-4 text-lg backdrop-blur-sm">
              <Link to="/analysis">
                {language === 'sq' ? 'Shiko Analizat' : 'View Analysis'}
              </Link>
            </Button>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {quick_stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-white/20">
                <div className="flex justify-center mb-3 text-yellow-300">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm opacity-90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerHeroSection;
