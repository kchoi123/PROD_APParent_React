// this is the main dashbaord after the user login
import React, { Component } from "react";
import Sidebar from "../components/sidebar";
import Activity from "../components/activity";
import WritePost from "../components/write-post";
import AllMembers from "../components/allMembers";
import MyProfile from "../components/myProfile";
import NavBar from "../components/nav";
import {ChatRoom} from "../components/chatRoom"
import API from "../utils/API";
import "../style/dashboard.css";
// import { stat } from "fs";

class Dashboard extends Component {
  //Setting all default values 
  state = {
    // ----------- start Sophie
    // remove the results variable
    // ----------- end Sophie
    // members: [],
    pageWanted: "dashboard",
    loggedInUser: []
  };

  componentDidMount() {

    // ----------- start Sophie
    // remove the call to get all the posts
    // ----------- end Sophie

    // ----------- start Namita
    // remove the call to get all members
    // ----------- end Namita

    //Retrives Logged in USer Info 
    API.findOne()
      .then(res => {
        this.setState({
          loggedInUser: res.data
        })
      }
      )
      .catch(err => console.log(err));

  }

  handleClickOnSideBar = event => {
    event.preventDefault();

    this.setState({
      pageWanted: event.target.attributes.getNamedItem("data-content").value
    });
    console.log("This is the result", this.state.results)

  }

  //Write a post 

  handleCreatePost = () => {
    // ----------- start Sophie
      this.setState({
        pageWanted: "dashboard"
      })
    // ----------- end Sophie
  }

  handleLogOut = () => {
    API.logout().then(
      res => {
        console.log("Logged Out")
      }
    )
  }

  // to update the user info displayed on the page without reloading the page
  updateParentProfileSection = () => {
    //Retrieves Logged in USer Info 
    API.findOne()
      .then(res => {
        this.setState({
          loggedInUser: res.data
        })
      }
      )
      .catch(err => console.log(err));

  }


  redirectProfilePage = () => {
    this.setState({
      pageWanted: "myProfile"
    })

  }


