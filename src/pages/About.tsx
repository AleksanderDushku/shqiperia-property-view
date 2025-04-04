
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/card';
import { dataSources } from '../data/propertyData';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('about.title')}</h1>
        <p className="text-gray-600">{t('about.subtitle')}</p>
      </div>
      
      {/* About the service */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4">{t('site.title')}</h2>
          <p className="mb-4 text-gray-700">{t('about.description')}</p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
            nisl eget aliquam ultricies, nunc nunc aliquet nunc, vitae aliquam nisl 
            nunc eu nisi. Sed vitae nisl eget nisl aliquam ultricies.
          </p>
        </CardContent>
      </Card>
      
      {/* Data Sources */}
      <h2 className="text-2xl font-semibold mb-4">{t('about.data.sources')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dataSources.map((source, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{source.name}</h3>
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-albania-red hover:underline"
              >
                {source.url}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Disclaimer */}
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">{t('about.disclaimer')}</h2>
          <p className="text-gray-700">{t('about.disclaimer.text')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
