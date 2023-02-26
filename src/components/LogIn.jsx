import React, { useState } from 'react';

function LogIn({setCurrentUser, setIsUserLoggedIn, setIsLoginFormVisible, setIsSignupFormVisible, setCurrentShoppingCart}) {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        date: new Date().toISOString()
    });

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    const clearForm = () => {
       setFormData({
        username: '',
        password: '',
        date: 0
       })
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(`http://localhost:3000/users/login`, options)
        const sqlQuery = await response.json()
        if (sqlQuery.validation) {
            clearForm()
            setCurrentUser(sqlQuery.data[0])
            setIsLoginFormVisible(false)
            setIsUserLoggedIn(true)
            setCurrentShoppingCart(sqlQuery.cartData)
        } else {
            clearForm()
            setLoginError(sqlQuery.message.toUpperCase())
        }
    }

    return ( 
        <>
            <div className='User-Form-Close-Btn-Container' >
                <button id='User-Form-Close-Btn' onClick={() => setIsLoginFormVisible(false)}>X</button>
            </div>
            <div>
                <h1>User Sign In</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="username" id="login-username-input" value={formData.username} onChange={handleFormChange} placeholder='Username' required/>
                </div>
                <div className='Login-Error'>{loginError}</div>
                <div className='Login-Password-Container'>
                    <input type={showPassword ? 'text' : 'password'} name="password" id="login-password-input" value={formData.password} onChange={handleFormChange} placeholder='Password' required/>
                    <i className={showPassword ?  "fa fa-eye" : "fa fa-eye-slash"} onClick={toggleShowPassword}></i>
                </div>
                <div className='User-Login-Form-Links'>
                    <div className='Link-Hover'>Forgot Password?</div>
                    <div className='Link-Hover' onClick={() => {setIsSignupFormVisible(true); setIsLoginFormVisible(false)}}>Sign-Up</div>
                </div>
                <button type="submit">Login</button>
            </form>
        </>        
    );
}

export default LogIn;