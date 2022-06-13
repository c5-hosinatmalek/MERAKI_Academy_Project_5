import { createSlice } from "@reduxjs/toolkit";
export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    subCatgoryPagination: [],
    pagination: [],
    number: [],
  },
  reducers: {
    setPagination: (state, action) => {
      console.log(action.payload);
      state.pagination = action.payload;
    },
    subCatgorypagination: (state, action) => {
      state.subCatgoryPagination = action.payload;
    },
  },
});

export const { setPagination, subCatgorypagination} =
paginationSlice.actions;

export default paginationSlice.reducer;
