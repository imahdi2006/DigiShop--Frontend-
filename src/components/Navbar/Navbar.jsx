import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import LinkWithIcon from "./LinkWithIcon";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/package.png";
import lock from "../../assets/locked.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import CartContext from "../../contexts/CartContext";
import { getSuggestionAPI } from "../../services/productServices";

const Navbar = () => {
  const [search, setsearch] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const [selectedItem, setselectedItem] = useState(-1);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const delaysuggestion = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionAPI(search)
          .then((res) => setsuggestions(res.data))
          .catch((err) => console.log(err));
      } else {
        setsuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delaysuggestion);
  }, [search]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
    setsuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setselectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      } else if (e.key === "ArrowUp") {
        setselectedItem((current) =>
          current === suggestions.length - 0 ? 1 : current - 1
        );
      } else if (e.key === "Enter" && selectedItem >= 0) {
        e.preventDefault();
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setsearch(suggestion.title);
        setsearch("");
        setsuggestions([]);
      }
    } else {
      setselectedItem(-1);
    }
  };

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">DigiShop</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="search_button">
            Search
          </button>
          {suggestions.length > 0 && (
            <ul className="search_result">
              {suggestions.map((suggestion, index) => (
                <li
                  className={
                    selectedItem === index
                      ? "search_suggestion_link active"
                      : "search_suggestion_link"
                  }
                  key={suggestion.id}
                >
                  <Link
                    to={`/products?search=${suggestion.title}`}
                    onClick={() => {
                      setsearch("");
                      setsuggestions([]);
                    }}
                  >
                    {suggestion.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />
        {!user && (
          <>
            <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
            <NavLink to="/cart" className="align_center">
              Cart <p className="align_center cart_counts">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
