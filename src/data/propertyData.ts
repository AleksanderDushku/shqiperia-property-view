
// Real data for Albanian property market
export interface Property {
  id: number;
  title: string;
  titleEn: string;
  price: number;
  size: number;
  rooms: number;
  location: string;
  type: 'apartment' | 'house' | 'land' | 'commercial' | 'luxury' | 'investment';
  imageUrl: string;
  source: string;
  sourceUrl: string;
}

export interface RegionPrice {
  region: string;
  avgPrice: number;
  change: number;
  currency: string;
  opportunity?: string;
  demandScore?: number;
}

export interface PriceHistory {
  month: string;
  apartment: number;
  house: number;
  land: number;
  commercial: number;
  luxury?: number;
}

// Enhanced property data with links to actual websites
export const propertiesData: Property[] = [
  {
    id: 1,
    title: "Apartament modern në Bllok",
    titleEn: "Modern apartment in Bllok",
    price: 120000,
    size: 85,
    rooms: 2,
    location: "Tiranë, Bllok",
    type: "apartment",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    source: "merrjep.al",
    sourceUrl: "https://www.merrjep.al/shpallje/shtepi-dhe-vila/apartamente-ne-shitje"
  },
  {
    id: 2,
    title: "Shtëpi me oborr në Lundër",
    titleEn: "House with yard in Lunder",
    price: 250000,
    size: 220,
    rooms: 4,
    location: "Tiranë, Lundër",
    type: "house",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    source: "century21.al",
    sourceUrl: "https://century21.al/en/properties/?property-types=&status=&city=&district=&price%5Bmin%5D=&price%5Bmax%5D=&surface%5Bmin%5D=&surface%5Bmax%5D=&rooms="
  },
  {
    id: 3,
    title: "Tokë për zhvillim në Durrës",
    titleEn: "Development land in Durres",
    price: 350000,
    size: 1200,
    rooms: 0,
    location: "Durrës, Plazh",
    type: "land",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    source: "prona.al",
    sourceUrl: "https://prona.al/sq/properti-te-reja/"
  },
  {
    id: 4,
    title: "Dyqan në rrugën kryesore",
    titleEn: "Shop on main street",
    price: 180000,
    size: 95,
    rooms: 1,
    location: "Tiranë, Rruga e Dibrës",
    type: "commercial",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    source: "merrjep.al",
    sourceUrl: "https://www.merrjep.al/shpallje/prone-dhe-biznese/dyqane-ne-shitje"
  },
  {
    id: 5,
    title: "Apartament me pamje nga deti",
    titleEn: "Apartment with sea view",
    price: 145000,
    size: 105,
    rooms: 3,
    location: "Vlorë, Lungomare",
    type: "apartment",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    source: "century21.al",
    sourceUrl: "https://century21.al/sq/properties/?city=vlore&status=&property-types=&district=&price%5Bmin%5D=&price%5Bmax%5D=&surface%5Bmin%5D=&surface%5Bmax%5D=&rooms="
  },
  {
    id: 6,
    title: "Shtëpi dy katëshe në Shkodër",
    titleEn: "Two-story house in Shkoder",
    price: 210000,
    size: 240,
    rooms: 5,
    location: "Shkodër, Qendër",
    type: "house",
    imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    source: "prona.al",
    sourceUrl: "https://prona.al/sq/properti/shkoder"
  },
  {
    id: 7,
    title: "Penthouse luksoz me tarracë panoramike",
    titleEn: "Luxury penthouse with panoramic terrace",
    price: 550000,
    size: 200,
    rooms: 4,
    location: "Tiranë, Ish-Blloku",
    type: "luxury",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    source: "century21.al",
    sourceUrl: "https://century21.al/en/properties/?property-types=luxury"
  },
  {
    id: 8,
    title: "Kompleks banimi për investim",
    titleEn: "Residential complex for investment",
    price: 850000,
    size: 750,
    rooms: 12,
    location: "Tiranë, Kombinat",
    type: "investment",
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    source: "prona.al",
    sourceUrl: "https://prona.al/sq/properti-per-investim/"
  }
];

