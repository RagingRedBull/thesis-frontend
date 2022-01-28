import axios from "axios"
import { useState } from "react"
import MessageBox from "./MessageBox";

const AddFloor = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageFile, setImageFile] = useState()
    const [message, setMessage] = useState()

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please enter the name of the Floor')
            return null
        }
        if (!description) {
            alert('Please enter the description of the Floor')
            return null
        }
        if (!imageFile) {
            alert('Please enter the image file of the Floor')
            return null
        }

        const imageUrl = await saveImage()
        if (!imageUrl) {
            setMessage("Failed to save image.")
            return null
        }

        saveFloor(imageUrl)
    }

    const saveImage = async () => {
        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const response = await axios({
                method: "post",
                url: "http://192.168.67.128:8080/prmts/images/new",
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
            "imageUrl": imageUrl
        }

        axios.post("http://192.168.67.128:8080/prmts/floor/new", floor)
            .then(response => { 
                if (response.status === 200) {
                    setMessage("Successfully added the floor!")
                } else {
                    setMessage("Error! Unable to add floor.")
                }
            })
            .catch(error => { setMessage("Error! Unable to add floor.") })
    }

    return (
        <div className="card w-25">
            <form onSubmit={onSubmit}>
                <div className="card-header">
                    <h5>Add Floor</h5>
                </div>
                <div className="card-body">
                    <div className="form-group m-1">
                        { message ? <MessageBox message={ message } /> : null }
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
                </div>
                <div className="card-footer">
                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-secondary btn-block form-control"
                        >
                            Submit
                        </button>
                    </div>
                    
                </div>
            </form>
        </div>
        
    )
};

export default AddFloor;
