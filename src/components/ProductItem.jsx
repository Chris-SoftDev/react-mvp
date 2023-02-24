import React, { useState } from 'react';

function ProductItem({product, showShoppingCart}) {
    const [inCart, setInCart] = useState(false);

    const productStarRating = (rating) => {
        const starNum = Math.round(rating);
        let starRating = '';
        for (let i=0; i < starNum; i++) {
            starRating += '\u2B50';
        }
        return starRating
    }

    const handleAddToCart = () => {
        setInCart(true);
    }

    return ( 
        <div className="Product-Item" id={product.id}>
            <div className="Product-Item-Image">
                <img src={product.image} alt={product.title}></img>
            </div>
            <div className="Product-Item-Title">{product.title}</div>
            <div className="Product-Item-Price">${product.price.toFixed(2)}</div>
            <div className="Product-Item-Rating">{productStarRating(product.rating.rate)}</div>
            {inCart ? (
                <div 
                    className="Product-Item-Btn" 
                    style={
                        showShoppingCart
                          ? { display: "show", opacity: "100" }
                          : { display: "hide", opacity: "0" }
                      }
                >
                    <button 
                        disabled
                        style={{backgroundColor: 'gray', cursor: 'auto'}}
                    >Added to Cart</button>
                </div>
            ) : (
                <div 
                    className="Product-Item-Btn" 
                    style={
                        showShoppingCart
                          ? { display: "show", opacity: "100" }
                          : { display: "hide", opacity: "0" }
                      }
                >
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            )}
        </div>
    );
}

export default ProductItem;