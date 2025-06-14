
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink, Users, BarChart, Info, Brain, Zap, Target, Award, Heart, Shield } from 'lucide-react';
import { dataSources } from '../data/propertyData';
import { Badge } from '../components/ui/badge';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Filter to show only the first 10 sources for the display
  const topSources = dataSources.slice(0, 10);
  
  // Team members data
  const teamMembers = [
    { 
      name: "Aleksander Dushku", 
      role: language === 'sq' ? "Analist i të Dhënave" : "Data Analyst",
      specialty: language === 'sq' ? "AI & Machine Learning" : "AI & Machine Learning",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      name: "Ali Albrahimi", 
      role: language === 'sq' ? "Kërkues Tregu" : "Market Researcher",
      specialty: language === 'sq' ? "Analiza e Tregut" : "Market Analysis",
      color: "from-green-500 to-emerald-600"
    },
    { 
      name: "Denis Abazi", 
      role: language === 'sq' ? "Zhvillues Kryesor" : "Lead Developer",
      specialty: language === 'sq' ? "Full-Stack Development" : "Full-Stack Development",
      color: "from-purple-500 to-violet-600"
    },
    { 
      name: "Aurel Kotorri", 
      role: language === 'sq' ? "Menaxher Projekti" : "Project Manager",
      specialty: language === 'sq' ? "Strategji & Planifikim" : "Strategy & Planning",
      color: "from-orange-500 to-red-600"
    }
  ];

  // Values data
  const values = [
    {
      icon: Target,
      title: language === 'sq' ? 'Transparenca' : 'Transparency',
      description: language === 'sq' 
        ? 'Ne ofrojmë të dhëna të qarta dhe të paanshme për tregun e pronave në Shqipëri.' 
        : 'We provide clear, unbiased data about the Albanian property market.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Award,
      title: language === 'sq' ? 'Saktësia' : 'Accuracy',
      description: language === 'sq' 
        ? 'Të dhënat tona mblidhen nga burime të shumta dhe verifikohen për saktësi.' 
        : 'Our data is collected from multiple sources and verified for accuracy.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Heart,
      title: language === 'sq' ? 'Aksesueshmëria' : 'Accessibility',
      description: language === 'sq' 
        ? 'Ne i bëjmë të dhënat komplekse të tregut të lehta për t\'u kuptuar dhe të aksesueshme për të gjithë.' 
        : 'We make complex market data easy to understand and accessible to everyone.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Shield,
      title: language === 'sq' ? 'Siguria' : 'Security',
      description: language === 'sq' 
        ? 'Ne respektojmë privatësinë dhe zbatojmë praktika etike të mbledhjes së të dhënave.' 
        : 'We respect privacy and adhere to ethical data collection practices.',
      color: 'from-red-500 to-pink-600'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-albania-red/5 py-8">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-albania-red to-red-600 text-white px-6 py-3 rounded-full shadow-lg mb-6">
            <Brain className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">{language === 'sq' ? 'Ekipi Ynë' : 'Our Team'} - AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-albania-red via-red-600 to-red-800 bg-clip-text text-transparent mb-4">
            {language === 'sq' ? 'Rreth Nesh' : 'About Us'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'sq' ? 'Informacione mbi ekipin dhe projektin tonë inovativ' : 'Information about our innovative team and project'}
          </p>
        </div>
        
        <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
          <Tabs defaultValue="mission" className="w-full">
            <div className="bg-gradient-to-r from-gray-50 to-white p-2">
              <TabsList className="mb-6 bg-transparent h-auto p-1">
                <TabsTrigger 
                  value="mission" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-albania-red data-[state=active]:to-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <Info className="w-4 h-4" />
                  {language === 'sq' ? 'Misioni Ynë' : 'Our Mission'}
                </TabsTrigger>
                <TabsTrigger 
                  value="team" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <Users className="w-4 h-4" />
                  {language === 'sq' ? 'Ekipi' : 'Team'}
                </TabsTrigger>
                <TabsTrigger 
                  value="data" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-xl transition-all duration-300 data-[state=active]:shadow-lg"
                >
                  <BarChart className="w-4 h-4" />
                  {language === 'sq' ? 'Burimet e të Dhënave' : 'Data Sources'}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="mission" className="p-8 space-y-8">
              {/* Mission Statement */}
              <div className="bg-gradient-to-r from-albania-red/5 to-red-100/50 rounded-2xl p-8 border border-albania-red/20">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="h-8 w-8 text-albania-red" />
                  <h2 className="text-3xl font-bold text-albania-red">{language === 'sq' ? 'Misioni Ynë' : 'Our Mission'}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {language === 'sq' 
                    ? 'Ne ofrojmë analizë transparente dhe të paanshme të tregut të pronave në Shqipëri, duke ndihmuar investitorët dhe blerësit të marrin vendime të informuara me teknologji AI të avancuar.' 
                    : 'We provide transparent and unbiased analysis of the Albanian property market, helping investors and buyers make informed decisions with advanced AI technology.'}
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-full bg-gradient-to-br ${value.color} shadow-lg`}>
                          <value.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mission Points */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <Target className="h-6 w-6" />
                    {language === 'sq' ? 'Objektivat Tona' : 'Our Objectives'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      language === 'sq' 
                        ? 'Demokratizimi i aksesit në të dhënat e tregut të pronave në Shqipëri' 
                        : 'Democratizing access to real estate market data in Albania',
                      language === 'sq' 
                        ? 'Ofrimi i informacionit të saktë dhe të përditësuar nga burime të besueshme' 
                        : 'Providing accurate, up-to-date information from credible sources',
                      language === 'sq' 
                        ? 'Ndihmimi i individëve dhe bizneseve për vendime të informuara' 
                        : 'Helping individuals and businesses make informed real estate decisions',
                      language === 'sq' 
                        ? 'Zbatimi i praktikave etike dhe respektimi i privatësisë' 
                        : 'Adhering to ethical practices and respecting privacy'
                    ].map((objective, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 rounded-full w-8 h-8 flex items-center justify-center p-0 font-bold">
                          {index + 1}
                        </Badge>
                        <p className="text-gray-700">{objective}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-blue-700">{language === 'sq' ? 'Ekipi Ynë' : 'Our Team'}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {language === 'sq' 
                    ? 'Takoni ekipin tonë të talentuar që punon për të sjellë inovacion në tregun e pronave shqiptare' 
                    : 'Meet our talented team working to bring innovation to the Albanian real estate market'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                    <CardContent className="p-6 text-center">
                      <div className={`w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center bg-gradient-to-br ${member.color} shadow-lg`}>
                        <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{member.role}</p>
                      <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs">
                        {member.specialty}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Contact Section */}
              <Card className="bg-gradient-to-br from-albania-red/5 to-red-100/50 border border-albania-red/20">
                <CardContent className="p-8 text-center">
                  <div className="p-4 bg-gradient-to-br from-albania-red to-red-600 rounded-full w-fit mx-auto mb-6 shadow-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-2xl text-albania-red mb-4">{language === 'sq' ? 'Na Kontaktoni' : 'Contact Us'}</h3>
                  <p className="text-gray-700 mb-6 max-w-md mx-auto leading-relaxed">
                    {language === 'sq' 
                      ? 'Keni pyetje për të dhënat tona ose dëshironi të kontribuoni? Na kontaktoni.' 
                      : 'Have questions about our data or want to contribute? We\'d love to hear from you.'}
                  </p>
                  <Button className="bg-gradient-to-r from-albania-red to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl">
                    kontakt@pronastats.al
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="data" className="p-8 space-y-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart className="h-8 w-8 text-green-600" />
                  <h2 className="text-3xl font-bold text-green-700">{language === 'sq' ? 'Burimet e të Dhënave' : 'Data Sources'}</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {language === 'sq' 
                    ? 'Të dhënat tona mblidhen nga faqet e mëposhtme të pronave në Shqipëri, duke respektuar kushtet e përdorimit të secilës faqe.' 
                    : 'Our data is collected from the following property websites in Albania, respecting each site\'s terms of use.'}
                </p>
              </div>
              
              <Card className="shadow-xl border-0">
                <CardContent className="p-0">
                  <div className="overflow-auto">
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                            {language === 'sq' ? 'Faqja Web' : 'Website'}
                          </th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                            {language === 'sq' ? 'Vizito' : 'Visit'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {topSources.map((source, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {source.name}
                            </td>
                            <td className="px-6 py-4 text-right text-sm">
                              <a 
                                href={source.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-1 text-albania-red hover:text-albania-red/80 transition-colors"
                              >
                                <span>{language === 'sq' ? 'Vizito' : 'Visit'}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      <strong>{language === 'sq' ? 'Deklarim:' : 'Disclaimer:'}</strong> {language === 'sq' 
                        ? 'Të gjitha të dhënat e tregut janë vetëm për qëllime informative' 
                        : 'All market data is for informational purposes only'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default About;
