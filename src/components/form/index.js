import React from "react"
import "./style.css"
export function FormContainer({ children }) {
    return (
        <div className="row mt-5 mb-3">
            <div className="col-md-6 m-auto">
                <div className="card card-body">
                    {children}
                </div>
            </div>
        </div>
    )
};

export function FormTitle(props) {
    return (
        <h1 className={"text-center mb-3 title-for-form " + props.moreClass}><i className={props.icon}></i> {props.title}</h1>
    )
};

export function FormAction(props) {
    return (
        <form onSubmit={props.submit}>
            {props.children}
        </form>
    )
}

export function FormLabel(props) {
    return (
        <div className="form-group text-left">
            <label for={props.for}>{props.label}</label>
            <input data-id={props.data} value={props.value} disabled={props.disabled} type={props.for} id={props.for} name={props.for} className="form-control" placeholder={props.placeholder} onChange={props.handleChange} />
        </div>
    )
}

export function InputText(props) {
    return (
        <div className="form-group text-left">
            <label for={props.for}>{props.label}</label>
            <textarea value={props.value} id={props.for} name={props.for} className="form-control" rows="4" placeholder={props.placeholder} onChange={props.handleChange}></textarea>
        </div>
    )
}

export function Dropdown(props){
    return (
        <div className="form-group text-left">
            <label for={props.for}>{props.label}</label>
            <select data-id={props.data} disabled={props.disabled} value={props.value} size={props.size} onFocus={props.onfocus} onBlur={props.onblur} className="form-control" id={props.for} name={props.for} onChange={props.handleChange}>
                {props.children}
            </select>
        </div>
    )
}

export function OptionForDropdown(props) {
    return (
        <option value={props.value}>{props.option}</option>
    )
}

export function FormButton(props) {
    return (
        <button type="submit" className={"btn " + props.moreClass} onClick={props.handleButtonClick}><i className={props.icon}></i> {props.nameButton} </button>
    )
}

export function FormMessage(props) {
    return (
        <p className="lead mt-4">
            {props.message} <a href="#" id={props.id} onClick={props.path}>{props.action}</a>
        </p>
    )
}

export function CommentDisplay(props) {
    return (
        <div>
        <p className="lead mt-4 comment-text">
        <label for={props.for} className="label-comment font-weight-bold">{props.posterName}:</label>
            {" "}{props.comment}
        </p>
        <p>posted {props.updatedAt}</p>
        </div>
    )
}

export function CommentSubmitButton(props) {
    return (
        <button type="submit" className="btn comment-button font-weight-bold" onClick={props.handleButtonClick}>Submit Comment </button>
    )
}