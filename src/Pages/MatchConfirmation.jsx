import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavBar } from '../components'
import { getRankImage } from '../utils'
import { ConfirmationIcon } from '../components'
import { UserContext } from '../UserContext'
import { createMatch } from '../firestoreQueries'
import { MatchModel } from '../models'

const MatchConfirmation = () => {
    const { userData } = useContext(UserContext);
    const location = useLocation();
    const { teammate, opponent1, opponent2 } = location.state;

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-row'>
            <ConfirmationIcon playerId={userData}/>
            <div className="border-l white h-full mx-2"></div>
            <ConfirmationIcon playerId={teammate}/>
        </div>
        <div className='flex flex-row'>
            <ConfirmationIcon playerId={opponent1}/>
            <div className="border-l white h-full mx-2"></div>
            <ConfirmationIcon playerId={opponent2}/>
        </div>
        <button className='py-4' >
            <h6 className='font-Inter font-semibold text-[14px] text-dark-green bg-light-green px-2 py-1 rounded-md'>
                Confirm Match
            </h6>
        </button>
        <NavBar />
    </div>
  )
}

export default MatchConfirmation