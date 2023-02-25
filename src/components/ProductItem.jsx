import React, { useState } from 'react';

function ProductItem({product, isUserLoggedIn}) {
    const [inCart, setInCart] = useState(false);

    const productStarRating = (rating) => {
        const starNum = Math.round(rating);
        let starRating = '';
        for (let i=0; i < starNum; i++) {
            starRating += '\u2B50';
        }
        return starRating
    }

    return ( 
        <div className="Product-Item" id={product.id}>
            <div className="Product-Item-Image">
                <img src={product.image} alt={product.title} title={product.description}></img>
            </div>
            <div className="Product-Item-Title">{product.title}</div>
            <div className="Product-Item-Price">${product.price.toFixed(2)}</div>
            <div className="Product-Item-Rating">{productStarRating(product.rating.rate)}</div>
            {isUserLoggedIn && (inCart ? 
                    <div className="Product-Item-Btn">
                        <button 
                        disabled
                        style={{backgroundColor: 'gray', cursor: 'auto'}}
                        >Added to Cart</button>
                    </div> :
                    <div className="Product-Item-Btn">
                        <button onClick={() => setInCart(true)}>Add to Cart</button>
                    </div>
                )
            }
        </div>
    );
}

export default ProductItem;