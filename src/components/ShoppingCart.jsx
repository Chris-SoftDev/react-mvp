import ShoppingCartItem from "./ShoppingCartItem.jsx";

function ShoppingCart({currentUser, currentShoppingCart, setCurrentShoppingCart}) {
    return (
        <>
            <div className="Shopping-Cart-Header">
                <h4>Your Shopping Cart:</h4> 
                <h4 style={{color: 'red'}}>(7 items)</h4>
            </div>
            <div className="Shopping-Cart-Item-Listing-Container">
                {currentShoppingCart.map((item, index) => (
                    <ShoppingCartItem key={index} item={item} />
                ))}
            </div>
        </> 
     );
}

export default ShoppingCart;