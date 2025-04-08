
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the translation types
interface Translations {
  [key: string]: string;
}

// Define the language context type
interface LanguageContextType {
  t: (key: string) => string;
  language: string;
  setLanguage: (lang: string) => void;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Additional translations for the Market page
const additionalTranslationsAlbanian: Translations = {
  "market.supply": "Oferta",
  "market.demand": "Kërkesa",
  "market.opportunity.index": "Indeksi i Mundësisë",
  "market.regional.price.description": "Analizë e detajuar e çmimeve dhe ndryshimeve të tyre në rajonet kryesore të Shqipërisë.",
  "market.highest.growth": "Rritja më e lartë",
  "market.peak.season": "Sezoni i Pikut",
  "market.low.season": "Sezoni i Ulët",
  "market.may": "Maj",
  "market.june": "Qershor",
  "market.december": "Dhjetor",
  "market.january": "Janar",
  "market.years": "Vite",
  "market.year": "Vit",
  "market.retail": "Dyqane",
  "market.office": "Zyra",
  "region.suburbs": "Zona Periferike",
  "analysis.important": "E Rëndësishme",
  "market.listings": "Prona në Shitje",
  "market.transactions": "Transaksione",
  "market.price.index": "Indeksi i Çmimit"
};

const additionalTranslationsEnglish: Translations = {
  "market.supply": "Supply",
  "market.demand": "Demand",
  "market.opportunity.index": "Opportunity Index",
  "market.regional.price.description": "Detailed analysis of prices and their changes in key regions of Albania.",
  "market.highest.growth": "Highest Growth",
  "market.peak.season": "Peak Season",
  "market.low.season": "Low Season",
  "market.may": "May",
  "market.june": "June",
  "market.december": "December",
  "market.january": "January",
  "market.years": "Years",
  "market.year": "Year",
  "market.retail": "Retail",
  "market.office": "Office",
  "region.suburbs": "Suburban Areas",
  "market.listings": "Property Listings",
  "market.transactions": "Transactions",
  "market.price.index": "Price Index"
};

// Define the main translations
const translations = {
  en: {
    // English translations
    'site.title': 'PronaStats',
    'site.tagline': 'Albanian Property Market Analytics',
    'nav.home': 'Home',
    'nav.market': 'Market',
    'nav.analysis': 'Analysis',
    'nav.about': 'About',
    'language': 'Language',
    'dashboard.stats': 'Dashboard Statistics',
    'dashboard.avg.price': 'Average Price',
    'dashboard.listings': 'Active Listings',
    'dashboard.yoy.change': 'Year-over-Year Change',
    'dashboard.last.updated': 'Last Updated',
    'dashboard.price.trends': 'Price Trends',
    'dashboard.property.types': 'Property Types by Region',
    'dashboard.regional.prices': 'Regional Prices',
    'dashboard.market.activity': 'Market Activity',
    'property.apartment': 'Apartments',
    'property.house': 'Houses',
    'property.land': 'Land',
    'property.commercial': 'Commercial',
    'region.tirana': 'Tirana',
    'region.durres': 'Durres',
    'region.vlore': 'Vlora',
    'region.sarande': 'Saranda',
    'region.shkoder': 'Shkodra',
    'market.insights': 'Market Insights',
    'market.trends.description': 'Monthly price trends across key Albanian regions, showing average price per square meter (€/m²).',
    'market.price.trends': 'Price Trends',
    'market.affordability': 'Affordability',
    'market.affordability.description': 'Key metrics showing housing affordability across major Albanian cities, including price-to-income ratios and mortgage trends.',
    'market.investment': 'Investment',
    'market.investment.description': 'Investment trends in the Albanian property market, including origin of capital and potential return metrics.',
    'market.price.income.ratio': 'Price to Income Ratio',
    'market.price.income.explanation': 'Number of years of median income needed to purchase a median-priced property.',
    'market.mortgage.trends': 'Mortgage Trends',
    'market.mortgage.rate': 'Average Rate (%)',
    'market.mortgage.volume': 'Number of Mortgages',
    'market.investment.origin': 'Investment Origin',
    'market.domestic.investors': 'Domestic Investors',
    'market.foreign.investors': 'Foreign Investors',
    'market.price.to.rent': 'Price to Rent Ratio',
    'market.price.to.rent.explanation': 'Higher ratios indicate better opportunities for renting rather than buying.',
    'market.quarterly.change': 'Quarterly Change',
    'market.news': 'Market News',
    'market.news.list': 'News List',
    'market.news.featured': 'Featured News',
    'market.featured': 'Featured Story',
    'filter.results': 'Filter Results',
    'expand.view': 'Expand All',
    'collapse.view': 'Collapse All',
    'read.more': 'Read More',
    'view.more': 'View Article',
    'source': 'Source',
    'no.data': 'No data available',
    'all': 'All',
    'properties.location': 'Location',
    'about.data.sources': 'Data Sources',
    'about.disclaimer.text': 'All market data is for informational purposes only',
    'nav.dashboard': 'Dashboard',
    'dashboard.title': 'Property Market Dashboard',
    'dashboard.subtitle': 'Real-time analytics and market trends',
    'download.data': 'Download Data',
    'print': 'Print',
    'share': 'Share',
    'year.over.year': 'Year-over-Year',
    'dashboard.total.listings': 'Total Listings',
    'sqm': 'per m²',
    'dashboard.price.sqm': 'Price per m²',
    'market.overview': 'Market Overview',
    'dashboard.developer.insights': 'Developer Insights',
    'dashboard.investor.metrics': 'Investor Metrics',
    'property.types': 'Property Types',
    'property.luxury': 'Luxury',
    'dashboard.price.regions': 'Regional Price Comparison',
    'high.opportunity': 'High Opportunity',
    'dashboard.construction.costs': 'Construction Costs',
    'market.development.costs': 'Development Costs & Trends',
    'property.residential': 'Residential',
    'market.economy': 'Economy',
    'market.midrange': 'Mid-Range',
    'market.standard': 'Standard',
    'market.premium': 'Premium',
    'analysis.building.permits': 'Building Permits',
    'analysis.development.opportunities': 'Development Opportunities',
    'crawler.last_update': 'Last Update',
    'region.center.tirana': 'Center',
    'crawler.coast': 'Coastal Region',
    'medium.opportunity': 'Medium Opportunity',
    'analysis.zoning.regulations': 'Zoning Regulations',
    'analysis.urban.planning': 'Urban Planning',
    'analysis.update': 'Update',
    'analysis.urban.planning.description': 'Latest urban planning guidelines and zoning regulations for major cities',
    'analysis.regulatory.landscape': 'Regulatory Updates',
    'analysis.regulatory.description': 'Recent changes in property regulations and development laws',
    'analysis.roi.analysis': 'ROI Analysis',
    'analysis.short.term': 'Short Term',
    'analysis.medium.term': 'Medium Term',
    'analysis.long.term': 'Long Term',
    'market.rental.yield': 'Rental Yield',
    'analysis.price.projections': 'Price Projections',
    'quarter.over.quarter': 'Quarter-over-Quarter',
    ...additionalTranslationsEnglish
  },
  sq: {
    // Albanian translations
    'site.title': 'PronaStats',
    'site.tagline': 'Analiza e Tregut të Pronave në Shqipëri',
    'nav.home': 'Kryefaqja',
    'nav.market': 'Tregu',
    'nav.analysis': 'Analiza',
    'nav.about': 'Rreth Nesh',
    'language': 'Gjuha',
    'dashboard.stats': 'Statistikat e Panelit',
    'dashboard.avg.price': 'Çmimi Mesatar',
    'dashboard.listings': 'Prona Aktive',
    'dashboard.yoy.change': 'Ndryshimi vjetor',
    'dashboard.last.updated': 'Përditësimi i Fundit',
    'dashboard.price.trends': 'Trendet e Çmimeve',
    'dashboard.property.types': 'Llojet e Pronave sipas Rajonit',
    'dashboard.regional.prices': 'Çmimet Rajonale',
    'dashboard.market.activity': 'Aktiviteti i Tregut',
    'property.apartment': 'Apartamente',
    'property.house': 'Shtëpi',
    'property.land': 'Truall',
    'property.commercial': 'Komerciale',
    'region.tirana': 'Tiranë',
    'region.durres': 'Durrës',
    'region.vlore': 'Vlorë',
    'region.sarande': 'Sarandë',
    'region.shkoder': 'Shkodër',
    'market.insights': 'Pikëpamje të Tregut',
    'market.trends.description': 'Trendet mujore të çmimeve në rajonet kryesore të Shqipërisë, duke treguar çmimin mesatar për metër katror (€/m²).',
    'market.price.trends': 'Trendet e Çmimeve',
    'market.affordability': 'Përballueshmëria',
    'market.affordability.description': 'Metrika kryesore që tregojnë përballueshmërinë e banesave në qytetet kryesore të Shqipërisë, përfshirë raportet çmim-të-ardhura dhe trendet e kredive hipotekare.',
    'market.investment': 'Investime',
    'market.investment.description': 'Trendet e investimeve në tregun e pronave në Shqipëri, përfshirë origjinën e kapitalit dhe metrikat potenciale të kthimit.',
    'market.price.income.ratio': 'Raporti Çmim ndaj të Ardhurave',
    'market.price.income.explanation': 'Numri i viteve të të ardhurave mesatare të nevojshme për të blerë një pronë me çmim mesatar.',
    'market.mortgage.trends': 'Trendet e Kredive Hipotekare',
    'market.mortgage.rate': 'Norma Mesatare (%)',
    'market.mortgage.volume': 'Numri i Kredive',
    'market.investment.origin': 'Origjina e Investimeve',
    'market.domestic.investors': 'Investitorë Vendas',
    'market.foreign.investors': 'Investitorë të Huaj',
    'market.price.to.rent': 'Raporti Çmim ndaj Qirasë',
    'market.price.to.rent.explanation': 'Raportet më të larta tregojnë mundësi më të mira për qira sesa për blerje.',
    'market.quarterly.change': 'Ndryshimi Tremujor',
    'market.news': 'Lajme të Tregut',
    'market.news.list': 'Lista e Lajmeve',
    'market.news.featured': 'Lajme të Zgjedhura',
    'market.featured': 'Artikull i Zgjedhur',
    'filter.results': 'Filtro Rezultatet',
    'expand.view': 'Zgjero të Gjitha',
    'collapse.view': 'Mbyll të Gjitha',
    'read.more': 'Lexo Më Shumë',
    'view.more': 'Shiko Artikullin',
    'source': 'Burimi',
    'no.data': 'Nuk ka të dhëna',
    'all': 'Të Gjitha',
    'properties.location': 'Vendndodhja',
    'about.data.sources': 'Burimet e të Dhënave',
    'about.disclaimer.text': 'Të gjitha të dhënat e tregut janë vetëm për qëllime informative',
    'nav.dashboard': 'Paneli',
    'dashboard.title': 'Paneli i Tregut të Pronave',
    'dashboard.subtitle': 'Analiza në kohë reale dhe trendët e tregut',
    'download.data': 'Shkarko të Dhënat',
    'print': 'Printo',
    'share': 'Ndaj',
    'year.over.year': 'Vit pas Viti',
    'dashboard.total.listings': 'Totali i Pronave',
    'sqm': 'për m²',
    'dashboard.price.sqm': 'Çmimi për m²',
    'market.overview': 'Përmbledhje e Tregut',
    'dashboard.developer.insights': 'Informacione për Zhvilluesit',
    'dashboard.investor.metrics': 'Metrika për Investitorët',
    'property.types': 'Llojet e Pronave',
    'property.luxury': 'Luksoze',
    'dashboard.price.regions': 'Krahasimi i Çmimeve Rajonale',
    'high.opportunity': 'Mundësi e Lartë',
    'dashboard.construction.costs': 'Kostot e Ndërtimit',
    'market.development.costs': 'Kostot dhe Trendet e Zhvillimit',
    'property.residential': 'Rezidenciale',
    'market.economy': 'Ekonomike',
    'market.midrange': 'Mesatare',
    'market.standard': 'Standarde',
    'market.premium': 'Premium',
    'analysis.building.permits': 'Lejet e Ndërtimit',
    'analysis.development.opportunities': 'Mundësitë e Zhvillimit',
    'crawler.last_update': 'Përditësimi i Fundit',
    'region.center.tirana': 'Qendër',
    'crawler.coast': 'Rajon Bregdetar',
    'medium.opportunity': 'Mundësi Mesatare',
    'analysis.zoning.regulations': 'Rregulloret e Zonimit',
    'analysis.urban.planning': 'Planifikimi Urban',
    'analysis.update': 'Përditësim',
    'analysis.urban.planning.description': 'Udhëzimet e fundit të planifikimit urban dhe rregulloret e zonimit për qytetet kryesore',
    'analysis.regulatory.landscape': 'Përditësime Rregullatore',
    'analysis.regulatory.description': 'Ndryshimet e fundit në rregulloret e pronave dhe ligjet e zhvillimit',
    'analysis.roi.analysis': 'Analiza ROI',
    'analysis.short.term': 'Afatshkurtër',
    'analysis.medium.term': 'Afatmesëm',
    'analysis.long.term': 'Afatgjatë',
    'market.rental.yield': 'Rendimenti i Qirasë',
    'analysis.price.projections': 'Projeksionet e Çmimeve',
    'quarter.over.quarter': 'Tremujor pas Tremujori',
    ...additionalTranslationsAlbanian
  }
};

// Create the provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Changed default language to Albanian (sq)
  const [language, setLanguage] = useState<string>('sq');
  
  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations.sq;
    return currentTranslations[key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
