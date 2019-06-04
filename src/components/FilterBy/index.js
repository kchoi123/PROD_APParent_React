import React, { Component } from 'react';
import API from "../../utils/API";
// import Select from 'react-select';

// const statesList = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
const hrStyle = {
  "border": "2px solid orange"
}

class FilterBy extends Component {
  //Default State Values  
  state = {
    sizeCityDropdown: 1,
    sizeStateDropdown: 1,
    //Set all states for the DropDown List 
    allStates: [],
    allCities: [],
    schools: [],
    // Seeting value by default
    filteredState: "all",
    filteredSchool: "all", 
    filteredCity: "all"
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

    //Retrives all the Members Data - By default displays all 
    API.searchAllMembers()
      .then(res => {
        let allCities = [];
        let allStates = [];
        res.data.map(parent => {
          if (!allCities.includes(parent.city)) {
            allCities.push(parent.city); 
          } 
          if (!allStates.includes(parent.state)) {
            allStates.push(parent.state);
          } 
        })
        console.log("all cities in the db: ", allCities);
        console.log("all states in the db: ", allStates);
        this.setState({
            allCities: allCities,
            allStates: allStates
          })
        })
      .catch(err => console.log(err));

  }
  //On selection of the State re-populateed the school dropdown with the updated value 

  handleStateChange = event => {

    console.log(`Option selected:`, event.target.value);
    if (event.target.value === "All") {
      console.log("Default All ");
      this.setState({ 
        filteredState: "all",
        sizeStateDropdown: 1 
      });
      //Call API function in ALlMembers component instead of here 
      this.props.searchAll();
    }
    else {

      this.setState({ 
        filteredState: event.target.value,
        sizeStateDropdown: 1 
      });
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

  handleCityChange = event => {

    console.log(`Option selected:`, event.target.value);
    if (event.target.value === "All") {
      console.log("Default All ");
      this.setState({ 
        filteredCity: "all",
        sizeCityDropdown: 1 
      });
      //Call API function in ALlMembers component instead of here 
      this.props.searchAll();
    }
    else {

      this.setState({ 
        filteredCity: event.target.value,
        sizeCityDropdown: 1 
      });
      //Call API function in ALlMembers component instead of here 
      this.props.searchByCity(event.target.value);
    }

  }

  handleResetButtonClick = event => {

    event.preventDefault();
    console.log("Clicked Reset Filter");

    //Reset all Values 
    this.setState({
      //Set all states for the DropDown List 
      // allStates: this.props.statesInDB,
      // allCities: this.props.citiesInDB,
      // schools: [],
      // Seeting value by default 
      filteredState: "all",
      filteredSchool: "all",
      filteredCity: "all"
    });

    //Reset DRopdown and textbox 
    
    //Call API function in ALlMembers component instead of here 
    this.props.searchAll();

  }

  render() {

    return (
      <div className="container">
        <form noValidate>
          <h3 className="mb-1 text-center card-title">Refine your results <i className="fa fa-search-plus" aria-hidden="true"></i></h3>
          <div className="row text-center mt-3">
            <div className="column col-6 col-xs-12">
              <div className="form-group">
                <div className="col-2 col-sm-12">
                  <strong><label className="form-label" htmlFor="states">
                    By State :
                  </label></strong>
                </div>
                <div className="col-2 col-sm-12">
                  <select className="custom-select my-1 mr-sm-2" id="states" size={this.state.sizeStateDropdown} onFocus={()=>{this.setState({sizeStateDropdown: 5})}} onBlur={()=>{this.setState({sizeStateDropdown: 1})}} onChange={this.handleStateChange}>
                    <option value="All">All</option>
                    {this.state.allStates.map((item) =>
                      <option key={item}>{item}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="column col-6 col-xs-12">
              <div className="form-group">
                <div className="col-2 col-sm-12">
                  <strong><label className="form-label" htmlFor="city">
                    By City :
                  </label> </strong>
                </div>
                <div className="col-2 col-sm-12">
                  <select className="custom-select my-1 mr-sm-2" id="cities" size={this.state.sizeCityDropdown} onFocus={()=>{this.setState({sizeCityDropdown: 5})}} onBlur={()=>{this.setState({sizeCityDropdown: 1})}} onChange={this.handleCityChange}>
                    <option value="All">All</option>
                    {this.state.allCities.map((item) =>
                      <option key={item}>{item}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="column col-4 col-xs-12">
              {/* <div className="form-group">
                <div className="col-2 col-sm-12">
                  <strong><label className="form-label" htmlFor="schools">
                    By School :
                  </label> </strong>
                </div>
                <div className="col-2 col-sm-12">
                  <select className="custom-select my-1 mr-sm-2" id="schools" onChange={this.handleSchoolChange}>
                    <option value="">All</option>
                    {this.state.schools.map((item, j) =>
                      // console.log("School name ", item)
                      <option key={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div> */}
              {/* <button className="btn btn-secondary mt-4 ml-2 p-2" onClick={this.handleResetButtonClick}> <i className="fas fa-eraser"></i> NO FILTER</button> */}
            </div>
          </div>
        </form>
        <hr style={hrStyle} />
      </div>
    )
  }
}

export default FilterBy;