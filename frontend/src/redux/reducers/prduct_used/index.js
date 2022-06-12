

import { createSlice } from "@reduxjs/toolkit";

const product_used_slice=createSlice({
    name:"product_used",
    initialState:{
        allProductusedfromUser:[],
        allProductusedApprovedFromUser:[],
        allProductFromAdmin:[],
        allProductApprovedFromAdmin:[],
    },
    reducers:{
        addOrderSaleFromUser:(state,action)=>{
                state.allProductusedfromUser.push(action.payload)
                state.allProductFromAdmin.push(action.payload)
        },

        SetAllProductUsedFromUser:(state,action)=>{
            
            state.allProductusedfromUser=action.payload
        },


        setallProductUsedApprovedFromUser:(state,action)=>{
            state.allProductusedApprovedFromUser=action.payload
        },


        setallProductFromAdmin:(state,action)=>{
            state.allProductFromAdmin=action.payload
        },

        setallProductApprovedFromAdmin:(state,action)=>{
            state.allProductApprovedFromAdmin=action.payload
        },

        requestAccept:(state,action)=>{
            
            
            state.allProductusedApprovedFromUser.push(state.allProductFromAdmin.filter((element)=>{
                return element.used_product_id ===action.payload
            }))


            state.allProductApprovedFromAdmin.push(state.allProductFromAdmin.filter((element)=>{
                return element.used_product_id ===action.payload
            }))
        }
    }
})

const {addOrderSaleFromUser,SetAllProductUsedFromUser,setallProductUsedApprovedFromUser,setallProductFromAdmin,setallProductApprovedFromAdmin,requestAccept}=product_used_slice.actions

export default product_used_slice.reducer