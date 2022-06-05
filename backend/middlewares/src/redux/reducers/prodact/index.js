import { createSlice } from "@reduxjs/toolkit";
export const productSlice=createSlice({
    name:"product",
    initialState:{
        product:[]
    },
    reducers:{
        getproduct:(state,action)=>{
            state.product=action.payload
        }
    }
})



export const { getproduct } = productSlice.actions;

export default productSlice.reducer;