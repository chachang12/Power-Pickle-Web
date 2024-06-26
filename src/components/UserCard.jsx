import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext'; // import UserContext
import { getRankImage } from '../utils';
import { addFriend, removeFriend } from '../firebase';
import { getUserFriendsIds } from '../firestoreQueries';

const UserCard = ({ searchedUser }) => {
    const [rankImage, setRankImage] = useState('');
    const [isFriend, setIsFriend] = useState(false); // state variable to track if the user is a friend
    const { user } = useContext(UserContext); // Use UserContext to access the current user

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
        <div className='m-4 w-[90%]'>
            <div className='flex flex-row bg-dark-blue px-4 py-2 rounded-xl space-x-4 items-center border border-white border-opacity-50 backdrop-blur-md bg-opacity-90'> {/* Added shadow-lg for drop shadow */}
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