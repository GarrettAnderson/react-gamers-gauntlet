import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATE_GAME } from "../utils/mutations";
import { GET_GAMES, GET_GAME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import FetchButton from "./FetchButton";

function Settings(props) {
  const navigate = useNavigate();
  const [options, setOptions] = useState(null);
  const [createOneGame] = useMutation(CREATE_GAME);
  const { data: getFirstGame, loading: loadFirstGame } = useQuery(GET_GAMES);

  if (loadFirstGame) {
    <p>Loading Game...</p>;
  } else {
    console.log(getFirstGame);
  }
  // const { data: currentGameById } = useQuery(GET_GAME, {
  //   variables: { id: getFirstGame.games[0]._id },
  // });
  // const { currentGameId, setCurrentGameId } = useState(getFirstGame.games[0]);
  // console.log(currentGameById.game._id);
  // replace state hooks with useSelector
  const loading = useSelector((state) => state.options.loading);
  const questionCategory = useSelector(
    (state) => state.options.question_category
  );

  // defining to dispatch the actions
  const dispatch = useDispatch();

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;
    const handleLoadingChange = (value) => {
      dispatch({
        type: "CHANGE_LOADING",
        loading: value,
      });
    };

    handleLoadingChange(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        handleLoadingChange(false);
        setOptions(response.trivia_categories);
      });
  }, [setOptions, dispatch]);
  // replace setState with actions
  const handleCategoryChange = (event) => {
    dispatch({
      type: "CHANGE_CATEGORY",
      value: event.target.value,
    });
  };

  const getCurrentGame = (event) => {
    console.log("get current game");
  };
  if (!loading) {
    return (
      <>
        <div className="spacer4"></div>
        <div className="d-flex flex-column">
          <div className="text-center">
            <h2>Select Category:</h2>
            <select
              value={questionCategory}
              onChange={handleCategoryChange}
              className="w-75"
            >
              <option>All</option>
              {options &&
                options.map((option) => (
                  <option value={option.id} key={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="spacer2"></div>
          <div className="select-buttons">
            <button
              className="btn btn-black"
              onClick={() => {
                navigate("/create-game");
              }}
            >
              Add Game
            </button>
            {/* Create a game collection on back end when user clicks start  */}
            <FetchButton text="Start!" />
            <button
              onClick={() => {
                navigate("/");
              }}
              className="btn text-white"
            >
              Home
            </button>
          </div>
        </div>
      </>
    );
  } else {
    <p>LOADING...</p>;
  }
}
export default Settings;
