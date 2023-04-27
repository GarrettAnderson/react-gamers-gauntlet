import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function LoginSignup() {
    const navigate = useNavigate();

    return (
      <div className=''>
        <Login />
        <div className='spacer'></div>
        <Signup />
        <div className='spacer2'></div>
        <div className='home-buttons'>
        <button className='btn text-white' onClick={() => { navigate('/') }}>Home</button>
      </div>
      </div>
    );
}

export default LoginSignup