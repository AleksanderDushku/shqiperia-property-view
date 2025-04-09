
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink, Users, BarChart, Info } from 'lucide-react';
import { dataSources } from '../data/propertyData';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Filter to show only the first 10 sources for the display
  const topSources = dataSources.slice(0, 10);
  
  // Team members data
  const teamMembers = [
    { name: "Aleksander Dushku", role: language === 'sq' ? "Analist i të Dhënave" : "Data Analyst" },
    { name: "Ali Albrahimi", role: language === 'sq' ? "Kërkues Tregu" : "Market Researcher" },
    { name: "Denis Abazi", role: language === 'sq' ? "Zhvillues Kryesor" : "Lead Developer" },
    { name: "Aurel Kotorri", role: language === 'sq' ? "Menaxher Projekti" : "Project Manager" }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{language === 'sq' ? 'Rreth Nesh' : 'About Us'}</h1>
        <p className="text-gray-600">{language === 'sq' ? 'Informacione mbi ekipin dhe projektin tonë' : 'Information about our team and project'}</p>
      </div>
      
      <Tabs defaultValue="mission" className="w-full">
        <TabsList className="mb-6 bg-albania-gray">
          <TabsTrigger value="mission" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Info className="w-4 h-4 mr-2" />
            {language === 'sq' ? 'Misioni Ynë' : 'Our Mission'}
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            {language === 'sq' ? 'Ekipi' : 'Team'}
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <BarChart className="w-4 h-4 mr-2" />
            {language === 'sq' ? 'Burimet e të Dhënave' : 'Data Sources'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'sq' ? 'Misioni Ynë' : 'Our Mission'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                {language === 'sq' 
                  ? 'Ne ofrojmë analizë transparente dhe të paanshme të tregut të pronave në Shqipëri, duke ndihmuar investitorët dhe blerësit të marrin vendime të informuara.' 
                  : 'We provide transparent and unbiased analysis of the Albanian property market, helping investors and buyers make informed decisions.'}
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{language === 'sq' ? 'Transparenca' : 'Transparency'}</h3>
                  <p className="text-gray-600">
                    {language === 'sq' 
                      ? 'Ne ofrojmë të dhëna të qarta dhe të paanshme për tregun e pronave në Shqipëri.' 
                      : 'We provide clear, unbiased data about the Albanian property market.'}
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{language === 'sq' ? 'Saktësia' : 'Accuracy'}</h3>
                  <p className="text-gray-600">
                    {language === 'sq' 
                      ? 'Të dhënat tona mblidhen nga burime të shumta dhe verifikohen për saktësi.' 
                      : 'Our data is collected from multiple sources and verified for accuracy.'}
                  </p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{language === 'sq' ? 'Aksesueshmëria' : 'Accessibility'}</h3>
                  <p className="text-gray-600">
                    {language === 'sq' 
                      ? 'Ne i bëjmë të dhënat komplekse të tregut të lehta për t\'u kuptuar dhe të aksesueshme për të gjithë.' 
                      : 'We make complex market data easy to understand and accessible to everyone.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{language === 'sq' ? 'Vlerat Tona' : 'Our Values'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-albania-red text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                  <p>{language === 'sq' 
                    ? 'Ne besojmë në demokratizimin e aksesit në të dhënat e tregut të pronave në Shqipëri.' 
                    : 'We believe in democratizing access to real estate market data in Albania.'}</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-albania-red text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                  <p>{language === 'sq' 
                    ? 'Ne jemi të përkushtuar për të ofruar informacion të saktë dhe të përditësuar.' 
                    : 'We are committed to providing accurate, up-to-date information from credible sources.'}</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-albania-red text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                  <p>{language === 'sq' 
                    ? 'Ne punojmë për të ndihmuar individët dhe bizneset të marrin vendime të informuara për prona.' 
                    : 'We work to help both individuals and businesses make informed real estate decisions.'}</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-albania-red text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                  <p>{language === 'sq' 
                    ? 'Ne respektojmë privatësinë dhe zbatojmë praktika etike të mbledhjes së të dhënave.' 
                    : 'We respect privacy and adhere to ethical data collection practices.'}</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'sq' ? 'Ekipi Ynë' : 'Our Team'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-32 h-32 bg-albania-gray rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{member.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex flex-col items-center justify-center">
                <h3 className="font-semibold text-xl mb-4">{language === 'sq' ? 'Na Kontaktoni' : 'Contact Us'}</h3>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                  {language === 'sq' 
                    ? 'Keni pyetje për të dhënat tona ose dëshironi të kontribuoni? Na kontaktoni.' 
                    : 'Have questions about our data or want to contribute? We\'d love to hear from you.'}
                </p>
                <Button className="bg-albania-red hover:bg-albania-red/90">kontakt@pronastats.al</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'sq' ? 'Burimet e të Dhënave' : 'Data Sources'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                {language === 'sq' 
                  ? 'Të dhënat tona mblidhen nga faqet e mëposhtme të pronave në Shqipëri, duke respektuar kushtet e përdorimit të secilës faqe.' 
                  : 'Our data is collected from the following property websites in Albania, respecting each site\'s terms of use.'}
              </p>
              
              <div className="overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'sq' ? 'Faqja Web' : 'Website'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'sq' ? 'Vizito' : 'Visit'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topSources.map((source, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {source.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-albania-red hover:text-albania-red/80 flex items-center justify-end"
                          >
                            <span className="mr-1">{language === 'sq' ? 'Vizito' : 'Visit'}</span>
                            <ExternalLink size={14} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-gray-500 border-t border-gray-200 pt-4">
                  {language === 'sq' ? 'Deklarim:' : 'Disclaimer:'} {language === 'sq' 
                    ? 'Të gjitha të dhënat e tregut janë vetëm për qëllime informative' 
                    : 'All market data is for informational purposes only'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default About;
