import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // import UserContext
import { rank1, rank2, rank3, rank4, unranked } from '../assets'
import { getRankImage } from '../utils'
import { addFriend, removeFriend } from '../firebase';
import { getUserFriends } from '../firestoreQueries';

const FriendCard = ({ friend }) => {
    const navigate = useNavigate(); // Use the useNavigate hook

    // Function to navigate to FriendProfile with friend data
    const showFriendProfile = () => {
        navigate('/friend-profile', { state: { friend } });
    };
    

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
    <div className='mb-4 w-[95%]' onClick={showFriendProfile}>
        <div className='flex flex-row bg-dark-blue px-4 py-2 rounded-lg bg-opacity-90 space-x-4 items-center justify-between'> {/* Added justify-between */}
            <img src={friend.profilePicture} alt={friend.username} className="rounded-full w-[75px] h-[75px] object-cover" />
            <h2 className='font-Inter font-light text-white'>
                {friend.username}
            </h2>
            <img src={rankImage} alt="rank" className="h-[50px]" />
            <button className='bg-off-white text-dark-blue rounded-lg px-2' onClick={handleRemoveFriend}>
                Remove
            </button>
        </div>
    </div>
  )
}

export default FriendCard