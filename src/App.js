import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./redux/actions/cart-actions";
import {
  fetchWishlistData,
  sendWishlistData,
} from "./redux/actions/wishlist-actions";
// Pages
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
// Components
import { Header, Footer } from "./components";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import NotFound from "./pages/notFound/NotFound";
import Wishlist from "./pages/wishlist/Wishlist";

let isInitial = true;
function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const userId = useSelector((state) => state.auth.userID);
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartData(userId));
      dispatch(fetchWishlistData(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      console.log(isInitial);

      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart, userId, email));
    }
    if (wishlist.changed) {
      dispatch(sendWishlistData(wishlist, userId, email));
    }
  }, [cart, wishlist, userId, email, dispatch]);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
