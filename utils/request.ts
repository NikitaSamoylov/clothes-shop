import { TProductForUpload } from "@/types/product";
import { TOrder, TUserCart } from "@/types/product";

export const getResponse = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: TOrder | TUserCart | null = null
) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  });

  if (
    response.status !== 200 &&
    response.status !== 400
  ) {
    throw new Error('Что-то пошло не так')
  };

  if (response.status === 400) {
    throw new Error('Нет данных для отображения')
  };

  return await response.json();
};

export const getProducts = async (url: string) => {
  const uploadedData = await getResponse(url, 'GET');

  return uploadedData.products.map((
    el: TProductForUpload
  ) => {
    return {
      _id: el._id,
      title: el.title,
      description: el.description,
      price: el.price,
      sizes: el.sizes,
      category: el.category,
      images: el.images,
      inStock: el.inStock,
      brand: el.brand,
    };
  });
};
