import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ProductListing from "./components/ProductListing";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState([]);
  const [showShoppingCart, setShowShoppingCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <div className="Nav-Bar-Container">
        <NavBar
          showShoppingCart={showShoppingCart}
          setShowShoppingCart={setShowShoppingCart}
        />
      </div>
      <div className="Store-Front-Container">
        <div
          className="Product-Listing"
          style={showShoppingCart ? { width: "70%" } : { display: "100%" }}
        >
          <ProductListing
            products={products}
            showShoppingCart={showShoppingCart}
          />
        </div>
        <div
          className="Shopping-Cart"
          style={
            showShoppingCart
              ? { display: "show", opacity: "100" }
              : { display: "hide", opacity: "0" }
          }
        >
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
}

export default App;
