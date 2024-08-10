const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
        cartCount: state.cart.length + 1,
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product_id !== action.payload.product_id),
        cartCount: state.cart.length - 1,
      };
    case 'UPDATE_CART_COUNT':
      return {
        ...state,
        cartCount: action.payload,
      };
    case 'LOAD_CART':
      return {
        ...state,
        cart: action.payload,
        cartCount: action.payload.length,
      };
    default:
      return state;
  }
};

export default cartReducer;
