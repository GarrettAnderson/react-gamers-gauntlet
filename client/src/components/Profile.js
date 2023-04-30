import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_SCORES } from "../utils/queries";

function Profile() {
  const navigate = useNavigate();
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  const { loading: scoreLoading, data: scoreData } = useQuery(QUERY_SCORES);
  console.log(userData, scoreData);
  const [userScores, setUserScores] = useState([]);

  useEffect(() => {
    if (!scoreLoading && scoreData && userData) {
      // Filter the scores to only include those for the current user
      const filteredScores = scoreData.scores.filter(
        (score) => score.user_id._id === userData.user._id
      );
      setUserScores(filteredScores);
    }
  }, [scoreData, scoreLoading, userData]);

  let user = userData?.user || {};
  return (
    <main className="page-main d-flex justify-content-center align-items-center">
    <div className="spacer4"></div>
    {/* <div className="text-center">Profile</div> */}
    <div className="spacer2"></div>
    <div className="card" style={{ width: "30rem" }}>
    <div>
      <img src="https://cdn.discordapp.com/attachments/1077746194073264211/1098067570835337257/Gamers_gauntlet_3.png" alt="Gamers Gauntlet" className="gamers-gauntlet-logo" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{userData.email}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{userData.title}</h6>
        <p className="card-text">
          Total Questions: {userData.questionsAnswered}
          <br />
          Correct Answers: {userData.correctPercent}%
        </p>
        <div className="spacer"></div>
          <h3>Quiz Scores:</h3>
          <ul>
            {userScores.map((score) => (
              <li key={score.id}>
                {score.quizName}: {score.score}
              </li>
            ))}
            </ul>
        <button
        className="text-center btn btn text-home"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      </div>
    </div>
  </main>
);
}

export default Profile;
