import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext';
import { NavBar } from '../components'
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
      <h1 className={mainHeaderStyle}>
        Friends
      </h1>
      {friends.map(friend => <FriendCard key={friend.id} friend={friend} />)}

      <div className='fixed inset-x-0 bottom-6'>
        <NavBar />
      </div>
    </div>
  )
}

export default Friends