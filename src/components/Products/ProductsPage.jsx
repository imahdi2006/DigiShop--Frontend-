import React from "react";

import "./ProductsPage.css";
import ProductSidebar from "./ProductSidebar";
import ProductsList from "./ProductsList";

const ProductsPage = () => {
  return (
    <section className="products_page">
      <ProductSidebar />
      <ProductsList />
    </section>
  );
};

export default ProductsPage;
