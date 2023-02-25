import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import ProductListing from "./components/ProductListing.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/Signup.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentShoppingCart, setCurrentShoppingCart] = useState([
    { productId: 1, quantity: 4 },
    { productId: 2, quantity: 1 },
    { productId: 3, quantity: 6 },
  ]);
  const [isShoppingCartVisible, setIsShoppingCartVisible] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Disables vertical scroll-bar when login window is visible
  useEffect(() => {
    isLoginFormVisible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isLoginFormVisible]);

  useEffect(() => {
    isSignupFormVisible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isSignupFormVisible]);

  return (
    <div className="App">
      <div className="Nav-Bar-Container">
        <NavBar
          currentUser={currentUser}
          isShoppingCartVisible={isShoppingCartVisible}
          setIsShoppingCartVisible={setIsShoppingCartVisible}
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          setIsLoginFormVisible={setIsLoginFormVisible}
        />
      </div>
      <div
        className="Store-Front-Container"
        style={
          isLoginFormVisible || isSignupFormVisible
            ? { opacity: "10%" }
            : { opacity: "100%" }
        }
      >
        {isShoppingCartVisible ? (
          <>
            <div
              className="Product-Listing"
              style={{ width: "70%", opacity: "40%" }}
            >
              <ProductListing
                products={products}
                isUserLoggedIn={isUserLoggedIn}
              />
            </div>
            <div className="Shopping-Cart">
              <ShoppingCart
                currentUser={currentUser}
                currentShoppingCart={currentShoppingCart}
                setCurrentShoppingCart={setCurrentShoppingCart}
              />
            </div>
          </>
        ) : (
          <>
            <div className="Product-Listing" style={{ width: "100%" }}>
              <ProductListing
                products={products}
                isUserLoggedIn={isUserLoggedIn}
              />
            </div>
          </>
        )}
      </div>
      {isLoginFormVisible && (
        <div className="User-Login-Form">
          <LogIn
            setCurrentUser={setCurrentUser}
            setIsUserLoggedIn={setIsUserLoggedIn}
            setIsLoginFormVisible={setIsLoginFormVisible}
            setIsSignupFormVisible={setIsSignupFormVisible}
          />
        </div>
      )}
      {isSignupFormVisible && (
        <div className="User-Signup-Form">
          <SignUp
            setCurrentUser={setCurrentUser}
            setIsUserLoggedIn={setIsUserLoggedIn}
            setIsSignupFormVisible={setIsSignupFormVisible}
          />
        </div>
      )}
    </div>
  );
}

export default App;
