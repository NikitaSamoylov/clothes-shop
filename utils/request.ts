import { TProductForUpload } from "@/types/product";

const getResponse = async (
  data: string, method = 'GET', body = null
) => {
  const response = await fetch(data, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  });

  if (response.status !== 200 && response.status !== 400) {
    throw new Error('что-то пошло не так')
  };

  if (response.status === 400) {
    throw new Error('нет данных для отображения')
  };

  return await response.json();
};

export const getProducts = async (url: string) => {
  const uploadedData = await getResponse(url);

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
