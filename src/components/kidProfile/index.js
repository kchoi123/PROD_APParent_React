import React, { Component } from "react"
import { FormAction, FormTitle, FormLabel, FormButton, Dropdown, OptionForDropdown } from "../form";
import API from "../../utils/API";
import gradeLevel from "../../gradeLevel.json"; 
import "./style.css";

class KidProfile extends Component {
    state = {
        sizeDropdownSchool: 1,
        sizeDropdownGrade: 1,
        disabled: true,
        deleteKidInfo: false,
        kidOriginalInfo: 
            {
                name: this.props.name,
                gradeLevel: this.props.grade,
                schoolId: this.props.school
            },
        kidInfo:
            [
                {
                    for: "name",
                    label: "Your kid's name",
                    value: this.props.name,
                },
                {
                    for: "grade",
                    label: "Your kid's grade",
                    value: this.props.grade,
                    options: gradeLevel
                },
                {
                    for: "school",
                    label: "Your kid's school",
                    value: this.props.school,
                    options: []
                }
            ], 
            kidId: this.props.kidId,
            parentState: this.props.parentState
    }

    handleInputChange = event => {
        const value = event.target.value;
        const key = event.target.getAttribute("data-id")
        let copy = [...this.state.kidInfo]
        copy[key].value = value
        this.setState({
            kidInfo: copy,
            sizeDropdownSchool: 1,
            sizeDropdownGrade: 1
        })
    }

    handleEditButtonClick = event => {
        event.preventDefault();
        this.setState({
            disabled: false
        })
    }

    // update kid info without reloading the page
    handleUpdateButtonClick = event => {
        event.preventDefault()

        const kidUpdatedData = {
            name: this.state.kidInfo[0].value,
            gradeLevel: this.state.kidInfo[1].value,
            schoolId: this.state.kidInfo[2].value
        }

        console.log("Kid Details ", kidUpdatedData, "ID", this.state.kidId);

        // update the kid profile without reloading the page
        API.updateKidForAParent(kidUpdatedData, this.state.kidId)
            .then(res => {
                // console.log("Kid data - upd", res);
                this.setState({
                    kidOriginalInfo: kidUpdatedData,
                    sizeDropdownSchool: 1,
                    sizeDropdownGrade: 1,
                    disabled: true
                })
            })
            .catch(err => console.log(err));
    }

    // delete kid info and do not display the form for the kid that has been deleted
    // without reloading the page
    handleRemoveButtonClick = event => {
        event.preventDefault();
        console.log("Delete KID INFO");
        API.deleteKidForAParent(this.state.kidId)
            .then(res => {
                console.log("Kid deleted");
                this.setState({
                    deleteKidInfo: true
                })
                // window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // Repopulate the input fields with the previous parent data
    handleCancelButtonClick = event => {
        event.preventDefault();

        let copyKidInfo = [...this.state.kidInfo];
        copyKidInfo[0].value = this.state.kidOriginalInfo.name;
        copyKidInfo[1].value = this.state.kidOriginalInfo.gradeLevel;
        copyKidInfo[2].value = this.state.kidOriginalInfo.schoolId;

        this.setState({
            kidInfo: copyKidInfo,
            sizeDropdownSchool: 1,
            sizeDropdownGrade: 1,
            disabled: true
        });
    }

    componentDidMount() {
        // console.log("Grade", this.props.grade); 
        // console.log("Kid ID", this.props.kidId); 
       // API.getAllSchools()
       console.log("Parent State passed", this.state.parentState);

       API.getAllSchoolsByState(this.state.parentState)
            .then(
                res => {
                    let copy = [...this.state.kidInfo]
                    copy[2].options = res.data
                    this.setState({
                        kidInfo: copy
                    })
                }
            )
            .catch(err => console.log(err));
    }

    render() {
        if (!this.state.deleteKidInfo) {
            return (
                <div>
                    {this.state.disabled ?
                        <FormTitle
                            title={`View ${this.state.kidOriginalInfo.name}'s Info`}
                            moreClass="kid-section-title"
                            icon="fas fa-eye"
                        />
                        :
                        <FormTitle
                            title={`Update ${this.state.kidOriginalInfo.name}'s Info`}
                            moreClass="kid-section-title"
                            icon="fas fa-edit"
                        />
                    }
                    <FormAction>
                        {this.state.kidInfo.map((info, i) => {
                            if (info.for === "name") {
                                return (
                                    <FormLabel
                                        key={i}
                                        data={i}
                                        for={info.for}
                                        label={info.label}
                                        value={info.value}
                                        disabled={this.state.disabled}
                                        handleChange={this.handleInputChange}
                                    />
                                )
                            }
                            else {
                                return (
                                    <Dropdown
                                        key={i}
                                        data={i}
                                        for={info.for}
                                        label={info.label}
                                        value={info.value}
                                        disabled={this.state.disabled}
                                        handleChange={this.handleInputChange}
                                        size={(info.for === "grade") ? this.state.sizeDropdownGrade : this.state.sizeDropdownSchool}
                                        onfocus={(info.for === "grade") ? ()=>{this.setState({sizeDropdownGrade: 5})} : ()=>{this.setState({sizeDropdownSchool: 5})}}
                                        onblur={(info.for === "grade") ? ()=>{this.setState({sizeDropdownGrade: 1})} : ()=>{this.setState({sizeDropdownSchool: 1})}}
                                    >
                                        {info.options.map((item, j) => {
                                            return (
                                                <OptionForDropdown
                                                    option={item.name}
                                                    value={item.id}
                                                    // selected value={kid.schoolId}
                                                    key={j}
                                                />
                                            )
                                        })}
                                    </Dropdown>
                                )
                            }
    
                        })}
                        {this.state.disabled ? (
                            <div>
                                <FormButton
                                    nameButton={`Edit ${this.state.kidOriginalInfo.name}'s info`}
                                    handleButtonClick={this.handleEditButtonClick}
                                    moreClass="edit-kid-btn mr-2 mb-4"
                                    icon="far fa-edit"
                                />
                                <FormButton
                                    nameButton={`Remove ${this.props.name}'s info`}
                                    moreClass="remove-kid-btn mr-2 mb-4"
                                    icon="fas fa-eraser"
                                    handleButtonClick={this.handleRemoveButtonClick}
                                />
                            </div>
                        ) : (
                            <div>
                                <FormButton
                                    nameButton={`Update ${this.state.kidOriginalInfo.name}'s info`}
                                    moreClass="btn-success mr-2 mb-4"
                                    icon="far fa-save"
                                    handleButtonClick={this.handleUpdateButtonClick}
                                />
                                <FormButton
                                    nameButton="Cancel"
                                    moreClass="btn-secondary mr-2 mb-4"
                                    handleButtonClick={this.handleCancelButtonClick}
                                    disabled={this.state.disabled}
                                    icon="fas fa-backspace"
                                />
                            </div>
                        )}
                    </FormAction>
                </div>
            )

        } else {
            return (
                <div></div>
            )
        }
        
    }
}

export default KidProfile;