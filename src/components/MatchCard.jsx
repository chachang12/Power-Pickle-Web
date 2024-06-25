import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import { getRankImage, dateHandler } from '../utils';
import { unranked } from '../assets';


const MatchCard = ({ match }) => {
    console.log(match);
    const { userData } = useContext(UserContext);
    const [userWon, setUserWon] = useState(false);
    const [rankImage, setRankImage] = useState(unranked); // default image
  
    useEffect(() => {
      if (match && userData) {
        console.log('Winners: ' + match.winnerIds);
        setUserWon(match.winnerIds.includes(userData.id));
        console.log('User won: ' + userWon);
      }
      setRankImage(getRankImage(userData.mmr)); // call getRankImage after data fetch
    }, [match, userData]);

    


  return (
    <div className='mb-4 w-[100%]'>
        <div className={userWon ? 'bg-dark-green bg-opacity-80 px-6 py-4 rounded-lg' : 'bg-red-500 bg-opacity-80 px-6 py-4 rounded-lg'}>
            <div className='flex flex-row items-center space-x-8'>
                <div className='flex flex-col items-center text-white'>
                    <h1>
                        {dateHandler(match.date)}
                    </h1>
                    <h1 className={userWon ? 'text-green-500' : 'text-red-500'}>
                        {userWon ? 'W' : 'L'}
                    </h1>
                </div>
                <div className='flex flex-row space-x-4 text-white'>
                    <h1>
                        {match.team1score}
                    </h1>
                    <h1>
                        :
                    </h1>
                    <h1>
                        {match.team2score}
                    </h1>
                </div>
                <div className='flex flex-row sp'>
                <h1 className={userWon ? 'text-green-500' : 'text-red-500'}>
                    {(match.mmrChanges[userData.id] > 0) ? '+' + Math.abs(match.mmrChanges[userData.id]) : '-' + Math.abs(match.mmrChanges[userData.id])}
                </h1>         
                </div>
                <div>
                    <img src={rankImage} alt="rank" className="h-[50px]" />
                </div>
            </div>
        </div>
    </div>
    
    
  )
}

export default MatchCard