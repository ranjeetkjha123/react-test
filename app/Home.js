import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom'
// Import React Table
import ReactTable from "react-table";

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
     userdata: []
   };

  }
  componentDidMount() {
    var self = this;
    axios.get('https://randomuser.me/api/?results=1000')
      .then(function (response) {
        self.setState({userdata: response.data.results})
    })

      .catch(function (error) {
        console.log(error);
      });
}
  render() {
    const original= this.state.userdata;
return (
  <div>
    <Link to="/edit">
    <button>New User</button>
    </Link>
    <br/>
  <div>
    <ReactTable
      data={original}
      columns={[
        {
          columns: [
            {
              Header: "Name",
              accessor: "name.first"
            },
            {
              Header: "Email",
              accessor: "email"
            }
          ]
        },
        {
          columns: [
            {
              Header: "Age",
              accessor: "dob.age"
            },
            {
              Header: "mobile",
              accessor: "phone"
            }
          ]
        },
        {
          columns: [
            {
              Header: "DOB",
              accessor: "dob.date"
            },
            {
              Header: "location",
              accessor: "location.city"
            }
          ]
        },
        {
          columns: [
            {
              Header: "Action",
              accessor: "age",
              Cell: row => (<Link to="/edit">Add / Edit</Link>)
            }
          ]
        }
      ]}
      defaultPageSize={5}
      className="-striped -highlight"
    />
    <br />
  </div>
  </div>
);
  }
}

export default Home;
