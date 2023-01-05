import { toast } from "react-toastify";

import { wishlistActions } from "../slice/wishlistSlice";
export const fetchWishlistData = (user) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://react-redux-store-project-default-rtdb.firebaseio.com/cart/users/${user}/wishlist.json`
      );
      if (!response.ok) {
        throw new Error("Could not fecth wishlist data.");
      }
      const data = await response.json();
      return data;
    };
    try {
      const wishlistData = await fetchData();
      dispatch(
        wishlistActions.REPLACE_WISHLIST({
          wishlist: wishlistData.wishlistItems || [],
          wishlistTotalQuantity: wishlistData.wishlistTotalQuantity,
        })
      );
      toast.success(`You have items in your wishlist`, {
        position: "top-left",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const sendWishlistData = (wishlist, user, email) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        `https://react-redux-store-project-default-rtdb.firebaseio.com/cart/users/${user}/wishlist.json`,
        {
          method: "PUT",

          body: JSON.stringify({
            wishlistItems: wishlist.wishlistItems,
            wishlistTotalQuantity: wishlist.wishlistTotalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending wishlist data failed.");
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
