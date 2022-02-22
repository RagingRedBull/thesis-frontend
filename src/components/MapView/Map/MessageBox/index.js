const MessageBox = ({ message, isSuccess }) => {
    return (
        <div className= {isSuccess ? "alert alert-success alert-dismissible" :  "alert alert-warning alert-dismissible"} role="alert">
            { message }         
        </div>
    )
}

// "alert alert-primary alert-dismissible"

export default MessageBox;
