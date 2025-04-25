export const getCartFromLS = () => {
  const items = localStorage.getItem('cart');
  return items ? JSON.parse(items) : [];
};
