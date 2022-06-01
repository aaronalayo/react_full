import React, { Component } from "react";
import {Navigate} from 'react-router-dom'


class Logout extends Component {
  
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout() {
    localStorage.clear();
    this.props.logOutHandler();
    <Navigate to='/' />
  }

  render() {
    return (
      <div>
        <h1>You are logged out!</h1>
       
      </div>
    );
  }
}


export default Logout;