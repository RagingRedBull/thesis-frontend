import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Header from "./Header";
import SideNav from "./SideNav";
import '../../css/ChangePassword.css';
import UserService from "../../services/UserService";
import axios from "axios";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(currentPassword)
    console.log(newPassword)
    console.log(confirmPassword)

    //Checks if all fields are empty
    if (!currentPassword) {
      alert("Please enter the old password");
      return null;
    }
    if (!newPassword) {
      alert("Please enter the new password");
      return null;
    }
    if (!confirmPassword) {
      alert("Please confirm your password");
      return null;
    }

    updatePassword()

    /**
     * Once keycloak is good
     * TODO: Check if username and oldpassword exists as an account
     * Check if newpassword is equal to oldpassword
     * Check if newpassword already exists
     * Check if confirmpassowrd matches with new password
     * Change instances of Change Password to Reset Password
     */
  };

  const updatePassword = async () => {
    axios.post(
      "http://192.168.50.145:8083/auth/realms/prmts/account/credentials/password",
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      },
      {
        headers: {
          Authorization: `Bearer ${UserService.getToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    ).then((response) => {
      console.log(response)
    })
  }

  return (
    <div className="container-fluid change-password-container row p-0 m-0">
      <div className="side-navigation-reports col-1 p-0 text-center ">
        <SideNav />
      </div>
      <div className='h-100 col-11 p-0 m-0 row g-0'>
        <Header />
        <div className="form">
          <Form className="mb-4">
            <Form.Group className="mb-3" controlId="formHeader">
              <div className="card-header">
                <h3>Change Password</h3>
              </div>
            </Form.Group>
            <div className="card-body ms-5 me-5">
              <Form.Group controlId="formBody">
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmNewPassword">
                  <Form.Control
                    type="password"
                    style={inputStyle}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                  />
                </Form.Group>
              </Form.Group>
            </div>
          </Form>
          <div className="card-footer">
            <Button
              className="btn btn-primary btn-block form-control"
              type="submit"
              onClick={onSubmit}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
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
