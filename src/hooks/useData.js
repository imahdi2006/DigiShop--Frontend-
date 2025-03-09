import React, { useState, useEffect } from "react";
import apiCleint from "../utils/api-cleint";


const useData = (endpoint, customConfig, deps) => {
  // State for managing data, error and loading status
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data when component mounts or dependencies change
  useEffect(() => {
    // Set loading state to true before fetching
    setIsLoading(true);

    apiCleint
      .get(endpoint, customConfig)
      .then((res) => {
        // Special handling for products endpoint with pagination
        // If fetching products and not the first page, append new products
        if (
          endpoint === "/products" &&
          data &&
          data.products &&
          customConfig.params.page !== 1
        ) {
          setData((prev) => ({
            ...prev,
            products: [...prev.products, ...res.data.products],
          }));
        } else {
          // For all other cases, just set the new data
          setData(res.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        // Handle any errors that occur during fetching
        setError(err.message);
        setIsLoading(false);
      });
  }, deps ? deps : []); // Use provided deps or empty array if none provided

  // Return the current state
  return { data, error, isLoading };
};

export default useData;
