// make component a statefull component
import React, { Component } from "react";
import { CommentSubmitButton, CommentDisplay } from "../form";
import moment from "moment"
import API from "../../utils/API";
import "./style.css";

// make a api call to get all comment posts

class PostCard extends Component {
  // make a state for the values in this component
  state = {
    nameButton: "Comment",
    description: "",
    timeStamp: "",
    comments: [],
  };

  getComments = () => {
    const requestParams = {
      id: this.props.postId,
    }

    API.findAllForPost(requestParams)
      .then(
        res => {
          this.setState({
            comments: res.data
          })

        }
      )
      .catch(err => console.log(err));
  }
  // componentDidMount() {
  //   this.getComments();
  // }

  // write letters on the posting field while typed
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleCommentClick = event => {
    event.preventDefault();
    this.getComments()
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(`Description: ${this.state.description}`);
    // need to post to MySQL here

    const commentData = {
      description: this.state.description,
      postId: this.props.postId
    }

    API.createComment(commentData)
      .then(res => {
        console.log("show res ", res)
        this.getComments();
      })
      .catch(err => console.log(err));
    this.setState({ description: "" });
  };

  renderComments = () => {
    const { comments } = this.state;
    // const { members } = this.props;
    return (<div>
      {comments.map((comment) => {
        // if (comments && members) {
        // const parent = members.find((member) => member.id === comment.parentId);
        // const parentUsername = parent && parent.userName;
        return (<div><CommentDisplay for="displayComment" posterName={comment.parent.userName} comment={comment.description} updatedAt={comment.updatedAt} /><hr /></div>)
        // }
      })}
    </div>)
  }

  render() {
    return (
      <div className="post-container">
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col">
              <div className="card-body post-content text-left">
                <div className="wrapper-div">
                  <img className="rounded-circle profile-icon mx-2" src={this.props.userPhoto} />
                  <div className="sub-div">
                    <p><b className="author">{this.props.name}</b> posted</p>
                    <p className="last-updated">{moment(this.props.updatedAt).fromNow()}</p>
                  </div>
                </div>
                <span className="category my-auto card-text" id="postCardCategory">
                  <b>Category:</b> {this.props.category}
                </span>
                <hr/>
                <div className="mx-auto">
                  <p className="card-title mx-auto" id="postCardTitle">{this.props.title}</p>
                  <p className="card-text mx-auto" id="postCardDetails">
                    <b><u>Details:</u> </b>{this.props.description}
                  </p>
                </div>

                <div className="text-center"><img className="post-photo" src={this.props.postPhoto} /></div>
                {/* <p className="card-text" id="postCardTitle" id="postCardPostedBy">
                  <b><u>Posted By:</u></b> {this.props.name}
                </p> */}


              </div>
              <button
                className="btn btn-lg mx-auto open-comment"
                id="comment"
                data-toggle="modal"
                data-target={"#post" + this.props.postId}
                onClick={this.handleCommentClick}
              >
                <i className="far fa-comment-alt"></i> Comment
              </button>
            </div>

          </div>
        </div>

        {/* modal */}
        <div
          className="modal fade"
          id={"post" + this.props.postId}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header" id="modalTitle">
                <b>{this.props.title}</b>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.renderComments()}
                <form onSubmit={this.handleFormSubmit}>
                  <p><b>Your Comment:</b> {this.state.description}</p>

                  <input
                    for="comment"
                    label="Comment Here"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                  />

                  <CommentSubmitButton handleButtonClick={this.handleFormSubmit} />
                  {/* <button onClick={this.handleFormSubmit}>Submit</button> */}
                </form>
                {/* need a button to post */}
                {/* create a handle click for the button - that will post to MySQL */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCard;
