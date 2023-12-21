import React, { useState }  from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";


export default function Login (){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVariant, setAlertVariant] = useState(""); // Variant for different alert styles
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false); // State for faded background
  const navigate = useNavigate();

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

         setLoading(true);
         setShowBackdrop(true); // Show the faded background

        setTimeout(() => {
          setShowBackdrop(false);
          setLoading(false); // Hide the spinner after navigation
          navigate('/event');
          
        }, 3000);

          setAlertVariant("success");
          setAlertMessage("Login Successful!");
          setTimeout(() => {
            setShowAlert(true); // show the success alert after 1 seconds
          }, 1000);

          setTimeout(() => {
            setShowAlert(false); // Hide the success alert after 3 seconds
          }, 3000);
      }
       else {
        setLoading(false);
        setAlertVariant("danger");
        setAlertMessage(data.message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000); // Close success alert after 1 seconds
      }
    } catch (error) {
      setAlertVariant("danger");
      setAlertMessage("An error occurred");
      setShowAlert(true);
      console.error("Error:", error);
      setTimeout(() => setShowAlert(false), 2000); // Close success alert after 1 seconds
      setLoading(false);
    }
  };

 

  return (
    <>

      {showBackdrop && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity here
            zIndex: 9998,
          }}
        ></div>
      )}

      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <Spinner animation="border" variant="dark" role="status" />
        </div>
      )}

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
                <button className="btn" style={{backgroundColor:"#7071E8", color:"white"}} type="submit">Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          <Alert
            variant={alertVariant}
          >
            {alertMessage}
          </Alert>
          </div>
      )}
      
    </>
  );
};

