import { createSlice } from "@reduxjs/toolkit";
import { getproduct } from "../prodact";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    products: [],
    soldItem: [],
  },
  reducers: {
    // payload => array of all users
    getUserAction: (state, action) => {
      state.users = action.payload;
      console.log(state.users);
    },
    // payload => array of all products
    getProductAction: (state, action) => {
      state.products = action.payload;
    },
    // payload => array of all sold product
    getSoldItemAction: (state, action) => {
      state.soldItem = action.payload;
    },
    // paylod=>userid
    deleteUserAction:(state,action)=>{
        state.users[action.payload].is_deleted=1
    },
      // paylod=>userid
      makeAdminAction:(state,action)=>{
        state.users[action.payload].role_id=1
    },
    // payload=>[index,updateProductasobj]
    updateProudctsAction:(state,action)=>{
state.products[0]={...state.products[0],...action.payload[1]}
    },
    // payload=>[productIndex,newQuantity]
    updateQuantityAction:(state,action)=>{
      
state.products[action.payload[0]].Store_Quantity=state.products[action.payload[0]].Store_Quantity+(+action.payload[1])
    },
    // payload=>[product_id]
    deleteProductAction:(state,action)=>{
    state.products= state.products.filter((element)=>{
       return element.product_id !== action.payload 
     })
state.products[action.payload].is_deleted=1
    }
  },
});

export const { getUserAction, getProductAction, getSoldItemAction,makeAdminAction,deleteUserAction,updateQuantityAction,deleteProductAction,updateProudctsAction } =
  adminSlice.actions;
export default adminSlice.reducer;
