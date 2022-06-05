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
            
        return action.payload!==element.product_id
        })
    },
    // acteion index of [element,newquantity] 
    updateQuantity:(state,action)=>{
        
state.cart[action.payload[0]].quantity=action.payload[1]
    },
    checkoutAction:(state,action)=>{
state.cart=[]
console.log(state.cart,111);
    }
}
})


export const { getCart,deleteFromCart,updateQuantity,checkoutAction } = cartSlice.actions;

export default cartSlice.reducer;