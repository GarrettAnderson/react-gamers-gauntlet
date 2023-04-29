import React from "react";
import AuthService from "../utils/auth";
import { Link } from "react-router-dom";

function Header() {
  function showNavigation() {
    if (AuthService.loggedIn()) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a
              href="/"
              className="nav-link text-white"
              onClick={() => AuthService.logout()}
            >
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/signup" className="nav-link text-white">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link text-white">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="d-flex" style={{ backgroundColor: "transparent" }}>
      <div className="d-flex row">
        {/* <div className='logo-div mx-3 m-1'>
                    <img className='mern-logo' src={mernLogo} alt='MERN Logo'></img>
                </div> */}
        <div className="mern-trivia">
          <h1 className="m-0">Gamers Gauntlet</h1>
          <div>{showNavigation()}</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
