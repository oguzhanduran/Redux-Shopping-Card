import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false }, // to check the user isLoggedIn. We set false by default to see the login page at the beginning.s
  reducers: {
    login(state) {
      // When the function was run, user will log in.
      state.isLoggedIn = true;
    },
    logout(state) {
      // When the function was run, user will log out.
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions; // We exported functions inside of the reducers. (instead of authActions we can send {login, logout})

export default authSlice; // we exported authSlice to add it to index.js inside of the store.js.
