
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Brain, Zap, BarChart3, Shield, Smartphone, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

const TechnologyShowcase: React.FC = () => {
  const { language } = useLanguage();
  const { dark_mode } = useDarkMode();

  const technologies = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: language === 'sq' ? 'Inteligjenca Artificiale' : 'Artificial Intelligence',
      description: language === 'sq' ? 'Algoritme të avancuara për parashikimin e çmimeve dhe analizën e tregut' : 'Advanced algorithms for price prediction and market analysis',
      features: [
        language === 'sq' ? 'Machine Learning' : 'Machine Learning',
        language === 'sq' ? 'Parashikimi i Çmimeve' : 'Price Prediction',
        language === 'sq' ? 'Analiza e Trendeve' : 'Trend Analysis'
      ]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: language === 'sq' ? 'Automatizimi i Proceseve' : 'Process Automation',
      description: language === 'sq' ? 'Automatizoni 80% të punës tuaj të përditshme dhe fokusohuni te klientët' : 'Automate 80% of your daily work and focus on clients',
      features: [
        language === 'sq' ? 'Email Marketing' : 'Email Marketing',
        language === 'sq' ? 'Gjenerimi i Raporteve' : 'Report Generation',
        language === 'sq' ? 'Follow-up i Klientëve' : 'Client Follow-up'
      ]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === 'sq' ? 'Analiza në Kohë Reale' : 'Real-Time Analytics',
      description: language === 'sq' ? 'Të dhëna të freskëta çdo 15 minuta nga burime të shumta' : 'Fresh data every 15 minutes from multiple sources',
      features: [
        language === 'sq' ? 'Live Data Feeds' : 'Live Data Feeds',
        language === 'sq' ? 'Dashboard Interaktiv' : 'Interactive Dashboard',
        language === 'sq' ? 'Alertet e Tregut' : 'Market Alerts'
      ]
    }
  ];

  const technical_features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: language === 'sq' ? 'Siguri e Lartë' : 'Enterprise Security',
      description: language === 'sq' ? 'SSL, enkriptim dhe backup automatik' : 'SSL, encryption and automatic backups'
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: language === 'sq' ? 'Mobile Friendly' : 'Mobile Optimized',
      description: language === 'sq' ? 'Funksionon në të gjitha pajisjet' : 'Works on all devices'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: language === 'sq' ? 'API Integration' : 'API Integration',
      description: language === 'sq' ? 'Integrimi me sistemet ekzistuese' : 'Integration with existing systems'
    }
  ];

  return (
    <section className={`py-20 ${dark_mode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-900 to-gray-800'} text-white`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-2 mb-6 text-lg font-semibold">
            {language === 'sq' ? 'Teknologji e Avancuar' : 'Advanced Technology'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            {language === 'sq' ? 'Fuqizuar nga AI dhe Automatizimi' : 'Powered by AI & Automation'}
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {language === 'sq'
              ? 'Përdorim teknologjitë më të fundit për të ofruar zgjidhje që janë të shpejta, të sakta dhe të lehta për tu përdorur'
              : 'We use cutting-edge technologies to deliver solutions that are fast, accurate, and easy to use'
            }
          </p>
        </div>

        {/* Main Technology Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl w-fit mb-6">
                  {tech.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{tech.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{tech.description}</p>
                
                <div className="space-y-3">
                  {tech.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-violet-400"></div>
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {technical_features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg text-white">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Stats */}
        <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl p-8 text-center border border-purple-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-sm text-gray-300">{language === 'sq' ? 'Monitorim' : 'Monitoring'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">15min</div>
              <div className="text-sm text-gray-300">{language === 'sq' ? 'Përditësime' : 'Updates'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-sm text-gray-300">{language === 'sq' ? 'Uptime' : 'Uptime'}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">AI</div>
              <div className="text-sm text-gray-300">{language === 'sq' ? 'Powered' : 'Powered'}</div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">
              <Link to="/saas">
                {language === 'sq' ? 'Shiko Teknologjinë në Veprim' : 'See Technology in Action'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
