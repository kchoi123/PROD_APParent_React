import React, { Component } from 'react';
import API from "../../utils/API";
// import Select from 'react-select';

const statesList = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const hrStyle = {
  "border": "2px solid orange"
}
class FilterBy extends Component {
  //Default State Values  
  state = {
    //Set all states for the DropDown List 
    allStates: statesList,
    schools: [],
    // Seeting value by default 
    filteredState: "all",
    filteredSchool: "all"
  }

  componentDidMount() {

    // retrieves all the schools -populate the School DropDown List 
    API.getAllSchools()
      .then(
        res => {

          this.setState({
            schools: res.data
          })
        }
      )
      .catch(err => console.log(err));

  }
  //On selection of the State re-populateed the school dropdown with the updated value 

  handleStateChange = event => {

    console.log(`Option selected:`, event.target.value);
    if (event.target.value === "") {
      console.log("Default All ");
      this.setState({ filteredState: "all" });
      //Call API function in ALlMembers component instead of here 
      this.props.searchAll();
    }
    else {

      this.setState({ filteredState: event.target.value });
      //Call API function in ALlMembers component instead of here 
      this.props.searchByState(event.target.value);
    }
  }

  handleSchoolChange = event => {

    console.log(`Option selected:`, event.target.value);

    this.setState({ filteredSchool: event.target.value });

    //Call API function in ALlMembers component instead of here 
    this.props.searchBySchool(event.target.value);
   
  }

  render() {

    return (
      <div className="container">
        <form noValidate>
          <h3 className="mb-1 text-center card-title">Refine your results <i class="fa fa-search-plus" aria-hidden="true"></i></h3>
          <div className="row text-center">
            <div className="column col-6 col-xs-12">
              <div className="form-group">
                <div className="col-3 col-sm-12">
                  <strong><label className="form-label" htmlFor="states">
                    By State :
                  </label></strong>
                </div>
                <div className="col-9 col-sm-12">
                  <select className="custom-select my-1 mr-sm-2" id="states" onChange={this.handleStateChange}>
                    <option value="">Choose...</option>
                    {this.state.allStates.map((item) =>
                      <option key={item}>{item}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="column col-6 col-xs-12">
              <div className="form-group">
                <div className="col-3 col-sm-12">
                <strong><label className="form-label" htmlFor="schools">
                    By School :
                  </label> </strong>
                </div>
                <div className="col-9 col-sm-12">
                  <select className="custom-select my-1 mr-sm-2" id="schools" onChange={this.handleSchoolChange}>
                    <option value="">Choose...</option>
                    {this.state.schools.map((item, j) =>
                      // console.log("School name ", item)
                      <option key={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            {/* <div>
            <button className="btn-info" onSubmit={this.props.handleChange}> Search</button>
          </div> */}
          </div>
        </form>
        <hr style={hrStyle} />
      </div>
    )
  }
}

export default FilterBy;