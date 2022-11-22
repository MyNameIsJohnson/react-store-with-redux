import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
// import { uiActions } from "./store/ui-slice";
import { fetchCartData, sendCartData } from "./store/cart-actions";
let isInitial = true;

function App() {
  const dispatch = useDispatch();

  // drill into cartIsVisible
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  console.log(notification);

  // Two ways to handle side effect, async tasks and redux
  // 1. Inside the components (e.g. useEffect())
  // const sendCartData = async () => {
  // dispatch(
  //   uiActions.showNotification({
  //     status: "pending",
  //     title: "Sending...",
  //     message: "Sending cart data",
  //   })
  // );
  // const response = await fetch(
  //   "https://react-redux-store-project-default-rtdb.firebaseio.com/cart.json",
  //   {
  //     method: "PUT",
  //     body: JSON.stringify(cart),
  //   }
  // );
  // if (!response.ok) {
  //   throw new Error("Sending cart data failed.");
  // }
  // const responseData = await response.json();
  // ^^^ don't care about the response data in this case, because for sending the card data I'm not interested in any response. So I don't even need to get to the response data. Instead, knowing that I don't have an error is enough.
  // dispatch(
  //   uiActions.showNotification({
  //     status: "success",
  //     title: "Success!",
  //     message: "Sending cart data successfully",
  //   })
  // );
  // };
  // if (isInitial) {
  //   isInitial = false;
  //   console.log(isInitial);
  //   return;
  // }
  // sendCartData().catch((error) => {
  //   dispatch(
  //     uiActions.showNotification({
  //       status: "error",
  //       title: "Error!",
  //       message: "Sending cart data failed",
  //     })
  //   );
  // });
  // 2. Inside the action creators (e.g. sendCartData from store/cart-slice)
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      console.log(isInitial);

      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
