import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    allPrudact: [],
    resultSerch: [],
    stateserch: false,
    messageSearche: "",
  },
  reducers: {
    setAllproduct: (state, action) => {
      state.allPrudact = action.payload;
    },

    setResultSerch: (state, action) => {
      state.resultSerch = state.allPrudact.filter((element) => {
        return element.title
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
      if (action.payload === "") {
        state.stateserch = false;
      } else {
        state.stateserch = true;
      }

      if (state.resultSerch.length > 0) {
        state.messageSearche = "All search result";
      } else {
        state.messageSearche = "No result";
      }
    },

    setStateSerch: (state, action) => {
      state.stateserch = action.payload;
    },
    getfury:(state,action)=>{
      state.resultSerch=state.resultSerch.filter((element)=>{
      return element.product_name="fury"
      })
    }

  } 

});

export const { setAllproduct, setResultSerch, setStateSerch,getfury } =
  searchSlice.actions;
export default searchSlice.reducer;
