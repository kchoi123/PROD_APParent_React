//This component is for Edit or View my Profile 
import React, { Component } from "react";
import { FormContainer, FormTitle, FormLabel, FormButton, Dropdown, OptionForDropdown } from "../form";
import API from "../../utils/API";
import KidProfile from "../kidProfile";
import "./style.css";

const statesList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

class MyProfile extends Component {

    state = {
        sizeDropdownState: 1,
        disabled: true,
        kidDisabled: true,
        userOriginalInfo: this.props.loggedInParent,
        userInfo:
            [
                {
                    for: "userName",
                    label: "Enter your username",
                    value: this.props.userName,
                },
                {
                    for: "city", //db column
                    label: "Enter your city", //message u see 
                    value: this.props.city
                },
                {
                    for: "state",
                    label: "Choose a state",
                    value: this.props.state,
                    options: statesList
                },
                {
                    for: "photoLink",
                    label: "Enter a link for your profile picture",
                    value: this.props.photoLink
                }
            ], 
        kids: [], //Holds all the info related to kids 
    };

    handleInputChange = event => {
        // const {name, value} = event.target;
        const value = event.target.value;
        // const column = event.target.id;
        const key = event.target.getAttribute("data-id")
        let copy = [...this.state.userInfo]
        copy[key].value = value
        this.setState({
            userInfo: copy,
            sizeDropdownState: 1
            // [column] : value
        })

    }

    // Enable the User to update his profile 
    handleEditButtonClick = event => {
        event.preventDefault();
        // console.log("EDIT MY PROFILE");
        this.setState({
            disabled: false
        })
    }

    // Save the changes made to the profile and update the page without reloading
    handleUpdateButtonClick = event => {
        event.preventDefault();
        // console.log("SAVE MY PROFILE");
        this.setState({
            disabled: true,
            sizeDropdownState: 1
        })

        const userUpdatedData = {
            userName: this.state.userInfo[0].value,
            city: this.state.userInfo[1].value,
            state: this.state.userInfo[2].value,
            photoLink: this.state.userInfo[3].value
        }

        console.log("Parent Details ", userUpdatedData);

        // update the user profile 
        API.updateProfile(userUpdatedData)
            .then(res => {
                // retrieve the info of the logged in parent after updating
                // display the updated info on the page without reloading the page
                this.props.updateParentProfileSection();
                // update the userOriginalInfo with the updated user data
                this.setState({
                    userOriginalInfo: userUpdatedData
                })
                console.log("user original info: ", this.state.userOriginalInfo)
            })
            .catch(err => console.log(err));
    }

    // Repopulate the input fields with the previous parent data
    handleCancelButtonClick = event => {
        event.preventDefault();

        let copyUserInfo = [...this.state.userInfo];
        copyUserInfo[0].value = this.state.userOriginalInfo.userName;
        copyUserInfo[1].value = this.state.userOriginalInfo.city;
        copyUserInfo[2].value = this.state.userOriginalInfo.state;
        copyUserInfo[3].value = this.state.userOriginalInfo.photoLink;

        this.setState({
            userInfo: copyUserInfo,
            sizeDropdownState: 1,
            disabled: true
        });
    }

    componentDidMount() {
        // retrieves all the kids for the logged in parent... 
        API.findAllKidsForAParent()
            .then(
                res => {
                    // console.log("Kids for parent", res.data);
                    this.setState({
                        kids: res.data
                    })
                }
            )
            .catch(err => console.log(err));

    }

    render() {
        return (
            <div>
                <FormContainer>
                    {/* <FormAction 
                    route={props.route} > */}
                    {this.state.disabled ?
                        <div className="row ml-3">
                            {/* Image of the loggeed in user */}
                            <img className="rounded-circle profile-view mr-5 mb-3" src={this.props.photoLink ? (this.props.photoLink) : ("http://lorempixel.com/125/125/people/2/cc")} alt={this.props.userName} />
                            <FormTitle
                                moreClass="ml-4"
                                title="View My Profile"
                                icon="fas fa-eye"
                            />
                        </div>
                        :
                        <div className="row ml-3">
                            {/* Image of the loggeed in user */}
                            <img className="rounded-circle profile-view mr-5 mb-3" src={this.props.photoLink ? (this.props.photoLink) : ("http://lorempixel.com/125/125/people/2/cc")} alt={this.props.userName} />
                            <FormTitle
                                moreClass="ml-4"
                                title="Update Profile Info"
                                icon="fas fa-edit"
                            />
                        </div>
                    }
                   
                    {/* Rendering Form labels using the userInfo object values */}

                    {this.state.userInfo.map((user, i) => {
                        if (user.for !== "state") {

                            return (
                                <FormLabel
                                    key={i}
                                    data={i}
                                    for={user.for}
                                    name={user.for}
                                    label={user.label}
                                    disabled={this.state.disabled}
                                    value={user.value}
                                    handleChange={this.handleInputChange}
                                />
                            );
                        } else {
                            return (
                                <Dropdown
                                    key={i}
                                    data={i}
                                    for={user.for}
                                    label={user.label}
                                    value={user.value}
                                    disabled={this.state.disabled}
                                    handleChange={this.handleInputChange}
                                    size={this.state.sizeDropdownState}
                                    onfocus={()=>{this.setState({sizeDropdownState: 5})}}
                                    onblur={()=>{this.setState({sizeDropdownState: 1})}}
                                >
                                    {user.options.map((item, j) => {
                                        return (
                                            <OptionForDropdown
                                                option={item}
                                                value={item}
                                                key={j}
                                            />
                                        )
                                    })}
                                </Dropdown>
                            )
                        }
                    }
                    )}

                    {/* Conditional hide & show the buttons */}
                    {this.state.disabled ?
                        <center><FormButton
                            nameButton=" Edit my profile"
                            handleButtonClick={this.handleEditButtonClick}
                            moreClass="btn-edit mb-5"
                            icon="far fa-edit"
                        /></center>
                        :
                        <div>
                            <FormButton
                                nameButton=" Update my profile"
                                handleButtonClick={this.handleUpdateButtonClick}
                                moreClass="btn-success mr-2 mb-5"
                                icon="far fa-save"
                            />
                            <FormButton
                                nameButton="Cancel "
                                moreClass="btn-secondary mr-2 mb-5"
                                handleButtonClick={this.handleCancelButtonClick}
                                disabled={this.state.disabled}
                                icon="fas fa-backspace"
                            />
                        </div>
                    }
                    {/* Loop through all the kids for the logged in Parent */}
                    <FormTitle
                        title=" Kid(s) Information"
                        icon="fas fa-info-circle"
                    />
                    {this.state.kids.length ? (
                        <div>
                            {this.state.kids.map((kid, id) => {
                                return (
                                    <KidProfile
                                        key={id}
                                        name={kid.name}
                                        grade={kid.gradeLevel}
                                        school={kid.schoolId}
                                        kidId={kid.id}
                                        parentState={this.props.state}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <h3 className="no-kid-message">No family member found!
                           {/* <FormButton 
                                nameButton ="Add New Kid Info"
                                handleButtonClick={this.handleAddNewMember}
                            /> */}
                        </h3>
                    )}
                    {/* </FormAction> */}
                </FormContainer>
            </div>
        );
    }
}

export default MyProfile;