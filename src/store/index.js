import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  // root reducer
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
