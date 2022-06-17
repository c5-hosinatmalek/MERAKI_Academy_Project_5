import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    subCatgoryProduct: [],
    number: [],
    productcatogre: [],
  },
  reducers: {
    getproduct: (state, action) => {
      state.product = action.payload;
    },

    // payload => sub_catgoryId
    getProductBysubCategoryAction: (state, action) => {
      state.subCatgoryProduct = action.payload;
    },
    getnumber: (state, action) => {
      state.number = [];
      let counter = state.product.length / 12;
      state.product.forEach((element, index) => {
        if (index < Math.ceil(counter)) {
          state.number.push(index + 1);
        }
      });
    },
    addcatogre: (state, action) => {
      state.productcatogre = action.payload;
      state.number = [];
      let counter = state.productcatogre.length / 12;
      state.productcatogre.forEach((element, index) => {
        if (index < Math.ceil(counter)) {
          state.number.push(index + 1);
        }

      });
    },
  },
});


export const {
  getproduct,
  setPagination,
  getProductBysubCategoryAction,
  getnumber,
  addcatogre,
} = productSlice.actions;

export default productSlice.reducer;
