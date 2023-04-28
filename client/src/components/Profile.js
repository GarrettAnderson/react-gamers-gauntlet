import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GET_ME } from '../utils/queries'
import { useQuery } from '@apollo/client';

function Profile() {
    const navigate = useNavigate();
    const { loading, data } = useQuery(GET_ME);
    console.log(data)
    let userData = data?.me || {};
    console.log('userData', userData)

    return (
        <main className='page-main d-flex justify-content-center align-items-center'>
            <div className='spacer4'></div>
            <div className='text-center'>Profile</div>
            <div className='spacer2'></div>
                {loading ? (<div>LOADING...</div>)
                : (<div className='profile-container text-center'>
                    <h2>{userData.username}</h2>
                    <div className='spacer'></div>
                    <div>{userData.title}</div>
                    <div className='spacer'></div>
                    <div>Total Questions: {userData.questionsAnswered}</div>
                    <div>Correct Answers: {userData.correctPercent}%</div>
                    <div className='spacer2'></div>
                </div>)}
            <div className='home-buttons'>
                {/* <button className='btn btn-blue' onClick={handleClick}>Update Stats</button> */}
                <button className='btn text-white' onClick={() => { navigate('/') }}>Home</button>
            </div>
        </main>
    )
}

export default Profile