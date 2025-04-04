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
    "nav.properties": "Pronat",
    "nav.about": "Rreth Nesh",
    
    // Dashboard
    "dashboard.title": "Paneli Kryesor i Tregut të Pronave",
    "dashboard.subtitle": "Statistika në kohë reale për tregun e pronave në Shqipëri",
    "dashboard.avg.price": "Çmimi mesatar",
    "dashboard.total.listings": "Prona në shitje",
    "dashboard.price.sqm": "Çmimi për m²",
    "dashboard.price.trends": "Trendet e Çmimeve",
    "dashboard.price.regions": "Çmimet sipas Rajoneve",
    "dashboard.last.updated": "Përditësuar së fundmi",
    
    // Property Types
    "property.apartment": "Apartament",
    "property.house": "Shtëpi",
    "property.land": "Tokë",
    "property.commercial": "Komerciale",
    
    // Regions
    "region.tirana": "Tiranë",
    "region.durres": "Durrës",
    "region.vlore": "Vlorë",
    "region.sarande": "Sarandë",
    "region.shkoder": "Shkodër",
    "region.elbasan": "Elbasan",
    
    // Market page
    "market.title": "Analiza e Tregut",
    "market.subtitle": "Trendet dhe statistikat e tregut të pronave në Shqipëri",
    "market.price.evolution": "Evolucioni i Çmimeve",
    "market.quarterly.change": "Ndryshimet Tremujore",
    "market.supply.demand": "Oferta dhe Kërkesa",
    
    // Properties page
    "properties.title": "Lista e Pronave",
    "properties.subtitle": "Pronat më të fundit në shitje nga burime të ndryshme",
    "properties.filter": "Filtro",
    "properties.sort": "Rendit",
    "properties.search": "Kërko",
    "properties.price": "Çmimi",
    "properties.size": "Sipërfaqja",
    "properties.rooms": "Dhoma",
    "properties.location": "Vendndodhja",
    
    // Crawler
    "crawler.website": "Faqja",
    "crawler.listing_count": "Numri i Pronave",
    "crawler.last_update": "Përditësimi i Fundit",
    "crawler.status": "Statusi",
    "crawler.visit": "Vizito",
    "crawler.success": "Sukses",
    "crawler.pending": "Në pritje",
    "crawler.failed": "Dështoi",
    "crawler.description": "Të dhënat tona grumbullohen nga faqet më të mira të pronave në Shqipëri",
    
    // About page
    "about.title": "Rreth Nesh",
    "about.subtitle": "Informacion mbi shërbimin tonë dhe ekipin që e bën të mundur",
    "about.description": "PronaStats ofron statistika dhe të dhëna mbi tregun e pronave në Shqipëri, duke mbledhur informacione nga burime të ndryshme për t'ju ofruar një pamje gjithëpërfshirëse të tregut.",
    "about.data.sources": "Burimet e të Dhënave",
    "about.disclaimer": "Shënim i Rëndësishëm",
    "about.disclaimer.text": "Të dhënat e paraqitura në këtë faqe janë vetëm për qëllime informative dhe nuk përbëjnë këshillë financiare apo të investimeve.",
    "about.mission": "Misioni",
    "about.team": "Ekipi",
    "about.our.mission": "Misioni Ynë",
    "about.our.values": "Vlerat Tona",
    "about.our.team": "Ekipi Ynë",
    "about.contact.us": "Na Kontaktoni",
    
    // Misc
    "currency": "Lekë",
    "sqm": "m²",
    "all": "Të gjitha",
    "loading": "Duke u ngarkuar...",
    "no.data": "Nuk ka të dhëna",
    "view.more": "Shiko më shumë"
  },
  
  en: {
    // Header
    "site.title": "PronaStats",
    "nav.dashboard": "Dashboard",
    "nav.market": "Market",
    "nav.properties": "Properties",
    "nav.about": "About",
    
    // Dashboard
    "dashboard.title": "Real Estate Market Dashboard",
    "dashboard.subtitle": "Real-time statistics for the Albanian property market",
    "dashboard.avg.price": "Average Price",
    "dashboard.total.listings": "Properties For Sale",
    "dashboard.price.sqm": "Price per sqm",
    "dashboard.price.trends": "Price Trends",
    "dashboard.price.regions": "Prices by Region",
    "dashboard.last.updated": "Last updated",
    
    // Property Types
    "property.apartment": "Apartment",
    "property.house": "House",
    "property.land": "Land",
    "property.commercial": "Commercial",
    
    // Regions
    "region.tirana": "Tirana",
    "region.durres": "Durres",
    "region.vlore": "Vlore",
    "region.sarande": "Sarande",
    "region.shkoder": "Shkoder",
    "region.elbasan": "Elbasan",
    
    // Market page
    "market.title": "Market Analysis",
    "market.subtitle": "Trends and statistics for the Albanian property market",
    "market.price.evolution": "Price Evolution",
    "market.quarterly.change": "Quarterly Changes",
    "market.supply.demand": "Supply and Demand",
    
    // Properties page
    "properties.title": "Property Listings",
    "properties.subtitle": "Latest properties for sale from various sources",
    "properties.filter": "Filter",
    "properties.sort": "Sort",
    "properties.search": "Search",
    "properties.price": "Price",
    "properties.size": "Size",
    "properties.rooms": "Rooms",
    "properties.location": "Location",
    
    // Crawler
    "crawler.website": "Website",
    "crawler.listing_count": "Listings",
    "crawler.last_update": "Last Update",
    "crawler.status": "Status",
    "crawler.visit": "Visit",
    "crawler.success": "Success",
    "crawler.pending": "Pending",
    "crawler.failed": "Failed",
    "crawler.description": "Our data is collected from the best property websites in Albania",
    
    // About page
    "about.title": "About Us",
    "about.subtitle": "Information about our service and the team behind it",
    "about.description": "PronaStats provides statistics and data about the Albanian property market, gathering information from various sources to give you a comprehensive view of the market.",
    "about.data.sources": "Data Sources",
    "about.disclaimer": "Important Disclaimer",
    "about.disclaimer.text": "The data presented on this site is for informational purposes only and does not constitute financial or investment advice.",
    "about.mission": "Mission",
    "about.team": "Team",
    "about.our.mission": "Our Mission",
    "about.our.values": "Our Values",
    "about.our.team": "Our Team",
    "about.contact.us": "Contact Us",
    
    // Misc
    "currency": "ALL",
    "sqm": "sqm",
    "all": "All",
    "loading": "Loading...",
    "no.data": "No data available",
    "view.more": "View more"
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
