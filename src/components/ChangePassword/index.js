import React from "react";
import { useState } from "react";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    //Checks if all fields are empty
    if (!username) {
      alert("Please enter username");
      return null;
    }
    if (!oldPassword) {
      alert("Please enter the old password");
      return null;
    }
    if (!newPassword) {
      alert("Please enter the new password");
      return null;
    }

    /**
     * Once keycloak is good
     * TODO: Check if username and oldpassword exists as an account
     * Check if newpassword is equal to oldpassword
     * Check if newpassword already exists
     */
  };

  return (
    <div className="container">
      <div className="card-w-25">
        <form onSubmit={onSubmit}>
          <div className="card-header">
            <h5>Change Password</h5>
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
                onChange={(e) => setOldPassword(e.target.value)}
                //required
                placeholder="Old Password"
              />
            </div>
            <div className="input-container">
              <input
                type="password"
                style={inputStyle}
                onChange={(e) => setNewPassword(e.target.value)}
                //required
                placeholder="New Password"
              />
            </div>
          </div>
          <div className="card-footer">
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-secondary btn-block form-control"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
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
