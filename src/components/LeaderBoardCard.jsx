import React, { useContext, useEffect, useState } from 'react';
import { getRankImage } from '../getRank'
import { unranked, tempprofile } from '../assets'

const LeaderBoardCard = ({ friend, rank }) => {

    const [rankImage, setRankImage] = useState(unranked); // default image

    useEffect(() => {
        console.log(friend);
        setRankImage(getRankImage(friend.mmr)); // call getRankImage after data fetch

    }, [friend]);

  return (
    <div className='flex flex-row bg-white px-4 py-2 rounded-lg bg-opacity-50 space-x-6 my-4'>
        <h2>{rank}</h2>
        <img src={friend.profilePicture || tempprofile} alt={friend.username} className="rounded-full w-[75px] h-[75px] bg-[#808080] object-cover" />
        <h2 className='font-Inter font-semibold pt-6'>
            {friend.username}
        </h2>
        <h2 className='font-Inter font-semibold pt-6'>
            {friend.mmr}
        </h2>
        <img src={rankImage} alt="rank" className="h-[75px]" />

    </div>
  )
}

export default LeaderBoardCard