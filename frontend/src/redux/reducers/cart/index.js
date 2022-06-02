import { createSlice } from "@reduxjs/toolkit";

export const cartSlice=createSlice({
name:"cart",
initialState:{
    cart:[]
},
reducers:{
    getCart:(state,action)=>{
        state.cart=action.payload
    },
    deleteFromCart:(state,action)=>{
        state.cart=state.cart.filter((element,index)=>{
        return action.payload!==element.id
        })
    }
}
})


export const { getCart,deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;