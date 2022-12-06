import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    // create reducers: to replaceCart, addItemToCart and removeItemFromCart that take 2 params: state, action.
    // replaceCart should set state totalQuantity to action payload totalQuantity and set state items to action payload items
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
        toast.info(`${action.payload.title} increased by one`, {
          position: "top-left",
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        toast.info(`${action.payload.title} increased by one`, {
          position: "top-left",
        });
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.items.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
  },
});

export const cartActions = cartSlice.actions;

export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice;
