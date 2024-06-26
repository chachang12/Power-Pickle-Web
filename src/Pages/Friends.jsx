import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext';
import { NavBar, PowerPickleIcon } from '../components'
import { getUserFriends } from '../firestoreQueries';
import { FriendCard } from '../components'
import { mainHeaderStyle } from '../styles';

const Friends = () => {

  const { user } = useContext(UserContext);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friends = await getUserFriends(user);
      setFriends(friends);
    }
    fetchFriends();
  }, [user]);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-inter text-dark-blue text-[20px] font-semibold pt-4'>
        Friends
      </h1>
      <div className='pt-2 pb-4'>
        <PowerPickleIcon color={'#011C40'} />
      </div>
      <div className="self-start w-full pl-4"> {/* This div aligns the header to the left */}
      </div>
      <hr className="w-full border-t-1 border-white pb-4 border-opacity-60" /> {/* Line divider added here */}
      {friends.map(friend => <FriendCard key={friend.id} friend={friend} />)}

      <div className='fixed inset-x-0 bottom-6'>
        <NavBar />
      </div>
    </div>
  )
}

export default Friends