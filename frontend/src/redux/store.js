import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { catorgeSlice } from "./reducers/catogre";
import { productSlice } from "./reducers/prodact";
export default configureStore({
  reducer: {
    auth: authSlice,
    catogre: catorgeSlice,
    product:productSlice,
    
  },
});


