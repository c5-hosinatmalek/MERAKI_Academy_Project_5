import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    usedcart: [],
    totalprice: 0,
    amount:0
  },
  reducers: {
    getCart: (state, action) => {
      state.cart = action.payload;
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((element, index) => {
        return action.payload !== element.product_id;
      });
    },
    // acteion index of [element,newquantity]
    updateQuantity: (state, action) => {
      state.cart[action.payload[0]].quantity = action.payload[1];
    },
    checkoutAction: (state, action) => {
      state.cart = [];
    },
    totalPriceAction: (state, action) => {
      state.totalprice = state.totalprice + action.payload;
    },
    addToUsed: (state, action) => {
      state.usedcart = action.payload;
    },
    deleteusedpro: (state, action) => {
        state.usedcart= state.usedcart.filter((element) => {
        return element.used_product_id !== action.payload;
      });
    },
    deleteallused:(state,action)=>{
      state.usedcart=[]
    },
    price:(state,action)=>{
      state.amount=action.payload
    }
  },
});

export const {
  getCart,
  deleteFromCart,
  updateQuantity,
  checkoutAction,
  totalPriceAction,
  addToUsed,
  deleteusedpro,
  deleteallused,
  price
} = cartSlice.actions;

export default cartSlice.reducer;
