export type TProductImages = {
  link: string;
  name: string;
};

export type TProduct = {
  userId?: string;
  _id?: string;
  count?: number;
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

export type TUserCart = {
  userId: string | undefined;
  goods: TProduct[];
};