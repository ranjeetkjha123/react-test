import React, { Component } from 'react';
// import { makeData } from "../services/util";
import axios from 'axios';
// Import React Table
import ReactTable from "react-table";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
   userdata: []
  };
    this.renderEditable = this.renderEditable.bind(this);
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
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const userdata = [...this.state.userdata];
          userdata[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ userdata });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.userdata[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const original= this.state.userdata;
    console.log('innerdata', original)
    return (
      <div>
        <ReactTable
          data={original}
          columns={[
            {
              columns: [
                {
                  Header: "Name",
                  accessor: "name.first",
                },
                {
                  Header: "Email",
                  accessor: "email",
                  Cell: this.renderEditable
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Age",
                  accessor: "dob.age",
                  Cell: this.renderEditable
                },
                {
                  Header: "mobile",
                  accessor: "phone",
                  Cell: this.renderEditable
                }
              ]
            },
            {
              columns: [
                {
                  Header: "DOB",
                  accessor: "dob.date",
                  Cell: this.renderEditable
                },
                {
                  Header: "location",
                  accessor: "location.city",
                  Cell: this.renderEditable
                }
              ]
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <br />

      </div>
    );
  }
}

export default Dashboard;
