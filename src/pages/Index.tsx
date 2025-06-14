
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import EnhancedMarketHero from '../components/hero/EnhancedMarketHero';
import LiveMarketData from '../components/market/LiveMarketData';
import MarketOverviewCards from '../components/market/MarketOverviewCards';
import SeasonalMarketAnalysis from '../components/SeasonalMarketAnalysis';
import MarketNews from '../components/MarketNews';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Database, Shield, Zap, TrendingUp, Brain, Clock, Users, Award, Target, ChevronRight, Star, MapPin, Building2, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();

  const key_features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: t('AI-Powered Analytics'),
      description: t('Analiza të fuqishme me inteligjencë artificiale që identifikojnë trendet dhe mundësitë e investimit në kohë reale.'),
      color: 'from-purple-500 to-violet-600',
      highlight: t('Ekskluzive')
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: t('Automated Data Collection'),
      description: t('Sistemi ynë automatik mbledh dhe përpunon të dhënat e tregut dy herë në ditë nga burime të shumta.'),
      color: 'from-blue-500 to-indigo-600',
      highlight: t('24/7 Aktive')
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('Data Accuracy & Validation'),
      description: t('Të gjitha të dhënat validohen dhe kryqëzohen nga burime të shumta për saktësi maksimale.'),
      color: 'from-green-500 to-emerald-600',
      highlight: t('99.9% Saktësi')
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('Real-time Processing'),
      description: t('Llogaritjet e tregut dhe analizat e trendeve kryhen në kohë reale me çdo cikël përditësimi.'),
      color: 'from-yellow-500 to-orange-600',
      highlight: t('Menjëherë')
    }
  ];

  const stats = [
    { icon: <Users className="h-10 w-10" />, value: '15,000+', label: t('Active Listings'), color: 'from-blue-500 to-indigo-600' },
    { icon: <Database className="h-10 w-10" />, value: '5+', label: t('Data Sources'), color: 'from-green-500 to-emerald-600' },
    { icon: <Award className="h-10 w-10" />, value: '99.9%', label: t('Accuracy Rate'), color: 'from-purple-500 to-violet-600' },
    { icon: <Clock className="h-10 w-10" />, value: '2x', label: t('Daily Updates'), color: 'from-red-500 to-pink-600' }
  ];

  const quick_actions = [
    {
      title: t('Eksploro Tregun'),
      description: t('Shiko të dhënat e fundit të tregut dhe analizat e thella'),
      icon: <BarChart3 className="h-6 w-6" />,
      link: '/market',
      color: 'from-albania-red to-red-600',
      badge: t('Popullore')
    },
    {
      title: t('Kalkulatori i Investimit'),
      description: t('Llogarit fitimin dhe analizat financiare të investimeve'),
      icon: <TrendingUp className="h-6 w-6" />,
      link: '/calculator',
      color: 'from-green-500 to-emerald-600',
      badge: t('I Ri')
    },
    {
      title: t('Analiza e Tregut'),
      description: t('Raporte të detajuara dhe insights profesionale'),
      icon: <Brain className="h-6 w-6" />,
      link: '/analysis',
      color: 'from-purple-500 to-violet-600',
      badge: t('Premium')
    },
    {
      title: t('Lagjet'),
      description: t('Eksploroni çmimet dhe trendet sipas lagjeve'),
      icon: <MapPin className="h-6 w-6" />,
      link: '/neighborhoods',
      color: 'from-blue-500 to-indigo-600',
      badge: t('Detaje')
    }
  ];

  return (
    <div className={`min-h-screen ${dark_mode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Enhanced Hero Section */}
      <EnhancedMarketHero />
      
      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Animated Stats Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-albania-red/5 via-red-600/5 to-albania-red/5 rounded-3xl transform -skew-y-1"></div>
          <div className="relative">
            <div className="text-center mb-16">
              <Badge className="bg-albania-red/10 text-albania-red border-albania-red/20 px-6 py-3 text-lg font-medium mb-6">
                <Star className="h-5 w-5 mr-2" />
                {t('Statistikat e Fundit')}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-albania-red via-red-600 to-albania-red bg-clip-text text-transparent">
                {t('Të Dhënat që Flasin')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('Platforma më e avancuar për analizën e tregut të pasurive të paluajtshme në Shqipëri')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="group relative overflow-hidden border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}></div>
                  <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
                  <CardContent className="p-8 text-center relative">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {stat.icon}
                    </div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium text-lg group-hover:text-albania-red transition-colors duration-300">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-6 py-3 text-lg font-medium mb-6">
              <Target className="h-5 w-5 mr-2" />
              {t('Veprime të Shpejta')}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('Fillo Këtu')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('Zgjidh veprimin që të intereson më shumë dhe zbulo mundësitë e tregut')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quick_actions.map((action, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}></div>
                <div className={`h-2 bg-gradient-to-r ${action.color}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {action.icon}
                    </div>
                    <Badge className="bg-white/90 text-gray-700 border-gray-200 font-medium">
                      {action.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-albania-red transition-colors duration-300">
                    {action.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pb-8">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {action.description}
                  </p>
                  <Button asChild className={`w-full bg-gradient-to-r ${action.color} hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                    <Link to={action.link} className="flex items-center justify-center">
                      {t('Shiko Tani')}
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Live Market Data Section */}
        <section className="py-16">
          <LiveMarketData />
        </section>

        {/* How Our AI System Works - Enhanced */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/10 dark:via-indigo-900/10 dark:to-blue-900/10 rounded-3xl transform rotate-1"></div>
          <div className="relative">
            <div className="text-center mb-16">
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-6 py-3 text-lg font-medium mb-6">
                <Brain className="h-5 w-5 mr-2" />
                {t('Teknologjia Jonë')}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                {t('Si Funksionon Sistemi Ynë AI')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('Automatizim i avancuar dhe analizë AI që ekzekutohet dy herë në ditë në orën 6:00 dhe 18:00')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {key_features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-0 overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  <div className={`h-3 bg-gradient-to-r ${feature.color}`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="pb-6 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                        {feature.icon}
                      </div>
                      <Badge className="bg-white/90 text-gray-700 border-gray-200 font-medium">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-albania-red transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Market Analysis Tools Section */}
        <section className="py-16">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 border-green-200 px-6 py-3 text-lg font-medium mb-6">
              <Building2 className="h-5 w-5 mr-2" />
              {t('Mjetet Profesionale')}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {t('Mjetet e Analizës së Tregut')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('Mjete profesionale dhe insights për profesionistët e pasurive të paluajtshme, investitorët dhe analistët e tregut.')}
            </p>
          </div>
          <MarketOverviewCards />
        </section>

        {/* Seasonal Analysis */}
        <section className="py-16">
          <SeasonalMarketAnalysis />
        </section>

        {/* Market News & Insights */}
        <section className="py-16">
          <MarketNews />
        </section>

        {/* Enhanced Technical Implementation Details */}
        <Card className={`${dark_mode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200'} overflow-hidden shadow-2xl`}>
          <div className="h-3 bg-gradient-to-r from-albania-red via-red-600 to-albania-red"></div>
          <CardHeader className="pb-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-3xl mb-4">
                <Database className="h-8 w-8 mr-4 text-albania-red" />
                {t('Implementimi Teknik')}
              </CardTitle>
              <Badge className="bg-albania-red/10 text-albania-red border-albania-red/20 px-4 py-2">
                {t('Automatik')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="font-bold text-2xl text-albania-red flex items-center">
                  <Clock className="h-6 w-6 mr-3" />
                  {t('Orari i Përditësimeve')}
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-green-500">
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-lg">{t('Përditësimi i Mëngjesit')}:</span>
                    <span className="font-bold text-albania-red text-xl">6:00 AM (GMT+1)</span>
                  </div>
                  <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-blue-500">
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-lg">{t('Përditësimi i Mbrëmjes')}:</span>
                    <span className="font-bold text-albania-red text-xl">6:00 PM (GMT+1)</span>
                  </div>
                  <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-purple-500">
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-lg">{t('Koha e Përpunimit')}:</span>
                    <span className="font-bold text-green-600 text-xl">~5-10 minuta</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="font-bold text-2xl text-albania-red flex items-center">
                  <Database className="h-6 w-6 mr-3" />
                  {t('Burimet e të Dhënave')}
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-indigo-500">
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-lg">{t('Burimet Kryesore')}:</span>
                    <span className="font-bold text-blue-600 text-xl">5+ platforma</span>
                  </div>
                  <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-emerald-500">
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-lg">{t('Zonat e Mbuluara')}:</span>
                    <span className="font-bold text-blue-600 text-xl">12+ rajone</span>
                  </div>
                  <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-orange-500">
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-lg">{t('Pikat e të Dhënave')}:</span>
                    <span className="font-bold text-blue-600 text-xl">15,000+ shpallje</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-r from-albania-red/10 via-red-600/10 to-albania-red/10 rounded-3xl border-l-8 border-l-albania-red shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-albania-red/20 rounded-full">
                  <Brain className="h-8 w-8 text-albania-red" />
                </div>
                <div>
                  <h5 className="font-bold text-albania-red text-xl mb-2">{t('Procesi Automatik AI')}:</h5>
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {t('Sistemi ynë përdor PostgreSQL cron jobs për të aktivizuar automatikisht mbledhjen e të dhënave dhe analizën AI. I gjithë pipeline-i funksionon pa ndërhyrje manuale, duke siguruar përditësime konsistente dhe të besueshme të të dhënave të tregut me njohje inteligjente të modeleve.')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