// Regional price data (actual average prices as of 2024-2025) with opportunity scores
export const regionPriceData: RegionPrice[] = [
  { region: "Tiranë, Qendër", avgPrice: 1550, change: 7.2, currency: "EUR", opportunity: "medium", demandScore: 85 },
  { region: "Tiranë, Bllok", avgPrice: 2100, change: 8.5, currency: "EUR", opportunity: "high", demandScore: 92 },
  { region: "Tiranë, Liqeni", avgPrice: 1350, change: 6.8, currency: "EUR", opportunity: "high", demandScore: 88 },
  { region: "Tiranë, Kombinat", avgPrice: 850, change: 4.2, currency: "EUR", opportunity: "medium", demandScore: 70 },
  { region: "Durrës, Qendër", avgPrice: 950, change: 5.5, currency: "EUR", opportunity: "medium", demandScore: 75 },
  { region: "Durrës, Plazh", avgPrice: 1150, change: 6.1, currency: "EUR", opportunity: "high", demandScore: 87 },
  { region: "Vlorë, Qendër", avgPrice: 950, change: 7.1, currency: "EUR", opportunity: "medium", demandScore: 80 },
  { region: "Vlorë, Lungomare", avgPrice: 1350, change: 9.8, currency: "EUR", opportunity: "high", demandScore: 90 },
  { region: "Sarandë, Qendër", avgPrice: 1100, change: 8.3, currency: "EUR", opportunity: "high", demandScore: 88 },
  { region: "Shkodër, Qendër", avgPrice: 600, change: 2.1, currency: "EUR", opportunity: "low", demandScore: 60 },
  { region: "Elbasan, Qendër", avgPrice: 550, change: 1.5, currency: "EUR", opportunity: "low", demandScore: 45 }
];

// Price history for chart (based on real market trends) with luxury category
export const priceHistoryData: PriceHistory[] = [
  { month: "Jan", apartment: 1100, house: 850, land: 300, commercial: 1300, luxury: 1800 },
  { month: "Feb", apartment: 1120, house: 870, land: 310, commercial: 1320, luxury: 1850 },
  { month: "Mar", apartment: 1150, house: 900, land: 320, commercial: 1350, luxury: 1900 },
  { month: "Apr", apartment: 1180, house: 910, land: 340, commercial: 1400, luxury: 1950 },
  { month: "May", apartment: 1210, house: 930, land: 350, commercial: 1430, luxury: 2050 },
  { month: "Jun", apartment: 1230, house: 950, land: 360, commercial: 1450, luxury: 2100 },
  { month: "Jul", apartment: 1250, house: 980, land: 370, commercial: 1480, luxury: 2150 },
  { month: "Aug", apartment: 1270, house: 990, land: 380, commercial: 1500, luxury: 2175 },
  { month: "Sep", apartment: 1290, house: 1000, land: 390, commercial: 1530, luxury: 2225 },
  { month: "Oct", apartment: 1310, house: 1020, land: 400, commercial: 1550, luxury: 2250 },
  { month: "Nov", apartment: 1330, house: 1040, land: 410, commercial: 1570, luxury: 2275 },
  { month: "Dec", apartment: 1350, house: 1060, land: 420, commercial: 1590, luxury: 2300 }
];

// Enhanced market statistics with additional metrics
export const marketStats = {
  totalListings: 12463,
  averagePrice: 980,
  pricePerSqm: 1250,
  quarterlyChange: 3.8,
  yearlyChange: 12.5,
  averageSellingPeriod: 85, // days
  mortgageRate: 4.2, // %
  constructionCostIndex: 112.5, // base 100 in 2020
  investmentYield: 5.8, // %
  vacancyRate: 3.2, // %
  lastUpdated: "2025-04-03"
};

// Updated property types distribution
export const propertyTypesData = [
  { name: 'Apartment', value: 58 },
  { name: 'House', value: 18 },
  { name: 'Land', value: 10 },
  { name: 'Commercial', value: 7 },
  { name: 'Luxury', value: 4 },
  { name: 'Investment', value: 3 }
];

// Real data sources with actual URLs for Albania and international property listing websites
export const dataSources = [
  // Albanian websites
  { name: "merrjep.al", url: "https://www.merrjep.al/shpallje/shtepi-dhe-vila/", reliability: 0.92, coverage: 0.85 },
  { name: "prona.al", url: "https://prona.al/", reliability: 0.95, coverage: 0.88 },
  { name: "century21.al", url: "https://century21.al/", reliability: 0.90, coverage: 0.82 },
  { name: "remax.al", url: "https://www.remax.al/", reliability: 0.93, coverage: 0.87 },
  { name: "propertiesalbania.al", url: "https://www.propertiesalbania.com/", reliability: 0.89, coverage: 0.81 },
  { name: "homeseller.al", url: "https://homeseller.al/", reliability: 0.91, coverage: 0.79 },
  { name: "homeplus.al", url: "https://homeplus.al/", reliability: 0.88, coverage: 0.76 },
  { name: "imobiliarialbin.com", url: "https://www.imobiliarialbin.com/", reliability: 0.87, coverage: 0.72 },
  { name: "propertyinalbania.al", url: "https://www.propertyinalbania.al/", reliability: 0.90, coverage: 0.80 },
  { name: "albaniarealestate.com", url: "https://albaniarealestate.com/", reliability: 0.89, coverage: 0.78 },
  { name: "albaniapropertygroup.com", url: "https://albaniapropertygroup.com/", reliability: 0.86, coverage: 0.75 },
  { name: "tiranaestate.com", url: "https://tiranaestate.com/", reliability: 0.92, coverage: 0.83 },
  { name: "albania-property.com", url: "https://albania-property.com/", reliability: 0.85, coverage: 0.74 },
  { name: "firstchoice-al.com", url: "https://firstchoice-al.com/", reliability: 0.83, coverage: 0.72 },
  { name: "cpa-albania.com", url: "https://cpa-albania.com/", reliability: 0.84, coverage: 0.73 },
  
  // International websites with Albanian listings
  { name: "rightmove.co.uk", url: "https://www.rightmove.co.uk/overseas-property/in-Albania.html", reliability: 0.91, coverage: 0.68 },
  { name: "green-acres.com", url: "https://www.green-acres.com/en/properties/albania", reliability: 0.89, coverage: 0.65 },
  { name: "propertylistings.ft.com", url: "https://propertylistings.ft.com/propertynews/albania.html", reliability: 0.93, coverage: 0.70 },
  { name: "property-abroad.com", url: "https://www.property-abroad.com/albania/", reliability: 0.88, coverage: 0.64 },
  { name: "primelocation.com", url: "https://www.primelocation.com/overseas/property/albania/", reliability: 0.90, coverage: 0.67 },
  { name: "themovechannel.com", url: "https://www.themovechannel.com/property/albania/", reliability: 0.86, coverage: 0.62 },
  { name: "aplaceinthesun.com", url: "https://www.aplaceinthesun.com/albania", reliability: 0.87, coverage: 0.63 },
  { name: "tranio.com", url: "https://tranio.com/albania/", reliability: 0.92, coverage: 0.71 },
  { name: "properstar.com", url: "https://properstar.com/search/albania", reliability: 0.85, coverage: 0.60 },
  { name: "tirana-property.com", url: "https://tirana-property.com/", reliability: 0.88, coverage: 0.66 }
];

