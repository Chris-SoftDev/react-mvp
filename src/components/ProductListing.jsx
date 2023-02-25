import ProductItem from "./ProductItem"

function ProductListing({products, isUserLoggedIn}) {
    return (   
        products.map((product, index) => (
            <ProductItem key={index} product={product} isUserLoggedIn={isUserLoggedIn} />
        ))        
    );
}

export default ProductListing;