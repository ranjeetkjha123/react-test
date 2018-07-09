import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/edit' component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
