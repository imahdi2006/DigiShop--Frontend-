// Import necessary React hooks and components
import React, { useEffect, useState } from "react";
import "./ProductsList.css"
import ProductCard from "./../Home/ProductCard";
import useData from "../../hooks/useData";
import { useSearchParams } from "react-router-dom";

// for loading
import ProductsCardSkeleton from "./ProductsCardSkeleton";

// you can use pagination or infinite scroll
// import Pagination from "../Common/pagination";

const ProductsList = () => {
  // State for managing current page number
  const [page, setPage] = useState(1);

  //  State for managing sorting criteria
  const [sortBy, setsortBy] = useState("");

  // State for managing sorted products
  const [sortedProducts, setsortedProducts] = useState([]);

  // Get and set URL search parameters
  const [search, setSearch] = useSearchParams();

  // Get category from URL parameters
  const category = search.get("category");

  // Get search query from URL parameters
  const searchQuery = search.get("search");

  // Fetch products data using custom hook
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        perPage: 10,
        page,
      },
    },
    [searchQuery, category, page]
  );

  // Reset page to 1 when category changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);

  // Array for showing loading skeleton cards
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  // Handle page change for pagination
  // const handlePageChange = (page) => {
  //   const currentParams = Object.fromEntries([...search]);
  //   setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  // };

  // Infinite scroll implementation
  useEffect(() => {
    // Function to check if user has scrolled to bottom

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      // Load more products when user reaches bottom
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        console.log("Reached to Bottom!");
        setPage((prev) => prev + 1);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoading]);

  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];
      if (sortBy === "price desc") {
        setsortedProducts(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setsortedProducts ( products.sort((a, b) => a.price - b.price));
      } else if (sortBy === "rate desc") {
        setsortedProducts ( products.sort((a, b) => b.reviews.rate - a.reviews.rate));
      } else if (sortBy === "rate asc") {
        setsortedProducts ( products.sort((a, b) => a.reviews.rate - b.reviews.rate));
      }else{
        setsortedProducts(products);
      }
    }
  }, [sortBy, data]);

  return (
    <section className="products_list_section">
      {/* Header with title and sorting options */}

      <header className="align_center products_list_header">
        <h2>Products</h2>

        {/* Dropdown for sorting products */}

        <select
          name="sort"
          id=""
          className="products_sorting"
          onChange={(e) => setsortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>

      {/* Products grid container */}

      <div className="products_list">
        {/* Show error if any */}
        {error && <em className="form_error">{error}</em>}

        {/* Map through products and render product cards */}

        {data?.products &&
          sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        {/* Show loading skeletons while fetching data */}

        {isLoading && skeletons.map((n) => <ProductsCardSkeleton key={n} />)}
      </div>

      {/* if you want to use pagination you have to recommend this part */}

      {/* {data && (
                <Pagination
                    totalPosts={data.totalProducts}
                    postsPerPage={8}
                    onClick={handlePageChange}
                    currentPage={page}
                />
            )} */}
    </section>
  );
};

export default ProductsList;
