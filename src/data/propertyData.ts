
// Mock data for Albanian property market
export interface Property {
  id: number;
  title: string;
  titleEn: string;
  price: number;
  size: number;
  rooms: number;
  location: string;
  type: 'apartment' | 'house' | 'land' | 'commercial';
  imageUrl: string;
  source: string;
}

export interface RegionPrice {
  region: string;
  avgPrice: number;
  change: number;
  currency: string;
}

export interface PriceHistory {
  month: string;
  apartment: number;
  house: number;
  land: number;
  commercial: number;
}

// Mock properties data
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
    source: "merrjep.al"
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
    source: "century21.al"
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
    source: "prona.al"
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
    source: "merrjep.al"
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
    source: "century21.al"
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
    source: "prona.al"
  }
];

// Regional price data
export const regionPriceData: RegionPrice[] = [
  { region: "Tiranë", avgPrice: 1250, change: 5.2, currency: "EUR" },
  { region: "Durrës", avgPrice: 850, change: 3.5, currency: "EUR" },
  { region: "Vlorë", avgPrice: 950, change: 7.1, currency: "EUR" },
  { region: "Sarandë", avgPrice: 1100, change: 8.3, currency: "EUR" },
  { region: "Shkodër", avgPrice: 600, change: 2.1, currency: "EUR" },
  { region: "Elbasan", avgPrice: 550, change: 1.5, currency: "EUR" }
];

// Price history for chart
export const priceHistoryData: PriceHistory[] = [
  { month: "Jan", apartment: 1100, house: 850, land: 300, commercial: 1300 },
  { month: "Feb", apartment: 1120, house: 870, land: 310, commercial: 1320 },
  { month: "Mar", apartment: 1150, house: 900, land: 320, commercial: 1350 },
  { month: "Apr", apartment: 1180, house: 910, land: 340, commercial: 1400 },
  { month: "May", apartment: 1210, house: 930, land: 350, commercial: 1430 },
  { month: "Jun", apartment: 1230, house: 950, land: 360, commercial: 1450 },
  { month: "Jul", apartment: 1250, house: 980, land: 370, commercial: 1480 },
  { month: "Aug", apartment: 1270, house: 990, land: 380, commercial: 1500 },
  { month: "Sep", apartment: 1290, house: 1000, land: 390, commercial: 1530 },
  { month: "Oct", apartment: 1310, house: 1020, land: 400, commercial: 1550 },
  { month: "Nov", apartment: 1330, house: 1040, land: 410, commercial: 1570 },
  { month: "Dec", apartment: 1350, house: 1060, land: 420, commercial: 1590 }
];

// Market statistics
export const marketStats = {
  totalListings: 12463,
  averagePrice: 980,
  pricePerSqm: 1250,
  quarterlyChange: 3.8,
  yearlyChange: 12.5,
  lastUpdated: "2025-04-03"
};

// Property types distribution
export const propertyTypesData = [
  { name: 'Apartment', value: 65 },
  { name: 'House', value: 20 },
  { name: 'Land', value: 10 },
  { name: 'Commercial', value: 5 }
];

// Data sources
export const dataSources = [
  { name: "merrjep.al", url: "https://www.merrjep.al" },
  { name: "prona.al", url: "https://www.prona.al" },
  { name: "century21.al", url: "https://www.century21.al" },
  { name: "remax.al", url: "https://www.remax.al" },
  { name: "propertiesalbania.al", url: "https://www.propertiesalbania.al" }
];
