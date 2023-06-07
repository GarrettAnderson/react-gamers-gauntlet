import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
        <div className="col-md-6">
          <div className="card card-container">
            {/* <div className="card-header">
              <h2 className="text-center">Signup</h2>
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
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    placeholder="******"
                    name="firstName"
                    type="firstName"
                    id="firstName"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    placeholder="******"
                    name="lastName"
                    type="lastName"
                    id="lastName"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
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
                  <label htmlFor="password" className="form-label">
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
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/login">
                    <button type="submit" className="btn btn-primary button">
                      Login
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-primary button">
                    Sign Up
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

export default Signup;
