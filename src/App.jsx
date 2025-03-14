import React, { useEffect, useState, useCallback, useReducer } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/UserContext"; // Remove the curly braces
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "./contexts/CartContext";
import cartReducer from "./Reducers/cartReducer";

setAuthToken(getJwt());

export const App = () => {
  // jwt decode
  const [user, setuser] = useState(null);
  const [cart, dispatchCart] = useReducer(cartReducer, []);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setuser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = useCallback(
    (product, quantity) => {
      dispatchCart({ type: "ADD_TO_CART", payload: { product, quantity } });
      addToCartAPI(product._id, quantity)
        .then((res) => {
          toast.success("Product added to cart");
        })
        .catch((err) => {
          toast.error("Error adding product to cart");
          dispatchCart({ type: "REVERT-CART", payload: { cart } });
        });
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (id) => {
      dispatchCart({ type: "REMOVE-FROM-CART", payload: { id } });

      removeFromCartAPI(id)
        .then((res) => {
          toast.success("Product removed from cart");
        })
        .catch((err) => {
          toast.error("Error removing product from cart");
          dispatchCart({ type: "REVERT-CART", payload: { cart } });
        });
    },
    [cart]
  );

  const updateCart = useCallback(
    (type, id) => { 
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );

      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
        dispatchCart({ type: "GET_CART", payload: { product: updatedCart } });
        increaseProductAPI(id)
          .then((res) => {
            // Update local storage to persist data
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            toast.success("Product quantity increased");
          })
          .catch((err) => {
            toast.error("Error increasing product quantity");
            dispatchCart({ type: "REVERT-CART", payload: {cart } });
          });
      }
      if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
        dispatchCart({ type: "GET_CART", payload: { product: updatedCart } });

        decreaseProductAPI(id)
          .then((res) => {
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            toast.success("Product quantity decreased");
            getCart();
          })
          .catch((err) => {
            toast.error("Error decreasing product quantity");
            dispatchCart({ type: "REVERT-CART", payload: {cart } });
          });
      }
    },
    [cart]
  );

  const getCart = useCallback(() => {
    getCartAPI()
      .then((res) => {
        dispatchCart({ type: "GET_CART", payload: { product: res.data } });
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer
              style={{ marginTop: "70px" }}
              position="top-right"
            />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
