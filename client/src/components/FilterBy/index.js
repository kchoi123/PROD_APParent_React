import React, { Component } from 'react';
import API from "../../utils/API";
// import Select from 'react-select';

const statesList = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

class FilterBy extends Component {
  //State 
  state = {
    allStates: statesList,
    schools: [],
    // Seeting value by default 
    filteredState: "California"
  }

  componentDidMount() {

    // retrieves all the schools
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

  handleChange = event => {

    // console.log(`Option selected:`, event.target.value);

    this.setState({ filteredState: event.target.value });

    // // retrieves all the schools - filter by state 
    // API.getAllSchoolsByState(event.target.value)
    //   .then(
    //     res => {

    //       console.log("Filtered Schools : ", res.data);
    //       this.setState({
    //         schools: res.data
    //       })
    //     }
    //   )
    //   .catch(err => console.log(err));

    // retrieves all the members - filter by state 
    API.searchAllMembersForAState(event.target.value)
      .then(results => {

        console.log("Filtered Members", results.data);
        //Attach data to ALlMEMBERS STATE OF DASHBOARD 
        this.setState({
          members: results.data
        })
      }
      )
      .catch(err => console.log(err));

}

render() {

  return (
    <div className="container">
      <form noValidate>
        <p className="mb-1 text-center text-info">Refine your results</p>
        <div className="columns text-center">
          <div className="column col-6 col-xs-12">
            <div className="form-group">
              <div className="col-3 col-sm-12">
                <label className="form-label" htmlFor="states">
                  States
                  </label>
              </div>
              <div className="col-9 col-sm-12">
                <select className="form-select" id="states" onChange={this.handleChange}>
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
                <label className="form-label" htmlFor="schools">
                  Schools
                  </label>
              </div>
              <div className="col-9 col-sm-12">
                <select className="form-select" id="schools">
                  <option value="">Choose...</option>
                  {this.state.schools.map((item, j) =>
                    // console.log("School name ", item)
                    <option key={item.id}>{item.name}</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div>
            <button className="btn-info" onSubmit={this.props.handleChange}> Search</button>
          </div>
        </div>
      </form>
    </div>
  )
}
}

export default FilterBy;