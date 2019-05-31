// import React from "react";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router'
import Footer from "./components/footer";
import Home from "./pages/home"
import Dashboard from "./pages/dashboard";
import API from "./utils/API";
import "./App.css"

class App extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount() {
    API.checkLogin()
      .then(res => {
        
          this.setState(
            {
              loggedIn: true
            }
          )
          console.log(this.state.loggedIn)
        }
      )
      .catch(err => console.log(err))
  }

  render() {
    return (
      
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={() => {
              if(this.state.loggedIn){
                return <Redirect to="/dashboard"/>
              }
              else {
                return <Home />
              }                
            }} />
            <Route exact path="/dashboard" render={() => {
              if(this.state.loggedIn){
                return <Dashboard />
              }
              else {
                return <Redirect from="/dashboard" to="/" />
              }                
            }} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
