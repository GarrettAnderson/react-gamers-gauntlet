// src/Reducer.js
const initState = {
    options: {
      loading: false,
      question_category: ``,
      index: 0,
      score: 0
    }
  }
  const Reducer = (state = initState, action) => {
    switch (action.type) {
      // case "GET_ME":
      //   return {
      //     ...state,
      //     options: {
      //       ...state.options,
      //       stats: action.value
      //     }
      //   }
      case "CHANGE_LOADING":
        return {
          ...state,
          options: {
            ...state.options,
            loading: action.value
          }
        }
      case "CHANGE_CATEGORY":
        return {
          ...state,
          options: {
            ...state.options,
            question_category: action.value
          }
        }
      case "SET_QUESTIONS":
        return {
          ...state,
          questions: action.questions
        }
      case "SET_INDEX":
        console.log('action.index', action.index)
        return {
        ...state,
        index: action.index
      }
      case "SET_SCORE":
        return {
        ...state,
        score: action.score
      }
      default:
        return state
    }
  }
  export default Reducer