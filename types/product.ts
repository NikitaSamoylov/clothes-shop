export type TProduct = {
  title: string;
  description: string;
  price: number;
  sizes: string[];
  category: string | null;
  images?: string[];
  inStock: boolean;
};