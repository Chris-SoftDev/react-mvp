function ProductItem({product, isUserLoggedIn, currentShoppingCart, setCurrentShoppingCart}) {

    const productStarRating = (rating) => {
        const starNum = Math.round(rating);
        let starRating = '';
        for (let i=0; i < starNum; i++) {
            starRating += '\u2B50';
        }
        return starRating
    }

    const escapeSpecialChars = (str) => {
        return str.replace(/'/g, "\\'");
    }

    const searchId = (id, cart) => {
        return cart.find(obj => obj.id === id)
    }

    const handleAddToCart = () => {
        const newShoppingCart = [...currentShoppingCart]; // create a copy of the current cart
        const modifiedProduct = Object.assign({}, product); // create a clone of the current product
        delete modifiedProduct.category;
        delete modifiedProduct.description;
        delete modifiedProduct.rating;
        modifiedProduct.title = escapeSpecialChars(modifiedProduct.title);
        modifiedProduct.quantity = 1;
        newShoppingCart.push(modifiedProduct); // add the current product to the copy
        setCurrentShoppingCart(newShoppingCart); // update the state of the parent component
    };
    
    return ( 
        <div className="Product-Item" id={product.id}>
            <div className="Product-Item-Image">
                <img src={product.image} alt={product.title} title={product.description}></img>
            </div>
            <div className="Product-Item-Title">{product.title}</div>
            <div className="Product-Item-Price">${product.price.toFixed(2)}</div>
            <div className="Product-Item-Rating">{productStarRating(product.rating.rate)}</div>
            {isUserLoggedIn && ((searchId(product.id, currentShoppingCart)) ? 
                    <div className="Product-Item-Btn">
                        <button 
                        disabled
                        style={{backgroundColor: 'gray', cursor: 'auto'}}
                        >
                            Added to Cart
                        </button>
                    </div> :
                    <div className="Product-Item-Btn">
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                )
            }
        </div>
    );
}

export default ProductItem;