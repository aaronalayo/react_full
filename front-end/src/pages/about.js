import { Navbar } from "./CommonNavbar";
import "../css/Admin.css";

export const About = () => {
  return (
    <div>
      <Navbar />
      <br></br>
      <div className="admin" >
        <p className="about">
          Welcome to Roll call System. This is our Software Development 6th
        Semester Project Demo for Fullstack ! This project is about building a
         full-stack React + Node.js + Express + MySQL project with a CRUD
          Application. The back-end server uses Node.js + Express for REST APIs,
          front-end side is a React.js client with React Router, Axios and
          Bootstrap.Node.js Express exports REST APIs and interacts with MySQL
          Database using Sequelize ORM. React Client sends HTTP Requests and
          retrieves HTTP Responses using Axios, consume data on the components.
          React Router is used for navigating to pages.
        </p>
      </div>
    </div>
  );
};
