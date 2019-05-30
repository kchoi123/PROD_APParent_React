//This component is for Edit or View my Profile 

import React, { Component } from "react";
import { FormContainer, FormTitle, FormLabel, FormButton, Dropdown, OptionForDropdown } from "../form";
import API from "../../utils/API";
import KidProfile from "../kidProfile";
import "./style.css";

const statesList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

class MyProfile extends Component {

    state = {
        disabled: true,
        kidDisabled: true,
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
        kidInfo: [
            {
                name: "",
                id: 1,
                gradeLevel: "",
                schoolId: ""
            }
        ],
        schools: [], //holds all the info related to school 
        kids: [], //Holds all the info related to kids 
        //Grade Level dropdown options 
        gradeLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };

    //***************Parent Info */
    //-------------------------------------
    handleInputChange = event => {
        // const {name, value} = event.target;
        const value = event.target.value;
        // const column = event.target.id;
        const key = event.target.getAttribute("data-id")
        let copy = [...this.state.userInfo]
        copy[key].value = value
        this.setState({
            userInfo: copy
            // [column] : value
        })

    }
    //Enable the User to update his profile 
    handleEditButtonClick = event => {
        event.preventDefault();
        // console.log("EDIT MY PROFILE");
        this.setState({
            disabled: false
        })
    }
    //Saves the changes made to the profile 
    handleSaveButtonClick = event => {
        event.preventDefault();
        // console.log("SAVE MY PROFILE");
        this.setState({
            disabled: true
        })

        const userUpdatedData = {
            userName: this.state.userInfo[0].value,
            city: this.state.userInfo[1].value,
            state: this.state.userInfo[2].value,
            photoLink: this.state.userInfo[3].value
        }

        console.log("Parent Details ", userUpdatedData);

        //Updates the user profile 
        API.updateProfile(userUpdatedData)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // Reloading the page to redirect to dashboard 
    handleReturnBack = event => {
        event.preventDefault();
        console.log("redirect page to dashboard");
        window.location.reload();
       
    }
    //***************Parent Info */
    //-------------------------------------

    //***************Kid Info */
    //-------------------------------------
    // //Related to additional Family members : 
    // handleAddNewMember = event => {
    //     event.preventDefault();
    //     console.log("Add NEW FAMILY MEMBER");
    //     //Enable the component 
    //     this.setState({
    //         addnewMember : true 
    //     })

    // }

    //Enable the User to update his profile 
    handleEditKidButtonClick = event => {
        event.preventDefault();
        // console.log("EDIT Kid Info");
        this.setState({
            kidDisabled: false
        })
    }
    handleInputKidChange = event => {
        console.log("handleInputKidChange");

        const value = event.target.value;
        const key = event.target.getAttribute("data-id");

        let copy = [...this.state.kidInfo];
        // console.log("Copy", copy); 
        copy[key].value = value;

        this.setState({
            kidInfo: copy
        })
    }

    handleUpdateButtonClick = event => {
        const kidUpdatedData = {
            name: this.state.kidInfo[0].value,
            id: this.state.kidInfo[1].value,
            gradeLevel: this.state.kidInfo[2].value,
            schoolId: this.state.kidInfo[3].value
        }

        console.log("Kid Details ", kidUpdatedData);

        //Updates the kid profile 
        API.updateKidForAParent(kidUpdatedData)
            .then(res => {
                console.log("Kid data - upd", res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    handleDeleteKidInfo = event => {
        event.preventDefault();
        console.log("Delete KID INFO");
        API.deleteKidForAParent()
        .then(res => {
            console.log("Kid deleted");
            window.location.reload();
        })
        .catch(err => console.log(err));
    }
    //***************Kid Info */
    //-------------------------------------

    componentDidMount() {
        // retrieves all the kids for the logged in parent... 
        API.findAllKidsForAParent()
            .then(
                res => {
                    console.log("Kids for parent", res.data);
                    this.setState({
                        kids: res.data
                    })
                }
            )
            .catch(err => console.log(err));

        // retrieves all the schools - filter by state 
        API.getAllSchools()
            .then(
                res => {
                    console.log(res.data);
                    this.setState({
                        schools: res.data
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
                    <div className="row">
                         {/* Image of the loggeed in user */}
                        <img className="rounded-circle profile-view mx-4" src={this.props.photoLink} alt={this.props.userName} />
                        <FormTitle
                            title="View My Profile"
                        />
                        </div>
                        :
                        <FormTitle
                            title="Update Profile Info"
                        />
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
                            nameButton=" Edit Profile"
                            handleButtonClick={this.handleEditButtonClick}
                            moreClass="btn-edit far fa-edit"
                        /></center>
                        :
                        <div>
                            <FormButton
                                nameButton=" Save Profile"
                                handleButtonClick={this.handleSaveButtonClick}
                                moreClass="btn-success far fa-save mr-2"
                            />
                            <FormButton
                                nameButton="Cancel"
                                moreClass="btn-secondary btn-sm mr-2"
                                handleButtonClick={this.handleReturnBack}
                            />
                        </div>
                    }
                    {/* Loop through all the kids for the logged in Parent */}
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
                                />
                            )})}
                            </div>) :

                            (<h3>No Family Member(s) found
                           {/* <FormButton 
                                nameButton ="Add New Kid Info"
                                handleButtonClick={this.handleAddNewMember}
                            /> */}
                            </h3>
                        )
                    }

                    {/* </FormAction> */}
                </FormContainer>
                </div>
        );
    }
}

export default MyProfile;