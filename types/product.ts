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
  brand: string;
};

export type TProductForUpload = TProduct & {
  createdAt: string;
  updatedAt: string;
  _v: number;
};