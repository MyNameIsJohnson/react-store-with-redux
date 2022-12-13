import { toast } from "react-toastify";

import { cartActions } from "../slice/cartSlice";
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-redux-store-project-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data.");
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          cartItems: cartData.cartItems || [],
          cartTotalQuantity: cartData.cartTotalQuantity,
        })
      );
      // toast.success(`You have items in your cart`, {
      //   position: "top-left",
      // });
    } catch (error) {
      console.log(error);
    }
  };
};
export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-store-project-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            cartItems: cart.cartItems,
            cartTotalQuantity: cart.cartTotalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      // toast.info(`Cart has items`, {
      //   position: "top-left",
      // });
    } catch (error) {
      toast.info(error.message, {
        position: "top-left",
      });
    }
  };
};
