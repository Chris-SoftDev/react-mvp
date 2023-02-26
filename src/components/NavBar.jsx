function NavBar({currentUser, currentShoppingCart, isShoppingCartVisible, setIsShoppingCartVisible, isUserLoggedIn, setIsUserLoggedIn, setIsLoginFormVisible}) {
    
    const toggleShowShoppingCart = () => {
        setIsShoppingCartVisible(!isShoppingCartVisible)
    }

    const setUserLoggedOut = () => {
        setIsShoppingCartVisible(false)
        setIsUserLoggedIn(false)
    }
    
    return (
        <>
            <div className="Store-Title">
                <h1>REACT MVP STORE</h1>
            </div>
            <div className="Nav-Bar-Links">
                {(isUserLoggedIn) ?
                    <>
                        <div className="Nav-Bar-Welcome">
                            <p>Welcome, {currentUser.firstname}!</p>
                        </div>
                        <div className="Nav-Bar-Shopping-Cart">
                            <i className="fa fa-shopping-cart" onClick={toggleShowShoppingCart}>
                                <button 
                                    id='Shopping-Cart-Icon-Qty' 
                                    style={currentShoppingCart.length > 0 ? {visibility: 'visible'} : {visibility: 'hidden'} }
                                    onClick={toggleShowShoppingCart}
                                >{currentShoppingCart.length}
                                </button>
                            </i>
                        </div>
                        <div className="Nav-Bar-User-Login">
                            <i className="fa fa-sign-out" title="Sign-Out" onClick={setUserLoggedOut}></i>
                        </div>
                    </> :
                    <>
                        <div className="Nav-Bar-Welcome">
                            <p>Sign-in to begin shopping!</p>
                        </div>
                        <div className="Nav-Bar-User-Login">
                            <i className="fa fa-sign-in" title="Sign-In" onClick={() => setIsLoginFormVisible(true)}></i>
                        </div>
                    </>
                }
            </div>
        </> 
    );
}

export default NavBar;