import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import ProductListing from "./components/ProductListing.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/Signup.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import DeleteAccount from "./components/DeleteAccount.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentShoppingCart, setCurrentShoppingCart] = useState([]);
  const [isShoppingCartVisible, setIsShoppingCartVisible] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(false);
  const [isForgotPasswordFormVisible, setIsForgotPasswordFormVisible] =
    useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserDeleteAccountVisible, setIsUserDeleteAccountVisible] =
    useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const updateUserShoppingCart = async () => {
      const options = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userData: currentUser,
          cartData: currentShoppingCart,
        }),
      };

      await fetch(`/cart/update`, options);
    };

    isUserLoggedIn && updateUserShoppingCart();
  }, [isUserLoggedIn, currentUser, currentShoppingCart]);

  // Disables vertical scroll-bar when either Login/Signup/ForgotPassword window is visible
  useEffect(() => {
    isLoginFormVisible || isSignupFormVisible || isForgotPasswordFormVisible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [isLoginFormVisible, isSignupFormVisible, isForgotPasswordFormVisible]);

  return (
    <div className="App">
      <div className="Nav-Bar-Container">
        <NavBar
          currentUser={currentUser}
          currentShoppingCart={currentShoppingCart}
          isShoppingCartVisible={isShoppingCartVisible}
          setIsShoppingCartVisible={setIsShoppingCartVisible}
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          setIsLoginFormVisible={setIsLoginFormVisible}
          isUserDeleteAccountVisible={isUserDeleteAccountVisible}
          setIsUserDeleteAccountVisible={setIsUserDeleteAccountVisible}
        />
      </div>
      <div
        className="Store-Front-Container"
        style={
          isLoginFormVisible ||
          isSignupFormVisible ||
          isForgotPasswordFormVisible
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
                currentShoppingCart={currentShoppingCart}
                setCurrentShoppingCart={setCurrentShoppingCart}
              />
            </div>
            <div className="Shopping-Cart">
              <ShoppingCart
                setIsShoppingCartVisible={setIsShoppingCartVisible}
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
                currentShoppingCart={currentShoppingCart}
                setCurrentShoppingCart={setCurrentShoppingCart}
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
            setCurrentShoppingCart={setCurrentShoppingCart}
            setIsForgotPasswordFormVisible={setIsForgotPasswordFormVisible}
          />
        </div>
      )}
      {isSignupFormVisible && (
        <div className="User-Signup-Form">
          <SignUp
            setCurrentUser={setCurrentUser}
            setIsUserLoggedIn={setIsUserLoggedIn}
            setIsSignupFormVisible={setIsSignupFormVisible}
            setCurrentShoppingCart={setCurrentShoppingCart}
          />
        </div>
      )}
      {isForgotPasswordFormVisible && (
        <div className="User-Forgot-Password-Form">
          <ForgotPassword
            setIsForgotPasswordFormVisible={setIsForgotPasswordFormVisible}
          />
        </div>
      )}
      {isUserDeleteAccountVisible && (
        <div className="User-Delete-Account-Container">
          <DeleteAccount
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setIsUserLoggedIn={setIsUserLoggedIn}
            setIsUserDeleteAccountVisible={setIsUserDeleteAccountVisible}
            setIsShoppingCartVisible={setIsShoppingCartVisible}
          />
        </div>
      )}
    </div>
  );
}

export default App;
