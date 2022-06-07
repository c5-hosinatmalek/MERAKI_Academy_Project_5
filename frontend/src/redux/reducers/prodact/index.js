import { createSlice } from "@reduxjs/toolkit";
export const productSlice=createSlice({
    name:"product",
    initialState:{
        product:[],
        
        
    },
    reducers:{
        getproduct:(state,action)=>{
            state.product=action.payload
        },
        // payload => sub_catgoryId
        getProductbySubCategoryId:(state,action)=>{
            state.product=state.product.filter((element)=>{
                console.log(element.subCategory_id,action.payload,element.subCategory_id==action.payload);
                return element.subCategory_id==action.payload
            })
        }
    }
})



export const { getproduct,getProductbySubCategoryId } = productSlice.actions;

export default productSlice.reducer;