import React from "react";

import "./ProductsSidebar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import useData from "../../hooks/useData";

const ProductSidebar = () => {
  // for get data
  const { data: categories, error } = useData("/category");

  return (
    <aside className="porducts_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {/* for error */}
        {error && <em className="form_error">{error}</em>}
        {/* for loading */}
        {categories &&
          categories.map((category) => (
            <LinkWithIcon
              key={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              emoji={`http://localhost:5000/category/${category.image}`}
              sidebar={true}
            />
          ))}
      </div>
    </aside>
  );
};

export default ProductSidebar;
