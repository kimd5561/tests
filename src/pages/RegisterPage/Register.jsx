import React from "react";
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import "./register.css"
import logo from "../../IMG/logo.png"

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password_one: "",
        password_two: ""
    }); 

    const [errors, setErrors] = useState({});


    /* Updates formData with user input */
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const redirectToLandingPage = () => {
        navigate("/");
    };

    const redirectToLoginPage = () => {
        navigate("/login");
    } 

    /* Handles the submission of the register form */
    const handleSubmit = async (e) => {
        e.preventDefault();


        const requiredFields = {
            first_name: 'First Name',
            last_name: 'Last Name',
            username: 'Username',
            email: 'Email',
            password_one: 'Password',
            password_two: 'Confirmation Password'
        };

        const minLength = {
            first_name: 2,
            last_name: 2,
            username: 3,
            email: 5,
            password_one: 8,
            password_two: 8
        };

        const maxLength = {
            first_name: 20,
            last_name: 20,
            username: 20,
            email: 50,
            password_one: 64,
            password_two: 64
        };

        const fieldRegex = {
            first_name: /^[a-zA-Z]+$/,
            last_name: /^[a-zA-Z]+$/,
            username: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            password_one: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            password_two: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
        };

        const validContents = {
            first_name: "Must contain only letters",
            last_name: "Must contain only letters",
            username: "Must start with a letter; letters, numbers, _ or - only",
            email: "Invalid email address",
            password_one: "Include upper and lowercase letter, number and symbol",
            password_two: "Include upper and lowercase letter, number and symbol"
        };
 

        // Perform some basic validation
        let validationErrors = {};
        Object.keys(formData).forEach((key) =>{
            const clean_value = formData[key].trim();
            if(!clean_value) {
                validationErrors[key] = `${requiredFields[key]} is required`;
            } else if (clean_value.length < minLength[key]) {
                validationErrors[key] = `Must be at least ${minLength[key]} characters`;
            } else if (clean_value.length > maxLength[key]) {
                validationErrors[key] = `Must be at most ${maxLength[key]} characters`;
            } else if (!fieldRegex[key].test(clean_value)) {
                validationErrors[key] = validContents[key];
            }
        });

        const password_one = formData['password_one'].trim();
        const password_two = formData['password_two'].trim();
        if(password_one !== password_two && !('password_one' in validationErrors)) {
            validationErrors['password_one'] = "Passwords do not match";
            validationErrors['password_two'] = "Passwords do not match";
        }
        
        setErrors(validationErrors);
        if(Object.keys(validationErrors).length > 0) {
            return;
        }


        /* User inputs have passed basic validation. Now we have to send to the data to the backend */
        try {
            // Send formData to the backend api
            const response = await fetch("./server/register.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            
            // Await the backend api's response to the input data
            const result = await response.json();

            let backendErrors = {};
            if(!result.success) {
                for (let key in result.errors) {
                    backendErrors[key] = result.errors[key];
                }
            } else {
                navigate("/home");
            }
            
            setErrors(prev => ({ ...prev, ...backendErrors }));
        } catch (err) {
            console.error("Error connecting to server" + err);
        }

    };


    
    return (
        <>
            <title>Register</title>

           {/* Navigation */}
            <nav className="relative z-10 px-6 sm:px-8 md:px-12 py-6 md:py-8">
                <div className="w-full flex items-center justify-between">
                {/* Logo */}
                    <img
                    src={logo}
                    alt="Logo"
                    className="logo w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                    onClick={redirectToLandingPage}/>
                </div>
            </nav> 


            <div className="container">
                <div className="register-form-container">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <h1 className="form-header">Create Account</h1>

                        <div className="input-container">
                            {<span className="form-error">{errors.first_name || "\u00A0"}</span>}
                            <input name="first_name" className={errors.first_name ? "input-field error-input" : "input-field"} type="text" placeholder="First Name" 
                            value={formData.first_name} onChange={handleChange} maxLength={20}/>                            
                        </div>

                        <div className="input-container">
                            {<span className="form-error">{errors.last_name || "\u00A0"}</span>}
                            <input name="last_name" className={errors.last_name ? "input-field error-input" : "input-field"} type="text" placeholder="Last Name"
                            value={formData.last_name} onChange={handleChange} maxLength={20}/>
                        </div>

                        <div className="input-container">
                            {<span className="form-error">{errors.username || "\u00A0"}</span>}
                            <input name="username" className={errors.username ? "input-field error-input" : "input-field"} type ="text" placeholder="Username"
                            value={formData.username} onChange={handleChange} maxLength={20}/>
                        </div>

                        <div className="input-container">
                            {<span className="form-error">{errors.email || "\u00A0"}</span>}
                            <input name="email" className={errors.email ? "input-field error-input" : "input-field"} type="email" placeholder="Enter Email"
                            value={formData.email} onChange={handleChange} maxLength={50}/>
                        </div>

                        <div className="input-container">
                            {<span className="form-error">{errors.password_one || "\u00A0"}</span>}
                            <input name="password_one" className={errors.password_one ? "input-field error-input" : "input-field"} type="password" placeholder="Password"
                            value={formData.password_one} onChange={handleChange} maxLength={64}/>
                        </div>
                       
                        <div className="input-container">
                            {<span className="form-error">{errors.password_two || "\u00A0"}</span>}
                            <input name="password_two" className={errors.password_two ? "input-field error-input" : "input-field"} type="password" placeholder="Confirm Password"
                            value={formData.password_two} onChange={handleChange} maxLength={64}/>
                        </div>
                        
                        <button className="submit-button" type="submit">Create Account</button>
                    </form>
                    <p className="form-ending-text">Already have an account? <Link to="/login" className="link">Sign In</Link></p>
                </div>
            </div>
        </>
   
    );
}

export default Register;