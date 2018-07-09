import React, { Component } from 'react';
// import { makeData } from "../services/util";
import axios from 'axios';
// Import React Table
import ReactTable from "react-table";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
   userdata: [],
   name: '',
   email: '',
  };
    this.renderEditable = this.renderEditable.bind(this);
  }
  handleChange(event) {
    if (event.target.name === "name")
      this.setState({ name: event.target.value });
    if (event.target.name === "email")
      this.setState({ email: event.target.value });
  };

  handleSubmit(event) {
    this.state.userdata.push({
        name: this.state.name,
        email: this.state.email
    });
    this.setState({ name: "", email: "" });
    event.preventDefault();
};
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
          console.log('tableeditdata', e.target.innerHTML);
          console.log('html', this.state.userdata[cellInfo.index][cellInfo.column.id]);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.userdata[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const original= this.state.userdata;
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Add USER</h1>
        </header>
        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <h3>Add new record</h3>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
        </p>
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
                },
                {
                  Header: "location",
                  accessor: "location.city",
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

export default Dashboard;
