import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    password: '',
    role: '',
    isApproved: false
    });

    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
    const { id, value, type } = e.target;
    const newValue = type === 'checkbox' ? e.target.checked : value;
    setFormData({ ...formData, [id]: newValue });
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
                    password: formData.password,
                    role: formData.role,
                })
            };

            const response = await fetch("http://localhost:5000/api/signup", requestOptions);
            const result = await response.json();

            if (response.ok) {
                setModalMessage('User signup successful!');
            } else {
                setModalMessage(result.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error, show error message to the user, etc.
        }
        finally {
            setShowModal(true);
        }
    };
     
      const closeModal = () => {
        setShowModal(false);
        setModalMessage('');
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
                            <div className="form my-3">
                <label htmlFor="role">Role</label>
                <select
                  className="form-control"
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="admin">Admin</option>
                  <option value="delivery_head">Delivery Head</option>
                </select>
              </div>
                            <div className="my-3">
                                <p>Already have an account? <Link to="/login" style={{color:"#7071E8"}}>Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button className="btn" href="/event" style={{backgroundColor:"#7071E8", color:"white"}} type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                         {showModal && (
                    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Message</h5>
                                    <button type="button" className="close" onClick={closeModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}
