import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Pages
import { Home, Contact, Login, Register, Reset } from "./pages";
// Components
import { Header, Footer } from "./components";

import Cart from "./components/cart/Cart";
import Layout from "./components/layout/Layout";
import Notification from "./components/ui/Notification";

import { fetchProductData } from "./redux/actions/product-actions";
import { fetchCartData, sendCartData } from "./redux/actions/cart-actions";

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

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
  }, [cart, dispatch]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Layout>
          {notification && (
            <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />
          )}

          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Layout>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
