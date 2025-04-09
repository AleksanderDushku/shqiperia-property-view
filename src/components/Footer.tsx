
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';
import { dataSources } from '../data/propertyData';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-albania-black text-white py-8 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-albania-red rounded-md flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="font-semibold text-xl text-white">PronaStats</span>
            </div>
            <p className="text-gray-300 text-sm">
              © {currentYear} PronaStats - {language === 'sq' 
                ? 'Të gjitha të dhënat e tregut janë vetëm për qëllime informative' 
                : 'All market data is for informational purposes only'}
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{language === 'sq' ? 'Burimet e të Dhënave' : 'Data Sources'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2">
              {[...new Set(dataSources.map(source => source.name))].slice(0, 15).map((name, index) => {
                const source = dataSources.find(s => s.name === name);
                return (
                  <a 
                    key={index}
                    href={source?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {name}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
