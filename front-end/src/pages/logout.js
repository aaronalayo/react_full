import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";

export const Logout = () => {

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

}

