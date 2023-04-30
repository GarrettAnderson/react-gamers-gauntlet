import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { CREATE_GAME } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function AddPlayer(props) {
  const handleFormSubmit = async (event) => {
    // event.preventDefault();
    // try {
    //   const mutationResponse = await login({
    //     variables: { email: formState.email, password: formState.password },
    //   });
    //   const token = mutationResponse.data.login.token;
    //   Auth.login(token);
    // } catch (e) {
    //   console.log(e);
    // }
    console.log(event);
  };

  const handleChange = (event) => {
    // const { name, value } = event.target;
    // setFormState({
    //   ...formState,
    //   [name]: value,
    // });
    console.log(event.target);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>
            <div style={{ textAlign: "center" }}>
              <img
                src="https://cdn.discordapp.com/attachments/1077746194073264211/1098067570835337257/Gamers_gauntlet_3.png"
                alt="Gamers Gauntlet"
                className="gamers-gauntlet-logo"
              />
            </div>
            <div className="card-body">
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
                <button type="submit" className="btn btn-primary">
                  Add Player
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPlayer;
