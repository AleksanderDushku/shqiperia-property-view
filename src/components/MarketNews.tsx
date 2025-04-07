
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, ExternalLink, TrendingUp, Building, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';

// Updated market news data with professional focus
const marketNewsData = [
  {
    id: 1,
    title: "Çmimet e pronave në Tiranë vazhdojnë rritjen, duke krijuar mundësi për zhvilluesit",
    titleEn: "Property prices in Tirana continue to rise, creating opportunities for developers",
    date: "2025-04-02",
    category: "market-trends",
    summary: "Rritja e çmimeve me 5.2% ofron mundësi për zhvilluesit e ndërtimit në zonat me rritje të lartë, veçanërisht në lagjet periferike me infrastrukturë të re.",
    summaryEn: "The 5.2% price increase offers opportunities for developers in high-growth areas, particularly in peripheral neighborhoods with new infrastructure.",
    source: "Monitor.al",
    url: "https://www.monitor.al",
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: 2,
    title: "Investitorët e huaj fokusohen në pronat në bregdet, duke rritur potencialin për zhvillim",
    titleEn: "Foreign investors focus on coastal properties, increasing development potential",
    date: "2025-03-28",
    category: "investment",
    summary: "Analizat e tregut tregojnë që investitorët nga Europa dhe Lindja e Mesme po krijojnë mundësi për projekte të përbashkëta zhvillimi në Sarandë dhe Vlorë.",
    summaryEn: "Market analyses show that investors from Europe and the Middle East are creating opportunities for joint development projects in Saranda and Vlora.",
    source: "Exit.al",
    url: "https://exit.al",
    icon: <Briefcase className="h-5 w-5" />
  },
  {
    id: 3,
    title: "Ndryshimet në normat e interesit kërkojnë strategji të reja financimi për zhvilluesit",
    titleEn: "Interest rate changes require new financing strategies for developers",
    date: "2025-03-25",
    category: "finance",
    summary: "Specialistët e financave rekomandojnë strukturim inovativ të financimit të projekteve në përgjigje të ndryshimeve të pritshme në normat e interesit nga Banka e Shqipërisë.",
    summaryEn: "Finance specialists recommend innovative project financing structuring in response to expected interest rate changes from the Bank of Albania.",
    source: "Top-Channel.tv",
    url: "https://top-channel.tv",
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: 4,
    title: "Teknologjia po transformon procesin e zhvillimit të pronave në Tiranë",
    titleEn: "Technology is transforming the property development process in Tirana",
    date: "2025-03-20",
    category: "technology",
    summary: "Adoptimi i BIM (Building Information Modeling) dhe teknologjive të tjera digjitale po përmirëson efikasitetin e projekteve dhe po ul kostot e zhvillimit me 15-20%.",
    summaryEn: "The adoption of BIM (Building Information Modeling) and other digital technologies is improving project efficiency and reducing development costs by 15-20%.",
    source: "BalkanInsight.com",
    url: "https://balkaninsight.com",
    icon: <Building className="h-5 w-5" />
  }
];

const categoryColors: {[key: string]: string} = {
  'market-trends': 'bg-blue-100 text-blue-800',
  'investment': 'bg-green-100 text-green-800',
  'finance': 'bg-amber-100 text-amber-800',
  'construction': 'bg-purple-100 text-purple-800',
  'technology': 'bg-indigo-100 text-indigo-800',
  'policy': 'bg-red-100 text-red-800'
};

const MarketNews: React.FC = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  
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
      'technology': {sq: 'Teknologji', en: 'Technology'},
      'policy': {sq: 'Politikë', en: 'Policy'}
    };
    
    return language === 'sq' ? categories[category]?.sq || category : categories[category]?.en || category;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-base md:text-lg">
          <Briefcase className="mr-2 h-5 w-5 text-albania-red" />
          {t('market.news')} 
          <span className="ml-2 text-sm text-gray-500">- {t('market.insights')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          {marketNewsData.map((news) => (
            <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow border-l-2 border-l-albania-red">
              <CardContent className="p-0">
                <div className="p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <Badge className={`${categoryColors[news.category]} border-0 self-start flex items-center`}>
                      {news.icon && <span className="mr-1">{news.icon}</span>}
                      {getCategoryName(news.category)}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center self-start">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(news.date)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">
                    {language === 'sq' ? news.title : news.titleEn}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm">
                    {language === 'sq' ? news.summary : news.summaryEn}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="px-3 md:px-4 py-2 md:py-3 bg-gray-50 flex flex-wrap justify-between items-center">
                <span className="text-xs text-gray-500">{t('source')}: {news.source}</span>
                <Button size={isMobile ? "sm" : "sm"} variant="outline" className="h-7 md:h-8 mt-1 sm:mt-0" asChild>
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs md:text-sm">
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
