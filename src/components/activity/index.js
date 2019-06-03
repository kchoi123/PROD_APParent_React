// ----------- start Sophie
import React, { Component } from "react";
import "./style.css";
import PostCard from "../postCard";
import FilterPosts from "../filter-posts";
import API from "../../utils/API";
// ----------- end Sophie

class Activity extends Component {

  state = {
    posts : []
  }

  componentDidMount() {
    API.searchAll()
      .then( res => {
          this.setState({
            posts: res.data
          })
      })
      .catch(err => console.log(err))
  }

  getPostsForCategory = category => {

    API.getFilteredPosts(category)
      .then( res => {
        console.log(res.data);
        this.setState({
          posts: res.data
        });
      })
      .catch(err => console.log(err))
  }

  getPostsDescendingOrder = () => {
    API.searchAll()
      .then( res => {
        console.log(res.data);
        this.setState({
          posts: res.data
        })
      })
      .catch(err => console.log(err))
  }

  getPostsAscendingOrder = () => {
    API.getAllAscending()
      .then( res => {
        console.log(res.data);
        this.setState({
          posts: res.data
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="container mt-4 mb-4">
        <div className="card activity-container mx-auto">
          <h5 id="activity-title" className="card-header">Activity Feed</h5>
          <div className="card-body" id="eachPost">
            <FilterPosts 
              toGetAllFilteredPosts={this.getPostsForCategory}
              toGetAllPostsDescendingOrder={this.getPostsDescendingOrder}
              toGetAllPostsAscendingOrder={this.getPostsAscendingOrder}
            />
            {this.state.posts.length ? (
              this.state.posts.map((post) => {
                return (
                  <PostCard
                    key={post.id}
                    category={post.category}
                    title={post.title}
                    name={post.parent.userName}
                    userPhoto={post.parent.photoLink}
                    postPhoto={post.imageUrl}
                    description={post.description}
                    updatedAt={post.updatedAt}
                    postId={post.id}
                    members={this.state.members}
                  />
                );
              })
            ) : (
              <h3 className="no-result-message mt-5">No result to display!</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
  
}

export default Activity;
