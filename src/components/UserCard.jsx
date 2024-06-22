import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext'; // import UserContext
import { rank1, rank2, rank3, rank4, unranked } from '../assets'
import { getRankImage } from '../utils'
import { addFriend, removeFriend } from '../firebase';
import { getUserFriendsIds } from '../firestoreQueries';

const UserCard = ({ searchedUser, user }) => {
    const [rankImage, setRankImage] = useState(unranked); // default image
    const [isFriend, setIsFriend] = useState(false); // state variable to track if the user is a friend

    useEffect(() => {
        setRankImage(getRankImage(searchedUser.mmr)); // call getRankImage after data fetch

        const checkFriendStatus = async () => {
            const friends = await getUserFriendsIds(user); // pass currentUser object
            setIsFriend(friends.includes(searchedUser.id));
        };

        checkFriendStatus();
    }, [searchedUser, user]);

    const handleAddFriend = async () => {
        try {
            await addFriend(searchedUser); // call the addFriend function, passing the friend's ID
            setIsFriend(true); // update the isFriend state
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleRemoveFriend = async () => {
        try {
            await removeFriend(searchedUser); // call the removeFriend function, passing the friend's ID
            setIsFriend(false); // update the isFriend state
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='flex flex-row bg-white px-4 py-2 rounded-lg bg-opacity-50 space-x-8'>
        <img src={searchedUser.profilePicture} alt={searchedUser.username} className="rounded-full w-[75px] h-[75px] bg-[#808080] object-cover" />
        <h2 className='font-Inter font-semibold pt-6'>
            {searchedUser.username}
        </h2>
        <img src={rankImage} alt="rank" className="h-[75px]" />
        {/* TODO: Make it so the current user doesnt show up */}
        <button className='bg-light-green rounded-lg' onClick={isFriend ? handleRemoveFriend : handleAddFriend}>
            {isFriend ? 'Remove' : 'Add'}
        </button>
    </div>
  )
}

export default UserCard