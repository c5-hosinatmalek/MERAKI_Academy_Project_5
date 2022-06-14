import { createSlice } from "@reduxjs/toolkit";
export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    subCatgoryPagination: [],
    pagination: [],
    number: [],
    productAfterPagtion:[]
  },
  reducers: {
    setPagination: (state, action) => {
      console.log(action.payload);
      state.pagination = action.payload;
    },
    subCatgorypagination: (state, action) => {
      state.subCatgoryPagination = action.payload;
    },
    // payload=>([allproductbeforePagintion,number of page])
    paginationAction:(state,action)=>{
      state.number=Math.ceil(action.payload[0]/12)
      state.productAfterPagtion=state.payload[0].slice(0+12*action.payload[1],12+12*action.payload[1])
    }
  },
});

export const { setPagination, subCatgorypagination,paginationAction} =
paginationSlice.actions;

export default paginationSlice.reducer;
