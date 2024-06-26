import React, { useContext, useEffect, useState } from 'react';
import { NavBar } from '../components'
import { pickleLogo } from '../assets'
import { getUserFriendsIds, getUserFriends } from '../firestoreQueries'
import { getUserData } from '../firebase'
import { LeaderBoardCard, PowerPickleIcon } from '../components'
import { UserContext } from '../UserContext'

const Home = () => {

  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userFirstName, setUserFirstName] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchFriendsAndUser = async () => {
      const friendDocs = await getUserFriends(user);
      const userDoc = await getUserData(user);
      setUserData(userDoc);
      setUserFirstName(userDoc.firstName);
      setFriends(friendDocs);
    };

    fetchFriendsAndUser();
  }, [user]);

  useEffect(() => {
    if (userData) {
      setLeaderboardData([userData, ...friends]);
    } else {
      setLeaderboardData(friends);
    }
  }, [userData, friends]);

  // Function to determine the time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  const greeting = `Good ${getTimeOfDay()} ${userFirstName},`;


  return (
    <div className='flex flex-col h-screen pt-4'>
      <div className='flex-grow flex flex-col'>
        <div className='pb-4 flex flex-col items-center'>
          <h1 className='font-inter text-dark-blue text-[20px] font-semibold'>
            Rankings
          </h1>
        </div>
        <div className='pb-4'>
          <div className='self-start'>
            <h2 className='text-[16px] text-dark-blue pl-4 font-medium'>{greeting}</h2>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          
          <div className='pb-6'>
            <PowerPickleIcon color='#011C40' />
          </div>
          <div id='UpComingEvents'></div>
        </div>
        <div className='bg-off-white w-full flex flex-col flex-grow rounded-t-3xl'>
          {/* ... */}
          <div className='overflow-y-auto w-full flex flex-col items-center'>
            {leaderboardData.length > 0 ? (
              leaderboardData.sort((a, b) => b.mmr - a.mmr).map((friend, index) => (
                <LeaderBoardCard key={index} friend={friend} rank={index + 1} />
              ))
            ) : (
              <p className='text-center text-dark-blue mt-10 '>
                No friends yet, make some in the explore tab!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='mt-auto'>
        <NavBar />
      </div>
    </div>
  );
}

export default Home;