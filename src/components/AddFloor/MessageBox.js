const MessageBox = ({ message }) => {
    return (
        <div className="alert alert-primary alert-dismissible fade show" role="alert">
            { message }
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default MessageBox;
