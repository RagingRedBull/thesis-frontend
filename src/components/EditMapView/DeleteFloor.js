import { Modal, ModalTitle } from "react-bootstrap";

const DeleteFloor = ({show, setShow, floors, setFloors, floorId}) => {
    const handleClose = () => {
        setShow(false)
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton>
                <ModalTitle>Delete Floor</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <h6>Are you sure you want to delete this floor? { floorId }</h6>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-success btn-block"
                >
                Yes
                </button>
                <button
                    className="btn btn-secondary btn-block"
                    onClick={ handleClose }
                >
                No
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteFloor