export const formatPrice = (value: string) => {
  return new Intl.NumberFormat(value, {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  });
};