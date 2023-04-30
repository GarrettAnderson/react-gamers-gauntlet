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
      <div className="text-center">Profile</div>
      <div className="spacer2"></div>
      {userLoading || scoreLoading ? (
        <div>LOADING...</div>
      ) : (
        <div className="profile-container text-center">
          <h2>{user.email}</h2>
          <div className="spacer"></div>
          <div>{user.title}</div>
          <div className="spacer"></div>
          <div>Total Questions: {user.questionsAnswered}</div>
          <div>Correct Answers: {user.correctPercent}%</div>
          <div className="spacer"></div>
          <h3>Quiz Scores:</h3>
          <ul>
            {userScores.map((score) => (
              <li key={score.id}>
                {score.quizName}: {score.score}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="home-buttons">
        <button
          className="btn text-black"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </main>
  );
}

export default Profile;