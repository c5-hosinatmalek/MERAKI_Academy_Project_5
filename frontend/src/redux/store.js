import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import catorgeSlice from "./reducers/catogre";
import productSlice from "./reducers/prodact";
import cartSlice from "./reducers/cart";
import searchSlice from "./reducers/search";
import adminSlice from"./reducers/Admin/index";
export default configureStore({
  reducer: {
    auth: authSlice,
    catogre: catorgeSlice,
    product: productSlice,
    cart: cartSlice,
    search: searchSlice,
    admin:adminSlice
  },
});
