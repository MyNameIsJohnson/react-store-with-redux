import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishlistItems: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
  wishlistTotalQuantity: 0,
  wishlistTotalAmount: 0,
  previousURL: "",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    REPLACE_WISHLIST(state, action) {
      state.wishlistTotalQuantity = action.payload.wishlistTotalQuantity;
      state.wishlistItems = action.payload.wishlistItems;
    },
    ADD_TO_WISHLIST(state, action) {
      const newItem = action.payload;
      console.log(state);
      const existingItem = state.wishlistItems.find(
        (item) => item.id === newItem.id
      );
      state.wishlistTotalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.wishlistItems.push({
          id: newItem.id,
          price: newItem.price,
          wishlistQuantity: 1,
          wishlistTotalAmount: newItem.price,
          title: newItem.title,
          images: newItem.images,
        });
        toast.info(`${action.payload.title} Added to wishlist`, {
          position: "top-left",
        });
      } else {
        existingItem.wishlistQuantity++;
        existingItem.wishlistTotalAmount =
          existingItem.wishlistTotalAmount + newItem.price;
        toast.info(`${action.payload.title} increased in wishlist`, {
          position: "top-left",
        });
      }
    },

    REMOVE_FROM_WISHLIST(state, action) {
      const id = action.payload.id;
      console.log(id);
      const existingItem = state.wishlistItems.find((item) => item.id === id);
      console.log(existingItem);
      state.wishlistTotalQuantity--;
      state.changed = true;
      if (existingItem.wishlistQuantity === 1) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== id
        );
      } else {
        existingItem.wishlistQuantity--;
        existingItem.wishlistTotalAmount =
          existingItem.wishlistTotalAmount - existingItem.price;
      }
    },
    CLEAR_WISHLIST(state, action) {
      state.wishlistItems = [];
      toast.info(`Wishlist cleared`, {
        position: "top-left",
      });

      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.wishlistItems.map((item) => {
        const { price, wishlistQuantity } = item;
        const wishlistItemAmount = price * wishlistQuantity;
        return array.push(wishlistItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.wishlistTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.wishlistItems.map((item) => {
        const { wishlistQuantity } = item;
        const quantity = wishlistQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.wishlistTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_WISHLIST,
  DECREASE_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.wishlistItems;
export const selectWishlistTotalQuantity = (state) =>
  state.wishlist.wishlistTotalQuantity;
export const selectWishlistTotalAmount = (state) =>
  state.wishlist.wishlistTotalAmount;
export const selectPreviousURL = (state) => state.wishlist.previousURL;
export const wishlistActions = wishlistSlice.actions;

export default wishlistSlice.reducer;
