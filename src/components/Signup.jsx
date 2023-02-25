import React, { useState } from 'react';

function SignUp(setIsUserLoggedIn, setIsSignupFormVisible) {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: ''
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

        const response = await fetch(`http://localhost:3000/users/signup`, options)
        const sqlQuery = await response.json()
        if (sqlQuery.validation) {
            setIsSignupFormVisible(false)
            setIsUserLoggedIn(true)
        }
    }

    return ( 
        <>
            <div>
                <button id='User-Form-Close-Btn' onClick={() => setIsSignupFormVisible(false)}>X</button>
            </div>
            <div>
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" name="email" id="email-input" value={formData.email} onChange={handleFormChange} placeholder='Email' />
                </div>
                <div>
                    <input type="text" name="username" id="username-input" value={formData.username} onChange={handleFormChange} placeholder='Username' />
                </div>
                <div>
                    <input type="password" name="password" id="password-input" value={formData.password} onChange={handleFormChange} placeholder='Password' />
                </div>
                <div>
                    <input type="text" name="firstname" id="firstname-input" value={formData.firstname} onChange={handleFormChange} placeholder='First Name' />
                </div>
                <div>
                    <input type="text" name="lastname" id="lastname-input" value={formData.lastname} onChange={handleFormChange} placeholder='Last Name' />
                </div>
                <button type="submit">Create Account</button>
            </form>
        </> 
     );
}

export default SignUp;