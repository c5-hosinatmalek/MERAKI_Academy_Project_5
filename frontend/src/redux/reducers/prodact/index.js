import { createSlice } from "@reduxjs/toolkit";
export const productSlice=createSlice({
    name:"product",
    initialState:{
        product:[],
        subCatgoryProduct:[],
        
    },
    reducers:{
        getproduct:(state,action)=>{
            state.product=action.payload
        },
        // payload => sub_catgoryId
        getProductBysubCategoryAction:(state,action)=>{
            state.subCatgoryProduct=action.payload
        }
    }
})



export const { getproduct,getProductBysubCategoryAction } = productSlice.actions;

export default productSlice.reducer;