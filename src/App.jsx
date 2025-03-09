import React, { useEffect, useState } from "react";
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

setAuthToken(getJwt());

export const App = () => {
  // jwt decode
  const [user, setuser] = useState(null);
  const [cart, setcart] = useState([]);

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

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product, quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setcart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product added to cart");
      })
      .catch((err) => {
        toast.error("Error adding product to cart");
        setcart(cart);
      });
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setcart(newCart);

    removeFromCartAPI(id)
      .then((res) => {
        toast.success("Product removed from cart");
      })
      .catch((err) => {
        toast.error("Error removing product from cart");
        setcart(oldCart);
      });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      item => item.product._id === id
    );

    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setcart(updatedCart);
      increaseProductAPI(id)
      .then((res) => {
        // Update local storage to persist data
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success("Product quantity increased");
      })
        .catch((err) => {
          toast.error("Error increasing product quantity");
          setcart(oldCart);
        });
    }
    if (type === "decrease") {
      const oldCart = [...cart];
      
      updatedCart[productIndex].quantity -= 1;
      setcart(updatedCart);
    
      decreaseProductAPI(id)
        .then((res) => {
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          toast.success("Product quantity decreased");
        })
        .catch((err) => {
          toast.error("Error decreasing product quantity");
          setcart(oldCart);
        });
    }
    }
    
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setcart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setcart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer style={{ marginTop: "70px" }}  position="top-right" />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
