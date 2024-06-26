import React, { useEffect, useState } from 'react'
import { getRankImage, dateHandler } from '../utils';
import { unranked } from '../assets';

const MatchCard = ({ match, playerData }) => {
    console.log(match);
    const [userWon, setUserWon] = useState(false);
    const [rankImage, setRankImage] = useState(unranked); // default image

    console.log('Player data: ' + playerData);

    useEffect(() => {
      if (match && playerData) {
        console.log('Winners: ' + match.winnerIds);
        setUserWon(match.winnerIds.includes(playerData.id));
        console.log('User won: ' + userWon);
        setRankImage(getRankImage(playerData.mmr)); // call getRankImage after data fetch
      }
    }, [match, playerData]);

    return (
        <div className='mb-4 w-[100%]'>
            <div className={userWon ? 'bg-dark-green bg-opacity-80 px-6 py-4 rounded-lg' : 'bg-red-500 bg-opacity-80 px-6 py-4 rounded-lg'}>
                <div className='flex flex-row items-center space-x-8 justify-between'>
                    <div className='flex flex-col items-center text-white'>
                        <h1>
                            {dateHandler(match.date)}
                        </h1>
                        <h1 className={userWon ? 'text-green-500' : 'text-red-800'}>
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
                    <div className='flex flex-row'>
                        <h1 className={userWon ? 'text-green-500' : 'text-red-800'}>
                            {(match.mmrChanges[playerData.id] > 0) ? '+' + Math.abs(match.mmrChanges[playerData.id]) : '-' + Math.abs(match.mmrChanges[playerData.id])}
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