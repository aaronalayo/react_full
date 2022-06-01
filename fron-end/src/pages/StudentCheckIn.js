import React, { Component } from "react";
//import Select from 'react-select';




const subjects = [
    { label: "Database", value: "Database" },
    { label: "DLS", value: "DLS"},
    { label: "Testing", value: "Testing" }
];
export const Checkin =()=>  {
   
        return (
            <div id ="box">
                <h2>Generate key</h2>
                <p>Select a subject and write a passphrase !</p>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                        
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>

                <div class='inputWithButton'>
                    <input type="text" placeholder="Write passphrase here"/>
                    <button>Generate</button>
                </div>
                </div>
                
           
        );
    }


