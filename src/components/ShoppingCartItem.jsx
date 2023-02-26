import React, { useState, useEffect } from 'react';

function ShoppingCartItem({index, item, currentShoppingCart, setCurrentShoppingCart}) {
    const [componentShoppingCart, setComponentShoppingCart] = useState(currentShoppingCart)

    useEffect(() => {
        setComponentShoppingCart(currentShoppingCart);
    }, [currentShoppingCart]);

    const setItemQtyDecrease = () => {
        const newComponentShoppingCart = [...componentShoppingCart];
        const newItem = { ...newComponentShoppingCart[index] };
        if (newItem.quantity > 1) {
            newItem.quantity -= 1;
            newComponentShoppingCart[index] = newItem;
            setComponentShoppingCart(newComponentShoppingCart);
            setCurrentShoppingCart(newComponentShoppingCart);
        }
    }
    
    const setItemQtyIncrease = () => {
        const newComponentShoppingCart = [...componentShoppingCart];
        const newItem = { ...newComponentShoppingCart[index] };
        newItem.quantity += 1;
        newComponentShoppingCart[index] = newItem;
        setComponentShoppingCart(newComponentShoppingCart);
        setCurrentShoppingCart(newComponentShoppingCart);
    }

    const handleItemRemoval = (index, componentShoppingCart) => {
        const newComponentShoppingCart = [...componentShoppingCart]; // create a copy of the array
        newComponentShoppingCart.splice(index, 1); // remove the item at the specified index
        setComponentShoppingCart(newComponentShoppingCart); // update the component state
        setCurrentShoppingCart(newComponentShoppingCart); // update the parent state
    }
    

    return (
        <div className="Shopping-Cart-Item">
            <div className="Item-Image-Container">
                <img src={item.image} alt={item.title}></img>
            </div>
            <div className="Item-Details-Container">
                <div className="Item-Details">
                    <div>{item.title}</div>
                    <div style={{fontWeight: 'bold'}}>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div className="Item-Controls">
                    <div className="Item-Qty-Controls">
                        <div id="Item-Qty-Decrease" onClick={setItemQtyDecrease}>-</div>
                        <div id="Item-Qty">{item.quantity}</div>
                    <div id="Item-Qty-Increase" onClick={setItemQtyIncrease}>+</div>
                    </div>
                    <div className="Item-Remove-Control">
                        <i className="fa fa-times-circle" onClick={() => handleItemRemoval(index, componentShoppingCart)}></i>
                    </div>
                </div>
            </div>
        </div> 
     );
}

export default ShoppingCartItem;