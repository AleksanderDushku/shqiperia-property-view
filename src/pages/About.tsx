
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink, Users, BarChart, Info } from 'lucide-react';
import { dataSources } from '../data/propertyData';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  // Filter to show only the first 10 sources for the display
  const topSources = dataSources.slice(0, 10);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('about.title')}</h1>
        <p className="text-gray-600">{t('about.subtitle')}</p>
      </div>
      
      <Tabs defaultValue="mission" className="w-full">
        <TabsList className="mb-6 bg-albania-gray">
          <TabsTrigger value="mission" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Info className="w-4 h-4 mr-2" />
            {t('about.mission')}
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            {t('about.team')}
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <BarChart className="w-4 h-4 mr-2" />
            {t('about.data.sources')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('about.our.mission')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                {t('about.description')}
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Transparency</h3>
                  <p className="text-gray-600">We provide clear, unbiased data about the Albanian property market to help buyers and sellers make informed decisions.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Accuracy</h3>
                  <p className="text-gray-600">Our data is collected from multiple sources and verified to ensure it reflects the true state of the market.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                  <p className="text-gray-600">We make complex market data easy to understand and accessible to everyone, regardless of their real estate expertise.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('about.our.values')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-albania-red text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                  <p>We believe in democratizing access to real estate market data in Albania.</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-albania-red text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                  <p>We are committed to providing accurate, up-to-date information from credible sources.</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-albania-red text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                  <p>We work to help both individuals and businesses make informed real estate decisions.</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-albania-red text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                  <p>We respect privacy and adhere to ethical data collection practices.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('about.our.team')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-32 h-32 bg-albania-gray rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-lg">Arben Shehu</h3>
                  <p className="text-gray-600">Data Analyst</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-albania-gray rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Team Member" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-lg">Elira Hoxha</h3>
                  <p className="text-gray-600">Market Researcher</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-albania-gray rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Team Member" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-lg">Gent Salihu</h3>
                  <p className="text-gray-600">Lead Developer</p>
                </div>
              </div>
              
              <div className="mt-12 flex flex-col items-center justify-center">
                <h3 className="font-semibold text-xl mb-4">{t('about.contact.us')}</h3>
                <p className="text-gray-600 mb-6 text-center max-w-md">Have questions about our data or want to contribute? We'd love to hear from you.</p>
                <Button className="bg-albania-red hover:bg-albania-red/90">kontakt@pronastats.al</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('about.data.sources')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{t('crawler.description')}</p>
              
              <div className="overflow-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('crawler.website')}
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('crawler.visit')}
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
                            <span className="mr-1">{t('crawler.visit')}</span>
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
                  {t('about.disclaimer')}: {t('about.disclaimer.text')}
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
