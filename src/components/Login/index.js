import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please enter username");
      return null;
    }
    if (!password) {
      alert("Please enter password");
      return null;
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="card-header">
          <h5>Login</h5>
        </div>
        <div className="card-body">
          <div className="input-container">
            <input
              type="text"
              style={inputStyle}
              onChange={(e) => setUsername(e.target.value)}
              //required
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              style={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
              //required
              placeholder="Password"
            />
          </div>
        </div>
        <div className="card-footer">
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-secondary btn-block form-control"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <Link to = '/change-password'>
          <button className="btn-primary">Reset Password</button>
      </Link>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  height: "40px",
  margin: "5px",
  padding: "3px 7px",
  fontSize: "17px",
};

export default Login;
