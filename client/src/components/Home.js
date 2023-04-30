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
    <main className="page-main">
      <div className="spacer4"></div>
      {Auth.loggedIn() ? (
        <div>
          <div className="text-center welcome">Welcome {user}!</div>
          <div className="spacer6"></div>
          <button
            className="text-center btn btn-blue"
            onClick={() => {
              navigate("/select");
            }}
          >
            Create Game
          </button>
          <div className="spacer5"></div>
          <button
            className="text-center btn btn-black"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </button>
        </div>
      ) : (
        <div>
        <img src="https://cdn.discordapp.com/attachments/1077746194073264211/1098067570835337257/Gamers_gauntlet_3.png" alt="Gamers Gauntlet" className="gamers-gauntlet-logo" />
        </div>
      )}
      <div className="spacer2"></div>
      <div className="home-buttons d-flex justify-content-center align-items-center">
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
