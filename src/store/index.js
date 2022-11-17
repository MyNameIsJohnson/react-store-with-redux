import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";

const store = configureStore({
  // root reducer
  reducer: { ui: uiSlice.reducer },
});

export default store;
