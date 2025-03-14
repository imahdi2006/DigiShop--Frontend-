const cartReducer = (cart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === product._id
      );

      const { product, quantity } = action.payload;

      if (productIndex === -1) {
        updatedCart.push({ product, quantity });
      } else {
        updatedCart[productIndex].quantity += quantity;
      }
      return updatedCart;

    case "GET_CART":
      return action.payload.product;

    case "REVERT-CART":
      return action.payload.cart;

    case "REMOVE-FROM-CART":
      const oldCart = [...cart];
      const newCart = oldCart.filter(
        (item) => item.product._id !== action.payload.id
      );
      return newCart;
  }
};

export default cartReducer;
