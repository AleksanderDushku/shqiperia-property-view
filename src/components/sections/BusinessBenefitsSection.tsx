
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { TrendingUp, Calculator, MapPin, BarChart3, ArrowRight, Zap, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const BusinessBenefitsSection: React.FC = () => {
  const { t, language } = useLanguage();

  const primary_benefits = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: language === 'sq' ? 'Gjenerimi Automatik i Klientëve' : 'Automated Lead Generation',
      description: language === 'sq' ? 'Tërhiqni blerës dhe shitës të kualifikuar automatikisht me analizat tona të bazuara në AI' : 'Automatically attract qualified buyers and sellers with our AI-powered market insights',
      features: [
        language === 'sq' ? 'AI Lead Scoring' : 'AI Lead Scoring',
        language === 'sq' ? 'Automatizimi i Email Marketing' : 'Email Marketing Automation',
        language === 'sq' ? 'Analiza e Sjelljes së Klientit' : 'Customer Behavior Analytics'
      ],
      link: '/market',
      color: 'from-green-500 via-emerald-500 to-teal-600',
      badge: language === 'sq' ? 'Më i Popullarizuari' : 'Most Popular'
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: language === 'sq' ? 'Vegla Profesionale për Klientët' : 'Professional Client Tools',
      description: language === 'sq' ? 'Kalkulatori i kredisë hipotekare, analizës së investimeve dhe raporte të detajuara për klientët tuaj' : 'Mortgage calculator, investment analysis and detailed reports for your clients',
      features: [
        language === 'sq' ? 'Kalkulatori i Kredisë' : 'Mortgage Calculator',
        language === 'sq' ? 'Analiza e ROI' : 'ROI Analysis',
        language === 'sq' ? 'Raporte Profesionale' : 'Professional Reports'
      ],
      link: '/calculator',
      color: 'from-blue-500 via-indigo-500 to-purple-600',
      badge: language === 'sq' ? 'Më i Përdoruri' : 'Most Used'
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: language === 'sq' ? 'Inteligjenca e Tregut në Kohë Reale' : 'Real-Time Market Intelligence',
      description: language === 'sq' ? 'Informacione për lagjet, inteligjenca e çmimeve dhe parashikime të tregut të bazuara në AI' : 'Neighborhood insights, pricing intelligence and AI-powered market predictions',
      features: [
        language === 'sq' ? 'Analiza e Lagjeve' : 'Neighborhood Analysis',
        language === 'sq' ? 'Parashikimi i Çmimeve' : 'Price Predictions',
        language === 'sq' ? 'Trendet e Tregut' : 'Market Trends'
      ],
      link: '/neighborhoods',
      color: 'from-purple-500 via-violet-500 to-indigo-600',
      badge: language === 'sq' ? 'AI i Fuqishëm' : 'AI Powered'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === 'sq' ? 'Dashboards dhe Raporte' : 'Dashboards & Reports',
      description: language === 'sq' ? 'Raporte të analizës së tregut, dashboards interaktive dhe prezantime për klientët' : 'Market analysis reports, interactive dashboards and client presentations',
      features: [
        language === 'sq' ? 'Dashboard Interaktiv' : 'Interactive Dashboard',
        language === 'sq' ? 'Raporte të Automatizuara' : 'Automated Reports',
        language === 'sq' ? 'Prezantime për Klientët' : 'Client Presentations'
      ],
      link: '/analysis',
      color: 'from-amber-500 via-orange-500 to-red-600',
      badge: language === 'sq' ? 'Profesional' : 'Professional'
    }
  ];

  const secondary_benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: language === 'sq' ? 'Kurseni Kohë' : 'Save Time',
      description: language === 'sq' ? 'Automatizoni 80% të punës suaj të përditshme' : 'Automate 80% of your daily work'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: language === 'sq' ? 'Rritni Klientët' : 'Grow Clients',
      description: language === 'sq' ? 'Rritni numrin e klientëve me 300%' : 'Increase your client base by 300%'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: language === 'sq' ? 'Teknologji AI' : 'AI Technology',
      description: language === 'sq' ? 'Përdorni teknologjinë më të re AI' : 'Use the latest AI technology'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-albania-red to-red-600 text-white px-6 py-2 mb-6 text-lg font-semibold">
            {language === 'sq' ? 'Përfitimet për Biznesin' : 'Business Benefits'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-albania-red to-red-600 bg-clip-text text-transparent">
            {language === 'sq' ? 'Transformoni Biznesin tuaj të Pronave' : 'Transform Your Real Estate Business'}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {language === 'sq' 
              ? 'Zgjidhje të kompletuar për agjencitë moderne të pronave që duan të rriten shpejt dhe të shërbejnë më mirë klientët e tyre'
              : 'Complete solutions for modern real estate agencies that want to grow fast and serve their clients better'
            }
          </p>
        </div>
        
        {/* Primary Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {primary_benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${benefit.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {benefit.icon}
                  </div>
                  <Badge variant="outline" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
                    {benefit.badge}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-albania-red transition-colors duration-300">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {benefit.description}
                </p>
                
                {/* Feature List */}
                <div className="space-y-3 mb-6">
                  {benefit.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.color}`}></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className={`w-full bg-gradient-to-r ${benefit.color} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                  <Link to={benefit.link}>
                    {language === 'sq' ? 'Filloni Tani' : 'Get Started'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Secondary Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondary_benefits.map((benefit, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="p-4 bg-gradient-to-br from-albania-red to-red-600 text-white rounded-full w-fit mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessBenefitsSection;
