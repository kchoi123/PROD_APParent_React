// import all the dependencies
import React, { Component } from "react";
import { FormLabel, FormButton, Dropdown, OptionForDropdown } from "../form";
import API from "../../utils/API";
import ErrorMessage from "../errorMessage";
import "./style.css";

const statesList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

// define a class AddSchool to create the component
class AddSchool extends Component {

    state = {
        schoolInfo :
            [
                {
                    for: "name",
                    label: "Enter the name of the school",
                    placeholder: "Name",
                    value: ""
                },
                {
                    for: "streetAddress",
                    label: "Enter the street address of the school",
                    placeholder: "444 1st Avenue",
                    value: ""
                },
                {
                    for: "city",
                    label: "Enter the city of the school",
                    placeholder: "City",
                    value: ""
                },
                {
                    for: "state",
                    label: "Enter the state of the school",
                    value: "Alabama",
                    options: statesList
                },
                {
                    for: "zipcode",
                    label: "Enter the zipcode of the school",
                    placeholder: "12345",
                    value: ""
                }

            ],
        hasError: false
    }

    handleInputChangeSchool = event => {
        const value = event.target.value;
        const key = event.target.getAttribute("data-id")
        let copy = [...this.state.schoolInfo]
        copy[key].value = value
        this.setState({
            schoolInfo: copy
        });
    }

    handleAddSchoolButtonClick = event => {
        event.preventDefault();

        // the parent has to enter info in every field to be able to submit form
        if (this.state.schoolInfo[0].value && this.state.schoolInfo[1].value && this.state.schoolInfo[2].value && this.state.schoolInfo[3].value && this.state.schoolInfo[4].value) {

            // grab the school info and store them in a variable
            const schoolData = {
                name: this.state.schoolInfo[0].value,
                streetAddress: this.state.schoolInfo[1].value,
                city: this.state.schoolInfo[2].value,
                state: this.state.schoolInfo[3].value,
                zipcode: this.state.schoolInfo[4].value
            }

            console.log("school data: ", schoolData);

            // api call to create the school in the database
            API.createSchool(schoolData)
                .then( res => {
                    console.log("School created in DB!");
                    // update the dropdown menu for the schools - method defined on the signUp-form component
                    this.props.toUpdateSchoolList();
                })
                .catch(err => console.log(err))

        // otherwise will get error message that the parent has to fill up the fields
        } else {

            this.setState({ 
                hasError: true
            })
        }
    }

    handleCloseButtonClick = event => {
        event.preventDefault();

        this.setState({
            hasError: false,
        })
    }

    resetError = () => {
        if (this.state.hasError) {
            setTimeout(() => {
                this.setState({
                    hasError: false,
                })
            }, 2000)
        }
    }


    render() {
        this.resetError();
        return (
            <div>
                {(this.state.hasError) ? (
                    <ErrorMessage
                        message="Please fill up all the fields!"
                        handleCloseButtonClick={this.handleCloseButtonClick}
                    />
                ) : (
                    ""
                )}
                {this.state.schoolInfo.map((schoolInfo, i) => {
                    if (schoolInfo.for !== "state") {
                        return (
                            <FormLabel
                                key={i}
                                data={i}
                                for={schoolInfo.for}
                                label={schoolInfo.label}
                                placeholder={schoolInfo.placeholder}
                                value={schoolInfo.value}
                                handleChange={this.handleInputChangeSchool}
                            />
                        );
                    } else {
                        return (
                            <Dropdown
                                key={i}
                                data={i}
                                for={schoolInfo.for}
                                label={schoolInfo.label}
                                value={schoolInfo.value}
                                handleChange={this.handleInputChangeSchool}
                            >
                                {schoolInfo.options.map((state, j) => {
                                    return (
                                        <OptionForDropdown option={state} value={state} key={j} />
                                    )
                                })}
                            </Dropdown>
                        );  
                    }
                })}
                <FormButton 
                    nameButton="Add school to the list!"
                    moreClass="add-school-btn ml-4 mr-3"
                    icon="fas fa-school"
                    handleButtonClick={this.handleAddSchoolButtonClick}
                />
                <FormButton 
                    nameButton="Nevermind, I found it!"
                    moreClass="nevermind-btn"
                    icon=""
                    handleButtonClick={this.props.toHideAddSchoolForm}
                />
            </div>
        )
    }

}

// export the component so it can be used by other files
export default AddSchool;