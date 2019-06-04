import React from "react";
import "./style.css";
import { stack as Menu } from 'react-burger-menu';

function SideBar(props) {
    return (
        <div id="sidebar">
            <Menu>
                <button className="btn btn-lg menu-item" data-content="dashboard" onClick={props.handleClick}>
                    Dashboard
                </button>
                <button className="btn btn-lg menu-item" data-content="myProfile" onClick={props.handleClick}>
                    My profile
                </button>
                <button className="btn btn-lg menu-item" data-content="allMembers" onClick={props.handleClick}>
                    All members
                </button>
                <button className="btn btn-lg menu-item"  data-content="writePost" onClick={props.handleClick}>
                    Write a post
                </button>
                <button className="btn btn-lg menu-item"  data-content="chatRoom" onClick={props.handleClick}>
                    Chat Room
                </button>
                <button className="btn btn-lg menu-item" data-content="aboutUs" onClick={props.handleClick}>
                    About us!
                </button>
                <a className="menu-item ml-3" href="/" onClick={props.logout}>
                    Logout
                </a>
            </Menu>
        </div>

    );
}

export default SideBar; 