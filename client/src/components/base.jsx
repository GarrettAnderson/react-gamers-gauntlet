// import { useState, useEffect, useCallback } from "react";

// //game
// const Game = props => {
//     const [questionList, setQuestionList] = useState([]);
//     const [score, setScore] = useState(0);
//     const [current, setCurrent] = useState(null);
//     const [live, setLive] = useState(false);

// //calls question from api    
//     const getQuestions = useCallback(async () => {
//         const r = await fetch("https://opentdb.com/api.php?amount=2&difficulty=easy&type=multiple")

//         const response = await r.json();
//         console.log(response);
//         setQuestionList(response.results);
//     }, [])
// //get questions at game start
//     useEffect( () => {
//         getQuestions()
//     }, [getQuestions])

// //if correct answer is clicked, add to score
//     const send = clicked => {
//         if (current.correct_answer === clicked){
//             setScore(score + 1)
//         }
//         setLive(false)
//     }
//     //get current question, randomize answers for sending to card
//     const generateTriviaCard = () => {

//     }
//     //populate current question & update question list if necessary
//     const getCurrent = async () => {

//     }

// };

// export default Game;