export type TProductImages = {
  link: string;
  name: string;
};

export type TProduct = {
  _id?: string;
  title: string;
  description: string;
  price: number;
  sizes: string[];
  category: string | null;
  images?: TProductImages[];
  inStock: boolean;
};