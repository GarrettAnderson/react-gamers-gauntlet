import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";


function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" className="nav-link text-white" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/signup" className="nav-link text-white">Signup</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link text-white">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white">Gamer's Gauntlet</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {showNavigation()}
        </div>
      </div>
    </nav>
  );
}

export default Nav;