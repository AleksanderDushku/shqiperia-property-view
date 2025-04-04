
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { dataSources } from '../data/propertyData';
import { Info, Users, Database, Shield, ExternalLink, Globe, MessageSquare } from 'lucide-react';
import WebCrawlerStatus from '../components/WebCrawlerStatus';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  const lastCrawl = new Date();
  lastCrawl.setDate(lastCrawl.getDate() - 2);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-12 rounded-2xl overflow-hidden bg-albania-red/10 p-8">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4 text-albania-red">{t('about.title')}</h1>
          <p className="text-xl text-gray-700 max-w-3xl">{t('about.subtitle')}</p>
        </div>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="mission" className="mb-12">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
          <TabsTrigger value="mission" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Info className="w-4 h-4 mr-2" />
            {t('about.mission')}
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            {t('about.team')}
          </TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:bg-albania-red data-[state=active]:text-white">
            <Database className="w-4 h-4 mr-2" />
            {t('about.data.sources')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="mission" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-4">{t('about.our.mission')}</h2>
                  <p className="mb-4 text-gray-700">
                    {t('about.description')}
                  </p>
                  <p className="text-gray-700">
                    PronaStats syncs data from Albania's top property websites, providing accurate, up-to-date market insights. 
                    Our platform helps buyers, sellers, and investors make informed decisions with comprehensive pricing data and trends.
                  </p>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-albania-gray p-6 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center text-albania-red">
                      <Shield className="mr-2 h-5 w-5" />
                      {t('about.our.values')}
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2 text-albania-red">•</span>
                        <span>Accuracy in data collection and analysis</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-albania-red">•</span>
                        <span>Transparency in methodology and results</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-albania-red">•</span>
                        <span>Accessibility to empower all market participants</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-albania-red">•</span>
                        <span>Continuous improvement through user feedback</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6">{t('about.our.team')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((member) => (
                  <div key={member} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-48 bg-albania-gray/30"></div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">Team Member {member}</h3>
                      <p className="text-sm text-albania-red mb-3">Role & Position</p>
                      <p className="text-sm text-gray-600">
                        Expert in Albanian real estate markets with extensive experience in data analysis and property valuation.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="mt-6">
          <div className="mb-6">
            <WebCrawlerStatus 
              lastUpdated={lastCrawl.toISOString()} 
              progress={78} 
              totalSources={dataSources.length} 
              completedSources={Math.floor(dataSources.length * 0.78)} 
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-albania-red" />
                {t('about.data.sources')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-gray-700">
                {t('crawler.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dataSources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                  >
                    <div className="p-4 flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-albania-red transition-colors">
                          {source.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{source.count} {t('crawler.listing_count')}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-albania-red transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Contact Section */}
      <div className="mb-12">
        <Card className="bg-albania-gray/10 border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4">{t('about.contact.us')}</h2>
                <p className="mb-6 text-gray-700">
                  Have questions or feedback about our services? We'd love to hear from you.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-albania-red mr-3" />
                    <p>contact@pronastats.al</p>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-albania-red mr-3" />
                    <p>www.pronastats.al</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3">
                <Card className="bg-albania-red text-white">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Stay Updated</h3>
                    <p className="text-sm mb-4">
                      Subscribe to receive the latest market reports and property trends in your inbox.
                    </p>
                    <div className="mt-4 text-center">
                      <button className="bg-white text-albania-red px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                        Subscribe Now
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Disclaimer */}
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-albania-red" />
            {t('about.disclaimer')}
          </h2>
          <p className="text-gray-700">{t('about.disclaimer.text')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
