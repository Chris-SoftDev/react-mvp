function NavBar({currentUser, currentShoppingCart, isShoppingCartVisible, setIsShoppingCartVisible, isUserLoggedIn, setIsUserLoggedIn, setIsLoginFormVisible, isUserDeleteAccountVisible, setIsUserDeleteAccountVisible}) {
    
    const toggleShowShoppingCart = () => {
        setIsShoppingCartVisible(!isShoppingCartVisible)
    }

    const toggleShowDeleteAccount = () => {
        setIsUserDeleteAccountVisible(!isUserDeleteAccountVisible)
    }

    const setUserLoggedOut = () => {
        setIsUserDeleteAccountVisible(false)
        setIsShoppingCartVisible(false)
        setIsUserLoggedIn(false)
    }

    const showLoginForm = () => {
        // Scrolls screen to top, for displaying login form before locking scroll in App.js when LoginForm is visible
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        setIsLoginFormVisible(true)
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
                            <p>Welcome, <b onClick={toggleShowDeleteAccount}>{currentUser.firstname}</b>!</p>
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
                            <i className="fa fa-sign-in" title="Sign-In" onClick={showLoginForm}></i>
                        </div>
                    </>
                }
            </div>
        </> 
    );
}

export default NavBar;