import React, { Component } from "react"
import { FormAction, FormLabel, FormButton, FormMessage } from "../form";
import API from "../../utils/API";
import ErrorMessage from "../errorMessage"
import "./style.css"

class LoginForm extends Component {
    state = {
        userInfo:
            [
                {
                    for: "email",
                    label: "Enter your email",
                    value: ""
                },
                {
                    for: "password",
                    label: "Enter your password",
                    value: "",
                }
            ],
        formMessage:
        {
            message: "No Account?",
            action: "Register",
            alt: "signup"
        },
        hasError: false
    }

    handleInputChange = event => {
        const value = event.target.value;
        const key = event.target.getAttribute("data-id")
        let copy = [...this.state.userInfo]
        copy[key].value = value
        this.setState({
            userInfo: copy
        })
    }



    handleSubmitButtonClick = event => {
        event.preventDefault();
        if (this.state.userInfo[0].value && this.state.userInfo[1].value) {
            API.login(
                {
                    email: this.state.userInfo[0].value,
                    password: this.state.userInfo[1].value
                }
            )
                .then(res => {
                    if (res.data.status === "success") {
                        window.location.reload()
                    }
                    else if (res.data.status === "unsuccessful") {
                        this.setState(
                            { hasError: true }
                        )
                    }
                }

                )
                .catch(err => console.log(err))
        }
        else {
            this.setState(
                { hasError: true }
            )
        }
    }

    handleCloseButtonClick = event => {
        event.preventDefault();

        this.setState({
            hasError: false
        })
    }

    resetError = () => {
        if (this.state.hasError) {
            setTimeout(() => {
                this.setState({
                    hasError: false
                })
            }, 2000)
        }
    }


    render() {
        this.resetError()
        return (
            <div>
                {(this.state.hasError) ?
                    (<ErrorMessage
                        message="Invalid email/password"
                        handleCloseButtonClick={this.handleCloseButtonClick}
                    />) :
                    ("")
                }
                <FormAction
                    submit={this.handleSubmitButtonClick}
                >
                    {this.state.userInfo.map((info, i) => {

                        return (
                            <FormLabel
                                key={i}
                                data={i}
                                for={info.for}
                                label={info.label}
                                value={info.value}
                                handleChange={this.handleInputChange}
                            />
                        );
                    }
                    )}

                    <FormMessage
                        message={this.state.formMessage.message}
                        path={this.props.path}
                        action={this.state.formMessage.action}
                        id={this.state.formMessage.alt}
                    />
                    <FormButton
                        nameButton="Submit"
                        moreClass="login-button"
                        icon="fas fa-sign-in-alt"
                        handleButtonClick={this.handleSubmitButtonClick}
                    />
                </FormAction>

            </div>
        )
    }
}

export default LoginForm;