import React, { useContext, useEffect, useState } from 'react';
import { NavBar } from '../components'
import { pickleLogo } from '../assets'
import { getUserFriendsIds, getUserFriends } from '../firestoreQueries'
import { getUserData } from '../firebase'
import { LeaderBoardCard, PowerPickleIcon } from '../components'
import { UserContext } from '../UserContext'

const Home = () => {

  const { user } = useContext(UserContext);
  const [friends, setFriends] = useState([]); // state variable to store the friends  
  const [userData, setUserData] = useState(null); // state variable to store the user data
  const [leaderboardData, setLeaderboardData] = useState([]); // state variable to store the leaderboard data

  useEffect(() => {
    const fetchFriendsAndUser = async () => {
      const friendDocs = await getUserFriends(user);
      const userDoc = await getUserData(user); // fetch the user data
      setUserData(userDoc); // set the user data
      setFriends(friendDocs); // update state with the found users
    };

    fetchFriendsAndUser();
  }, [user]);

  useEffect(() => {
    if (userData) {
      setLeaderboardData([userData, ...friends]); // combine user data and friends data
    } else {
      setLeaderboardData(friends);
    }
  }, [userData, friends]);

  return (
    <div className='pt-4 flex flex-col'>
      <div className='flex flex-col items-center'>
        <div className='pb-4'>
          <PowerPickleIcon color='#02261C' />
        </div>
        <div id='UpComingEvents'></div>
        <div className='pb-4'>
          <h1 className='font-inter text-white text-[36px] font-semibold'>
            Leaderboard
          </h1>
        </div>
      </div>
      <div className='bg-off-white w-screen flex-grow h-[642px] rounded-t-3xl'>
        <div className='overflow-y-auto w-full flex flex-col items-center'>
          {leaderboardData.sort((a, b) => b.mmr - a.mmr).map((friend, index) => <LeaderBoardCard key={index} friend={friend} rank={index + 1} />)}
        </div>
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  )
}

// No API Calls
// const Home = () => {
//   return (
//     <div>
//       Save the api calls
//       <NavBar />
//     </div>
//   )
// }

export default Home;