import React, { useState } from 'react';

function NavBar({showShoppingCart, setShowShoppingCart}) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    
    const handleShowShoppingCart = () => {
        setShowShoppingCart(!showShoppingCart)
    }

    const setUserLoggedIn = () => {
        setIsUserLoggedIn(true)
    }

    const setUserLoggedOut = () => {
        setShowShoppingCart(false)
        setIsUserLoggedIn(false)
    }

    return (
        <>
            {(isUserLoggedIn) ?
                <>
                    <div className="Nav-Bar-Shopping-Cart">
                        <i className="fa fa-shopping-cart" onClick={handleShowShoppingCart}></i>
                    </div>
                    <div className="Nav-Bar-User-Login">
                        <i className="fa fa-sign-out" title="Log-Out" onClick={setUserLoggedOut}></i>
                    </div>
                </> :
                <>
                    <div className="Nav-Bar-Sign-Up">
                        <i className="fa fa-user-plus" title="Signup"></i>
                    </div>
                    <div className="Nav-Bar-User-Login">
                        <i className="fa fa-sign-in" title="Log-In" onClick={setUserLoggedIn}></i>
                    </div>
                </>
            }
        </> 
     );
}

export default NavBar;