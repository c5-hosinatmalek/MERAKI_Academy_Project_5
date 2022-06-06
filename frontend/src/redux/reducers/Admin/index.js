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
        console.log(action.payload);
        state.users[action.payload].is_deleted=1
    },
      // paylod=>userid
      makeAdminAction:(state,action)=>{
        state.users[action.payload].role_id=1
    },
    // payload=>[productIndex,newQuantity]
    updateQuantityAction:(state,action)=>{
      
state.products[action.payload[0]].Store_Quantity=state.products[action.payload[0]].Store_Quantity+(+action.payload[1])
    }
  },
});

export const { getUserAction, getProductAction, getSoldItemAction,makeAdminAction,deleteUserAction,updateQuantityAction } =
  adminSlice.actions;
export default adminSlice.reducer;
