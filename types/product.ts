export type TProductSize = {
  value: string;
  label: string;
};

export type TProduct = {
  title: string;
  description: string;
  price: string;
  size: TProductSize;
  category: string;
  images?: string[];
};