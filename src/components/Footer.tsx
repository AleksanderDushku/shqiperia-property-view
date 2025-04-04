
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('about.data.sources')}</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>merrjep.al</li>
              <li>prona.al</li>
              <li>century21.al</li>
              <li>remax.al</li>
              <li>propertiesalbania.al</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('about.disclaimer')}</h3>
            <p className="text-gray-300 text-sm">
              {t('about.disclaimer.text')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
