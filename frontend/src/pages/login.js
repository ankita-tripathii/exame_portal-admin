import React from "react";
import { Link } from "react-router-dom";

export default function Login (){
  return (
    <>
      <div className="container my-3 py-3">
        <h1 style={{color: "#7071E8"}}className="text-center">Login</h1>
        <hr />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="my-3">
                <label for="display-4">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
              </div>
              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" style={{color:"#7071E8"}} >Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="btn" style={{backgroundColor:"#7071E8", color:"white"}} type="submit">
                 Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </>
  );
};

