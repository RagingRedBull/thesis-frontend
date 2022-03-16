import { useEffect, useState } from 'react'
import { Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'
import UserService from "../../services/UserService"
import MessageBox from "../MessageBox"

const EditFloor = ({show, setShow, currentFloor, handleUpdate, deleteFloor}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imageFile, setImageFile] = useState()
    const [message, setMessage] = useState()

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

    const updateFloor = async (e) => {
        e.preventDefault()

        var newImageUrl = imageUrl

        if (imageFile) {
            newImageUrl = await saveImage()
            if (!newImageUrl) {
                return null
            }
        }

        const floor = {
            id: currentFloor.id,
            name: name,
            description: description,
            imageUrl: newImageUrl,
            order: currentFloor.order
        }

        handleUpdate(floor)
        handleClose()
    }

    const saveImage = async () => {
        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const response = await axios({
                method: "post",
                url:  global.config.server.url + "/images/new",
                data: formData,
                headers: { 
                    "Content-Type": "multipart/form-data", 
                    Authorization: `Bearer ${UserService.getToken()}`
                }
            })

            const data = await response.data.imageUrl
            return data
            
        } catch (error) {
           setMessage(error.response.data.message)
        }
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={ updateFloor }>
                <Modal.Header closeButton>
                    <ModalTitle>Edit Floor</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group m-1">
                        { message ? <MessageBox message={ message } /> : null }
                    </div>
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
                            onChange={(e) => setImageFile(e.target.files[0])}
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