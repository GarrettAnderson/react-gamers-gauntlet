import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";

function Home() {
  console.log(Auth.loggedIn());
  const { loading, data } = useQuery(QUERY_USER);
  console.log(data);
  let userData = data?.user || {};
  console.log(userData);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    Auth.loggedIn() ? setUser(userData.firstName) : console.log(userData);
  }, [userData]);

  return (
    <main className="page-main d-flex justify-content-center align-items-center">
      <div className="spacer4"></div>
      {Auth.loggedIn() ? (
        <div>
          <div className="text-center welcome">Welcome, {user}!</div>
          <button
            className="btn btn-blue"
            onClick={() => {
              navigate("/select");
            }}
          >
            Create Game
          </button>
          <button
            className="btn btn-black"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </button>
        </div>
      ) : (
        <div className="text-center welcome">Sign up/Log in to play!</div>
      )}
      <div className="spacer2"></div>
      <div className="home-buttons m-5">
        {Auth.loggedIn() ? (
          <button className="btn text-white" onClick={Auth.logout}>
            Logout
          </button>
        ) : (
          <button
            className="btn text-white"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </div>
    </main>
  );
}

export default Home;
