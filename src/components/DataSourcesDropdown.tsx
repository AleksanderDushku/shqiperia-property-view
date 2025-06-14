
import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Database, Globe, Building2, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../contexts/DarkModeContext';

interface DataSource {
  name: string;
  url: string;
  category: 'official' | 'real-estate' | 'banks' | 'news' | 'research';
  description: string;
  reliability: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

const dataSources: DataSource[] = [
  {
    name: 'INSTAT Albania',
    url: 'https://www.instat.gov.al/en/themes/industry-trade-and-services/construction-industry/',
    category: 'official',
    description: 'Official construction and real estate statistics',
    reliability: 'high',
    lastUpdated: '2024-12-01'
  },
  {
    name: 'Bank of Albania',
    url: 'https://www.bankofalbania.org/',
    category: 'official',
    description: 'Interest rates and economic indicators',
    reliability: 'high',
    lastUpdated: '2024-12-10'
  },
  {
    name: 'Merrjep.com',
    url: 'https://merrjep.com/kategoria/5/patundshmeri',
    category: 'real-estate',
    description: 'Real estate listings and market prices',
    reliability: 'medium',
    lastUpdated: '2024-12-14'
  },
  {
    name: 'Portalimobiliar.com',
    url: 'https://portalimobiliar.com/',
    category: 'real-estate',
    description: 'Property listings and rental market data',
    reliability: 'medium',
    lastUpdated: '2024-12-13'
  },
  {
    name: 'Shtepia.al',
    url: 'https://shtepia.al/',
    category: 'real-estate',
    description: 'Real estate marketplace and price trends',
    reliability: 'medium',
    lastUpdated: '2024-12-12'
  },
  {
    name: 'Tirana.al',
    url: 'https://tirana.al/',
    category: 'real-estate',
    description: 'Tirana-focused property listings',
    reliability: 'medium',
    lastUpdated: '2024-12-11'
  },
  {
    name: 'Raiffeisen Bank',
    url: 'https://www.raiffeisen.al/individ/kredi/kredi-per-shtepi/',
    category: 'banks',
    description: 'Mortgage rates and loan products',
    reliability: 'high',
    lastUpdated: '2024-12-10'
  },
  {
    name: 'Intesa Sanpaolo Bank',
    url: 'https://www.intesasanpaolobank.al/',
    category: 'banks',
    description: 'Housing loans and interest rates',
    reliability: 'high',
    lastUpdated: '2024-12-09'
  },
  {
    name: 'Alpha Bank Albania',
    url: 'https://www.alphabank.al/',
    category: 'banks',
    description: 'Mortgage products and rates',
    reliability: 'high',
    lastUpdated: '2024-12-08'
  },
  {
    name: 'Exit.al',
    url: 'https://exit.al/',
    category: 'news',
    description: 'Real estate news and market analysis',
    reliability: 'medium',
    lastUpdated: '2024-12-14'
  },
  {
    name: 'Monitor.al',
    url: 'https://monitor.al/',
    category: 'news',
    description: 'Economic and property market news',
    reliability: 'medium',
    lastUpdated: '2024-12-13'
  },
  {
    name: 'Balkan Insight',
    url: 'https://balkaninsight.com/',
    category: 'research',
    description: 'Regional economic analysis and reports',
    reliability: 'high',
    lastUpdated: '2024-12-05'
  }
];

const DataSourcesDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { t, language } = useLanguage();
  const { dark_mode } = useDarkMode();

  const categories = [
    { key: 'all', label: language === 'sq' ? 'Të gjitha' : 'All Sources', icon: Database },
    { key: 'official', label: language === 'sq' ? 'Zyrtare' : 'Official', icon: Building2 },
    { key: 'real-estate', label: language === 'sq' ? 'Prona' : 'Real Estate', icon: Globe },
    { key: 'banks', label: language === 'sq' ? 'Banka' : 'Banks', icon: TrendingUp },
    { key: 'news', label: language === 'sq' ? 'Lajme' : 'News', icon: Globe },
    { key: 'research', label: language === 'sq' ? 'Studime' : 'Research', icon: Database }
  ];

  const filteredSources = selectedCategory === 'all' 
    ? dataSources 
    : dataSources.filter(source => source.category === selectedCategory);

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'official': return Building2;
      case 'real-estate': return Globe;
      case 'banks': return TrendingUp;
      case 'news': return Globe;
      case 'research': return Database;
      default: return Database;
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full justify-between h-12 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
          dark_mode 
            ? 'bg-gray-800 border-gray-600 hover:border-albania-red text-white' 
            : 'bg-white border-gray-200 hover:border-albania-red text-gray-700'
        }`}
      >
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-albania-red" />
          <span>{language === 'sq' ? 'Burimet e të dhënave' : 'Data Sources'}</span>
          <Badge variant="secondary" className="ml-2 bg-albania-red text-white text-xs">
            {filteredSources.length}
          </Badge>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className={`absolute top-14 left-0 right-0 z-50 ${dark_mode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl border-2 ${dark_mode ? 'border-gray-600' : 'border-gray-200'} max-h-96 overflow-hidden`}>
          {/* Category Filter */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-3 gap-2">
              {categories.slice(0, 6).map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`flex flex-col items-center p-2 rounded-lg text-xs transition-all duration-200 ${
                      selectedCategory === category.key
                        ? 'bg-albania-red text-white'
                        : dark_mode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mb-1" />
                    <span className="font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sources List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredSources.map((source, index) => {
              const CategoryIcon = getCategoryIcon(source.category);
              return (
                <div
                  key={index}
                  className={`p-4 border-b last:border-b-0 ${dark_mode ? 'border-gray-600' : 'border-gray-100'} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CategoryIcon className="h-4 w-4 text-albania-red" />
                        <h4 className="font-semibold text-sm dark:text-white">{source.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${getReliabilityColor(source.reliability)}`} />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{source.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{language === 'sq' ? 'Përditësuar:' : 'Updated:'} {source.lastUpdated}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(source.url, '_blank')}
                      className="ml-2 p-1 h-8 w-8"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className={`p-3 border-t ${dark_mode ? 'border-gray-600 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              {language === 'sq' 
                ? `${filteredSources.length} burime të dhënash të disponueshme`
                : `${filteredSources.length} data sources available`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSourcesDropdown;
