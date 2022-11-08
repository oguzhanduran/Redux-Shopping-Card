import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: null },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type,
        open: action.payload.open, // Whenever we need to open the notification we have to add the open. These three things will be now there into the show notifications. So whenever these three things will be there, the notification will be shown.
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
