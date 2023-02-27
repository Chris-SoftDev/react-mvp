import React, { useState } from 'react';

function SignUp({setCurrentUser, setIsUserLoggedIn, setIsSignupFormVisible, setCurrentShoppingCart}) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        date: new Date().toISOString()
    });

    const clearForm = () => {
        setFormData({
            email: '',
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            date: 0
        })
     }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

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

        const response = await fetch(`/users/signup`, options)
        const sqlQuery = await response.json()
        if (sqlQuery.validation) {
            clearForm()
            setCurrentUser(sqlQuery.data[0])
            setIsSignupFormVisible(false)
            setIsUserLoggedIn(true)
            setCurrentShoppingCart(sqlQuery.cartData)
        }
    }

    return ( 
        <>
            <div className='User-Form-Close-Btn-Container'>
                <button id='User-Form-Close-Btn' onClick={() => setIsSignupFormVisible(false)}>X</button>
            </div>
            <div>
                <h1>Account Sign Up</h1>
            </div>
            <div>
                <p>Please complete for account registration:</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" name="email" id="signup-email-input" value={formData.email} onChange={handleFormChange} placeholder='Email' required/>
                </div>
                <div>
                    <input type="text" name="username" id="signup-username-input" value={formData.username} onChange={handleFormChange} placeholder='Username' required/>
                </div>
                <div className='Signup-Password-Container'>
                    <input type={showPassword ? 'text' : 'password'} name="password" id="signup-password-input" value={formData.password} onChange={handleFormChange} placeholder='Password' required/>
                    <i className={showPassword ?  "fa fa-eye" : "fa fa-eye-slash"} onClick={toggleShowPassword}></i>
                </div>
                <div>
                    <input type="text" name="firstname" id="signup-firstname-input" value={formData.firstname} onChange={handleFormChange} placeholder='First Name' required/>
                </div>
                <div>
                    <input type="text" name="lastname" id="signup-lastname-input" value={formData.lastname} onChange={handleFormChange} placeholder='Last Name' required/>
                </div>
                <button type="submit">Create Account</button>
            </form>
        </> 
     );
}

export default SignUp;