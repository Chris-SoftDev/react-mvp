import ProductItem from "./ProductItem"

function ProductListing({products, showShoppingCart}) {
    return (   
        products.map((product, index) => (
            <ProductItem key={index} product={product} showShoppingCart={showShoppingCart} />
        ))        
     );
}

export default ProductListing;