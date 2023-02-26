import React, { useState, useEffect } from 'react';

import ShoppingCartItem from "./ShoppingCartItem.jsx";

function ShoppingCart({setIsShoppingCartVisible, currentShoppingCart, setCurrentShoppingCart}) {
    const [totalCost, setTotalCost] = useState(0);

    // Calculate total cost whenever the shopping cart changes
    useEffect(() => {
        const cost = currentShoppingCart.reduce((total, item) => {
        return total + (item.price * item.quantity);
        }, 0);
        setTotalCost(cost);
    }, [currentShoppingCart]);

    return (
        <>
            <div className="Shopping-Cart-Header-Container">
                <div className='Shopping-Cart-Header-Btn'>
                    <i className="fa fa-chevron-circle-left" onClick={() => setIsShoppingCartVisible(false)}></i>
                    <h4>Your Shopping Cart:</h4> 
                </div >
                <div className='Shopping-Cart-Header-Qty'>
                    <h4 style={{color: 'red'}}>({currentShoppingCart.length} items)</h4>
                </div>
            </div>
            <div className="Shopping-Cart-Item-Listing-Container">
                {currentShoppingCart.map((item, index) => (
                    <ShoppingCartItem 
                        key={index} 
                        index={index} 
                        item={item} 
                        currentShoppingCart={currentShoppingCart} 
                        setCurrentShoppingCart={setCurrentShoppingCart}/>
                ))}
            </div>
            <div className="Shopping-Cart-Subtotal-Container">
                <div className="Shopping-Cart-Subtotal-Header">Subtotal:</div>
                <div className="Shopping-Cart-Subtotal">${totalCost.toFixed(2)}</div>
            </div>
            <div className="Shopping-Cart-Pay">
                <button onClick={() => alert('Payment system is currently in development. Thank you for your patience!')}>PAY WITH STRIPE</button>
            </div>
        </> 
     );
}

export default ShoppingCart;