function DeleteAccount({currentUser, setCurrentUser, setIsUserLoggedIn, setIsUserDeleteAccountVisible, setIsShoppingCartVisible}) {

    const deleteAccountHandler = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your account? This cannot be undone.')
        if (confirmed) {
            const options = {
                method: 'DELETE',
            }
    
            await fetch(`http://localhost:3000/users/delete/${currentUser.user_id}`, options)        
            setCurrentUser({})
            setIsUserDeleteAccountVisible(false)        
            setIsShoppingCartVisible(false)
            setIsUserLoggedIn(false)
        } else {
            setIsUserDeleteAccountVisible(false)  
        }
    }

    return ( 
        <>
            <div>
                <button onClick={(deleteAccountHandler)}>DELETE ACCOUNT</button>
            </div>
        </>
     );
}

export default DeleteAccount;