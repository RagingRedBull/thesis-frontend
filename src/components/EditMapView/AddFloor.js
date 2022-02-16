import axios from "axios"
import { useState } from "react"
import { Modal, ModalTitle } from "react-bootstrap";
import MessageBox from "../MessageBox";

const AddFloor = ({show, setShow, floors, setFloors}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageFile, setImageFile] = useState()
    const [message, setMessage] = useState()
    const [isSuccess, setIsSuccess] = useState(false)

    const submit = async (e) => {
        e.preventDefault()

        if (!name) {
            setMessage('Please enter the name of the Floor')
            return null
        }
        if (!description) {
            setMessage('Please enter the description of the Floor')
            return null
        }
        if (!imageFile) {
            setMessage('Please enter the image file of the Floor')
            return null
        }

        const imageUrl = await saveImage()
        if (!imageUrl) {
            setMessage("Failed to save image.")
            return null
        }

        saveFloor(imageUrl)        
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
                headers: { "Content-Type": "multipart/form-data" }
            })

            const data = await response.data.imageUrl
            return data
            
        } catch (error) {
            return null
        }
    }

    const saveFloor = async (imageUrl) => {
        const floor = {
            "name": name,
            "description": description,
            "imageUrl": imageUrl,
            "order": floors[floors.length - 1].order + 1 
        }

        axios.post( global.config.server.url + "/floor/new", floor)
            .then(response => { 
                if (response.status === 200) {
                    setMessage("Successfully Added Floor!")
                    setIsSuccess(true)
                    setFloors([...floors, response.data])
                } else {
                    setMessage("Error! Unable to add floor.")
                }
            })
            .catch(error => { setMessage("Error! Unable to add floor.") })
    }

    const handleClose = () => {
        setShow(false)
        setMessage(null)
        setIsSuccess(false)
        setName(null)
        setDescription(null)
        setImageFile(null)
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={submit}>
                <Modal.Header closeButton>
                    <ModalTitle>Add Floor</ModalTitle>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group m-1">
                    { message ? <MessageBox message={ message } isSuccess={ isSuccess } /> : null }
                    </div>
                    <div className="form-group m-1">
                        <label>Name:</label>
                        <input
                            type='text'
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group m-1">
                        <label>Description:</label>
                        <input
                            type='text'
                            className="form-control"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group m-1">
                        <label>Image:</label>
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
                        onClick={handleClose}
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block"
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
};

export default AddFloor;