  render() {

    {/* display the page with the activity component */ }
    if (this.state.pageWanted === "dashboard") {
      return (
        <div>
          <NavBar
            logout={this.handleLogOut}
          />
          <Sidebar
            handleClick={this.handleClickOnSideBar}
            logout={this.handleLogOut}
          />
          <div id="page-wrap">

            <h1 className="mt-2 text-dark welcome-text">Welcome {this.state.loggedInUser.userName}</h1>
            {/* ------- start Sophie */}
            <Activity />
            {/* ------- end Sophie */}
          </div>
        </div>
      );

      {/* display the page with the myProfile component */ }
    } else if (this.state.pageWanted === "myProfile") {
      return (
        <div>
          <NavBar
            logout={this.handleLogOut}
          />
          <Sidebar
            handleClick={this.handleClickOnSideBar}
            logout={this.handleLogOut}
          />
          <div id="page-wrap">

            <h1 className="mt-2 text-dark welcome-text">Welcome {this.state.loggedInUser.userName}</h1>

            {/* Logged in User Details along with their kid info within  */}
            <MyProfile
              userName={this.state.loggedInUser.userName}
              email={this.state.loggedInUser.email}
              city={this.state.loggedInUser.city}
              state={this.state.loggedInUser.state}
              photoLink={this.state.loggedInUser.photoLink}
              redirectPage={this.redirectProfilePage}
              updateParentProfileSection={this.updateParentProfileSection}
              loggedInParent={this.state.loggedInUser}
            />

          </div>
        </div>
      );

      {/* display the page with the allMembers component */ }
    } else if (this.state.pageWanted === "allMembers") {
      return (
        <div>
          <NavBar
            logout={this.handleLogOut}
          />
          <Sidebar
            handleClick={this.handleClickOnSideBar}
            logout={this.handleLogOut}
          />
          <div id="page-wrap">

            <h1 className="mt-2 text-dark welcome-text">Welcome {this.state.loggedInUser.userName}</h1>
            {/* Displays all the Members on the website expect for the logged in USer  */}
            <AllMembers />

          </div>
        </div>
      );

      {/* display the page with the writePost component */ }
    } else if (this.state.pageWanted === "writePost") {
      return (
        <div>
          <NavBar
            logout={this.handleLogOut}
          />
          <Sidebar
            handleClick={this.handleClickOnSideBar}
            logout={this.handleLogOut}
          />
          <div id="page-wrap">

            <h1 className="mt-2 text-dark welcome-text">Welcome {this.state.loggedInUser.userName}</h1>

            <WritePost
              handleCreatePost={this.handleCreatePost}
            />

          </div>
        </div>
      );

      {/* display the page with the aboutUs component */ }
    } else if (this.state.pageWanted === "aboutUs") {
      return (
        <div>
          <NavBar
            logout={this.handleLogOut}
          />
          <Sidebar
            handleClick={this.handleClickOnSideBar}
            logout={this.handleLogOut}
          />
          <div id="page-wrap">

            <h1 className="mt-2 text-dark welcome-text">Welcome {this.state.loggedInUser.userName}</h1>
            <div className="container mt-4 mb-4">
              <div className="card">
                <h5 className="card-header title-card">About us!</h5>
                <div className="card-body">
                  <p className="card-text about-text">Parenthood is great but let's face it, it can also be very challenging! For every moment along the way, <strong style={{"color": "#176d88"}}>APP@rent</strong> is there to network/connect with other parents, help each other out, share tips, events.... </p>
                  <p className="card-text about-text"><strong style={{"color": "#176d88"}}>APP@rent</strong> was built by Namita - a happy-parent of a little boy and inspiration of the project - and Sophie, Kevin and Samuel - parents in training... with their pets!!</p>
                  <div className="row text-center m-3">
                    <div className="col-3 text-center mt-3">
                      <img className="img-thumbnail img-fluid mb-3 pic-us" src="https://avatars2.githubusercontent.com/u/39390897?s=460&v=4" alt="namita"/>
                      <br></br><a className="link-us font-weight-bold" href="https://github.com/NVK2016" target="_blank" rel="noopener noreferrer">GitHub</a>
                      <br></br><a className="link-us font-weight-bold" href="https://www.linkedin.com/in/namita-shenai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <br></br><a className="link-us font-weight-bold" href="https://namitashenai-portfolio.herokuapp.com/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                    </div>
                    <div className="col-3 text-center mt-3">
                      <img className="img-thumbnail img-fluid mb-3 pic-us" src="https://avatars1.githubusercontent.com/u/47410186?s=460&v=4" alt="sophie"/>
                      <br></br><a className="link-us font-weight-bold" href="https://github.com/SophM" target="_blank" rel="noopener noreferrer">GitHub</a>
                      <br></br><a className="link-us font-weight-bold" href="https://www.linkedin.com/in/sophie-m-571325176" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <br></br><a className="link-us font-weight-bold" href="https://www.sophiemallez.com" target="_blank" rel="noopener noreferrer">Portfolio</a>
                    </div>
                    <div className="col-3 text-center mt-3">
                      <img className="img-thumbnail img-fluid mb-3 pic-us" src="https://avatars3.githubusercontent.com/u/41413295?s=400&v=4" alt="kevin"/>
                      <br></br><a className="link-us font-weight-bold" href="https://github.com/kchoi123" target="_blank" rel="noopener noreferrer">GitHub</a>
                      <br></br><a className="link-us font-weight-bold" href="https://www.linkedin.com/in/kevin-choi-5b59aa40" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <br></br><a className="link-us font-weight-bold" href="https://kchoi.co" target="_blank" rel="noopener noreferrer">Portfolio</a>
                    </div>
                    <div className="col-3 text-center mt-3">
                      <img className="img-thumbnail img-fluid mb-3 pic-us" src="https://avatars2.githubusercontent.com/u/45929868?s=460&v=4" alt="samuel"/>
                      <br></br><a className="link-us font-weight-bold" href="https://github.com/yusungsamuel" target="_blank" rel="noopener noreferrer">GitHub</a>
                      <br></br><a className="link-us font-weight-bold" href="https://www.linkedin.com/in/samuel-yu-1431b8103" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <br></br><a className="link-us font-weight-bold" href="https://yusungsamuel.github.io/react-portfolio/" target="_blank" rel="noopener noreferrer">Portfolio</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if (this.state.pageWanted === "chatRoom"){
      return (
        <div>
        <NavBar
            logout={this.handleLogOut}
        />
        <Sidebar
            handleClick={this.handleClickOnSideBar}
            logout={this.handleLogOut}
        />
        <ChatRoom/>
        </div>
      )
    }
  }
}

export default Dashboard;
