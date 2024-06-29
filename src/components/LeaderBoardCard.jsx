import React, { useEffect, useState, useContext } from 'react'; // Import useContext if needed for current user context
import { useNavigate } from 'react-router-dom';
import { getRankImage } from '../utils';
import { unranked, person } from '../assets';
import { UserContext } from '../UserContext';
const LeaderBoardCard = ({ friend, rank }) => {
  const [rankImage, setRankImage] = useState(unranked);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setRankImage(getRankImage(friend.mmr));
  }, [friend]);

  const handleClick = () => {
    // Assuming currentUserId is available here. Adjust based on actual implementation
    if (friend.id === user.uid) {
      navigate('/profile'); // Navigate to the user's own profile
    } else {
      navigate('/friend-profile', { state: { friend } }); // Navigate to FriendProfile with friend state
    }
  };

  return (
    <div className='mt-4 w-[90%]' onClick={handleClick} style={{ cursor: 'pointer' }}> {/* Add onClick handler */}
      <div className='flex flex-row bg-matcha-green px-4 py-2 rounded-xl space-x-4 items-center text-white justify-between'>
        <h2 className='font-light'>{rank}</h2>
        <img src={friend.profilePicture || person} alt={friend.username} className="rounded-full w-[65px] h-[65px] bg-[#808080] object-cover" />
        <h2 className='font-Inter font-light'>
          {friend.username}
        </h2>
        <h2 className='font-Inter font-medium'>
          {friend.mmr}
        </h2>
        <img src={rankImage} alt="rank" className="h-[50px] w-[50px]" />
      </div>
    </div>
  );
};

export default LeaderBoardCard;