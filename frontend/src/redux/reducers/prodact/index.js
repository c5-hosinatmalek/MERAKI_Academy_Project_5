import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    subCatgoryProduct: [],
    Pagination: [],
  },
  reducers: {
    getproduct: (state, action) => {
      state.product = action.payload;
    },
    // payload => sub_catgoryId
    setPagination: (state, action) => {
      state.Pagination = action.payload;
    },
  },
});

export const { getproduct, setPagination } = productSlice.actions;

export default productSlice.reducer;
