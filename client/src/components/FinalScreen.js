import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function FinalScreen() {
  const navigate = useNavigate();
  const score = useSelector((state) => state.score)

  return (
    <div className='d-flex flex-column'>
      <div className='spacer2'></div>
      <h3 className='text-center'>Final Score: {score}</h3>
      <div className='spacer2'></div>
      <div className='select-buttons'>
        <button onClick={() => {navigate('/profile')}} className='btn'>Profile</button>
        <button onClick={() => {navigate('/')}} className='btn'>Home</button>
      </div>
    </div>
  )
}
export default FinalScreen