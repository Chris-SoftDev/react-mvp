import ProductItem from "./ProductItem"

function ProductListing({products, isUserLoggedIn, currentShoppingCart, setCurrentShoppingCart}) {
    return (   
        products.map((product, index) => (
            <ProductItem key={index} product={product} isUserLoggedIn={isUserLoggedIn} currentShoppingCart={currentShoppingCart} setCurrentShoppingCart={setCurrentShoppingCart} />
        ))        
    );
}

export default ProductListing;