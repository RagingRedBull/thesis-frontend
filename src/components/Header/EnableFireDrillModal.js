import axios from "axios";
import React from "react";
import { Modal } from "react-bootstrap";

const EnableFireDrillModal = ({ show, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };

  const establishFireDrill = async () => {
    axios
      .get(global.config.server.url + "/fire-drill/update", {
        params: {
          enableFireDrillMode: true,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Successfully enabled fire drill.");
        } else {
          alert("Enabling fire drill was unsuccessful.");
        }
      })
      .catch((err) => {
        alert("Unable to establish fire drill.");
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Enable Fire Drill</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to start a fire drill?</Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => {
            establishFireDrill();
            handleClose();
          }}
        >
          Enable
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnableFireDrillModal;
