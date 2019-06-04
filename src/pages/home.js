// this is the landing page
import React, { Component } from "react";
import { FormTitle } from "../components/./form";
import "../style/home.css";
import LoginForm from "../components/./loginForm";
import SignUp from "../components/signUp-Form";


class Home extends Component {

    state = {
        form: "Sign-Up"
    };

    handleButtonClick = event => {
        event.preventDefault();
        if (event.target.id === "signup") {
            this.setState({
                form: "Sign-Up"
            })
        }
        else {
            this.setState({
                form: "Login"

            })
        }
    }

    render() {
        return (
            <div className="container main">
                <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <FormTitle
                                    icon="fas fa-sign-in-alt"
                                    title={this.state.form}
                                />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {(this.state.form === "Sign-Up") ?
                                    <SignUp
                                        path={this.handleButtonClick}
                                    />
                                        :
                                    < LoginForm
                                        path={this.handleButtonClick}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <img className="logo" src="/images/logo-only-color.png" alt="logo" />
                <h1 className="text-center mt-3 welcome-text">Welcome to APP@rent!</h1>
                <p id="welcome-subtext" className="text-center font-weight-bold">An app to meet other parents and share information!</p>

                <div className="row">
                    <div className="col-6 text-center">
                        <button className="button" id="signup" data-toggle="modal" data-target="#exampleModalLong" onClick={this.handleButtonClick}>Sign-up</button>
                    </div>

                    <div className="col-6 text-center">
                        <button className="button" id="login" data-toggle="modal" data-target="#exampleModalLong" onClick={this.handleButtonClick}>Login</button>
                    </div>
                </div>

            </div>
        )
    }

}

export default Home;