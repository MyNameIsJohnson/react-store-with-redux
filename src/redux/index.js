import uiSlice from "./slices/ui-slice";
import cartSlice from "./slices/cart-slice";
import productSlice from "./slices/product-slice";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
// import productReducer from "./slice/product-slice";
import filterReducer from "./slices/filter-slice";
// import cartReducer from "./slice/cart-slice";
import checkoutReducer from "./slices/checkout-slice";
import orderReducer from "./slices/order-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
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
