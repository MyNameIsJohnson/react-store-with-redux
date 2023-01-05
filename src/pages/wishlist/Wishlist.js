import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SAVE_URL,
  selectWishlistItems,
} from "../../redux/slice/wishlistSlice";
import { ADD_TO_CART } from "../../redux/slice/cartSlice";

import styles from "./Wishlist.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlistItems = useSelector(selectWishlistItems);
  console.log(wishlistItems);
  const dispatch = useDispatch();

  const addToCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const removeFromWishlist = (wishlist) => {
    dispatch(REMOVE_FROM_WISHLIST(wishlist));
  };

  const clearWishlist = () => {
    dispatch(CLEAR_WISHLIST());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [wishlistItems, dispatch]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <>
            <p>Your wishlist is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Add to cart</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((wishlist, index) => {
                  const { id, title, price, images, wishlistQuantity } =
                    wishlist;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{title}</b>
                        </p>
                        <img
                          src={images[0]}
                          alt={title}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => addToCart(wishlist)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * wishlistQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromWishlist(wishlist)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearWishlist}>
                Clear Wishlist
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue shopping</Link>
                </div>
                <br />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
