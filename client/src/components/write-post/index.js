//
import React,{Component} from "react";
import { FormContainer, FormTitle, FormLabel, InputText, Dropdown, OptionForDropdown, FormButton} from "../form";
import API from "../../utils/API";
import Dropzone from "../drop-zone"
import "./style.css"
//Declaring all categories for the Post 
const categories = ["Event", "Advice", "Free", "On sale", "Question"];

class WritePost extends Component {

    state = {
        title: "",
        description: "",
        category: "Event",
        imageUrl: ""
    };

    handleInputChange = event => {
        const value = event.target.value;
        console.log(value)
        const column = event.target.id
        this.setState({
            [column]: value
        })
        
    }

    handleImageChange = (url) => {
        this.setState({
            imageUrl: url
        })
        console.log("Image State:", this.state.imageUrl)
    }

    handleButtonClick = event => {
        event.preventDefault();
        console.log("title: " , this.state.title, "description:" ,this.state.description,
        "category:",  this.state.category)
        API.createPost(
            {
                title: this.state.title,
                description: this.state.description,
                category: this.state.category,
                imageUrl: this.state.imageUrl
            }
        ).then(() => {
            //redirect to dashboard
            this.props.handleCreatePost()
            console.log("inside API calls")
        })
    }

    render() {
        return(
        <div>
            <FormContainer>
                <FormTitle
                    icon="fas fa-edit"
                    title="Write a post"
                />
                <Dropdown
                    for="category"
                    label="Choose a category for your post"
                    handleChange={this.handleInputChange}
                    value={this.state.category}
                >
                    {categories.map((category, i) => {
                        return (
                            <OptionForDropdown option={category} key={i} />
                        )
                    })}
                </Dropdown>
                <FormLabel
                    for="title"
                    label="Enter a title for your message"
                    placeholder= "title"
                    handleChange={this.handleInputChange}
                />
                <InputText
                    for="description"
                    label="Enter your message"
                    placeholder="message"
                    handleChange={this.handleInputChange}
                />
                <Dropzone
                helper={this.handleImageChange}
                />
                <FormButton
                    moreClass="post-button my-3 mx-auto"
                    icon="fas fa-edit"
                    nameButton="Post"
                    handleButtonClick={this.handleButtonClick}
                />
            </FormContainer>
        </div>
        );
    }
}

export default WritePost;