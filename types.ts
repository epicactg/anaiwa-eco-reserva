export interface Lot {
  id: string;
  number: string;
  area: number; // in sq meters
  price: number; // in COP
  status: 'available' | 'reserved' | 'sold';
  features: string[];
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface MarketData {
  city: string;
  appreciation: number;
  tourismGrowth: number;
}

export interface EditableContent {
  heroTitle: string;
  heroSubtitle: string;
  investmentTitle: string;
  investmentBody: string;
  locationTitle: string;
  locationBody: string;
}
