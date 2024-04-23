export const uploadProducts = async () => {
  const resp = await fetch('/api/new-product', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!resp.ok) {
    throw new Error('что-то пошло не так')
  };

  if (resp.status === 400) {
    throw new Error('товаров нет')
  };

  return await resp.json();
};
