import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./AddProduct.module.scss";
import { selectProducts } from "../../../redux/slice/productSlice";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  brand: "",
  category: "",
  description: "",
  discountPercentage: 0,
  id: 0,
  images: "",
  price: 0,
  rating: 0,
  stock: 0,
  thumbnail: "",
  title: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);

    const storageRef = ref(storage, `checksout/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, images: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        brand: product.brand,
        category: product.category,
        description: product.description,
        discountPercentage: Number(product.discountPercentage),
        id: product.id,
        images: Array(product.images),
        price: Number(product.price),
        rating: Number(product.rating),
        stock: Number(product.stock),
        thumbnail: product.thumbnail,
        title: product.title,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product uploaded successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.images !== productEdit.images) {
      const storageRef = ref(storage, productEdit.images);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products"), {
        brand: product.brand,
        category: product.category,
        description: product.description,
        discountPercentage: Number(product.discountPercentage),
        id: product.id,
        images: Array(product.images),
        price: Number(product.price),
        rating: Number(product.rating),
        stock: Number(product.stock),
        thumbnail: product.thumbnail,
        title: product.title,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product Company/Brand:</label>
            <input
              type="text"
              placeholder="Product brand"
              required
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose product category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <label>Product Description</label>
            <textarea
              name="description"
              required
              value={product.description}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>
            <label>Product discount percentage</label>
            <input
              type="text"
              placeholder="Product discount"
              required
              name="discount"
              value={product.discountPercentage}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {product.images === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="images"
                  value={product.images}
                  disabled
                />
              )}
            </Card>
            <label>Product name:</label>
            <input
              type="text"
              placeholder="Product name"
              required
              name="title"
              value={product.title}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product price:</label>
            <input
              type="number"
              placeholder="Product price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product rating:</label>
            <input
              type="number"
              placeholder="Product rating"
              required
              name="rating"
              value={product.rating}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product In Stock:</label>
            <input
              type="number"
              placeholder="Product stock"
              required
              name="stock"
              value={product.stock}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product thumbnail:</label>

            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="thumbnail/*"
                placeholder="Product thumbnail"
                name="thumbnail"
                onChange={(e) => handleImageChange(e)}
              />

              {product.thumbnail === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Thumbnail URL"
                  name="thumbnail"
                  value={product.thumbnail}
                  disabled
                />
              )}
            </Card>

            <button className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
