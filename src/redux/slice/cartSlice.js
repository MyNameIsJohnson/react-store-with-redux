import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    REPLACE_CART(state, action) {
      state.cartTotalQuantity = action.payload.cartTotalQuantity;
      state.cartItems = action.payload.cartItems;
    },
    ADD_TO_CART(state, action) {
      const newItem = action.payload;
      console.log(state);
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.cartTotalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          cartQuantity: 1,
          cartTotalAmount: newItem.price,
          title: newItem.title,
          images: newItem.images,
        });
        toast.info(`${action.payload.title} Added to cart`, {
          position: "top-left",
        });
      } else {
        existingItem.cartQuantity++;
        existingItem.cartTotalAmount =
          existingItem.cartTotalAmount + newItem.price;
        toast.info(`${action.payload.title} Removed from cart`, {
          position: "top-left",
        });
      }
    },
    DECREASE_CART(state, action) {
      console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.title} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.title} removed from cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      const id = action.payload.id;
      console.log(id);
      const existingItem = state.cartItems.find((item) => item.id === id);
      console.log(existingItem);
      state.cartTotalQuantity--;
      state.changed = true;
      if (existingItem.cartQuantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.cartQuantity--;
        existingItem.cartTotalAmount =
          existingItem.cartTotalAmount - existingItem.price;
      }
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info(`Cart cleared`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
