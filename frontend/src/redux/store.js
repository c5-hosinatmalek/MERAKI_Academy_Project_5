import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import catorgeSlice from "./reducers/catogre";
import productSlice from "./reducers/prodact";
import cartSlice from "./reducers/cart";
import searchSlice from "./reducers/search";
import product_used_slice from "./reducers/prduct_used";

import homePagehSlice from "./reducers/homepage";

import adminSlice from "./reducers/Admin/index";

import paginationSlice from "./reducers/paginishon";

export default configureStore({
  reducer: {
    auth: authSlice,
    catogre: catorgeSlice,
    product: productSlice,
    cart: cartSlice,
    search: searchSlice,

    home: homePagehSlice,
    pagination: paginationSlice,
    admin: adminSlice,
    product_used: product_used_slice,

  },
});
