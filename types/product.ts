export type TProduct = {
  _id?: string;
  title: string;
  description: string;
  price: number;
  sizes: string[];
  category: string | null;
  images?: string[];
  inStock: boolean;
};