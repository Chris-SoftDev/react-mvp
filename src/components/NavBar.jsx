function NavBar({showShoppingCart, setShowShoppingCart}) {

    return ( 
        <div className="Nav-Bar-Shopping-Cart">
            <i className="fa fa-shopping-cart" onClick={() => setShowShoppingCart(!showShoppingCart)}></i>
        </div>
     );
}

export default NavBar;