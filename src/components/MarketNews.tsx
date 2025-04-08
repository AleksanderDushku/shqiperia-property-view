
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, ExternalLink, TrendingUp, Building, Briefcase, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Updated market news data with professional focus and more content
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
    icon: <TrendingUp className="h-5 w-5" />,
    relevance: "high"
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
    icon: <Briefcase className="h-5 w-5" />,
    relevance: "high"
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
    icon: <TrendingUp className="h-5 w-5" />,
    relevance: "medium"
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
    icon: <Building className="h-5 w-5" />,
    relevance: "high"
  },
  {
    id: 5,
    title: "Ndryshime në legjislacionin e ndërtimit ndikojnë në projekte të reja në zonat urbane",
    titleEn: "Changes in construction legislation affect new projects in urban areas",
    date: "2025-03-15",
    category: "policy",
    summary: "Legjislacioni i ri i ndërtimit që hyn në fuqi muajin e ardhshëm do të ndikojë në leje ndërtimi për zona të dendura urbane, duke favorizuar projektet me efikasitet të lartë energjetik.",
    summaryEn: "New construction legislation coming into effect next month will impact building permits for dense urban areas, favoring projects with high energy efficiency.",
    source: "Reporter.al",
    url: "https://reporter.al",
    icon: <Building className="h-5 w-5" />,
    relevance: "high"
  },
  {
    id: 6,
    title: "Tregu i pronave luksoze shënon rritje rekord në Tiranë dhe zonat bregdetare",
    titleEn: "Luxury property market sees record growth in Tirana and coastal areas",
    date: "2025-03-12",
    category: "market-trends",
    summary: "Segmenti i pronave luksoze ka rritur çmimet me 12% krahasuar me vitin e kaluar, duke tërhequr investitorë të specializuar dhe firmat e administrimit të pasurive nga Europa Perëndimore.",
    summaryEn: "The luxury property segment has increased prices by 12% compared to last year, attracting specialized investors and asset management firms from Western Europe.",
    source: "Monitor.al",
    url: "https://www.monitor.al",
    icon: <TrendingUp className="h-5 w-5" />,
    relevance: "medium"
  },
  {
    id: 7,
    title: "Zhvilluesit po adoptojnë praktika të qëndrueshme ndërtimi për të përmbushur kërkesat e tregut",
    titleEn: "Developers adopting sustainable building practices to meet market demands",
    date: "2025-03-08",
    category: "construction",
    summary: "Kërkesa në rritje për ndërtime të gjelbra dhe të qëndrueshme po nxit zhvilluesit të implementojnë standarde ndërkombëtare të certifikimit dhe materiale ekologjike.",
    summaryEn: "Increasing demand for green and sustainable construction is pushing developers to implement international certification standards and eco-friendly materials.",
    source: "Tirana Times",
    url: "https://tiranatimes.com",
    icon: <Building className="h-5 w-5" />,
    relevance: "medium"
  },
  {
    id: 8,
    title: "Analiza e të dhënave po ndryshon strategjitë e investimit në pronë",
    titleEn: "Data analytics changing property investment strategies",
    date: "2025-03-05",
    category: "technology",
    summary: "Investitorët profesionistë po përdorin gjithnjë e më shumë analitikën e të dhënave dhe inteligjencën artificiale për të identifikuar mundësi investimi në tregje specifike lokale.",
    summaryEn: "Professional investors are increasingly using data analytics and artificial intelligence to identify investment opportunities in specific local markets.",
    source: "ICTmedia.al",
    url: "https://ictmedia.al",
    icon: <TrendingUp className="h-5 w-5" />,
    relevance: "high"
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

const relevanceColors: {[key: string]: string} = {
  'high': 'border-l-red-500',
  'medium': 'border-l-amber-500',
  'low': 'border-l-gray-400'
};

const MarketNews: React.FC = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const [categoryFilter, set_category_filter] = useState<string | null>(null);
  const [expanded, set_expanded] = useState<number[]>([]);
  const [showFilters, set_show_filters] = useState(false);
  
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
  
  const toggleExpand = (id: number) => {
    if (expanded.includes(id)) {
      set_expanded(expanded.filter(item => item !== id));
    } else {
      set_expanded([...expanded, id]);
    }
  };
  
  const filteredNews = categoryFilter 
    ? marketNewsData.filter(news => news.category === categoryFilter)
    : marketNewsData;
  
  const categories = Array.from(new Set(marketNewsData.map(news => news.category)));
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <CardTitle className="flex items-center text-base md:text-lg">
            <Briefcase className="mr-2 h-5 w-5 text-albania-red" />
            {t('market.news')} 
            <span className="ml-2 text-sm text-gray-500">- {t('market.insights')}</span>
          </CardTitle>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center text-xs" 
              onClick={() => set_show_filters(!showFilters)}
            >
              <Filter className="h-3.5 w-3.5 mr-1" />
              {t('filter.results')}
              {showFilters ? <ChevronUp className="h-3.5 w-3.5 ml-1" /> : <ChevronDown className="h-3.5 w-3.5 ml-1" />}
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs" 
              onClick={() => set_expanded(expanded.length === marketNewsData.length ? [] : marketNewsData.map(n => n.id))}
            >
              {expanded.length === marketNewsData.length ? t('collapse.view') : t('expand.view')}
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge 
              variant={categoryFilter === null ? "default" : "outline"} 
              className="cursor-pointer"
              onClick={() => set_category_filter(null)}
            >
              {t('all')}
            </Badge>
            {categories.map((cat, i) => (
              <Badge 
                key={i} 
                variant={categoryFilter === cat ? "default" : "outline"} 
                className={`cursor-pointer ${categoryFilter === cat ? '' : categoryColors[cat]}`}
                onClick={() => set_category_filter(cat === categoryFilter ? null : cat)}
              >
                {getCategoryName(cat)}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4 w-full bg-gray-100">
            <TabsTrigger value="list" className="flex-1">{t('market.news.list')}</TabsTrigger>
            <TabsTrigger value="featured" className="flex-1">{t('market.news.featured')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-0 space-y-4">
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
              {filteredNews.map((news) => (
                <Card 
                  key={news.id} 
                  className={`overflow-hidden hover:shadow-md transition-shadow border-l-2 ${relevanceColors[news.relevance]}`}
                >
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
                      <div className="text-gray-600 text-xs md:text-sm">
                        {expanded.includes(news.id) 
                          ? (language === 'sq' ? news.summary : news.summaryEn)
                          : (language === 'sq' ? news.summary.substring(0, 100) + '...' : news.summaryEn.substring(0, 100) + '...')}
                        
                        <button 
                          className="text-albania-red hover:underline ml-1 font-medium"
                          onClick={() => toggleExpand(news.id)}
                        >
                          {expanded.includes(news.id) ? t('collapse.view') : t('read.more')}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-3 md:px-4 py-2 md:py-3 bg-gray-50 flex flex-wrap justify-between items-center">
                    <span className="text-xs text-gray-500">{t('source')}: {news.source}</span>
                    <Button size={isMobile ? "sm" : "sm"} variant="outline" className="h-7 md:h-8 mt-1 sm:mt-0" asChild>
                      <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-xs md:text-sm">
                        {t('view.more')}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredNews.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('no.data')}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="featured" className="mt-0">
            <div className="space-y-4">
              {filteredNews.filter(n => n.relevance === 'high').slice(0, 1).map(news => (
                <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gray-50 p-4 border-b">
                    <Badge className={`${categoryColors[news.category]} border-0 mb-2`}>
                      {getCategoryName(news.category)}
                    </Badge>
                    <h2 className="text-xl font-bold mb-3">
                      {language === 'sq' ? news.title : news.titleEn}
                    </h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(news.date)}
                      </div>
                      <span className="text-sm text-gray-500">{t('source')}: {news.source}</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <p className="text-gray-700">
                      {language === 'sq' ? news.summary : news.summaryEn}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 flex justify-between py-3">
                    <div className="text-sm text-gray-500">{t('market.featured')}</div>
                    <Button size="sm" asChild>
                      <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        {t('read.more')}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredNews.filter(n => n.relevance === 'high').slice(1, 4).map(news => (
                  <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <Badge className={`${categoryColors[news.category]} border-0 mb-2`}>
                        {getCategoryName(news.category)}
                      </Badge>
                      <h3 className="font-medium text-base mb-2">
                        {language === 'sq' ? news.title : news.titleEn}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">
                        {language === 'sq' 
                          ? news.summary.substring(0, 80) + '...' 
                          : news.summaryEn.substring(0, 80) + '...'}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{formatDate(news.date)}</span>
                        <a 
                          href={news.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-albania-red hover:underline"
                        >
                          {t('read.more')}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketNews;
