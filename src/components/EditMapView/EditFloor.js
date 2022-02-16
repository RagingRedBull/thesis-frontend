import { useEffect, useState } from 'react'
import { Modal, ModalTitle } from 'react-bootstrap'

const EditFloor = ({show, setShow, currentFloor, handleUpdate, deleteFloor}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        if (currentFloor) {
            setName(currentFloor.name)
            setDescription(currentFloor.description)
            setImageUrl(currentFloor.imageUrl)
        }
    }, [show, currentFloor])

    const handleClose = () => {
        setShow(false)
        setName('')
        setDescription('')
        setImageUrl('')
    }

    const updateFloor = (e) => {
        e.preventDefault()

        const floor = {
            id: currentFloor.id,
            name: name,
            description: description,
            imageUrl: imageUrl,
            order: currentFloor.order
        }

        console.log(floor)
        handleUpdate(floor)
        handleClose()
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={ updateFloor }>
                <Modal.Header closeButton>
                    <ModalTitle>Edit Floor</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group m-1">
                        <label>Name:</label>
                        <input
                            type='text'
                            className="form-control"
                            value={ name }
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group m-1">
                        <label>Description:</label>
                        <input
                            type='text'
                            className="form-control"
                            value={ description }
                            onChange={(e) => {setDescription(e.target.value)}}
                        />
                    </div>
                    <div className="form-group m-1">
                        <label className='img-url-label'><span className='floor-img-url'>Image: { imageUrl }</span></label>
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
                        onClick={ handleClose }
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger btn-block"
                        onClick={ () => {
                            deleteFloor(currentFloor.id)
                            handleClose()
                        }}
                    >
                        Delete
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