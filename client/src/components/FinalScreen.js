import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { QUERY_SCORES, GET_GAMES, GET_GAME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

function FinalScreen(props) {
  const { loading: loadFirstGame, data: getFirstGame } = useQuery(GET_GAMES);
  const { data: currentGameById, loading: loadCurrentGameById } = useQuery(
    GET_GAME,
    {
      variables: { id: getFirstGame.games[0]._id },
    }
  );
  console.log(currentGameById.game);
  console.log(getFirstGame);
  const navigate = useNavigate();
  // const score = useSelector((state) => state.score);
  const { loading, error, data } = useQuery(QUERY_SCORES);
  console.log(loading);
  console.log(data ?? []);
  if (loading) {
    return <p>Loading...</p>;
  }
  const score = data.scores[data.scores.length - 1].score;

  return (
    <div className="d-flex flex-column">
      <div className="spacer2"></div>
      <h3 className="text-center">Player 1 Score: {props.playerOneScore}</h3>
      <h3 className="text-center">Player 2 Score: {props.playerTwoScore}</h3>
      <div className="spacer2"></div>
      <div className="select-buttons">
        <button
          onClick={() => {
            navigate("/profile");
          }}
          className="btn"
        >
          Profile
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn"
        >
          Home
        </button>
      </div>
    </div>
  );
}
export default FinalScreen;
