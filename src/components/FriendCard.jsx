import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext'; // import UserContext
import { rank1, rank2, rank3, rank4, unranked } from '../assets'
import { getRankImage } from '../utils'
import { addFriend, removeFriend } from '../firebase';
import { getUserFriends } from '../firestoreQueries';

const FriendCard = ( {friend} ) => {

    const [rankImage, setRankImage] = useState(friend); // default image

    useEffect(() => {
        setRankImage(getRankImage(friend.mmr)); // call getRankImage after data fetch
    }, [friend]);

    const handleRemoveFriend = async () => {
        try {
            await removeFriend(friend); // call the removeFriend function, passing the friend's ID
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='mb-4 w-[95%]'>
        <div className='flex flex-row bg-white px-4 py-2 rounded-lg bg-opacity-50 space-x-4 items-center'>
            <img src={friend.profilePicture} alt={friend.username} className="rounded-full w-[75px] h-[75px] bg-[#808080] object-cover" />
            <h2 className='font-Inter font-semibold'>
                {friend.username}
            </h2>
            <img src={rankImage} alt="rank" className="h-[50px]" />
            <button className='bg-light-green rounded-lg px-2' onClick={handleRemoveFriend}>
                Remove
            </button>
        </div>
    </div>
  )
}

export default FriendCard