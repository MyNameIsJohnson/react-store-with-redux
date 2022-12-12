import { toast } from "react-toastify";

import { cartActions } from "../slice/cart-slice";
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
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
      toast.success(`${cartActions.payload.name} added to cart`, {
        position: "top-left",
      });
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
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      toast.info(`${cartActions.payload.name} sent`, {
        position: "top-left",
      });
    } catch (error) {
      toast.info(`${cartActions.payload.name} error`, {
        position: "top-left",
      });
    }
  };
};
