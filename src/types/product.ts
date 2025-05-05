export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  freeShipping: boolean;
  compatibility?: string[];
}