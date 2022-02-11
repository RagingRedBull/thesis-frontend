import { Modal, ModalTitle } from 'react-bootstrap'

const EditFloor = ({show, setShow, currentFloor}) => {
    const handleClose = () => {
        setShow(false)
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form>
                <Modal.Header closeButton>
                    <ModalTitle>Edit Floor</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group m-1">
                        <label>Name:</label>
                        <input
                            type='text'
                            className="form-control"
                            value={ currentFloor.name }
                            onChange={(e) => console.log(e.target.value)}
                        />
                    </div>
                    <div className="form-group m-1">
                        <label>Description:</label>
                        <input
                            type='text'
                            className="form-control"
                            value={ currentFloor.description }
                            onChange={(e) => console.log(e.target.value)}
                        />
                    </div>
                    <div className="form-group m-1">
                        <label className='img-url-label'><span className='floor-img-url'>Image: { currentFloor.imageUrl }</span></label>
                        <input
                            id='upload'
                            type='file'
                            className="form-control"
                            onChange={(e) => console.log(e.target.files[0])}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary btn-block"
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block"
                    >
                        Save
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default EditFloor