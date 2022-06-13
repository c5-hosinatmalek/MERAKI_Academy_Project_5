import { createSlice } from "@reduxjs/toolkit";
export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    subCatgoryPagination: [],
    pagination: [],
  },
  reducers: {
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    // payload => sub_catgoryId
    subCatgorypagination: (state, action) => {
      state.subCatgoryPagination = action.payload;
    },
  },
});

export const { setPagination, subCatgorypagination} =
  productSlice.actions;

export default productSlice.reducer;
