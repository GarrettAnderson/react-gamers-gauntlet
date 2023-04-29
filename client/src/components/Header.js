import React from 'react';


function Header() {
    return (
        <header className='d-flex' style={{ backgroundColor: 'transparent' }}>
            <div className='d-flex row'>
                {/* <div className='logo-div mx-3 m-1'>
                    <img className='mern-logo' src={mernLogo} alt='MERN Logo'></img>
                </div> */}
                <div className='mern-trivia'>
                    <h1 className='m-0'>Gamers Gauntlet</h1>
                </div>
            </div>
        </header>
    )
}

export default Header