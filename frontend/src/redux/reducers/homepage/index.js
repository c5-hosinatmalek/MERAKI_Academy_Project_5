import { createSlice } from "@reduxjs/toolkit";

const homePagehSlice = createSlice({
  name: "home",
  initialState: {
    homePageItems: [],
  },
  reducers: {
    setHomeItems: (state, action) => {
      state.homePageItems = action.payload;
    },

    deleteslide: (state, action) => {

      state.homePageItems =
        state.homePageItems.filter((element, index) => {
          console.log(element.pic_id ,action.payload,element.pic_id !== action.payload.id);
          return element.pic_id !== action.payload;
        });
    },
    updateslide: (state, action) => {
      state.homePageItems &&
        state.homePageItems.map((element) => {
          console.log(element);
          if (element.pic_id == action.payload.id) {
            element.url = action.payload.url || element.url;
            element.product_Id = action.product_Id || action.payload.product_Id;
          }
        });
    },
    addtoslide:(state,action)=>{
      state.homePageItems.push(action.payload)
    }
  },
});

export const { setHomeItems, updateslide, deleteslide,addtoslide } =
  homePagehSlice.actions;
export default homePagehSlice.reducer;
