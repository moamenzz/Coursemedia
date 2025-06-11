export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const calculateDiscountPercentage = (
  price: number,
  previousPrice: number
): number => {
  if (price >= previousPrice) return 0;
  const discount = ((previousPrice - price) / previousPrice) * 100;
  return Math.round(discount);
};
