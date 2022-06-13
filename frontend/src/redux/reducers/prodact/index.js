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

    
    setPagination: (state, action) => {
      state.Pagination = action.payload;
    },
        // payload => sub_catgoryId
      getProductBysubCategoryAction:(state,action)=>{
            state.subCatgoryProduct=action.payload
        }
  
}});

export const { getproduct, setPagination,getProductBysubCategoryAction } = productSlice.actions;

    
        
       





export default productSlice.reducer;
