
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-albania-black text-white py-8 mt-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
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
      </div>
    </footer>
  );
};

export default Footer;
