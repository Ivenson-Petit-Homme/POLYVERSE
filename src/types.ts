export type NavigationTab =
  | 'home'
  | 'about'
  | 'services'
  | 'order-service'
  | 'shop'
  | 'portfolio'
  | 'donate'
  | 'partnership'
  | 'contact';

export type ServiceCategory = 'design' | 'tech' | 'finance';

export interface ShopProduct {
  id: string;
  name: string;
  category: 'textile' | 'tech-finance' | 'goodies' | 'branding';
  categoryLabel: string;
  priceUSD: number;
  priceHTG: number;
  description: string;
  imageUrl: string;
  badge?: string;
  availableColors?: string[];
  availableSizes?: string[];
  inStock: boolean;
  minQuantity?: number;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface AffiliateCode {
  code: string;
  influencerName: string;
  discountPercentage: number;
  commissionPercentage: number;
  platform?: string;
}

export interface SpecialServiceRequest {
  id: string;
  serviceType: 'achat-sans-carte' | 'shipping' | 'planification-evenement';
  productName: string;
  productUrl?: string;
  quantity: number;
  color?: string;
  size?: string;
  estimatedPrice?: string;
  description: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  deliveryAddress: string;
  date: string;
}

export interface Pillar {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  color: string;
  features: string[];
  examples: string[];
  tagline: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  highlights: string[];
  icon: string;
  avatarBg: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  client: string;
  description: string;
  results?: string;
  tags: string[];
  imageUrl: string;
  date: string;
  featured?: boolean;
}

export interface TargetAudience {
  id: string;
  title: string;
  description: string;
  icon: string;
  suitableServices: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  service: ServiceCategory | 'multiple' | 'other';
  budget?: string;
  message: string;
}

export interface QuoteItem {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  estimatedDays: string;
  basePriceText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: ServiceCategory | 'general';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  category: ServiceCategory;
  content: string;
  rating: number;
  avatarUrl?: string;
  date: string;
  verified?: boolean;
}

