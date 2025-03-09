import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductsCardSkeleton = () => {
  return <Skeleton className="product_card" width={275} />;
};

export default ProductsCardSkeleton;
