import { useDispatch } from "react-redux";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const [currImg, setCurrImg] = useState(0);
  const dispatch = useDispatch();
  const { images, title, price, description, id } = props;
  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({ id, title, price }));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.carousel}>
          <div className={classes.carouselInner}>
            <div
              className={classes.left}
              onClick={() => {
                currImg > 0 && setCurrImg(currImg - 1);
              }}
            >
              <ArrowBackIosIcon style={{ fontSize: 30 }} />
            </div>
            <div className={classes.center}>
              <img
                key={images[currImg]}
                alt={title}
                src={images[currImg]}
                height="200"
                width="200"
              />
            </div>
            <div
              className={classes.right}
              onClick={() => {
                currImg < images.length - 1 && setCurrImg(currImg + 1);
              }}
            >
              <ArrowForwardIosIcon style={{ fontSize: 30 }} />
            </div>
          </div>
        </div>

        {/* {images.map((image) => (
            <img key={image} alt={title} src={image} height="200" width="200" />
          ))} */}
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
