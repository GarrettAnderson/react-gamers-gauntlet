import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
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
<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h2 class="text-center text-dark mt-5">Signup</h2>
      <form class="card my-5" onSubmit={handleFormSubmit}>
        <div class="card-body p-lg-5">
        
        <div>
          <img src="https://cdn.discordapp.com/attachments/1077746194073264211/1098067570835337257/Gamers_gauntlet_3.png" alt="Gamers Gauntlet" className="profile-image-pic" />
        </div>
        <div class="card-body p-lg-6"></div>
          <div class="row mb-3">
            <label htmlFor="firstName" class="col-sm-3 col-form-label">First Name:</label>
            <div class="col-sm-9">
              <input
                placeholder="First"
                name="firstName"
                type="firstName"
                id="firstName"
                class="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="row mb-3">
            <label htmlFor="lastName" class="col-sm-3 col-form-label">Last Name:</label>
            <div class="col-sm-9">
              <input
                placeholder="Last"
                name="lastName"
                type="lastName"
                id="lastName"
                class="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="row mb-3">
            <label htmlFor="email" class="col-sm-3 col-form-label">Email:</label>
            <div class="col-sm-9">
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                class="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="row mb-3">
            <label htmlFor="pwd" class="col-sm-3 col-form-label">Password:</label>
            <div class="col-sm-9">
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                class="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-sm-9 offset-sm-3">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </div>

          <div class="text-center mb-5 text-dark">Already Registered? <Link to="/login" class="text-dark fw-bold">Login</Link></div>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}

export default Signup;