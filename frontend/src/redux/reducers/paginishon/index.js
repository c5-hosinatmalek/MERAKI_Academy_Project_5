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
      
      if(action.payload[2]==0&& state.number.length==0){
        for(let i=0;i<Math.ceil(action.payload[0].length/12);i++){
  state.number.push(i)
        }

      }
      if(action.payload){
        state.productAfterPagtion=action.payload[0].slice(0+(12*(action.payload[1])),12+(12*(action.payload[1])))

      }
      
    }
  },
});

export const { setPagination, subCatgorypagination,paginationAction} =
paginationSlice.actions;

export default paginationSlice.reducer;
