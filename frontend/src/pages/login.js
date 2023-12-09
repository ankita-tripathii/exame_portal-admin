import React, { useState }  from "react";
import { Link } from "react-router-dom";


export default function Login (){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: email,
        password: password,
      }),
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:5000/api/login", requestOptions);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store token in localStorage
        setModalMessage("Login Successful!");
        setModalOpen(true);

    

      } else {
        setModalMessage(data.message);
        setModalOpen(true);
      }
    } catch (error) {
      setModalMessage("An error occurred");
      setModalOpen(true);
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <>
      <div className="container my-3 py-3">
        <h1 style={{color: "#7071E8"}}className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleLogin}>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  value={email}
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" style={{color:"#7071E8"}} >Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="btn" style={{backgroundColor:"#7071E8", color:"white"}} type="submit"><Link to="/event"style={{color:"white"}}>
                 Login</Link>
                </button>
              </div>
            </form>

            {/* Modal for displaying messages */}
      {modalOpen && (
        <div className="modal" style={{ display: "block"}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login Status</h5>
                <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">{modalMessage}</div>
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
        </div>
      </div>
      
    </>
  );
};

