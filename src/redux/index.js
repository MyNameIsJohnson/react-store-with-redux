import uiSlice from "./slices/ui-slice";
import cartSlice from "./slices/cart-slice";
import productSlice from "./slices/product-slice";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";

const rootReducer = combineReducers({
  auth: authReducer,

  ui: uiSlice.reducer,
  cart: cartSlice.reducer,
  product: productSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
