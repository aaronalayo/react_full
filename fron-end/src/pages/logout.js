import React, { Component } from "react";
import { Link } from "react-router-dom";


class Logout extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    sessionStorage.clear();
    this.props.logOutHandler();
    //window.location.replace('/login');
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