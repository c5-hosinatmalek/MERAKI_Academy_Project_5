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
        getProductbySubCategoryId:(state,action)=>{
            state.subCatgoryProduct=state.product.filter((element)=>{
                return element.subCategory_id==action.payload
            })
        }
    }
})



export const { getproduct,getProductbySubCategoryId } = productSlice.actions;

export default productSlice.reducer;