import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

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
      <Form className="mb-4">
        <Form.Group className="mb-3" controlId="formHeader">
          <div className="card-header">
            <h3>Login</h3>
          </div>
        </Form.Group>

        <Form.Group controlId="formBody">
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              style={inputStyle}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              style={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </Form.Group>
        </Form.Group>
        <Button
          className="btn btn-primary btn-block form-control"
          type="submit"
          onClick={onSubmit}
        >
          Login
        </Button>
      </Form>
      <Link to="/change-password">
        <button className="btn btn-secondary">Reset Password</button>
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
