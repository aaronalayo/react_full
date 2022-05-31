import React, { Component, useEffect } from "react";

export const Logout = () => {

  const token = JSON.parse(localStorage.getItem('token'))
  console.log(token)

  useEffect(() => {
    console.log('This got triggered')
    localStorage.clear();
    // window.location.href('/')
  },[]);

return (
    <div>
      <h2>You are logged out!</h2>
      
    </div>
  );

}

export default Logout;