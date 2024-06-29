import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavBar, MatchCard } from '../components';
import { getRankImage } from '../utils';
import { fetchMatchesForUser } from '../firestoreQueries';
import { unranked, person  } from '../assets';

const FriendProfile = () => {
  const location = useLocation();
  const { friend } = location.state;
  const [rankImage, setRankImage] = useState(unranked); // default image
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setRankImage(getRankImage(friend.mmr)); // call getRankImage after data fetch
  }, [friend]);

  useEffect(() => {
    const fetchMatches = async () => {
      const userMatches = await fetchMatchesForUser(friend.id);
      console.log(userMatches);
      const sortedMatches = userMatches.sort((a, b) => b.date - a.date);
      setMatches(sortedMatches);
    };

    fetchMatches();
  }, [friend]);

  return (
    <div className='flex flex-col h-screen items-center mt-12 '>
      <div className="flex flex-row space-x-10 pb-4">
        <img src={friend.profilePicture || person} alt="profileimage" className="rounded-full w-[150px] h-[150px] bg-[#808080] object-cover" />
        <img src={rankImage} alt="rank" className="h-[150px]" />
      </div>
      <h1 className='font-Inter text-white text-[28px] font-semibold' style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.25)' }}>
        {friend.username}
      </h1>
      <h2 className='pb-2 font-Inter text-white text-[18px] font-regular'>
          {friend.firstName} {friend.lastName}
      </h2>
      <div className='text-white font-inter pb-4'>
        <div className='flex flex-row space-x-6'>
          <div className='flex flex-col items-center'>
            <h2>
              Rank
            </h2>
            <h3>
              {friend.mmr}
            </h3>
          </div>
          <div className='flex flex-col items-center'>
            <h2>
              Wins
            </h2>
            <h3>
              {friend.wins}
            </h3>
          </div>
        </div>
      </div>
      <div id='RecentMatches' className='flex flex-col items-center pt-4 bg-off-white w-full rounded-t-3xl flex-grow'>
        <div className='w-[90%]'>
          <h2 className='text-dark-blue font-semibold pb-2'>
            Recent Matches
          </h2>
        </div>
        <div className='overflow-y-auto w-full flex-grow flex flex-col items-center'>
          <div className='w-[90%]'>
            {matches.map((match, index) => (
              <MatchCard key={index} match={match} playerData={friend} />
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

export default FriendProfile;