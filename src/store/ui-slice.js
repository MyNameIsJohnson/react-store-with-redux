import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",

  initialState: { cartIsVisible: false },
  // map of methods of actions
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