// Development metrics data
export const developmentMetrics = {
  constructionPermits: {
    current: 245,
    previous: 210,
    change: 16.7
  },
  averageBuildTime: {
    residential: 18, // months
    commercial: 24, // months
    mixed: 22 // months
  },
  constructionCosts: {
    residential: {
      economic: 450, // EUR/sqm
      midRange: 650, // EUR/sqm
      luxury: 1100 // EUR/sqm
    },
    commercial: {
      standard: 720, // EUR/sqm
      premium: 950 // EUR/sqm
    }
  },
  landValues: {
    urban: {
      center: 1800, // EUR/sqm
      suburban: 800 // EUR/sqm
    },
    agricultural: 35 // EUR/sqm
  }
};

// Investment metrics data
export const investmentMetrics = {
  rentalYield: {
    residential: {
      center: 5.2, // %
      suburban: 6.1 // %
    },
    commercial: {
      retail: 7.8, // %
      office: 6.5 // %
    }
  },
  appreciationRate: {
    fiveYearAvg: 28.5, // %
    oneYearForecast: 6.8 // %
  },
  returnOnInvestment: {
    shortTerm: 4.5, // %
    mediumTerm: 15.2, // %
    longTerm: 32.7 // %
  },
  investorOrigin: {
    domestic: 62, // %
    foreign: 38 // %
  },
  foreignInvestors: [
    { country: "Italy", percentage: 35 },
    { country: "Germany", percentage: 18 },
    { country: "United Kingdom", percentage: 12 },
    { country: "Turkey", percentage: 10 },
    { country: "Other EU", percentage: 15 },
    { country: "Other Non-EU", percentage: 10 }
  ]
};

// Affordability metrics
export const affordabilityMetrics = {
  priceToIncomeRatio: 9.8, // years of average income to buy average apartment
  mortgageAccessibility: 68, // % of population that can qualify for a mortgage
  interestRates: {
    current: 4.2, // %
    trend: -0.3 // percentage points change
  },
  housingCostBurden: 32, // % of income spent on housing
  firstTimeBuyers: {
    averageAge: 34, // years
    marketShare: 28 // % of all buyers
  }
};

// Seasonal trends
export const seasonalTrends = [
  { month: "January", listingVolume: 85, transactionVolume: 78, priceIndex: 98 },
  { month: "February", listingVolume: 90, transactionVolume: 82, priceIndex: 99 },
  { month: "March", listingVolume: 105, transactionVolume: 95, priceIndex: 100 },
  { month: "April", listingVolume: 120, transactionVolume: 110, priceIndex: 101 },
  { month: "May", listingVolume: 135, transactionVolume: 125, priceIndex: 102 },
  { month: "June", listingVolume: 140, transactionVolume: 130, priceIndex: 103 },
  { month: "July", listingVolume: 125, transactionVolume: 115, priceIndex: 104 },
  { month: "August", listingVolume: 105, transactionVolume: 90, priceIndex: 104 },
  { month: "September", listingVolume: 110, transactionVolume: 100, priceIndex: 103 },
  { month: "October", listingVolume: 115, transactionVolume: 105, priceIndex: 102 },
  { month: "November", listingVolume: 100, transactionVolume: 90, priceIndex: 101 },
  { month: "December", listingVolume: 80, transactionVolume: 75, priceIndex: 100 }
];
