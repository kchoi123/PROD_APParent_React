import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";


class userCard extends Component {
    //Setting all default values 
    state = {
        schools: [],
        kids: [],
    }
    componentDidMount() {
        // retrieves all the kids for the parent... 
        // console.log("Parent ID: ", this.props.parentId);
        API.findAllKids(this.props.parentId)
            .then(
                res => {
                    console.log("Kids for parent", res.data);
                    this.setState({
                        kids: res.data
                    })
                }
            )
            .catch(err => console.log(err));
    }

    render() {
        return (

            <div className="card" style={{ width: "20rem" }}>
                <img src={this.props.photoLink ? (this.props.photoLink) : ("http://lorempixel.com/125/125/people/2/cc")} className="card-img-top userImg" alt={this.props.userName} />
                <div className="card-body">
                    <h2 className="card-title text-info">{this.props.userName}</h2>
                    <h5 className="card-text"><b>Email:</b> {this.props.email}</h5>
                    <h5 className="card-text"><b>Resides in:</b> {this.props.city} | <b> State :</b> {this.props.state}</h5>
                    <h4 className="card-body text-info">Kid(s) Information <i className="fa fa-child"></i>
                        <i className="fa fa-child big-child" ></i>: </h4>
                    {/* <h5 className="card-text"><b>No of Kids:</b> {this.state.kids.length}</h5> */}
                    {/* Loops the grades all of kids for a parent */}
                    <h5 className="card-text"><b>Grade(s):</b>
                        {this.state.kids.length ? (
                            this.state.kids.map((kid, i) => {
                                return (
                                    // console.log(this.state.kids.filter(function(v,i) { return this.state.kids.indexOf(v) == i; }))

                                    <div className="grades" key={i}>
                                        {kid.gradeLevel}  </div>
                                );
                            })) : (<div>Infant - Preschooler</div>)

                        }</h5>
                    <h5 className="card-text"><b>School(s):</b>
                        {this.state.kids.length ? (
                            this.state.kids.map((kid, i) => {
                                return (
                                    <div key={i}>
                                        {kid.school.name}</div>
                                );
                            })) : (<div>Infant - Preschooler</div>)

                        }</h5>
                    <button className="btn btn-success btn-lg mt-1">Chat</button>
                </div>
            </div>

        )
    }
}

export default userCard;