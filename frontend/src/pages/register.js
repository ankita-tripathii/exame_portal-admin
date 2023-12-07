import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        emailId: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submitted!');

        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    emailId: formData.emailId,
                    password: formData.password
                })
            };

            const response = await fetch("http://localhost:5000/api/signup", requestOptions);
            const result = await response.text();
            console.log(result);
            // Handle response as needed
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message to the user, etc.
        }
    };

    return (
        <>
            <div className="container my-3 py-3">
                <h1 style={{color: "#7071E8"}} className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter Your Name"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="emailId"
                                    placeholder="name@example.com"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already have an account? <Link to="/login" style={{color:"#7071E8"}}>Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="btn" style={{backgroundColor:"#7071E8", color:"white"}} type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
