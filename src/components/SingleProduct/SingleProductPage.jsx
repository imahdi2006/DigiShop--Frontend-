import React, { useContext, useState } from "react";
import "./SingleProductPage.css";
import QuantityInput from "./QuantityInput";
import config from "../../config.json";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import Loader from "../Common/Loader";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const SingleProductPage = () => {
  const [selectedImage, setselectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const { data: product, error, isLoading } = useData(`/products/${id}`);

  return (
    <section className="align_center single_product">
      {isLoading && <Loader />}
      {error && <em className="form_error">{error}</em>}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_teumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.backendURL}/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setselectedImage(index)}
                />
              ))}
            </div>
            <img
              src={`${config.backendURL}/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            {user ? (
              <>
                {" "}
                <p className="single_product_price">
                  ${product.price.toFixed(2)}
                </p>
                <h2 className="quntity_title">Quantity : </h2>
                <QuantityInput
                  quantity={quantity}
                  setQuantity={setQuantity}
                  stock={product.stock}
                />
                <button
                  className="search_button add_cart"
                  onClick={() => addToCart(product, quantity)}
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <button
                className="search_button login_button"
                onClick={() => navigate("/login")}
              >
                Login to Add to Cart
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
