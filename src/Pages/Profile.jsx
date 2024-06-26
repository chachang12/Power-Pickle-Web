import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { tempprofile, unranked, rank1, rank2, rank3, rank4 } from '../assets'
import { Link } from 'react-router-dom';
import { NavBar, MatchCard } from '../components';
import { getRankImage } from '../utils';
import { logout } from '../firebase';
import { getUserFriendsIds, fetchMatchesForUser } from '../firestoreQueries';

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

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const userMatches = await fetchMatchesForUser(user.uid);
            const sortedMatches = userMatches.sort((a, b) => b.date - a.date);
            setMatches(sortedMatches);
        };
    
        fetchMatches();
    }, [user]);



  

  return (
    <div className='flex flex-col h-screen items-center mt-6 '>
        <h1 className='font-inter text-dark-blue text-[20px] font-semibold pb-4'>
            Profile
        </h1>
        <div className="flex flex-row space-x-10 pb-4">
            <img src={userData.profilePicture || tempprofile} alt="profileimage" className="rounded-full w-[150px] h-[150px] bg-[#808080] object-cover" />
            <img src={rankImage} alt="rank" className="h-[150px]" />
        </div>
        <h1 className='font-Inter text-white text-[28px] font-semibold pb-4' style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.25)' }}>
            {userData.username}
        </h1>
        <div className='pb-4'>
            <Link 
                to={'/editprofile'}
                className='bg-dark-blue px-14 py-2 rounded-md text-white font-regular'>
                Edit Profile
            </Link>
        </div>
        <div className='text-white font-inter pb-4'>
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
                    <Link to="/friends">
                        <div className='flex flex-col items-center'>
                            <h2>
                                Friends
                            </h2>
                            <h3>
                                {/* Count of the users friends. */}
                                {friendsIds}
                            </h3>
                        </div>
                        
                    </Link>
                    
                </div>
            </div>
        </div>
        <div id='RecentMatches' className='flex flex-col items-center pt-4 bg-off-white w-full rounded-t-3xl flex-grow'>
            <div className='w-[90%]'>
                <h2 className='text-dark-blue font-semibold pb-2'>
                    Recent Matches
                </h2>
            </div>
            <div className='overflow-y-auto w-full flex-grow flex flex-col items-center'> {/* Make this div grow to fill available space and scrollable */}
                <div className='w-[90%]'>
                    {matches.map((match, index) => (
                    <MatchCard key={index} match={match} playerData={userData} />
                    ))}
                </div>
            </div>
        </div>
        <div className='fixed inset-x-0 bottom-6'>
          <NavBar />
        </div>
        
    </div>
  )
}

export default Profile