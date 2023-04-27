import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function FetchButton(props) {
  const navigate = useNavigate();
	// access the settings that will be used to construct the API query
  const questionCategory = useSelector(state => state.options.question_category)
  // const questionIndex = useSelector(state => state.index)
	
  const dispatch = useDispatch()

  const setLoading = value => {
    dispatch({
      type: 'CHANGE_LOADING',
      loading: value
    })
  }
  const setQuestions = value => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: value
    })
  }

  const handleQuery = async () => {
		// we always need to specify the number of questions that we
		// want to be returned
    let apiUrl = `https://opentdb.com/api.php?amount=10`;
		// only add the rest of the parameters if they aren't 'all'
    if (questionCategory.length) {
      apiUrl = apiUrl.concat(`&category=${questionCategory}`)
    }

    setLoading(true);

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((response) => {
        setQuestions(response.results)
        setLoading(false);
    });

    // if (questionIndex > 0) {
      dispatch({
        type: 'SET_INDEX',
        index: 0,
      })

      dispatch({
        type: 'SET_SCORE',
        score: 0,
      })

    navigate('/quiz');
  }
	// we will resuse this component, so the button text will be passed as props
  return <button onClick={handleQuery} className='btn btn-blue'>{props.text}</button>;
}
export default FetchButton;