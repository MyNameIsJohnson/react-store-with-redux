import { uiActions } from "../slices/ui-slice";
import { productActions } from "../slices/product-slice";
export const fetchProductData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Could not fetch cart data.");
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const productData = await fetchData();
      dispatch(
        productActions.replaceCart({
          products: productData.products || [],
          totalQuantity: productData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed",
        })
      );
    }
  };
};
