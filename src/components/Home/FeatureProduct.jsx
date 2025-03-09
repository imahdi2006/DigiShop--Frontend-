import React from "react";
import "./FeatureProduct.css";
import ProductCard from "../Products/ProductCard";
import useData from "../../hooks/useData";
import ProductsCardSkeleton from "../Products/ProductsCardSkeleton";

const FeatureProduct = () => {
  const { data, error, isLoading } = useData("/products/featured");
  console.log(data)
  const skeletons = [1, 2, 3];
  return (
    <section className="feature_products">
      <h2>Feature Products</h2>
      <div className="align_center featured_products_list">
        {error && <em className="form_error">{error}</em>}
        {data &&
          data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeletons.map((n) => <ProductsCardSkeleton key={n} />)}
      </div>
    </section>
  );
};

export default FeatureProduct;
