import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { tempprofile, unranked, rank1, rank2, rank3, rank4 } from '../assets'
import { Link } from 'react-router-dom';
import { NavBar } from '../components';
import { getRankImage } from '../getRank';
import { logout } from '../firebase';
import { getUserFriendsIds } from '../firestoreQueries';

const Profile = () => {
  const { userData } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [rankImage, setRankImage] = useState(unranked); // default image
  const [friendsIds, setFriendsIds] = useState([]);

  useEffect(() => {
    setRankImage(getRankImage(userData.mmr)); // call getRankImage after data fetch
  }, [userData]);

  useEffect(() => {
    const fetchFriends = async () => {
        const ids = await getUserFriendsIds(user);
        const numFriends = ids.length;
        setFriendsIds(numFriends);
    };

    fetchFriends();
}, [user]);



  

  return (
    <div className='flex flex-col items-center mt-12'>
        <button onClick={logout}>
            Logout
        </button>
        <div className="flex flex-row space-x-10 pb-4">
            {/* TODO: Profile Image */} 
            <img src={userData.profilePicture || tempprofile} alt="profileimage" className="rounded-full w-[150px] h-[150px] bg-[#808080] object-cover" />
            <img src={rankImage} alt="rank" className="h-[150px]" />
        </div>
        <h1 className='font-Inter text-white text-[28px] font-semibold pb-4'>
            {userData.username}
        </h1>
        <div className='pb-4'>
            <Link 
                to={'/editprofile'}
                className='bg-light-green px-14 py-2 rounded-md font-semibold'>
                Edit Profile
            </Link>
        </div>
        <div className='text-white font-inter'>
            <div className='flex flex-row space-x-6'>
                <div className='flex flex-col items-center'>
                    <h2>
                        Rank
                    </h2>
                    <h3>
                        {userData.mmr}
                    </h3>
                </div>
                <div className='flex flex-col items-center'>
                    <h2>
                        Wins
                    </h2>
                    <h3>
                        {userData.wins}
                    </h3>
                </div>
                <div className='flex flex-col items-center'>
                    <h2>
                        Friends
                    </h2>
                    <h3>
                        {/* TODO: Use some kind of function to count the number of friends ids that are in the database. */}
                        {friendsIds}
                    </h3>
                </div>
            </div>
        </div>
        <div id='RecentMatches'>

        </div>
        <div className='fixed inset-x-0 bottom-6'>
          <NavBar />
        </div>
        
    </div>
  )
}

export default Profile