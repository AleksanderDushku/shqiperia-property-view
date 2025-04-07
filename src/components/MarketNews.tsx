
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Sample market news data
const marketNewsData = [
  {
    id: 1,
    title: "Çmimet e pronave në Tiranë vazhdojnë rritjen në tremujorin e dytë",
    titleEn: "Property prices in Tirana continue to rise in the second quarter",
    date: "2025-04-02",
    category: "market-trends",
    summary: "Sipas të dhënave më të fundit, çmimet e apartamenteve në kryeqytet janë rritur me 5.2% krahasuar me të njëjtën periudhë të vitit të kaluar.",
    summaryEn: "According to the latest data, apartment prices in the capital have increased by 5.2% compared to the same period last year.",
    source: "Monitor.al",
    url: "https://www.monitor.al"
  },
  {
    id: 2,
    title: "Investitorët e huaj tregojnë interes të shtuar për pronat në bregdet",
    titleEn: "Foreign investors show increased interest in coastal properties",
    date: "2025-03-28",
    category: "investment",
    summary: "Investitorët nga Europa Perëndimore dhe Lindja e Mesme po blejnë gjithnjë e më shumë prona në Sarandë dhe Vlorë, duke rritur çmimet në këto zona.",
    summaryEn: "Investors from Western Europe and the Middle East are buying more and more properties in Saranda and Vlora, driving up prices in these areas.",
    source: "Exit.al",
    url: "https://exit.al"
  },
  {
    id: 3,
    title: "Normat e interesit për kreditë hipotekare pritet të rriten",
    titleEn: "Mortgage interest rates expected to rise",
    date: "2025-03-25",
    category: "finance",
    summary: "Banka e Shqipërisë sinjalizon se normat e interesit për kreditë hipotekare mund të rriten me 0.5% deri në fund të vitit 2025.",
    summaryEn: "The Bank of Albania signals that mortgage interest rates may rise by 0.5% by the end of 2025.",
    source: "Top-Channel.tv",
    url: "https://top-channel.tv"
  },
  {
    id: 4,
    title: "Ndërtimi i rezidencave të reja në Tiranë shënon rritje rekord",
    titleEn: "Construction of new residences in Tirana marks record growth",
    date: "2025-03-20",
    category: "construction",
    summary: "Lejet e ndërtimit për projekte të reja rezidenciale në Tiranë janë rritur me 25% në vitin 2025, kryesisht në zonat Kombinat dhe Astir.",
    summaryEn: "Building permits for new residential projects in Tirana have increased by 25% in 2025, mainly in the Kombinat and Astir areas.",
    source: "BalkanInsight.com",
    url: "https://balkaninsight.com"
  }
];

const categoryColors: {[key: string]: string} = {
  'market-trends': 'bg-blue-100 text-blue-800',
  'investment': 'bg-green-100 text-green-800',
  'finance': 'bg-amber-100 text-amber-800',
  'construction': 'bg-purple-100 text-purple-800',
  'policy': 'bg-red-100 text-red-800'
};

const MarketNews: React.FC = () => {
  const { t, language } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'sq' ? 'sq-AL' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const getCategoryName = (category: string) => {
    const categories: {[key: string]: {sq: string, en: string}} = {
      'market-trends': {sq: 'Trendi i Tregut', en: 'Market Trends'},
      'investment': {sq: 'Investime', en: 'Investment'},
      'finance': {sq: 'Financë', en: 'Finance'},
      'construction': {sq: 'Ndërtim', en: 'Construction'},
      'policy': {sq: 'Politikë', en: 'Policy'}
    };
    
    return language === 'sq' ? categories[category]?.sq || category : categories[category]?.en || category;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-albania-red" />
          {t('market.news')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {marketNewsData.map((news) => (
            <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${categoryColors[news.category]} border-0`}>
                      {getCategoryName(news.category)}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(news.date)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {language === 'sq' ? news.title : news.titleEn}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'sq' ? news.summary : news.summaryEn}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                <span className="text-xs text-gray-500">{t('source')}: {news.source}</span>
                <Button size="sm" variant="outline" className="h-8" asChild>
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {t('read.more')}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketNews;
