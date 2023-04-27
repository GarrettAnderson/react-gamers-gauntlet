// import {useState} from "react";
// import styled from "styled-components";

// //setting card that holds a question-`` is styling from styled-components
// const Card = props => {
//     const [active, setActive] = useState(true);
//     const sendData = number => {
//         setActive(false)
//         props.send(number)
//     }
    
//     const Question = styled.h4`
//         text-align: center;
//         font-size: 1.5em;
//     `
//     const Body = styled.section`
//         display: flex;
//         flex-direction: column;
//         width: 50vw;
//     `
//     const Holder = styled.section`
//         display: grid;
//         grid-template-rows: 1fr 1fr;
//     `
//     const Answer = styled.button`
//         border-radius: 1rem;
//     `
//     //returns trivia card
//     return (
//         <Body>
//             <Question>{props.question}</Question>
//             <Holder>
//                 <Answer onClick={() => sendData(props.answer[0])}>{props.answer[0]}</Answer>
//                 <Answer onClick={() => sendData(props.answer[1])}>{props.answer[1]}</Answer>
//                 <Answer onClick={() => sendData(props.answer[2])}>{props.answer[2]}</Answer>
//                 <Answer onClick={() => sendData(props.answer[3])}>{props.answer[3]}</Answer>
//             </Holder>
//         </Body>
//     )
// }


// export default Card;