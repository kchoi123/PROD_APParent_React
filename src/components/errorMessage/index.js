import React from "react"

function ErrorMessage(props) {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <button onClick={props.handleCloseButtonClick} type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {props.message}
        </div>
    )

}

export default ErrorMessage;
