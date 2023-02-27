import React, { useState } from 'react';

function ForgotPassword({setIsForgotPasswordFormVisible}) {
    const [emailError, setEmailError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
    });

    const clearForm = () => {
       setFormData({
        email: '',
       })
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        alert("Feature in development, thanks for your patience!")

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        }
    
        const response = await fetch(`/reset-password`, options)
        const sqlQuery = await response.json()
        if (sqlQuery.validation) {
            clearForm()
            
        } else {
            clearForm()
            setEmailError(sqlQuery.message.toUpperCase())
        }
    }

    return ( 
        <>
            <div className='User-Form-Close-Btn-Container' >
                <button id='User-Form-Close-Btn' onClick={() => setIsForgotPasswordFormVisible(false)}>X</button>
            </div>
            <div>
                <h2>Forgot Password Request</h2>
            </div>
            <div>
                <p>Please complete to initialize your forgot password request:</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" name="email" id="forgot-password-email-input" value={formData.email} onChange={handleFormChange} placeholder='Email' required/>
                </div>
                <div className='Email-Error'>{emailError}</div>
                <button type="submit">Submit</button>
            </form>
        </>        
    );
}

export default ForgotPassword;