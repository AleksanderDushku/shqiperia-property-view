
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { dataSources } from '../data/propertyData';
import { ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-albania-black text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('site.title')}</h3>
            <p className="text-gray-300 text-sm">
              © {currentYear} PronaStats - {t('about.disclaimer.text')}
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{t('about.data.sources')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2">
              {dataSources.map((source, index) => (
                <a 
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  {source.name}
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
