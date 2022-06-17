import { createSlice } from "@reduxjs/toolkit";

export const catorgeSlice = createSlice({
  name: "catogre",
  initialState: {
    catorge: [],
    subCategory:[],

  },
  reducers: {
    getcatogre: (state, action) => {
      state.catorge = action.payload;
    },
    getSubCategory:(state,action)=>{
      state.subCategory=action.payload
    },

  },
});

export const { getcatogre,getSubCategory } = catorgeSlice.actions;

export default catorgeSlice.reducer;
