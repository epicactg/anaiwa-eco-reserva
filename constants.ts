import { Amenity, Lot, MarketData, EditableContent } from './types';

export const INITIAL_CONTENT: EditableContent = {
  heroTitle: "ANAIWA ECO RESERVA",
  heroSubtitle: "Donde la naturaleza abraza tu inversión. Lotes exclusivos en la Zona Norte de Cartagena.",
  investmentTitle: "El Momento de Invertir es Ahora",
  investmentBody: "Cartagena de Indias no es solo un destino turístico de talla mundial; es el epicentro del desarrollo inmobiliario en el Caribe. La Zona Norte representa la mayor valorización del país, impulsada por mega-proyectos de infraestructura y un auge turístico sin precedentes. Invertir en Anaiwa es asegurar un patrimonio que crece con la brisa del mar.",
  locationTitle: "Ubicación Estratégica",
  locationBody: "Situado en el corazón del desarrollo, cerca de colegios internacionales, centros hospitalarios de primer nivel y a solo minutos de las playas de Manzanillo. Conectividad total con el Anillo Vial.",
};

export const MOCK_LOTS: Lot[] = Array.from({ length: 24 }, (_, i) => ({
  id: `lot-${i + 1}`,
  number: `L-${i + 1}`,
  area: 450 + (i * 10) + (Math.random() * 50),
  price: 250000000 + (i * 5000000),
  status: i % 5 === 0 ? 'sold' : i % 7 === 0 ? 'reserved' : 'available',
  features: ['Vista al lago', 'Cerca a portería', 'Zona arborizada'].slice(0, Math.floor(Math.random() * 3) + 1)
}));

export const AMENITIES: Amenity[] = [
  {
    id: '1',
    title: 'Eco Trails',
    description: 'Senderos ecológicos para conectar con la fauna y flora nativa.',
    iconName: 'TreePine'
  },
  {
    id: '2',
    title: 'Beach Club',
    description: 'Acceso exclusivo a club de playa con transporte privado.',
    iconName: 'Umbrella'
  },
  {
    id: '3',
    title: 'Zona Wellness',
    description: 'Spa, yoga deck y gimnasio al aire libre.',
    iconName: 'HeartHandshake'
  },
  {
    id: '4',
    title: 'Seguridad 24/7',
    description: 'Monitoreo inteligente y portería de lujo.',
    iconName: 'ShieldCheck'
  }
];

export const ROI_DATA: MarketData[] = [
  { city: 'Cartagena (Zona Norte)', appreciation: 12.5, tourismGrowth: 18 },
  { city: 'Santa Marta', appreciation: 8.2, tourismGrowth: 12 },
  { city: 'Medellín', appreciation: 9.1, tourismGrowth: 14 },
  { city: 'Bogotá', appreciation: 5.5, tourismGrowth: 8 },
  { city: 'Barranquilla', appreciation: 7.8, tourismGrowth: 6 },
];
