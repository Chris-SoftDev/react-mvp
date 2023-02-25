import React, { useState } from 'react';

function LogIn({setIsUserLoggedIn, setIsLoginFormVisible, setIsSignupFormVisible}) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

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
            setIsLoginFormVisible(false)
            setIsUserLoggedIn(true)
        }
    }

    return ( 
        <>
            <div>
                <button id='User-Form-Close-Btn' onClick={() => setIsLoginFormVisible(false)}>X</button>
            </div>
            <div>
                <h1>Sign In</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="username" id="username-input" value={formData.username} onChange={handleFormChange} placeholder='Username' />
                </div>
                <div>
                    <input type="password" name="password" id="password-input" value={formData.password} onChange={handleFormChange} placeholder='Password' />
                </div>
                <div className='User-Login-Form-Links'>
                    <div className='Link-Hover'>Forgot Password?</div>
                    <div className='Link-Hover' onClick={() => {setIsSignupFormVisible(true); setIsLoginFormVisible(false)}}>Signup</div>
                </div>
                <button type="submit">Login</button>
            </form>
        </>        
    );
}

export default LogIn;