export const totalItem = (cart) => {
    return cart.reduce((sum, product) => sum + product.quantity, 0);
  };
  
  export const totalPrice = (cart) => {
    return cart.reduce((total, product) => total + product.quantity * product.price, 0);
  };
  