import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "" || localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      localStorage.setItem("token",action.payload)
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
