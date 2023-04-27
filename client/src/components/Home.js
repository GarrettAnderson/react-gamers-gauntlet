import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/Auth';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

function Home() {
    console.log(Auth.loggedIn());
    const { loading, data } = useQuery(GET_ME);
    let userData = data?.me || {};
    console.log(userData);
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        Auth.loggedIn() 
        ? setUser(userData.username)
        : console.log(userData)
    }, [userData])

    return (
        <main className='page-main d-flex justify-content-center align-items-center'>
            <div className='spacer4'></div>
            {Auth.loggedIn() 
             ? <div className='text-center welcome'>Welcome, {user}!</div>
             : <div className='text-center welcome'>Log in to play!</div>
            }
            <div className='spacer2'></div>
            <div className='home-buttons m-5'>
                <button className='btn btn-blue' onClick={() => { navigate('/select') }}>Quizzes</button>
                <button className='btn btn-black' onClick={() => { navigate('/profile') }}>Profile</button>
                {Auth.loggedIn() 
                ? (<button className='btn text-white' onClick={Auth.logout}>Logout</button>) 
                : (<button className='btn text-white' onClick={() => { navigate('/login') }}>Login</button>)}
            </div>
        </main>
    )
}

export default Home