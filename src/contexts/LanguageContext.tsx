
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'sq' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sq: {
    // Header
    "site.title": "PronaStats",
    "nav.dashboard": "Paneli",
    "nav.market": "Tregu",
    "nav.analysis": "Analiza",
    "nav.about": "Rreth Nesh",
    
    // Dashboard
    "dashboard.title": "Paneli i Profesionistit të Tregut të Pronave",
    "dashboard.subtitle": "Njohuri dhe të dhëna të integruara për vendimmarrje strategjike në tregun e pronave",
    "dashboard.avg.price": "Çmimi mesatar",
    "dashboard.total.listings": "Prona në shitje",
    "dashboard.price.sqm": "Çmimi për m²",
    "dashboard.price.trends": "Trendet e Çmimeve",
    "dashboard.price.regions": "Çmimet sipas Rajoneve",
    "dashboard.last.updated": "Përditësuar së fundmi",
    "dashboard.key.metrics": "Treguesit Kryesorë",
    "dashboard.market.pulse": "Pulsi i Tregut",
    "dashboard.developer.insights": "Njohuri për Zhvilluesit",
    "dashboard.investor.metrics": "Metrika për Investitorët",
    
    // Property Types
    "property.apartment": "Apartament",
    "property.house": "Shtëpi",
    "property.land": "Tokë",
    "property.commercial": "Komerciale",
    "property.development": "Projekt Zhvillimi",
    "property.distribution": "Shpërndarja e Pronave",
    "property.types": "Tipet e Pronave",
    
    // Regions
    "region.tirana": "Tiranë",
    "region.durres": "Durrës",
    "region.vlore": "Vlorë",
    "region.sarande": "Sarandë",
    "region.shkoder": "Shkodër",
    "region.elbasan": "Elbasan",
    
    // Market page
    "market.title": "Analiza e Tregut",
    "market.subtitle": "Njohuri strategjike për tregun e pronave për profesionistët me eksperiencë të shumëfishtë",
    "market.price.evolution": "Evolucioni i Çmimeve",
    "market.quarterly.change": "Ndryshimet Tremujore",
    "market.supply.demand": "Oferta dhe Kërkesa",
    "market.overview": "Përmbledhje",
    "market.trends": "Trendet",
    "market.news": "Lajme",
    "market.insights": "Analiza e Thelluar e Tregut",
    "market.price.trends": "Trendet e Çmimeve",
    "market.affordability": "Përballueshmëria",
    "market.investment": "Investimet",
    "market.price.income.ratio": "Raporti Çmim/Të ardhura",
    "market.price.income.explanation": "Raporti tregon sa vite të ardhurash mesatare duhen për të blerë një pronë - një tregues kyç për vendimmarrje investimi.",
    "market.mortgage.trends": "Trendet e Kredive Hipotekare",
    "market.mortgage.rate": "Norma Mesatare e Interesit",
    "market.mortgage.volume": "Numri i Kredive",
    "market.investment.description": "Analiza e investimeve strategjike në tregun e pronave, duke theksuar rritjen e kapitalit dhe kthimin afatgjatë nga investimi.",
    "market.investment.origin": "Origjina e Investimeve",
    "market.domestic.investors": "Investitorë Vendas",
    "market.foreign.investors": "Investitorë të Huaj",
    "market.price.to.rent": "Raporti Çmim/Qira",
    "market.price.to.rent.explanation": "Raporti çmim/qira tregon kthimin vjetor të investimit dhe është thelbësor për strategji të ndryshme investimi në prona.",
    "market.trends.description": "Trendet e çmimeve dhe zhvillimet e tregut të analizuara për identifikimin e mundësive strategjike për zhvilluesit dhe investitorët.",
    "market.affordability.description": "Analiza e përballueshmërisë së pronave, duke konsideruar faktorët ekonomikë, normat e interesit, dhe politikat e kreditimit.",
    "market.key.insights": "Njohuri Kyçe",
    "market.infrastructure.impact": "Ndikimi i Infrastrukturës",
    "market.regulatory.changes": "Ndryshimet Rregullatore",
    "market.tech.influence": "Ndikimi i Teknologjisë",
    
    // Analysis page
    "analysis.title": "Analiza e Thelluar",
    "analysis.subtitle": "Njohuri të avancuara për vendimmarrje strategjike në zhvillim, investim dhe menaxhim pronash",
    "analysis.market.dynamics": "Dinamikat e Tregut",
    "analysis.affordability": "Përballueshmëria",
    "analysis.investment": "Investimet",
    "analysis.seasonality": "Sezonaliteti",
    "analysis.market.dynamics.description": "Analiza e forcave të tregut që ndikojnë çmimet e pronave dhe mundësitë për zhvillim.",
    "analysis.affordability.description": "Vlerësimi i përballueshmërisë së pronave në raport me të ardhurat dhe kushtet ekonomike.",
    "analysis.investment.description": "Strategji dhe mundësi investimi të bazuara në analiza të thelluara të tregut dhe prirjeve.",
    "analysis.seasonality.description": "Modelet sezonale në tregun e pronave dhe implikimi i tyre për strategjitë e shitjes dhe blerjes.",
    "analysis.key.insights": "Njohuri Kyçe",
    "analysis.developer.metrics": "Metrika për Zhvilluesit",
    "analysis.investor.view": "Këndvështrimi i Investitorit",
    "analysis.tech.integration": "Integrimi i Teknologjisë",
    "analysis.infrastructure.impact": "Ndikimi i Infrastrukturës",
    "analysis.regulatory.landscape": "Panorama Rregullatore",
    "analysis.market.liquidity": "Likuiditeti i Tregut",
    "analysis.roi.analysis": "Analiza e Kthimit nga Investimi",
    "analysis.development.opportunities": "Mundësi Zhvillimi",
    "analysis.risk.assessment": "Vlerësimi i Rrezikut",
    "analysis.exit.strategies": "Strategji Dalje",
    "analysis.pricing.strategies": "Strategji Çmimesh",
    "analysis.supply.constraints": "Kufizimet e Ofertës",
    "analysis.demand.drivers": "Faktorët e Kërkesës",
    "analysis.price.projections": "Projeksionet e Çmimeve",
    "analysis.market.sentiment": "Sentimenti i Tregut",
    "analysis.buyer.segments": "Segmentet e Blerësve",
    "analysis.area.comparison": "Krahasimi i Zonave",
    
    // About page
    "about.title": "Rreth Nesh",
    "about.subtitle": "Ekspertizë dhe njohuri të integruara për të gjithë spektrin e tregut të pronave",
    "about.description": "PronaStats ofron njohuri të thelluara për profesionistët e tregut të pronave, duke integruar perspektivat e agjentëve, zhvilluesve, investitorëve dhe specialistëve të teknologjisë.",
    "about.data.sources": "Burimet e të Dhënave",
    "about.disclaimer": "Shënim i Rëndësishëm",
    "about.disclaimer.text": "Të dhënat e paraqitura janë për qëllime informative dhe duhet të plotësohen me këshillim profesional përpara marrjes së vendimeve të rëndësishme investuese apo zhvilluese.",
    "about.mission": "Misioni",
    "about.team": "Ekipi",
    "about.our.mission": "Misioni Ynë",
    "about.our.values": "Vlerat Tona",
    "about.our.team": "Ekipi i Ekspertëve",
    "about.contact.us": "Na Kontaktoni",
    "about.expertise": "Ekspertiza Jonë",
    "about.agent.expertise": "Ekspertiza si Agjentë",
    "about.developer.expertise": "Ekspertiza në Zhvillim",
    "about.investor.expertise": "Ekspertiza në Investime",
    "about.tech.expertise": "Ekspertiza Teknologjike",
    
    // Misc
    "currency": "Lekë",
    "sqm": "m²",
    "all": "Të gjitha",
    "loading": "Duke u ngarkuar...",
    "no.data": "Nuk ka të dhëna",
    "view.more": "Shiko më shumë",
    "source": "Burimi",
    "read.more": "Lexo më shumë",
    "year.over.year": "Vit pas viti",
    "quarter.over.quarter": "Tremujor pas tremujori",
    "month.over.month": "Muaj pas muaji",
    "high.demand": "Kërkesë e lartë",
    "medium.demand": "Kërkesë mesatare",
    "low.demand": "Kërkesë e ulët",
    "high.opportunity": "Mundësi e lartë",
    "medium.opportunity": "Mundësi mesatare",
    "low.opportunity": "Mundësi e ulët",
    "high.risk": "Rrezik i lartë",
    "medium.risk": "Rrezik mesatar",
    "low.risk": "Rrezik i ulët"
  },
  
  en: {
    // Header
    "site.title": "PronaStats",
    "nav.dashboard": "Dashboard",
    "nav.market": "Market",
    "nav.analysis": "Analysis",
    "nav.about": "About",
    
    // Dashboard
    "dashboard.title": "Real Estate Professional Dashboard",
    "dashboard.subtitle": "Integrated insights and data for strategic real estate decision-making",
    "dashboard.avg.price": "Average Price",
    "dashboard.total.listings": "Properties For Sale",
    "dashboard.price.sqm": "Price per sqm",
    "dashboard.price.trends": "Price Trends",
    "dashboard.price.regions": "Prices by Region",
    "dashboard.last.updated": "Last updated",
    "dashboard.key.metrics": "Key Metrics",
    "dashboard.market.pulse": "Market Pulse",
    "dashboard.developer.insights": "Developer Insights",
    "dashboard.investor.metrics": "Investor Metrics",
    
    // Property Types
    "property.apartment": "Apartment",
    "property.house": "House",
    "property.land": "Land",
    "property.commercial": "Commercial",
    "property.development": "Development Project",
    "property.distribution": "Property Distribution",
    "property.types": "Property Types",
    
    // Regions
    "region.tirana": "Tirana",
    "region.durres": "Durres",
    "region.vlore": "Vlore",
    "region.sarande": "Sarande",
    "region.shkoder": "Shkoder",
    "region.elbasan": "Elbasan",
    
    // Market page
    "market.title": "Market Analysis",
    "market.subtitle": "Strategic real estate market insights for multi-disciplinary professionals",
    "market.price.evolution": "Price Evolution",
    "market.quarterly.change": "Quarterly Changes",
    "market.supply.demand": "Supply and Demand",
    "market.overview": "Overview",
    "market.trends": "Trends",
    "market.news": "News",
    "market.insights": "In-Depth Market Analysis",
    "market.price.trends": "Price Trends",
    "market.affordability": "Affordability",
    "market.investment": "Investment",
    "market.price.income.ratio": "Price-to-Income Ratio",
    "market.price.income.explanation": "This ratio shows how many years of average income are needed to buy a property - a key indicator for investment decisions.",
    "market.mortgage.trends": "Mortgage Trends",
    "market.mortgage.rate": "Average Interest Rate",
    "market.mortgage.volume": "Number of Mortgages",
    "market.investment.description": "Analysis of strategic investments in the property market, highlighting capital appreciation and long-term return on investment.",
    "market.investment.origin": "Investment Origin",
    "market.domestic.investors": "Domestic Investors",
    "market.foreign.investors": "Foreign Investors",
    "market.price.to.rent": "Price-to-Rent Ratio",
    "market.price.to.rent.explanation": "The price-to-rent ratio indicates annual return on investment and is essential for various property investment strategies.",
    "market.trends.description": "Price trends and market developments analyzed for identifying strategic opportunities for developers and investors.",
    "market.affordability.description": "Analysis of property affordability, considering economic factors, interest rates, and lending policies.",
    "market.key.insights": "Key Insights",
    "market.infrastructure.impact": "Infrastructure Impact",
    "market.regulatory.changes": "Regulatory Changes",
    "market.tech.influence": "Technology Influence",
    
    // Analysis page
    "analysis.title": "In-Depth Analysis",
    "analysis.subtitle": "Advanced insights for strategic decision-making in property development, investment, and management",
    "analysis.market.dynamics": "Market Dynamics",
    "analysis.affordability": "Affordability",
    "analysis.investment": "Investment",
    "analysis.seasonality": "Seasonality",
    "analysis.market.dynamics.description": "Analysis of market forces influencing property prices and development opportunities.",
    "analysis.affordability.description": "Assessment of property affordability in relation to income and economic conditions.",
    "analysis.investment.description": "Investment strategies and opportunities based on in-depth market analysis and trends.",
    "analysis.seasonality.description": "Seasonal patterns in the property market and their implication for selling and buying strategies.",
    "analysis.key.insights": "Key Insights",
    "analysis.developer.metrics": "Developer Metrics",
    "analysis.investor.view": "Investor Perspective",
    "analysis.tech.integration": "Technology Integration",
    "analysis.infrastructure.impact": "Infrastructure Impact",
    "analysis.regulatory.landscape": "Regulatory Landscape",
    "analysis.market.liquidity": "Market Liquidity",
    "analysis.roi.analysis": "ROI Analysis",
    "analysis.development.opportunities": "Development Opportunities",
    "analysis.risk.assessment": "Risk Assessment",
    "analysis.exit.strategies": "Exit Strategies",
    "analysis.pricing.strategies": "Pricing Strategies",
    "analysis.supply.constraints": "Supply Constraints",
    "analysis.demand.drivers": "Demand Drivers",
    "analysis.price.projections": "Price Projections",
    "analysis.market.sentiment": "Market Sentiment",
    "analysis.buyer.segments": "Buyer Segments",
    "analysis.area.comparison": "Area Comparison",
    
    // About page
    "about.title": "About Us",
    "about.subtitle": "Integrated expertise and knowledge across the real estate spectrum",
    "about.description": "PronaStats provides deep insights for real estate professionals, integrating perspectives of agents, developers, investors, and technology specialists.",
    "about.data.sources": "Data Sources",
    "about.disclaimer": "Important Disclaimer",
    "about.disclaimer.text": "The data presented is for informational purposes and should be supplemented with professional advice before making significant investment or development decisions.",
    "about.mission": "Mission",
    "about.team": "Team",
    "about.our.mission": "Our Mission",
    "about.our.values": "Our Values",
    "about.our.team": "Our Expert Team",
    "about.contact.us": "Contact Us",
    "about.expertise": "Our Expertise",
    "about.agent.expertise": "Agency Expertise",
    "about.developer.expertise": "Development Expertise",
    "about.investor.expertise": "Investment Expertise",
    "about.tech.expertise": "Technology Expertise",
    
    // Misc
    "currency": "ALL",
    "sqm": "sqm",
    "all": "All",
    "loading": "Loading...",
    "no.data": "No data available",
    "view.more": "View more",
    "source": "Source",
    "read.more": "Read more",
    "year.over.year": "Year over Year",
    "quarter.over.quarter": "Quarter over Quarter",
    "month.over.month": "Month over Month",
    "high.demand": "High Demand",
    "medium.demand": "Medium Demand",
    "low.demand": "Low Demand",
    "high.opportunity": "High Opportunity",
    "medium.opportunity": "Medium Opportunity",
    "low.opportunity": "Low Opportunity",
    "high.risk": "High Risk",
    "medium.risk": "Medium Risk",
    "low.risk": "Low Risk"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('sq');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
