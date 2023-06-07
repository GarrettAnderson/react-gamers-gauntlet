import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Login.css";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div>
          <div className="card card-container">
            {/* <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div> */}
            <div style={{ textAlign: "center" }}>
              <img
                src="https://cdn.discordapp.com/attachments/1077746194073264211/1098067570835337257/Gamers_gauntlet_3.png"
                alt="Gamers Gauntlet"
                className="gamers-gauntlet-logo"
              />
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label login-label">
                    Email address
                  </label>
                  <input
                    placeholder="youremail@test.com"
                    name="email"
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label login-label">
                    Password
                  </label>
                  <input
                    placeholder="******"
                    name="password"
                    type="password"
                    id="password"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                {error && (
                  <div className="mb-3">
                    <p className="text-danger">
                      The provided credentials are incorrect
                    </p>
                  </div>
                )}
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/signup">
                    <button type="submit" className="btn btn-primary button">
                      Sign Up
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-primary button">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
