import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Main1.css"; // Your custom CSS for styling
import { FaUserEdit, FaSignInAlt } from "react-icons/fa";
export default function Main1({ articles }) {
  return (
    <div className="home-page">
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-6 text-center">
            <h1 className="display-4 mb-4">
              Collaborative Article Editing Platform
            </h1>
            <p className="lead mb-5">
              Create, Edit, and Collaborate on Articles
            </p>
            <div>
              <a href="/register" className="btn btn-primary mr-3">
                <FaUserEdit className="btn-icon" /> Register
              </a>
              &nbsp;&nbsp;
              <a href="/login" className="btn btn-outline-primary">
                <FaSignInAlt className="btn-icon" /> Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
