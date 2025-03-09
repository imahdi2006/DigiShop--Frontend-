import React from "react";
import "./QuantityInput.css";

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  cartPage,
  productId,
}) => {
  // code optimized
  const handleDecrease = () => {
    cartPage ? setQuantity("decrease", productId) : setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    cartPage ? setQuantity("increase", productId) : setQuantity(quantity + 1);
  };

  return (
    <div className="align_center quantity_input">
      <button
        className="quantity_input_button"
        disabled={quantity <= 1}
        onClick={handleDecrease}
      >
        {" "}
        -{" "}
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        className="quantity_input_button"
        disabled={quantity >= stock}
        onClick={handleIncrease}
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default QuantityInput;
