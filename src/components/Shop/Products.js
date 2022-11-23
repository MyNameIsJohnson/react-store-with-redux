import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useSelector } from "react-redux";

const Products = (props) => {
  const productItems = useSelector((state) => state.product.products);
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productItems.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            images={product.images}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
