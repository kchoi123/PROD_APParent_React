// js for nav bar

import React from "react";
import "./style.css";

function Nav(props) {
  return (
    <nav id="nav-bar" className="nav navbar-expand-lg mx-auto sticky-top">
      <a className="nav-link text-info" href="/">
        <img id="nav-image" src="./images/logo-only-color.png" alt="logo-pic"/>
      </a>
      <h1 id="name-app" className="mt-4 font-weight-bold text-white ml-auto">APP@rent</h1>
      <a className="nav-link mt-2 text-white ml-auto mr-2" id="logout" href="/" onClick={props.logout}><h4 className="logout">Logout</h4></a>
    </nav>
  );
}

export default Nav;
