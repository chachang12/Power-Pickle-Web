import React, { useContext, useEffect, useState } from 'react';
import { getRankImage } from '../utils'
import { unranked, tempprofile } from '../assets'

const LeaderBoardCard = ({ friend, rank }) => {

    const [rankImage, setRankImage] = useState(unranked); // default image

    useEffect(() => {
        console.log(friend);
        setRankImage(getRankImage(friend.mmr)); // call getRankImage after data fetch

    }, [friend]);

    return (
        <div className=' mt-4 w-[90%]'>
          <div className='flex flex-row bg-matcha-green px-4 py-2 rounded-xl space-x-4 items-center'>
            <h2 className='w-[10px]'>{rank}</h2>
            <img src={friend.profilePicture || tempprofile} alt={friend.username} className="rounded-full w-[65px] h-[65px] bg-[#808080] object-cover" />
            <h2 className='font-Inter font-semibold w-[75px]'>
              {friend.username}
            </h2>
            <h2 className='font-Inter font-semibold w-[50px]'>
              {friend.mmr}
            </h2>
            <img src={rankImage} alt="rank" className="h-[50px] w-[50px]" />
          </div>
        </div>
      )
}

export default LeaderBoardCard