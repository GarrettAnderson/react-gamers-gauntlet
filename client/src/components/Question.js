import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_SCORE, UPDATE_USER } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
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
    const userData = data?.user || {};
    console.log(userData);
    // const newScore = userData.questionsCorrect + score;
    // const newTotal = userData.questionsAnswered + 10;
    // const newPercent = newScore / newTotal * 100;
    // const userEmail = userData.email;
    const userId = userData._id;
    // const addScore = userData.score;
    // console.log('newTotal', newTotal);
    // console.log('newScore', newScore);
    // console.log('newPercent', newPercent);

    const { addedScore } = await addsScore({
      variables: { user_id: userId, score: score },
    });
    console.log(addedScore);

    // if (questions.length === 10) {
    navigate("/final");
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
  const handleListItemClick = (event) => {
    setAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);
    if (event.target.textContent === answer) {
      // dispatch({
      //   type: 'ADD_SCORE',
      //   score: score + 1,
      // })
      setScore(score + 1000);
    }
    if (questionIndex + 1 <= questions.length) {
      setTimeout(() => {
        setAnswerSelected(false);
        setSelectedAnswer(null);
        dispatch({
          type: "SET_INDEX",
          index: questionIndex + 1,
        });
      }, 2500);
    }
  };

  const getClass = (option) => {
    if (!answerSelected) {
      return ``;
    }
    if (option === answer) {
      return `correct disabled`;
    }
    if (option === selectedAnswer) {
      return `selected disabled`;
    } else {
      return `disabled`;
    }
  };
  if (!question) {
    // navigate('/final');
    return <div>Loading</div>;
  }
  return (
    <div className="m-3">
      <p className="text-small">Question {questionIndex + 1}</p>
      <h3 className="question">{question.question}</h3>
      <div className="spacer"></div>
      <ul>
        {options.map((option, i) => (
          <li
            key={i}
            onClick={handleListItemClick}
            className={getClass(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      <div className="text-small text-right">
        Score: {score} / {questions.length * 1000}
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
