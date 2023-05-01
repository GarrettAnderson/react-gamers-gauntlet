import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FinalScreen from "./FinalScreen";
import { ADD_SCORE, UPDATE_USER } from "../utils/mutations";
import { QUERY_USER, GET_GAME, GET_GAMES } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import "../assets/css/questions.css";

const decodeHTML = function (html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

function Question() {
  const { loading, data } = useQuery(QUERY_USER);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  // const score = useSelector((state) => state.score)
  const [score, setScore] = useState(0);
  const encodedQuestions = useSelector((state) => state.questions);
  const { loading: loadFirstGame, data: getFirstGame } = useQuery(GET_GAMES);
  const { data: currentGameById, loading: loadCurrentGameById } = useQuery(
    GET_GAME,
    {
      variables: { id: getFirstGame.games[0]._id },
    }
  );

  // const { currentGameId, setCurrentGameId } = useState(getFirstGame.games[0]);

  if (loadCurrentGameById) {
    <p>Loading Game...</p>;
  } else {
    console.log(currentGameById);
  }
  const [currentPlayer, setCurrentPlayer] = useState(
    getFirstGame.games[0].player1
  );
  const [nextPlayer, setNextPlayer] = useState(getFirstGame.games[0].player2);
  const [playerOneScore, setPlayerOneScore] = useState(
    getFirstGame.games[0].player1Score
  );
  const [playerTwoScore, setPlayerTwoScore] = useState(
    getFirstGame.games[0].player2Score
  );
  const player1Email = getFirstGame.games[0].player1;
  const player2Email = getFirstGame.games[0].player2;

  console.log("starting current player", currentPlayer);
  console.log("starting next player", nextPlayer);
  console.log("player 1 score", playerOneScore);
  console.log("player 2 score", playerTwoScore);

  const updateUserData = (cache, { data }) => {
    console.log("updateUserData hook", data);
    cache.modify({
      id: cache.identify(data),
      fields: {
        questionsAnswered(cachedTotal) {
          return data.questionsAnswered;
        },
        correctPercent(cachedPercent) {
          return data.correctPercent;
        },
      },
      /* broadcast: false // Include this to prevent automatic query refresh */
    });
  };

  // const [updateUser, { error }] = useMutation(UPDATE_USER, {
  //   update: updateUserData
  // });

  const [addsScore, { error }] = useMutation(ADD_SCORE, {
    // update: addsScore
  });

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map((q) => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
      };
    });
    console.log(decodedQuestions);
    setQuestions(decodedQuestions);
  }, [encodedQuestions]);
  const questionIndex = useSelector((state) => state.index);
  const dispatch = useDispatch();
  const question = questions[questionIndex];
  const answer = question && question.correct_answer;
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const handleFinish = async () => {
    console.log("handle Finish");
    // const player1Email = getFirstGame.games[0].player1;
    // const player2Email = getFirstGame.games[0].player2;
    const player1Score = playerOneScore;
    const player2Score = playerTwoScore;
    console.log(player1Email);
    console.log(player2Email);
    console.log(data.user);
    console.log(player1Score);
    console.log(player2Score);
    setPlayerOneScore(player1Score);
    setPlayerTwoScore(player2Score);

    // const newScore = userData.questionsCorrect + score;
    // const newTotal = userData.questionsAnswered + 10;
    // const newPercent = newScore / newTotal * 100;
    // const userEmail = userData.email;
    const userId = data.user._id;
    // const addScore = userData.score;
    // console.log('newTotal', newTotal);
    // console.log('newScore', newScore);
    // console.log('newPercent', newPercent);

    const { addedScore } = await addsScore({
      variables: { user_id: userId, score: player1Score },
    });
    // console.log(addedScore);

    // if (questions.length === 10) {
    //   // navigate("/final");
    //   // <FinalScreen />;
    // }
  };

  useEffect(() => {
    if (questionIndex >= 10) {
      console.log(questionIndex);
      handleFinish();
    }
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers];
    answers.splice(
      getRandomInt(question.incorrect_answers.length),
      0,
      question.correct_answer
    );
    setOptions(answers);
  }, [question]);

  const handlePlayerOneClick = (event) => {
    setAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);
    if (event.target.textContent === answer) {
      setPlayerOneScore(playerOneScore + 1000);
    }
    console.log("player 1 choice");
    setCurrentPlayer(getFirstGame.games[0].player2);
    console.log("next player", currentPlayer);
    // if (event.target.textContent === answer) {
    //   // dispatch({
    //   //   type: 'ADD_SCORE',
    //   //   score: score + 1,
    //   // })
    //   setScore(score + 1000);
    // }
    // if (questionIndex + 1 <= questions.length) {
    //   // setTimeout(() => {
    //   setAnswerSelected(false);
    //   setSelectedAnswer(null);
    //   dispatch({
    //     type: "SET_INDEX",
    //     index: questionIndex + 1,
    //   });
    //   // }, 2500);
    // }
  };

  const handlePlayerTwoClick = (event) => {
    // if (currentPlayer) {
    setAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);
    if (event.target.textContent === answer) {
      setPlayerTwoScore(playerTwoScore + 1000);
    }
    console.log("player 2 choice");
    setCurrentPlayer(getFirstGame.games[0].player1);
    // if (event.target.textContent === answer) {
    //   // dispatch({
    //   //   type: 'ADD_SCORE',
    //   //   score: score + 1,
    //   // })
    //   setScore(score + 1000);
    // }
    if (questionIndex + 1 <= questions.length) {
      // setTimeout(() => {
      setAnswerSelected(false);
      setSelectedAnswer(null);
      dispatch({
        type: "SET_INDEX",
        index: questionIndex + 1,
      });
      // }, 1000);
    }
  };

  const getClass = (option) => {
    if (!answerSelected) {
      return ``;
    }
    if (option === answer) {
      return `correct `;
    }
    if (option === selectedAnswer) {
      return `selected `;
    }
    // else {
    //   return `disabled`;
    // }
  };
  // if (!question) {
  //   // navigate('/final');
  //   return <div>Loading</div>;
  // }
  return !question ? (
    <FinalScreen
      player1Email={player1Email}
      player2Email={player2Email}
      playerOneScore={playerOneScore}
      playerTwoScore={playerTwoScore}
      getFirstGame={getFirstGame}
      getCurrentGameById={currentGameById}
    />
  ) : (
    <div className="m-3">
      {currentPlayer === getFirstGame.games[0].player1 ? (
        <h1 className="question">Player 1 Turn</h1>
      ) : (
        <h1 className="question">Player 2 Turn</h1>
      )}
      <p className="text-small">Question {questionIndex + 1}</p>
      <h3 className="question">{question.question}</h3>
      <div className="spacer"></div>
      {currentPlayer === getFirstGame.games[0].player1 ? (
        <div>
          <ul>
            {options.map((option, i) => (
              <li
                key={i}
                onClick={handlePlayerOneClick}
                className={getClass(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <ul>
            {options.map((option, i) => (
              <li
                key={i}
                onClick={handlePlayerTwoClick}
                className={getClass(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="text-small text-right">
        Player 1 Score: {playerOneScore} / {questions.length * 1000}
      </div>
      <div className="text-small text-right">
        Player 2 Score: {playerTwoScore} / {questions.length * 1000}
      </div>
      <div className="spacer2"></div>
      <div className="text-right">
        <button
          className="btn btn-exit"
          onClick={() => {
            navigate("/");
          }}
        >
          Exit
        </button>
      </div>
    </div>
  );
}

export default Question;
