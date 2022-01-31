import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    //Checks if all fields are empty
    if (!username) {
      alert("Please enter username");
      return null;
    }
    if (!currentPassword) {
      alert("Please enter the old password");
      return null;
    }
    if (!newPassword) {
      alert("Please enter the new password");
      return null;
    }
    if (!confirmPassowrd) {
      alert("Please confirm your password");
      return null;
    }

    /**
     * Once keycloak is good
     * TODO: Check if username and oldpassword exists as an account
     * Check if newpassword is equal to oldpassword
     * Check if newpassword already exists
     * Check if confirmpassowrd matches with new password
     * Change instances of Change Password to Reset Password
     */
  };

  return (
    <div className="container">
      <Form className="mb-4">
        <Form.Group className="mb-3" controlId="formHeader">
          <div className="card-header">
            <h3>Change Password</h3>
          </div>
        </Form.Group>

        <Form.Group controlId="formBody">
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Account Username</Form.Label>
            <Form.Control
              type="text"
              style={inputStyle}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCurrentPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              style={inputStyle}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Current Password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>New Password Credentials</Form.Label>
            <Form.Control
              type="password"
              style={inputStyle}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
            />

            <Form.Control
              type="password"
              style={inputStyle}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
            />
          </Form.Group>
        </Form.Group>
        <Button
          className="btn btn-primary btn-block form-control"
          type="submit"
          onClick={onSubmit}
        >
          Reset Password
        </Button>
      </Form>
      <Link to="/login">
        <button className="btn btn-secondary">Back to Login</button>
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

export default ChangePassword;
