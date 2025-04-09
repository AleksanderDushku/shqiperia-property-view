
export interface NeighborhoodData {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  avgPrice: number;
  priceChange: number;
  propertyTypes: Array<{
    type: string;
    percentage: number;
  }>;
  amenities: Array<{
    icon: string;
    name: string;
    nameEn: string;
    rating: number;
  }>;
  commuteTimes: Array<{
    place: string;
    placeEn: string;
    time: number;
    transport: "car" | "bus";
  }>;
  priceTrend: Array<{
    year: string;
    price: number;
  }>;
}
