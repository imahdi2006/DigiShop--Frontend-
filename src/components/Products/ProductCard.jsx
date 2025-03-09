import React from "react";
import "./ProductCard.css";

import iphone from "../../assets/iphone.jpg";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";

const ProductCard = ({ product }) => {
  return (
    <article className="product_card">
      <div className="product_image">
        <a href="product/1">
          <img src={iphone} alt="product image" />
        </a>
      </div>

      <div className="product_details">
        <h3 className="product_price">${product?.price}</h3>
        <p className="product_title">{product?.title}</p>
        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="product_review_count"> {product?.reviews.counts}</p>
          </div>
          <button className="add_to_card">
            <img src={basket} alt="" />
          </button>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
