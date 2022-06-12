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
        
    }
})



export const { getproduct } = productSlice.actions;

export default productSlice.reducer;