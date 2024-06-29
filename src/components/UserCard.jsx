import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { getRankImage } from '../utils';
import { addFriend, removeFriend } from '../firebase';
import { getUserFriendsIds } from '../firestoreQueries';

const UserCard = ({ searchedUser }) => {
    const [rankImage, setRankImage] = useState('');
    const [isFriend, setIsFriend] = useState(false); // state variable to track if the user is a friend
    const { user } = useContext(UserContext); // Use UserContext to access the current user
    const navigate = useNavigate();

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
            await addFriend(searchedUser); 
            setIsFriend(true);
            alert('Friend added successfully');
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleRemoveFriend = async () => {
        try {
            await removeFriend(searchedUser); 
            setIsFriend(false);
            alert('Friend removed successfully');
        } catch (error) {
            console.error(error);
        }
    }

    const handleClick = () => {
        const friend = searchedUser
        if (searchedUser.id === user.uid) {
          navigate('/profile'); // Navigate to the user's own profile
        } else {
          navigate('/friend-profile', { state: { friend } }); // Navigate to FriendProfile with friend state
        }
      };

    return (
        <div className='m-4 w-[90%]' onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className='flex flex-row justify-between bg-dark-blue px-4 py-2 rounded-xl space-x-4 items-center border border-white border-opacity-50 backdrop-blur-md bg-opacity-90'>
                <img src={searchedUser.profilePicture} alt={searchedUser.username} className="rounded-full w-[75px] h-[75px] bg-[#808080] object-cover" />
                <h2 className='font-Inter font-light text-white'>
                    {searchedUser.username}
                </h2>
                <img src={rankImage} alt="rank" className="h-[50px]" />
                {user.uid !== searchedUser.id && (
                    <button className='bg-off-white rounded-lg px-2' onClick={isFriend ? handleRemoveFriend : handleAddFriend}>
                        {isFriend ? 'Remove' : 'Add'}
                    </button>
                )}
            </div>
        </div>
    )
    
}

export default UserCard